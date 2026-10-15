#!/usr/bin/env python3
"""Merge classified-batch-*.json (model output) with candidates.json into the
Candidate[] shape consumed by scripts/rank-dataset.ts. Validates that every
judgement's evidenceUrls exist in the candidate's evidence (no invented URLs)."""
import json, glob, os, re, sys
base = os.path.dirname(os.path.abspath(__file__)) + '/../data/run-2026-10-15'
d = json.load(open(f'{base}/candidates.json'))
by = {c['handle']: c for c in d['candidates']}
out = []; problems = []
JUDG = ['decidesVenue','sellsRetreats','provenWinterActivity','canFillGroupSize','audiencePaysPremium','runsRecurringEvents','longStayPotential','brandFit','priorCommercialEvidence']
NOW = '2026-10-15T20:00:00Z'
for f in sorted(glob.glob(f'{base}/classified-batch-*.json')):
    for r in json.load(open(f))['results']:
        h = r['handle'].strip().lower().lstrip('@').strip('.'); c = by.get(h)  # same canonical form as merge-slices.py
        if not c: problems.append(f'{h}: not in candidates.json'); continue
        urls = {e['url'] for e in c['evidence']} | {e.get('url') for e in c.get('eventsMentioned', [])}
        cl = r['classification']
        for k in JUDG:
            jd = cl.get(k) or {'value': None, 'confidence': 0, 'evidenceUrls': []}
            bad = [u for u in jd.get('evidenceUrls', []) if u not in urls]
            if bad: problems.append(f'{h}.{k}: unknown evidence url {bad}'); jd['evidenceUrls'] = [u for u in jd['evidenceUrls'] if u in urls]
            if jd.get('value') is None: jd['confidence'] = 0
            cl[k] = jd
        cl.setdefault('redFlags', []); cl.setdefault('missingInformation', []); cl.setdefault('commercialRisk', 'unknown'); cl.setdefault('recommendedTrack', 'scouting_stay'); cl.setdefault('group', 'none')
        cl['model'] = r.get('model', 'claude-session-analyst'); cl['analysedAt'] = NOW
        events = []
        for ev in r.get('events', []):
            eu = [u for u in ev.get('evidenceUrls', []) if u in urls]
            if not eu: problems.append(f'{h}: event "{ev.get("title")}" has no valid evidence url; dropped'); continue
            events.append({'title': ev['title'], 'eventType': ev.get('eventType'), 'startDate': ev.get('startDate'), 'endDate': ev.get('endDate'), 'nights': ev.get('nights'), 'location': ev.get('location'), 'country': ev.get('country'), 'groupSize': ev.get('groupSize'), 'pricePerPerson': ev.get('pricePerPerson'), 'currency': ev.get('currency'), 'soldOut': ev.get('soldOut'), 'role': ev.get('role', 'unknown'), 'isWinter': bool(ev.get('isWinter')), 'provenance': ev.get('provenance', 'evidence_supported_inference'), 'evidenceUrls': eu})
        prof = r.get('profile', {})
        markets = [m for m in prof.get('markets', []) if re.fullmatch(r'[A-Z]{2}|OTHER', m)]
        out.append({
            'profile': {'handle': h, 'profileUrl': c['profileUrl'], 'displayName': c.get('displayName') or prof.get('displayName'), 'bio': c.get('bio'), 'followers': c.get('followers'), 'followersProvenance': 'verified_public_fact' if c.get('followers') else 'unknown', 'website': c.get('website'), 'country': prof.get('country'), 'languages': prof.get('languages', []), 'niche': prof.get('niche')},
            'accountType': c.get('accountType', 'person_or_brand'),
            'markets': markets, 'events': events,
            'evidence': [{'url': e['url'], 'title': e.get('title'), 'excerpt': e.get('excerpt'), 'kind': e.get('kind') or 'other', 'source': 'tavily', 'observedAt': NOW, 'score': e.get('score')} for e in c['evidence']],
            'classification': cl, 'verificationStatus': 'public_only', 'pipelineStage': 'discovered', 'discoveredAt': NOW, 'lastSeenAt': NOW, 'discoveryQueries': sorted({e.get('queryId') for e in c['evidence'] if e.get('queryId')}),
        })
json.dump({'candidates': out}, open(f'{base}/classified.json', 'w'), indent=1, ensure_ascii=False)
print(f'classified: {len(out)}; problems: {len(problems)}')
for p in problems[:40]: print(' -', p)
