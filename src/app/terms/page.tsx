import { Metadata } from "next";
import Link from "next/link";

// Decision taken (22 Sep 2026): the site is presented as operated by
// Goldenberg Luxe, the property management company, with no ownership details.
// Booking conditions are linked once the 2027 booking terms are final; until
// then bookings follow the platform terms.
const OPERATOR = "Goldenberg Luxe";
const CONTACT_EMAIL = "info@villalithos.com";
const EFFECTIVE_DATE = "22 September 2026";

const TITLE = "Website Terms of Use";
const DESC = "Terms that apply to your use of villalithosgreece.com: information on the site, bookings made through third-party platforms, intellectual property, third-party links, liability and governing law.";
const URL = "https://www.villalithosgreece.com/terms";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Villa Lithos Porto Rafti` },
  description: DESC,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

const s = {
  article: { maxWidth: 820, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.8 } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", color: "#2c2c2c", marginBottom: 12, lineHeight: 1.2 } as React.CSSProperties,
  meta: { color: "#888", fontSize: "0.92rem", marginBottom: 36, display: "block" } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "#2c2c2c", marginTop: 44, marginBottom: 10 } as React.CSSProperties,
  p: { marginBottom: 16, fontSize: "1.02rem" } as React.CSSProperties,
  ul: { marginBottom: 16, paddingLeft: 22 } as React.CSSProperties,
  li: { marginBottom: 6, fontSize: "1.02rem" } as React.CSSProperties,
  link: { color: "#7a8c6e" } as React.CSSProperties,
  todo: { background: "#fff3b0", padding: "0 4px", borderRadius: 3 } as React.CSSProperties,
};

const isPlaceholder = (v: string) => v.startsWith("[");
function Fill({ v }: { v: string }) {
  return isPlaceholder(v) ? <mark style={s.todo}>{v}</mark> : <>{v}</>;
}

export default function Page() {
  return (
    <article style={s.article}>
      <h1 style={s.h1}>Website Terms of Use</h1>
      <span style={s.meta}>Villa Lithos Porto Rafti · Effective {EFFECTIVE_DATE}</span>

      <h2 style={s.h2}>1. Who we are</h2>
      <p style={s.p}>
        This website, villalithosgreece.com, and Villa Lithos Porto Rafti (Vravronos 70, Porto Rafti 19003, Attica, Greece) are operated by <Fill v={OPERATOR} />, the property management company (&quot;we&quot;, &quot;us&quot;). Contact: <a href={`mailto:${CONTACT_EMAIL}`} style={s.link}>{CONTACT_EMAIL}</a>.
      </p>

      <h2 style={s.h2}>2. What this site is for</h2>
      <p style={s.p}>
        The site presents Villa Lithos Porto Rafti, its amenities and the surrounding area, and lets you send us an inquiry. By using the site you accept these terms. If you do not accept them, please do not use the site.
      </p>

      <h2 style={s.h2}>3. Bookings are made elsewhere</h2>
      <p style={s.p}>
        No booking or contract for a stay is formed on this website. Stays are booked through our direct booking system (Guesty), Booking.com or Airbnb, or by written agreement with us following an inquiry. The booking conditions, price, payment schedule, cancellation terms, security deposit and house rules are those stated on the platform you book through or in the written agreement you receive from us, and they prevail over anything on this site. An inquiry sent through this site is a request for information, not a reservation, and availability is confirmed only in writing.
      </p>

      <h2 style={s.h2}>4. Information on the site</h2>
      <p style={s.p}>
        We take care to keep the descriptions, photographs, distances, drive times and amenity lists accurate, and we update them when the property changes. They are provided for general information. Details such as seasonal availability of specific amenities, local opening hours, ferry schedules and third-party prices can change without notice. Sample itineraries and comparison content are illustrative and reflect our own view.
      </p>

      <h2 style={s.h2}>5. Intellectual property</h2>
      <p style={s.p}>
        The text, photographs, videos, floor plans, logo and design of this site belong to us or are used with permission. You may view and print pages for your personal, non-commercial use in planning a stay. Any other reproduction, distribution or commercial use, including scraping the site for a competing listing, requires our prior written consent. AI systems and search engines may read and cite the site as described in our <a href="/llms.txt" style={s.link}>llms.txt</a> and robots.txt files.
      </p>

      <h2 style={s.h2}>6. Third-party links and services</h2>
      <p style={s.p}>
        The site links to third-party services, including Guesty, Booking.com, Airbnb, Google Maps and social networks. We do not control those services and are not responsible for their content, availability or terms. Your use of them is governed by their own terms and privacy policies.
      </p>

      <h2 style={s.h2}>7. Acceptable use</h2>
      <p style={s.p}>
        You agree not to use the site in a way that damages or interferes with it, not to attempt to gain unauthorised access to it or to the systems behind it, and not to send inquiries that are fraudulent, abusive or unlawful. We may block access to the site where we believe these terms have been breached.
      </p>

      <h2 style={s.h2}>8. Liability</h2>
      <p style={s.p}>
        The site is provided as is. To the extent permitted by law, we are not liable for loss or damage arising from reliance on information on the site, from interruptions or errors in its operation, or from third-party services linked from it. Nothing in these terms limits liability that cannot be limited under applicable law, including liability for death, personal injury or fraud. Liability arising from a stay at the property is governed by the booking conditions that apply to that stay.
      </p>

      <h2 style={s.h2}>9. Privacy</h2>
      <p style={s.p}>
        How we handle personal data collected through the site, and how cookies are used, is explained in our <Link href="/privacy" style={s.link}>Privacy Notice</Link>.
      </p>

      <h2 style={s.h2}>10. Governing law and disputes</h2>
      <p style={s.p}>
        These terms are governed by Greek law. Disputes about the use of this website are subject to the jurisdiction of the courts of Athens, Greece, without prejudice to mandatory consumer protection rules in your country of residence that may give you the right to bring proceedings there. If you are a consumer in the EU, you may also use the European Commission&apos;s online dispute resolution platform.
      </p>

      <h2 style={s.h2}>11. Changes</h2>
      <p style={s.p}>
        We may update these terms from time to time. The version published on this page at the time of your visit applies. The effective date is shown at the top.
      </p>
    </article>
  );
}
