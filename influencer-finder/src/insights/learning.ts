/**
 * Feedback learning. Aggregates owner outcomes (quality / not relevant / replied /
 * booked) against score breakdowns and only proposes weight changes once enough
 * outcomes exist. Never auto-applies; never claims learning on thin data.
 */
import type { ScoreBreakdown, Weights } from '../pipeline/types.ts';
import { DEFAULT_WEIGHTS, normalizeWeights } from '../scoring/weights.ts';

export interface OutcomeRow {
  handle: string;
  breakdown: ScoreBreakdown;
  /** Positive = booked or replied-positively or marked quality; negative = not relevant / rejected. */
  outcome: 'positive' | 'negative';
  booked: boolean;
}

export interface LearningSnapshot {
  outcomesCount: number;
  bookedCount: number;
  positiveCount: number;
  featureStats: Record<keyof ScoreBreakdown, { positiveMean: number | null; negativeMean: number | null; separation: number | null }>;
  weightSuggestion: Weights | null;
  note: string;
}

export const MIN_OUTCOMES_FOR_SUGGESTION = 10;
export const MIN_POSITIVES_FOR_SUGGESTION = 3;

export function buildLearningSnapshot(rows: OutcomeRow[], current: Weights = DEFAULT_WEIGHTS): LearningSnapshot {
  const keys = Object.keys(DEFAULT_WEIGHTS) as Array<keyof ScoreBreakdown>;
  const pos = rows.filter((r) => r.outcome === 'positive');
  const neg = rows.filter((r) => r.outcome === 'negative');
  const mean = (xs: OutcomeRow[], k: keyof ScoreBreakdown) => (xs.length ? xs.reduce((s, r) => s + r.breakdown[k], 0) / xs.length : null);
  const featureStats = {} as LearningSnapshot['featureStats'];
  for (const k of keys) {
    const p = mean(pos, k), n = mean(neg, k);
    featureStats[k] = { positiveMean: p, negativeMean: n, separation: p != null && n != null ? p - n : null };
  }
  const enough = rows.length >= MIN_OUTCOMES_FOR_SUGGESTION && pos.length >= MIN_POSITIVES_FOR_SUGGESTION && neg.length >= MIN_POSITIVES_FOR_SUGGESTION;
  if (!enough) {
    return { outcomesCount: rows.length, bookedCount: rows.filter((r) => r.booked).length, positiveCount: pos.length, featureStats, weightSuggestion: null, note: `Not enough outcomes for calibration (${rows.length} outcomes, ${pos.length} positive, ${neg.length} negative; need ≥${MIN_OUTCOMES_FOR_SUGGESTION} with ≥${MIN_POSITIVES_FOR_SUGGESTION} on each side). Rankings remain on default/owner weights.` };
  }
  // Nudge weights toward criteria that separate positives from negatives; damped so one season cannot swing the model.
  const suggestion: Partial<Weights> = {};
  for (const k of keys) {
    const sep = featureStats[k].separation ?? 0;
    const factor = 1 + Math.max(-0.3, Math.min(0.3, sep / 100));
    suggestion[k] = current[k] * factor;
  }
  return { outcomesCount: rows.length, bookedCount: rows.filter((r) => r.booked).length, positiveCount: pos.length, featureStats, weightSuggestion: normalizeWeights(suggestion), note: 'Suggested weights derived from outcome separation; damped ±30% per criterion. Review before applying.' };
}
