import { waLink, WhatsAppIcon } from "./contact";

type Props = {
  /** Identifies the band in the lead event (data-lead-block). */
  block: string;
  title: string;
  text: string;
  /** Pre-filled WhatsApp message, specific to the section the band follows. */
  whatsappText: string;
  /** Label on the green button. */
  whatsappLabel?: string;
  tone?: "light" | "cream" | "dark";
};

const TONES = {
  light: { bg: "#ffffff", border: "1px solid rgba(26,35,50,0.08)", title: "#1A2332", text: "#3D4A5C", sec: "#1A2332" },
  cream: { bg: "#faf8f3", border: "1px solid rgba(26,35,50,0.08)", title: "#1A2332", text: "#3D4A5C", sec: "#1A2332" },
  dark: { bg: "#1A2332", border: "1px solid rgba(255,255,255,0.08)", title: "#ffffff", text: "rgba(255,255,255,0.78)", sec: "#ffffff" },
};

/** Mid-page call to action: WhatsApp (green) plus a jump to the on-page proposal builder. */
export default function RetreatCtaBand({ block, title, text, whatsappText, whatsappLabel = "Talk to us on WhatsApp", tone = "cream" }: Props) {
  const t = TONES[tone];
  return (
    <aside className="rc-band shadow-sm" style={{ background: t.bg, border: t.border }} data-lead-block={block} aria-label={title}>
      <div style={{ maxWidth: 560 }}>
        <p className="text-xl md:text-2xl" style={{ fontFamily: "var(--font-serif), serif", color: t.title, margin: 0 }}>{title}</p>
        <p className="mt-2 text-base" style={{ color: t.text, margin: "8px 0 0" }}>{text}</p>
      </div>
      <div className="rc-band__btns">
        <a href={waLink(whatsappText)} target="_blank" rel="noopener noreferrer" className="rc-wa">
          <WhatsAppIcon /> {whatsappLabel}
        </a>
        <a href="#proposal" className="rc-sec" style={{ color: t.sec }}>
          Request a proposal
        </a>
      </div>
    </aside>
  );
}
