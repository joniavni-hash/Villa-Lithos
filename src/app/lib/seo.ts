export const SITE = {
  name: "Villa Lithos Porto Rafti",
  alternateName: "Villa Lithos",
  slogan: "A 9-bedroom luxury villa, 20 minutes from Athens airport",
  description:
    "Villa Lithos Porto Rafti is a 9-bedroom, 800 m² luxury villa in Porto Rafti, Attica, Greece, 16 km from Athens International Airport. Sleeps 22 guests across nine bedrooms and 8.5 bathrooms on a 5,000 m² private estate, with heated infinity pool, outdoor sauna, padel court, gym, and elevator. Managed by Goldenberg Luxe.",
  locale: "en_GB",
  alternateLocale: "el_GR",
  twitter: "@villalithos",
  creator: "Villa Lithos Porto Rafti",
  region: "Attica, Greece",
  placeName: "Villa Lithos Porto Rafti, Attica, Greece",
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
  "villa lithos porto rafti",
  "villa lithos",
  "luxury villa porto rafti",
  "luxury villa near athens airport",
  "9 bedroom villa greece",
  "large family villa greece",
  "private villa rental athens riviera",
  "athens airport villa rental",
  "villa with padel court greece",
  "villa with elevator greece",
  "luxury retreat greece",
  "private pool villa greece",
  "panoramic sea views villa",
  "wellness retreat greece",
  "porto rafti accommodation",
  "porto rafti family villa",
  "corporate retreat villa greece",
  "multi generational villa greece",
];
