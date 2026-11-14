/**
 * Candidate normalisation: extract Instagram handles from URLs, titles and
 * extracted page text; dedupe; merge evidence. Handles are the identity key.
 */
import type { Candidate, Evidence, Market, Language } from '../pipeline/types.ts';

const RESERVED = new Set(['p', 'reel', 'reels', 'explore', 'stories', 'accounts', 'tv', 'about', 'legal', 'directory', 'developer', 'web', 'static', 'locations', 'tags', 'direct', 'ar', 'privacy', 'terms', 'press', 'api']);

/**
 * Canonical handle: lower-case, no leading '@', no leading or trailing periods.
 * Instagram usernames cannot start or end with a period, so a trailing '.' is
 * sentence punctuation captured by a text pattern ("More posts from x.").
 */
export function cleanHandle(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const h = raw.trim().toLowerCase().replace(/^@/, '').replace(/^\.+|\.+$/g, '');
  return /^[a-z0-9._]{1,30}$/.test(h) && !/\.\./.test(h) ? h : null;
}

/** Extract a handle from an Instagram profile URL. Returns null for post/reel URLs. */
export function handleFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/(^|\.)instagram\.com$/i.test(u.hostname)) return null;
    const seg = u.pathname.split('/').filter(Boolean);
    if (seg.length === 0) return null;
    const first = seg[0].toLowerCase();
    if (RESERVED.has(first)) return null;
    return cleanHandle(first);
  } catch {
    return null;
  }
}

/** Extract "(@handle)" from a search result title like "Name (@handle) • Instagram". */
export function handleFromTitle(title: string | undefined): string | null {
  if (!title) return null;
  const m = title.match(/\(@([a-z0-9._]{1,30})\)/i);
  return m ? cleanHandle(m[1]) : null;
}

/**
 * Extract the author handle from Tavily-extracted text of a post/reel page.
 * Instagram's logged-out page contains "Never miss a post from <handle>" and
 * "More posts from <handle>". Backslash-escaped underscores are unescaped.
 */
export function handleFromExtractedText(text: string | undefined): string | null {
  if (!text) return null;
  const t = text.replace(/\\_/g, '_');
  const patterns = [/Never miss a post from ([a-z0-9._]{1,30})/i, /More posts from ([a-z0-9._]{1,30})/i, /^([a-z0-9._]{1,30})\n•\nFollow/im];
  for (const p of patterns) {
    const m = t.match(p);
    if (m) { const h = cleanHandle(m[1]); if (h) return h; }
  }
  return null;
}

export function followersFromText(text: string | undefined): number | null {
  if (!text) return null;
  const m = text.match(/([\d.,]+)\s*([KkMm])?\s*followers/i);
  if (!m) return null;
  let n = parseFloat(m[1].replace(/,/g, ''));
  if (Number.isNaN(n)) return null;
  if (m[2]) n = n * (m[2].toLowerCase() === 'k' ? 1_000 : 1_000_000);
  return Math.round(n);
}

export function profileUrl(handle: string): string {
  return `https://www.instagram.com/${handle}/`;
}

/** Guess the market of a profile from bio text and location words. Returns null if nothing matches. */
export function guessMarket(text: string): Market | null {
  const t = text.toLowerCase();
  const rules: Array<[Market, RegExp]> = [
    ['IL', /\b(israel|tel aviv|ישראל|תל אביב|ירושלים|חיפה)\b/],
    ['GB', /\b(london|uk|united kingdom|england|scotland|manchester|bristol|brighton|edinburgh)\b/],
    ['DE', /\b(berlin|münchen|munich|hamburg|köln|cologne|deutschland|germany|frankfurt|düsseldorf)\b/],
    ['CH', /\b(zürich|zurich|schweiz|switzerland|suisse|genève|geneva|basel|bern|lausanne)\b/],
    ['NL', /\b(amsterdam|nederland|netherlands|utrecht|rotterdam|den haag|the hague)\b/],
    ['SE', /\b(sverige|sweden|stockholm|göteborg|gothenburg|malmö)\b/],
    ['DK', /\b(danmark|denmark|københavn|copenhagen|aarhus)\b/],
    ['NO', /\b(norge|norway|oslo|bergen)\b/],
    ['FI', /\b(suomi|finland|helsinki)\b/],
    ['FR', /\b(paris|france|lyon|bordeaux|marseille|nice)\b/],
  ];
  for (const [m, re] of rules) if (re.test(t)) return m;
  return null;
}

export function guessLanguage(text: string): Language {
  if (/[֐-׿]/.test(text)) return 'he';
  if (/\b(und|nicht|mit|für|retreat\b.*\bdeutsch)/i.test(text) && /[äöüß]/i.test(text)) return 'de';
  if (/\b(et|les|des|pour|avec|retraite)\b/i.test(text) && /[éèàç]/i.test(text)) return 'fr';
  if (/\b(het|een|voor|met|retreat)\b/i.test(text) && /\b(en|van|de)\b/i.test(text) && /\b(je|jij|wij)\b/i.test(text)) return 'nl';
  return 'en';
}

const WINTER_MONTH_RE = /\b(nov(ember)?|dec(ember)?|jan(uary)?|feb(ruary)?|mar(ch)?|apr(il)?|נובמבר|דצמבר|ינואר|פברואר|מרץ|אפריל|dezember|januar|februar|märz|novembre|décembre|janvier|février|mars|avril)\b/i;

/** True when the text mentions a November–April month. Cheap pre-signal; Claude confirms. */
export function mentionsWinterMonth(text: string): boolean {
  return WINTER_MONTH_RE.test(text);
}

export function mergeCandidate(existing: Candidate, incoming: Candidate): Candidate {
  const evidenceByUrl = new Map<string, Evidence>();
  for (const e of [...existing.evidence, ...incoming.evidence]) if (!evidenceByUrl.has(e.url)) evidenceByUrl.set(e.url, e);
  const markets = Array.from(new Set([...existing.markets, ...incoming.markets]));
  return {
    ...existing,
    profile: {
      ...existing.profile,
      ...Object.fromEntries(Object.entries(incoming.profile).filter(([, v]) => v !== undefined && v !== null && v !== '')),
      handle: existing.profile.handle,
    },
    markets,
    events: dedupeEvents([...existing.events, ...incoming.events]),
    evidence: Array.from(evidenceByUrl.values()),
    discoveryQueries: Array.from(new Set([...existing.discoveryQueries, ...incoming.discoveryQueries])),
    lastSeenAt: incoming.lastSeenAt > existing.lastSeenAt ? incoming.lastSeenAt : existing.lastSeenAt,
  };
}

export function dedupeEvents<T extends { title: string; startDate?: string; location?: string }>(events: T[]): T[] {
  const seen = new Map<string, T>();
  for (const ev of events) {
    const k = `${ev.title.toLowerCase().trim()}|${ev.startDate ?? ''}|${(ev.location ?? '').toLowerCase()}`;
    if (!seen.has(k)) seen.set(k, ev);
  }
  return Array.from(seen.values());
}

/** Normalises a website for sister-account detection: lower-case host + path, no scheme, no www, no trailing slash. */
export function normalizeWebsite(site: string | null | undefined): string | null {
  if (!site) return null;
  let s = site.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, '').replace(/^www\./, '');
  s = s.split(/[?#]/)[0].replace(/\/+$/, '');
  return s || null;
}
