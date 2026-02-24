import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Luxury Villa Near Athens: The Ultimate Family Retreat at Villa Lithos",
  description: "Villa Lithos in Porto Rafti offers 9 bedrooms, a heated infinity pool, and space for 22 guests. The perfect luxury base for families exploring the Athens Riviera.",
  keywords: ["luxury villa near athens","villa lithos porto rafti","large family villa greece","villa with pool athens riviera","9 bedroom villa greece","porto rafti luxury accommodation","group villa rental athens","heated infinity pool villa greece","family reunion villa greece","luxury holiday home attica","villa near athens airport","exclusive villa rental greece summer 2026"],
  openGraph: { type: "article", title: "Luxury Villa Near Athens: The Ultimate Family Retreat at Villa Lithos", description: "9 bedrooms, heated infinity pool, and space for 22 guests in Porto Rafti." },
  alternates: { canonical: "https://www.villalithosgreece.com/articles/luxury-villa-lithos-family-retreat" },
};

const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: "Luxury Villa Near Athens: The Ultimate Family Retreat at Villa Lithos", datePublished: "2026-02-24", author: { "@type": "Organization", name: "Villa Lithos" }, url: "https://www.villalithosgreece.com/articles/luxury-villa-lithos-family-retreat" };

const s = {
  article: { maxWidth: 780, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.8 } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", color: "#2c2c2c", marginBottom: 16, lineHeight: 1.2 } as React.CSSProperties,
  date: { color: "#888", fontSize: "0.95rem", marginBottom: 40, display: "block" } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: "#2c2c2c", marginTop: 48, marginBottom: 12 } as React.CSSProperties,
  p: { marginBottom: 20, fontSize: "1.07rem" } as React.CSSProperties,
  cta: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.05rem", marginTop: 12 } as React.CSSProperties,
  back: { display: "inline-block", marginTop: 32, color: "#7a8c6e", textDecoration: "none", fontSize: "0.97rem" } as React.CSSProperties,
};

export default function Article() {
  return (
    <article style={s.article}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 style={s.h1}>Luxury Villa Near Athens: The Ultimate Family Retreat at Villa Lithos</h1>
      <span style={s.date}>February 2026 | Villa Lithos Guide</span>

      <p style={s.p}>Finding a holiday home that comfortably fits an extended family or a large group of friends is one of the biggest challenges of planning a trip to Greece. Hotels mean separate rooms on different floors. Smaller villas mean splitting the group across multiple properties. Villa Lithos solves this problem entirely.</p>

      <h2 style={s.h2}>Where Is Villa Lithos?</h2>
      <p style={s.p}>Villa Lithos sits on a 5,000-square-metre hillside plot in Porto Rafti, a coastal town on the eastern shore of Attica. It is 16 kilometres from Athens International Airport (a 20-minute drive) and 37 kilometres from central Athens. The villa overlooks the Aegean Sea and is surrounded by olive groves and Mediterranean gardens. Despite feeling completely private and secluded, you are just minutes from beaches, tavernas, and local shops.</p>

      <h2 style={s.h2}>Nine Bedrooms for Up to 22 Guests</h2>
      <p style={s.p}>The villa spans approximately 800 square metres across multiple levels, offering nine bedrooms that sleep up to 22 guests. Bedrooms range from master suites with sea-view balconies to cosy twin rooms suitable for children. Every room is air-conditioned and furnished to a high standard, with quality linens, blackout curtains, and modern bathrooms. The layout means families can have their own private spaces while sharing the communal living areas.</p>

      <h2 style={s.h2}>A Heated Infinity Pool with Aegean Views</h2>
      <p style={s.p}>The centrepiece of Villa Lithos is its heated infinity pool, set on a terrace overlooking the sea. The pool is large enough for the whole group and is heated to a comfortable temperature even in the shoulder months of May and early June. Sun loungers, parasols, and shaded seating areas surround the pool, making it the natural gathering point for lazy afternoons.</p>

      <h2 style={s.h2}>Sports, Fitness, and Entertainment</h2>
      <p style={s.p}>Villa Lithos goes beyond what most holiday homes offer. The property includes a private tennis court, a fully equipped gym, and a games room with table tennis and a pool table. For children and teenagers, this means there is always something to do without leaving the property. For adults, early morning workouts or evening tennis matches become part of the holiday rhythm.</p>

      <h2 style={s.h2}>Outdoor Living and Dining</h2>
      <p style={s.p}>The Mediterranean climate means you will spend most of your time outdoors. Villa Lithos features multiple terraces, a large barbecue area with a wood-fired oven, and outdoor dining tables that seat the entire group. Imagine long summer evenings with home-cooked Greek food, local wine, and the sound of cicadas as the sun sets over the Aegean. The gardens are landscaped with native plants and offer quiet corners for reading or simply enjoying the view.</p>

      <h2 style={s.h2}>Professional Management and Concierge</h2>
      <p style={s.p}>Villa Lithos is professionally managed to ensure every detail is taken care of. Before your arrival, the team can arrange airport transfers, stock the kitchen with groceries, and organise extras such as a private chef, a boat charter, or a guided tour. During your stay, a local contact is available for anything you need. The villa is cleaned and maintained to hotel standards, so you can focus entirely on enjoying your holiday.</p>

      <h2 style={s.h2}>The Best Months to Visit</h2>
      <p style={s.p}>The villa is available for bookings from May through September. May and June offer warm weather, wildflowers, and quieter beaches. July and August are peak summer with the hottest temperatures and the liveliest local atmosphere. September brings softer light, warm seas, and fewer crowds. Each month has its own character, and the heated pool means swimming is comfortable throughout the season.</p>

      <h2 style={s.h2}>Why Choose a Villa Over a Hotel?</h2>
      <p style={s.p}>For large families and groups, a villa like Villa Lithos offers something hotels simply cannot match. You have complete privacy, your own schedule, a private pool, and the freedom to cook, eat, and relax on your own terms. Children can play freely in the gardens while adults enjoy the terrace. There is no waiting for restaurant tables, no shared pool with strangers, and no need to keep to hotel hours. It is your home in Greece, for however long you choose to stay.</p>

      <h2 style={s.h2}>Book Your Stay at Villa Lithos</h2>
      <p style={s.p}>Villa Lithos is ideal for family reunions, milestone celebrations, or simply a generous summer holiday with the people you love most. With nine bedrooms, world-class facilities, and a location that combines privacy with easy access to Athens and the coast, it is one of the finest large villas available in the Athens Riviera.</p>

      <Link href="/#contact" style={s.cta}>Request Availability</Link>
      <br />
      <Link href="/articles" style={s.back}>&larr; Back to Articles</Link>
    </article>
  );
}
