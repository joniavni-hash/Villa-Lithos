// generate-outreach: builds personalised drafts (EN/HE) for the 4 tracks, or an
// insights request. Deterministic template from real facts, optionally polished by
// Claude under a strict no-price rule. Drafts are stored; nothing is sent.
// POST { candidateId, kind: 'outreach'|'insights_request', track?, language: 'en'|'he', polish?: boolean }
import { adminClient, json, CORS, requireUser, callClaude, recordUsage } from '../_shared/clients.ts';
import { generateOutreach, generateInsightsRequest, recommendTrack } from '../_shared/engine/outreach/generator.ts';
import { toCandidate } from '../_shared/mappers.ts';

const PRICE_RE = /(€|\$|£|₪)\s?\d|\d\s?(€|\$|£|₪)|\b\d{3,}\s?(eur|usd|gbp|ils|euros?|dollars?|shekels?)\b/i;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  const auth = await requireUser(req);
  if (auth instanceof Response) return auth;
  const sb = adminClient();
  const { candidateId, kind = 'outreach', track, language = 'en', polish = false } = await req.json();
  const { data: row } = await sb.from('candidates').select('*').eq('id', candidateId).single();
  if (!row) return json({ error: 'candidate not found' }, 404);
  const { data: ev } = await sb.from('evidence').select('url,title,excerpt,kind').eq('candidate_id', candidateId).limit(40);
  const { data: events } = await sb.from('events').select('*').eq('candidate_id', candidateId);
  const { data: settings } = await sb.from('villa_settings').select('villa').eq('id', 1).maybeSingle();
  const cand = toCandidate(row, ev ?? [], events ?? [], row.classification ?? undefined);
  const sender = settings?.villa?.propertyManager ?? 'Aviv Goldenberg';
  if (kind === 'insights_request') {
    const body = generateInsightsRequest(cand, language, sender);
    const { data: d } = await sb.from('outreach_drafts').insert({ candidate_id: candidateId, kind, language, subject: language === 'he' ? 'בקשת נתונים לבחינת שיתוף פעולה' : 'A few numbers for the collaboration review', body }).select().single();
    return json({ draft: d });
  }
  const rec = recommendTrack(cand);
  const chosen = track ?? rec.track;
  let draft = generateOutreach(cand, chosen, language, track ? `Owner-selected track (engine suggested ${rec.track}: ${rec.reason})` : rec.reason, { senderName: sender });
  let polished: string | null = null;
  if (polish) {
    const res = await callClaude({ tier: 'screening', system: 'You polish outreach messages for a luxury villa. Keep every fact, keep the structure and length, improve flow. Never add prices, numbers of nights, discounts or claims about facilities not present in the draft. Reply with the message text only.', messages: [{ role: 'user', content: `Language: ${language}\n\n${draft.body}` }], maxTokens: 1200 });
    await recordUsage(sb, { candidateId, provider: 'claude', operation: 'outreach_polish', costUsd: res.costUsd });
    if (!PRICE_RE.test(res.text)) polished = res.text.trim();
  }
  const body = polished ?? draft.body;
  const { data: d } = await sb.from('outreach_drafts').insert({ candidate_id: candidateId, kind, track: chosen, language, subject: draft.subject, body, personalisation_facts: draft.personalisationFacts, why_this_track: draft.whyThisTrack }).select().single();
  return json({ draft: d, suggestedTrack: rec, polished: polished !== null });
});
