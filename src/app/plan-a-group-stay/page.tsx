import { Metadata } from "next";
import Link from "next/link";

const TITLE = "Plan a Group Stay for 10 to 22 in Greece: Rooms, Beds and a Sample Schedule | Villa Lithos";
const H1 = "Planning a Group Stay in Greece for 10 to 22 People: Rooms, Beds and a Sample Schedule";
const DESC = "The organiser's page for Villa Lithos Porto Rafti: every bedroom with its bed and bathroom, who sleeps where for groups of 10, 16 and 22, a three-day sample schedule, the spec organisers ask for, and logistics from Athens airport.";
const URL = "https://www.villalithosgreece.com/plan-a-group-stay";
const PUBLISHED = "2026-10-08";
const MODIFIED = "2026-10-08";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "group retreats in greece",
    "group villa greece 20 people",
    "villa for 22 guests greece",
    "plan a group trip to greece",
    "retreat venue greece",
    "large villa near athens for groups",
    "who sleeps where villa",
    "family reunion villa greece",
  ],
  openGraph: { type: "article", title: TITLE, description: DESC, url: URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

type Room = { name: string; level: string; bed: string; bath: string; sleeps: number; note: string };

const ROOMS: Room[] = [
  { name: "Grand Master Suite", level: "Ground floor (entrance level)", bed: "King", bath: "En suite", sleeps: 2, note: "Large, wide, step-free. The natural room for grandparents or anyone who prefers no stairs." },
  { name: "Master Suite I", level: "Living floor", bed: "King", bath: "En suite", sleeps: 2, note: "The largest of the living-floor suites, with a sitting corner and a terrace door." },
  { name: "Master Suite II", level: "Living floor", bed: "Queen", bath: "En suite", sleeps: 2, note: "Master suite with the bathroom inside the room." },
  { name: "Master Suite III", level: "Living floor", bed: "Queen", bath: "En suite", sleeps: 2, note: "Master suite with the bathroom inside the room." },
  { name: "Bedroom IV", level: "Living floor", bed: "Queen", bath: "Private, next door", sleeps: 2, note: "Its own bathroom adjoining the room rather than inside it." },
  { name: "Lower Suite", level: "Lower level", bed: "Queen", bath: "En suite", sleeps: 2, note: "The lower level's suite, with a garden door." },
  { name: "Bedroom A", level: "Lower level", bed: "Queen", bath: "Shared with Bedroom B", sleeps: 2, note: "Bathroom in the corridor, shared with Bedroom B. A natural pairing for siblings, teens or friends." },
  { name: "Bedroom B", level: "Lower level", bed: "Queen", bath: "Shared with Bedroom A", sleeps: 2, note: "Mirror of Bedroom A, with a garden door." },
  { name: "Apartment Bedroom", level: "Separate building", bed: "Queen", bath: "Apartment bathroom", sleeps: 2, note: "The apartment has its own kitchen, living room, bathroom and entrance." },
  { name: "Loft I", level: "Attic", bed: "Thick floor mattresses × 2", bath: "Main-house bathrooms", sleeps: 2, note: "Open loft under the roof beams, closed with a blackout curtain rather than a door. Loved by kids and teens." },
  { name: "Loft II", level: "Attic", bed: "Thick floor mattresses × 2", bath: "Main-house bathrooms", sleeps: 2, note: "Mirror of Loft I. Both lofts double as a workshop or play space by day." },
  { name: "Apartment Lounge", level: "Separate building", bed: "Two temporary beds or mattresses", bath: "Apartment bathroom", sleeps: 2, note: "Turns the apartment into a self-contained unit for four." },
];

const SPLITS = [
  {
    title: "Multi-generational family, about 16",
    text: "Grandparents in the Grand Master Suite on the step-free entrance level, parents in the four living-floor rooms, teens or older cousins in Bedrooms A and B with their shared bathroom, and a young family in the apartment with its own kitchen. The attic lofts stay as the play floor by day; from 17 guests upward they become the children's dormitory.",
  },
  {
    title: "Nine couples, 18 people",
    text: "One couple per bedroom. Six of the nine bedrooms have a bathroom of their own (five en suite plus Bedroom IV with its bathroom next door), Bedrooms A and B share one, and the apartment couple has the whole annex. Nobody sleeps on a mattress.",
  },
  {
    title: "Retreat of 10 to 12 with a facilitator",
    text: "The facilitator or teacher takes the apartment, with its own entrance and kitchen, so there is a door between work and rest. Participants have private rooms in the main house. Sessions run in one living room, the attic floor or on the terraces; the second living room stays free for quiet time.",
  },
  {
    title: "Full house, 22",
    text: "All nine bedrooms, both attic lofts and the apartment lounge. Eighteen people in proper beds, four on the loft mattresses and the lounge beds. The house is at its best this way with a mix of adults and children rather than 22 adults.",
  },
];

const SCHEDULE = [
  {
    day: "Day 1, arrival",
    items: [
      "Land at Athens International Airport; the villa is 16 km and about 20 minutes away, one transfer, no ferry.",
      "Lunch on the alfresco terrace while the team walks the organiser through the house and the rooming plan.",
      "Pool, jacuzzi and padel for the afternoon; a private-chef welcome dinner at the one table that seats everyone.",
    ],
  },
  {
    day: "Day 2, the house and the bay",
    items: [
      "Morning session, class or long breakfast: the gym pavilion, the shaded deck and the two living rooms give the group three places to be at once.",
      "Avlaki beach, 1.5 km away, sandy and sheltered, or a boat day from Rafina port 20 minutes north.",
      "Padel tournament at sunset, then a fish taverna in Porto Rafti booked ahead for the whole group, or a BBQ on the estate.",
    ],
  },
  {
    day: "Day 3, Attica",
    items: [
      "A day trip: the Acropolis (about 40 minutes), Cape Sounion, Brauron or Marathon, with the concierge arranging transport.",
      "Outdoor sauna and pool for whoever stays behind.",
      "Last dinner on the estate; the airport is 20 minutes away for early flights the next morning.",
    ],
  },
];

const SPEC = [
  { k: "Capacity", v: "9 bedrooms, 8.5 bathrooms, 18 in proper beds, up to 22 with the attic lofts and the apartment lounge" },
  { k: "Beds", v: "2 king and 7 queen beds; thick floor mattresses in the two attic lofts; two temporary beds in the apartment lounge; travel cots on request" },
  { k: "Levels", v: "Four levels with an elevator to all of them; the Grand Master Suite is on the step-free entrance level" },
  { k: "Living spaces", v: "Two living rooms on separate levels, the attic floor with a large screen and blackout curtains, an alfresco dining terrace and one dining table for the whole group" },
  { k: "Kitchen", v: "Designer kitchen with walk-in pantry, equipped for a private chef and large groups; the apartment has a second kitchen" },
  { k: "Outdoors", v: "Heated infinity pool, jacuzzi, outdoor sauna, private floodlit padel court, gym pavilion, shaded deck, BBQ area, 5,000 m² walled estate with parking inside the gate" },
  { k: "Internet and climate", v: "Starlink internet with WiFi and air conditioning throughout the house" },
  { k: "Catering", v: "Private chef from a single dinner to full board; kosher and other dietary requirements on advance request" },
  { k: "Location", v: "Porto Rafti, East Attica: 16 km (about 20 minutes) from Athens International Airport, 1.5 km from Avlaki beach, about 20 minutes from Rafina port, 37 km from the Acropolis" },
  { k: "House rules", v: "No pets, no smoking indoors; the whole estate is rented to one group at a time" },
  { k: "Rates", v: "On request, by group size, dates and catering" },
];

const FAQ = [
  {
    q: "How many people can sleep at Villa Lithos?",
    a: "Eighteen in proper beds across nine bedrooms, and up to 22 using the two attic lofts (thick floor mattresses behind blackout curtains) and the apartment lounge (two temporary beds). Infants in travel cots are arranged on request and are not counted in the 22.",
  },
  {
    q: "How many bedrooms have their own bathroom?",
    a: "Six of the nine: the Grand Master Suite, Master Suites I, II and III and the Lower Suite are en suite, and Bedroom IV has a private bathroom next door. Bedrooms A and B share a bathroom in the corridor. The apartment bedroom uses the apartment's own bathroom, shared only with the apartment lounge if it is in use.",
  },
  {
    q: "Can older guests avoid stairs?",
    a: "Yes. The Grand Master Suite is on the step-free entrance level, and an elevator connects all four levels of the main house, so the living floor, the lower level and the attic are all reachable without stairs.",
  },
  {
    q: "Where do children sleep?",
    a: "Most families put the children in the two attic lofts, which have thick floor mattresses, blackout curtains, skylights and a TV corner, and double as the play floor by day. Bedrooms A and B, which share a bathroom, suit teens or cousins travelling together. Travel cots for infants are arranged on request.",
  },
  {
    q: "Is there a separate space for a facilitator, nanny or grandparents?",
    a: "The apartment is a separate building on the estate with its own entrance, kitchen, living room and bathroom. It sleeps two in the bedroom and up to four with the lounge beds, so it works for a facilitator, a family with a baby, or grandparents who want their own quiet unit.",
  },
  {
    q: "How does a group booking work?",
    a: "Send the group size, dates and what you need (private rooms, catering, transfers) through the inquiry form. The concierge team replies with a proposal and a rooming plan; confirmed groups receive a link to the villa's interactive sleeping planner to decide who sleeps where before arrival. Rates are quoted on request.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      headline: H1,
      description: DESC,
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      author: { "@type": "Organization", name: "Villa Lithos Porto Rafti", url: "https://www.villalithosgreece.com" },
      publisher: { "@type": "Organization", name: "Villa Lithos Porto Rafti", logo: { "@type": "ImageObject", url: "https://www.villalithosgreece.com/img/logo.webp" } },
      image: ["https://www.villalithosgreece.com/img/hero.webp"],
      mainEntityOfPage: { "@type": "WebPage", "@id": URL },
      url: URL,
      about: { "@type": "LodgingBusiness", name: "Villa Lithos Porto Rafti", url: "https://www.villalithosgreece.com", sameAs: "https://www.villalithosgreece.com/#villa" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const s = {
  article: { maxWidth: 820, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.8 } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", color: "#2c2c2c", marginBottom: 16, lineHeight: 1.2 } as React.CSSProperties,
  meta: { color: "#888", fontSize: "0.92rem", marginBottom: 36, display: "block" } as React.CSSProperties,
  intro: { fontSize: "1.15rem", lineHeight: 1.7, marginBottom: 28, padding: "20px 24px", background: "#f8f6f1", borderLeft: "3px solid #7a8c6e", borderRadius: 4 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: "#2c2c2c", marginTop: 48, marginBottom: 12 } as React.CSSProperties,
  h3: { fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", color: "#2c2c2c", marginTop: 24, marginBottom: 8 } as React.CSSProperties,
  p: { marginBottom: 18, fontSize: "1.05rem" } as React.CSSProperties,
  ul: { marginBottom: 18, paddingLeft: 22 } as React.CSSProperties,
  li: { marginBottom: 8, fontSize: "1.05rem" } as React.CSSProperties,
  tableWrap: { overflowX: "auto" as const, marginBottom: 22 } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "0.95rem" } as React.CSSProperties,
  th: { textAlign: "left" as const, padding: "10px 12px", background: "#f0ede4", borderBottom: "2px solid #d8d3c4", whiteSpace: "nowrap" as const } as React.CSSProperties,
  td: { padding: "10px 12px", borderBottom: "1px solid #e8e3d3", verticalAlign: "top" as const } as React.CSSProperties,
  source: { fontSize: "0.86rem", color: "#666", fontStyle: "italic" } as React.CSSProperties,
  link: { color: "#7a8c6e" } as React.CSSProperties,
  card: { background: "#faf8f3", border: "1px solid #ece7d8", borderRadius: 8, padding: "18px 22px", marginBottom: 14 } as React.CSSProperties,
  cardTitle: { fontFamily: "var(--font-serif), serif", fontSize: "1.15rem", color: "#2c2c2c", margin: "0 0 6px" } as React.CSSProperties,
  cta: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.05rem", marginTop: 12 } as React.CSSProperties,
  ctaBox: { marginTop: 48, padding: "40px 32px", background: "#f8f6f1", borderRadius: 12, textAlign: "center" as const } as React.CSSProperties,
  ctaHeading: { fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "#2c2c2c", marginBottom: 12, marginTop: 0 } as React.CSSProperties,
  ctaText: { fontSize: "1.05rem", color: "#555", marginBottom: 24 } as React.CSSProperties,
  back: { display: "inline-block", marginTop: 32, color: "#7a8c6e", textDecoration: "none", fontSize: "0.97rem" } as React.CSSProperties,
  updated: { fontSize: "0.86rem", color: "#888", marginTop: 36, paddingTop: 14, borderTop: "1px solid #e8e3d3" } as React.CSSProperties,
  toc: { background: "#faf8f3", border: "1px solid #ece7d8", borderRadius: 8, padding: "16px 22px", marginBottom: 28 } as React.CSSProperties,
};

export default function Page() {
  return (
    <article style={s.article}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 style={s.h1}>{H1}</h1>
      <span style={s.meta}>Last updated: 8 October 2026 · 9 minute read · Villa Lithos Porto Rafti</span>

      <p style={s.intro}>
        Organising a trip for a big family, a group of friends or a retreat comes down to a few questions that most villa listings never answer: exactly who sleeps where, which rooms have their own bathroom, where the children go, where the teacher or the grandparents get some quiet, and what a day actually looks like. This page answers them for <strong>Villa Lithos Porto Rafti</strong>, a privately owned 9-bedroom estate for up to 22 guests, 20 minutes from Athens International Airport.
      </p>

      <nav style={s.toc} aria-label="Contents">
        <strong>On this page</strong>
        <ul style={{ ...s.ul, marginBottom: 0, marginTop: 8 }}>
          <li><a href="#numbers" style={s.link}>The numbers organisers need first</a></li>
          <li><a href="#rooms" style={s.link}>Every room, bed and bathroom</a></li>
          <li><a href="#splits" style={s.link}>Four ways to split the house</a></li>
          <li><a href="#schedule" style={s.link}>A three-day sample schedule</a></li>
          <li><a href="#spec" style={s.link}>The spec organisers ask for</a></li>
          <li><a href="#faq" style={s.link}>Questions organisers ask</a></li>
        </ul>
      </nav>

      <h2 id="numbers" style={s.h2}>The Numbers Organisers Need First</h2>
      <ul style={s.ul}>
        <li style={s.li}><strong>Nine bedrooms, 8.5 bathrooms.</strong> Eighteen people in proper beds (2 king, 7 queen).</li>
        <li style={s.li}><strong>Up to 22</strong> with the two attic lofts (thick floor mattresses behind blackout curtains) and the apartment lounge (two temporary beds).</li>
        <li style={s.li}><strong>Six bedrooms with their own bathroom</strong>, two that share one, and a separate apartment with its own bathroom, kitchen and entrance.</li>
        <li style={s.li}><strong>Four levels, one elevator</strong>, and a king suite on the step-free entrance level.</li>
        <li style={s.li}><strong>Two living rooms</strong> on separate levels, plus the attic floor and the terraces, so a group of 20 has three or four places to be at once.</li>
        <li style={s.li}><strong>20 minutes from the airport</strong>, one transfer, no ferry.</li>
      </ul>

      <h2 id="rooms" style={s.h2}>Every Room, Bed and Bathroom</h2>
      <p style={s.p}>
        The main house has eight bedrooms on three levels plus two attic lofts; the apartment is a separate building on the estate. Levels are listed from the entrance down and up.
      </p>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Room</th><th style={s.th}>Level</th><th style={s.th}>Bed</th><th style={s.th}>Bathroom</th><th style={s.th}>Sleeps</th><th style={s.th}>Notes</th></tr>
          </thead>
          <tbody>
            {ROOMS.map((r) => (
              <tr key={r.name}>
                <td style={s.td}><strong>{r.name}</strong></td>
                <td style={s.td}>{r.level}</td>
                <td style={s.td}>{r.bed}</td>
                <td style={s.td}>{r.bath}</td>
                <td style={s.td}>{r.sleeps}</td>
                <td style={s.td}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={s.source}>
        Lofts and the apartment lounge are open, flexible spaces with blackout curtains rather than doors. The estate is rented to one group at a time, so every room on this list is yours.
      </p>

      <h2 id="splits" style={s.h2}>Four Ways to Split the House</h2>
      {SPLITS.map((sp) => (
        <div key={sp.title} style={s.card}>
          <h3 style={s.cardTitle}>{sp.title}</h3>
          <p style={{ ...s.p, marginBottom: 0 }}>{sp.text}</p>
        </div>
      ))}

      <h2 id="schedule" style={s.h2}>A Three-Day Sample Schedule</h2>
      <p style={s.p}>
        A long weekend as organisers usually run it. Everything in it is on the estate or within a short drive; the concierge team books tavernas, boats and transport.
      </p>
      {SCHEDULE.map((d) => (
        <div key={d.day}>
          <h3 style={s.h3}>{d.day}</h3>
          <ul style={s.ul}>
            {d.items.map((it) => (
              <li key={it} style={s.li}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
      <p style={s.p}>
        For a working offsite, the <Link href="/corporate-retreats" style={s.link}>corporate retreats page</Link> has an agenda built around sessions. For a training or yoga programme, the <Link href="/articles/wellness-retreats-greece-mainland" style={s.link}>wellness retreat guide</Link> lists the gym and training equipment on the estate.
      </p>

      <h2 id="spec" style={s.h2}>The Spec Organisers Ask For</h2>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <tbody>
            {SPEC.map((row) => (
              <tr key={row.k}>
                <td style={{ ...s.td, fontWeight: 600, whiteSpace: "nowrap" }}>{row.k}</td>
                <td style={s.td}>{row.v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="faq" style={s.h2}>Questions Organisers Ask</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3 style={s.h3}>{f.q}</h3>
          <p style={s.p}>{f.a}</p>
        </div>
      ))}

      <h2 style={s.h2}>Related Reading</h2>
      <ul style={s.ul}>
        <li style={s.li}><Link href="/articles/luxury-villa-lithos-family-retreat" style={s.link}>Large Private Villa Near Athens: the estate for groups of up to 22</Link></li>
        <li style={s.li}><Link href="/articles/multi-generational-trip-greece" style={s.link}>Planning a Multi-Generational Family Trip to Greece</Link></li>
        <li style={s.li}><Link href="/corporate-retreats" style={s.link}>Corporate Retreat Venue Near Athens</Link></li>
        <li style={s.li}><Link href="/articles/wellness-retreats-greece-mainland" style={s.link}>Fitness and Wellness Retreats in Greece</Link></li>
        <li style={s.li}><Link href="/articles/eating-in-porto-rafti" style={s.link}>Where to eat in Porto Rafti with a group</Link></li>
        <li style={s.li}><Link href="/porto-rafti" style={s.link}>Porto Rafti travel guide</Link></li>
      </ul>

      <div style={s.ctaBox}>
        <h2 style={s.ctaHeading}>Request a Group Proposal</h2>
        <p style={s.ctaText}>Send the group size, dates and what you need. The concierge team replies with a proposal and a rooming plan.</p>
        <Link href="/#inquiry" style={s.cta}>Plan Your Group Stay</Link>
      </div>

      <p style={s.updated}>
        Last updated: 8 October 2026. Room, bed and bathroom details are from the villa&apos;s own sleeping inventory; drive times measured in light traffic. Rates and availability are quoted on request.
      </p>

      <Link href="/" style={s.back}>&larr; Back to Villa Lithos home</Link>
    </article>
  );
}
