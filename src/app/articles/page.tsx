import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Travel guides, family vacation tips, and insider knowledge about Porto Rafti, Athens Riviera, and luxury villa holidays in Greece.",
  keywords: [
    "villa lithos blog",
    "porto rafti travel guide",
    "athens riviera family vacation",
    "greece villa holiday tips",
    "things to do near athens",
    "multi-generational travel greece",
    "wellness retreat greece",
    "porto rafti beaches",
    "day trips from porto rafti",
    "eating in porto rafti",
  ],
  alternates: {
    canonical: "https://www.villalithosgreece.com/articles",
  },
  openGraph: {
    title: "Articles",
    url: "https://www.villalithosgreece.com/articles",
  }
};

// Long-form guides (landing pages outside /articles/). Listed here so the
// Articles hub is the one place for all editorial content; they no longer
// have their own buttons in the main navigation.
const guides = [
  {
    href: "/luxury-villa-porto-rafti",
    title: "Luxury Villa in Porto Rafti, Greece: A 9-Bedroom Estate Near Athens",
    excerpt: "The full detail on Villa Lithos Porto Rafti: layout, amenities, distances, and the wider Porto Rafti context.",
    category: "Villa Guide",
  },
  {
    href: "/villas-near-athens-airport",
    title: "Closest Luxury Villa to Athens International Airport: A 20-Minute Drive to Porto Rafti",
    excerpt: "Drive-time comparison of the leading large villas near Eleftherios Venizelos, and why proximity matters for groups.",
    category: "Near Athens",
  },
  {
    href: "/large-family-villa-greece",
    title: "The Best Large Family Villas in Greece for Groups of 20",
    excerpt: "Where the 18-to-22 guest villas actually are, with regional capacity, location, and amenity comparisons.",
    category: "Large Groups",
  },
  {
    href: "/porto-rafti-vs-mykonos-vs-santorini",
    title: "Porto Rafti vs Mykonos vs Santorini: A 2026 Comparison for Families",
    excerpt: "An honest comparison by airport access, beach safety, peak-season crowding, cost, and day-trip range.",
    category: "vs Islands",
  },
  {
    href: "/corporate-retreats",
    title: "Corporate Retreats in Greece, 20 Minutes from Athens Airport",
    excerpt: "A private estate for teams of 10 to 22: retreat formats, rooming plans, working spaces, sample agenda, and weekday availability.",
    category: "Retreats & Offsites",
  },
];

const articles = [
  {
    slug: "wellness-retreats-greece-mainland",
    title: "Wellness Retreats in Greece: A Practical Guide to Mainland Options",
    excerpt: "The Greek mainland wellness retreat market in 2026, with a practical look at the difference between dedicated wellness resorts and luxury villas with full wellness amenities.",
    date: "2026-05-11",
    readTime: "11 min read",
    category: "Wellness",
  },
  {
    slug: "best-beaches-porto-rafti",
    title: "The Best Beaches in Porto Rafti and Around: A 2026 Family Guide",
    excerpt: "A practical guide to the eleven beaches of the East Attica coast, with sand vs pebble, wind exposure, family suitability, and drive times from Villa Lithos.",
    date: "2026-05-11",
    readTime: "11 min read",
    category: "Beaches Guide",
  },
  {
    slug: "day-trips-from-porto-rafti",
    title: "Day Trips from Porto Rafti: A Practical Guide to Attica's Heritage",
    excerpt: "Five practical day trips from Porto Rafti to Athens, Cape Sounion, Brauron, Marathon, and the Cycladic islands, with drive times, ticket prices, and crowd-avoidance strategies.",
    date: "2026-05-11",
    readTime: "12 min read",
    category: "Destination Guide",
  },
  {
    slug: "eating-in-porto-rafti",
    title: "Eating Like a Local in Porto Rafti: A Guide to Tavernas, Markets, and Greek Food",
    excerpt: "A practical food guide to Porto Rafti, including the best fish tavernas, traditional bakeries, local markets, regional Attic specialities, and in-villa chef options.",
    date: "2026-05-11",
    readTime: "10 min read",
    category: "Food and Wine",
  },
  {
    slug: "villa-lithos-summer-2026-availability",
    title: "Book Villa Lithos for Summer 2026: Available Weeks and What You Need to Know",
    excerpt: "Summer 2026 is filling fast. Find out which weeks are still available at Villa Lithos and why the families who book early always get the best dates.",
    date: "2026-03-02",
    readTime: "6 min read",
    category: "Booking Guide",
  },
  {
    slug: "pesach-greece-2026-villa-lithos",
    title: "Passover in Greece 2026: Why Israeli Families Choose Villa Lithos in Porto Rafti",
    excerpt: "3.5 hours from Tel Aviv, 20 minutes from Athens Airport, a private pool and a full kitchen for the holiday. Everything an Israeli family needs for Passover.",
    date: "2026-03-02",
    readTime: "7 min read",
    category: "Israeli Families",
  },
  {
    slug: "private-villa-greece-vs-hotel",
    title: "Private Villa in Greece vs. Island Hotel: An Honest Comparison for Families",
    excerpt: "Hotels or villa? We break down the real differences in space, cost, privacy, and flexibility for families who try a villa once rarely go back.",
    date: "2026-03-02",
    readTime: "8 min read",
    category: "Travel Planning",
  },
  {
    slug: "porto-rafti-family-holiday-greece",
    title: "Why Porto Rafti Is the Best Kept Secret for a Family Holiday in Greece",
    excerpt: "Forget the overcrowded islands. Porto Rafti offers the perfect blend of crystal-clear waters, authentic Greek culture, and easy access to Athens.",
    date: "2026-02-24",
    readTime: "6 min read",
    category: "Destination Guide",
  },
  {
    slug: "things-to-do-near-athens-with-kids",
    title: "Best Things to Do Near Athens with Kids: Summer 2026 Guide",
    excerpt: "From ancient ruins to island day trips and hidden beaches, discover the best family-friendly activities near Athens for summer 2026.",
    date: "2026-02-24",
    readTime: "8 min read",
    category: "Family Travel",
  },
  {
    slug: "luxury-villa-lithos-family-retreat",
    title: "Inside Villa Lithos: A Luxury Family Retreat on the Athens Riviera",
    excerpt: "9 bedrooms, a private pool, and 800 square metres of living space just 30 minutes from Athens airport. Discover what makes Villa Lithos special.",
    date: "2026-02-24",
    readTime: "5 min read",
    category: "Villa Feature",
  },
  {
    slug: "porto-rafti-alternative-greek-islands",
    title: "Porto Rafti: The Perfect Alternative to the Greek Islands",
    excerpt: "Skip the ferries and the crowds. Porto Rafti delivers the same turquoise waters and laid-back atmosphere without the hassle of island-hopping.",
    date: "2026-02-24",
    readTime: "7 min read",
    category: "Destination Guide",
  },
  {
    slug: "multi-generational-trip-greece",
    title: "Planning a Multi-Generational Family Trip to Greece",
    excerpt: "From toddlers to grandparents, Greece is one of the best destinations for bringing the whole family together. Here is how to plan it right.",
    date: "2026-02-24",
    readTime: "7 min read",
    category: "Family Travel",
  },
];

export default function ArticlesPage() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "60px 24px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#333",
      }}
    >
      <h1
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "2.5rem",
          color: "#2c2c2c",
          marginBottom: 8,
        }}
      >
        Articles
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "#666",
          marginBottom: 48,
          lineHeight: 1.6,
        }}
      >
        Travel guides, family vacation tips, and insider knowledge about Porto Rafti and the Athens Riviera.
      </p>

      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1.6rem",
          color: "#2c2c2c",
          marginBottom: 6,
        }}
      >
        Guides
      </h2>
      <p style={{ fontSize: 15, color: "#666", marginBottom: 24, lineHeight: 1.6 }}>
        Long-form reference pages on the villa, the location, and how it compares.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 56 }}>
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "#fff",
              border: "1px solid #ece7d8",
              borderRadius: 12,
              padding: "24px 24px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase", color: "#7a8c6e", marginBottom: 10 }}>{g.category}</span>
            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "1.15rem", color: "#2c2c2c", margin: "0 0 10px 0", lineHeight: 1.3 }}>{g.title}</h3>
            <p style={{ fontSize: 14, color: "#5e5e5e", lineHeight: 1.6, margin: "0 0 12px 0", flex: 1 }}>{g.excerpt}</p>
            <span style={{ color: "#7a8c6e", fontSize: 14, fontWeight: 600 }}>Read the guide &rarr;</span>
          </Link>
        ))}
      </div>

      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "1.6rem",
          color: "#2c2c2c",
          marginBottom: 24,
        }}
      >
        Articles
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={"/articles/" + article.slug}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                background: "#f8f7f4",
                borderRadius: 12,
                padding: "32px 36px",
                transition: "box-shadow 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  fontSize: 13,
                  color: "#7a8c6e",
                  marginBottom: 12,
                }}
              >
                <span>{article.category}</span>
                <span>|</span>
                <span>{article.readTime}</span>
              </div>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "1.4rem",
                  color: "#2c2c2c",
                  marginBottom: 10,
                  lineHeight: 1.3,
                }}
              >
                {article.title}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#555",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {article.excerpt}
              </p>
            </article>
          </Link>
        ))}

        <div style={{ marginTop: 56, padding: "44px 32px", background: "#f8f6f1", borderRadius: 12, textAlign: "center" as const, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "var(--font-serif, Georgia, serif)", fontSize: "1.5rem", color: "#2c2c2c", marginBottom: 12, marginTop: 0 }}>Interested in Villa Lithos?</h2>
          <p style={{ fontSize: "1.05rem", color: "#555", marginBottom: 24, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>A private luxury villa in Porto Rafti, Greece with pool, sea views, and space for the whole family. Inquire about availability for summer 2026.</p>
          <Link href="/#inquiry" style={{ display: "inline-block", padding: "14px 36px", background: "#8B9A6B", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1.08rem", textDecoration: "none", letterSpacing: 0.5 }}>Inquire Now</Link>
        </div>
      </div>
    </div>
  );
}
