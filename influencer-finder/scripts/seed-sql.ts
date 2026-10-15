/**
 * Emits SQL that seeds the production database with a ranked dataset
 * (candidates, evidence, events, classification, scores). Idempotent on handle.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import type { Candidate, ScoreResult } from '../src/pipeline/types.ts';

type Ranked = Candidate & { publicScore: ScoreResult; track: { track: string; reason: string }; ebn: unknown; budget: unknown };
const inPath = process.argv[2] ?? 'data/run-2026-10-15/ranked.json';
const outPath = process.argv[3] ?? 'data/run-2026-10-15/seed.sql';
const runId = process.argv[4] ?? '00000000-0000-4000-8000-000000000001';
const { candidates } = JSON.parse(readFileSync(inPath, 'utf8')) as { candidates: Ranked[] };
const q = (v: unknown): string => v === null || v === undefined ? 'null' : typeof v === 'number' ? String(v) : typeof v === 'boolean' ? (v ? 'true' : 'false') : `'${String(v).replace(/'/g, "''")}'`;
const j = (v: unknown): string => v === undefined ? 'null' : `${q(JSON.stringify(v))}::jsonb`;
const arr = (v: string[] | undefined): string => `array[${(v ?? []).map(q).join(',')}]::text[]`;
const lines: string[] = [
  `insert into research_runs (id,label,params,status,queries_total,queries_done,candidates_new,cost_usd,spend_cap_usd,created_at,started_at,finished_at) values (${q(runId)},'Session run 2026-10-15 (Tavily via Claude session, 200 queries)','{"seasonStart":"2026-11-01","seasonEnd":"2027-04-30","maxQueries":200}'::jsonb,'completed',200,200,${candidates.length},0,15,now(),now(),now()) on conflict (id) do nothing;`,
];
for (const c of candidates) {
  const p = c.profile;
  lines.push(`insert into candidates (handle,profile_url,display_name,country,languages,niche,followers,followers_provenance,bio,website,account_type,markets,candidate_group,classification,public_score,fit_score,confidence,tier,ebn,budget,recommended_track,verification_status,pipeline_stage,first_run_id,last_run_id,discovery_queries,discovered_at,last_seen_at,classified_at)
 values (${q(p.handle)},${q(p.profileUrl)},${q(p.displayName ?? null)},${q(p.country ?? null)},${arr(p.languages)},${q(p.niche ?? null)},${q(p.followers ?? null)},${q(p.followersProvenance ?? 'unknown')},${q(p.bio ?? null)},${q(p.website ?? null)},${q((c as unknown as { accountType?: string }).accountType ?? 'person_or_brand')},${arr(c.markets)},${q(c.classification?.group ?? null)},${j(c.classification)},${j(c.publicScore)},${c.publicScore.fitScore},${c.publicScore.confidence},${q(c.publicScore.tier)},${j(c.ebn)},${j(c.budget)},${q(c.track.track)},'public_only',${q(c.publicScore.tier === 'A' || c.publicScore.tier === 'B' ? 'publicly_qualified' : 'discovered')},${q(runId)},${q(runId)},${arr(c.discoveryQueries)},${q(c.discoveredAt)},${q(c.lastSeenAt)},now())
 on conflict (handle) do update set last_seen_at = excluded.last_seen_at, last_run_id = excluded.last_run_id, classification = coalesce(candidates.classification, excluded.classification), public_score = coalesce(candidates.public_score, excluded.public_score);`);
  for (const e of c.evidence) lines.push(`insert into evidence (candidate_id,url,title,excerpt,kind,source,observed_at,score,query_id,run_id) select id,${q(e.url)},${q(e.title ?? null)},${q(e.excerpt ?? null)},${q(e.kind)},'tavily',${q(e.observedAt)},${q(e.score ?? null)},null,${q(runId)} from candidates where handle=${q(p.handle)} on conflict (candidate_id,url) do nothing;`);
  for (const ev of c.events) lines.push(`insert into events (candidate_id,title,event_type,start_date,end_date,nights,location,country,group_size,price_per_person,currency,sold_out,role,is_winter,provenance,evidence_urls) select id,${q(ev.title)},${q(ev.eventType ?? null)},${q(ev.startDate ?? null)},${q(ev.endDate ?? null)},${q(ev.nights ?? null)},${q(ev.location ?? null)},${q(ev.country ?? null)},${q(ev.groupSize ?? null)},${q(ev.pricePerPerson ?? null)},${q(ev.currency ?? null)},${q(ev.soldOut ?? null)},${q(ev.role)},${ev.isWinter},${q(ev.provenance)},${arr(ev.evidenceUrls)} from candidates where handle=${q(p.handle)} on conflict (candidate_id,title,start_date) do nothing;`);
  lines.push(`insert into score_history (candidate_id,run_id,kind,score) select id,${q(runId)},'public',${j(c.publicScore)} from candidates where handle=${q(p.handle)};`);
  lines.push(`insert into candidate_runs (candidate_id,run_id,outcome) select id,${q(runId)},'new' from candidates where handle=${q(p.handle)} on conflict do nothing;`);
}
writeFileSync(outPath, lines.join('\n'));
console.log(`wrote ${lines.length} statements to ${outPath}`);
