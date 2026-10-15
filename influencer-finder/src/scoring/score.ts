/**
 * Commercial scoring engine: 0–100 fit score with dynamic weights, hard gates
 * and confidence. Pure function of a candidate snapshot; the same code runs in
 * the edge function and in local tests.
 */
import { MARKET_FIT } from '../config/villa.ts';
import type { Candidate, Classification, Judgement, ScoreBreakdown, ScoreResult, Tier, Weights } from '../pipeline/types.ts';
import { DEFAULT_WEIGHTS, normalizeWeights } from './weights.ts';
import { estimateVenueBudget } from './budget.ts';

export interface ScoringOptions {
  weights?: Partial<Weights>;
  floorPricePerNightEur?: number;
  venueShare?: number;
  /** Treat the candidate's private insights as present (Stage 2). */
  usePrivateInsights?: boolean;
}

const SEVERE_RED_FLAGS = [/fake follower/i, /scam/i, /fraud/i, /banned/i, /engagement pod/i, /bought followers/i];

function j(v: Judgement | undefined): { score: number; conf: number } {
  if (!v || v.value === null) return { score: 40, conf: 0 };            // unknown → neutral-low, zero confidence
  return { score: v.value ? 100 : 10, conf: Math.max(0, Math.min(1, v.confidence)) };
}

/** Blend a judgement into 0..100 by confidence: unknown pulls toward 40. */
function blend(v: Judgement | undefined): number {
  const { score, conf } = j(v);
  return 40 + (score - 40) * conf;
}

export function scoreCandidate(c: Candidate, opts: ScoringOptions = {}): ScoreResult {
  const weights = normalizeWeights({ ...DEFAULT_WEIGHTS, ...(opts.weights ?? {}) });
  const cl = c.classification;
  const gates: string[] = [];
  const redFlags: string[] = [...(cl?.redFlags ?? [])];
  const pi = opts.usePrivateInsights ? c.privateInsights : undefined;

  // 1. Booking intent & authority: decides venue + sells (not promotes) + group fit
  const intent = cl
    ? 0.5 * blend(cl.decidesVenue) + 0.35 * blend(cl.sellsRetreats) + 0.15 * blend(cl.canFillGroupSize)
    : 30;
  const organizerEvents = c.events.filter((e) => e.role === 'organizer' || e.role === 'co_host').length;
  const intentScore = Math.min(100, intent + Math.min(15, organizerEvents * 5));

  // 2. Proven winter activity: evidence-backed winter events dominate
  const winterEvents = c.events.filter((e) => e.isWinter && (e.role === 'organizer' || e.role === 'co_host'));
  const verifiedWinter = winterEvents.filter((e) => e.provenance === 'verified_public_fact' || e.provenance === 'document_backed' || e.provenance === 'independently_verified');
  let winterScore = cl ? blend(cl.provenWinterActivity) : 30;
  if (verifiedWinter.length >= 2) winterScore = Math.max(winterScore, 95);
  else if (verifiedWinter.length === 1) winterScore = Math.max(winterScore, 80);
  else if (winterEvents.length >= 1) winterScore = Math.max(winterScore, 60);
  const hasWinterEvidence = winterEvents.length > 0 || (cl?.provenWinterActivity.value === true && cl.provenWinterActivity.evidenceUrls.length > 0);

  // 3. Audience relevance: group B signal, premium audience, private geo data
  let audienceScore = cl ? 0.6 * blend(cl.audiencePaysPremium) + 0.4 * (cl.group === 'B_reaches_organizers' ? 100 : cl.group === 'A_retreat_organizer' ? 75 : cl.group === 'C_high_value_host' ? 70 : 30) : 35;
  if (pi?.audienceCountries?.length) {
    const relevant = pi.audienceCountries.filter((a) => (MARKET_FIT[a.country] ?? 0) >= 0.75).reduce((s, a) => s + a.share, 0);
    audienceScore = 0.5 * audienceScore + 50 * Math.min(1, relevant / 0.6);
  }

  // 4. Estimated venue budget
  const bestEvent = [...c.events].sort((a, b) => (b.pricePerPerson ?? 0) * (b.groupSize ?? 0) - (a.pricePerPerson ?? 0) * (a.groupSize ?? 0))[0];
  const participants = pi?.registrationsPerEvent?.length ? Math.max(...pi.registrationsPerEvent.map((r) => r.registrations)) : bestEvent?.groupSize ?? null;
  const price = pi?.avgPricePerParticipant?.value ?? bestEvent?.pricePerPerson ?? null;
  const budget = estimateVenueBudget({ participants, pricePerParticipant: price, nights: bestEvent?.nights ?? null, venueShare: opts.venueShare, provenance: pi ? 'document_backed' : bestEvent?.provenance ?? 'unknown' }, opts.floorPricePerNightEur);
  let budgetScore: number;
  if (budget.venueBudgetPerNightEur == null) budgetScore = cl ? 0.5 * blend(cl.audiencePaysPremium) + 0.5 * blend(cl.priorCommercialEvidence) : 35;
  else {
    const ratio = budget.venueBudgetPerNightEur / budget.floorPricePerNightEur;
    budgetScore = ratio >= 1.5 ? 100 : ratio >= 1 ? 80 : ratio >= 0.7 ? 50 : 20;
  }

  // 5. Geographic fit
  const marketFits = c.markets.map((m) => MARKET_FIT[m] ?? MARKET_FIT.OTHER);
  const geoScore = marketFits.length ? Math.max(...marketFits) * 100 : 40;

  // 6. Expected stay duration
  const maxNights = Math.max(0, ...c.events.map((e) => e.nights ?? 0));
  let stayScore = maxNights >= 10 ? 100 : maxNights >= 6 ? 85 : maxNights >= 4 ? 70 : maxNights > 0 ? 35 : 45;
  if (cl?.longStayPotential.value === true) stayScore = Math.max(stayScore, 85);

  // 7. Engagement quality
  let engagementScore = 50;
  const eng = c.profile.engagement;
  if (eng?.avgLikes != null && c.profile.followers) {
    const er = ((eng.avgLikes + (eng.avgComments ?? 0)) / c.profile.followers) * 100;
    engagementScore = er >= 5 ? 100 : er >= 3 ? 85 : er >= 1.5 ? 70 : er >= 0.7 ? 50 : 30;
  }
  if (pi?.engagementRate?.value != null) {
    const er = pi.engagementRate.value;
    engagementScore = er >= 5 ? 100 : er >= 3 ? 85 : er >= 1.5 ? 70 : er >= 0.7 ? 50 : 30;
  }

  // 8. Partnership feasibility: brand fit + low risk + recurring
  const feasibility = cl ? 0.5 * blend(cl.brandFit) + 0.3 * (cl.commercialRisk === 'low' ? 100 : cl.commercialRisk === 'medium' ? 60 : cl.commercialRisk === 'high' ? 15 : 40) + 0.2 * blend(cl.runsRecurringEvents) : 40;

  const breakdown: ScoreBreakdown = {
    bookingIntentAuthority: r(intentScore),
    provenWinterActivity: r(winterScore),
    audienceRelevance: r(audienceScore),
    estimatedVenueBudget: r(budgetScore),
    geographicFit: r(geoScore),
    expectedStayDuration: r(stayScore),
    engagementQuality: r(engagementScore),
    partnershipFeasibility: r(feasibility),
  };

  let fit = 0;
  for (const k of Object.keys(weights) as Array<keyof Weights>) fit += (breakdown[k] * weights[k]) / 100;

  // Confidence: share of judgements with evidence, data completeness, contradictions
  let confidence = confidenceFor(c, cl, !!pi);
  if (pi?.contradictions?.length) { confidence *= Math.max(0.4, 1 - 0.2 * pi.contradictions.length); gates.push('contradictions_reduce_confidence'); }

  // Disqualification
  const severe = redFlags.filter((f) => SEVERE_RED_FLAGS.some((re) => re.test(f)));
  const disqualified = severe.length > 0;
  if (disqualified) gates.push('severe_red_flag_disqualifies');

  // Tier gates
  let tier: Tier = fit >= 75 ? 'A' : fit >= 60 ? 'B' : fit >= 45 ? 'C' : 'D';
  if (tier === 'A' && !hasWinterEvidence) { tier = 'B'; gates.push('no_winter_evidence_blocks_tier_a'); }
  if (tier === 'A' && confidence < 0.4) { tier = 'B'; gates.push('low_confidence_blocks_tier_a'); }
  if (disqualified) tier = 'excluded';

  return {
    fitScore: r(fit),
    confidence: Math.round(confidence * 100) / 100,
    tier,
    breakdown,
    weightsUsed: weights,
    gates,
    redFlags,
    disqualified,
    disqualificationReason: disqualified ? severe.join('; ') : undefined,
  };
}

function r(n: number): number { return Math.round(Math.max(0, Math.min(100, n))); }

function confidenceFor(c: Candidate, cl: Classification | undefined, hasPrivate: boolean): number {
  if (!cl) return 0.15;
  const judgements: Judgement[] = [cl.decidesVenue, cl.sellsRetreats, cl.provenWinterActivity, cl.canFillGroupSize, cl.audiencePaysPremium, cl.runsRecurringEvents, cl.longStayPotential, cl.brandFit, cl.priorCommercialEvidence];
  const known = judgements.filter((x) => x.value !== null);
  const withEvidence = judgements.filter((x) => x.evidenceUrls.length > 0);
  const avgConf = known.length ? known.reduce((s, x) => s + x.confidence, 0) / known.length : 0;
  const completeness = [c.profile.followers != null, !!c.profile.bio, c.events.length > 0, c.evidence.length >= 3, !!c.profile.country].filter(Boolean).length / 5;
  let conf = 0.45 * avgConf + 0.3 * (withEvidence.length / judgements.length) + 0.25 * completeness;
  if (hasPrivate) conf = Math.min(1, conf + 0.2);
  return Math.max(0.05, Math.min(1, conf));
}
