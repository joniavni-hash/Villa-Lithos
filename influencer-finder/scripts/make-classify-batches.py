#!/usr/bin/env python3
"""Split the merged discovery dataset into classification batches. Each batch
file holds the evidence pack per candidate exactly as the production screening
prompt receives it (handle, profile, evidence URLs + excerpts)."""
import json, os, sys
base = os.path.dirname(os.path.abspath(__file__)) + '/../data/run-2026-10-15'
d = json.load(open(f'{base}/candidates.json'))
size = int(sys.argv[1]) if len(sys.argv) > 1 else 12
start = int(sys.argv[2]) if len(sys.argv) > 2 else 1          # first batch number to write
exclude = set()
if len(sys.argv) > 3 and os.path.exists(sys.argv[3]):         # handles already classified
    exclude = {c['profile']['handle'] for c in json.load(open(sys.argv[3]))['candidates']}
cands = [c for c in d['candidates'] if c.get('evidence') and c['handle'] not in exclude]
cands.sort(key=lambda c: (-len(c['evidence']), c['handle']))
packs = []
for c in cands:
    packs.append({
        'handle': c['handle'], 'profileUrl': c['profileUrl'], 'displayName': c.get('displayName'), 'bio': c.get('bio'), 'followers': c.get('followers'),
        'website': c.get('website'), 'locationHints': c.get('locationHints', []), 'accountType': c.get('accountType', 'person_or_brand'),
        'organizerSignals': c.get('organizerSignals', []), 'winterMonthMentioned': c.get('winterMonthMentioned', False),
        'evidence': [{'url': e['url'], 'kind': e.get('kind'), 'title': (e.get('title') or '')[:160], 'excerpt': (e.get('excerpt') or '')[:600]} for e in c['evidence'][:25]],
        'eventsMentioned': c.get('eventsMentioned', [])[:12],
    })
n = start - 1
for i in range(0, len(packs), size):
    n += 1
    json.dump({'batch': n, 'candidates': packs[i:i+size]}, open(f'{base}/classify-batch-{n}.json', 'w'), indent=1, ensure_ascii=False)
print(f'{len(packs)} candidates → batches {start}..{n} of ≤{size} (excluded {len(exclude)} already classified)')
