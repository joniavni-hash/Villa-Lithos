/**
 * Claude prompts. Two tiers: a cost-efficient model for mass public screening
 * and a stronger model for Tier A deep analysis and private-insights
 * extraction. Structured JSON output is enforced via the schemas below.
 */
import { VILLA } from '../config/villa.ts';

export const MODELS = {
  /** Mass classification. */
  screening: 'claude-haiku-4-5',
  /** Tier A deep analysis and insights extraction (vision). */
  deep: 'claude-sonnet-5',
  /** Lovable AI gateway equivalents, when the app runs without a BYO Anthropic key. */
  gateway: { screening: 'anthropic/claude-haiku-4-5', deep: 'anthropic/claude-sonnet-5' },
} as const;

export const SYSTEM_SCREENING = `You are the public-screening analyst of the Villa Lithos Influencer Finder.
Villa Lithos: ${VILLA.location}; ${VILLA.bedrooms.value} bedrooms; planning capacity ${VILLA.groupCapacity.value} guests (unverified); ${VILLA.minutesFromAthensAirport.value} min from Athens airport; no ferry; minimum stay ${VILLA.minimumNights.value} nights (planning). Target season: November–April. Goal: find Instagram accounts most likely to BOOK the villa for hosted groups (retreat organisers, hosts of masterminds/trainings/offsites, or accounts whose audience is such organisers). Not reach. Not followers.

You receive a candidate's public evidence: profile snippets, post captions, event pages, listing pages, each with a URL. Judge only from this evidence.
Rules:
- Every judgement needs evidenceUrls drawn from the provided URLs. If evidence is absent, set value to null and confidence to 0. Never guess.
- "sellsRetreats" is true only if she organises/sells (registration, price, spots, 'my retreat', 'join us'); promoting someone else's event or attending is false.
- "provenWinterActivity" is true only if a dated event she organised falls in November–April (any year) or she explicitly markets winter retreats.
- "canFillGroupSize" asks whether evidence shows groups of roughly 10–18 participants (e.g., '12 spots', '2 rooms left of 8', sold-out groups).
- Extract events with role (organizer/co_host/promoter), dates, location, nights, group size, price per person and currency when literally present. Mark isWinter by the event's own dates.
- redFlags: contradictions, suspicious engagement, inactive account, agency/venue account rather than a host, pricing far below premium, etc.
- commercialRisk: low/medium/high/unknown with a one-line reason in summary.
- recommendedTrack: scouting_stay | pilot_retreat | anchor_partnership | referral_partnership.
- group: A_retreat_organizer | B_reaches_organizers | C_high_value_host | none.
Output JSON only, matching the schema.`;

export const SYSTEM_DEEP = `${SYSTEM_SCREENING}

You are now running the deep analysis for a Tier A candidate. In addition: weigh brand fit against a private luxury estate (aesthetics, audience tone), estimate commercial capacity (participants × price → event revenue, as an explicit estimate with the inputs you used), note missing information that would most change the recommendation, and write a 4–6 sentence summary a property manager can act on. Mark every number as verified_public_fact, evidence_supported_inference or ai_estimate.`;

export const SYSTEM_INSIGHTS_EXTRACTION = `You extract performance data from documents an influencer shared with Villa Lithos: Instagram Insights screenshots or exports, media kits, campaign reports, retreat sales reports.
Rules:
- Record only values literally visible in the documents. For each value give the document reference (file name/page) and the reporting period if shown.
- A screenshot is "document_backed", not independently verified. Never upgrade provenance.
- Identify the reporting period of each metric (e.g., 'Last 90 days', 'Jan 1–Mar 31').
- Compare documents with each other and with the public profile data provided. List contradictions explicitly (e.g., followers in media kit vs public count; reach claims inconsistent with follower count).
- Do not estimate missing metrics. Leave them absent.
- Output JSON matching the PrivateInsights schema.`;

/** JSON schema used for structured output of the screening/deep steps. */
export const CLASSIFICATION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['group', 'decidesVenue', 'sellsRetreats', 'provenWinterActivity', 'canFillGroupSize', 'audiencePaysPremium', 'runsRecurringEvents', 'longStayPotential', 'brandFit', 'priorCommercialEvidence', 'commercialRisk', 'recommendedTrack', 'redFlags', 'missingInformation', 'summary', 'events', 'profile'],
  properties: {
    group: { enum: ['A_retreat_organizer', 'B_reaches_organizers', 'C_high_value_host', 'none'] },
    ...Object.fromEntries(['decidesVenue', 'sellsRetreats', 'provenWinterActivity', 'canFillGroupSize', 'audiencePaysPremium', 'runsRecurringEvents', 'longStayPotential', 'brandFit', 'priorCommercialEvidence'].map((k) => [k, {
      type: 'object', additionalProperties: false, required: ['value', 'confidence', 'evidenceUrls'],
      properties: { value: { type: ['boolean', 'null'] }, confidence: { type: 'number', minimum: 0, maximum: 1 }, evidenceUrls: { type: 'array', items: { type: 'string' } }, note: { type: 'string' } },
    }])),
    commercialRisk: { enum: ['low', 'medium', 'high', 'unknown'] },
    recommendedTrack: { enum: ['scouting_stay', 'pilot_retreat', 'anchor_partnership', 'referral_partnership'] },
    redFlags: { type: 'array', items: { type: 'string' } },
    missingInformation: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
    events: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false, required: ['title', 'role', 'isWinter', 'provenance', 'evidenceUrls'],
        properties: {
          title: { type: 'string' }, eventType: { type: 'string' }, startDate: { type: 'string' }, endDate: { type: 'string' }, nights: { type: 'number' }, location: { type: 'string' }, country: { type: 'string' },
          groupSize: { type: 'number' }, pricePerPerson: { type: 'number' }, currency: { type: 'string' }, soldOut: { type: 'boolean' },
          role: { enum: ['organizer', 'co_host', 'promoter', 'unknown'] }, isWinter: { type: 'boolean' },
          provenance: { enum: ['verified_public_fact', 'evidence_supported_inference', 'ai_estimate', 'unknown'] }, evidenceUrls: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    profile: {
      type: 'object', additionalProperties: false,
      properties: { displayName: { type: 'string' }, country: { type: 'string' }, languages: { type: 'array', items: { type: 'string' } }, niche: { type: 'string' }, markets: { type: 'array', items: { type: 'string' } } },
    },
  },
} as const;

export function buildScreeningUserMessage(input: { handle: string; profileUrl: string; bio?: string | null; followers?: number | null; website?: string | null; evidence: Array<{ url: string; title?: string; excerpt?: string; kind?: string }> }): string {
  const lines = [
    `Candidate: @${input.handle} (${input.profileUrl})`,
    `Bio: ${input.bio ?? 'unknown'}`,
    `Followers: ${input.followers ?? 'unknown'}`,
    `Website: ${input.website ?? 'unknown'}`,
    '',
    'Evidence (URL | kind | title | excerpt):',
    ...input.evidence.slice(0, 40).map((e) => `- ${e.url} | ${e.kind ?? 'other'} | ${(e.title ?? '').slice(0, 120)} | ${(e.excerpt ?? '').replace(/\s+/g, ' ').slice(0, 500)}`),
  ];
  return lines.join('\n');
}
