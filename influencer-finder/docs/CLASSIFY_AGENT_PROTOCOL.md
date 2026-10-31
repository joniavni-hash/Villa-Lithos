# Classification protocol (session run)

The production edge function `classify-candidates` sends `SYSTEM_SCREENING` plus the
evidence pack to Claude and validates the JSON against `CLASSIFICATION_SCHEMA`.
For the first run executed inside the build session, the same protocol is run by
Claude analysts over `data/run-2026-10-15/classify-batch-N.json`, producing
`classified-batch-N.json`:

```json
{ "batch": N, "model": "claude (session analyst)", "results": [
  { "handle": "...", "classification": { ...Classification fields... }, "events": [ ...RetreatEvent... ], "profile": { "displayName", "country", "languages", "niche", "markets" } }
]}
```

Hard rules (identical to the production prompt):
- evidenceUrls must be URLs present in the candidate's evidence pack. `scripts/merge-classified.py` drops any other URL.
- Unknown → value null, confidence 0.
- Winter = event dates in Nov–Apr, from the evidence itself.
- No numbers that are not literally in the evidence.
