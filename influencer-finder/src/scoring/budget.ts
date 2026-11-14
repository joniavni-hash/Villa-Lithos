/**
 * Venue budget estimation.
 *
 * The villa is priced by proposal, so we estimate what an organiser can pay
 * for the venue from her event economics. The 35% share is a sensitivity
 * assumption supplied by the owner, not an industry fact; it is editable.
 */
import { COMMERCIAL_DEFAULTS, VILLA } from '../config/villa.ts';
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

type BudgetEvent = { role: string; pricePerPerson?: number | null; currency?: string | null; groupSize?: number | null; nights?: number | null; provenance?: Provenance };
const med = (xs: number[]): number | null => { if (!xs.length) return null; const s = [...xs].sort((a, b) => a - b); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };

/**
 * Budget inputs from an organiser's published events. Organisers rarely publish price and
 * group size on the same post, so: price = highest published EUR price per person; group =
 * that event's size, else the median published size, else the villa's capacity (stated as an
 * assumption). Groups larger than the villa are capped at its capacity. Prices in other
 * currencies are not converted; the note says so and no estimate is made.
 */
export function budgetInputsFromEvents(events: BudgetEvent[], capacity: number = VILLA.groupCapacity.value): { inputs: BudgetInputs; notes: string[] } {
  const org = events.filter((e) => e.role === 'organizer' || e.role === 'co_host');
  const pool = org.length ? org : events;
  const notes: string[] = [];
  const priced = pool.filter((e) => typeof e.pricePerPerson === 'number' && e.pricePerPerson > 0);
  const eur = priced.filter((e) => (e.currency ?? '').toUpperCase() === 'EUR').sort((a, b) => (b.pricePerPerson as number) - (a.pricePerPerson as number));
  if (priced.length && !eur.length) notes.push(`Published price is in ${Array.from(new Set(priced.map((e) => e.currency ?? 'an unstated currency'))).join('/')}; not converted, so no budget estimate.`);
  const best = eur[0];
  if (!best) return { inputs: { participants: null, pricePerParticipant: null, nights: null, provenance: 'unknown' }, notes };
  let participants = best.groupSize ?? med(pool.map((e) => e.groupSize).filter((n): n is number => typeof n === 'number' && n > 0));
  let provenance: Provenance = best.provenance ?? 'unknown';
  if (participants == null) {
    participants = capacity; provenance = 'ai_estimate';
    notes.push(`Group size not published; assumed the group fills the villa (${capacity} guests${VILLA.groupCapacity.verified ? '' : ', capacity unverified'}).`);
  } else if (participants > capacity) {
    notes.push(`Published group of ${participants} exceeds the villa's ${capacity} guests; capped at capacity.`);
    participants = capacity;
  }
  const nights = best.nights ?? med(pool.map((e) => e.nights).filter((n): n is number => typeof n === 'number' && n > 0));
  return { inputs: { participants, pricePerParticipant: best.pricePerPerson as number, nights, provenance }, notes };
}
