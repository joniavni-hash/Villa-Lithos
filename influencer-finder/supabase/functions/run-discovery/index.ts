// run-discovery: executes a research run in resumable chunks.
// POST { action: 'create', params } → creates the run and its query plan (status queued)
// POST { action: 'step', runId, maxQueries? } → processes up to N pending queries, saves candidates incrementally, returns { done }
// POST { action: 'resolve', runId } → resolves authors of post/reel URLs collected during the run (Tavily extract)
// POST { action: 'pause'|'cancel', runId }
// The client (or a scheduler) calls 'step' repeatedly until done; a crashed invocation leaves the DB consistent and 'step' resumes.
import { adminClient, json, CORS, requireUser, tavilySearch, tavilyExtract, TavilyDisabled, logRun, recordUsage, type TavilyResult } from '../_shared/clients.ts';
import { errMsg } from '../_shared/clients.ts';
import { generateQueries, type RunParameters, type QuerySpec } from '../_shared/engine/discovery/queryGenerator.ts';
import { handleFromUrl, handleFromTitle, handleFromExtractedText, followersFromText, guessMarket, mentionsWinterMonth, profileUrl } from '../_shared/engine/discovery/normalize.ts';
import { COMMERCIAL_DEFAULTS } from '../_shared/engine/config/villa.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;
  const sb = adminClient();
  const body = await req.json().catch(() => ({}));
  try {
    switch (body.action) {
      case 'create': return json(await createRun(sb, body.params));
      case 'step': return json(await step(sb, body.runId, body.maxQueries ?? 10));
      case 'resolve': return json(await resolveAuthors(sb, body.runId, body.maxUrls ?? 20));
      case 'pause': await sb.from('research_runs').update({ status: 'paused' }).eq('id', body.runId); return json({ ok: true });
      case 'cancel': await sb.from('research_runs').update({ status: 'cancelled', finished_at: new Date().toISOString() }).eq('id', body.runId); return json({ ok: true });
      default: return json({ error: 'unknown action' }, 400);
    }
  } catch (e) {
    return json({ error: errMsg(e) }, 500);
  }
});

async function createRun(sb: ReturnType<typeof adminClient>, params: RunParameters & { label?: string; depth?: 'quick' | 'standard' | 'deep'; spendCapUsd?: number }) {
  const { data: settings } = await sb.from('villa_settings').select('*').eq('id', 1).maybeSingle();
  const cap = params.spendCapUsd ?? settings?.run_spend_cap_usd ?? COMMERCIAL_DEFAULTS.runSpendCapUsd;
  const maxQueries = params.maxQueries ?? (params.depth === 'quick' ? 40 : params.depth === 'deep' ? 400 : 160);
  const specs = generateQueries({ ...params, maxQueries });
  const { data: run, error } = await sb.from('research_runs').insert({ label: params.label ?? null, params: { ...params, maxQueries }, status: 'queued', queries_total: specs.length, spend_cap_usd: cap }).select().single();
  if (error) throw error;
  const rows = specs.map((s) => ({ run_id: run.id, query_id: s.id, spec: s }));
  for (let i = 0; i < rows.length; i += 200) { const { error: e2 } = await sb.from('run_queries').insert(rows.slice(i, i + 200)); if (e2) throw e2; }
  await logRun(sb, run.id, 'info', `Run created with ${specs.length} queries`, { lanes: countBy(specs, (s) => s.lane), languages: countBy(specs, (s) => s.language) });
  const { data: src } = await sb.from('sources').select('id,status');
  for (const s of src ?? []) await logRun(sb, run.id, s.status === 'enabled' ? 'info' : 'warn', `Source ${s.id}: ${s.status}`);
  return { runId: run.id, queries: specs.length };
}

async function step(sb: ReturnType<typeof adminClient>, runId: string, maxQueries: number) {
  const { data: run } = await sb.from('research_runs').select('*').eq('id', runId).single();
  if (!run) throw new Error('run not found');
  if (['cancelled', 'completed', 'failed'].includes(run.status)) return { done: true, status: run.status };
  if (run.status === 'paused') return { done: false, status: 'paused' };
  if (run.status === 'queued') await sb.from('research_runs').update({ status: 'running', started_at: new Date().toISOString() }).eq('id', runId);

  const { data: pending } = await sb.from('run_queries').select('*').eq('run_id', runId).eq('status', 'pending').limit(maxQueries);
  if (!pending?.length) {
    await sb.from('research_runs').update({ status: 'completed', finished_at: new Date().toISOString() }).eq('id', runId);
    await logRun(sb, runId, 'info', 'Run completed');
    return { done: true, status: 'completed' };
  }

  let cost = Number(run.cost_usd);
  let newCount = run.candidates_new, updCount = run.candidates_updated;
  for (const rq of pending) {
    if (cost >= Number(run.spend_cap_usd)) {
      await sb.from('research_runs').update({ status: 'paused', cost_usd: cost }).eq('id', runId);
      await logRun(sb, runId, 'warn', `Spend cap reached (${cost.toFixed(3)} USD ≥ ${run.spend_cap_usd}); run paused`);
      return { done: false, status: 'paused', reason: 'spend_cap' };
    }
    const spec = rq.spec as QuerySpec;
    try {
      const { results, credits } = await tavilySearch(spec.query, { includeDomains: spec.includeDomains, maxResults: 8, depth: spec.searchDepth });
      const c = credits * COMMERCIAL_DEFAULTS.unitCostsUsd.tavilySearchBasic;
      cost += c;
      await recordUsage(sb, { runId, provider: 'tavily', operation: 'search', units: credits, costUsd: c, meta: { queryId: spec.id } });
      const outcome = await ingestResults(sb, runId, spec, results);
      newCount += outcome.created; updCount += outcome.updated;
      await sb.from('run_queries').update({ status: 'done', results_count: results.length, cost_usd: c, done_at: new Date().toISOString() }).eq('run_id', runId).eq('query_id', spec.id);
      await logRun(sb, runId, 'info', `[${spec.lane}/${spec.language}] ${spec.query} → ${results.length} results, ${outcome.created} new, ${outcome.updated} updated, ${outcome.posts} posts queued`);
    } catch (e) {
      if (e instanceof TavilyDisabled) {
        await sb.from('research_runs').update({ status: 'failed', error: 'Tavily disabled: TAVILY_API_KEY missing', cost_usd: cost }).eq('id', runId);
        await logRun(sb, runId, 'error', 'Tavily source disabled (no API key). Add TAVILY_API_KEY in backend secrets and restart the run.');
        return { done: true, status: 'failed', reason: 'tavily_disabled' };
      }
      await sb.from('run_queries').update({ status: 'failed', error: errMsg(e) }).eq('run_id', runId).eq('query_id', spec.id);
      await logRun(sb, runId, 'error', `Query failed: ${spec.query}`, { error: errMsg(e) });
    }
    await sb.from('research_runs').update({ cost_usd: cost, candidates_new: newCount, candidates_updated: updCount }).eq('id', runId);
    await sb.rpc('increment_queries_done', { p_run_id: runId }).then(() => {}, () => {});
  }
  const { count } = await sb.from('run_queries').select('*', { count: 'exact', head: true }).eq('run_id', runId).eq('status', 'pending');
  return { done: false, status: 'running', pending: count ?? 0, costUsd: cost };
}

/** Upsert candidates + evidence from one query's results. Post/reel URLs are stored as unattributed evidence for later author resolution. */
async function ingestResults(sb: ReturnType<typeof adminClient>, runId: string, spec: QuerySpec, results: TavilyResult[]) {
  let created = 0, updated = 0, posts = 0;
  const now = new Date().toISOString();
  for (const r of results) {
    const handle = handleFromUrl(r.url) ?? handleFromTitle(r.title);
    if (!handle) {
      // post/reel or listing page: keep for resolution / listing evidence
      if (/instagram\.com\/(p|reel)\//.test(r.url)) { posts++; await sb.from('unresolved_posts').upsert({ run_id: runId, url: r.url, title: r.title ?? null, excerpt: (r.content ?? '').slice(0, 600), score: r.score ?? null, query_id: spec.id }, { onConflict: 'url' }); }
      else await sb.from('listing_leads').upsert({ run_id: runId, url: r.url, title: r.title ?? null, excerpt: (r.content ?? '').slice(0, 800), query_id: spec.id, lane: spec.lane }, { onConflict: 'url' });
      continue;
    }
    const text = `${r.title ?? ''}\n${r.content ?? ''}`;
    const market = guessMarket(text) ?? spec.market ?? null;
    const followers = followersFromText(text);
    const { data: existing } = await sb.from('candidates').select('id,markets,discovery_queries,followers').eq('handle', handle).maybeSingle();
    let candidateId: string;
    if (existing) {
      candidateId = existing.id;
      const patch: Record<string, unknown> = { last_seen_at: now, last_run_id: runId, discovery_queries: Array.from(new Set([...(existing.discovery_queries ?? []), spec.id])) };
      if (market && !(existing.markets ?? []).includes(market)) patch.markets = [...(existing.markets ?? []), market];
      if (followers && !existing.followers) { patch.followers = followers; patch.followers_provenance = 'verified_public_fact'; }
      await sb.from('candidates').update(patch).eq('id', candidateId);
      await sb.from('candidate_runs').upsert({ candidate_id: candidateId, run_id: runId, outcome: 'updated' });
      updated++;
    } else {
      const { data: ins, error } = await sb.from('candidates').insert({
        handle, profile_url: profileUrl(handle), display_name: (r.title ?? '').replace(/\s*\(@.*$/, '').replace(/\s*[•·|].*$/, '').trim() || null,
        bio: handleFromUrl(r.url) ? (r.content ?? '').slice(0, 1000) : null, followers, followers_provenance: followers ? 'verified_public_fact' : 'unknown',
        markets: market ? [market] : [], first_run_id: runId, last_run_id: runId, discovery_queries: [spec.id], discovered_at: now, last_seen_at: now,
      }).select('id').single();
      if (error) throw error;
      candidateId = ins.id;
      await sb.from('candidate_runs').upsert({ candidate_id: candidateId, run_id: runId, outcome: 'new' });
      created++;
    }
    await sb.from('evidence').upsert({ candidate_id: candidateId, url: r.url, title: r.title ?? null, excerpt: (r.content ?? '').slice(0, 1500), kind: handleFromUrl(r.url) ? 'profile' : 'post', source: 'tavily', observed_at: now, score: r.score ?? null, query_id: spec.id, run_id: runId, raw: { winterMonth: mentionsWinterMonth(text) } }, { onConflict: 'candidate_id,url' });
  }
  return { created, updated, posts };
}

/** Resolve authors of unresolved post/reel URLs via Tavily extract; attaches captions as evidence to the right candidate. */
async function resolveAuthors(sb: ReturnType<typeof adminClient>, runId: string, maxUrls: number) {
  const { data: run } = await sb.from('research_runs').select('cost_usd,spend_cap_usd').eq('id', runId).single();
  const { data: rows } = await sb.from('unresolved_posts').select('*').eq('run_id', runId).is('resolved_at', null).gte('score', 0.2).order('score', { ascending: false }).limit(maxUrls);
  if (!rows?.length) return { done: true, resolved: 0 };
  let cost = Number(run?.cost_usd ?? 0);
  let resolved = 0;
  for (let i = 0; i < rows.length; i += 10) {
    const batch = rows.slice(i, i + 10);
    const { results, credits } = await tavilyExtract(batch.map((b: { url: string }) => b.url), 'username retreat dates price spots');
    const c = credits * COMMERCIAL_DEFAULTS.unitCostsUsd.tavilyExtractPerUrl * 5;
    cost += c;
    await recordUsage(sb, { runId, provider: 'tavily', operation: 'extract', units: batch.length, costUsd: c });
    for (const row of batch) {
      const ex = results.find((x) => x.url === row.url);
      const handle = handleFromExtractedText(ex?.raw_content);
      const now = new Date().toISOString();
      if (!handle) { await sb.from('unresolved_posts').update({ resolved_at: now, resolution: 'no_handle' }).eq('url', row.url); continue; }
      const caption = (ex?.raw_content ?? '').replace(/\\_/g, '_').slice(0, 1500);
      let { data: cand } = await sb.from('candidates').select('id').eq('handle', handle).maybeSingle();
      if (!cand) {
        const { data: ins } = await sb.from('candidates').insert({ handle, profile_url: profileUrl(handle), first_run_id: runId, last_run_id: runId, discovery_queries: [row.query_id], discovered_at: now, last_seen_at: now, markets: guessMarket(caption) ? [guessMarket(caption)] : [] }).select('id').single();
        cand = ins; await sb.from('candidate_runs').upsert({ candidate_id: ins!.id, run_id: runId, outcome: 'new' });
      }
      await sb.from('evidence').upsert({ candidate_id: cand!.id, url: row.url, title: row.title, excerpt: caption, kind: /\/reel\//.test(row.url) ? 'reel' : 'post', source: 'tavily', observed_at: now, score: row.score, query_id: row.query_id, run_id: runId, raw: { winterMonth: mentionsWinterMonth(caption) } }, { onConflict: 'candidate_id,url' });
      await sb.from('unresolved_posts').update({ resolved_at: now, resolution: handle, candidate_id: cand!.id }).eq('url', row.url);
      resolved++;
    }
  }
  await sb.from('research_runs').update({ cost_usd: cost }).eq('id', runId);
  await logRun(sb, runId, 'info', `Resolved ${resolved}/${rows.length} post authors`);
  return { done: rows.length < maxUrls, resolved, costUsd: cost };
}

function countBy<T>(arr: T[], f: (t: T) => string) { const o: Record<string, number> = {}; for (const a of arr) o[f(a)] = (o[f(a)] ?? 0) + 1; return o; }
