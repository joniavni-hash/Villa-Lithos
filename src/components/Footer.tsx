import Link from "next/link";
import FooterSocialLinks from "./FooterSocialLinks";

// Monochrome WhatsApp SVG Icon
function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ verticalAlign: "middle", marginRight: "6px" }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
          <div style={{ textAlign: "center" }}>
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
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              A private villa in Greece. Quiet stays, thoughtful comfort, easy luxury.
            </p>
            {/* Message text placeholder */}
            <p
              style={{
                marginTop: "var(--space-sm)",
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                fontStyle: "italic",
                maxWidth: "320px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Experience the beauty of Porto Rafti and create unforgettable memories with your loved ones.
            </p>
          </div>

          {/* Navigation Column */}
          <div style={{ display: "grid", gap: "var(--space-sm)", textAlign: "center" }}>
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
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
              <Link
                href="/#services"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                }}
              >
                Concierge
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
                href="/#location"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "color 0.2s",
                }}
              >
                Location
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
          <div style={{ display: "grid", gap: "var(--space-sm)", textAlign: "center" }}>
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
                href="mailto:info@villalithos.com"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                info@villalithos.com
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
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WhatsAppIcon />
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
          <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="https://goldenberg-luxe.guestybookings.com/en"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--muted)",
                textDecoration: "none",
                fontSize: "0.8rem",
                transition: "color 0.2s",
              }}
            >
              Managed by Goldenberg
            </a>
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
      </div>
    </footer>
  );
}
