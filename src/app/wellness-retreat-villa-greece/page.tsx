import { Metadata } from "next";
import Link from "next/link";
import { WINTER_STATS } from "@/app/lib/season";

// Commercial venue page for "luxury wellness retreat villa greece" and
// "wellness villas greece". The long-form guide stays at
// /articles/wellness-retreats-greece-mainland; this page is the villa itself.
// Every fact here is already on the live site (wellness guide, homepage winter
// band, plan-a-group-stay, llms.txt). No prices, no invented measurements.

const TITLE = "Luxury Wellness Retreat Villa in Greece | Villa Lithos";
const H1 = "A Private Wellness Retreat Villa in Greece, 20 Minutes from Athens Airport";
const DESC = "The whole estate for your group: 9 bedrooms for up to 22, heated infinity pool, barrel sauna, private gym, padel court and shaded yoga deck, 20 min from Athens airport.";
const URL = "https://www.villalithosgreece.com/wellness-retreat-villa-greece";
const PUBLISHED = "2026-10-10";
const MODIFIED = "2026-10-10";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "luxury wellness retreat villa greece",
    "wellness villas greece",
    "wellness villa near athens",
    "retreat villa greece",
    "yoga retreat villa greece",
    "fitness retreat villa greece",
    "villa with sauna and gym greece",
    "private retreat venue athens",
  ],
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESC,
    url: URL,
    images: [{ url: "https://www.villalithosgreece.com/img/gallery/Exterior%20%26%20Pool%20(15).jpg", width: 2048, height: 1365 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

const img = (file: string) => `/img/gallery/${encodeURIComponent(file)}`;

const WHATSAPP = `https://wa.me/306932757142?text=${encodeURIComponent(
  "Hi, I'm planning a wellness retreat and would like to ask about Villa Lithos: dates, group size and what the concierge can arrange."
)}`;

const FACTS = [
  { k: "Exclusive use", v: "One group at a time, up to 22 guests" },
  { k: "Bedrooms", v: "9 bedrooms, 8.5 bathrooms" },
  { k: "Athens airport", v: "16 km, about 20 minutes" },
  { k: "Estate", v: "Gated 5,000 m² in Porto Rafti" },
];

const SPACES = [
  {
    file: "Wellness & Spa (2).jpg",
    alt: "Outdoor barrel sauna among the olive trees in the garden of Villa Lithos Porto Rafti",
    title: "Outdoor barrel sauna",
    text: "In the garden among the olive trees, with a red-light therapy panel. Contrast sessions with the pool a few steps away.",
  },
  {
    file: "Sports & Activities (4).jpg",
    alt: "Private gym pavilion at Villa Lithos with cable machine, bench and glass doors open to the lawn",
    title: "Private gym pavilion",
    text: "Beside the pool, with folding glass doors onto the lawn. Multi-station cable machine, adjustable bench, adjustable dumbbells, treadmill.",
  },
  {
    file: "Exterior & Pool (15).jpg",
    alt: "Pergola-shaded stone training deck beside the heated infinity pool at Villa Lithos at dusk",
    title: "Shaded training deck",
    text: "Pergola-shaded stone terrace beside the pool for yoga, mobility and mat work, plus the upper terrace for sunrise sessions.",
  },
  {
    file: "Exterior & Pool.jpg",
    alt: "Heated infinity pool and terraces of Villa Lithos Porto Rafti with sea views",
    title: "Heated infinity pool and jacuzzi",
    text: "Sea views, with the jacuzzi alongside. Swim sessions, recovery and the end of the day.",
  },
  {
    file: "Sports & Activities (6).jpg",
    alt: "Floodlit glass-walled padel court at Villa Lithos Porto Rafti in the evening",
    title: "Floodlit padel court",
    text: "Full-size and glass-walled, lit for evening play. Rackets and balls provided; a coach can be booked through the concierge.",
  },
  {
    file: "Living & Dining (6).jpg",
    alt: "Fireplace lounge at Villa Lithos with a stone wall and wooden beamed ceiling",
    title: "Indoor session spaces",
    text: "Two living rooms on separate levels and an attic floor with a large screen, so a workshop and quiet time can run at once. Starlink internet throughout.",
  },
];

const FORMATS = [
  {
    title: "Yoga and wellness teachers running a retreat",
    text: "Bring your own group of 10 to 16. The teacher takes the separate apartment, with its own entrance and kitchen, so there is a door between work and rest; participants have private rooms in the main house.",
  },
  {
    title: "Fitness and training camps",
    text: "Gym, padel and pool on one estate, shaded mat space for mobility, and the sauna for recovery. Trainers and physiotherapists can be arranged by the concierge.",
  },
  {
    title: "Wellness weeks for friends and families",
    text: "A private house rather than a resort programme: your own schedule, your own menu, and a chef if you want one. Up to 22 guests, or 8 to 9 if everyone needs a private room.",
  },
  {
    title: "Wellness offsites for teams",
    text: "Mornings in the gym or on the deck, sessions in the living rooms, evenings in the sauna. The corporate setup, rooming plans and agenda are on the corporate retreats page.",
  },
];

const COMPARE = [
  { row: "Group size", villa: "Up to 22, the whole house is yours", resort: "Shared programmes, usually under 10" },
  { row: "Schedule", villa: "Set by your facilitator", resort: "Fixed resort timetable" },
  { row: "Food", villa: "Private chef to your brief: plant-forward, high-protein, kosher on request", resort: "Set menu, limited flexibility" },
  { row: "Privacy", villa: "No other guests on the estate", resort: "Shared facilities" },
  { row: "Practitioners", villa: "Arranged by the villa concierge from Athens", resort: "On-site staff" },
];

const FAQ = [
  {
    q: "Is Villa Lithos a wellness resort?",
    a: "No. It is a privately owned villa rented to one group at a time, with the facilities a wellness programme needs on the estate: heated infinity pool, jacuzzi, outdoor barrel sauna with a red-light therapy panel, private gym pavilion, floodlit padel court and shaded terraces for mat work. Your facilitator runs the programme; the concierge arranges whatever else you need.",
  },
  {
    q: "How many people can a wellness retreat host?",
    a: "Up to 22 guests across nine bedrooms. If everyone needs a private room, plan for 8 to 9 participants; most retreats run between 10 and 16. The full room-by-room list is on the group-stay planning page.",
  },
  {
    q: "Can the villa arrange yoga teachers, trainers, massage and a chef?",
    a: "Yes. The concierge team works with Athens-based yoga instructors, trainers, massage therapists and private chefs, and quotes them separately. Planning usually starts six to eight weeks before arrival.",
  },
  {
    q: "Can we hold a wellness retreat in winter?",
    a: `Yes. From October to March the sauna, the gym and the fireplace lounge carry the programme. Last winter (${WINTER_STATS.period}) Porto Rafti had ${WINTER_STATS.portoRafti.sunnyDays} days out of ${WINTER_STATS.days} with six hours of sunshine or more, and an average daytime high of ${WINTER_STATS.portoRafti.avgHigh}°C.`,
  },
  {
    q: "How do guests get there?",
    a: "Athens International Airport is 16 km away, about 20 minutes by car. Groups can land in the morning and start the same afternoon, with no ferry and no domestic flight.",
  },
  {
    q: "How do we check dates and rates?",
    a: "Send your dates and group size on WhatsApp or through the inquiry form. Rates are quoted on request and are not published on the site; weekday blocks from October to May are the easiest to place.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": URL,
      url: URL,
      name: TITLE,
      description: DESC,
      datePublished: PUBLISHED,
      dateModified: MODIFIED,
      inLanguage: "en",
      about: { "@id": "https://www.villalithosgreece.com/#villa" },
      primaryImageOfPage: { "@type": "ImageObject", url: `https://www.villalithosgreece.com${img("Exterior & Pool (15).jpg")}` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Villa Lithos", item: "https://www.villalithosgreece.com/" },
          { "@type": "ListItem", position: 2, name: "Wellness retreat villa", item: URL },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

const s = {
  page: { maxWidth: 1040, margin: "0 auto", padding: "48px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.7 } as React.CSSProperties,
  kicker: { fontSize: 12, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase" as const, color: "#7a8c6e", margin: "0 0 10px" } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "clamp(1.9rem, 4.2vw, 2.7rem)", color: "#2c2c2c", margin: "0 0 16px", lineHeight: 1.18, maxWidth: 820 } as React.CSSProperties,
  lead: { fontSize: "1.15rem", color: "#444", maxWidth: 760, margin: "0 0 24px" } as React.CSSProperties,
  ctaRow: { display: "flex", flexWrap: "wrap" as const, gap: 12, margin: "0 0 28px" } as React.CSSProperties,
  primary: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "14px 28px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.02rem" } as React.CSSProperties,
  secondary: { display: "inline-block", border: "1px solid #7a8c6e", color: "#5f7052", padding: "13px 26px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.02rem" } as React.CSSProperties,
  hero: { width: "100%", height: "auto", aspectRatio: "16 / 8", objectFit: "cover" as const, borderRadius: 12, display: "block", margin: "0 0 20px" } as React.CSSProperties,
  facts: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, margin: "0 0 48px", padding: 0, listStyle: "none" } as React.CSSProperties,
  fact: { background: "#faf8f3", border: "1px solid #ece7d8", borderRadius: 8, padding: "14px 18px" } as React.CSSProperties,
  factK: { display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" as const, color: "#7a8c6e" } as React.CSSProperties,
  factV: { display: "block", fontSize: "1.02rem", color: "#2c2c2c", marginTop: 4 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.75rem", color: "#2c2c2c", margin: "56px 0 12px" } as React.CSSProperties,
  sub: { fontSize: "1.05rem", color: "#555", maxWidth: 760, margin: "0 0 24px" } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 } as React.CSSProperties,
  card: { background: "#fff", border: "1px solid #ece7d8", borderRadius: 10, overflow: "hidden" } as React.CSSProperties,
  cardImg: { width: "100%", height: "auto", aspectRatio: "3 / 2", objectFit: "cover" as const, display: "block" } as React.CSSProperties,
  cardBody: { padding: "16px 18px 18px" } as React.CSSProperties,
  h3: { fontFamily: "var(--font-serif), serif", fontSize: "1.2rem", color: "#2c2c2c", margin: "0 0 6px" } as React.CSSProperties,
  cardText: { fontSize: "0.98rem", color: "#4a4a4a", margin: 0 } as React.CSSProperties,
  format: { background: "#faf8f3", border: "1px solid #ece7d8", borderRadius: 8, padding: "18px 22px" } as React.CSSProperties,
  tableWrap: { overflowX: "auto" as const } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "0.97rem", minWidth: 560 } as React.CSSProperties,
  th: { textAlign: "left" as const, padding: "10px 12px", background: "#f0ede4", borderBottom: "2px solid #d8d3c4" } as React.CSSProperties,
  td: { padding: "10px 12px", borderBottom: "1px solid #e8e3d3", verticalAlign: "top" as const } as React.CSSProperties,
  steps: { margin: "0 0 18px", paddingLeft: 22, maxWidth: 780, listStyle: "decimal" } as React.CSSProperties,
  li: { marginBottom: 10, fontSize: "1.03rem" } as React.CSSProperties,
  faqItem: { borderBottom: "1px solid #e8e3d3", padding: "14px 0", maxWidth: 820 } as React.CSSProperties,
  faqQ: { fontWeight: 600, fontSize: "1.05rem", cursor: "pointer" } as React.CSSProperties,
  faqA: { marginTop: 8, fontSize: "1.02rem", color: "#444" } as React.CSSProperties,
  link: { color: "#5f7052" } as React.CSSProperties,
  ctaBox: { marginTop: 56, padding: "40px 28px", background: "#f8f6f1", borderRadius: 12, textAlign: "center" as const } as React.CSSProperties,
  ctaHeading: { fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: "#2c2c2c", margin: "0 0 10px" } as React.CSSProperties,
  ctaText: { fontSize: "1.05rem", color: "#555", margin: "0 auto 22px", maxWidth: 640 } as React.CSSProperties,
  updated: { fontSize: "0.86rem", color: "#888", marginTop: 36, paddingTop: 14, borderTop: "1px solid #e8e3d3" } as React.CSSProperties,
};

export default function Page() {
  return (
    <div style={s.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section data-lead-block="wellness-hero">
        <p style={s.kicker}>Wellness retreat venue · Porto Rafti, Greece</p>
        <h1 style={s.h1}>{H1}</h1>
        <p style={s.lead}>
          Villa Lithos is a privately owned estate rented to one group at a time. The pool, the sauna, the gym, the padel court and
          the shaded training deck are yours alone, for a retreat of 10 to 22 guests, a training week or a quiet week with friends.
        </p>
        <div style={s.ctaRow}>
          <a href={WHATSAPP} target="_blank" rel="noopener" style={s.primary}>Ask about dates on WhatsApp</a>
          <Link href="/#inquiry" style={s.secondary}>Send an inquiry</Link>
        </div>
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img("Exterior & Pool (15).jpg")} alt="Shaded training deck beside the heated infinity pool at Villa Lithos Porto Rafti at dusk" style={s.hero} fetchPriority="high" />

      <ul style={s.facts}>
        {FACTS.map((f) => (
          <li key={f.k} style={s.fact}>
            <span style={s.factK}>{f.k}</span>
            <span style={s.factV}>{f.v}</span>
          </li>
        ))}
      </ul>

      <h2 id="facilities" style={s.h2}>What Is on the Estate</h2>
      <p style={s.sub}>
        Everything below is on the property and for your group only. The detailed equipment table for facilitators is in our{" "}
        <Link href="/articles/wellness-retreats-greece-mainland#fitness-facilities" style={s.link}>guide to fitness and wellness retreats in Greece</Link>.
      </p>
      <div style={s.grid}>
        {SPACES.map((sp) => (
          <div key={sp.title} style={s.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img(sp.file)} alt={sp.alt} loading="lazy" style={s.cardImg} />
            <div style={s.cardBody}>
              <h3 style={s.h3}>{sp.title}</h3>
              <p style={s.cardText}>{sp.text}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 id="formats" style={s.h2}>Who Books It for Wellness</h2>
      <div style={{ ...s.grid, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {FORMATS.map((f) => (
          <div key={f.title} style={s.format}>
            <h3 style={s.h3}>{f.title}</h3>
            <p style={s.cardText}>{f.text}</p>
          </div>
        ))}
      </div>
      <p style={{ ...s.sub, marginTop: 18 }}>
        Who sleeps where, room by room, is on the <Link href="/plan-a-group-stay" style={s.link}>group-stay planning page</Link>. For team
        offsites see the <Link href="/corporate-retreats" style={s.link}>corporate retreat venue</Link> page.
      </p>

      <h2 id="compare" style={s.h2}>A Private Villa or a Wellness Resort?</h2>
      <p style={s.sub}>
        Greece has excellent wellness resorts for couples and small groups. Once a group passes about ten people, or wants its own
        schedule and menu, a private villa is usually the only format that fits.
      </p>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}></th><th style={s.th}>Villa Lithos</th><th style={s.th}>Typical wellness resort</th></tr>
          </thead>
          <tbody>
            {COMPARE.map((c) => (
              <tr key={c.row}>
                <td style={s.td}><strong>{c.row}</strong></td>
                <td style={s.td}>{c.villa}</td>
                <td style={s.td}>{c.resort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="how" style={s.h2}>How Booking a Retreat Works</h2>
      <ol style={s.steps}>
        <li style={s.li}><strong>Send dates and group size</strong> on WhatsApp or through the inquiry form. Weekday blocks from October to May are the easiest to place.</li>
        <li style={s.li}><strong>Get a quote</strong> for the house and for anything you want arranged: chef, teachers, trainers, massage, transfers.</li>
        <li style={s.li}><strong>Plan the programme</strong> with the concierge, usually six to eight weeks before arrival. Your facilitator leads; the team books the rest.</li>
        <li style={s.li}><strong>Land in Athens</strong> and be on the estate about 20 minutes later.</li>
      </ol>

      <h2 id="faq" style={s.h2}>Questions Organisers Ask</h2>
      {FAQ.map((f) => (
        <details key={f.q} style={s.faqItem}>
          <summary style={s.faqQ}>{f.q}</summary>
          <p style={s.faqA}>{f.a}</p>
        </details>
      ))}

      <div style={s.ctaBox} data-lead-block="wellness-footer">
        <h2 style={s.ctaHeading}>Check Dates for Your Retreat</h2>
        <p style={s.ctaText}>
          Tell us your dates, the size of the group and what the programme needs. Rates are quoted on request.
        </p>
        <div style={{ ...s.ctaRow, justifyContent: "center", margin: 0 }}>
          <a href={WHATSAPP} target="_blank" rel="noopener" style={s.primary}>WhatsApp the villa team</a>
          <Link href="/#inquiry" style={s.secondary}>Inquiry form</Link>
        </div>
      </div>

      <p style={s.updated}>
        Last updated 10 October 2026. Winter sunshine and temperature figures: Open-Meteo historical data (ERA5), {WINTER_STATS.period}.
      </p>
    </div>
  );
}
