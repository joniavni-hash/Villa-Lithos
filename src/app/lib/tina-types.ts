// Types matching the TinaCMS schema defined in tina/config.ts
// These are used to type component props that receive CMS data

export type GlobalData = {
  seo: {
    siteName: string;
    slogan?: string | null;
    description?: string | null;
    keywords?: (string | null)[] | null;
  };
  header: {
    brandName: string;
    bookingUrl?: string | null;
    navLinks?: { href: string; label: string }[] | null;
  };
  footer: {
    brandName?: string | null;
    tagline?: string | null;
    phone?: string | null;
    email?: string | null;
    address?: string | null;
    copyright?: string | null;
    managedBy?: string | null;
    managedByUrl?: string | null;
  };
};

export type PageData = {
  hero: {
    kicker?: string | null;
    title?: string | null;
    subtitle?: string | null;
  };
  marquee: {
    text?: string | null;
  };
  villaIntro: {
    kicker?: string | null;
    title?: string | null;
    tagline?: string | null;
    bodyParagraphs?: (string | null)[] | null;
    stats?: { label: string; value: string }[] | null;
    spaceTitle?: string | null;
    spaceParagraphs?: (string | null)[] | null;
  };
  amenities: {
    sectionTitle?: string | null;
    items?: (string | null)[] | null;
  };
  concierge: {
    title?: string | null;
    kicker?: string | null;
    paragraphs?: (string | null)[] | null;
    closingText?: string | null;
    services?: (string | null)[] | null;
  };
  gallery: {
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
  };
  map: {
    title?: string | null;
    address?: string | null;
    gettingHereTitle?: string | null;
    gettingHereIntro?: string | null;
    distances?: { name: string; detail: string }[] | null;
  };
  contact: {
    badge?: string | null;
    title?: string | null;
    subtitle?: string | null;
  };
};
