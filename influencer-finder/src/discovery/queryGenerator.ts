/**
 * Dynamic discovery query generator.
 *
 * Produces hundreds of search queries from the cartesian product of event type,
 * season month, destination, source market, language, niche phrases and
 * commercial-intent phrases. Queries are deterministic (same inputs → same
 * list) so a run can be resumed, and each query carries the dimensions it was
 * built from so results can be attributed.
 */
import type { EventType, Language, Market } from '../pipeline/types.ts';

export interface QuerySpec {
  id: string;             // stable hash-like id
  query: string;
  language: Language;
  market?: Market;
  eventType?: EventType;
  /** Which discovery lane produced it. */
  lane: 'organizer_intent' | 'winter_destination' | 'competitor_venue' | 'market_language' | 'listing_site' | 'seed_expansion' | 'niche_b2b';
  /** Tavily parameters. */
  includeDomains?: string[];
  searchDepth: 'basic' | 'advanced';
  priority: number;       // 1 (highest) .. 5
}

export interface RunParameters {
  seasonStart: string;    // ISO
  seasonEnd: string;
  markets: Market[];
  eventTypes: EventType[];
  languages: Language[];
  /** Hard cap on number of queries the run may issue. */
  maxQueries: number;
  /** Optional seed handles for expansion lane. */
  seedHandles?: string[];
}

export const EVENT_PHRASES: Record<EventType, Record<Language, string[]>> = {
  wellness_retreat: {
    en: ['wellness retreat', 'wellbeing retreat'], he: ['ריטריט בריאות', 'ריטריט וולנס'], de: ['Wellness Retreat', 'Auszeit Retreat'],
    fr: ['retraite bien-être'], nl: ['wellness retreat'], sv: ['wellness retreat'], da: ['wellness retreat'], no: ['wellness retreat'],
  },
  yoga_retreat: {
    en: ['yoga retreat', 'yoga & breathwork retreat'], he: ['ריטריט יוגה', 'סדנת יוגה בחו"ל'], de: ['Yoga Retreat', 'Yogareise'],
    fr: ['retraite de yoga', 'stage de yoga'], nl: ['yoga retreat', 'yogareis'], sv: ['yogaresa', 'yoga retreat'], da: ['yogarejse', 'yoga retreat'], no: ['yogareise', 'yoga retreat'],
  },
  fitness_retreat: {
    en: ['fitness retreat', 'training camp retreat', 'hyrox retreat'], he: ['ריטריט כושר', 'מחנה אימונים בחו"ל'], de: ['Fitness Retreat', 'Trainingslager'],
    fr: ['retraite fitness', 'stage sportif'], nl: ['fitness retreat', 'bootcamp reis'], sv: ['träningsresa'], da: ['træningsrejse'], no: ['treningsreise'],
  },
  padel_retreat: {
    en: ['padel retreat', 'padel camp', 'padel holiday'], he: ['מחנה פאדל', 'ריטריט פאדל'], de: ['Padel Camp', 'Padelreise'],
    fr: ['stage de padel', 'séjour padel'], nl: ['padel reis', 'padel clinic'], sv: ['padelresa'], da: ['padelrejse'], no: ['padelreise'],
  },
  womens_retreat: {
    en: ["women's retreat", 'women only retreat', 'sisterhood retreat'], he: ['ריטריט נשים', 'סדנת נשים בחו"ל'], de: ['Frauen Retreat', 'Women Retreat'],
    fr: ['retraite femmes', 'retraite féminine'], nl: ['vrouwen retreat'], sv: ['kvinnoretreat'], da: ['kvinderetreat'], no: ['kvinneretreat'],
  },
  personal_development_retreat: {
    en: ['personal development retreat', 'transformational retreat', 'coaching retreat'], he: ['ריטריט התפתחות אישית', 'סדנת העצמה בחו"ל'], de: ['Persönlichkeitsentwicklung Retreat', 'Coaching Retreat'],
    fr: ['retraite développement personnel'], nl: ['persoonlijke ontwikkeling retreat', 'coaching retreat'], sv: ['personlig utveckling retreat'], da: ['personlig udvikling retreat'], no: ['personlig utvikling retreat'],
  },
  leadership_retreat: {
    en: ['leadership retreat', 'leadership offsite', 'founders retreat'], he: ['ריטריט מנהיגות', 'סדנת מנהלים בחו"ל'], de: ['Leadership Retreat', 'Führungskräfte Retreat'],
    fr: ['retraite leadership', 'séminaire dirigeants'], nl: ['leiderschap retreat'], sv: ['ledarskapsretreat'], da: ['lederretreat'], no: ['lederretreat'],
  },
  corporate_offsite: {
    en: ['corporate offsite', 'team offsite villa', 'company retreat'], he: ['אופסייט חברה בחו"ל', 'גיבוש חברה ביוון'], de: ['Team Offsite', 'Firmen Retreat'],
    fr: ['séminaire entreprise villa', 'offsite équipe'], nl: ['bedrijfsuitje buitenland', 'team offsite'], sv: ['företagsretreat', 'offsite'], da: ['firma offsite'], no: ['firma offsite'],
  },
  executive_mastermind: {
    en: ['mastermind retreat', 'executive mastermind', 'CEO mastermind'], he: ['מאסטרמיינד בחו"ל', 'מאסטרמיינד יזמים'], de: ['Mastermind Retreat', 'Unternehmer Mastermind'],
    fr: ['mastermind retraite', 'mastermind entrepreneurs'], nl: ['mastermind retreat', 'ondernemers mastermind'], sv: ['mastermind retreat'], da: ['mastermind retreat'], no: ['mastermind retreat'],
  },
  workshop: {
    en: ['workshop retreat', 'immersion week'], he: ['סדנה בחו"ל', 'סדנת עומק'], de: ['Workshop Retreat', 'Intensivwoche'],
    fr: ['atelier retraite', 'semaine immersion'], nl: ['workshop retreat'], sv: ['workshop retreat'], da: ['workshop retreat'], no: ['workshop retreat'],
  },
  teacher_training: {
    en: ['yoga teacher training', '200h YTT', 'breathwork facilitator training'], he: ['קורס מורים ליוגה בחו"ל', 'הכשרת מורים'], de: ['Yogalehrer Ausbildung', 'Yoga Teacher Training'],
    fr: ['formation professeur de yoga', 'teacher training'], nl: ['yoga docentenopleiding', 'teacher training'], sv: ['yogalärarutbildning'], da: ['yogalæreruddannelse'], no: ['yogalærerutdanning'],
  },
  long_stay_program: {
    en: ['two week retreat', '14 day program', 'month long retreat', 'coliving retreat'], he: ['ריטריט שבועיים', 'תוכנית חודש בחו"ל'], de: ['zweiwöchiges Retreat', 'Monatsretreat'],
    fr: ['retraite deux semaines', 'programme un mois'], nl: ['twee weken retreat'], sv: ['två veckors retreat'], da: ['to ugers retreat'], no: ['to ukers retreat'],
  },
};

/** Phrases that signal the account organises and sells, not just attends. */
export const ORGANIZER_INTENT: Record<Language, string[]> = {
  en: ['join my retreat', 'retreat host', 'retreat leader', 'sold out retreat', 'spots left', 'early bird', 'book your spot', 'retreat registration open', 'hosting a retreat', 'my next retreat', 'retreat facilitator', 'applications open', 'waitlist open'],
  he: ['הרשמה נפתחה', 'מקומות אחרונים', 'הצטרפו לריטריט', 'מארגנת ריטריט', 'הריטריט הבא שלי', 'ריטריט בחו"ל'],
  de: ['Anmeldung offen', 'letzte Plätze', 'Retreat ausgebucht', 'mein nächstes Retreat', 'Retreat Leitung', 'Frühbucher'],
  fr: ['inscriptions ouvertes', 'dernières places', 'complet', 'ma prochaine retraite', 'animatrice retraite'],
  nl: ['inschrijving geopend', 'laatste plekken', 'uitverkocht', 'mijn volgende retreat'],
  sv: ['anmälan öppen', 'sista platserna', 'slutsåld', 'min nästa retreat'],
  da: ['tilmelding åben', 'sidste pladser', 'udsolgt'],
  no: ['påmelding åpen', 'siste plasser', 'utsolgt'],
};

/** Winter-operating destinations whose organisers are the competitor-venue lane. */
export const WINTER_DESTINATIONS = [
  'Tenerife', 'Lanzarote', 'Gran Canaria', 'Fuerteventura', 'Canary Islands', 'Algarve', 'Andalusia', 'Marbella', 'Malaga',
  'Marrakech', 'Agafay', 'Essaouira', 'Cyprus', 'Paphos', 'Malta', 'Gozo', 'Sicily', 'Crete', 'Athens', 'Attica', 'Peloponnese', 'Madeira',
];

export const MARKET_LOCATION_TERMS: Record<Market, string[]> = {
  IL: ['Israel', 'Tel Aviv', 'ישראל', 'תל אביב'],
  GB: ['UK', 'London', 'Manchester', 'Bristol', 'Edinburgh'],
  DE: ['Deutschland', 'Berlin', 'München', 'Hamburg', 'Köln'],
  CH: ['Schweiz', 'Zürich', 'Suisse', 'Genève', 'Basel'],
  NL: ['Nederland', 'Amsterdam', 'Utrecht', 'Rotterdam'],
  SE: ['Sverige', 'Stockholm', 'Göteborg'],
  DK: ['Danmark', 'København', 'Aarhus'],
  NO: ['Norge', 'Oslo', 'Bergen'],
  FI: ['Suomi', 'Helsinki'],
  FR: ['France', 'Paris', 'Lyon', 'Bordeaux'],
  OTHER: [],
};

export const MARKET_LANGUAGES: Record<Market, Language[]> = {
  IL: ['he', 'en'], GB: ['en'], DE: ['de', 'en'], CH: ['de', 'fr', 'en'], NL: ['nl', 'en'], SE: ['sv', 'en'], DK: ['da', 'en'], NO: ['no', 'en'], FI: ['en'], FR: ['fr', 'en'], OTHER: ['en'],
};

const MONTH_NAMES: Record<Language, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  he: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  sv: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'],
  da: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december'],
  no: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'],
};

/** Listing sites that expose organiser name, dates, price and Instagram links. Used for evidence, never as the final output. */
export const LISTING_DOMAINS = ['bookretreats.com', 'retreat.guru', 'bookyogaretreats.com', 'tripaneer.com', 'retreatsandvenues.com', 'eventbrite.com', 'eventbrite.co.uk', 'eventbrite.de', 'eventbrite.fr', 'eventbrite.nl'];

/** B2B lanes: accounts whose audience is organisers (group B). */
const NICHE_B2B_EN = [
  'retreat business coach', 'how to host a retreat course', 'retreat planning coach instagram', 'retreat leaders community', 'for yoga teachers who want to host retreats',
  'venue sourcing for retreats', 'retreat marketing mentor', 'fill your retreat', 'retreat planner for coaches', 'wellness business mentor retreats',
];

export function seasonMonths(seasonStart: string, seasonEnd: string): Array<{ year: number; month: number }> {
  const out: Array<{ year: number; month: number }> = [];
  const s = new Date(seasonStart);
  const e = new Date(seasonEnd);
  let y = s.getUTCFullYear();
  let m = s.getUTCMonth();
  while (y < e.getUTCFullYear() || (y === e.getUTCFullYear() && m <= e.getUTCMonth())) {
    out.push({ year: y, month: m });
    m += 1;
    if (m > 11) { m = 0; y += 1; }
  }
  return out;
}

function hash(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function q(partial: Omit<QuerySpec, 'id'>): QuerySpec {
  return { id: hash(partial.lane + '|' + partial.query + '|' + (partial.includeDomains ?? []).join(',')), ...partial };
}

/**
 * Generate the query plan. Returns queries sorted by priority then lane, capped at
 * params.maxQueries. Dedupes identical query strings.
 */
export function generateQueries(params: RunParameters): QuerySpec[] {
  const months = seasonMonths(params.seasonStart, params.seasonEnd);
  const years = Array.from(new Set(months.map((m) => m.year)));
  const seasonWords = years.map(String).join(' OR ');
  const out: QuerySpec[] = [];
  const ig = ['instagram.com'];

  // Lane 1: organiser intent × event type × language (Instagram only)
  for (const lang of params.languages) {
    const intents = ORGANIZER_INTENT[lang] ?? [];
    for (const et of params.eventTypes) {
      const phrases = EVENT_PHRASES[et][lang] ?? [];
      for (const phrase of phrases) {
        for (const intent of intents.slice(0, lang === 'en' ? 6 : 3)) {
          out.push(q({ query: `"${phrase}" "${intent}" ${seasonWords}`, language: lang, eventType: et, lane: 'organizer_intent', includeDomains: ig, searchDepth: 'basic', priority: lang === 'en' ? 1 : 2 }));
        }
      }
    }
  }

  // Lane 2: winter month × event type (English), Instagram
  for (const et of params.eventTypes) {
    for (const phrase of EVENT_PHRASES[et].en.slice(0, 2)) {
      for (const { year, month } of months) {
        out.push(q({ query: `"${phrase}" ${MONTH_NAMES.en[month]} ${year} registration`, language: 'en', eventType: et, lane: 'winter_destination', includeDomains: ig, searchDepth: 'basic', priority: 1 }));
      }
    }
  }

  // Lane 3: competitor winter venues × core event types
  const coreTypes = params.eventTypes.filter((t) => ['yoga_retreat', 'wellness_retreat', 'womens_retreat', 'leadership_retreat', 'executive_mastermind', 'fitness_retreat', 'padel_retreat', 'teacher_training'].includes(t));
  for (const dest of WINTER_DESTINATIONS) {
    for (const et of coreTypes) {
      const phrase = EVENT_PHRASES[et].en[0];
      out.push(q({ query: `"${phrase}" ${dest} ${MONTH_NAMES.en[0]} OR ${MONTH_NAMES.en[1]} OR ${MONTH_NAMES.en[2]} OR ${MONTH_NAMES.en[10]} OR ${MONTH_NAMES.en[11]} ${seasonWords} host`, language: 'en', eventType: et, lane: 'competitor_venue', includeDomains: ig, searchDepth: 'basic', priority: 2 }));
    }
  }

  // Lane 4: market × local language × event type (organiser based in market, retreat abroad)
  for (const market of params.markets) {
    const langs = MARKET_LANGUAGES[market].filter((l) => params.languages.includes(l));
    for (const lang of langs) {
      for (const et of params.eventTypes) {
        const phrase = EVENT_PHRASES[et][lang]?.[0];
        if (!phrase) continue;
        for (const loc of MARKET_LOCATION_TERMS[market].slice(0, 2)) {
          out.push(q({ query: `"${phrase}" ${loc} ${seasonWords} abroad OR Greece OR Spain OR Portugal OR Cyprus`, language: lang, market, eventType: et, lane: 'market_language', includeDomains: ig, searchDepth: 'basic', priority: 2 }));
        }
      }
    }
  }

  // Lane 5: listing sites (evidence of dates, prices, group size) for winter months
  for (const et of coreTypes) {
    for (const { year, month } of months) {
      out.push(q({ query: `${EVENT_PHRASES[et].en[0]} ${MONTH_NAMES.en[month]} ${year} Europe OR Canary OR Morocco OR Cyprus OR Greece price per person instagram`, language: 'en', eventType: et, lane: 'listing_site', includeDomains: LISTING_DOMAINS, searchDepth: 'basic', priority: 3 }));
    }
  }

  // Lane 6: B2B niche (audience = organisers)
  for (const phrase of NICHE_B2B_EN) {
    out.push(q({ query: `${phrase}`, language: 'en', lane: 'niche_b2b', includeDomains: ig, searchDepth: 'basic', priority: 3 }));
  }

  // Lane 7: seed expansion
  for (const h of params.seedHandles ?? []) {
    out.push(q({ query: `"@${h}" retreat co-host OR "with @${h}" OR "hosted by @${h}"`, language: 'en', lane: 'seed_expansion', includeDomains: ig, searchDepth: 'basic', priority: 2 }));
  }

  // Dedupe + sort + cap
  const seen = new Set<string>();
  const unique = out.filter((s) => { const k = s.query.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  return balancedSelection(unique, params.maxQueries);
}

/**
 * Cap the plan while keeping coverage: round-robin across lanes, and within a
 * lane across languages and event types, so a small run still touches every
 * market, language and event type instead of exhausting one lane first.
 */
export function balancedSelection(specs: QuerySpec[], max: number): QuerySpec[] {
  if (specs.length <= max) return [...specs].sort((a, b) => a.priority - b.priority);
  const buckets = new Map<string, QuerySpec[]>();
  for (const s of specs) {
    const k = `${s.lane}|${s.language}|${s.eventType ?? ''}|${s.market ?? ''}`;
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k)!.push(s);
  }
  const lanes = new Map<string, QuerySpec[][]>();
  for (const [k, list] of buckets) {
    const lane = k.split('|')[0];
    if (!lanes.has(lane)) lanes.set(lane, []);
    lanes.get(lane)!.push(list);
  }
  // Deterministic spread: order a lane's buckets by hash so markets and event
  // types alternate instead of clustering on the first market generated.
  const laneQueues = Array.from(lanes.entries()).map(([lane, groups]) =>
    groups
      .map((g) => ({ g, k: hash(lane + '|' + (g[0].market ?? '') + '|' + (g[0].eventType ?? '') + '|' + g[0].language) }))
      .sort((a, b) => a.k.localeCompare(b.k))
      .map((x) => x.g),
  );
  const picked: QuerySpec[] = [];
  const idx = laneQueues.map(() => 0);
  while (picked.length < max) {
    let progressed = false;
    for (let li = 0; li < laneQueues.length && picked.length < max; li++) {
      const groups = laneQueues[li];
      // rotate through the lane's buckets
      for (let tries = 0; tries < groups.length; tries++) {
        const g = groups[(idx[li] + tries) % groups.length];
        if (g.length > 0) { picked.push(g.shift()!); idx[li] = (idx[li] + tries + 1) % groups.length; progressed = true; break; }
      }
    }
    if (!progressed) break;
  }
  return picked;
}

export const DEFAULT_RUN_PARAMETERS: RunParameters = {
  seasonStart: '2026-11-01',
  seasonEnd: '2027-04-30',
  markets: ['IL', 'GB', 'DE', 'CH', 'NL', 'SE', 'DK', 'NO', 'FR'],
  eventTypes: ['yoga_retreat', 'wellness_retreat', 'fitness_retreat', 'padel_retreat', 'womens_retreat', 'personal_development_retreat', 'leadership_retreat', 'corporate_offsite', 'executive_mastermind', 'workshop', 'teacher_training', 'long_stay_program'],
  languages: ['en', 'he', 'de', 'fr'],
  maxQueries: 400,
};
