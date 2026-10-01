import { Metadata } from "next";
import Link from "next/link";

const TITLE = "Porto Rafti, Greece: 2026 Travel Guide | Villa Lithos";
const H1 = "Porto Rafti, Greece: A Practical Travel Guide for 2026";
const DESC = "Porto Rafti travel guide: where it is in East Attica, how to get there from Athens airport, the best beaches, day trips, where to eat and where to stay.";
const URL = "https://www.villalithosgreece.com/porto-rafti";
const PUBLISHED = "2026-10-01";
const MODIFIED = "2026-10-01";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "porto rafti",
    "porto rafti greece",
    "porto rafti attiki greece",
    "greece porto rafti",
    "porto rafti travel guide",
    "porto rafti beaches",
    "athens airport to porto rafti",
    "things to do in porto rafti",
    "where to stay in porto rafti",
    "porto rafti east attica",
  ],
  openGraph: { type: "article", title: TITLE, description: DESC, url: URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

const FAQ = [
  {
    q: "Where is Porto Rafti?",
    a: "Porto Rafti is a coastal town on the eastern shore of Attica, on the Greek mainland. It belongs to the municipality of Markopoulo Mesogaias in the East Attica regional unit, about 16 km from Athens International Airport and 37 km from central Athens.",
  },
  {
    q: "How do you get from Athens airport to Porto Rafti?",
    a: "By car or transfer, 16 km and about 20 minutes: the Attiki Odos motorway to the Markopoulo junction (Junction 20), then the Markopoulou-Porto Rafti road down to the bay. No ferry or connecting flight is involved.",
  },
  {
    q: "What is the best beach in Porto Rafti for young children?",
    a: "Avlaki, also known as Erotospilia. It is sandy, slopes gently into the water and is sheltered from the wind, so waves are unusual even on windier days. Weekdays and mornings before 11:00 are the quietest times.",
  },
  {
    q: "Can you reach the Greek islands from Porto Rafti?",
    a: "Yes. Rafina port, about 20 minutes north, has ferries to the Cyclades including Andros, Tinos and Mykonos. Lavrio port, about 40 minutes south, serves Kea, Kythnos and the eastern Cyclades. Schedules change by season.",
  },
  {
    q: "Is Porto Rafti worth visiting instead of an island?",
    a: "For families and groups it often is: the bay is sheltered from the strong summer meltemi wind, the airport is 20 minutes away, and the Acropolis, Cape Sounion, Marathon and Brauron are all within a day trip. It is a working Greek coastal town rather than a resort, which keeps food prices and crowds lower than on the best-known islands.",
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
      about: {
        "@type": "City",
        name: "Porto Rafti",
        sameAs: ["https://www.wikidata.org/wiki/Q2105234", "https://en.wikipedia.org/wiki/Porto_Rafti"],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    }
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
  table: { width: "100%", borderCollapse: "collapse" as const, fontSize: "0.97rem" } as React.CSSProperties,
  th: { textAlign: "left" as const, padding: "10px 12px", background: "#f0ede4", borderBottom: "2px solid #d8d3c4" } as React.CSSProperties,
  td: { padding: "10px 12px", borderBottom: "1px solid #e8e3d3", verticalAlign: "top" as const } as React.CSSProperties,
  source: { fontSize: "0.86rem", color: "#666", fontStyle: "italic" } as React.CSSProperties,
  link: { color: "#7a8c6e" } as React.CSSProperties,
  more: { color: "#7a8c6e", fontWeight: 600, textDecoration: "none" } as React.CSSProperties,
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
      <span style={s.meta}>Last updated: 1 October 2026 · 8 minute read · Villa Lithos Porto Rafti</span>

      <p style={s.intro}>
        <strong>Porto Rafti</strong> is a coastal town on the east coast of Attica, 16 km and about 20 minutes from Athens International Airport. Its bay is naturally sheltered, the water is calm and shallow near the shore, and the Acropolis, Cape Sounion, Marathon and the Cycladic ferries are all within a short drive. This guide brings together everything a first-time visitor needs: where it is, how to get there, the beaches, day trips, food, the best time to go and where to stay.
      </p>

      <nav style={s.toc} aria-label="Contents">
        <strong>In this guide</strong>
        <ul style={{ ...s.ul, marginBottom: 0, marginTop: 8 }}>
          <li><a href="#where" style={s.link}>Where is Porto Rafti?</a></li>
          <li><a href="#getting-there" style={s.link}>Getting there from Athens airport</a></li>
          <li><a href="#beaches" style={s.link}>The beaches</a></li>
          <li><a href="#day-trips" style={s.link}>Day trips</a></li>
          <li><a href="#food" style={s.link}>Where and what to eat</a></li>
          <li><a href="#when" style={s.link}>When to go</a></li>
          <li><a href="#stay" style={s.link}>Where to stay</a></li>
          <li><a href="#faq" style={s.link}>Questions visitors ask</a></li>
        </ul>
      </nav>

      <h2 id="where" style={s.h2}>Where Is Porto Rafti?</h2>
      <p style={s.p}>
        Porto Rafti sits on the Aegean shore of Attica, within the municipality of Markopoulo Mesogaias in the <a href="https://en.wikipedia.org/wiki/East_Attica" target="_blank" rel="nofollow noopener" style={s.link}>East Attica</a> regional unit. The town takes its name from a marble statue on the islet at the entrance to the bay, traditionally believed to depict a tailor (<em>raftis</em> in Greek), although scholars identify it as a Roman-era figure of an enthroned woman, according to the <a href="https://en.wikipedia.org/wiki/Porto_Rafti" target="_blank" rel="nofollow noopener" style={s.link}>Wikipedia entry on Porto Rafti</a>.
      </p>
      <p style={s.p}>
        It is a working coastal town, with a fishing harbour, a waterfront of tavernas and small farms in the hills behind it, rather than a purpose-built resort. Its visitors are largely Greek families, joined by a growing number of international travellers who want beach time without an island ferry.
      </p>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Porto Rafti at a glance</th><th style={s.th}></th></tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Region</td><td style={s.td}>East Attica, mainland Greece</td></tr>
            <tr><td style={s.td}>Athens International Airport</td><td style={s.td}>16 km, about 20 minutes by car</td></tr>
            <tr><td style={s.td}>Central Athens and the Acropolis</td><td style={s.td}>37 km, about 40 minutes</td></tr>
            <tr><td style={s.td}>Rafina port (Cyclades ferries)</td><td style={s.td}>15 km, about 20 minutes</td></tr>
            <tr><td style={s.td}>Lavrio port (Kea, Kythnos)</td><td style={s.td}>About 35 km, about 40 minutes</td></tr>
            <tr><td style={s.td}>Sea temperature</td><td style={s.td}>Peaks around 26 °C in August, above 22 °C from June to September (HNMS)</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="getting-there" style={s.h2}>Getting to Porto Rafti From Athens Airport</h2>
      <p style={s.p}>
        The route from Athens International Airport (Eleftherios Venizelos) is the Attiki Odos motorway (A6) to the Markopoulo junction, Junction 20, then the Markopoulou-Porto Rafti road through the town of Markopoulo and down to the bay. It is about 16 km in total and usually takes 20 minutes. There is no ferry, no domestic flight and no need to cross Athens, so a family landing in the morning can be on the beach before lunch.
      </p>
      <p style={s.p}>
        Most visitors rent a car or book a private transfer. A car is worth having for the day trips below; the beaches nearest the town are a few minutes&apos; drive apart.
      </p>
      <p style={s.p}>
        <Link href="/villas-near-athens-airport" style={s.more}>Full drive-time comparison from Athens airport &rarr;</Link>
      </p>

      <h2 id="beaches" style={s.h2}>The Beaches of Porto Rafti</h2>
      <p style={s.p}>
        The bay of Porto Rafti opens to the southeast and the surrounding headlands break up most of the northern meltemi wind that hits Mykonos and the open Cyclades in July and August. The result is calmer water near the shore than on the islands. These are the beaches closest to the town:
      </p>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Beach</th><th style={s.th}>Type</th><th style={s.th}>Wind</th><th style={s.th}>Best for</th></tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Avlaki / Erotospilia</td><td style={s.td}>Sand, gentle slope</td><td style={s.td}>Sheltered</td><td style={s.td}>Families with young children</td></tr>
            <tr><td style={s.td}>Porto Rafti main beach</td><td style={s.td}>Mixed sand and pebble</td><td style={s.td}>Sheltered</td><td style={s.td}>Walking, tavernas nearby</td></tr>
            <tr><td style={s.td}>Kalimera cove</td><td style={s.td}>Pebble cove</td><td style={s.td}>Sheltered</td><td style={s.td}>Small groups, snorkelling</td></tr>
            <tr><td style={s.td}>Vravrona</td><td style={s.td}>Sand, undeveloped</td><td style={s.td}>Sheltered</td><td style={s.td}>Quiet days</td></tr>
            <tr><td style={s.td}>Mavro Lithari</td><td style={s.td}>Pebble, deep water</td><td style={s.td}>Moderate</td><td style={s.td}>Snorkelling, strong swimmers</td></tr>
            <tr><td style={s.td}>Schinias (30 min)</td><td style={s.td}>Long sandy beach, pine forest</td><td style={s.td}>Sometimes windy</td><td style={s.td}>Long walks, kitesurfing</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        Avlaki is the default choice for families: sandy, shallow and sheltered, with seasonal tavernas and sunbed rental. It is busiest on summer weekend afternoons, when Athenians drive out for the day, and almost empty on weekday mornings.
      </p>
      <p style={s.p}>
        <Link href="/articles/best-beaches-porto-rafti" style={s.more}>All eleven beaches, with drive times and Blue Flag notes &rarr;</Link>
      </p>

      <h2 id="day-trips" style={s.h2}>Day Trips From Porto Rafti</h2>
      <p style={s.p}>
        Porto Rafti is unusually well placed for day trips. Three of the great sites of ancient Greece, and the ferries to the Cyclades, are within an hour.
      </p>
      <div style={s.tableWrap}>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Destination</th><th style={s.th}>Drive time</th><th style={s.th}>Best for</th></tr>
          </thead>
          <tbody>
            <tr><td style={s.td}>Brauron (Vravrona), Sanctuary of Artemis</td><td style={s.td}>About 10 min</td><td style={s.td}>Half day, quiet site, good with children</td></tr>
            <tr><td style={s.td}>Rafina port, ferries to Andros, Tinos, Mykonos</td><td style={s.td}>About 20 min</td><td style={s.td}>Island day trip</td></tr>
            <tr><td style={s.td}>Marathon battlefield and museum</td><td style={s.td}>About 35 min</td><td style={s.td}>History, combined with Schinias beach</td></tr>
            <tr><td style={s.td}>Athens, Acropolis and Plaka</td><td style={s.td}>About 40 min</td><td style={s.td}>Full day, all ages</td></tr>
            <tr><td style={s.td}>Cape Sounion, Temple of Poseidon</td><td style={s.td}>About 50 min</td><td style={s.td}>Sunset and a seafood dinner in Lavrio</td></tr>
          </tbody>
        </table>
      </div>
      <p style={s.p}>
        For the Acropolis, leave early and book a timed entry slot in advance; the crowds between 11:00 and 16:00 in July and August are the main thing to avoid.
      </p>
      <p style={s.p}>
        <Link href="/articles/day-trips-from-porto-rafti" style={s.more}>Day trips in detail, with tickets and timings &rarr;</Link>
        {" · "}
        <Link href="/articles/things-to-do-near-athens-with-kids" style={s.more}>Things to do near Athens with kids &rarr;</Link>
      </p>

      <h2 id="food" style={s.h2}>Where and What to Eat</h2>
      <p style={s.p}>
        The waterfront has around a dozen tavernas, mostly fish-focused: you choose the fish on ice, priced by the kilo on the day&apos;s catch, and agree how it is cooked. The village tavernas inland, behind the harbour and in Markopoulo, Spata and Koropi, are where to find slow-cooked Attic dishes, at noticeably lower prices than the harbour.
      </p>
      <p style={s.p}>
        The Mesogeia plain just inland is one of the oldest wine regions in Greece, built on the white Savatiano grape. For self-catering, the Markopoulo farmers&apos; market runs on Wednesday and Saturday mornings. Greek meals run late: lunch from about 13:30, dinner from 21:00.
      </p>
      <p style={s.p}>
        <Link href="/articles/eating-in-porto-rafti" style={s.more}>Eating like a local in Porto Rafti &rarr;</Link>
      </p>

      <h2 id="when" style={s.h2}>When to Go</h2>
      <ul style={s.ul}>
        <li style={s.li}><strong>June to September</strong> for swimming: the sea stays above 22 °C and peaks around 26 °C in August.</li>
        <li style={s.li}><strong>Late June to August weekends</strong> are the busiest on the beaches, with day-trippers from Athens. Weekdays are much quieter.</li>
        <li style={s.li}><strong>May and October</strong> are warm and calm, but beaches have no lifeguards in the shoulder season.</li>
        <li style={s.li}><strong>Spring and autumn</strong> are the best seasons for Athens and the archaeological sites, before and after the summer heat and crowds.</li>
      </ul>

      <h2 id="stay" style={s.h2}>Where to Stay in Porto Rafti</h2>
      <p style={s.p}>
        Most of what the booking platforms list for Porto Rafti is private holiday homes and villas rather than hotels, which suits families and groups who want a kitchen, outdoor space and room to spread out. For a large group, the practical questions are capacity, how far the house is from the beach and the airport, and what is on site when the group is not at the beach.
      </p>
      <p style={s.p}>
        <strong>Villa Lithos Porto Rafti</strong> is a 9-bedroom private estate for up to 22 guests, on a 5,000 m² walled plot above the bay, 16 km from Athens International Airport and 1.5 km from Avlaki beach. It has a heated infinity pool, jacuzzi, outdoor sauna, private padel court, gym and an elevator across its four floors, and is used by multi-generational families, groups of friends and company retreats.
      </p>
      <ul style={s.ul}>
        <li style={s.li}><Link href="/luxury-villa-porto-rafti" style={s.link}>Luxury villa rental in Porto Rafti: the estate in detail</Link></li>
        <li style={s.li}><Link href="/large-family-villa-greece" style={s.link}>Large family villas in Greece for groups of 20</Link></li>
        <li style={s.li}><Link href="/corporate-retreats" style={s.link}>Corporate retreats near Athens</Link></li>
      </ul>

      <h2 id="faq" style={s.h2}>Questions Visitors Ask About Porto Rafti</h2>
      {FAQ.map((f) => (
        <div key={f.q}>
          <h3 style={s.h3}>{f.q}</h3>
          <p style={s.p}>{f.a}</p>
        </div>
      ))}

      <h2 style={s.h2}>Related Reading</h2>
      <ul style={s.ul}>
        <li style={s.li}><Link href="/articles/porto-rafti-alternative-greek-islands" style={s.link}>Porto Rafti: The Perfect Alternative to the Greek Islands</Link></li>
        <li style={s.li}><Link href="/porto-rafti-vs-mykonos-vs-santorini" style={s.link}>Porto Rafti vs Mykonos vs Santorini, A 2026 Comparison</Link></li>
        <li style={s.li}><Link href="/articles/porto-rafti-family-holiday-greece" style={s.link}>Porto Rafti Family Holiday</Link></li>
        <li style={s.li}><Link href="/articles/multi-generational-trip-greece" style={s.link}>Planning a Multi-Generational Family Trip to Greece</Link></li>
      </ul>

      <div style={s.ctaBox}>
        <h2 style={s.ctaHeading}>Stay at Villa Lithos Porto Rafti</h2>
        <p style={s.ctaText}>A private 9-bedroom estate above the bay, 20 minutes from Athens International Airport.</p>
        <Link href="/#inquiry" style={s.cta}>Check Availability</Link>
      </div>

      <p style={s.updated}>
        Last updated: 1 October 2026. Sources: <a href="https://en.wikipedia.org/wiki/Porto_Rafti" target="_blank" rel="nofollow noopener">Wikipedia, Porto Rafti</a>, <a href="https://en.wikipedia.org/wiki/East_Attica" target="_blank" rel="nofollow noopener">Wikipedia, East Attica</a>, <a href="http://www.hnms.gr/" target="_blank" rel="nofollow noopener">Hellenic National Meteorological Service</a>, <a href="https://www.visitgreece.gr/" target="_blank" rel="nofollow noopener">Visit Greece</a>. Drive times measured from Porto Rafti in light traffic; ferry schedules change by season and should be checked with the operators.
      </p>

      <Link href="/" style={s.back}>&larr; Back to Villa Lithos home</Link>
    </article>
  );
}
