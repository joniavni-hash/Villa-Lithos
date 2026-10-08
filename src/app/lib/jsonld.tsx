import { SITE, siteUrl } from "./seo";
import { FAQ_ITEMS } from "./faq";

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

// Canonical Definition Lead used across all schemas
const DEFINITION_LEAD =
  "Villa Lithos Porto Rafti is a 9-bedroom, 800 m² luxury villa in Porto Rafti, Attica, Greece, located 16 km (a 20-minute drive) from Athens International Airport. The property sleeps 22 guests across nine bedrooms and 8.5 bathrooms on a 5,000 m² private estate, with a heated infinity pool, outdoor sauna, jacuzzi, padel court, private gym, and elevator. It is managed by Goldenberg Luxe and is bookable on Booking.com, Airbnb, and direct.";

// Google Business Profile (Maps place) for "Villa Lithos", Vravronos 70, Porto Rafti
const GOOGLE_MAPS_PLACE = "https://www.google.com/maps?cid=13572198104547090834";

// Porto Rafti / East Attica place entities (Wikidata), used to anchor the villa to the mainland
// and separate it from similarly named properties on the Cycladic islands.
const PORTO_RAFTI_PLACE = {
  "@type": "City",
  name: "Porto Rafti",
  sameAs: ["https://www.wikidata.org/wiki/Q2105234", "https://en.wikipedia.org/wiki/Porto_Rafti"],
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "East Attica, Greece",
    sameAs: ["https://www.wikidata.org/wiki/Q211934", "https://en.wikipedia.org/wiki/East_Attica"],
  },
};

const DISAMBIGUATION =
  "Villa Lithos Attica is a private estate in Porto Rafti on the East Attica coast of mainland Greece, 20 minutes from Athens International Airport. It is not on Milos or any other Cycladic island.";

// Shared postal address, used by Organization and LodgingBusiness
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Vravronos 70",
  addressLocality: "Porto Rafti",
  addressRegion: "Attica",
  postalCode: "19003",
  addressCountry: "GR",
};

// Shared external references used in sameAs
const SAME_AS = [
  "https://www.instagram.com/villa.lithos/",
  "https://www.facebook.com/people/Villa-Lithos/61583462218227/",
  "https://www.booking.com/hotel/gr/villa-lithos-porto-rafti.html",
  "https://airbnb.com/h/lithoss",
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72",
  GOOGLE_MAPS_PLACE,
];

// Organization Schema
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteUrl("/#org"),
    name: "Villa Lithos Porto Rafti",
    alternateName: [SITE.name, "Villa Lithos Attica", "Villa Lithos Greece"],
    url: siteUrl(),
    logo: siteUrl("/img/logo.webp"),
    description: DEFINITION_LEAD,
    disambiguatingDescription: DISAMBIGUATION,
    sameAs: SAME_AS,
    address: ADDRESS,
    location: PORTO_RAFTI_PLACE,
    areaServed: PORTO_RAFTI_PLACE,
    telephone: "+30-693-275-7142",
    email: "info@villalithos.com",
    owns: { "@id": siteUrl("/#villa") },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "reservations",
      telephone: "+30-693-275-7142",
      email: "info@villalithos.com",
      availableLanguage: ["English", "Greek", "Hebrew"],
    },
  };
  return <JsonLd data={data} />;
}

// WebSite Schema
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Villa Lithos Porto Rafti",
    alternateName: SITE.name,
    url: siteUrl(),
    description: DEFINITION_LEAD,
    inLanguage: "en-US",
    publisher: { "@id": siteUrl("/#org") },
  };
  return <JsonLd data={data} />;
}

// VacationRental / LodgingBusiness Schema - Main schema for the villa
export function VacationRentalJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": siteUrl("/#villa"),
    name: "Villa Lithos Porto Rafti",
    alternateName: [SITE.name, "Villa Lithos Attica", "Villa Lithos Greece"],
    description: DEFINITION_LEAD,
    disambiguatingDescription: DISAMBIGUATION,
    url: siteUrl(),
    sameAs: SAME_AS,
    telephone: "+30-693-275-7142",
    email: "info@villalithos.com",
    image: [
      siteUrl("/img/hero.webp"),
      siteUrl("/img/gallery/Exterior%20%26%20Pool.jpg"),
      siteUrl("/img/gallery/Living%20%26%20Dining%20(6).jpg"),
      siteUrl("/img/gallery/Exterior%20%26%20Pool%20(14).jpg"),
    ],
    logo: siteUrl("/img/logo.webp"),
    priceRange: "$$$$",
    currenciesAccepted: "EUR, USD",
    address: ADDRESS,
    containedInPlace: PORTO_RAFTI_PLACE,
    parentOrganization: { "@id": siteUrl("/#org") },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "37.9022",
      longitude: "24.0224",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Heated Infinity Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Jacuzzi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Outdoor Sauna", value: true },
      { "@type": "LocationFeatureSpecification", name: "Padel Court", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Gym", value: true },
      { "@type": "LocationFeatureSpecification", name: "Elevator", value: true },
      { "@type": "LocationFeatureSpecification", name: "Sea View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Designer Kitchen with Walk-in Pantry", value: true },
      { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "BBQ", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Workspace", value: true },
    ],
    // On-site training facilities as SportsActivityLocation entities (fitness retreat queries)
    containsPlace: [
      {
        "@type": "SportsActivityLocation",
        "@id": siteUrl("/#padel-court"),
        name: "Private padel court at Villa Lithos Porto Rafti",
        description: "Full-size glass-walled padel court with artificial turf and floodlights, for the exclusive use of villa guests. Equipment provided; coaching arranged by the concierge.",
        sport: "Padel",
        image: siteUrl("/img/gallery/Sports%20%26%20Activities%20(6).jpg"),
        isAccessibleForFree: false,
        publicAccess: false,
      },
      {
        "@type": "SportsActivityLocation",
        "@id": siteUrl("/#gym"),
        name: "Private gym pavilion at Villa Lithos Porto Rafti",
        description: "Garden gym pavilion beside the pool with folding glass doors, wooden floor and rubber matting, multi-station cable machine, adjustable bench, adjustable dumbbells and treadmill.",
        sport: "Strength training",
        image: siteUrl("/img/gallery/Sports%20%26%20Activities%20(4).jpg"),
        isAccessibleForFree: false,
        publicAccess: false,
      },
      {
        "@type": "SportsActivityLocation",
        "@id": siteUrl("/#pool"),
        name: "Heated infinity pool at Villa Lithos Porto Rafti",
        description: "Heated infinity pool with sea views and a jacuzzi alongside, usable in the shoulder season, with a pergola-shaded stone terrace beside it for mat work and outdoor training.",
        sport: "Swimming",
        image: siteUrl("/img/gallery/Exterior%20%26%20Pool%20(15).jpg"),
        isAccessibleForFree: false,
        publicAccess: false,
      },
    ],
    numberOfRooms: 9,
    numberOfBathroomsTotal: 8.5,
    maximumAttendeeCapacity: 22,
    occupancy: { "@type": "QuantitativeValue", maxValue: 22, unitCode: "C62" },
    floorSize: { "@type": "QuantitativeValue", value: 800, unitCode: "MTK" },
    petsAllowed: false,
    checkinTime: "15:00",
    checkoutTime: "10:00",
    smokingAllowed: false,
    additionalType: "https://schema.org/VacationRental",
    tourBookingPage: "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72",
    knowsLanguage: ["en", "el", "he"],
    isAccessibleForFree: false,
    publicAccess: false,
    hasMap: GOOGLE_MAPS_PLACE,
  };
  return <JsonLd data={data} />;
}

// Service Schema - the two productised offerings, both provided by the Organization node
export function ServicesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": siteUrl("/corporate-retreats#service"),
        name: "Corporate retreats and leadership offsites at Villa Lithos Porto Rafti",
        serviceType: "Corporate retreat venue",
        description:
          "Private-estate venue for company retreats, leadership offsites and working weeks for teams of 10 to 22, on weekday blocks from October to May. Nine bedrooms, two living rooms, attic workshop spaces, heated infinity pool, padel court, gym and sauna, 16 km from Athens International Airport. Private chef, transfers and presentation equipment arranged by the concierge team. Proposals on request.",
        url: siteUrl("/corporate-retreats"),
        provider: { "@id": siteUrl("/#org") },
        areaServed: { "@type": "AdministrativeArea", name: "Attica, Greece" },
        audience: { "@type": "BusinessAudience", audienceType: "Companies and leadership teams of 10 to 22 people" },
        availableLanguage: ["English", "Greek", "Hebrew"],
      },
      {
        "@type": "Service",
        "@id": siteUrl("/#concierge-service"),
        name: "Concierge services at Villa Lithos Porto Rafti",
        serviceType: "Villa concierge",
        description:
          "Private chef, airport and group transfers, boat trips from Rafina, day trips to Athens, Cape Sounion and Brauron, in-villa wellness and activities, arranged by the Goldenberg Luxe concierge team for guests of Villa Lithos Porto Rafti.",
        url: siteUrl("/#services"),
        provider: { "@id": siteUrl("/#org") },
        areaServed: { "@type": "AdministrativeArea", name: "Attica, Greece" },
        availableLanguage: ["English", "Greek", "Hebrew"],
      },
    ],
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

// FAQPage Schema, generated from the same list the visible <FaqSection>
// renders, so the markup always matches the on-page text.
export function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
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
      <ServicesJsonLd />
      <BreadcrumbJsonLd />
      {/* FAQJsonLd is rendered on the homepage only, so pages with their own FAQPage (e.g. /corporate-retreats) do not carry two. */}
    </>
  );
}
