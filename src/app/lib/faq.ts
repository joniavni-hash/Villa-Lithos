// Single source for the homepage FAQ. The visible <FaqSection> and the
// FAQPage JSON-LD are both generated from this list, so the structured data
// always matches what visitors can read on the page (Google requirement).
// Answers are plain text on purpose: no markup, so both outputs stay identical.

export type FaqCategory = "booking" | "house" | "family" | "getting" | "services";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

export const FAQ_CATEGORIES: { id: FaqCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "booking", label: "Booking & stay" },
  { id: "house", label: "The house" },
  { id: "family", label: "Families" },
  { id: "getting", label: "Getting here" },
  { id: "services", label: "Services" },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "book",
    category: "booking",
    question: "How do I book Villa Lithos?",
    answer:
      "Book directly on this website, or through Airbnb and Booking.com. Direct bookings get the most flexible terms and full access to our concierge team.",
  },
  {
    id: "cancellation",
    category: "booking",
    question: "What is the cancellation policy?",
    answer:
      "Every direct booking offers two rates. Flexible: free cancellation up to a set date before arrival. Non-refundable: a lower rate that cannot be refunded. Payment is in three instalments: a deposit on booking, a second payment six months before arrival and the balance two months before arrival. The full terms for your dates are shown before you pay.",
  },
  {
    id: "included",
    category: "booking",
    question: "What is included in the rental?",
    answer:
      "Exclusive use of the whole estate: nine bedrooms, the infinity pool, jacuzzi, outdoor sauna, padel court, gym, elevator, Wi-Fi, air conditioning, private parking and concierge support. Daily housekeeping is available on request. Chef, transfers and experiences are booked separately.",
  },
  {
    id: "guests",
    category: "booking",
    question: "How many guests can stay?",
    answer:
      "Up to 22 guests across nine bedrooms. The dining area and both living rooms are sized for the full group.",
  },
  {
    id: "times",
    category: "booking",
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in from 15:00, check-out by 11:00. Earlier arrival or later departure can often be arranged, depending on the calendar.",
  },
  {
    id: "languages",
    category: "booking",
    question: "What languages does the team speak?",
    answer:
      "English, Greek and Hebrew, by phone, WhatsApp or email.",
  },
  {
    id: "bedrooms",
    category: "house",
    question: "How many bedrooms and bathrooms are there?",
    answer:
      "Nine bedrooms and 8.5 bathrooms across four floors, connected by an elevator, on a 5,000 m² private estate.",
  },
  {
    id: "pool",
    category: "house",
    question: "Is the pool private?",
    answer:
      "Yes. The infinity pool, jacuzzi and outdoor sauna are for the exclusive use of guests staying at the villa, with open views over the Aegean.",
  },
  {
    id: "padel",
    category: "house",
    question: "Is there really a padel court?",
    answer:
      "Yes, a private padel court on the estate, with rackets and balls provided. A coach can be booked through the concierge.",
  },
  {
    id: "quiet",
    category: "house",
    question: "Are there quiet hours?",
    answer: "Yes, from 22:00 to 08:00.",
  },
  {
    id: "pets",
    category: "house",
    question: "Are pets allowed?",
    answer: "Pets are not allowed, out of consideration for guests with allergies.",
  },
  {
    id: "parking",
    category: "house",
    question: "Where do we park?",
    answer: "Inside the gate, along the paved drive, with room for several cars including minivans.",
  },
  {
    id: "family",
    category: "family",
    question: "Is the villa suitable for young children and grandparents?",
    answer:
      "Yes. An elevator connects all four floors, and cribs and baby baths are available on request. The nearest beach, Avlaki, is sandy and shallow.",
  },
  {
    id: "location",
    category: "getting",
    question: "Where is Villa Lithos located in Greece?",
    answer:
      "In Porto Rafti, a coastal town in East Attica on the Greek mainland, 16 km from Athens International Airport. It is not the villa of the same name on Milos or in the Mani.",
  },
  {
    id: "airport",
    category: "getting",
    question: "How far is Athens airport?",
    answer:
      "16 km, about 20 minutes by car. A group landing in the morning can be at the pool the same afternoon.",
  },
  {
    id: "athens",
    category: "getting",
    question: "How far is central Athens?",
    answer:
      "About 40 to 60 minutes by car depending on traffic. Cape Sounion is roughly 40 minutes down the coast.",
  },
  {
    id: "beach",
    category: "getting",
    question: "What is the nearest beach?",
    answer: "Avlaki (Erotospilia), 1.5 km away, about a three-minute drive.",
  },
  {
    id: "chef",
    category: "services",
    question: "Can you arrange a private chef?",
    answer:
      "Yes, for any meal of your stay: Greek, Mediterranean or tailored to dietary needs, with advance notice.",
  },
  {
    id: "transfers",
    category: "services",
    question: "Do you arrange airport transfers?",
    answer:
      "Yes. The concierge books transfers in any vehicle size, from a sedan to a coach for the whole group.",
  },
  {
    id: "retreats",
    category: "services",
    question: "Can Villa Lithos host a company retreat?",
    answer:
      "Yes, for teams of up to 22, with working space, catering and group activities arranged by the concierge. See the Corporate Retreats page for details.",
  },
];
