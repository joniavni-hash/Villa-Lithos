import { Metadata } from "next";
import Link from "next/link";
import { WINTER_STATS } from "@/app/lib/season";

// Commercial venue page for "luxury villas with padel court greece",
// "padel villa greece" and "padel villa athens". Groups of 8 to 22 who put
// padel at the centre of the trip: friends, clubs, teams. Every fact here is
// already on the live site (wellness venue page, group-stay planner, homepage,
// llms.txt). No prices, no court surface or dimensions (not published).

const TITLE = "Private Padel Retreat Villa Near Athens | Villa Lithos";
const H1 = "A Private Padel Villa Near Athens for 8 to 22 Players";
const DESC = "Your own floodlit padel court on a private estate 20 minutes from Athens airport: 9 bedrooms for up to 22, heated pool, sauna, gym. Rackets, balls and a coach on request.";
const URL = "https://www.villalithos.com/padel-villa-athens";
const PUBLISHED = "2026-10-14";
const MODIFIED = "2026-10-14";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "luxury villas with padel court greece",
    "padel villa greece",
    "padel villa athens",
    "villa with padel court greece",
    "padel retreat greece",
    "padel holiday greece",
    "padel porto rafti",
    "private padel court villa",
  ],
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESC,
    url: URL,
    images: [{ url: "https://www.villalithos.com/img/gallery/Sports%20%26%20Activities%20(6).jpg", width: 2048, height: 1365 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

const img = (file: string) => `/img/gallery/${encodeURIComponent(file)}`;

const WHATSAPP = `https://wa.me/306932757142?text=${encodeURIComponent(
  "Hi, we're a padel group looking at Villa Lithos. I'd like to ask about dates, group size and booking a coach."
)}`;

const FACTS = [
  { k: "The court", v: "Private, full-size, glass-walled, floodlit" },
  { k: "Group size", v: "Up to 22 guests in 9 bedrooms" },
  { k: "Athens airport", v: "16 km, about 20 minutes by car" },
  { k: "Exclusive use", v: "One group at a time, gated 5,000 m² estate" },
];

const RECOVERY = [
  {
    file: "Sports & Activities (6).jpg",
    alt: "Floodlit glass-walled padel court at Villa Lithos Porto Rafti in the evening",
    title: "Floodlit padel court",
    text: "Full-size and glass-walled, lit for evening play, a short walk from the house. Rackets and balls are provided; a coach can be booked through the concierge.",
  },
  {
    file: "Wellness & Spa (2).jpg",
    alt: "Outdoor barrel sauna among the olive trees in the garden of Villa Lithos Porto Rafti",
    title: "Outdoor barrel sauna with red light",
    text: "In the garden among the olive trees, with a red-light therapy panel. Contrast sessions with the pool a few steps away.",
  },
  {
    file: "Exterior & Pool.jpg",
    alt: "Heated infinity pool and terraces of Villa Lithos Porto Rafti with sea views",
    title: "Heated infinity pool and jacuzzi",
    text: "Sea views, with the jacuzzi alongside. Cool-down after the afternoon session, recovery before dinner.",
  },
  {
    file: "Sports & Activities (4).jpg",
    alt: "Private gym pavilion at Villa Lithos with cable machine, bench and glass doors open to the lawn",
    title: "Private gym pavilion",
    text: "Beside the pool, with folding glass doors onto the lawn. Multi-station cable machine, adjustable bench, adjustable dumbbells, treadmill.",
  },
  {
    file: "Living & Dining (6).jpg",
    alt: "Fireplace lounge at Villa Lithos with a stone wall and wooden beamed ceiling",
    title: "Two living rooms and an attic screen",
    text: "Two living rooms on separate levels and an attic floor with a large screen for the evening's matches or a film. Starlink internet throughout.",
  },
];

const FORMATS = [
  {
    title: "A padel weekend with friends",
    text: "Eight to sixteen players, three or four nights. Morning and evening sessions on your own court, the pool and the sauna in between, dinners cooked by a private chef if you want one.",
  },
  {
    title: "A training week with a coach",
    text: "A coach from Athens is booked through the concierge and can work with the group daily. The gym pavilion and the shaded terraces cover strength and mobility; the sauna covers recovery.",
  },
  {
    title: "A company offsite with an internal tournament",
    text: "Sessions in the living rooms, a round-robin on the court in the late afternoon, a final under the floodlights. Rooming plans, working spaces and a sample agenda are on the corporate retreats page.",
  },
];

// Source: padel-villa.com, listing for Greece, October 2026 (ten villas).
// Grouped by region; capacities shown there vary and are not reproduced.
const GREECE = [
  { region: "Crete (Agia Galini, Chania)", count: "2", access: "Domestic flight or ferry from Athens" },
  { region: "Corfu, Zakynthos, Kos, Mykonos", count: "5", access: "Domestic flight or ferry" },
  { region: "Halkidiki (Sani)", count: "1", access: "Flight to Thessaloniki, then by car" },
  { region: "Attica: Anavissos", count: "1", access: "By car from Athens airport" },
  { region: "Attica: Porto Rafti (Villa Lithos)", count: "1", access: "16 km, about 20 minutes by car from Athens airport" },
];

const FAQ = [
  {
    q: "Is the padel court private?",
    a: "Yes. The court is on the estate and is used only by the group renting the villa. It is full-size, glass-walled and floodlit, so play continues after dark. Rackets and balls are provided.",
  },
  {
    q: "Can we book a padel coach?",
    a: "Yes. The concierge team books coaches from Athens for single sessions or for the whole stay, and quotes them separately. Tell us the level of the group and how many sessions you want.",
  },
  {
    q: "How many players can stay?",
    a: "Up to 22 guests across nine bedrooms and 8.5 bathrooms. If every player needs a private room, plan for 8 to 9; most padel groups run between 10 and 16. The room-by-room list is on the group-stay planning page.",
  },
  {
    q: "What is there besides padel?",
    a: "A heated infinity pool with a jacuzzi, an outdoor barrel sauna with a red-light therapy panel, a private gym pavilion, shaded terraces for mobility work, two living rooms and an attic floor with a large screen. Private chefs, trainers and physiotherapists are arranged by the concierge.",
  },
  {
    q: "Can we play in winter?",
    a: `Yes. Last winter (${WINTER_STATS.period}) Porto Rafti had ${WINTER_STATS.portoRafti.sunnyDays} days out of ${WINTER_STATS.days} with six hours of sunshine or more and an average daytime high of ${WINTER_STATS.portoRafti.avgHigh}°C. The court is floodlit, and the sauna, the gym and the fireplace lounge carry the rest of the day.`,
  },
  {
    q: "How do we get there and how do we check dates?",
    a: "Athens International Airport is 16 km away, about 20 minutes by car, with no ferry and no domestic flight. Send your dates and group size on WhatsApp or through the inquiry form; rates are quoted on request and are not published on the site.",
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
      about: { "@id": "https://www.villalithos.com/#villa" },
      primaryImageOfPage: { "@type": "ImageObject", url: `https://www.villalithos.com${img("Sports & Activities (6).jpg")}` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Villa Lithos", item: "https://www.villalithos.com/" },
          { "@type": "ListItem", position: 2, name: "Padel villa near Athens", item: URL },
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
  note: { fontSize: "0.9rem", color: "#777", margin: "10px 0 0" } as React.CSSProperties,
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

      <section data-lead-block="padel-hero">
        <p style={s.kicker}>Padel villa · Porto Rafti, Greece</p>
        <h1 style={s.h1}>{H1}</h1>
        <p style={s.lead}>
          Villa Lithos is a privately owned estate rented to one group at a time, with its own floodlit padel court, a heated
          infinity pool, an outdoor sauna and a private gym. Land in Athens, be on court about twenty minutes later, and play
          as late as you like.
        </p>
        <div style={s.ctaRow}>
          <a href={WHATSAPP} target="_blank" rel="noopener" style={s.primary}>Ask about dates on WhatsApp</a>
          <Link href="/#inquiry" style={s.secondary}>Send an inquiry</Link>
        </div>
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img("Sports & Activities (6).jpg")} alt="Floodlit glass-walled padel court at Villa Lithos Porto Rafti in the evening" style={s.hero} fetchPriority="high" />

      <ul style={s.facts}>
        {FACTS.map((f) => (
          <li key={f.k} style={s.fact}>
            <span style={s.factK}>{f.k}</span>
            <span style={s.factV}>{f.v}</span>
          </li>
        ))}
      </ul>

      <h2 id="court" style={s.h2}>Padel, Then Recovery, Without Leaving the Estate</h2>
      <p style={s.sub}>
        The court is the reason to come; the rest of the estate is what makes a week of it possible. Everything below is for your
        group only. The full equipment list is in our{" "}
        <Link href="/articles/wellness-retreats-greece-mainland#fitness-facilities" style={s.link}>guide to fitness and wellness retreats in Greece</Link>.
      </p>
      <div style={s.grid}>
        {RECOVERY.map((sp) => (
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

      <h2 id="formats" style={s.h2}>Three Ways Groups Use It</h2>
      <div style={{ ...s.grid, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
        {FORMATS.map((f) => (
          <div key={f.title} style={s.format}>
            <h3 style={s.h3}>{f.title}</h3>
            <p style={s.cardText}>{f.text}</p>
          </div>
        ))}
      </div>
      <p style={{ ...s.sub, marginTop: 18 }}>
        Who sleeps where, room by room, is on the <Link href="/plan-a-group-stay" style={s.link}>group-stay planning page</Link>. For
        team offsites see the <Link href="/corporate-retreats" style={s.link}>corporate retreat venue</Link> page; for yoga, fitness and
        wellness groups, the <Link href="/wellness-retreat-villa-greece" style={s.link}>wellness retreat villa</Link> page.
      </p>

      <h2 id="greece" style={s.h2}>Padel Villas in Greece: Where They Are</h2>
      <p style={s.sub}>
        Private villas with their own padel court are rare in Greece, and most of them are on islands. For a group flying into
        Athens, the difference is a car ride against a second flight or a ferry.
      </p>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Region</th><th style={s.th}>Padel villas listed</th><th style={s.th}>Getting there from Athens airport</th></tr>
          </thead>
          <tbody>
            {GREECE.map((g) => (
              <tr key={g.region}>
                <td style={s.td}><strong>{g.region}</strong></td>
                <td style={s.td}>{g.count}</td>
                <td style={s.td}>{g.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={s.note}>
        Count and locations from the padel-villa.com listing for Greece, October 2026. Villa Lithos is the only villa on that list
        for up to 22 guests.
      </p>

      <h2 id="how" style={s.h2}>How Booking Works</h2>
      <ol style={s.steps}>
        <li style={s.li}><strong>Send dates and group size</strong> on WhatsApp or through the inquiry form. Weekday blocks from October to May are the easiest to place.</li>
        <li style={s.li}><strong>Get a quote</strong> for the house and for anything you want arranged: coach, chef, physiotherapist, transfers.</li>
        <li style={s.li}><strong>Plan the week</strong> with the concierge: court times, coaching sessions, meals.</li>
        <li style={s.li}><strong>Land in Athens</strong> and be on the estate about 20 minutes later.</li>
      </ol>

      <h2 id="faq" style={s.h2}>Questions Padel Groups Ask</h2>
      {FAQ.map((f) => (
        <details key={f.q} style={s.faqItem}>
          <summary style={s.faqQ}>{f.q}</summary>
          <p style={s.faqA}>{f.a}</p>
        </details>
      ))}

      <div style={s.ctaBox} data-lead-block="padel-venue">
        <h2 style={s.ctaHeading}>Check Dates for Your Padel Group</h2>
        <p style={s.ctaText}>
          Tell us your dates, how many players, and whether you want a coach. Rates are quoted on request.
        </p>
        <div style={{ ...s.ctaRow, justifyContent: "center", margin: 0 }}>
          <a href={WHATSAPP} target="_blank" rel="noopener" style={s.primary}>WhatsApp the villa team</a>
          <Link href="/#inquiry" style={s.secondary}>Inquiry form</Link>
        </div>
      </div>

      <p style={s.updated}>
        Last updated 14 October 2026. Winter sunshine and temperature figures: Open-Meteo historical data (ERA5), {WINTER_STATS.period}.
      </p>
    </div>
  );
}
