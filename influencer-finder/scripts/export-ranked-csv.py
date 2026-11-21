#!/usr/bin/env python3
"""Write ranked.csv (UTF-8 with BOM, opens cleanly in Excel) from ranked.json: one row per account in rank order."""
import csv, json, os
base = os.path.dirname(os.path.abspath(__file__)) + '/../data/run-2026-10-15'
d = json.load(open(f'{base}/ranked.json'))
cols = ['rank', 'handle', 'profile_url', 'website', 'country', 'group', 'tier', 'fit_score', 'confidence', 'recommended_track',
        'ebn_conservative', 'ebn_base', 'ebn_optimistic', 'organised_winter_events', 'next_or_latest_winter_event', 'event_evidence_url',
        'venue_budget_per_night_eur', 'red_flags', 'summary']
with open(f'{base}/ranked.csv', 'w', newline='', encoding='utf-8-sig') as f:
    w = csv.writer(f); w.writerow(cols)
    for i, c in enumerate(d['candidates'], 1):
        s = c['publicScore']; cl = c.get('classification') or {}; e = c['ebn']['expectedBookedNights']
        win = sorted([x for x in c['events'] if x['isWinter'] and x['role'] in ('organizer', 'co_host')], key=lambda x: x.get('startDate') or '', reverse=True)
        b = c['budget']['venueBudgetPerNightEur']
        w.writerow([i, c['profile']['handle'], c['profile']['profileUrl'], c['profile'].get('website') or '', c['profile'].get('country') or '',
                    cl.get('group', ''), s['tier'], s['fitScore'], round(s['confidence'], 2), c['track']['track'],
                    round(e['conservative'], 2), round(e['base'], 2), round(e['optimistic'], 2), len(win),
                    f"{win[0]['title']} ({win[0].get('startDate') or 'undated'})" if win else '', win[0]['evidenceUrls'][0] if win and win[0]['evidenceUrls'] else '',
                    '' if b is None else round(b), '; '.join(s.get('redFlags') or []), cl.get('summary', '')])
print(f"wrote ranked.csv ({len(d['candidates'])} rows)")
