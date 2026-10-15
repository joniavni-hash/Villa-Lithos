/**
 * Dynamic rescoring when private insights arrive. Keeps the public score
 * untouched, produces a verified score, and explains the delta.
 */
import type { Candidate, PrivateInsights, ScoreResult, Weights } from '../pipeline/types.ts';
import { scoreCandidate, type ScoringOptions } from '../scoring/score.ts';

export interface RescoreResult {
  publicScore: ScoreResult;
  verifiedScore: ScoreResult;
  deltas: Array<{ criterion: keyof Weights; before: number; after: number; delta: number }>;
  fitDelta: number;
  confidenceDelta: number;
  explanation: string[];
  derived: DerivedMetrics;
}

export interface DerivedMetrics {
  storyReachToFollowers: number | null;
  relevantGeoShare: number | null;
  medianReelReach: number | null;
  historicalFillRate: number | null;
  avgTicketsPerEvent: number | null;
  instagramAttributedRegistrations: number | null;
  conversionEfficiency: number | null;   // conversions per 1k reach, when campaign data exists
}

const RELEVANT = new Set(['IL', 'GB', 'DE', 'CH', 'NL', 'SE', 'DK', 'NO', 'FI', 'FR', 'AT', 'BE', 'IE']);

export function deriveMetrics(c: Candidate, pi: PrivateInsights): DerivedMetrics {
  const followers = c.profile.followers ?? null;
  const storyReach = pi.storyReachAvg?.value ?? null;
  const geo = pi.audienceCountries?.length ? pi.audienceCountries.filter((a) => RELEVANT.has(a.country)).reduce((s, a) => s + a.share, 0) : null;
  const regs = pi.registrationsPerEvent ?? [];
  const avgTickets = regs.length ? regs.reduce((s, r) => s + r.registrations, 0) / regs.length : null;
  const fillRate = pi.eventsSoldOutCount?.value != null && pi.retreatsOrganisedCount?.value ? pi.eventsSoldOutCount.value / pi.retreatsOrganisedCount.value : null;
  const igRegs = pi.instagramAttributedShare?.value != null && avgTickets != null ? pi.instagramAttributedShare.value * avgTickets : null;
  const campaigns = (pi.priorCampaigns ?? []).filter((x) => x.conversions != null && x.clicks != null);
  const conv = campaigns.length && pi.accountsReached90d?.value ? (campaigns.reduce((s, x) => s + (x.conversions ?? 0), 0) / pi.accountsReached90d.value) * 1000 : null;
  return {
    storyReachToFollowers: storyReach != null && followers ? storyReach / followers : null,
    relevantGeoShare: geo,
    medianReelReach: pi.reelsReachMedian?.value ?? null,
    historicalFillRate: fillRate,
    avgTicketsPerEvent: avgTickets,
    instagramAttributedRegistrations: igRegs,
    conversionEfficiency: conv,
  };
}

export function rescoreWithInsights(c: Candidate, pi: PrivateInsights, opts: ScoringOptions = {}): RescoreResult {
  const publicScore = c.publicScore ?? scoreCandidate(c, { ...opts, usePrivateInsights: false });
  const withPi: Candidate = { ...c, privateInsights: pi };
  const verifiedScore = scoreCandidate(withPi, { ...opts, usePrivateInsights: true });
  const keys = Object.keys(publicScore.breakdown) as Array<keyof Weights>;
  const deltas = keys.map((k) => ({ criterion: k, before: publicScore.breakdown[k], after: verifiedScore.breakdown[k], delta: verifiedScore.breakdown[k] - publicScore.breakdown[k] }));
  const derived = deriveMetrics(c, pi);
  const explanation: string[] = [];
  for (const d of deltas) if (Math.abs(d.delta) >= 5) explanation.push(`${d.criterion}: ${d.before} → ${d.after} (${d.delta > 0 ? '+' : ''}${d.delta}).`);
  if (derived.relevantGeoShare != null) explanation.push(`Audience in preferred source markets: ${(derived.relevantGeoShare * 100).toFixed(0)}% (document-backed).`);
  if (derived.historicalFillRate != null) explanation.push(`Historical sold-out rate: ${(derived.historicalFillRate * 100).toFixed(0)}% of reported events.`);
  if (derived.avgTicketsPerEvent != null) explanation.push(`Average registrations per reported event: ${derived.avgTicketsPerEvent.toFixed(1)}.`);
  if (pi.contradictions?.length) explanation.push(`Contradictions found: ${pi.contradictions.join('; ')} — confidence reduced.`);
  if (!explanation.length) explanation.push('Private insights did not materially change the public assessment.');
  return {
    publicScore,
    verifiedScore,
    deltas,
    fitDelta: verifiedScore.fitScore - publicScore.fitScore,
    confidenceDelta: Math.round((verifiedScore.confidence - publicScore.confidence) * 100) / 100,
    explanation,
    derived,
  };
}
