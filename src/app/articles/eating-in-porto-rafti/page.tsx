import { Metadata } from "next";
import Link from "next/link";

const TITLE = "Eating Like a Local in Porto Rafti: A Guide to Tavernas, Markets, and Greek Food";
const DESC = "A practical food guide to Porto Rafti, including the best fish tavernas, traditional bakeries, local markets, regional Attic specialities, and how to source ingredients for in-villa meals. Honest notes on prices, hours, and family suitability.";
const URL = "https://www.villalithosgreece.com/articles/eating-in-porto-rafti";
const PUBLISHED = "2026-05-11";
const MODIFIED = "2026-05-11";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "best restaurants porto rafti",
    "fish tavernas porto rafti",
    "greek food attica",
    "porto rafti dining guide",
    "local markets east attica",
    "private chef porto rafti villa",
    "traditional greek bakery",
    "regional attic cuisine",
    "where to eat porto rafti",
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
      <span style={s.meta}>Last updated: 26 May 2026 · 10 minute read · Villa Lithos Porto Rafti</span>

      <p style={s.intro}>
        One of the main reasons to choose Porto Rafti over a Greek island is the food economy. The local market is built around Greek families, not tourists, which means the fish is fresh, the prices are reasonable, and the kitchen traditions are still close to the regional Attic cuisine. This is a practical guide to eating here, the tavernas worth your evening, the bakeries and markets for villa-cooked meals, and the regional specialities that don't appear in the tourist menus on Mykonos.
      </p>

      <h2 style={s.h2}>How Porto Rafti Eats</h2>
      <p style={s.p}>
        Porto Rafti is a working coastal town with a fishing harbour at one end and small farms in the surrounding hills. The waterfront promenade has perhaps a dozen tavernas, mostly fish-focused. The inland streets have bakeries (fourno), butchers, fruit and vegetable shops, and a couple of supermarkets. The food culture is the Mediterranean diet at its source, listed by <a href="https://ich.unesco.org/en/RL/mediterranean-diet-00884" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>UNESCO on the Representative List of Intangible Cultural Heritage of Humanity</a>. The pattern centres on olive oil, fresh vegetables, fish, legumes, modest dairy, and seasonal fruit, with meat as an occasional protein rather than a staple.
      </p>
      <p style={s.p}>
        Greek meals run later than most northern European or American visitors expect. Lunch is typically served from 13:30 to 16:00. Dinner starts at 21:00 and runs to midnight on summer weekends. The villa concierge can advise on adjusted hours if you are travelling with young children who need an earlier dinner schedule.
      </p>

      <h2 style={s.h2}>The Tavernas Worth Your Evening</h2>
      <h3 style={s.h3}>Fish tavernas on the waterfront</h3>
      <p style={s.p}>
        Porto Rafti's harbour has the highest concentration of fish tavernas in East Attica. The format is consistent across most of them. You walk in, look at the fish on ice (psaria), select what you want, agree on the cooking method (grilled is standard), and order side dishes (Greek salad, fried courgette flowers, taramasalata, fava). The fish is priced per kilo on the day's catch. Expect prices of EUR 40 to EUR 70 per kilo for high-quality wild fish like sea bream (tsipoura), sea bass (lavraki), red mullet (barbouni), or grouper (sfyrida).
      </p>
      <p style={s.p}>
        Practical guidance. The villa concierge team maintains current relationships with the better tavernas and can call ahead to reserve. For a group of 22, advance notice is essential, since most tavernas can comfortably seat 10 to 14 at a single table and need 24 to 48 hours to set up for a larger party.
      </p>
      <h3 style={s.h3}>Traditional tavernas inland</h3>
      <p style={s.p}>
        The inland village tavernas, in the streets behind the harbour and in the small villages of the surrounding hills (Markopoulo, Spata, Koropi), are where the slow-cooked meat dishes and the regional Attic specialities are at their best. The menu rotates with the season. In spring you find young lamb with artichokes, in autumn rabbit stifado (stew with onions and tomato), in winter pork and celery (hirino me selino).
      </p>
      <p style={s.p}>
        Prices at inland tavernas are notably lower than the waterfront. A full meal for four with wine typically lands at EUR 80 to EUR 130, compared with EUR 130 to EUR 200 for the equivalent at a harbourside fish taverna.
      </p>

      <h2 style={s.h2}>Where to Source Ingredients for In-Villa Meals</h2>
      <p style={s.p}>
        Many guests cook at least some meals in the villa kitchen. The closest supermarket is in Porto Rafti centre, with a full range of standard items. For better-quality ingredients, the following are worth the small extra effort:
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Type</th><th style={s.th}>Where</th><th style={s.th}>What to buy</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>Bakery (fourno)</td><td style={s.td}>Porto Rafti centre, multiple locations</td><td style={s.td}>Country bread, koulouri, spanakopita, bougatsa</td></tr>
          <tr><td style={s.td}>Fruit and vegetable shop</td><td style={s.td}>Porto Rafti and Markopoulo</td><td style={s.td}>Seasonal Attic produce, especially tomatoes June to October</td></tr>
          <tr><td style={s.td}>Butcher (kreopoleio)</td><td style={s.td}>Porto Rafti or Markopoulo</td><td style={s.td}>Lamb chops, free-range chicken, local sausage</td></tr>
          <tr><td style={s.td}>Fish (psaras)</td><td style={s.td}>Porto Rafti harbour</td><td style={s.td}>Whole sea bass, sardines, octopus, mussels</td></tr>
          <tr><td style={s.td}>Greek deli</td><td style={s.td}>Markopoulo and Spata</td><td style={s.td}>Feta DOP, olives from the regional press, olive oil from Mesogeia</td></tr>
          <tr><td style={s.td}>Weekly farmers market (laiki)</td><td style={s.td}>Markopoulo, Wednesday and Saturday morning</td><td style={s.td}>Local produce direct from small farmers</td></tr>
        </tbody>
      </table>
      <p style={s.source}>
        Locations and days verified for 2026 against publicly available local information. Schedules occasionally change with municipal directives. Confirm with the villa concierge before relying on a specific day or time.
      </p>

      <h2 style={s.h2}>Regional Attic Specialities to Try</h2>
      <p style={s.p}>
        According to the <a href="https://www.visitgreece.gr/experiences/gastronomy/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Greek National Tourism Organisation gastronomy guide</a>, the Greek mainland has regional cuisines that vary meaningfully across the country. Attica's cuisine has its own character, distinct from the more famous Cretan or Macedonian traditions. Specialities worth trying:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Mesogeia wine.</strong> According to <a href="https://www.winesofgreece.org/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wines of Greece</a>, the official body of the Greek National Inter-Professional Organization of Vine and Wine, the Mesogeia plain just inland from Porto Rafti is one of the oldest wine-producing regions in Greece. The white Savatiano grape is the regional workhorse. Local producers include Papagiannakos and Markou estates. Both run cellar visits with advance booking.</li>
        <li style={s.li}><strong>Kourabiedes.</strong> Almond-and-butter shortbread cookies dusted in powdered sugar, a traditional Attic and broader Greek confection. Available year round in the local bakeries.</li>
        <li style={s.li}><strong>Spanakopita and tyropita.</strong> Phyllo pastries with spinach or cheese. The Porto Rafti bakeries make both excellently. A wedge with a Greek coffee is the standard morning routine.</li>
        <li style={s.li}><strong>Mountain greens (horta).</strong> Wild boiled greens, dressed with olive oil and lemon, are a classic Greek side. Spring varieties include stamnagathi and chicory.</li>
        <li style={s.li}><strong>Taramasalata.</strong> The cured fish-roe spread is a Greek staple. Made well, it is delicate and lemon-forward. Made poorly (with too much bread), it becomes heavy. The best version comes from the harbour tavernas using fresh tarama.</li>
      </ul>

      <h2 style={s.h2}>Greek Wine in Porto Rafti</h2>
      <p style={s.p}>
        The Greek wine renaissance of the last 20 years has produced exceptional bottles, mostly still under-recognised internationally. The villa concierge keeps a curated list of regional and Greek-wide producers. For dinners at the villa, expect to encounter:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Assyrtiko</strong>, the lemon-and-flint white from Santorini, paired with grilled fish</li>
        <li style={s.li}><strong>Moschofilero</strong>, the Peloponnese aromatic white, pairing with spanakopita and salads</li>
        <li style={s.li}><strong>Agiorgitiko</strong>, the Peloponnese red, accessible and food-friendly</li>
        <li style={s.li}><strong>Xinomavro</strong>, the structured northern Greek red, the comparison wine to Nebbiolo for serious wine drinkers</li>
        <li style={s.li}><strong>Savatiano</strong>, the Mesogeia local, light and refreshing for everyday lunch wine</li>
      </ul>
      <p style={s.p}>
        Greek wine prices remain well below their European peers. A high-quality bottle from a respected producer is typically EUR 15 to EUR 30 retail, and EUR 25 to EUR 50 at a taverna.
      </p>

      <h2 style={s.h2}>Private Chef and Catering Options</h2>
      <p style={s.p}>
        For guests who want to focus on rest rather than meal prep, the villa concierge maintains a roster of private chefs. The standard offering covers three formats:
      </p>
      <ol style={s.ul}>
        <li style={s.li}><strong>Welcome dinner.</strong> One chef-prepared meal on arrival night, three courses for the full party. Cost is per person, typically EUR 60 to EUR 90 inclusive of ingredients.</li>
        <li style={s.li}><strong>Full-week catering.</strong> Chef present daily for breakfast, lunch, and dinner. Cost is daily rate plus ingredients. Suited for retreats and large family groups.</li>
        <li style={s.li}><strong>Themed event dinner.</strong> One specific occasion, milestone birthday, anniversary, work dinner. Often paired with a sommelier-led wine flight and customised menu.</li>
      </ol>
      <p style={s.p}>
        Dietary requirements are handled in advance. Kosher catering is arranged through specific certified suppliers, gluten-free and plant-based menus are routine, and allergy management is standard.
      </p>

      <h2 style={s.h2}>Coffee Culture</h2>
      <p style={s.p}>
        Greeks take coffee seriously. The dominant order in summer is freddo espresso (cold espresso) or freddo cappuccino. Iced coffee in Greece is not the diluted variety found in northern European chains, it is concentrated, foamed, and consumed slowly over an hour of conversation. The Porto Rafti waterfront has several cafés where the freddo culture is at its best, and any of them work for a midmorning break or post-beach refreshment.
      </p>
      <p style={s.p}>
        Greek coffee proper (called Greek coffee in Greece, the same beverage is called Turkish coffee in Turkey and Arabic coffee elsewhere) is the traditional morning ritual. Order it sweet (glykos) or no sugar (sketos) according to taste. The grounds settle at the bottom of the cup, do not drink them.
      </p>

      <h2 style={s.h2}>Sources and Further Reading</h2>
      <ul style={s.ul}>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Mediterranean_diet" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Mediterranean diet</a>, dietary pattern background</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Greek_cuisine" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Greek cuisine</a>, national tradition overview</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Wines_of_Greece" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Wines of Greece</a>, varieties and regions</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Savatiano" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Savatiano</a>, Mesogeia grape</li>
        <li style={s.li}><a href="https://www.visitgreece.gr/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Visit Greece</a>, Greek National Tourism Organisation</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Porto_Rafti" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Porto Rafti</a>, town context</li>
      </ul>

      <div style={s.ctaBox}>
        <h2 style={s.ctaHeading}>Eat the Real Greece, Five Minutes From the Villa</h2>
        <p style={s.ctaText}>Villa Lithos Porto Rafti is within walking distance of the harbour tavernas, and the concierge team can arrange a private chef or curate a tasting menu of regional Attic wines for any night of your stay.</p>
        <Link href="/#inquiry" style={s.cta}>Inquire About Summer 2026</Link>
      </div>

      <p style={s.updated}>Last updated: 11 May 2026. All external sources opened in a new tab with rel=&quot;nofollow noopener&quot;.</p>

      <Link href="/articles" style={s.back}>&larr; Back to Articles</Link>
    </article>
  );
}
