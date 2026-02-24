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
    "multi-generational travel greece",
  ],
};

const articles = [
  {
    slug: "porto-rafti-family-holiday-greece",
    title: "Why Porto Rafti Is the Best Kept Secret for a Family Holiday in Greece",
    excerpt:
      "Forget the overcrowded islands. Porto Rafti offers the perfect blend of crystal-clear waters, authentic Greek culture, and easy access to Athens.",
    date: "2026-02-24",
    readTime: "6 min read",
    category: "Destination Guide",
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
    title: "Inside Villa Lithos: A Luxury Family Retreat on the Athens Riviera",
    excerpt:
      "9 bedrooms, a private pool, and 800 square metres of living space just 30 minutes from Athens airport. Discover what makes Villa Lithos special.",
    date: "2026-02-24",
    readTime: "5 min read",
    category: "Villa Feature",
  },
  {
    slug: "porto-rafti-alternative-greek-islands",
    title: "Porto Rafti: The Perfect Alternative to the Greek Islands",
    excerpt:
      "Skip the ferries and the crowds. Porto Rafti delivers the same turquoise waters and laid-back atmosphere without the hassle of island-hopping.",
    date: "2026-02-24",
    readTime: "7 min read",
    category: "Destination Guide",
  },
  {
    slug: "multi-generational-trip-greece",
    title: "Planning a Multi-Generational Family Trip to Greece",
    excerpt:
      "From toddlers to grandparents, Greece is one of the best destinations for bringing the whole family together. Here is how to plan it right.",
    date: "2026-02-24",
    readTime: "7 min read",
    category: "Family Travel",
  },
];

export default function ArticlesPage() {
  return (
    <main
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
      </div>
    </main>
  );
}
