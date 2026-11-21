/**
 * Villa Lithos property profile and commercial defaults.
 *
 * Values marked `verified: false` are planning assumptions supplied by the owner
 * and must not be used as marketing claims until confirmed.
 */
export interface VillaProfile {
  name: string;
  location: string;
  website: string;
  instagramHandle: string | null;
  bedrooms: { value: number; verified: boolean };
  groupCapacity: { value: number; verified: boolean };
  minutesFromAthensAirport: { value: number; verified: boolean };
  ferryRequired: boolean;
  launched: string;
  propertyManager: string;
  minimumNights: { value: number; verified: boolean };
  /** Confirmed winter infrastructure. Empty until the owner confirms items. */
  confirmedWinterFeatures: string[];
  /** Explicitly unconfirmed. Must never appear in outreach as a promise. */
  unconfirmedWinterFeatures: string[];
  positioning: string;
}

export const VILLA: VillaProfile = {
  name: 'Villa Lithos',
  location: 'Porto Rafti, Attica, Greece',
  website: 'https://www.villalithos.com',
  instagramHandle: null, // to be supplied by the owner
  bedrooms: { value: 9, verified: true },
  groupCapacity: { value: 18, verified: false },
  minutesFromAthensAirport: { value: 20, verified: true },
  ferryRequired: false,
  launched: '2025-Q4',
  propertyManager: 'Aviv Goldenberg',
  minimumNights: { value: 4, verified: false },
  confirmedWinterFeatures: [],
  unconfirmedWinterFeatures: ['heated pool', 'indoor heating capacity for groups', 'winter kitchen staffing'],
  positioning: 'Accessible Mediterranean Winter Retreat Destination: 20 minutes from Athens airport, no ferry, privacy and premium facilities.',
};

export interface SeasonTarget {
  label: string;
  start: string; // ISO date
  end: string;
}

export const DEFAULT_SEASON: SeasonTarget = {
  label: 'Winter 2026/27',
  start: '2026-11-01',
  end: '2027-04-30',
};

/** Commercial assumptions (all editable in Settings). */
export const COMMERCIAL_DEFAULTS = {
  /** Owner's floor price per night, EUR. Placeholder until the owner sets it; used only for sensitivity. */
  floorPricePerNightEur: 1500,
  floorPriceVerified: false,
  /** Share of an event's gross revenue an organiser typically allocates to the venue. Sensitivity assumption, not an industry fact. */
  venueBudgetShareOfRevenue: 0.35,
  /** Default referral commission (editable). */
  referralCommissionRate: 0.10,
  referralCommissionVerified: false,
  /** Operational cost of a collaboration track, EUR, used in the net-value formula. Owner-editable. */
  collaborationCostEur: {
    scouting_stay: 2500,    // ~2 complimentary nights + hosting
    pilot_retreat: 4000,    // discounted pilot, content production, hosting
    anchor_partnership: 6000,
    referral_partnership: 500,
  } as Record<string, number>,
  /** Research spend cap per run, USD. */
  runSpendCapUsd: 15,
  /** Approximate unit costs used by the cost tracker. */
  unitCostsUsd: {
    tavilySearchBasic: 0.008,   // 1 credit
    tavilySearchAdvanced: 0.016, // 2 credits
    tavilyExtractPerUrl: 0.008,
    claudeHaikuPer1kIn: 0.001,
    claudeHaikuPer1kOut: 0.005,
    claudeSonnetPer1kIn: 0.003,
    claudeSonnetPer1kOut: 0.015,
  },
};

export const PREFERRED_MARKETS = ['IL', 'GB', 'DE', 'CH', 'NL', 'SE', 'DK', 'NO', 'FI', 'FR'] as const;

/** Markets with a direct, short flight to Athens that run winter retreats; used for geographic fit. */
export const MARKET_FIT: Record<string, number> = {
  IL: 1.0, GB: 0.9, DE: 0.9, CH: 0.9, NL: 0.85, SE: 0.8, DK: 0.8, NO: 0.8, FI: 0.75, FR: 0.85,
  AT: 0.8, BE: 0.8, IE: 0.75, IT: 0.7, GR: 0.6, CY: 0.6, US: 0.45, CA: 0.4, AU: 0.3, OTHER: 0.4,
};
