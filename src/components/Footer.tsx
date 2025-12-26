import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t" style={{ borderColor: "var(--border-soft)" }}>
      <div className="container-page" style={{ paddingBlock: "2.2rem" }}>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "1.2fr 1fr",
            alignItems: "start",
          }}
        >
          <div>
            <div className="kicker">Villa Lithos</div>
            <div
              style={{
                marginTop: 10,
                fontFamily: 'ui-serif, Georgia, "Times New Roman", Times, serif',
                letterSpacing: ".06em",
                textTransform: "uppercase",
                fontSize: "1.25rem",
                color: "var(--text)",
              }}
            >
              Private stays in Greece
            </div>
            <p style={{ marginTop: 10, color: "var(--muted)", lineHeight: 1.8, maxWidth: 62 * 16 }}>
              For availability, rates, and tailored recommendations, send an inquiry and we’ll get back to you promptly.
            </p>
          </div>

          <div style={{ display: "grid", gap: 10, justifyItems: "start" }}>
            <div className="kicker">Explore</div>
            <Link className="btn link" href="/#services">
              Services
            </Link>
            <Link className="btn link" href="/#gallery">
              Gallery
            </Link>
            <Link className="btn link" href="/#inquiry">
              Contact
            </Link>

            <div className="divider" style={{ marginTop: 10, marginBottom: 6, width: "100%" }} />

            <div style={{ color: "var(--muted)", fontSize: ".92rem", lineHeight: 1.7 }}>
              <div>
                Email:{" "}
                <a href="mailto:reservations@villalithos.com" style={{ color: "var(--text)" }}>
                  reservations@villalithos.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginTop: 26, marginBottom: 16 }} />

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            color: "var(--muted)",
            fontSize: ".9rem",
          }}
        >
          <span>© {new Date().getFullYear()} Villa Lithos. All rights reserved.</span>
          <span style={{ letterSpacing: ".10em", textTransform: "uppercase" }}>
            Crafted for refined stays
          </span>
        </div>
      </div>
    </footer>
  );
}
