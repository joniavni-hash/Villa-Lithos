export const SITE = {
  name: "Villa Lithos",
  slogan: "A private villa in Greece",
  description:
    "Villa Lithos is a 9-bedroom private villa in Porto Rafti, Greece. Pool, sauna, sea views, and space for up to 22 guests.",
  locale: "en_US",
  alternateLocale: "el_GR",
  twitter: "@villalithos",
  creator: "Villa Lithos",
  region: "Greece",
  placeName: "Villa Lithos, Greece",
};

export function siteUrl(path: string = ""): string {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.villalithosgreece.com"
  ).replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const defaultOpenGraph = {
  type: "website",
  locale: SITE.locale,
  url: siteUrl(),
  siteName: SITE.name,
  title: SITE.name,
  description: SITE.description,
  images: [
    {
      url: siteUrl("/img/hero.webp"),
      width: 1920,
      height: 1080,
      alt: `${SITE.name} — ${SITE.slogan}`,
    },
  ],
};

export const defaultTwitter = {
  card: "summary_large_image" as const,
  site: SITE.twitter,
  creator: SITE.twitter,
  title: SITE.name,
  description: SITE.description,
  images: [siteUrl("/img/hero.webp")],
};

export function canonicalOf(pathname?: string) {
  return siteUrl(pathname || "/");
}

export function titleTemplate(title?: string) {
  return title ? `${title} | ${SITE.name}` : SITE.name;
}

export const defaultKeywords = [
  "villa lithos",
  "luxury villa greece",
  "private villa rental",
  "greece vacation rental",
  "villa with pool greece",
  "luxury retreat greece",
  "9 bedroom villa",
  "group accommodation greece",
  "family villa greece",
  "panoramic sea views villa",
  "wellness retreat greece",
  "private pool villa",
  "greek villa rental",
  "luxury holiday home greece",
];
