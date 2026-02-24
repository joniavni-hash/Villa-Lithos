import { MetadataRoute } from "next";


export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.villalithosgreece.com";


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#inquiry`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
            url: `${baseUrl}/articles`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
    },
    {
            url: `${baseUrl}/articles/porto-rafti-family-holiday-greece`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
    },
    {
            url: `${baseUrl}/articles/things-to-do-near-athens-with-kids`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
    },
    {
            url: `${baseUrl}/articles/luxury-villa-lithos-family-retreat`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
    },
    {
            url: `${baseUrl}/articles/porto-rafti-alternative-greek-islands`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
    },
    {
            url: `${baseUrl}/articles/multi-generational-trip-greece`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
    },
  ];
}

