// Guest reviews shown on the homepage, quoted verbatim from their source.
// Rules: no edits to wording ("[…]" marks a cut), first name plus surname
// initial only, no guest photos, no staff names. Do NOT wrap these in
// Review / AggregateRating structured data: Google treats reviews a business
// shows about itself as self-serving and forbids aggregating ratings from
// other sites.

export type ReviewSource = "Airbnb" | "Google";

export type Testimonial = {
  quote: string;
  name: string;
  source: ReviewSource;
  meta?: string; // stay date and group, when the source shows them
};

export const AIRBNB_URL = "https://www.airbnb.com/rooms/1531792369426111020";
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=13572198104547090834";

// Airbnb summary, as shown on the listing (update when it changes).
export const AIRBNB_SUMMARY = {
  rating: "5.0",
  count: 7,
  badge: "Guest favourite · Top 10% of homes",
  categories: ["Cleanliness", "Accuracy", "Check-in", "Communication", "Location", "Value"],
};

export const FEATURED_TESTIMONIAL: Testimonial = {
  quote:
    "Our stay at Villa Lithos was absolutely exceptional. The villa is stunning, with breathtaking views and an incredible atmosphere.",
  name: "Ema",
  source: "Airbnb",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We came as two families to Villa Lithos and it was perfect. […] The best part was the padel court. We’re not padel players, but the kids played for at least two hours a day, and even we adults enjoyed it a lot.",
    name: "Guy",
    source: "Airbnb",
    meta: "November 2025 · Two families",
  },
  {
    quote:
      "One of the best villas we’ve ever stayed in. Villa Lithos combines luxury, comfort, and privacy in a way that’s hard to find.",
    name: "Noam B.",
    source: "Google",
    meta: "2026",
  },
  {
    quote:
      "Wonderful Villa with stunning view, beautiful garden and premium interior/rooms. Highlights are the pool with jacuzzi, sauna and barbecue area.",
    name: "Jennifer L.",
    source: "Google",
    meta: "2026 · Family and friends",
  },
  {
    quote:
      "Everything was organized to the highest standard. The house had absolutely everything we needed. It was beautifully designed, spotless, and exceptionally well maintained.",
    name: "Yahav E.",
    source: "Google",
    meta: "2026",
  },
  {
    quote:
      "Great modern villa with many rooms, awesome swimming pool, large kitchen and many living areas. We stayed there for 8 days and the management team were very responsive during our stay.",
    name: "Omer T.",
    source: "Google",
    meta: "2026 · 8-day stay",
  },
  {
    quote:
      "If you’re thinking about booking Villa Lithos, just do it! Don’t even think twice.",
    name: "Shilo",
    source: "Airbnb",
    meta: "February 2026 · Group trip",
  },
];
