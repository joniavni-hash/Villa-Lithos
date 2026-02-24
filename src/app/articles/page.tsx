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
          "greece luxury villa articles",
          "things to do near athens",
          "family holiday greece 2026",
        ],
    openGraph: {
          title: "Articles | Villa Lithos",
          description:
                  "Travel guides and tips for your perfect Greek family holiday near Athens.",
          type: "website",
    },
};

const articles = [
  {
        slug: "porto-rafti-family-holiday-greece",
        title: "Why Porto Rafti is the Perfect Base for a Family Holiday in Greece",
        excerpt:
                "Discover why Porto Rafti, just 15 minutes from Athens Airport, is becoming the top choice for families seeking a luxurious yet authentic Greek summer experience.",
        date: "2026-02-24",
        readTime: "7 min read",
        category: "Destination Guide",
  },
  {
        slug: "things-to-do-near-athens-with-kids",
        title: "Best Things to Do Near Athens with Kids: Summer 2026 Guide",
        excerpt:
                "From ancient ruins to crystal-clear beaches, here are the best family-friendly activities and day trips within easy reach of the Athens Riviera.",
        date: "2026-02-24",
        readTime: "8 min read",
        category: "Family Travel",
  },
  {
        slug: "luxury-villa-lithos-family-retreat",
        title:
                "Luxury Villa Near Athens: The Ultimate Family Retreat at Villa Lithos",
        excerpt:
                "With 9 bedrooms, a heated infinity pool, padel court, and full concierge service, Villa Lithos offers the perfect setting for a multi-generational family holiday in Greece.",
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
                            padding: "120px 24px 80px",
                            fontFamily: "var(--font-sans)",
                  }}
                >
                <h1
                          style={{
                                      fontFamily: "var(--font-serif)",
                                      fontSize: "2.8rem",
                                      color: "#2c2c2c",
                                      marginBottom: 12,
                          }}
                        >
                        Articles
                </h1>h1>
                <p
                          style={{
                                      fontSize: "1.1rem",
                                      color: "#666",
                                      marginBottom: 48,
                                      lineHeight: 1.6,
                          }}
                        >
                        Travel guides, local tips, and everything you need to plan the perfect
                        family holiday at Villa Lithos.
                </p>p>
                <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                  {articles.map((article) => (
                            <Link
                                          key={article.slug}
                                          href={`/articles/${article.slug}`}
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
                                                      </span>span>
                                                      <h2
                                                                        style={{
                                                                                            fontFamily: "var(--font-serif)",
                                                                                            fontSize: "1.6rem",
                                                                                            color: "#2c2c2c",
                                                                                            margin: "8px 0 12px",
                                                                                            lineHeight: 1.3,
                                                                        }}
                                                                      >
                                                        {article.title}
                                                      </h2>h2>
                                                      <p
                                                                        style={{
                                                                                            color: "#555",
                                                                                            lineHeight: 1.7,
                                                                                            fontSize: "1rem",
                                                                                            marginBottom: 12,
                                                                        }}
                                                                      >
                                                        {article.excerpt}
                                                      </p>p>
                                                      <span style={{ fontSize: "0.85rem", color: "#999" }}>
                                                        {article.readTime}
                                                      </span>span>
                                        </article>article>
                            </Link>Link>
                          ))}
                </div>div>
          </section>section>
        );
}</section>
