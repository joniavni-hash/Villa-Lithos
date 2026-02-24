import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles | Villa Lithos",
  description:
    "Travel guides, family vacation tips, and insider knowledge about Porto Rafti, Athens Riviera, and luxury villa holidays in Greece.",
  keywords: [
    "villa lithos blog",
    "porto rafti travel guide",
    "athens riviera family vacation",
    "greece villa holiday tips",
    "things to do near athens",
    "porto rafti family activities",
  ],
};

const articles = [
  {
    slug: "porto-rafti-family-holiday-greece",
    title:
      "Porto Rafti Family Holiday: Why This Hidden Gem Beats the Greek Islands",
    excerpt:
      "Skip the crowded islands. Porto Rafti near Athens offers stunning beaches, ancient sites, and easy access to everything families love about Greece.",
    date: "2026-02-24",
    readTime: "7 min read",
    category: "Family Travel",
  },
  {
    slug: "things-to-do-near-athens-with-kids",
    title: "Best Things to Do Near Athens with Kids: Summer 2026 Guide",
    excerpt:
      "From ancient ruins to island day trips and hidden beaches, discover the best family-friendly activities near Athens for summer 2026.",
    date: "2026-02-24",
    readTime: "8 min read",
    category: "Family Travel",
  },
  {
    slug: "luxury-villa-lithos-family-retreat",
    title:
      "Luxury Villa Near Athens: The Ultimate Family Retreat at Villa Lithos",
    excerpt:
      "With 9 bedrooms, a heated infinity pool, padel court, and full concierge service, Villa Lithos offers the perfect setting for a multi-family Greek summer holiday.",
    date: "2026-02-24",
    readTime: "6 min read",
    category: "Villa Experience",
  },
];

export default function ArticlesPage() {
  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "60px 24px 80px",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-serif), serif",
          fontSize: "2.4rem",
          color: "#2c2c2c",
          marginBottom: 8,
        }}
      >
        Articles
      </h1>
      <p
        style={{
          color: "#666",
          fontSize: "1.1rem",
          marginBottom: 48,
          lineHeight: 1.6,
        }}
      >
        Travel guides, family vacation tips, and insider knowledge about Porto
        Rafti and the Athens Riviera.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={"/articles/" + article.slug}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              style={{
                borderBottom: "1px solid #e5e5e5",
                paddingBottom: 40,
                transition: "transform 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#7a8c6e",
                  fontWeight: 600,
                }}
              >
                {article.category}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif), serif",
                  fontSize: "1.5rem",
                  color: "#2c2c2c",
                  margin: "8px 0 12px",
                  lineHeight: 1.3,
                }}
              >
                {article.title}
              </h2>
              <p
                style={{
                  color: "#555",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                  marginBottom: 12,
                }}
              >
                {article.excerpt}
              </p>
              <span style={{ fontSize: "0.85rem", color: "#999" }}>
                {article.readTime}
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

