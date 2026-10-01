import { Metadata } from "next";
import Link from "next/link";

const TITLE = "Large Private Villa Near Athens | Villa Lithos";
const H1 = "Large Private Villa Near Athens: Luxury Estate Rental for Groups at Villa Lithos";
const DESC = "Rent a large private villa near Athens. Villa Lithos sleeps 22 across 9 bedrooms with heated pool, padel court, and 5,000 m² grounds in Porto Rafti, Attica.";
const URL = "https://www.villalithosgreece.com/articles/luxury-villa-lithos-family-retreat";
const PUBLISHED = "2026-02-24";
const MODIFIED = "2026-10-01";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "large private villa near athens",
    "large villa near athens",
    "private villa near athens",
    "luxury estate rental greece",
    "villa for 22 guests greece",
    "9 bedroom villa near athens",
    "group villa rental athens",
    "multi-generational villa greece",
    "private estate attica",
    "large villa athens riviera",
    "villa near athens airport",
    "villa lithos porto rafti",
  ],
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESC,
    url: URL,
    images: [{ url: "https://www.villalithosgreece.com/img/gallery/Exterior%20%26%20Pool%20(15).jpg", width: 2048, height: 1365 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

const photos = [
  { file: "Exterior & Pool (12).jpg", alt: "Villa Lithos at dusk: the main house, pergola terrace and heated infinity pool of this large private villa near Athens in Porto Rafti" },
  { file: "Bedrooms (3).jpg", alt: "One of the nine bedrooms at Villa Lithos Porto Rafti, with doors opening onto the garden" },
  { file: "Living & Dining (9).jpg", alt: "Open-plan dining and living room at Villa Lithos Porto Rafti with glass doors to the pool terrace and sea views" },
  { file: "Sports & Activities (6).jpg", alt: "Floodlit glass-walled private padel court at Villa Lithos Porto Rafti in the evening" },
];
const img = (file: string) => `/img/gallery/${encodeURIComponent(file)}`;

const faqs = [
  {
    q: "How many guests can Villa Lithos sleep?",
    a: "Villa Lithos has 9 bedrooms configured to sleep up to 22 guests comfortably, with 8.5 bathrooms and ample interior and terrace seating for full-capacity dining.",
  },
  {
    q: "How far is the villa from Athens Airport and the Acropolis?",
    a: "The property is in Porto Rafti, approximately 16 kilometres (about 20 minutes by car) from Athens International Airport and approximately 40 minutes from central Athens and the Acropolis via Attiki Odos.",
  },
  {
    q: "Is the whole estate private to one group?",
    a: "Yes. The entire 5,000 m² estate, including the pool, padel court, gym and sauna, is rented to one group at a time. Nothing is shared with other guests.",
  },
  {
    q: "Is the villa suitable for grandparents or guests with limited mobility?",
    a: "An internal elevator serves all four floors of the main house and there is a large master suite on the ground floor, so older guests can avoid stairs entirely.",
  },
  {
    q: "Can bespoke catering, chef, or transportation services be booked?",
    a: "Yes. Pre-arrival grocery stocking, private in-villa chef services, chauffeured airport transfers, and wellness instructors can be arranged via the concierge team.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  description: DESC,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { "@type": "Organization", name: "Villa Lithos Porto Rafti", url: "https://www.villalithosgreece.com" },
  publisher: { "@type": "Organization", name: "Villa Lithos Porto Rafti", logo: { "@type": "ImageObject", url: "https://www.villalithosgreece.com/img/logo.webp" } },
  image: ["https://www.villalithosgreece.com/img/hero.webp", ...photos.map((p) => `https://www.villalithosgreece.com${img(p.file)}`)],
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  url: URL,
  about: [
    { "@type": "Thing", name: "Large private villas near Athens" },
    { "@type": "Thing", name: "Group and multi-generational villa rentals in Greece" },
    { "@id": "https://www.villalithosgreece.com/#villa" },
  ],
};

const link = { color: "#7a8c6e" } as React.CSSProperties;

const s = {
  article: { maxWidth: 820, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.8 } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", color: "#2c2c2c", marginBottom: 16, lineHeight: 1.2 } as React.CSSProperties,
  meta: { color: "#888", fontSize: "0.92rem", marginBottom: 36, display: "block" } as React.CSSProperties,
  intro: { fontSize: "1.15rem", lineHeight: 1.7, marginBottom: 28, padding: "20px 24px", background: "#f8f6f1", borderLeft: "3px solid #7a8c6e", borderRadius: 4 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: "#2c2c2c", marginTop: 48, marginBottom: 12 } as React.CSSProperties,
  h3: { fontFamily: "var(--font-serif), serif", fontSize: "1.25rem", color: "#2c2c2c", marginTop: 28, marginBottom: 10 } as React.CSSProperties,
  p: { marginBottom: 18, fontSize: "1.05rem" } as React.CSSProperties,
  ul: { marginBottom: 18, paddingLeft: 22 } as React.CSSProperties,
  li: { marginBottom: 10, fontSize: "1.05rem" } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12, margin: "28px 0 22px" } as React.CSSProperties,
  photo: { width: "100%", height: "auto", aspectRatio: "3 / 2", objectFit: "cover" as const, borderRadius: 8, display: "block" } as React.CSSProperties,
  faqItem: { borderBottom: "1px solid #e8e3d3", padding: "14px 0" } as React.CSSProperties,
  faqQ: { fontWeight: 600, fontSize: "1.05rem", cursor: "pointer", listStyle: "none" } as React.CSSProperties,
  faqA: { marginTop: 8, fontSize: "1.02rem", color: "#444" } as React.CSSProperties,
  cta: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.05rem", marginTop: 12 } as React.CSSProperties,
  ctaBox: { marginTop: 48, padding: "40px 32px", background: "#f8f6f1", borderRadius: 12, textAlign: "center" as const } as React.CSSProperties,
  ctaHeading: { fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "#2c2c2c", marginBottom: 12, marginTop: 0 } as React.CSSProperties,
  ctaText: { fontSize: "1.05rem", color: "#555", marginBottom: 24 } as React.CSSProperties,
  back: { display: "inline-block", marginTop: 32, color: "#7a8c6e", textDecoration: "none", fontSize: "0.97rem" } as React.CSSProperties,
  updated: { fontSize: "0.86rem", color: "#888", marginTop: 36, paddingTop: 14, borderTop: "1px solid #e8e3d3" } as React.CSSProperties,
};

export default function Article() {
  return (
    <article style={s.article}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <h1 style={s.h1}>{H1}</h1>
      <span style={s.meta}>Last updated: October 2026 · 6 minute read · Villa Lithos Porto Rafti</span>

      <p style={s.intro}>
        Finding a truly <strong>large private villa near Athens</strong> that offers complete seclusion without sacrificing effortless access to international travel hubs and ancient landmarks is rare. Most holiday rentals in mainland Greece cater to individual families or require splitting larger parties across multiple detached units. Set on a gated 5,000 m² estate on the East Attica coast in Porto Rafti, Villa Lithos solves this challenge. Accommodating up to 22 guests across nine bedrooms, this private estate combines resort-grade wellness facilities with absolute privacy, a short drive from the capital.
      </p>

      <h2 style={s.h2}>Space and Seclusion: 9 Bedrooms on a 5,000 m² Private Estate</h2>
      <p style={s.p}>
        When organising travel for large groups, square footage and bedroom configuration dictate the quality of the stay. Villa Lithos is arranged to provide seamless communal living alongside quiet, independent zones. The main residence spans approximately 800 m² over four levels served by an internal elevator, and a separate guest apartment on the estate adds its own bedroom, living room, kitchen and bathroom. Together they offer nine bedrooms, most of them en-suite, with 8.5 bathrooms in total.
      </p>
      <p style={s.p}>
        Unlike hotel resorts where pools, dining areas, and cabanas are shared with strangers, the entire 5,000 m² estate remains exclusively yours. Guests can gather for al fresco meals prepared by a private chef on the covered terraces, unwind in the gardens among the olive trees, or take in panoramic views of the Aegean Sea in total seclusion.
      </p>

      <h2 style={s.h2}>Resort-Calibre Amenities for Private Group Living</h2>
      <p style={s.p}>
        A large group estate must deliver amenities that cater to diverse ages, schedules, and interests without requiring daily travel off-property:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Heated Infinity Pool:</strong> Positioned above the bay with a jacuzzi alongside, and heated so that swimming stays comfortable through the shoulder season.</li>
        <li style={s.li}><strong>Private Floodlit Padel Court:</strong> A full-size, glass-walled private padel court on-site for casual matches, fitness routines, or friendly tournaments; a coach can be booked through the concierge.</li>
        <li style={s.li}><strong>Wellness &amp; Fitness:</strong> A private gym pavilion beside the pool and an outdoor barrel sauna in the garden, designed for daily training, recovery, and quiet relaxation.</li>
        <li style={s.li}><strong>Fast Starlink Connectivity:</strong> Stable high-speed internet across both indoor and outdoor spaces, supporting remote work, streaming, and group presentations.</li>
      </ul>
      <div style={s.grid}>
        {photos.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.file} src={img(p.file)} alt={p.alt} loading="lazy" style={s.photo} />
        ))}
      </div>

      <h2 style={s.h2}>Designed for Multi-Generational Families, Corporate Offsites, and Retreats</h2>
      <p style={s.p}>
        Villa Lithos accommodates three core guest profiles seeking a large private villa near Athens:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Multi-Generational Families:</strong> Step-free access via the internal elevator, a large master suite on the ground floor, and a gated estate with enclosed gardens make the house comfortable for toddlers, parents, and grandparents alike. See our guide to <Link href="/articles/multi-generational-trip-greece" style={link}>planning a multi-generational trip to Greece</Link>.</li>
        <li style={s.li}><strong>Corporate Offsites &amp; Leadership Retreats:</strong> Fast connectivity, two living rooms on separate levels, an attic workshop space with a large screen, and spacious outdoor tables allow executive teams to think and plan without typical hotel distractions. Review our dedicated setup for <Link href="/corporate-retreats" style={link}>corporate retreats</Link>.</li>
        <li style={s.li}><strong>Wellness and Yoga Retreats:</strong> Fitness coaches and yoga instructors benefit from serene surroundings, a pergola-shaded sea-view terrace for mat sessions, and sauna and pool recovery after training.</li>
      </ul>

      <h2 style={s.h2}>Mainland Convenience: Why Location Near Athens Matters</h2>
      <p style={s.p}>
        Choosing a mainland estate on the Athens Riviera eliminates the logistical headaches of island travel, including ferry schedules, luggage transfers, and sea delays. Situated in coastal Porto Rafti, Villa Lithos is approximately a 20-minute drive from Athens International Airport (ATH) and roughly 40 minutes from central Athens and the Acropolis.
      </p>
      <p style={s.p}>
        International travellers arriving from London, Tel Aviv, New York, Rome, or Madrid can leave the terminal and be at the villa well within the hour. The estate also serves as an effortless base for day trips to Cape Sounion&apos;s Temple of Poseidon or the ancient sanctuary of Brauron. To explore drive times and transit ease, consult our guide to <Link href="/villas-near-athens-airport" style={link}>villas near Athens airport</Link>, or see how mainland privacy compares to the islands in our analysis of <Link href="/large-family-villa-greece" style={link}>large family villas in Greece</Link>.
      </p>

      <h2 style={s.h2}>Frequently Asked Questions</h2>
      {faqs.map(({ q, a }) => (
        <details key={q} style={s.faqItem}>
          <summary style={s.faqQ}>{q}</summary>
          <p style={s.faqA}>{a}</p>
        </details>
      ))}

      <div style={s.ctaBox}>
        <h2 style={s.ctaHeading}>Book Your Large Private Villa Near Athens</h2>
        <p style={s.ctaText}>
          Whether planning an extended family reunion, an executive strategy summit, or a private wellness retreat, Villa Lithos offers unmatched space, security, and luxury within easy reach of Athens. Rates and minimum stay vary by season and are quoted on request. Inquire with your proposed group size and preferred dates to check availability.
        </p>
        <Link href="/#inquiry" style={s.cta}>Inquire Now</Link>
      </div>

      <h2 style={s.h2}>Sources and Further Reading</h2>
      <ul style={s.ul}>
        <li style={s.li}><a href="https://www.aia.gr/" target="_blank" rel="nofollow noopener" style={link}>Athens International Airport (AIA)</a>: Official airport route and distance data</li>
        <li style={s.li}><a href="https://www.visitgreece.gr/mainland/attica/" target="_blank" rel="nofollow noopener" style={link}>Visit Greece: Attica</a>: Regional tourism information</li>
        <li style={s.li}><a href="https://www.hnms.gr/emy/en/" target="_blank" rel="nofollow noopener" style={link}>Hellenic National Meteorological Service (HNMS)</a>: Climate data for Attica</li>
      </ul>

      <p style={s.updated}>Last updated: 1 October 2026. All external sources opened in a new tab with rel=&quot;nofollow noopener&quot;.</p>

      <Link href="/articles" style={s.back}>&larr; Back to Articles</Link>
    </article>
  );
}
