import Link from "next/link";

// Compact "stay with us" card placed right after the introduction of the
// high-traffic guides, so readers planning a trip see the villa before they
// scroll away. Facts only from the live site (llms.txt key facts).
// Clicks are measured by <LeadTracker /> through data-lead-block.

const WHATSAPP = `https://wa.me/306932757142?text=${encodeURIComponent(
  "Hi, I found Villa Lithos through your Porto Rafti guide. I'd like to ask about availability for our group."
)}`;

type Props = {
  /** One short sentence tying the guide's topic to the villa. */
  lead: string;
  /** Identifies the guide in the analytics event. */
  source: string;
};

const s = {
  box: {
    margin: "8px 0 36px",
    padding: "18px 22px",
    background: "#faf8f3",
    border: "1px solid #e6dfcc",
    borderLeft: "3px solid #7a8c6e",
    borderRadius: 8,
    fontFamily: "var(--font-sans), sans-serif",
    lineHeight: 1.6,
  } as React.CSSProperties,
  kicker: { fontSize: 12, fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase" as const, color: "#7a8c6e", margin: 0 } as React.CSSProperties,
  text: { fontSize: "1rem", color: "#3a3a3a", margin: "6px 0 14px" } as React.CSSProperties,
  row: { display: "flex", flexWrap: "wrap" as const, gap: 10 } as React.CSSProperties,
  primary: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "9px 20px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" } as React.CSSProperties,
  secondary: { display: "inline-block", color: "#5f7052", padding: "9px 4px", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem" } as React.CSSProperties,
};

export default function StayWithUs({ lead, source }: Props) {
  return (
    <aside style={s.box} data-lead-block={`stay-${source}`} aria-label="Stay at Villa Lithos">
      <p style={s.kicker}>Staying in Porto Rafti?</p>
      <p style={s.text}>
        {lead}{" "}
        <strong>Villa Lithos</strong> is a privately owned 9-bedroom estate for up to 22 guests, 20 minutes from Athens airport, with a heated infinity pool, sauna, gym and padel court.
      </p>
      <div style={s.row}>
        <a href={WHATSAPP} target="_blank" rel="noopener" style={s.primary}>Ask about your dates on WhatsApp</a>
        <Link href="/luxury-villa-porto-rafti" style={s.secondary}>See the villa &rarr;</Link>
      </div>
    </aside>
  );
}
