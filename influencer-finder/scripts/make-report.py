#!/usr/bin/env python3
"""Build a readable run report (Markdown) from ranked.json: run statistics, tier
counts, Best Match + 9 with evidence links, events, score breakdown, EBN scenarios,
red flags and missing information. Reads data only; adds nothing that is not in the files."""
import json, os, sys
base = os.path.dirname(os.path.abspath(__file__)) + '/../data/run-2026-10-15'
r = json.load(open(f'{base}/ranked.json'))
cands = json.load(open(f'{base}/candidates.json'))
by = {c['profile']['handle']: c for c in r['candidates']}
stats = cands.get('stats', [])
tot = {k: sum(s.get(k, 0) for s in stats) for k in ('searchesAttempted', 'searchesSucceeded', 'rateLimited429', 'extractCalls', 'urlsExtracted')}
groups = {}
for c in r['candidates']:
    g = (c.get('classification') or {}).get('group', 'none'); groups[g] = groups.get(g, 0) + 1
winter_org = sum(1 for c in r['candidates'] if any(e['isWinter'] and e['role'] in ('organizer', 'co_host') for e in c['events']))
L = []
w = L.append
w('# Villa Lithos Influencer Finder: discovery run 2026-10-15\n')
w('Season targeted: 1 Nov 2026 to 30 Apr 2027. Source: Tavily search and extract over public Instagram pages. Instagram Graph API and Apify were not used.\n')
w('## Run statistics\n')
w('| Measure | Value |\n| --- | --- |')
w(f"| Search queries executed | {tot['searchesSucceeded']} |")
w(f"| Search calls including retries | {tot['searchesAttempted']} |")
w(f"| Rate-limit responses (429), all retried | {tot['rateLimited429']} |")
w(f"| Extract calls | {tot['extractCalls']} |")
w(f"| Post and reel pages extracted | {tot['urlsExtracted']} |")
w(f"| Unique Instagram accounts found | {len(cands['candidates'])} |")
w(f"| Accounts classified and scored | {len(r['candidates'])} |")
w(f"| Classified accounts with a dated Nov to Apr event they organise or co-host | {winter_org} |")
w(f"| Listing-site leads kept for manual review | {len(cands.get('listingLeads', []))} |")
w(f"| Post URLs with no attributable author | {len(cands.get('unattributedPosts', []))} |")
w('')
w('Tier counts: ' + ', '.join(f'{k} {v}' for k, v in sorted(r['tiers'].items())) + '.  ')
w('Groups: ' + ', '.join(f'{k} {v}' for k, v in sorted(groups.items())) + '.\n')
if r.get('sisterAccounts'):
    w('Sister accounts counted once in the shortlist: ' + ', '.join(f'@{a} (same website as @{b})' for a, b in r['sisterAccounts'].items()) + '.\n')
w('Ranking key: Expected Booked Nights, base scenario, then fit score. Booking probabilities are computed, not verified, until real outcomes exist.\n')
def fmt(x): return '-' if x is None else (f'{x:.1f}' if isinstance(x, float) else str(x))
for i, h in enumerate([r['bestMatch']] + r['alternatives']):
    c = by[h]; s = c['publicScore']; cl = c.get('classification') or {}; e = c['ebn']['expectedBookedNights']
    w(f"## {'Best Match' if i == 0 else f'Alternative {i}'}: @{h}\n")
    w(f"Profile: {c['profile']['profileUrl']}  ")
    if c['profile'].get('website'): w(f"Website: {c['profile']['website']}  ")
    w(f"Tier {s['tier']}, fit {s['fitScore']}/100, confidence {s['confidence']:.2f}, group {cl.get('group')}, recommended track {c['track']['track']}.  ")
    w(f"Expected booked nights in season: conservative {e['conservative']:.1f}, base {e['base']:.1f}, optimistic {e['optimistic']:.1f}.\n")
    if cl.get('summary'): w(f"{cl['summary']}\n")
    org = [ev for ev in c['events'] if ev['role'] in ('organizer', 'co_host')]
    if org:
        w('| Event | Dates | Place | Winter | Source |\n| --- | --- | --- | --- | --- |')
        for ev in org[:8]:
            d = ev.get('startDate') or 'undated'
            if ev.get('endDate'): d += f" to {ev['endDate']}"
            w(f"| {ev['title'].replace('|', '/')} | {d} | {ev.get('location') or '-'} | {'yes' if ev['isWinter'] else 'no'} | {ev['evidenceUrls'][0] if ev['evidenceUrls'] else '-'} |")
        w('')
    b = s['breakdown']
    w('Score breakdown: ' + ', '.join(f'{k} {v}' for k, v in b.items()) + '.  ')
    if s.get('gates'): w('Gates applied: ' + ', '.join(s['gates']) + '.  ')
    if s.get('redFlags'): w('Red flags: ' + '; '.join(s['redFlags']) + '.  ')
    if cl.get('missingInformation'): w('Missing: ' + '; '.join(cl['missingInformation']) + '.  ')
    w(f"Why this track: {c['track']['reason']}\n")
open(f'{base}/REPORT.md', 'w').write('\n'.join(L) + '\n')
print(f'wrote REPORT.md ({len(L)} lines)')
