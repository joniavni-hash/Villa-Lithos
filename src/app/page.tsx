import dynamic from "next/dynamic";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import MarqueeLine from "@/components/MarqueeLine";
import UltraLuxuryGallery from "@/components/UltraLuxuryGallery";
import EstateSection from "@/components/EstateSection";
import { getPageData, getGlobalData } from "@/app/lib/tina";

// Dynamic imports for below-fold heavy components
const VillaIntroSection = dynamic(
  () => import("@/components/VillaIntroSection"),
  { ssr: true }
);

const ConciergeSection = dynamic(
  () => import("@/components/ConciergeSection"),
  { ssr: true }
);

const VillaMapSection = dynamic(
  () => import("@/components/VillaMapSection"),
  { ssr: true }
);

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  ssr: true,
});

// Featured content shown between Concierge and Gallery to give visitors
// a path into the editorial content before reaching the contact form.
const guides = [
  {
    href: "/luxury-villa-porto-rafti",
    label: "Luxury Villa Guide",
    title: "A 9-Bedroom Estate Near Athens",
    excerpt: "The full detail on Villa Lithos Porto Rafti, distances, amenities, and the wider Porto Rafti context.",
  },
  {
    href: "/villas-near-athens-airport",
    label: "Closest to ATH",
    title: "20 Minutes From Athens Airport",
    excerpt: "Drive-time comparison of the leading villas near Eleftherios Venizelos and why proximity matters.",
  },
  {
    href: "/large-family-villa-greece",
    label: "Large Groups",
    title: "Best Villas in Greece for Groups of 20",
    excerpt: "Where the 18-to-22 guest villas actually are, with regional capacity and price-band tables.",
  },
  {
    href: "/porto-rafti-vs-mykonos-vs-santorini",
    label: "Comparison",
    title: "Porto Rafti vs Mykonos vs Santorini",
    excerpt: "Honest 2026 comparison by airport access, beach safety, crowding, cost, and day-trip range.",
  },
  {
    href: "/corporate-retreats",
    label: "Corporate Retreats",
    title: "Company Offsites 20 Minutes From ATH",
    excerpt: "A private estate for teams of 10 to 22: rooming plans, working spaces, sample agenda, and weekday availability.",
  },
];

const featuredArticles = [
  {
    href: "/articles/wellness-retreats-greece-mainland",
    label: "Wellness",
    title: "Wellness Retreats in Greece",
    excerpt: "Practical guide to mainland options for private villa retreats with full wellness amenities.",
  },
  {
    href: "/articles/day-trips-from-porto-rafti",
    label: "Day Trips",
    title: "Day Trips From Porto Rafti",
    excerpt: "Five practical day trips, Acropolis, Sounion, Brauron, Marathon, and ferries to the islands.",
  },
  {
    href: "/articles/best-beaches-porto-rafti",
    label: "Beaches",
    title: "Best Beaches in Porto Rafti",
    excerpt: "Eleven beaches with sand vs pebble, wind exposure, and family suitability rated.",
  },
  {
    href: "/articles/eating-in-porto-rafti",
    label: "Food and Wine",
    title: "Eating Like a Local in Porto Rafti",
    excerpt: "Fish tavernas, traditional bakeries, regional Attic specialities, and Greek wine.",
  },
];

function FeaturedContent() {
  const sectionStyle: React.CSSProperties = {
    background: "#faf8f3",
    padding: "80px 24px",
    fontFamily: "var(--font-sans), 'DM Sans', sans-serif",
  };
  const containerStyle: React.CSSProperties = {
    maxWidth: 1140,
    margin: "0 auto",
  };
  const kickerStyle: React.CSSProperties = {
    color: "#7a8c6e",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 14,
    textAlign: "center",
  };
  const headingStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif), 'DM Serif Display', serif",
    fontSize: "2rem",
    color: "#2c2c2c",
    textAlign: "center",
    marginBottom: 14,
    marginTop: 0,
    lineHeight: 1.2,
  };
  const introStyle: React.CSSProperties = {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    maxWidth: 640,
    margin: "0 auto 48px auto",
    lineHeight: 1.7,
  };
  const subheadingStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif), 'DM Serif Display', serif",
    fontSize: "1.25rem",
    color: "#2c2c2c",
    marginTop: 0,
    marginBottom: 20,
    textAlign: "left",
  };
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
    marginBottom: 56,
  };
  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 12,
    padding: "26px 24px",
    textDecoration: "none",
    color: "inherit",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    border: "1px solid #ece7d8",
    transition: "transform 0.18s, box-shadow 0.18s",
    display: "flex",
    flexDirection: "column",
  };
  const cardLabelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#7a8c6e",
    marginBottom: 10,
  };
  const cardTitleStyle: React.CSSProperties = {
    fontFamily: "var(--font-serif), 'DM Serif Display', serif",
    fontSize: "1.18rem",
    color: "#2c2c2c",
    margin: "0 0 10px 0",
    lineHeight: 1.3,
  };
  const cardExcerptStyle: React.CSSProperties = {
    fontSize: 14,
    color: "#5e5e5e",
    lineHeight: 1.6,
    marginBottom: 14,
    flex: 1,
  };
  const readMoreStyle: React.CSSProperties = {
    color: "#7a8c6e",
    fontSize: 14,
    fontWeight: 600,
  };
  const ctaWrapStyle: React.CSSProperties = {
    textAlign: "center",
    marginTop: 8,
  };
  const ctaLinkStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 30px",
    borderRadius: 8,
    background: "transparent",
    color: "#7a8c6e",
    border: "2px solid #7a8c6e",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 0.5,
  };

  return (
    <section style={sectionStyle} aria-label="Featured guides and articles">
      <div style={containerStyle}>
        <p style={kickerStyle}>Discover</p>
        <h2 style={headingStyle}>The Villa Lithos Porto Rafti Guide</h2>
        <p style={introStyle}>
          Long-form guides to staying near Athens International Airport, planning a multi-generational trip, and choosing between the mainland and the islands. Updated for 2026.
        </p>

        <h3 style={subheadingStyle}>Guides</h3>
        <div style={gridStyle}>
          {guides.map((g) => (
            <Link key={g.href} href={g.href} style={cardStyle}>
              <span style={cardLabelStyle}>{g.label}</span>
              <h4 style={cardTitleStyle}>{g.title}</h4>
              <p style={cardExcerptStyle}>{g.excerpt}</p>
              <span style={readMoreStyle}>Read more &rarr;</span>
            </Link>
          ))}
        </div>

        <h3 style={subheadingStyle}>Recent Articles</h3>
        <div style={gridStyle}>
          {featuredArticles.map((a) => (
            <Link key={a.href} href={a.href} style={cardStyle}>
              <span style={cardLabelStyle}>{a.label}</span>
              <h4 style={cardTitleStyle}>{a.title}</h4>
              <p style={cardExcerptStyle}>{a.excerpt}</p>
              <span style={readMoreStyle}>Read more &rarr;</span>
            </Link>
          ))}
        </div>

        <div style={ctaWrapStyle}>
          <Link href="/articles" style={ctaLinkStyle}>Browse all articles &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [page, global] = await Promise.all([getPageData(), getGlobalData()]);

  return (
    <main>
      {/* Above-fold: HeroBanner loaded eagerly with priority image */}
      <HeroBanner
        kicker={page?.hero?.kicker || "WELCOME TO"}
        title={page?.hero?.title || "Villa Lithos Porto Rafti"}
        subtitle={page?.hero?.subtitle || "A 9-bedroom luxury villa in Porto Rafti, 20 minutes from Athens International Airport."}
        videoSrcMobile="/videos/hero.mp4"
        videoSrcDesktop="/videos/heroPC.mp4"
        poster={page?.hero?.image || "/img/hero.webp"}
        imageUrl={page?.hero?.image || "/img/hero.webp"}
        contactHref="/#inquiry"
        galleryHref="/#gallery"
      />

      {/* MarqueeLine is lightweight, keep above fold */}
      <MarqueeLine text={page?.marquee?.text || undefined} />

      {/* Under-fold sections */}
      <VillaIntroSection
        data={page?.villaIntro || undefined}
        amenitiesData={page?.amenities || undefined}
        bookingUrl={global?.header?.bookingUrl || undefined}
      />

      {/* Who is behind the villa, anchor /#estate (also /about) */}
      <EstateSection />

      <ConciergeSection data={page?.concierge || undefined} />

      {/* Featured guides and articles, distributes traffic to GEO landing pages */}
      <FeaturedContent />

      {/* Gallery section - preserve id for anchor */}
      <div id="gallery">
        <UltraLuxuryGallery
          title={page?.gallery?.title || "Gallery"}
          subtitle={page?.gallery?.subtitle || "A Visual Journey"}
          description={page?.gallery?.description || undefined}
        />
      </div>

      {/* Map section - preserve id for anchor */}
      <div id="location">
        <VillaMapSection data={page?.map || undefined} />
      </div>

      {/* Contact/Inquiry section - preserve ids for anchor */}
      <div id="contact" className="">
        <div id="inquiry">
          <ContactForm cmsData={page?.contact || undefined} />
        </div>
      </div>
    </main>
  );
}
