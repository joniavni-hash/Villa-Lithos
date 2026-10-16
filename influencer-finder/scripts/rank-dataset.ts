/**
 * Ranks a classified dataset with the exact scoring engine used in production.
 * Input: data/run-2026-10-15/classified.json  ({ candidates: Candidate[] })
 * Output: data/run-2026-10-15/ranked.json with scores, EBN, budget, track, and the Best Match + 9.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { scoreCandidate } from '../src/scoring/score.ts';
import { expectedBookedNights, eventInputs } from '../src/scoring/ebn.ts';
import { estimateVenueBudget, budgetInputsFromEvents } from '../src/scoring/budget.ts';
import { recommendTrack, generateOutreach } from '../src/outreach/generator.ts';
import { normalizeWebsite } from '../src/discovery/normalize.ts';
import type { Candidate } from '../src/pipeline/types.ts';

const inPath = process.argv[2] ?? 'data/run-2026-10-15/classified.json';
const outPath = process.argv[3] ?? 'data/run-2026-10-15/ranked.json';
const { candidates } = JSON.parse(readFileSync(inPath, 'utf8')) as { candidates: Candidate[] };

const ranked = candidates.map((c) => {
  const score = scoreCandidate(c);
  const track = recommendTrack(c);
  const bi = budgetInputsFromEvents(c.events);
  const budget = estimateVenueBudget(bi.inputs);
  budget.assumptions.push(...bi.notes);
  const budgetToFloorRatio = budget.venueBudgetPerNightEur == null ? null : budget.venueBudgetPerNightEur / budget.floorPricePerNightEur;
  const ebn = expectedBookedNights({ score, ...eventInputs(c.events), nightlyRevenueEur: null, track: track.track, verified: false, budgetToFloorRatio });
  const outreachEn = score.tier === 'excluded' ? null : generateOutreach(c, track.track, 'en', track.reason);
  const outreachHe = score.tier === 'excluded' ? null : generateOutreach(c, track.track, 'he', track.reason);
  return { ...c, publicScore: score, track, ebn, budget, outreachEn, outreachHe };
});

ranked.sort((a, b) => {
  if (a.publicScore.disqualified !== b.publicScore.disqualified) return a.publicScore.disqualified ? 1 : -1;
  return b.ebn.expectedBookedNights.base - a.ebn.expectedBookedNights.base || b.publicScore.fitScore - a.publicScore.fitScore;
});
const tiers: Record<string, number> = {};
for (const r of ranked) tiers[r.publicScore.tier] = (tiers[r.publicScore.tier] ?? 0) + 1;

// Sister accounts (two handles, one website) count as one organiser for the Best Match list.
const seenSites = new Map<string, string>();
const sisterAccounts: Record<string, string> = {};
const shortlist: typeof ranked = [];
for (const r of ranked) {
  const site = normalizeWebsite(r.profile.website);
  if (site && seenSites.has(site)) { sisterAccounts[r.profile.handle] = seenSites.get(site)!; continue; }
  if (site) seenSites.set(site, r.profile.handle);
  if (shortlist.length < 10) shortlist.push(r);
}
writeFileSync(outPath, JSON.stringify({ rankedAt: new Date().toISOString(), tiers, bestMatch: shortlist[0]?.profile.handle, alternatives: shortlist.slice(1, 10).map((r) => r.profile.handle), sisterAccounts, candidates: ranked }, null, 1));
console.log(JSON.stringify({ total: ranked.length, tiers, sisterAccounts, top10: shortlist.map((r) => ({ handle: r.profile.handle, tier: r.publicScore.tier, fit: r.publicScore.fitScore, conf: r.publicScore.confidence, ebnBase: Number(r.ebn.expectedBookedNights.base.toFixed(2)), track: r.track.track, gates: r.publicScore.gates })) }, null, 1));
