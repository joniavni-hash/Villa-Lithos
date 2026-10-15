import { describe, expect, it } from 'vitest';
import { generateQueries, DEFAULT_RUN_PARAMETERS, balancedSelection } from '../src/discovery/queryGenerator.ts';
import { handleFromUrl, handleFromTitle, handleFromExtractedText, followersFromText, mergeCandidate, normalizeWebsite, cleanHandle } from '../src/discovery/normalize.ts';
import { normalizeWeights, DEFAULT_WEIGHTS } from '../src/scoring/weights.ts';
import { scoreCandidate } from '../src/scoring/score.ts';
import { estimateVenueBudget } from '../src/scoring/budget.ts';
import { expectedBookedNights, scoreToProbability } from '../src/scoring/ebn.ts';
import { rescoreWithInsights } from '../src/insights/rescoring.ts';
import { generateOutreach, recommendTrack, generateInsightsRequest } from '../src/outreach/generator.ts';
import type { Candidate, Classification, Judgement } from '../src/pipeline/types.ts';

const yes = (urls: string[] = ['https://www.instagram.com/p/x']): Judgement => ({ value: true, confidence: 0.85, evidenceUrls: urls });
const no = (): Judgement => ({ value: false, confidence: 0.8, evidenceUrls: ['https://www.instagram.com/p/y'] });
const unk = (): Judgement => ({ value: null, confidence: 0, evidenceUrls: [] });

function baseCandidate(over: Partial<Candidate> = {}): Candidate {
  return {
    profile: { handle: 'test_host', profileUrl: 'https://www.instagram.com/test_host/', displayName: 'Dana Host', followers: 12000, bio: 'Yoga retreats host', country: 'GB' },
    markets: ['GB'],
    events: [],
    evidence: [{ url: 'https://www.instagram.com/p/x', kind: 'post', source: 'tavily', observedAt: '2026-10-15T00:00:00Z' }, { url: 'https://www.instagram.com/p/y', kind: 'post', source: 'tavily', observedAt: '2026-10-15T00:00:00Z' }, { url: 'https://example.com/retreat', kind: 'event_page', source: 'tavily', observedAt: '2026-10-15T00:00:00Z' }],
    verificationStatus: 'public_only',
    pipelineStage: 'discovered',
    discoveredAt: '2026-10-15T00:00:00Z',
    lastSeenAt: '2026-10-15T00:00:00Z',
    discoveryQueries: [],
    ...over,
  };
}

const strongClassification: Classification = {
  group: 'A_retreat_organizer', decidesVenue: yes(), sellsRetreats: yes(), provenWinterActivity: yes(), canFillGroupSize: yes(), audiencePaysPremium: yes(), runsRecurringEvents: yes(), longStayPotential: unk(), brandFit: yes(), priorCommercialEvidence: yes(),
  commercialRisk: 'low', recommendedTrack: 'anchor_partnership', redFlags: [], missingInformation: [], summary: 's', model: 'test', analysedAt: '2026-10-15T00:00:00Z',
};

describe('query generator', () => {
  it('generates hundreds of distinct queries across lanes and languages', () => {
    const qs = generateQueries({ ...DEFAULT_RUN_PARAMETERS, maxQueries: 5000 });
    expect(qs.length).toBeGreaterThan(500);
    expect(new Set(qs.map((q) => q.query.toLowerCase())).size).toBe(qs.length);
    const lanes = new Set(qs.map((q) => q.lane));
    expect(lanes.has('organizer_intent')).toBe(true);
    expect(lanes.has('competitor_venue')).toBe(true);
    expect(lanes.has('listing_site')).toBe(true);
    expect(qs.some((q) => q.language === 'he')).toBe(true);
    expect(qs.some((q) => q.language === 'de')).toBe(true);
  });
  it('is deterministic and capped with balanced lanes', () => {
    const a = generateQueries({ ...DEFAULT_RUN_PARAMETERS, maxQueries: 120 });
    const b = generateQueries({ ...DEFAULT_RUN_PARAMETERS, maxQueries: 120 });
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
    expect(a.length).toBe(120);
    const counts: Record<string, number> = {};
    for (const q of a) counts[q.lane] = (counts[q.lane] ?? 0) + 1;
    expect(Object.keys(counts).length).toBeGreaterThanOrEqual(5);
    expect(balancedSelection(a, 10).length).toBe(10);
  });
});

describe('normalize', () => {
  it('extracts handles from profile urls, titles and extracted text', () => {
    expect(handleFromUrl('https://www.instagram.com/bodyflows')).toBe('bodyflows');
    expect(handleFromUrl('https://www.instagram.com/p/DdA2hDHRlsg')).toBeNull();
    expect(handleFromUrl('https://www.instagram.com/reel/abc/')).toBeNull();
    expect(handleFromTitle('Body Flows (@BodyFlows)')).toBe('bodyflows');
    expect(handleFromExtractedText('Log In\nNever miss a post from the\\_art\\_of\\_phuning\nSign up')).toBe('the_art_of_phuning');
    expect(handleFromExtractedText('bellamaldener\n•\nFollow\nOriginal audio')).toBe('bellamaldener');
    expect(followersFromText('## x\n 1,050 followers\n 210 following')).toBe(1050);
    expect(followersFromText('12.3K followers')).toBe(12300);
  });
  it('merges candidates without duplicating evidence', () => {
    const a = baseCandidate();
    const b = baseCandidate({ profile: { handle: 'test_host', profileUrl: a.profile.profileUrl, followers: 15000 }, evidence: [a.evidence[0], { url: 'https://new', kind: 'post', source: 'tavily', observedAt: '2026-10-16T00:00:00Z' }], lastSeenAt: '2026-10-16T00:00:00Z' });
    const m = mergeCandidate(a, b);
    expect(m.evidence.length).toBe(4);
    expect(m.profile.followers).toBe(15000);
    expect(m.profile.displayName).toBe('Dana Host');
    expect(m.lastSeenAt).toBe('2026-10-16T00:00:00Z');
  });
});

describe('weights', () => {
  it('normalises to exactly 100', () => {
    const w = normalizeWeights({ ...DEFAULT_WEIGHTS, bookingIntentAuthority: 50, provenWinterActivity: 50 });
    expect(Object.values(w).reduce((a, b) => a + b, 0)).toBe(100);
    expect(w.bookingIntentAuthority).toBeGreaterThan(w.geographicFit);
  });
});

describe('scoring', () => {
  it('cannot reach Tier A without winter evidence', () => {
    const c = baseCandidate({ classification: { ...strongClassification, provenWinterActivity: unk() } });
    const s = scoreCandidate(c);
    expect(s.tier).not.toBe('A');
    if (s.fitScore >= 75) expect(s.gates).toContain('no_winter_evidence_blocks_tier_a');
  });
  it('reaches Tier A with verified winter events and strong classification', () => {
    const c = baseCandidate({
      classification: strongClassification,
      events: [
        { title: 'Winter Reset Tenerife', startDate: '2026-01-10', nights: 6, groupSize: 14, pricePerPerson: 1900, currency: 'EUR', role: 'organizer', isWinter: true, provenance: 'verified_public_fact', evidenceUrls: ['https://example.com/retreat'] },
        { title: 'Algarve Flow', startDate: '2025-11-20', nights: 5, groupSize: 12, pricePerPerson: 1500, currency: 'EUR', role: 'organizer', isWinter: true, provenance: 'verified_public_fact', evidenceUrls: ['https://example.com/retreat'] },
      ],
    });
    const s = scoreCandidate(c);
    expect(s.fitScore).toBeGreaterThanOrEqual(75);
    expect(s.tier).toBe('A');
    expect(s.breakdown.provenWinterActivity).toBe(95);
  });
  it('prefers proven commercial activity over popularity', () => {
    const small = baseCandidate({ profile: { handle: 'small', profileUrl: 'u', followers: 9000, bio: 'b', country: 'GB' }, classification: strongClassification, events: [{ title: 'Sold out retreat', startDate: '2026-02-01', nights: 5, groupSize: 14, pricePerPerson: 1800, currency: 'EUR', role: 'organizer', isWinter: true, soldOut: true, provenance: 'verified_public_fact', evidenceUrls: ['https://example.com/retreat'] }] });
    const big = baseCandidate({ profile: { handle: 'big', profileUrl: 'u', followers: 300000, bio: 'lifestyle', country: 'GB' }, classification: { ...strongClassification, group: 'none', decidesVenue: no(), sellsRetreats: no(), provenWinterActivity: unk(), canFillGroupSize: unk(), priorCommercialEvidence: unk() } });
    expect(scoreCandidate(small).fitScore).toBeGreaterThan(scoreCandidate(big).fitScore + 20);
  });
  it('disqualifies on severe red flags and lowers confidence on contradictions', () => {
    const c = baseCandidate({ classification: { ...strongClassification, redFlags: ['Evidence of bought followers'] } });
    expect(scoreCandidate(c).tier).toBe('excluded');
    const d = baseCandidate({ classification: strongClassification, privateInsights: { contradictions: ['media kit followers 50k vs public 12k'] } });
    const pub = scoreCandidate(d, { usePrivateInsights: false });
    const priv = scoreCandidate(d, { usePrivateInsights: true });
    expect(priv.gates).toContain('contradictions_reduce_confidence');
    expect(priv.confidence).toBeLessThan(pub.confidence + 0.2);
  });
  it('responds to weight changes', () => {
    const c = baseCandidate({ classification: strongClassification, markets: ['OTHER'] });
    const geoHeavy = scoreCandidate(c, { weights: { geographicFit: 80 } });
    const def = scoreCandidate(c);
    expect(geoHeavy.fitScore).toBeLessThan(def.fitScore);
  });
});

describe('budget and expected nights', () => {
  it('estimates venue budget from participants × price × share', () => {
    const b = estimateVenueBudget({ participants: 14, pricePerParticipant: 2000, nights: 5, provenance: 'verified_public_fact' }, 1500);
    expect(b.eventRevenueEur).toBe(28000);
    expect(b.venueBudgetEur).toBeCloseTo(9800);
    expect(b.venueBudgetPerNightEur).toBeCloseTo(1960);
    expect(b.meetsFloor).toBe(true);
    expect(b.provenance).toBe('evidence_supported_inference');
    const none = estimateVenueBudget({ participants: null, pricePerParticipant: null, provenance: 'unknown' });
    expect(none.venueBudgetEur).toBeNull();
    expect(none.meetsFloor).toBeNull();
  });
  it('maps score to probability monotonically and reports computed-not-verified', () => {
    expect(scoreToProbability(90, 0.9)).toBeGreaterThan(scoreToProbability(60, 0.9));
    expect(scoreToProbability(90, 0.2)).toBeLessThan(scoreToProbability(90, 0.9));
    const c = baseCandidate({ classification: strongClassification });
    const s = scoreCandidate(c);
    const e = expectedBookedNights({ score: s, typicalNights: 6, eventsPerYear: 3, winterShare: 0.5, nightlyRevenueEur: 2000, track: 'pilot_retreat', verified: false });
    expect(e.expectedBookedNights.base).toBeGreaterThan(e.expectedBookedNights.conservative);
    expect(e.expectedBookedNights.optimistic).toBeGreaterThan(e.expectedBookedNights.base);
    expect(e.probabilityKind).toBe('computed_not_verified');
    expect(e.expectedNetValueEur.base).not.toBeNull();
  });
});

describe('rescoring with private insights', () => {
  it('keeps the public score and explains the change', () => {
    const c = baseCandidate({ classification: strongClassification, events: [{ title: 'Winter retreat', startDate: '2026-12-01', nights: 5, role: 'organizer', isWinter: true, provenance: 'verified_public_fact', evidenceUrls: ['https://example.com/retreat'] }] });
    c.publicScore = scoreCandidate(c);
    const r = rescoreWithInsights(c, {
      audienceCountries: [{ country: 'GB', share: 0.5, provenance: 'document_backed' }, { country: 'DE', share: 0.2, provenance: 'document_backed' }],
      registrationsPerEvent: [{ eventTitle: 'Winter retreat', registrations: 14, provenance: 'document_backed' }],
      avgPricePerParticipant: { value: 1800, provenance: 'document_backed' },
      retreatsOrganisedCount: { value: 4, provenance: 'influencer_reported' },
      eventsSoldOutCount: { value: 3, provenance: 'influencer_reported' },
    });
    expect(r.publicScore.fitScore).toBe(c.publicScore.fitScore);
    expect(r.verifiedScore.confidence).toBeGreaterThan(r.publicScore.confidence);
    expect(r.derived.relevantGeoShare).toBeCloseTo(0.7);
    expect(r.derived.historicalFillRate).toBeCloseTo(0.75);
    expect(r.explanation.length).toBeGreaterThan(0);
  });
});

describe('outreach', () => {
  it('drafts in both languages without prices and names a real fact', () => {
    const c = baseCandidate({ classification: strongClassification, events: [{ title: 'Winter Reset Tenerife', location: 'Tenerife', startDate: '2026-01-10', nights: 6, role: 'organizer', isWinter: true, provenance: 'verified_public_fact', evidenceUrls: ['https://example.com/retreat'] }] });
    const t = recommendTrack(c);
    expect(t.track).toBe('anchor_partnership');
    const en = generateOutreach(c, t.track, 'en', t.reason);
    const he = generateOutreach(c, t.track, 'he', t.reason);
    expect(en.body).toContain('Winter Reset Tenerife');
    expect(en.body).toContain('Hi Dana');
    expect(he.body).toContain('היי Dana');
    expect(/€\s?\d|\d\s?€/.test(en.body)).toBe(false);
    expect(en.personalisationFacts[0].url).toBe('https://example.com/retreat');
    expect(generateInsightsRequest(c, 'en')).toContain('last 90 days');
    expect(generateInsightsRequest(c, 'he')).toContain('90');
  });
  it('recommends referral for audience-of-organisers accounts without own events', () => {
    const c = baseCandidate({ classification: { ...strongClassification, group: 'B_reaches_organizers' } });
    expect(recommendTrack(c).track).toBe('referral_partnership');
  });
});

import { buildLearningSnapshot, type OutcomeRow } from '../src/insights/learning.ts';
describe('learning', () => {
  const bd = (x: number) => ({ bookingIntentAuthority: x, provenWinterActivity: x, audienceRelevance: 50, estimatedVenueBudget: 50, geographicFit: 50, expectedStayDuration: 50, engagementQuality: 50, partnershipFeasibility: 50 });
  it('refuses to suggest weights on thin data', () => {
    const s = buildLearningSnapshot([{ handle: 'a', breakdown: bd(90), outcome: 'positive', booked: true }, { handle: 'b', breakdown: bd(20), outcome: 'negative', booked: false }]);
    expect(s.weightSuggestion).toBeNull();
    expect(s.note).toMatch(/Not enough outcomes/);
  });
  it('suggests damped, normalised weights with enough outcomes', () => {
    const rows: OutcomeRow[] = [...[...Array(6)].map((_, i): OutcomeRow => ({ handle: `p${i}`, breakdown: bd(90), outcome: 'positive', booked: i < 2 })), ...[...Array(6)].map((_, i): OutcomeRow => ({ handle: `n${i}`, breakdown: bd(20), outcome: 'negative', booked: false }))];
    const s = buildLearningSnapshot(rows);
    expect(s.weightSuggestion).not.toBeNull();
    expect(Object.values(s.weightSuggestion!).reduce((a, b) => a + b, 0)).toBe(100);
    expect(s.weightSuggestion!.bookingIntentAuthority).toBeGreaterThan(25);
  });
});

describe('normalizeWebsite', () => {
  it('treats scheme, www, trailing slash and query as the same site', () => {
    expect(normalizeWebsite('https://www.TenerifePadelRetreats.com/')).toBe('tenerifepadelretreats.com');
    expect(normalizeWebsite('tenerifepadelretreats.com/?utm=1')).toBe('tenerifepadelretreats.com');
    expect(normalizeWebsite('http://example.com/retreats/')).toBe('example.com/retreats');
  });
  it('returns null for empty values', () => {
    expect(normalizeWebsite(null)).toBeNull();
    expect(normalizeWebsite('  ')).toBeNull();
  });
});

describe('outreach wording', () => {
  const base = (): Candidate => ({
    profile: { handle: 'host_x', profileUrl: 'https://www.instagram.com/host_x/', displayName: 'Dana Levi', bio: null, followers: null, followersProvenance: 'unknown', website: null, country: null, languages: ['en'], niche: null },
    accountType: 'person_or_brand', markets: [], evidence: [],
    events: [{ title: 'The Winter Reset retreat, Lanzarote', eventType: 'yoga_retreat', startDate: '2027-01-10', endDate: '2027-01-15', nights: 5, location: 'Lanzarote, Canary Islands', country: 'ES', groupSize: null, pricePerPerson: null, currency: null, soldOut: false, role: 'organizer', isWinter: true, provenance: 'verified_public_fact', evidenceUrls: ['https://www.instagram.com/p/x'] }],
    verificationStatus: 'public_only', pipelineStage: 'discovered', discoveredAt: '2026-10-15', lastSeenAt: '2026-10-15', discoveryQueries: [],
  } as unknown as Candidate);
  it('opening line names the event once, without repeating the place or a raw date', () => {
    const en = generateOutreach(base(), 'pilot_retreat', 'en', 'r');
    expect(en.body).toContain('I came across your Winter Reset retreat, Lanzarote on Instagram');
    expect(en.body).not.toContain('2027-01-10');
    expect(en.body).not.toContain('your The ');
  });
  it('Hebrew defaults to the neutral plural form and honours an explicit gender', () => {
    const neutral = generateOutreach(base(), 'pilot_retreat', 'he', 'r').body;
    expect(neutral).toContain('אתם מביאים');
    expect(neutral).not.toContain('את מביאה');
    expect(generateOutreach(base(), 'pilot_retreat', 'he', 'r', { recipientGender: 'female' }).body).toContain('את מביאה');
    expect(generateOutreach(base(), 'pilot_retreat', 'he', 'r', { recipientGender: 'male' }).body).toContain('אתה מביא');
    expect(generateInsightsRequest(base(), 'he')).toContain('תוכלו');
    expect(generateInsightsRequest(base(), 'he', undefined, 'female')).toContain('תוכלי');
  });
  it('track reasons are gender neutral', () => {
    for (const r of [recommendTrack(base()).reason]) expect(r).not.toMatch(/\b(she|her|herself|he|him|his)\b/i);
  });
});

describe('cleanHandle', () => {
  it('drops sentence punctuation and @, keeps inner periods', () => {
    expect(cleanHandle('@JamieBerman_.')).toBe('jamieberman_');
    expect(cleanHandle('yoga.with.dana')).toBe('yoga.with.dana');
    expect(handleFromExtractedText('More posts from thenomadcollective_.')).toBe('thenomadcollective_');
  });
  it('rejects invalid handles', () => {
    expect(cleanHandle('a..b')).toBeNull();
    expect(cleanHandle('...')).toBeNull();
    expect(cleanHandle('has space')).toBeNull();
  });
});
