import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Villa Lithos | Luxury Villa in Porto Rafti, Greece",
  description: "Book a private luxury villa with pool and sea views in Porto Rafti, Greece. Perfect for families. Summer 2026 availability open.",
};

export default function WelcomePage() {
  const s = {
    page: { minHeight: "100vh", fontFamily: "var(--font-serif, Georgia, serif)", color: "#2c2c2c", background: "#fff" } as React.CSSProperties,
    hero: { position: "relative" as const, minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" as const, background: "linear-gradient(180deg, #1a2332 0%, #2a3a4e 100%)", color: "#fff", padding: "80px 24px 60px" },
    heroOverlay: { position: "absolute" as const, inset: 0, background: "url(/images/hero-bg.jpg) center/cover no-repeat", opacity: 0.3 },
    heroContent: { position: "relative" as const, zIndex: 1, maxWidth: 720 },
    badge: { display: "inline-block", background: "rgba(139,154,107,0.85)", color: "#fff", fontSize: "0.85rem", fontWeight: 600, padding: "6px 18px", borderRadius: 20, marginBottom: 20, letterSpacing: 1, textTransform: "uppercase" as const },
    h1: { fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 18px" },
    subtitle: { fontSize: "clamp(1rem, 2.5vw, 1.25rem)", opacity: 0.9, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.6 },
    cta: { display: "inline-block", padding: "16px 44px", background: "#8B9A6B", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: "1.15rem", textDecoration: "none", letterSpacing: 0.5, transition: "background 0.2s" },
    section: { padding: "64px 24px", maxWidth: 960, margin: "0 auto" },
    sectionTitle: { fontSize: "1.6rem", fontWeight: 700, textAlign: "center" as const, marginBottom: 40, color: "#2c2c2c" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 },
    card: { background: "#f8f6f1", borderRadius: 12, padding: "32px 24px", textAlign: "center" as const },
    cardIcon: { fontSize: "2rem", marginBottom: 12 },
    cardTitle: { fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "#2c2c2c" },
    cardText: { fontSize: "0.95rem", color: "#555", lineHeight: 1.6 },
    testimonial: { background: "#f8f6f1", borderRadius: 12, padding: "40px 32px", maxWidth: 640, margin: "0 auto", textAlign: "center" as const },
    quote: { fontSize: "1.1rem", fontStyle: "italic", color: "#444", lineHeight: 1.7, marginBottom: 16 },
    author: { fontSize: "0.95rem", fontWeight: 600, color: "#2c2c2c" },
    details: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, textAlign: "center" as const, padding: "40px 24px", maxWidth: 800, margin: "0 auto" },
    detailItem: { padding: 16 },
    detailValue: { fontSize: "1.8rem", fontWeight: 700, color: "#8B9A6B", marginBottom: 4 },
    detailLabel: { fontSize: "0.9rem", color: "#666" },
    finalCta: { textAlign: "center" as const, padding: "64px 24px", background: "linear-gradient(180deg, #fff 0%, #f8f6f1 100%)" },
    finalTitle: { fontSize: "1.8rem", fontWeight: 700, marginBottom: 16, color: "#2c2c2c" },
    finalText: { fontSize: "1.05rem", color: "#555", marginBottom: 32, maxWidth: 520, margin: "0 auto 32px" },
    footer: { textAlign: "center" as const, padding: "32px 24px", fontSize: "0.85rem", color: "#999", borderTop: "1px solid #eee" },
  };

  return (
    <div style={s.page}>
      {/* Hero */}
      <section style={s.hero}>
        <div style={s.heroOverlay} />
        <div style={s.heroContent}>
          <span style={s.badge}>Summer 2026 Now Booking</span>
          <h1 style={s.h1}>Your Private Luxury Villa in Greece</h1>
          <p style={s.subtitle}>Villa Lithos in Porto Rafti: a stunning private retreat with pool, sea views, and space for the whole family, just 30 minutes from Athens.</p>
          <Link href="/#inquiry" style={s.cta}>Check Availability</Link>
        </div>
      </section>

      {/* Key Features */}
      <section style={s.section}>
        <h2 style={s.sectionTitle}>Why Choose Villa Lithos</h2>
        <div style={s.grid}>
          <div style={s.card}>
            <div style={s.cardIcon}>🏖</div>
            <h3 style={s.cardTitle}>Private Pool &amp; Sea Views</h3>
            <p style={s.cardText}>Enjoy your own pool with panoramic views of the Aegean Sea. Complete privacy for your family.</p>
          </div>
          <div style={s.card}>
            <div style={s.cardIcon}>👨‍👩‍👧‍👦</div>
            <h3 style={s.cardTitle}>Perfect for Families</h3>
            <p style={s.cardText}>5 bedrooms, spacious living areas, fully equipped kitchen, and a safe garden for children.</p>
          </div>
          <div style={s.card}>
            <div style={s.cardIcon}>🏛</div>
            <h3 style={s.cardTitle}>Near Athens &amp; History</h3>
            <p style={s.cardText}>30 minutes from Athens airport. Easy access to the Acropolis, Sounion, and Greek islands.</p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <div style={s.details}>
        <div style={s.detailItem}><div style={s.detailValue}>5</div><div style={s.detailLabel}>Bedrooms</div></div>
        <div style={s.detailItem}><div style={s.detailValue}>12</div><div style={s.detailLabel}>Guests</div></div>
        <div style={s.detailItem}><div style={s.detailValue}>30 min</div><div style={s.detailLabel}>From Athens</div></div>
        <div style={s.detailItem}><div style={s.detailValue}>Private</div><div style={s.detailLabel}>Pool &amp; Garden</div></div>
      </div>

      {/* Testimonial */}
      <section style={{ ...s.section, paddingTop: 20 }}>
        <div style={s.testimonial}>
          <p style={s.quote}>"An unforgettable family holiday. The villa is even more beautiful than the photos. The kids loved the pool and we loved the sunsets."</p>
          <p style={s.author}>A Recent Guest</p>
        </div>
      </section>

      {/* Final CTA */}
      <section style={s.finalCta}>
        <h2 style={s.finalTitle}>Ready to Book Your Greek Getaway?</h2>
        <p style={s.finalText}>Summer 2026 dates are filling up. Send us an inquiry and we will get back to you within 24 hours.</p>
        <Link href="/#inquiry" style={s.cta}>Inquire Now</Link>
      </section>

      {/* Minimal Footer */}
      <footer style={s.footer}>
        <p>Villa Lithos, Porto Rafti, Greece | info@villalithos.com | +30 693 275 7142</p>
        <p style={{ marginTop: 8 }}><Link href="/" style={{ color: "#8B9A6B", textDecoration: "none" }}>Visit Full Website</Link></p>
      </footer>
    </div>
  );
}
