"use client";

// ============================================================================
// Inquiry section (/#inquiry). Direct channels only; no email pipeline.
// ============================================================================

const WHATSAPP_NUMBER = "306932757142";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in booking Villa Lithos. I'd like to know more about availability and rates."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const MESSENGER_URL = "https://m.me/61583462218227";
const EMAIL = "info@villalithos.com";

type ContactData = {
  badge?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

type Gtag = (...args: unknown[]) => void;

function track(channel: string) {
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g === "function") {
    g("event", "contact_click", { event_category: "engagement", event_label: channel, contact_method: channel });
  }
}

const CHANNELS = [
  {
    key: "whatsapp",
    href: WHATSAPP_URL,
    title: "WhatsApp",
    text: "Fastest. Tell us your dates and group size.",
    external: true,
  },
  {
    key: "messenger",
    href: MESSENGER_URL,
    title: "Messenger",
    text: "If you found us on Facebook or Instagram.",
    external: true,
  },
  {
    key: "phone",
    href: "tel:+306932757142",
    title: "+30 693 275 7142",
    text: "Call or leave a voice message.",
    external: false,
  },
  {
    key: "email",
    href: `mailto:${EMAIL}`,
    title: EMAIL,
    text: "For proposals, invoices and group contracts.",
    external: false,
  },
];

export default function ContactForm({ cmsData }: { cmsData?: ContactData }) {
  const badge = cmsData?.badge || "Direct request";
  const title = cmsData?.title || "Tell us your dates";
  const subtitle =
    cmsData?.subtitle ||
    "No forms, no waiting list. The same team that meets you at the gate replies, usually within minutes during business hours.";

  return (
    <section id="inquiry" className="vl-inquiry vl-section" aria-labelledby="inquiry-title">
      <div className="vl-container vl-inquiry__grid">
        <div className="vl-reveal">
          <span className="vl-label" style={{ display: "block", marginBottom: 18 }}>{badge}</span>
          <h2 id="inquiry-title" className="vl-h2" style={{ marginBottom: 20 }}>{title}</h2>
          <p className="vl-lead">{subtitle}</p>
          <p className="vl-body" style={{ marginTop: 20, color: "var(--vl-mute)" }}>
            Rates are quoted on request and depend on season and group size. Direct requests get the most
            flexible terms and full access to the concierge team.
          </p>
        </div>

        <div className="vl-channels vl-reveal" data-delay="1">
          {CHANNELS.map((c) => (
            <a
              key={c.key}
              href={c.href}
              className="vl-channel"
              onClick={() => track(c.key)}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="vl-channel__title">{c.title}</span>
              <span className="vl-channel__text">{c.text}</span>
              <span className="vl-channel__arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
