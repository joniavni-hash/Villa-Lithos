# Architecture

```
┌──────────────┐    create/step/resolve     ┌─────────────────────┐
│  Web app     │ ─────────────────────────▶ │ run-discovery (Edge) │──▶ Tavily search/extract
│  (Lovable,   │                            └─────────┬───────────┘
│  React, EN)  │                                      │ upsert candidates, evidence, unresolved posts, logs, api_usage
│              │    classify (batches)      ┌─────────▼───────────┐
│  Dashboard   │ ─────────────────────────▶ │ classify-candidates  │──▶ Claude (Haiku screening → Sonnet deep for Tier A)
│  Run         │                            └─────────┬───────────┘
│  Candidates  │                                      │ classification, events, public_score, ebn, budget, score_history
│  Detail      │    upload → analyse        ┌─────────▼───────────┐
│  Verified    │ ─────────────────────────▶ │ analyze-insights     │──▶ Claude vision over private bucket docs
│  Best Match  │                            └─────────┬───────────┘
│  Pipeline    │                                      │ private_insights, verified_score (public score kept)
│  Outreach    │    draft                   ┌─────────▼───────────┐
│  Settings    │ ─────────────────────────▶ │ generate-outreach    │  (drafts only; never sends)
└──────────────┘                            └─────────────────────┘
                 Supabase: Postgres (RLS), Auth, private Storage bucket `insights`
```

Key properties
- **Resumable runs**: the query plan is materialised in `run_queries`; `step` processes pending rows and persists after each query. A crash or timeout loses nothing; the next `step` continues. Spend cap pauses the run.
- **Identity = handle**: `candidates.handle` is unique; repeat runs merge evidence, bump `last_seen_at`, never duplicate, never reset `pipeline_stage`.
- **Provenance on every number**: enum `provenance`; private documents are `document_backed`, Graph API values are `independently_verified`.
- **Public vs verified score**: `public_score` is immutable history; `verified_score` is added by Stage 2; `score_history` keeps every scoring event with the weights used.
- **Test fixtures**: `insights_documents.is_test = true` exercises extraction without touching a real candidate's ranking.
- **Keys server-side only**: edge functions read `TAVILY_API_KEY`, `ANTHROPIC_API_KEY` (optional), `LOVABLE_API_KEY` (gateway) from backend secrets.
- **Learning**: `feedback` + `learning_snapshots`; weight suggestions are only emitted once ≥10 outcomes exist, and are presented as suggestions, never auto-applied.
