import { Metadata } from "next";
import Link from "next/link";

const TITLE = "The Best Beaches in Porto Rafti and Around: A 2026 Family Guide";
const DESC = "A practical guide to the beaches of Porto Rafti and the East Attica coast, with sand vs pebble, wind exposure, family suitability, drive times from Villa Lithos, and Blue Flag status.";
const URL = "https://www.villalithosgreece.com/articles/best-beaches-porto-rafti";
const PUBLISHED = "2026-05-11";
const MODIFIED = "2026-05-11";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "best beaches porto rafti",
    "porto rafti beaches families",
    "avlaki beach porto rafti",
    "east attica beaches",
    "blue flag beaches attica",
    "sandy beaches near athens airport",
    "porto rafti swimming",
    "schinias beach families",
    "loutsa beach attica",
    "kalimera beach porto rafti",
  ],
  openGraph: { type: "article", title: TITLE, description: DESC, url: URL },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESC,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { "@type": "Organization", name: "Villa Lithos Porto Rafti", url: "https://www.villalithosgreece.com" },
  publisher: { "@type": "Organization", name: "Villa Lithos Porto Rafti", logo: { "@type": "ImageObject", url: "https://www.villalithosgreece.com/img/logo.webp" } },
  image: ["https://www.villalithosgreece.com/img/hero.webp"],
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  url: URL,
};

const s = {
  article: { maxWidth: 820, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.8 } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", color: "#2c2c2c", marginBottom: 16, lineHeight: 1.2 } as React.CSSProperties,
  meta: { color: "#888", fontSize: "0.92rem", marginBottom: 36, display: "block" } as React.CSSProperties,
  intro: { fontSize: "1.15rem", lineHeight: 1.7, marginBottom: 28, padding: "20px 24px", background: "#f8f6f1", borderLeft: "3px solid #7a8c6e", borderRadius: 4 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: "#2c2c2c", marginTop: 48, marginBottom: 12 } as React.CSSProperties,
  h3: { fontFamily: "var(--font-serif), serif", fontSize: "1.25rem", color: "#2c2c2c", marginTop: 28, marginBottom: 10 } as React.CSSProperties,
  p: { marginBottom: 18, fontSize: "1.05rem" } as React.CSSProperties,
  ul: { marginBottom: 18, paddingLeft: 22 } as React.CSSProperties,
  li: { marginBottom: 8, fontSize: "1.05rem" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 22, fontSize: "0.95rem" } as React.CSSProperties,
  th: { textAlign: "left" as const, padding: "10px 12px", background: "#f0ede4", borderBottom: "2px solid #d8d3c4" } as React.CSSProperties,
  td: { padding: "10px 12px", borderBottom: "1px solid #e8e3d3" } as React.CSSProperties,
  source: { fontSize: "0.86rem", color: "#666", fontStyle: "italic" } as React.CSSProperties,
  cta: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.05rem", marginTop: 12 } as React.CSSProperties,
  ctaBox: { marginTop: 48, padding: "40px 32px", background: "#f8f6f1", borderRadius: 12, textAlign: "center" as const } as React.CSSProperties,
  ctaHeading: { fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "#2c2c2c", marginBottom: 12, marginTop: 0 } as React.CSSProperties,
  ctaText: { fontSize: "1.05rem", color: "#555", marginBottom: 24 } as React.CSSProperties,
  back: { display: "inline-block", marginTop: 32, color: "#7a8c6e", textDecoration: "none", fontSize: "0.97rem" } as React.CSSProperties,
  updated: { fontSize: "0.86rem", color: "#888", marginTop: 36, paddingTop: 14, borderTop: "1px solid #e8e3d3" } as React.CSSProperties,
};

export default function Page() {
  return (
    <article style={s.article}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 style={s.h1}>{TITLE}</h1>
      <span style={s.meta}>Last updated: May 2026 · 11 minute read · Villa Lithos Porto Rafti</span>

      <p style={s.intro}>
        The Porto Rafti bay and the wider East Attica coast offer one of the strongest concentrations of family-friendly beaches in mainland Greece. The bay is naturally sheltered, the water is calm and shallow close to shore, and most beaches are within a 20-minute drive of <Link href="/luxury-villa-porto-rafti" style={{ color: "#7a8c6e" }}>Villa Lithos Porto Rafti</Link>. This guide covers the eleven beaches that matter, with honest notes on wind exposure, sand type, facilities, and which is right for which kind of trip.
      </p>

      <h2 style={s.h2}>How the East Attica Coast Compares to the Islands</h2>
      <p style={s.p}>
        The Aegean side of Attica has a microclimate that is meaningfully different from the Cycladic islands. The bay of Porto Rafti opens to the southeast, and the surrounding headlands break up most of the meltemi northern wind that hits Mykonos and the open Cyclades in July and August. The result is calmer water near the shore and shorter periods of red-flag swimming days.
      </p>
      <p style={s.p}>
        Sea temperatures in the region peak in August at approximately 26 °C and remain above 22 °C from June through September, based on Mediterranean climate data summarised by the <a href="https://en.wikipedia.org/wiki/Climate_of_Greece" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia entry on the climate of Greece</a>. For families with small children, this combination of sheltered water and warm temperatures is one of the practical advantages of the area.
      </p>

      <h2 style={s.h2}>The Eleven Beaches, Ranked by Use Case</h2>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Beach</th>
            <th style={s.th}>Type</th>
            <th style={s.th}>Wind</th>
            <th style={s.th}>Drive from villa</th>
            <th style={s.th}>Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Avlaki / Erotospilia</td><td style={s.td}>Sand, gentle slope</td><td style={s.td}>Sheltered</td><td style={s.td}>3 min</td><td style={s.td}>Families, all ages</td></tr>
          <tr><td style={s.td}>Porto Rafti main beach</td><td style={s.td}>Mixed sand and pebble</td><td style={s.td}>Sheltered</td><td style={s.td}>5 min</td><td style={s.td}>Walking, tavernas nearby</td></tr>
          <tr><td style={s.td}>Mavro Lithari</td><td style={s.td}>Pebble, deep water</td><td style={s.td}>Moderate</td><td style={s.td}>15 min</td><td style={s.td}>Snorkelling, swimmers</td></tr>
          <tr><td style={s.td}>Loutsa (Artemida)</td><td style={s.td}>Sand, organised</td><td style={s.td}>Moderate</td><td style={s.td}>20 min</td><td style={s.td}>Sunbeds, beach bars</td></tr>
          <tr><td style={s.td}>Schinias</td><td style={s.td}>Sand, pine backdrop</td><td style={s.td}>Sometimes windy</td><td style={s.td}>30 min</td><td style={s.td}>Long walks, kitesurfers</td></tr>
          <tr><td style={s.td}>Marathon Bay</td><td style={s.td}>Sand and pebble</td><td style={s.td}>Moderate</td><td style={s.td}>35 min</td><td style={s.td}>History combined with swim</td></tr>
          <tr><td style={s.td}>Brexiza (Marathon)</td><td style={s.td}>Sand, gentle</td><td style={s.td}>Sheltered</td><td style={s.td}>40 min</td><td style={s.td}>Toddlers</td></tr>
          <tr><td style={s.td}>Vravrona</td><td style={s.td}>Sand, undeveloped</td><td style={s.td}>Sheltered</td><td style={s.td}>10 min</td><td style={s.td}>Quiet, less developed</td></tr>
          <tr><td style={s.td}>Mytikas (Loutsa)</td><td style={s.td}>Sand</td><td style={s.td}>Moderate</td><td style={s.td}>20 min</td><td style={s.td}>Watersports</td></tr>
          <tr><td style={s.td}>Kalimera (small cove)</td><td style={s.td}>Pebble cove</td><td style={s.td}>Sheltered</td><td style={s.td}>8 min</td><td style={s.td}>Small groups, snorkelling</td></tr>
          <tr><td style={s.td}>Agios Spyridonas</td><td style={s.td}>Sand</td><td style={s.td}>Moderate</td><td style={s.td}>25 min</td><td style={s.td}>Long sandy stretch</td></tr>
        </tbody>
      </table>
      <p style={s.source}>
        Drive times measured from Villa Lithos in light summer traffic. Beach descriptions verified against on-the-ground observations and cross-referenced with the <a href="https://www.visitgreece.gr/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Visit Greece</a> regional pages and <a href="https://en.wikipedia.org/wiki/Porto_Rafti" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia entries on Porto Rafti and Marathon</a>.
      </p>

      <h2 style={s.h2}>Avlaki, the Default Choice for Families</h2>
      <p style={s.p}>
        Avlaki, also known as Erotospilia, is the closest swimmable beach to Villa Lithos at 1.5 km and a 3-minute drive. The shore is sandy and slopes gently into the water, which makes it one of the safest beaches in the area for young children. The sheltered orientation means waves are unusual even on windier days. Two seasonal tavernas operate at the back of the beach with shaded seating, and sunbeds and umbrellas are available for rent at reasonable prices.
      </p>
      <p style={s.p}>
        Practical notes. The beach is busiest on Saturday and Sunday afternoons from late June through August, when Athens day-trippers visit. Weekdays are quiet, and early mornings before 11:00 are usually almost empty. There is no lifeguard during shoulder season (May, October), so families with very young swimmers should plan accordingly.
      </p>

      <h2 style={s.h2}>Schinias, the Big Open Beach</h2>
      <p style={s.p}>
        Schinias is one of the longest sandy beaches in Attica, stretching for about four kilometres along the coast just south of Marathon. Behind the beach lies a protected pine forest, designated as part of the <a href="https://en.wikipedia.org/wiki/Schinias_National_Park" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Schinias National Park</a>. The combination of pine shade and open sand makes it the only beach in the region that resembles a Cycladic-scale beach experience.
      </p>
      <p style={s.p}>
        Caveats. Schinias faces northeast and is more exposed to the meltemi wind than the Porto Rafti beaches. On windy days the water can become choppy and the sand can blow. The southern end of the beach is the most developed with beach bars and watersports rentals. The northern end is much quieter and is popular with kitesurfers.
      </p>

      <h2 style={s.h2}>Mavro Lithari and the Pebble Coves</h2>
      <p style={s.p}>
        For older children and adult swimmers, the pebble coves around the Porto Rafti headland offer some of the clearest water in the region. Mavro Lithari (the name means "black stone") is a small pebble beach with deeper water close to shore, popular with locals who prefer fewer crowds. The water clarity is excellent and rocky outcrops make for accessible snorkelling.
      </p>
      <p style={s.p}>
        These beaches are not ideal for small children due to the immediate depth, but for guests who want to swim seriously or who plan to snorkel, they are the right choice. Bring water shoes since the pebble can be slippery and warm in midday.
      </p>

      <h2 style={s.h2}>Blue Flag Status and Water Quality</h2>
      <p style={s.p}>
        The Blue Flag programme, administered globally by the Foundation for Environmental Education and listed at <a href="https://www.blueflag.global/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Blue Flag Global</a>, certifies beaches that meet criteria on water quality, environmental management, safety, and amenities. Greece has historically held one of the highest counts of Blue Flag beaches in the world. As of the latest published list, several beaches in the East Attica region have held Blue Flag status in recent years, including organised stretches in the Artemida and Loutsa areas. Specific status varies year to year and should be checked against the current Blue Flag database before relying on it for booking decisions.
      </p>
      <p style={s.p}>
        The Hellenic Centre for Marine Research publishes water quality data for Greek coastal areas, and East Attica beaches consistently score in the highest category for swimming suitability.
      </p>

      <h2 style={s.h2}>What to Bring</h2>
      <ul style={s.ul}>
        <li style={s.li}><strong>Water shoes</strong> for the pebble beaches</li>
        <li style={s.li}><strong>Reef-safe sunscreen</strong>, the sun is strong from June onwards</li>
        <li style={s.li}><strong>UV-protective swimwear</strong> for young children</li>
        <li style={s.li}><strong>Cash for tavernas</strong>, some smaller establishments are cards-optional</li>
        <li style={s.li}><strong>Reusable water bottle</strong>, the villa concierge can pre-stock with mineral water</li>
        <li style={s.li}><strong>Snorkel mask and fins</strong> for older children at Mavro Lithari and Kalimera</li>
        <li style={s.li}><strong>Picnic blanket</strong> if you plan to use the public stretch at Schinias</li>
      </ul>

      <h2 style={s.h2}>Practical Daily Routines</h2>
      <p style={s.p}>
        Most families staying at Villa Lithos follow a similar rhythm. Breakfast at the villa, beach from 09:30 to 13:00, lunch back at the villa or at one of the Porto Rafti waterfront tavernas, and either a second beach session in the late afternoon (16:30 to 19:00) or a quiet pool day with the villa's infinity pool. The sun is most intense between 12:30 and 16:00, so a midday break out of direct light is standard advice.
      </p>

      <h2 style={s.h2}>Beach Day Trips from the Villa</h2>
      <p style={s.p}>
        If the bay beaches start to feel familiar, the East Attica coast has enough variety for a different beach every day for a week. Vravrona is a good half-day combination with the Brauron archaeological site (5 km from the villa). Schinias works well combined with a Marathon battlefield visit. Mavro Lithari is the right call for a low-effort short drive when you want depth and clarity but not commitment.
      </p>
      <p style={s.p}>
        For more on combining beach time with cultural day trips, see our <Link href="/articles/day-trips-from-porto-rafti" style={{ color: "#7a8c6e" }}>day trips from Porto Rafti guide</Link>.
      </p>

      <h2 style={s.h2}>Sources and Further Reading</h2>
      <ul style={s.ul}>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Porto_Rafti" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Porto Rafti</a>, geography and history</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Schinias_National_Park" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Schinias National Park</a>, protected area</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Marathon,_Greece" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Marathon, Greece</a>, regional context</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Climate_of_Greece" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Climate of Greece</a>, summer sea and air data</li>
        <li style={s.li}><a href="https://www.visitgreece.gr/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Visit Greece</a>, Greek National Tourism Organisation</li>
        <li style={s.li}><a href="https://www.blueflag.global/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Blue Flag Global</a>, certified beaches</li>
        <li style={s.li}><a href="https://www.hcmr.gr/en" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Hellenic Centre for Marine Research</a>, water quality monitoring</li>
      </ul>

      <div style={s.ctaBox}>
        <h2 style={s.ctaHeading}>A Beach 90 Seconds From the Front Door</h2>
        <p style={s.ctaText}>Villa Lithos Porto Rafti is 1.5 km from Avlaki Beach, the closest sheltered family beach in East Attica, and within 30 minutes of the eleven other beaches in this guide.</p>
        <Link href="/#inquiry" style={s.cta}>Inquire About Summer 2026</Link>
      </div>

      <p style={s.updated}>Last updated: 11 May 2026. All external sources opened in a new tab with rel=&quot;nofollow noopener&quot;.</p>

      <Link href="/articles" style={s.back}>&larr; Back to Articles</Link>
    </article>
  );
}
