# Villa Lithos Influencer Finder — core engine

Autonomous Instagram influencer intelligence and booking platform for Villa Lithos
(Porto Rafti, Attica). Objective: find the Instagram accounts most likely to generate
booked nights between November and April, with traceable evidence, and recommend the
partnership to offer. Not reach, not followers.

This folder holds everything that is platform-independent and testable:

| Path | What |
| --- | --- |
| `src/pipeline/types.ts` | Data model: candidate, evidence, events, classification, private insights, scores, provenance |
| `src/config/villa.ts` | Property profile and commercial defaults (unverified items flagged) |
| `src/discovery/queryGenerator.ts` | Dynamic query engine: 1,100+ queries from event type × month × destination × market × language × intent; lane-balanced capping; deterministic ids for resume |
| `src/discovery/normalize.ts` | Handle extraction (profile URLs, titles, extracted post text), follower parsing, market/language guess, candidate merge, dedupe |
| `src/scoring/weights.ts` | Default weights, normalisation to 100 |
| `src/scoring/score.ts` | 0–100 fit score, confidence, tier gates (no winter evidence → no Tier A), red flags, contradictions |
| `src/scoring/budget.ts` | Venue budget estimate (participants × price × venue share, floor-price check, scenarios) |
| `src/scoring/ebn.ts` | Expected booked nights (primary) and expected net value (secondary), conservative/base/optimistic |
| `src/insights/rescoring.ts` | Private-insights rescoring: keeps the public score, computes derived metrics, explains the delta |
| `src/outreach/generator.ts` | Track recommendation, EN/HE drafts from real facts, insights-request message, no-price guard |
| `src/ai/prompts.ts` | Claude prompts (screening / deep / insights extraction), JSON schema, model tiers |
| `supabase/migrations/0001_schema.sql` | Full schema: runs, resumable query plan, candidates, evidence, events, score history, private insights, outreach, feedback, learning, RLS, private storage bucket |
| `supabase/functions/*` | Deno edge functions: `run-discovery` (resumable, spend-capped), `classify-candidates`, `analyze-insights`, `generate-outreach`, `export-csv` |
| `tests/engine.test.ts` | 15 tests covering generator, normaliser, weights, scoring gates, budget, EBN, rescoring, outreach |
| `data/run-2026-10-15/` | The first real discovery run: query plan, raw Tavily responses, normalised candidates, ranked output |

```
npm install
npm test            # vitest
npm run typecheck
npm run queries 400 out.json   # print a query plan
./scripts/sync-shared.sh       # copy src → supabase/functions/_shared/engine
```

## Sources

| Source | Status | Note |
| --- | --- | --- |
| Tavily | enabled when `TAVILY_API_KEY` is set | Instagram-focused search (profiles, posts, reels) + extract for author resolution and event pages |
| Instagram Graph API | needs credentials | Business Discovery enriches known Business/Creator handles (followers, media count, bio, website, recent media). Hashtag Search returns media without author usernames and is capped at 30 hashtags per 7 days. Neither exposes third-party audience insights. |
| Apify | needs approval | Not used; costs, reliability and platform-terms exposure must be approved first |
| Private uploads | enabled | Screenshots, PDFs, exports, media kits, sales reports; stored in a private bucket |

## Provenance

Every stored number carries one of: `verified_public_fact`, `evidence_supported_inference`,
`influencer_reported`, `document_backed`, `independently_verified`, `ai_estimate`, `unknown`.
A screenshot is `document_backed`, never `independently_verified`. Booking probabilities are
`computed_not_verified` until outcomes exist.
