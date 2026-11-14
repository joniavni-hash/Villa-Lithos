/**
 * Expected Booked Nights (primary objective) and Expected Net Commercial Value
 * (secondary). Probabilities here are computed, never empirically verified;
 * the output says so and carries scenarios.
 */
import { COMMERCIAL_DEFAULTS } from '../config/villa.ts';
import type { PartnershipTrack, ScoreResult } from '../pipeline/types.ts';

export interface EbnInputs {
  score: ScoreResult;
  /** Nights per event the organiser typically runs (published event lengths). */
  typicalNights?: number | null;
  /** Events per year she runs, from evidence. */
  eventsPerYear?: number | null;
  /** Fraction of her events that fall in Nov–Apr, from evidence. */
  winterShare?: number | null;
  /** Estimated nightly revenue the villa would realise, EUR. */
  nightlyRevenueEur?: number | null;
  track: PartnershipTrack;
  /** Does private verified data back these inputs? */
  verified: boolean;
  /**
   * Estimated venue budget per night divided by the floor price (null when unknown).
   * Below 1 the group cannot pay the floor price, so the booking probability is scaled
   * by this ratio (minimum 0.1). Unknown budgets leave the probability unchanged.
   */
  budgetToFloorRatio?: number | null;
}

type EventLike = { role: string; startDate?: string | null; nights?: number | null; isWinter?: boolean };

/**
 * Event-derived EBN inputs. Events per year is the busiest single season window
 * (1 Nov to 31 Oct), so posts from several past seasons are not added together.
 * Undated events cannot be placed in a window; they count only if they exceed the busiest window.
 */
export function eventInputs(events: EventLike[]): { typicalNights: number | null; eventsPerYear: number | null; winterShare: number | null } {
  const org = events.filter((e) => e.role === 'organizer' || e.role === 'co_host');
  if (!org.length) return { typicalNights: null, eventsPerYear: null, winterShare: null };
  const nights = org.map((e) => e.nights).filter((n): n is number => typeof n === 'number' && n > 0).sort((a, b) => a - b);
  const m = Math.floor(nights.length / 2);
  const typicalNights = nights.length ? (nights.length % 2 ? nights[m] : (nights[m - 1] + nights[m]) / 2) : null;
  const windows = new Map<number, number>();
  let undated = 0;
  for (const e of org) {
    const d = /^(\d{4})-(\d{2})/.exec(e.startDate ?? '');
    if (!d) { undated++; continue; }
    const y = Number(d[1]); const mo = Number(d[2]);
    const key = mo >= 11 ? y : y - 1;
    windows.set(key, (windows.get(key) ?? 0) + 1);
  }
  const busiest = windows.size ? Math.max(...windows.values()) : 0;
  const eventsPerYear = Math.max(busiest, undated) || null;
  return { typicalNights, eventsPerYear, winterShare: org.filter((e) => e.isWinter).length / org.length };
}

export interface EbnResult {
  bookingProbability: { conservative: number; base: number; optimistic: number };
  expectedNightsPerEvent: number;
  expectedEventsInSeason: { conservative: number; base: number; optimistic: number };
  expectedBookedNights: { conservative: number; base: number; optimistic: number };
  expectedNetValueEur: { conservative: number | null; base: number | null; optimistic: number | null };
  collaborationCostEur: number;
  probabilityKind: 'computed_not_verified' | 'computed_with_verified_inputs';
  assumptions: string[];
}

/** Map a fit score to a booking probability. Calibration is a logistic curve chosen so 50→~8%, 70→~25%, 85→~50%, 95→~70%. Not empirical. */
export function scoreToProbability(fitScore: number, confidence: number): number {
  const x = (fitScore - 85) / 8;
  const p = 0.72 / (1 + Math.exp(-x));
  // low confidence shrinks toward a prior of 5%
  return 0.05 + (p - 0.05) * (0.4 + 0.6 * confidence);
}

export function expectedBookedNights(input: EbnInputs): EbnResult {
  const assumptions: string[] = [];
  const nights = input.typicalNights ?? 5;
  if (input.typicalNights == null) assumptions.push('Typical event length unknown; assumed 5 nights.');
  const perYear = input.eventsPerYear ?? 1;
  if (input.eventsPerYear == null) assumptions.push('Events per year unknown; assumed 1.');
  const winterShare = input.winterShare ?? 0.3;
  if (input.winterShare == null) assumptions.push('Winter share of events unknown; assumed 30%.');
  let base = scoreToProbability(input.score.fitScore, input.score.confidence);
  const ratio = input.budgetToFloorRatio;
  if (ratio != null && ratio < 1) {
    const f = Math.max(0.1, ratio);
    base *= f;
    assumptions.push(`Estimated venue budget is ${(ratio * 100).toFixed(0)}% of the floor price; booking probability scaled by ${f.toFixed(2)}.`);
  } else if (ratio == null) assumptions.push('Venue budget unknown; booking probability not adjusted for affordability.');
  const prob = { conservative: Math.max(0.01, base * 0.5), base, optimistic: Math.min(0.9, base * 1.4) };
  // Events in a 6-month season = perYear * winterShare; anchor partnerships may add a repeat
  const seasonEvents = perYear * winterShare;
  const repeatBoost = input.track === 'anchor_partnership' ? 1.5 : input.track === 'pilot_retreat' ? 1.1 : 1.0;
  const events = { conservative: Math.max(0.25, seasonEvents * 0.7), base: Math.max(0.5, seasonEvents) * repeatBoost, optimistic: Math.max(1, seasonEvents * 1.5) * repeatBoost };
  const ebn = {
    conservative: prob.conservative * nights * events.conservative,
    base: prob.base * nights * events.base,
    optimistic: prob.optimistic * nights * events.optimistic,
  };
  const cost = COMMERCIAL_DEFAULTS.collaborationCostEur[input.track] ?? 0;
  const rev = input.nightlyRevenueEur ?? null;
  if (rev == null) assumptions.push('Nightly revenue not set; net value not computed.');
  const net = {
    conservative: rev == null ? null : ebn.conservative * rev * 0.85 - cost,
    base: rev == null ? null : ebn.base * rev - cost,
    optimistic: rev == null ? null : ebn.optimistic * rev * 1.1 - cost,
  };
  return {
    bookingProbability: prob,
    expectedNightsPerEvent: nights,
    expectedEventsInSeason: events,
    expectedBookedNights: ebn,
    expectedNetValueEur: net,
    collaborationCostEur: cost,
    probabilityKind: input.verified ? 'computed_with_verified_inputs' : 'computed_not_verified',
    assumptions,
  };
}
