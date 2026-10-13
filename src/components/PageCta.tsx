import { whatsappHref, whatsappTextForPath } from "@/app/lib/whatsapp";

// End-of-page call to action used by the guides and the commercial pages:
// WhatsApp first (the fastest reply), direct booking second. Replaces the old
// "Inquire Now" link that jumped to the homepage form, where the visitor had
// to choose a channel again and the click was never counted as a lead.
// Clicks are measured by <LeadTracker /> through data-lead-block="end-cta".

const BOOKING_URL = "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";

type Props = {
  /** Path of the page, used in the pre-filled WhatsApp message. */
  path: string;
  /** Style of the page's existing primary button, reused for WhatsApp. */
  style: React.CSSProperties;
  whatsappText?: string;
  whatsappLabel?: string;
  secondaryLabel?: string;
  align?: "center" | "left";
};

export default function PageCta({
  path,
  style,
  whatsappText,
  whatsappLabel = "Ask on WhatsApp",
  secondaryLabel = "Check availability",
  align = "center",
}: Props) {
  const primary: React.CSSProperties = { ...style, marginTop: 0 };
  const secondary: React.CSSProperties = {
    ...primary,
    background: "transparent",
    color: "#5f7052",
    border: "1px solid #7a8c6e",
  };
  const row: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: align === "center" ? "center" : "flex-start",
    marginTop: style.marginTop ?? 12,
  };
  return (
    <div style={row} data-lead-block="end-cta">
      <a href={whatsappHref(whatsappText || whatsappTextForPath(path))} target="_blank" rel="noopener" style={primary}>
        {whatsappLabel}
      </a>
      <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={secondary}>
        {secondaryLabel}
      </a>
    </div>
  );
}
