/**
 * Core data model of the Villa Lithos Influencer Finder.
 *
 * Every fact carries provenance. The product never presents an estimate as an
 * observation: `Provenance` is attached to every number and every claim that
 * feeds the score, and the UI renders it next to the value.
 */

/** How a fact came to be known. Mirrors the enum in supabase/migrations. */
export type Provenance =
  | 'verified_public_fact'        // seen on a public page we link to
  | 'evidence_supported_inference' // inferred from one or more linked pages
  | 'influencer_reported'          // the influencer told us, no document
  | 'document_backed'              // a screenshot / PDF / export she sent us
  | 'independently_verified'       // confirmed through an authorised API (e.g. Graph API business discovery)
  | 'ai_estimate'                  // model estimate, no direct evidence
  | 'unknown';

export type SourceId = 'tavily' | 'instagram_graph' | 'apify' | 'manual' | 'influencer_upload';

export type SourceStatus = 'enabled' | 'disabled' | 'needs_approval' | 'needs_credentials';

export interface SourceDefinition {
  id: SourceId;
  label: string;
  status: SourceStatus;
  /** Why it is not enabled and what enabling it would add to coverage. */
  note: string;
}

export type EventType =
  | 'wellness_retreat'
  | 'yoga_retreat'
  | 'fitness_retreat'
  | 'padel_retreat'
  | 'womens_retreat'
  | 'personal_development_retreat'
  | 'leadership_retreat'
  | 'corporate_offsite'
  | 'executive_mastermind'
  | 'workshop'
  | 'teacher_training'
  | 'long_stay_program';

export type Market = 'IL' | 'GB' | 'DE' | 'CH' | 'NL' | 'SE' | 'DK' | 'NO' | 'FI' | 'FR' | 'OTHER';

export type Language = 'en' | 'he' | 'de' | 'fr' | 'nl' | 'sv' | 'da' | 'no';

export type CandidateGroup =
  | 'A_retreat_organizer'
  | 'B_reaches_organizers'
  | 'C_high_value_host'
  | 'none';

export type Tier = 'A' | 'B' | 'C' | 'D' | 'excluded';

export interface Evidence {
  id?: string;
  url: string;
  title?: string;
  /** Short quote or excerpt that supports the claim. */
  excerpt?: string;
  /** What this evidence is about. */
  kind:
    | 'profile'
    | 'post'
    | 'reel'
    | 'event_page'
    | 'website'
    | 'listing'
    | 'press'
    | 'media_kit'
    | 'insights_export'
    | 'campaign_report'
    | 'sales_report'
    | 'other';
  source: SourceId;
  observedAt: string; // ISO
  /** Tavily / search relevance score if any. */
  score?: number;
}

export interface RetreatEvent {
  id?: string;
  title: string;
  eventType?: EventType;
  /** ISO date or partial like '2026-11' when only the month is known. */
  startDate?: string;
  endDate?: string;
  nights?: number;
  location?: string;
  country?: string;
  /** Group size as published (e.g. "12 spots"). */
  groupSize?: number;
  /** Price per participant as published, in `currency`. */
  pricePerPerson?: number;
  currency?: string;
  soldOut?: boolean;
  /** Is the candidate the organiser (sells it) or only promoting someone else's event? */
  role: 'organizer' | 'co_host' | 'promoter' | 'unknown';
  /** November–April window. */
  isWinter: boolean;
  provenance: Provenance;
  evidenceUrls: string[];
}

export interface PublicProfile {
  handle: string;              // lowercase, no @
  profileUrl: string;          // https://www.instagram.com/<handle>/
  displayName?: string;
  profilePictureUrl?: string;
  country?: string;            // ISO2 if known
  languages?: Language[];
  niche?: string;
  followers?: number;
  followersProvenance?: Provenance;
  bio?: string;
  links?: string[];
  website?: string;
  /** Available engagement signals (likes/comments on sampled posts). */
  engagement?: { sampledPosts: number; avgLikes?: number; avgComments?: number; provenance: Provenance };
  /** Up to 20 recent, lawfully accessible posts we looked at. */
  recentPosts?: Array<{ url: string; caption?: string; postedAt?: string; likes?: number; comments?: number }>;
}

/** Output of the Claude classification step (public screening). */
export interface Classification {
  group: CandidateGroup;
  decidesVenue: Judgement;
  sellsRetreats: Judgement;       // sells vs only promotes
  provenWinterActivity: Judgement;
  canFillGroupSize: Judgement;    // can fill 9 bedrooms / ~18 guests
  audiencePaysPremium: Judgement;
  runsRecurringEvents: Judgement;
  longStayPotential: Judgement;
  brandFit: Judgement;
  priorCommercialEvidence: Judgement;
  commercialRisk: 'low' | 'medium' | 'high' | 'unknown';
  recommendedTrack: PartnershipTrack;
  redFlags: string[];
  missingInformation: string[];
  summary: string;
  /** Model identifier used, so the UI can show which tier of analysis ran. */
  model: string;
  analysedAt: string;
}

export interface Judgement {
  value: boolean | null;         // null = unknown
  confidence: number;            // 0..1
  evidenceUrls: string[];
  note?: string;
}

export type PartnershipTrack = 'scouting_stay' | 'pilot_retreat' | 'anchor_partnership' | 'referral_partnership';

/** Private, influencer-supplied performance data (Stage 2). */
export interface PrivateInsights {
  reportingPeriodStart?: string;
  reportingPeriodEnd?: string;
  accountsReached90d?: Metric;
  views90d?: Metric;
  impressions90d?: Metric;
  audienceCountries?: Array<{ country: string; share: number; provenance: Provenance }>;
  audienceCities?: Array<{ city: string; share: number; provenance: Provenance }>;
  audienceAge?: Array<{ bracket: string; share: number; provenance: Provenance }>;
  audienceGender?: { female?: number; male?: number; provenance: Provenance };
  storyViewsAvg?: Metric;
  storyReachAvg?: Metric;
  storyLinkClicksAvg?: Metric;
  reelsReachAvg?: Metric;
  reelsReachMedian?: Metric;
  reelsViewsAvg?: Metric;
  engagementRate?: Metric;
  retreatsOrganisedCount?: Metric;
  registrationsPerEvent?: Array<{ eventTitle: string; registrations: number; attended?: number; provenance: Provenance; evidenceUrl?: string }>;
  avgPricePerParticipant?: Metric;
  eventsSoldOutCount?: Metric;
  instagramAttributedShare?: Metric;    // 0..1
  priorCampaigns?: Array<{ brand: string; outcome?: string; clicks?: number; conversions?: number; revenue?: number; provenance: Provenance }>;
  /** Contradictions the extractor found between documents or vs public data. */
  contradictions?: string[];
}

export interface Metric {
  value: number;
  unit?: string;
  provenance: Provenance;
  /** Document / upload id or URL that backs the number. */
  sourceRef?: string;
  note?: string;
}

export interface ScoreBreakdown {
  bookingIntentAuthority: number;   // 0..100 each criterion
  provenWinterActivity: number;
  audienceRelevance: number;
  estimatedVenueBudget: number;
  geographicFit: number;
  expectedStayDuration: number;
  engagementQuality: number;
  partnershipFeasibility: number;
}

export interface ScoreResult {
  fitScore: number;               // 0..100 weighted
  confidence: number;             // 0..1
  tier: Tier;
  breakdown: ScoreBreakdown;
  weightsUsed: Weights;
  gates: string[];                // which rules fired (e.g. 'no_winter_evidence_blocks_tier_a')
  redFlags: string[];
  disqualified: boolean;
  disqualificationReason?: string;
}

export interface Weights {
  bookingIntentAuthority: number;
  provenWinterActivity: number;
  audienceRelevance: number;
  estimatedVenueBudget: number;
  geographicFit: number;
  expectedStayDuration: number;
  engagementQuality: number;
  partnershipFeasibility: number;
}

export interface Candidate {
  id?: string;
  profile: PublicProfile;
  group?: CandidateGroup;
  markets: Market[];
  events: RetreatEvent[];
  evidence: Evidence[];
  classification?: Classification;
  privateInsights?: PrivateInsights;
  /** Score from public data only. Kept forever, even after private rescoring. */
  publicScore?: ScoreResult;
  /** Score after private insights were analysed. */
  verifiedScore?: ScoreResult;
  /** Which stage the candidate reached. */
  verificationStatus: 'public_only' | 'insights_requested' | 'insights_received' | 'privately_assessed';
  pipelineStage: PipelineStage;
  discoveredAt: string;
  lastSeenAt: string;
  discoveryQueries: string[];
}

export type PipelineStage =
  | 'discovered'
  | 'publicly_qualified'
  | 'verification_queue'
  | 'insights_requested'
  | 'insights_received'
  | 'ai_analysis_complete'
  | 'commercially_verified'
  | 'contacted'
  | 'replied'
  | 'negotiating'
  | 'booked'
  | 'rejected'
  | 'not_relevant';
