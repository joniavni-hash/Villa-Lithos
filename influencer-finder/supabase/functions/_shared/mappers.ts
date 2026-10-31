// Row → Candidate mapper shared by the edge functions.
import type { Candidate, Classification } from './engine/pipeline/types.ts';

export function toCandidate(row: Record<string, unknown>, ev: Array<{ url: string; title?: string; excerpt?: string; kind?: string }>, events: Array<Record<string, unknown>>, classification?: Classification): Candidate {
  return {
    id: row.id as string,
    profile: { handle: row.handle as string, profileUrl: row.profile_url as string, displayName: (row.display_name as string) ?? undefined, followers: (row.followers as number) ?? undefined, bio: (row.bio as string) ?? undefined, country: (row.country as string) ?? undefined, website: (row.website as string) ?? undefined, niche: (row.niche as string) ?? undefined, engagement: (row.engagement as Candidate['profile']['engagement']) ?? undefined },
    markets: (row.markets as Candidate['markets']) ?? [],
    events: events.map((e) => ({ title: e.title as string, eventType: e.event_type as never, startDate: (e.start_date as string) ?? undefined, endDate: (e.end_date as string) ?? undefined, nights: (e.nights as number) ?? undefined, location: (e.location as string) ?? undefined, country: (e.country as string) ?? undefined, groupSize: (e.group_size as number) ?? undefined, pricePerPerson: (e.price_per_person as number) ?? undefined, currency: (e.currency as string) ?? undefined, soldOut: (e.sold_out as boolean) ?? undefined, role: e.role as never, isWinter: !!e.is_winter, provenance: e.provenance as never, evidenceUrls: (e.evidence_urls as string[]) ?? [] })),
    evidence: ev.map((e) => ({ url: e.url, title: e.title, excerpt: e.excerpt, kind: (e.kind as never) ?? 'other', source: 'tavily', observedAt: new Date().toISOString() })),
    classification,
    privateInsights: (row.private_insights as Candidate['privateInsights']) ?? undefined,
    publicScore: (row.public_score as Candidate['publicScore']) ?? undefined,
    verifiedScore: (row.verified_score as Candidate['verifiedScore']) ?? undefined,
    verificationStatus: (row.verification_status as Candidate['verificationStatus']) ?? 'public_only',
    pipelineStage: (row.pipeline_stage as Candidate['pipelineStage']) ?? 'discovered',
    discoveredAt: row.discovered_at as string, lastSeenAt: row.last_seen_at as string, discoveryQueries: (row.discovery_queries as string[]) ?? [],
  };
}
