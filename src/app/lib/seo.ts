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
