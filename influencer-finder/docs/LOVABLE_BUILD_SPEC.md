# Lovable build plan (executed after credit approval)

Target: a new Lovable project "Villa Lithos Influencer Finder" with Lovable Cloud
(Supabase database, auth, storage, edge functions) and Lovable AI (Claude models via
the gateway; BYO `ANTHROPIC_API_KEY` optional).

## Message 1 — scaffold + schema
- Enable Cloud. Apply `supabase/migrations/0001_schema.sql` verbatim.
- Auth: email+password, single owner; all screens behind login.
- Secrets to request through the secure form: `TAVILY_API_KEY` (required), `ANTHROPIC_API_KEY` (optional).
- Design: minimalist luxury-hospitality SaaS, mobile first, warm stone palette, serif display headings, no dashboard clutter. English UI.

## Message 2 — edge functions
Deploy `run-discovery`, `classify-candidates`, `analyze-insights`, `generate-outreach`, `export-csv`
and the `_shared` folder exactly as in `supabase/functions/`. No logic changes.

## Message 3 — screens
1. Dashboard: `dashboard_summary` view; Tier A list; insights received; expected nights (base) with "computed, not verified" label; research cost.
2. Run: season, markets, niches, group size, depth (quick/standard/deep), spend cap; Run button calls `run-discovery` create → loops `step` until done → `resolve` → `classify-candidates` in batches; live log from `run_logs`; source status chips from `sources`; cost from `api_usage`.
3. Candidates: table/cards with avatar, handle, tier, fit, confidence, verification badge (Publicly Verified / Privately Assessed), markets, stage; sort, filters, search.
4. Candidate detail: profile, evidence list (every URL clickable), events, classification judgements with confidence + evidence links, score breakdown with weights, risks, score history, notes, manual override, Not Relevant with reason, follow-up date.
5. Verified Performance tab: upload to private bucket `insights` (screenshot/PDF/export/media kit/report), "test fixture" checkbox, Analyse button → `analyze-insights`; show extracted metrics with provenance and source document; Before/After score comparison; derived metrics charts.
6. Best Match: top candidate + 9 alternatives, two rankings (public data / verified performance; the second only when private insights exist), each with why, evidence, winter proof, capacity, expected nights range, value range, missing-to-verify, risks, recommended track, draft message, next step.
7. Pipeline: Kanban on `pipeline_stage`, drag between stages, skipping insights stages allowed.
8. Outreach: track picker, EN/HE, generate via `generate-outreach`, edit, save, copy; never send.
9. Settings: villa profile (verified flags), season, floor price slider, weights sliders normalised to 100, venue share, referral rate, collaboration costs, nightly revenue, spend cap, LLM provider, sources status, data deletion (candidate + documents).

## Message 4 — seed and QA
- Seed `data/run-2026-10-15/candidates.json` through `run-discovery`-equivalent inserts (handles, evidence with URLs, events) and run `classify-candidates` on all.
- QA checklist: run, candidates, filters, best match, evidence links open, upload + analysis with a test fixture, pipeline persistence, repeat run (no duplicates, statuses kept), CSV export.
