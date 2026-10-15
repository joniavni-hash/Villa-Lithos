/**
 * Ranks a classified dataset with the exact scoring engine used in production.
 * Input: data/run-2026-10-15/classified.json  ({ candidates: Candidate[] })
 * Output: data/run-2026-10-15/ranked.json with scores, EBN, budget, track, and the Best Match + 9.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { scoreCandidate } from '../src/scoring/score.ts';
import { expectedBookedNights } from '../src/scoring/ebn.ts';
import { estimateVenueBudget } from '../src/scoring/budget.ts';
import { recommendTrack, generateOutreach } from '../src/outreach/generator.ts';
import type { Candidate } from '../src/pipeline/types.ts';

const inPath = process.argv[2] ?? 'data/run-2026-10-15/classified.json';
const outPath = process.argv[3] ?? 'data/run-2026-10-15/ranked.json';
const { candidates } = JSON.parse(readFileSync(inPath, 'utf8')) as { candidates: Candidate[] };

function median(nums: number[]): number | null { if (!nums.length) return null; const s = [...nums].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }

const ranked = candidates.map((c) => {
  const score = scoreCandidate(c);
  const track = recommendTrack(c);
  const org = c.events.filter((e) => e.role === 'organizer' || e.role === 'co_host');
  const ebn = expectedBookedNights({ score, typicalNights: median(org.map((e) => e.nights).filter((n): n is number => !!n)), eventsPerYear: org.length || null, winterShare: org.length ? org.filter((e) => e.isWinter).length / org.length : null, nightlyRevenueEur: null, track: track.track, verified: false });
  const best = [...c.events].sort((a, b) => (b.pricePerPerson ?? 0) * (b.groupSize ?? 0) - (a.pricePerPerson ?? 0) * (a.groupSize ?? 0))[0];
  const budget = estimateVenueBudget({ participants: best?.groupSize ?? null, pricePerParticipant: best?.pricePerPerson ?? null, nights: best?.nights ?? null, provenance: best?.provenance ?? 'unknown' });
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
writeFileSync(outPath, JSON.stringify({ rankedAt: new Date().toISOString(), tiers, bestMatch: ranked[0]?.profile.handle, alternatives: ranked.slice(1, 10).map((r) => r.profile.handle), candidates: ranked }, null, 1));
console.log(JSON.stringify({ total: ranked.length, tiers, top10: ranked.slice(0, 10).map((r) => ({ handle: r.profile.handle, tier: r.publicScore.tier, fit: r.publicScore.fitScore, conf: r.publicScore.confidence, ebnBase: Number(r.ebn.expectedBookedNights.base.toFixed(2)), track: r.track.track, gates: r.publicScore.gates })) }, null, 1));
