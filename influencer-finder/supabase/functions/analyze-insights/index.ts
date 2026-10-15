// analyze-insights: Stage 2. Reads uploaded documents from the private 'insights'
// bucket, extracts metrics with Claude (vision), stores provenance per value,
// rescoring the candidate while keeping the public score untouched.
// POST { candidateId, documentIds?: string[] }
import { adminClient, json, CORS, requireUser, callClaude, parseJson, recordUsage } from '../_shared/clients.ts';
import { errMsg } from '../_shared/clients.ts';
import { SYSTEM_INSIGHTS_EXTRACTION } from '../_shared/engine/ai/prompts.ts';
import { rescoreWithInsights } from '../_shared/engine/insights/rescoring.ts';
import { expectedBookedNights } from '../_shared/engine/scoring/ebn.ts';
import { recommendTrack } from '../_shared/engine/outreach/generator.ts';
import type { PrivateInsights } from '../_shared/engine/pipeline/types.ts';
import { toCandidate } from '../_shared/mappers.ts';

const INSIGHTS_SCHEMA = {
  type: 'object',
  properties: {
    reportingPeriodStart: { type: 'string' }, reportingPeriodEnd: { type: 'string' },
    accountsReached90d: { $ref: '#/$defs/metric' }, views90d: { $ref: '#/$defs/metric' }, impressions90d: { $ref: '#/$defs/metric' },
    audienceCountries: { type: 'array', items: { type: 'object', properties: { country: { type: 'string', description: 'ISO2' }, share: { type: 'number' }, provenance: { type: 'string' } }, required: ['country', 'share', 'provenance'] } },
    audienceCities: { type: 'array', items: { type: 'object', properties: { city: { type: 'string' }, share: { type: 'number' }, provenance: { type: 'string' } } } },
    audienceAge: { type: 'array', items: { type: 'object', properties: { bracket: { type: 'string' }, share: { type: 'number' }, provenance: { type: 'string' } } } },
    audienceGender: { type: 'object', properties: { female: { type: 'number' }, male: { type: 'number' }, provenance: { type: 'string' } } },
    storyViewsAvg: { $ref: '#/$defs/metric' }, storyReachAvg: { $ref: '#/$defs/metric' }, storyLinkClicksAvg: { $ref: '#/$defs/metric' },
    reelsReachAvg: { $ref: '#/$defs/metric' }, reelsReachMedian: { $ref: '#/$defs/metric' }, reelsViewsAvg: { $ref: '#/$defs/metric' }, engagementRate: { $ref: '#/$defs/metric' },
    retreatsOrganisedCount: { $ref: '#/$defs/metric' },
    registrationsPerEvent: { type: 'array', items: { type: 'object', properties: { eventTitle: { type: 'string' }, registrations: { type: 'number' }, attended: { type: 'number' }, provenance: { type: 'string' }, evidenceUrl: { type: 'string' } }, required: ['eventTitle', 'registrations', 'provenance'] } },
    avgPricePerParticipant: { $ref: '#/$defs/metric' }, eventsSoldOutCount: { $ref: '#/$defs/metric' }, instagramAttributedShare: { $ref: '#/$defs/metric' },
    priorCampaigns: { type: 'array', items: { type: 'object', properties: { brand: { type: 'string' }, outcome: { type: 'string' }, clicks: { type: 'number' }, conversions: { type: 'number' }, revenue: { type: 'number' }, provenance: { type: 'string' } }, required: ['brand', 'provenance'] } },
    contradictions: { type: 'array', items: { type: 'string' } },
  },
  $defs: { metric: { type: 'object', properties: { value: { type: 'number' }, unit: { type: 'string' }, provenance: { enum: ['influencer_reported', 'document_backed'] }, sourceRef: { type: 'string' }, note: { type: 'string' } }, required: ['value', 'provenance', 'sourceRef'] } },
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;
  const sb = adminClient();
  const { candidateId, documentIds } = await req.json();
  const { data: row } = await sb.from('candidates').select('*').eq('id', candidateId).single();
  if (!row) return json({ error: 'candidate not found' }, 404);
  let dq = sb.from('insights_documents').select('*').eq('candidate_id', candidateId);
  if (documentIds?.length) dq = dq.in('id', documentIds);
  const { data: docs } = await dq;
  if (!docs?.length) return json({ error: 'no documents' }, 400);
  await sb.from('insights_documents').update({ status: 'extracting' }).in('id', docs.map((d: { id: string }) => d.id));

  // Build a multimodal message: images inline, PDFs as documents, with file names so sourceRef can cite them.
  const content: Array<Record<string, unknown>> = [];
  for (const d of docs) {
    const { data: file, error } = await sb.storage.from('insights').download(d.storage_path);
    if (error || !file) { await sb.from('insights_documents').update({ status: 'failed', error: error?.message ?? 'download failed' }).eq('id', d.id); continue; }
    const b64 = base64(new Uint8Array(await file.arrayBuffer()));
    content.push({ type: 'text', text: `Document "${d.file_name}" (kind: ${d.kind}${d.is_test ? ', TEST FIXTURE' : ''}):` });
    if (d.mime_type === 'application/pdf') content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b64 } });
    else if (d.mime_type.startsWith('image/')) content.push({ type: 'image', source: { type: 'base64', media_type: d.mime_type, data: b64 } });
    else content.push({ type: 'text', text: new TextDecoder().decode(await file.arrayBuffer()).slice(0, 20000) });
  }
  content.push({ type: 'text', text: `Public profile data for comparison: followers=${row.followers ?? 'unknown'}, bio=${row.bio ?? ''}. Extract the PrivateInsights JSON now.` });
  const res = await callClaude({ system: SYSTEM_INSIGHTS_EXTRACTION, messages: [{ role: 'user', content }], tier: 'deep', schema: INSIGHTS_SCHEMA, maxTokens: 6000 });
  await recordUsage(sb, { candidateId, provider: 'claude', operation: 'insights', costUsd: res.costUsd, meta: { model: res.model, docs: docs.length } });
  let pi: PrivateInsights;
  try { pi = parseJson<PrivateInsights>(res.text); } catch (e) { await sb.from('insights_documents').update({ status: 'failed', error: 'model output not JSON' }).in('id', docs.map((d: { id: string }) => d.id)); return json({ error: String(e) }, 500); }

  const { data: ev } = await sb.from('evidence').select('url,title,excerpt,kind').eq('candidate_id', candidateId).limit(40);
  const { data: events } = await sb.from('events').select('*').eq('candidate_id', candidateId);
  const { data: settings } = await sb.from('villa_settings').select('*').eq('id', 1).maybeSingle();
  const cand = toCandidate(row, ev ?? [], events ?? [], row.classification ?? undefined);
  const r = rescoreWithInsights(cand, pi, { weights: settings?.weights, floorPricePerNightEur: settings?.floor_price_per_night_eur, venueShare: settings?.venue_budget_share });
  const track = recommendTrack({ ...cand, privateInsights: pi });
  const organiser = cand.events.filter((e) => e.role === 'organizer' || e.role === 'co_host');
  const ebn = expectedBookedNights({ score: r.verifiedScore, typicalNights: organiser[0]?.nights ?? null, eventsPerYear: pi.retreatsOrganisedCount?.value ?? organiser.length ?? null, winterShare: organiser.length ? organiser.filter((e) => e.isWinter).length / organiser.length : null, nightlyRevenueEur: settings?.nightly_revenue_eur ?? null, track: track.track, verified: true });
  const isTestOnly = docs.every((d: { is_test: boolean }) => d.is_test);
  await sb.from('private_insights').upsert({ candidate_id: candidateId, data: pi, derived: r.derived, rescore: { deltas: r.deltas, fitDelta: r.fitDelta, confidenceDelta: r.confidenceDelta, explanation: r.explanation, isTestOnly }, model: res.model, document_ids: docs.map((d: { id: string }) => d.id), analysed_at: new Date().toISOString() });
  await sb.from('insights_documents').update({ status: 'extracted', extracted_at: new Date().toISOString(), extraction: { model: res.model }, reporting_period_start: pi.reportingPeriodStart ?? null, reporting_period_end: pi.reportingPeriodEnd ?? null }).in('id', docs.map((d: { id: string }) => d.id));
  // Test fixtures exercise the mechanism but must never change a real candidate's ranking.
  if (!isTestOnly) {
    await sb.from('candidates').update({ verified_score: r.verifiedScore, fit_score: r.verifiedScore.fitScore, confidence: r.verifiedScore.confidence, tier: r.verifiedScore.tier, ebn, recommended_track: track.track, verification_status: 'privately_assessed', pipeline_stage: ['insights_requested', 'insights_received', 'verification_queue', 'publicly_qualified', 'discovered'].includes(row.pipeline_stage) ? 'ai_analysis_complete' : row.pipeline_stage }).eq('id', candidateId);
    await sb.from('score_history').insert({ candidate_id: candidateId, kind: 'verified', score: r.verifiedScore, weights: settings?.weights ?? null });
  }
  return json({ insights: pi, rescore: { publicScore: r.publicScore, verifiedScore: r.verifiedScore, deltas: r.deltas, explanation: r.explanation, derived: r.derived }, ebn, isTestOnly, model: res.model });
});

function base64(bytes: Uint8Array): string { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000)); return btoa(s); }
