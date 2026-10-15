/**
 * Outreach draft generator. Drafts only: the product never sends messages.
 * Every draft is built from facts on the candidate record; it names a real
 * event or a real bio detail and never includes numeric prices.
 */
import { VILLA } from '../config/villa.ts';
import type { Candidate, PartnershipTrack } from '../pipeline/types.ts';

export type OutreachLanguage = 'en' | 'he';

export interface OutreachDraft {
  track: PartnershipTrack;
  language: OutreachLanguage;
  subject: string;
  body: string;
  /** Facts from the record that the draft relies on, with their source URLs. */
  personalisationFacts: Array<{ fact: string; url?: string }>;
  whyThisTrack: string;
}

export const TRACK_LABELS: Record<PartnershipTrack, { en: string; he: string }> = {
  scouting_stay: { en: 'Scouting Stay', he: 'ביקור היכרות' },
  pilot_retreat: { en: 'Pilot Retreat', he: 'ריטריט פיילוט' },
  anchor_partnership: { en: 'Anchor Partnership', he: 'שותפות עוגן' },
  referral_partnership: { en: 'Referral Partnership', he: 'שותפות הפניות' },
};

const PRICE_RE = /(€|\$|£|₪|\beur\b|\busd\b|\bgbp\b|\bils\b)\s?\d|\d\s?(€|\$|£|₪|\beur\b|\busd\b|\bgbp\b|\bils\b)|\bper night\b.*\d|\d.*\bper night\b/i;

/** Pick the partnership track from the candidate's evidence. */
export function recommendTrack(c: Candidate): { track: PartnershipTrack; reason: string } {
  const cl = c.classification;
  const organiserEvents = c.events.filter((e) => e.role === 'organizer' || e.role === 'co_host');
  const winter = organiserEvents.filter((e) => e.isWinter);
  const recurring = cl?.runsRecurringEvents.value === true || organiserEvents.length >= 3;
  if (cl?.group === 'B_reaches_organizers' && organiserEvents.length === 0) return { track: 'referral_partnership', reason: 'Her audience is organisers, not participants; she can refer bookings rather than host.' };
  if (recurring && winter.length >= 1 && (cl?.decidesVenue.value === true)) return { track: 'anchor_partnership', reason: 'Runs recurring events including in winter and chooses venues herself; a multi-event commitment is realistic.' };
  if (organiserEvents.length >= 1 && (cl?.decidesVenue.value !== false)) return { track: 'pilot_retreat', reason: 'Proven organiser; a first retreat tests the partnership before committing to more.' };
  return { track: 'scouting_stay', reason: 'Organising capacity or venue authority not yet evidenced; a scouting stay lets her evaluate the property with low commitment.' };
}

function firstName(c: Candidate): string {
  const n = c.profile.displayName?.trim();
  if (!n) return '';
  const clean = n.replace(/\(@.*?\)/, '').replace(/[|•·].*$/, '').trim();
  const w = clean.split(/\s+/)[0];
  return /^[A-Za-zÀ-ÿ֐-׿'-]{2,}$/.test(w) ? w : '';
}

function pickFacts(c: Candidate): Array<{ fact: string; url?: string }> {
  const facts: Array<{ fact: string; url?: string }> = [];
  const ev = [...c.events].filter((e) => e.role === 'organizer' || e.role === 'co_host').sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''));
  if (ev[0]) facts.push({ fact: `${ev[0].title}${ev[0].location ? ` in ${ev[0].location}` : ''}${ev[0].startDate ? ` (${ev[0].startDate})` : ''}`, url: ev[0].evidenceUrls[0] });
  if (ev[1]) facts.push({ fact: `${ev[1].title}${ev[1].location ? ` in ${ev[1].location}` : ''}`, url: ev[1].evidenceUrls[0] });
  if (c.profile.niche) facts.push({ fact: c.profile.niche });
  if (c.profile.bio && facts.length < 2) facts.push({ fact: c.profile.bio.slice(0, 120), url: c.profile.profileUrl });
  return facts.slice(0, 3);
}

export function generateOutreach(c: Candidate, track: PartnershipTrack, language: OutreachLanguage, whyThisTrack: string, options: { senderName?: string; referralRateNote?: boolean } = {}): OutreachDraft {
  const facts = pickFacts(c);
  const name = firstName(c);
  const ev = facts[0]?.fact;
  const sender = options.senderName ?? VILLA.propertyManager;
  const en = {
    greeting: name ? `Hi ${name},` : 'Hi,',
    hook: ev ? `I came across ${ev} and the way you run your groups.` : `I came across your work on Instagram and the way you run your groups.`,
    villa: `I manage Villa Lithos, a private 9-bedroom estate in Porto Rafti, 20 minutes from Athens airport with no ferry, built for hosted groups.`,
    scouting_stay: `Between November and April we open the house to a small number of hosts for a scouting stay: a few nights to experience the property, the area and the logistics, and to see whether it fits a future retreat of yours. No obligation.`,
    pilot_retreat: `We are looking for a few hosts to run a first retreat with us this winter. We would structure it as a pilot: you bring your group, we take care of the house and the local logistics, and we shape terms together around your format.`,
    anchor_partnership: `We would like to work with a small number of hosts on a longer basis: several retreats or longer stays across the winter season, with priority dates and terms that reflect that commitment.`,
    referral_partnership: `We would like to propose a referral arrangement: when a host from your community books Villa Lithos for a retreat, you receive a referral fee on the booking. No hosting required on your side.`,
    close: `If this sounds interesting, I would be glad to share photos, floor plans and dates, and to answer any questions about winter in Attica.`,
    sign: `Warm regards,\n${sender}\nVilla Lithos, Porto Rafti\n${VILLA.website}`,
  };
  const he = {
    greeting: name ? `היי ${name},` : 'היי,',
    hook: ev ? `נתקלתי ב-${ev} ובאופן שבו את מנהלת את הקבוצות שלך.` : `נתקלתי בפעילות שלך באינסטגרם ובאופן שבו את מנהלת את הקבוצות שלך.`,
    villa: `אני מנהל את Villa Lithos, אחוזה פרטית עם 9 חדרי שינה בפורטו ראפטי, 20 דקות משדה התעופה של אתונה, בלי מעבורת, שמותאמת לאירוח קבוצות.`,
    scouting_stay: `בין נובמבר לאפריל אנחנו פותחים את הבית למספר קטן של מארחות לביקור היכרות: כמה לילות להתרשם מהנכס, מהאזור ומהלוגיסטיקה, ולבדוק אם הוא מתאים לריטריט עתידי שלך. בלי התחייבות.`,
    pilot_retreat: `אנחנו מחפשים כמה מארחות שיקיימו איתנו ריטריט ראשון בחורף הקרוב. נבנה אותו כפיילוט: את מביאה את הקבוצה, אנחנו דואגים לבית וללוגיסטיקה המקומית, ואת התנאים נגבש יחד סביב הפורמט שלך.`,
    anchor_partnership: `נשמח לעבוד עם מספר קטן של מארחות לטווח ארוך: כמה ריטריטים או שהיות ארוכות לאורך עונת החורף, עם עדיפות בתאריכים ותנאים שמשקפים את ההתחייבות הזו.`,
    referral_partnership: `נשמח להציע הסדר הפניות: כשמארחת מהקהילה שלך מזמינה את Villa Lithos לריטריט, את מקבלת עמלת הפניה על ההזמנה. בלי צורך לארח בעצמך.`,
    close: `אם זה מעניין, אשמח לשלוח תמונות, תוכניות קומה ותאריכים, ולענות על כל שאלה לגבי החורף באטיקה.`,
    sign: `בברכה,\n${sender}\nVilla Lithos, Porto Rafti\n${VILLA.website}`,
  };
  const t = language === 'he' ? he : en;
  const body = [t.greeting, '', t.hook, '', t.villa, '', t[track], '', t.close, '', t.sign].join('\n');
  if (PRICE_RE.test(body)) throw new Error('Outreach draft must not contain numeric prices');
  const subject = language === 'he' ? `Villa Lithos, ${TRACK_LABELS[track].he} לחורף 2026/27` : `Villa Lithos: ${TRACK_LABELS[track].en} for winter 2026/27`;
  return { track, language, subject, body, personalisationFacts: facts, whyThisTrack };
}

/** Message asking for the private data needed for Stage 2. Short, specific, never sent automatically. */
export function generateInsightsRequest(c: Candidate, language: OutreachLanguage, senderName = VILLA.propertyManager): string {
  const name = firstName(c);
  if (language === 'he') {
    return [
      name ? `היי ${name},` : 'היי,', '',
      'כדי שנוכל לבנות הצעה שמתאימה לקבוצות שלך, אשמח אם תוכלי לשתף כמה נתונים. צילומי מסך מ-Instagram Insights מספיקים לגמרי:',
      '1. Accounts reached ו-Views ב-90 הימים האחרונים.',
      '2. פילוח הקהל: מדינות וערים מובילות, גיל ומגדר.',
      '3. ממוצע צפיות ו-reach של סטוריז וריילס.',
      '4. לגבי הריטריטים: כמה אירועים קיימת, כמה משתתפים בכל אחד, והאם התמלאו.',
      '5. אם יש Media Kit או דוח מקמפיין קודם, גם הוא יעזור.', '',
      'המידע ישמש רק לבחינת שיתוף הפעולה, יישמר בצורה מאובטחת ויימחק לבקשתך.', '',
      `תודה,\n${senderName}\nVilla Lithos`,
    ].join('\n');
  }
  return [
    name ? `Hi ${name},` : 'Hi,', '',
    'To shape a proposal that fits your groups, could you share a few numbers? Screenshots from Instagram Insights are perfectly fine:',
    '1. Accounts reached and views for the last 90 days.',
    '2. Audience breakdown: top countries and cities, age and gender.',
    '3. Average story and Reel views and reach.',
    '4. For your retreats: how many you have run, participants per event, and whether they sold out.',
    '5. A media kit or a past campaign report, if you have one.', '',
    'This is used only to evaluate the collaboration, stored securely, and deleted on request.', '',
    `Thank you,\n${senderName}\nVilla Lithos`,
  ].join('\n');
}
