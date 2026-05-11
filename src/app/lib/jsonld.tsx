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

// Canonical Definition Lead used across all schemas
const DEFINITION_LEAD =
  "Villa Lithos Porto Rafti is a 9-bedroom, 800 m² luxury villa in Porto Rafti, Attica, Greece, located 16 km (a 20-minute drive) from Athens International Airport. The property sleeps 22 guests across nine bedrooms and 8.5 bathrooms on a 5,000 m² private estate, with a heated infinity pool, outdoor sauna, jacuzzi, padel court, private gym, and elevator. It is managed by Goldenberg Luxe and is bookable on Booking.com, Airbnb, and direct.";

// Shared external references used in sameAs
const SAME_AS = [
  "https://www.instagram.com/villa.lithos/",
  "https://www.facebook.com/people/Villa-Lithos/61583462218227/",
  "https://www.booking.com/hotel/gr/villa-lithos-porto-rafti.html",
  "https://airbnb.com/h/lithoss",
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72",
];

// Organization Schema
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Villa Lithos Porto Rafti",
    alternateName: SITE.name,
    url: siteUrl(),
    logo: siteUrl("/img/logo.webp"),
    description: DEFINITION_LEAD,
    sameAs: SAME_AS,
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
    alternateName: SITE.name,
    description: DEFINITION_LEAD,
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
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vravronos 70",
      addressLocality: "Porto Rafti",
      addressRegion: "Attica",
      postalCode: "19003",
      addressCountry: "GR",
    },
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
    numberOfRooms: 9,
    numberOfBathroomsTotal: 8.5,
    maximumAttendeeCapacity: 22,
    occupancy: { "@type": "QuantitativeValue", maxValue: 22, unitCode: "C62" },
    floorSize: { "@type": "QuantitativeValue", value: 800, unitCode: "MTK" },
    petsAllowed: false,
    checkinTime: "15:00",
    checkoutTime: "11:00",
    smokingAllowed: false,
    additionalType: "https://schema.org/VacationRental",
    tourBookingPage: "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72",
    knowsLanguage: ["en", "el", "he"],
    isAccessibleForFree: false,
    publicAccess: false,
    hasMap: "https://www.google.com/maps/dir/?api=1&destination=37.9022327,24.0224142",
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

// FAQPage Schema - 20 questions covering the typical AI-engine queries
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
          text: "Villa Lithos Porto Rafti has 9 bedrooms and 8.5 bathrooms on a 5,000 m² private estate. It sleeps up to 22 guests across the nine bedrooms.",
        },
      },
      {
        "@type": "Question",
        name: "Does Villa Lithos have a private pool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Villa Lithos has a heated infinity pool with panoramic sea views, plus a jacuzzi and outdoor sauna. The pool is for the exclusive use of guests staying at the villa.",
        },
      },
      {
        "@type": "Question",
        name: "What amenities are available at Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Villa Lithos has a heated infinity pool, jacuzzi, outdoor sauna, padel court, private gym, elevator, designer kitchen with walk-in pantry, two living rooms, sea and mountain views, WiFi, air conditioning, BBQ area, and private parking.",
        },
      },
      {
        "@type": "Question",
        name: "Is Villa Lithos family-friendly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Villa Lithos was designed for families and multi-generational groups. We provide cribs and baby baths on request. The entrance is private, the layout accommodates groups, and the elevator allows easy access between the four floors for elderly guests and small children.",
        },
      },
      {
        "@type": "Question",
        name: "How far is Villa Lithos from Athens International Airport?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Villa Lithos is 16 km from Athens International Airport (Eleftherios Venizelos), approximately a 20-minute drive on uncongested roads. It is among the closest large luxury villas to the airport in Greece.",
        },
      },
      {
        "@type": "Question",
        name: "How far is Villa Lithos from central Athens?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Villa Lithos is 37 km from central Athens via Attiki Odos, approximately a 40-minute drive. The Acropolis, Plaka, and the National Archaeological Museum are all reachable as a day trip.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum capacity of Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Villa Lithos accommodates up to 22 guests across its nine bedrooms. The dining area and two living rooms are sized for the full group, and the concierge team can arrange catering for larger gatherings.",
        },
      },
      {
        "@type": "Question",
        name: "Does Villa Lithos have a padel court?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Villa Lithos has a private padel court on the estate, which is a rare amenity for villas in Greece. Equipment is provided. Padel is a fast-growing racquet sport popular across the Mediterranean.",
        },
      },
      {
        "@type": "Question",
        name: "What languages does the Villa Lithos team speak?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Villa Lithos concierge team speaks English, Greek, and Hebrew. Communication is available by phone, WhatsApp, email, and Facebook Messenger.",
        },
      },
      {
        "@type": "Question",
        name: "Are pets allowed at Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pets are not allowed at Villa Lithos. The villa interiors and gardens are maintained to high standards and the policy ensures comfort for guests with allergies.",
        },
      },
      {
        "@type": "Question",
        name: "What are the check-in and check-out times at Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check-in is from 15:00 and check-out is until 11:00. Earlier or later times can sometimes be accommodated subject to the booking calendar, and the concierge can arrange a luggage hold either side of these windows.",
        },
      },
      {
        "@type": "Question",
        name: "Is parking available at Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Villa Lithos has secure private parking inside the gated estate, with room for multiple vehicles. The driveway can accommodate full-size SUVs and minivans for larger groups.",
        },
      },
      {
        "@type": "Question",
        name: "Does Villa Lithos offer a private chef service?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The concierge team can arrange a private chef for any meal during your stay. Cuisine options include classic Greek, Mediterranean, kosher, and tailored dietary requirements on advance request.",
        },
      },
      {
        "@type": "Question",
        name: "What is the nearest beach to Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The nearest beach is Avlaki, also known as Erotospilia, at 1.5 km from the villa, approximately a three-minute drive. Avlaki has a sandy, gently sloping shore that is well suited to families with young children.",
        },
      },
      {
        "@type": "Question",
        name: "Can Villa Lithos host corporate retreats?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The two living rooms, designer kitchen, dedicated workspace, and outdoor areas make Villa Lithos suitable for corporate offsites of up to 22 attendees. The concierge can arrange AV equipment, catering, and group activities.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in the rental price?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The rental includes exclusive use of all nine bedrooms, the heated infinity pool, jacuzzi, sauna, padel court, gym, elevator, WiFi, air conditioning, parking, daily housekeeping, and concierge support. Optional services such as a private chef, yacht charter, or airport transfers are arranged separately.",
        },
      },
      {
        "@type": "Question",
        name: "Is Villa Lithos suitable for elderly guests?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Villa Lithos has a private elevator connecting all four floors, which makes the villa accessible for elderly guests and anyone with reduced mobility. Bedrooms and bathrooms include step-free access on the ground floor.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Villa Lithos is bookable directly on villalithosgreece.com, on Booking.com, and on Airbnb. Direct booking via Guesty offers the most flexible rates and access to bespoke concierge services.",
        },
      },
      {
        "@type": "Question",
        name: "What is the cancellation policy for Villa Lithos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cancellation terms are listed on the booking page for each channel. For direct bookings, please contact the concierge team for the applicable terms based on the season and lead time.",
        },
      },
      {
        "@type": "Question",
        name: "Does Villa Lithos offer airport transfers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Airport transfers from Athens International Airport are arranged by the Villa Lithos concierge team on request. The drive is approximately 20 minutes.",
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
