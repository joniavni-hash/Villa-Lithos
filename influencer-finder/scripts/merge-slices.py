#!/usr/bin/env python3
"""Merge candidates-slice-*.json into one deduplicated dataset (by handle) and
collect run statistics. Pure data plumbing: nothing is invented here."""
import json, glob, sys, os, re
from collections import OrderedDict
base = os.path.dirname(os.path.abspath(__file__)) + '/../data/run-2026-10-15'
cands = OrderedDict(); listing = []; unattributed = []; stats = []
for f in sorted(glob.glob(f'{base}/candidates-slice-*.json')):
    d = json.load(open(f))
    stats.append({'file': os.path.basename(f), **d.get('stats', {})})
    for c in d.get('candidates', []):
        h = (c.get('handle') or '').strip().lower().lstrip('@')
        if not re.fullmatch(r'[a-z0-9._]{1,30}', h): continue
        if h in cands:
            e = cands[h]
            seen = {x['url'] for x in e['evidence']}
            e['evidence'] += [x for x in c.get('evidence', []) if x['url'] not in seen]
            e['eventsMentioned'] += c.get('eventsMentioned', [])
            e['organizerSignals'] = sorted(set(e.get('organizerSignals', []) + c.get('organizerSignals', [])))
            e['locationHints'] = sorted(set(e.get('locationHints', []) + c.get('locationHints', [])))
            e['winterMonthMentioned'] = e.get('winterMonthMentioned') or c.get('winterMonthMentioned')
            for k in ('bio', 'followers', 'website', 'displayName', 'accountType'):
                if not e.get(k) and c.get(k): e[k] = c[k]
        else:
            c['handle'] = h; c['profileUrl'] = f'https://www.instagram.com/{h}/'
            c.setdefault('evidence', []); c.setdefault('eventsMentioned', []); c.setdefault('organizerSignals', []); c.setdefault('locationHints', [])
            cands[h] = c
    listing += d.get('listingLeads', []); unattributed += d.get('unattributedPosts', [])
out = {'runDate': '2026-10-15', 'stats': stats, 'candidates': list(cands.values()), 'listingLeads': listing, 'unattributedPosts': unattributed}
json.dump(out, open(f'{base}/candidates.json', 'w'), indent=1, ensure_ascii=False)
tot = {k: sum(s.get(k, 0) for s in stats) for k in ('searchesAttempted', 'searchesSucceeded', 'rateLimited429', 'extractCalls', 'urlsExtracted')}
print(json.dumps({'candidates': len(cands), 'winter': sum(1 for c in cands.values() if c.get('winterMonthMentioned')), 'venues': sum(1 for c in cands.values() if c.get('accountType') == 'venue'), 'listingLeads': len(listing), 'unattributed': len(unattributed), **tot}, indent=1))
