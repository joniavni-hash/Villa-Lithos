import Link from "next/link";
import FooterSocialLinks from "./FooterSocialLinks";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "var(--space-2xl)",
        borderTop: "1px solid var(--border)",
        background: "var(--page-2)",
      }}
    >
      <div className="container-page" style={{ paddingBlock: "var(--space-xl)" }}>
        <div
          style={{
            display: "grid",
            gap: "var(--space-xl)",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "start",
          }}
        >
          {/* Brand Column */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              Villa Lithos
            </p>
            <p
              style={{
                marginTop: "var(--space-xs)",
                color: "var(--muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                maxWidth: "320px",
              }}
            >
              A private villa in Greece. Quiet stays, thoughtful comfort, easy luxury.
            </p>
          </div>

          {/* Navigation Column */}
          <div style={{ display: "grid", gap: "var(--space-sm)" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Explore
            </p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link
                href="/#services"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                }}
              >
                Experiences
              </Link>
              <Link
                href="/#gallery"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                }}
              >
                Gallery
              </Link>
              <Link
                href="/#inquiry"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                }}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div style={{ display: "grid", gap: "var(--space-sm)" }}>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              Contact
            </p>
            <div style={{ display: "grid", gap: "0.625rem" }}>
              <a
                href="mailto:Office@goldenberg-re.com"
                style={{
                  color: "var(--text)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                Office@goldenberg-re.com
              </a>
              <a
                href="tel:+306932757142"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                +30 693 275 7142
              </a>
              <a
                href="https://wa.me/306932757142"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Social Links Column */}
          <FooterSocialLinks />
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: "var(--space-xl)",
            paddingTop: "var(--space-md)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "var(--space-md)",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            color: "var(--muted)",
            fontSize: "0.85rem",
          }}
        >
          <span>© {new Date().getFullYear()} Villa Lithos</span>
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--faint)",
            }}
          >
            Porto Rafti, Greece
          </span>
        </div>
      </div>
    </footer>
  );
}
