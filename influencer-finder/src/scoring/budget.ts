/**
 * Venue budget estimation.
 *
 * The villa is priced by proposal, so we estimate what an organiser can pay
 * for the venue from her event economics. The 35% share is a sensitivity
 * assumption supplied by the owner, not an industry fact; it is editable.
 */
import { COMMERCIAL_DEFAULTS } from '../config/villa.ts';
import type { Provenance } from '../pipeline/types.ts';

export interface BudgetInputs {
  participants?: number | null;          // expected or published group size
  pricePerParticipant?: number | null;   // EUR
  nights?: number | null;
  priorVenueBudget?: number | null;      // EUR per event, if ever disclosed
  venueShare?: number;                   // default 0.35
  provenance: Provenance;
}

export interface BudgetEstimate {
  eventRevenueEur: number | null;
  venueBudgetEur: number | null;         // per event
  venueBudgetPerNightEur: number | null;
  meetsFloor: boolean | null;
  floorPricePerNightEur: number;
  assumptions: string[];
  provenance: Provenance;
  /** Conservative / base / optimistic per-night budgets. */
  scenarios: { conservative: number | null; base: number | null; optimistic: number | null };
}

export function estimateVenueBudget(input: BudgetInputs, floorPricePerNightEur = COMMERCIAL_DEFAULTS.floorPricePerNightEur): BudgetEstimate {
  const share = input.venueShare ?? COMMERCIAL_DEFAULTS.venueBudgetShareOfRevenue;
  const assumptions: string[] = [`Venue share of event revenue assumed at ${(share * 100).toFixed(0)}% (sensitivity assumption, editable).`];
  const nights = input.nights ?? null;

  if (input.priorVenueBudget != null && input.priorVenueBudget > 0) {
    const perNight = nights ? input.priorVenueBudget / nights : null;
    assumptions.push('Prior venue budget disclosed by the organiser; used directly.');
    return {
      eventRevenueEur: null,
      venueBudgetEur: input.priorVenueBudget,
      venueBudgetPerNightEur: perNight,
      meetsFloor: perNight == null ? null : perNight >= floorPricePerNightEur,
      floorPricePerNightEur,
      assumptions,
      provenance: input.provenance,
      scenarios: { conservative: perNight == null ? null : perNight * 0.8, base: perNight, optimistic: perNight == null ? null : perNight * 1.15 },
    };
  }

  if (input.participants == null || input.pricePerParticipant == null || input.participants <= 0 || input.pricePerParticipant <= 0) {
    return { eventRevenueEur: null, venueBudgetEur: null, venueBudgetPerNightEur: null, meetsFloor: null, floorPricePerNightEur, assumptions: [...assumptions, 'Participants or price per participant unknown; no estimate.'], provenance: 'unknown', scenarios: { conservative: null, base: null, optimistic: null } };
  }

  const revenue = input.participants * input.pricePerParticipant;
  const venue = revenue * share;
  const perNight = nights ? venue / nights : null;
  if (!nights) assumptions.push('Event length unknown; per-night budget not computed.');
  const cons = perNight == null ? null : (revenue * Math.max(0.2, share - 0.1)) / (nights as number);
  const opt = perNight == null ? null : (revenue * Math.min(0.5, share + 0.1)) / (nights as number);
  return {
    eventRevenueEur: revenue,
    venueBudgetEur: venue,
    venueBudgetPerNightEur: perNight,
    meetsFloor: perNight == null ? null : perNight >= floorPricePerNightEur,
    floorPricePerNightEur,
    assumptions,
    provenance: input.provenance === 'verified_public_fact' ? 'evidence_supported_inference' : input.provenance === 'unknown' ? 'ai_estimate' : input.provenance,
    scenarios: { conservative: cons, base: perNight, optimistic: opt },
  };
}
