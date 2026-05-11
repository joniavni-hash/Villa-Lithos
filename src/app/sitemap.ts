import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.villalithosgreece.com";

  const now = new Date();

  const articleSlugs = [
    "porto-rafti-family-holiday-greece",
    "things-to-do-near-athens-with-kids",
    "luxury-villa-lithos-family-retreat",
    "porto-rafti-alternative-greek-islands",
    "multi-generational-trip-greece",
    "pesach-greece-2026-villa-lithos",
    "private-villa-greece-vs-hotel",
    "villa-lithos-summer-2026-availability",
  ];

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#inquiry`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...articleSlugs.map((slug) => ({
      url: `${baseUrl}/articles/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
