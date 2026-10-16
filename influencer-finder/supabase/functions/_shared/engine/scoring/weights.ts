import type { Weights } from '../pipeline/types.ts';

export const DEFAULT_WEIGHTS: Weights = {
  bookingIntentAuthority: 25,
  provenWinterActivity: 20,
  audienceRelevance: 15,
  estimatedVenueBudget: 15,
  geographicFit: 10,
  expectedStayDuration: 5,
  engagementQuality: 5,
  partnershipFeasibility: 5,
};

export const WEIGHT_LABELS: Record<keyof Weights, string> = {
  bookingIntentAuthority: 'Booking intent and decision-making authority',
  provenWinterActivity: 'Proven winter activity',
  audienceRelevance: 'Audience relevance',
  estimatedVenueBudget: 'Estimated venue budget',
  geographicFit: 'Geographic fit',
  expectedStayDuration: 'Expected stay duration',
  engagementQuality: 'Engagement quality',
  partnershipFeasibility: 'Partnership feasibility',
};

/** Normalise any set of non-negative weights so they sum to exactly 100 (largest remainder rounding). */
export function normalizeWeights(w: Partial<Weights>): Weights {
  const keys = Object.keys(DEFAULT_WEIGHTS) as Array<keyof Weights>;
  const raw = keys.map((k) => Math.max(0, Number(w[k] ?? DEFAULT_WEIGHTS[k])));
  const total = raw.reduce((a, b) => a + b, 0);
  if (total === 0) return { ...DEFAULT_WEIGHTS };
  const scaled = raw.map((v) => (v / total) * 100);
  const floored = scaled.map(Math.floor);
  let remainder = 100 - floored.reduce((a, b) => a + b, 0);
  const order = scaled.map((v, i) => ({ i, frac: v - floored[i] })).sort((a, b) => b.frac - a.frac);
  for (const { i } of order) { if (remainder <= 0) break; floored[i] += 1; remainder -= 1; }
  const out = {} as Weights;
  keys.forEach((k, i) => { out[k] = floored[i]; });
  return out;
}
