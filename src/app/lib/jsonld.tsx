import { SITE, siteUrl } from "./seo";

type JsonLdProps<T extends object> = { data: T };

const safe = (s: string) =>
  s.replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");

function JsonLd<T extends object>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safe(JSON.stringify(data)) }}
    />
  );
}

// Organization Schema
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: siteUrl(),
    logo: siteUrl("/img/logo.webp"),
    description: SITE.description,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      availableLanguage: ["English", "Greek"],
    },
  };
  return <JsonLd data={data} />;
}

// WebSite Schema
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: siteUrl(),
    description: SITE.description,
    inLanguage: "en-US",
  };
  return <JsonLd data={data} />;
}

// VacationRental / LodgingBusiness Schema - Main schema for the villa
export function VacationRentalJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": siteUrl("/#villa"),
    name: SITE.name,
    description: SITE.description,
    url: siteUrl(),
    image: [
      siteUrl("/img/hero.webp"),
      siteUrl("/img/gallery/01.webp"),
      siteUrl("/img/gallery/02.webp"),
      siteUrl("/img/gallery/03.webp"),
    ],
    logo: siteUrl("/img/logo.webp"),
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GR",
      addressRegion: "Greece",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Update these coordinates to actual villa location
      latitude: "37.9838",
      longitude: "23.7275",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Gym", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sauna", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: "Elevator", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    ],
    numberOfRooms: 9,
    petsAllowed: false,
    checkinTime: "15:00",
    checkoutTime: "11:00",
    additionalType: "https://schema.org/VacationRental",
    tourBookingPage: "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72",
  };
  return <JsonLd data={data} />;
}

// BreadcrumbList Schema
export function BreadcrumbJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experiences",
        item: siteUrl("/#services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Gallery",
        item: siteUrl("/#gallery"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: siteUrl("/#inquiry"),
      },
    ],
  };
  return <JsonLd data={data} />;
}

// FAQPage Schema (useful for common questions)
export function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many bedrooms does Villa Lithos have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Villa Lithos has 9 bedrooms and 10 bathrooms. It sleeps up to 22 guests.",
        },
      },
      {
        "@type": "Question",
        name: "Does Villa Lithos have a private pool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The pool is private and there are sun loungers and outdoor seating.",
        },
      },
      {
        "@type": "Question",
        name: "What amenities are available at Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The villa has a gym, sauna, padel court, elevator, WiFi, air conditioning, BBQ area, and sea views.",
        },
      },
      {
        "@type": "Question",
        name: "Is Villa Lithos family-friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We can provide cribs and baby baths. The entrance is private and the layout works well for families.",
        },
      },
    ],
  };
  return <JsonLd data={data} />;
}

// Combined component for all JSON-LD schemas
export function AllJsonLd() {
  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <VacationRentalJsonLd />
      <BreadcrumbJsonLd />
      <FAQJsonLd />
    </>
  );
}
