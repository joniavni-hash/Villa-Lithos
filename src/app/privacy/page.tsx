import { Metadata } from "next";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Decisions taken (22 Sep 2026): the site and guest data are presented as
// operated by Goldenberg Luxe, the property management company, with no
// ownership details published. Privacy requests go to the public info@ box.
// Values starting with "[" render with a yellow highlight (none remain).
// ---------------------------------------------------------------------------
const OPERATOR = "Goldenberg Luxe";
const PRIVACY_EMAIL = "info@villalithos.com";
const RETENTION = "24 months";
const EFFECTIVE_DATE = "22 September 2026";

const TITLE = "Privacy Notice";
const DESC = "How Villa Lithos Porto Rafti collects and uses personal data through this website: the inquiry form, analytics cookies (with your consent), embedded maps, and the booking platforms we work with. Your rights under the GDPR and how to exercise them.";
const URL = "https://www.villalithosgreece.com/privacy";

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
  h3: { fontFamily: "var(--font-serif), serif", fontSize: "1.15rem", color: "#2c2c2c", marginTop: 24, marginBottom: 8 } as React.CSSProperties,
  p: { marginBottom: 16, fontSize: "1.02rem" } as React.CSSProperties,
  ul: { marginBottom: 16, paddingLeft: 22 } as React.CSSProperties,
  li: { marginBottom: 6, fontSize: "1.02rem" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: "0.95rem" } as React.CSSProperties,
  th: { textAlign: "left" as const, padding: "10px 12px", background: "#f0ede4", borderBottom: "2px solid #d8d3c4", verticalAlign: "top" as const } as React.CSSProperties,
  td: { padding: "10px 12px", borderBottom: "1px solid #e8e3d3", verticalAlign: "top" as const } as React.CSSProperties,
  link: { color: "#7a8c6e" } as React.CSSProperties,
  todo: { background: "#fff3b0", padding: "0 4px", borderRadius: 3 } as React.CSSProperties,
  box: { padding: "16px 20px", background: "#f8f6f1", borderLeft: "3px solid #7a8c6e", borderRadius: 4, marginBottom: 24, fontSize: "1rem" } as React.CSSProperties,
};

const isPlaceholder = (v: string) => v.startsWith("[");
function Fill({ v }: { v: string }) {
  return isPlaceholder(v) ? <mark style={s.todo}>{v}</mark> : <>{v}</>;
}

export default function Page() {
  return (
    <article style={s.article}>
      <h1 style={s.h1}>Privacy Notice</h1>
      <span style={s.meta}>Villa Lithos Porto Rafti · Effective {EFFECTIVE_DATE}</span>

      <p style={s.box}>
        In short: this website collects personal data only when you send us an inquiry, and sets analytics and marketing cookies only if you accept them. We do not sell personal data. Bookings are made through booking platforms that have their own privacy terms. You can contact us at any time at <a href={`mailto:${PRIVACY_EMAIL}`} style={s.link}>{PRIVACY_EMAIL}</a>.
      </p>

      <h2 style={s.h2}>1. Who is responsible</h2>
      <p style={s.p}>
        This website, villalithosgreece.com, and Villa Lithos Porto Rafti (Vravronos 70, Porto Rafti 19003, Attica, Greece) are operated by <Fill v={OPERATOR} />, the property management company (&quot;we&quot;, &quot;us&quot;). {OPERATOR} is responsible for the personal data described in this notice: it handles inquiries, proposals, guest communication, check-in, housekeeping and concierge services.
      </p>
      <p style={s.p}>
        For any question or request about your personal data, write to <a href={`mailto:${PRIVACY_EMAIL}`} style={s.link}>{PRIVACY_EMAIL}</a>.
      </p>

      <h2 style={s.h2}>2. What we collect, why, and on what legal basis</h2>

      <h3 style={s.h3}>2.1 Inquiry form</h3>
      <p style={s.p}>
        When you use the inquiry form we collect the details you enter: your name, email address, phone number (optional), your message (which may include travel dates, group size and other details you choose to share), together with the page you sent it from and the time of sending. The form is delivered to our team by email through our email service provider.
      </p>
      <p style={s.p}>
        Purpose: to answer your inquiry, check availability and prepare a proposal or a booking. Legal basis: steps taken at your request before entering into a contract (Article 6(1)(b) GDPR) and, for follow-up about your inquiry, our legitimate interest in responding to people who contacted us (Article 6(1)(f) GDPR).
      </p>
      <p style={s.p}>
        Retention: inquiry emails that do not lead to a booking are kept for <Fill v={RETENTION} /> from the last contact, then deleted. If you book, the booking records are kept for as long as Greek tax and accounting law requires.
      </p>

      <h3 style={s.h3}>2.2 Bookings</h3>
      <p style={s.p}>
        Bookings are made through Guesty (our direct booking system), Booking.com or Airbnb. When you book on one of these platforms, that platform is responsible for the data you provide to it under its own privacy policy, and shares with us the booking details we need to host you (names, contact details, dates, party size, and any special requests). Greek law also requires accommodation providers to record guest identity details and to report certain data to the authorities; we process those details to meet these legal obligations (Article 6(1)(c) GDPR).
      </p>

      <h3 style={s.h3}>2.3 Analytics and marketing cookies (only with your consent)</h3>
      <p style={s.p}>
        With your consent we use Google Analytics 4 to understand how visitors use the site (pages viewed, approximate location derived from a truncated IP address, device and browser type, how you arrived), the Meta Pixel to measure whether visitors who saw our Instagram or Facebook content later visited the site, and Google Ads measurement tags. All of these are loaded through Google Tag Manager, which we start only after you click &quot;Accept all&quot; in the cookie banner. If you choose &quot;Essential only&quot;, Google Tag Manager and the Meta Pixel are not loaded at all, and Google&apos;s measurement runs without cookies or identifiers. Legal basis: your consent (Article 6(1)(a) GDPR and Article 5(3) of the ePrivacy Directive as implemented in Greece by Law 3471/2006). You can withdraw consent at any time through &quot;Cookie settings&quot; in the footer.
      </p>

      <h3 style={s.h3}>2.4 Embedded Google Maps</h3>
      <p style={s.p}>
        The location section embeds a map from Google Maps. When the map loads, your browser connects to Google, which may set its own cookies and receives your IP address. Google&apos;s use of this data is described in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" style={s.link}>Google Privacy Policy</a>.
      </p>

      <h3 style={s.h3}>2.5 Technical data and security</h3>
      <p style={s.p}>
        Our hosting provider records standard server logs (IP address, time, requested page, browser) to run the site securely and to prevent abuse. Legal basis: our legitimate interest in keeping the site available and secure (Article 6(1)(f) GDPR). Logs are kept for a short period by the hosting provider and are not used to profile visitors.
      </p>

      <h2 style={s.h2}>3. Who receives your data</h2>
      <ul style={s.ul}>
        <li style={s.li}><strong>Our email service provider</strong>: delivery of inquiry form messages to our mailbox.</li>
        <li style={s.li}><strong>Vercel Inc.</strong> (hosting, USA): serves the website and keeps server logs.</li>
        <li style={s.li}><strong>Google</strong> (Google Ireland Ltd and Google LLC, USA): analytics with your consent, embedded maps.</li>
        <li style={s.li}><strong>Meta Platforms Ireland Ltd</strong>: Meta Pixel measurement, only with your consent.</li>
        <li style={s.li}><strong>Booking platforms</strong> (Guesty, Booking.com, Airbnb): only if you book through them, under their own terms.</li>
        <li style={s.li}><strong>Public authorities</strong> where Greek law requires it (for example guest registration and tax reporting).</li>
      </ul>
      <p style={s.p}>
        We do not sell personal data and do not share it with advertisers.
      </p>

      <h2 style={s.h2}>4. Transfers outside the EEA</h2>
      <p style={s.p}>
        Some of the providers above process data in the United States. Where this happens we rely on the EU-US Data Privacy Framework for providers certified under it and otherwise on the European Commission&apos;s Standard Contractual Clauses, with additional safeguards where needed. You can ask us for details of the safeguards in place.
      </p>

      <h2 style={s.h2}>5. Your rights</h2>
      <p style={s.p}>
        Under the GDPR you may ask us to access the personal data we hold about you, to correct it, to delete it, to restrict its use, to receive it in a portable format, and you may object to processing based on our legitimate interests. Where processing is based on consent, you may withdraw it at any time without affecting what was done before. To exercise any right, email <a href={`mailto:${PRIVACY_EMAIL}`} style={s.link}>{PRIVACY_EMAIL}</a>. We reply within one month.
      </p>
      <p style={s.p}>
        You also have the right to complain to a supervisory authority. In Greece this is the Hellenic Data Protection Authority, Kifissias 1-3, 115 23 Athens, <a href="https://www.dpa.gr" target="_blank" rel="noopener" style={s.link}>www.dpa.gr</a>. You may instead contact the authority of the EU country where you live or work.
      </p>

      <h2 style={s.h2} id="cookies">6. Cookies</h2>
      <p style={s.p}>
        The table lists the cookies this site can set. Analytics cookies are set only after you accept them.
      </p>
      <table style={s.table}>
        <thead>
          <tr><th style={s.th}>Cookie</th><th style={s.th}>Set by</th><th style={s.th}>Purpose</th><th style={s.th}>Duration</th><th style={s.th}>Category</th></tr>
        </thead>
        <tbody>
          <tr><td style={s.td}>vl_consent</td><td style={s.td}>This site</td><td style={s.td}>Remembers your cookie choice so the banner does not reappear</td><td style={s.td}>12 months</td><td style={s.td}>Essential</td></tr>
          <tr><td style={s.td}>_ga</td><td style={s.td}>Google Analytics</td><td style={s.td}>Distinguishes visitors</td><td style={s.td}>2 years</td><td style={s.td}>Analytics (consent)</td></tr>
          <tr><td style={s.td}>_ga_*</td><td style={s.td}>Google Analytics</td><td style={s.td}>Keeps session state (one cookie per GA4 property)</td><td style={s.td}>2 years</td><td style={s.td}>Analytics (consent)</td></tr>
          <tr><td style={s.td}>_fbp</td><td style={s.td}>Meta Pixel</td><td style={s.td}>Distinguishes visitors for Meta ad measurement</td><td style={s.td}>3 months</td><td style={s.td}>Marketing (consent)</td></tr>
          <tr><td style={s.td}>_gcl_au</td><td style={s.td}>Google Ads</td><td style={s.td}>Conversion linker used by Google Ads measurement</td><td style={s.td}>3 months</td><td style={s.td}>Marketing (consent)</td></tr>
          <tr><td style={s.td}>test_cookie</td><td style={s.td}>Google (doubleclick.net)</td><td style={s.td}>Checks whether the browser accepts cookies</td><td style={s.td}>15 minutes</td><td style={s.td}>Marketing (consent)</td></tr>
          <tr><td style={s.td}>Google Maps cookies</td><td style={s.td}>Google</td><td style={s.td}>Set by the embedded map according to Google&apos;s policy</td><td style={s.td}>Varies</td><td style={s.td}>Third party</td></tr>
        </tbody>
      </table>
      <p style={s.p}>
        To change your choice, use &quot;Cookie settings&quot; in the footer of any page, or delete cookies in your browser settings.
      </p>

      <h2 style={s.h2}>7. Children</h2>
      <p style={s.p}>
        This website is intended for adults planning a stay. We do not knowingly collect personal data from children through the site. Details of children in a travelling party are collected only as part of a booking, from the adult making it.
      </p>

      <h2 style={s.h2}>8. Changes</h2>
      <p style={s.p}>
        We update this notice when our practices or the law change. The effective date at the top tells you when it was last revised. Material changes will be announced on this page.
      </p>

      <p style={{ ...s.p, marginTop: 40, fontSize: "0.92rem", color: "#666" }}>
        See also our <Link href="/terms" style={s.link}>Website Terms of Use</Link>.
      </p>
    </article>
  );
}
