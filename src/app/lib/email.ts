// FILE: src/app/lib/email.ts
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;

  guests?: number | string;
  arrival?: string;   // yyyy-mm-dd
  departure?: string; // yyyy-mm-dd
  nights?: number;
  villa?: string;
  pageUrl?: string;
  createdAt?: string; // ✅ added
};

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO, SMTP_BCC } = process.env;

function assertEnv() {
  const missing = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM", "SMTP_TO"]
    .filter((k) => !process.env[k]);
  if (missing.length) throw new Error(`Missing env vars: ${missing.join(", ")}`);
}

function transporter() {
  assertEnv();
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function verifySmtp() {
  const t = transporter();
  await t.verify();
}

function escapeHtml(s: string) {
  return (s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(iso?: string) {
  if (!iso) return "—";
  try {
    const dt = new Date(iso + "T00:00:00");
    return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function row(label: string, value: string, big = false) {
  return `
    <tr>
      <td style="padding:8px 0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:rgba(12,12,12,.48);">
        ${escapeHtml(label)}
      </td>
      <td align="right" style="padding:8px 0;font-size:${big ? "16px" : "14px"};font-weight:${big ? "700" : "600"};color:rgba(12,12,12,.88);">
        ${escapeHtml(value || "—")}
      </td>
    </tr>
  `;
}

function buildContactEmail(p: ContactPayload) {
  const villa = p.villa || "Villa Lithos";

  const arrival = formatDate(p.arrival);
  const departure = formatDate(p.departure);
  const guests = p.guests ? String(p.guests) : "—";
  const nights = p.nights != null ? String(p.nights) : "—";

  const subjectParts: string[] = [];
  if (p.arrival && p.departure) subjectParts.push(`${arrival} → ${departure}`);
  if (p.guests) subjectParts.push(`${guests} guests`);

  const subject = subjectParts.length
    ? `New Booking Request — ${villa} (${subjectParts.join(", ")})`
    : `New Contact Inquiry — ${villa}`;

  const safeName = escapeHtml(p.fullName);
  const safeEmail = escapeHtml(p.email);
  const safePhone = escapeHtml(p.phone || "");
  const safeService = escapeHtml(p.service || "");
  const safeMessage = escapeHtml(p.message || "");
  const safeUrl = escapeHtml(p.pageUrl || "");
  const sentAt = p.createdAt ? new Date(p.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "";

  const text = `════════════════════════════════════════
   VILLA LITHOS — NEW BOOKING REQUEST
════════════════════════════════════════

STAY DETAILS
─────────────────────────────────────────
Arrival:     ${arrival}
Departure:   ${departure}
Nights:      ${nights}
Guests:      ${guests}
Property:    ${villa}

GUEST INFORMATION
─────────────────────────────────────────
Name:        ${p.fullName}
Email:       ${p.email}
Phone:       ${p.phone || "Not provided"}

MESSAGE
─────────────────────────────────────────
${p.message || "No message provided"}

${p.service ? `SERVICE REQUESTED\n─────────────────────────────────────────\n${p.service}\n\n` : ""}────────────────────────────────────────
${sentAt ? `Received: ${sentAt}` : ""}
${p.pageUrl ? `Source: ${p.pageUrl}` : ""}

This is an automated message from the Villa Lithos website.
Please respond directly to the guest at: ${p.email}
`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Booking Request — ${escapeHtml(villa)}</title>
</head>
<body style="margin:0;padding:0;background:#1a1a1a;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#1a1a1a;padding:40px 20px;">
    <tr><td align="center">

      <!-- Main Container -->
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.15);">

        <!-- Header with Gold Accent -->
        <tr>
          <td style="background:linear-gradient(135deg,#2c2c2c 0%,#1a1a1a 100%);padding:32px 32px 28px 32px;border-bottom:3px solid #c9a962;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a962;margin-bottom:8px;">
                    New Booking Request
                  </div>
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:400;letter-spacing:0.05em;color:#ffffff;line-height:1.2;">
                    Villa Lithos
                  </div>
                </td>
                <td align="right" valign="top">
                  <div style="background:#c9a962;color:#1a1a1a;padding:8px 16px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:0.05em;">
                    ${nights} NIGHT${p.nights !== 1 ? 'S' : ''}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Stay Summary Banner -->
        <tr>
          <td style="background:linear-gradient(135deg,#f8f6f1 0%,#f0ece3 100%);padding:24px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td width="45%" style="padding-right:16px;">
                  <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8578;margin-bottom:6px;">Check-in</div>
                  <div style="font-size:18px;font-weight:600;color:#2c2c2c;">${arrival}</div>
                </td>
                <td width="10%" align="center" style="padding:0 8px;">
                  <div style="font-size:20px;color:#c9a962;">→</div>
                </td>
                <td width="45%" style="padding-left:16px;">
                  <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8578;margin-bottom:6px;">Check-out</div>
                  <div style="font-size:18px;font-weight:600;color:#2c2c2c;">${departure}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Booking Details Grid -->
        <tr>
          <td style="padding:28px 32px 24px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafafa;border-radius:12px;border:1px solid #e8e5de;">
              <tr>
                <td width="50%" style="padding:20px 24px;border-right:1px solid #e8e5de;">
                  <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8578;margin-bottom:8px;">Guests</div>
                  <div style="font-size:28px;font-weight:700;color:#2c2c2c;">${guests}</div>
                  <div style="font-size:12px;color:#8a8578;margin-top:2px;">people</div>
                </td>
                <td width="50%" style="padding:20px 24px;">
                  <div style="font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#8a8578;margin-bottom:8px;">Property</div>
                  <div style="font-size:16px;font-weight:600;color:#2c2c2c;">${escapeHtml(villa)}</div>
                  <div style="font-size:12px;color:#8a8578;margin-top:2px;">Luxury Villa</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:0 32px;">
            <div style="height:1px;background:linear-gradient(90deg,transparent 0%,#e8e5de 20%,#e8e5de 80%,transparent 100%);"></div>
          </td>
        </tr>

        <!-- Guest Information -->
        <tr>
          <td style="padding:24px 32px;">
            <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a962;margin-bottom:16px;font-weight:600;">Guest Information</div>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;border:1px solid #e8e5de;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #f0ece3;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="80">
                        <div style="width:48px;height:48px;background:linear-gradient(135deg,#c9a962 0%,#a88b4a 100%);border-radius:50%;display:inline-block;text-align:center;line-height:48px;font-size:18px;font-weight:600;color:#ffffff;">
                          ${safeName.charAt(0).toUpperCase()}
                        </div>
                      </td>
                      <td>
                        <div style="font-size:18px;font-weight:600;color:#2c2c2c;margin-bottom:4px;">${safeName}</div>
                        <div style="font-size:13px;color:#8a8578;">Guest</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding:8px 0;">
                        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8578;margin-bottom:4px;">Email</div>
                        <a href="mailto:${safeEmail}" style="font-size:15px;color:#c9a962;text-decoration:none;font-weight:500;">${safeEmail}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;">
                        <div style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8578;margin-bottom:4px;">Phone</div>
                        <div style="font-size:15px;color:#2c2c2c;font-weight:500;">${safePhone || '<span style="color:#bbb;">Not provided</span>'}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        ${safeService ? `
        <!-- Service Requested -->
        <tr>
          <td style="padding:0 32px 24px 32px;">
            <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a962;margin-bottom:12px;font-weight:600;">Service Requested</div>
            <div style="background:#fff9eb;border:1px solid #f0e4c8;border-radius:10px;padding:16px 20px;">
              <div style="font-size:14px;color:#7a6b4a;line-height:1.6;">${safeService}</div>
            </div>
          </td>
        </tr>
        ` : ''}

        <!-- Message -->
        <tr>
          <td style="padding:0 32px 28px 32px;">
            <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a962;margin-bottom:12px;font-weight:600;">Message</div>
            <div style="background:#fafafa;border:1px solid #e8e5de;border-radius:10px;padding:20px 24px;">
              <div style="font-size:14px;color:#4a4a4a;line-height:1.75;white-space:pre-wrap;">${safeMessage || '<span style="color:#bbb;font-style:italic;">No message provided</span>'}</div>
            </div>
          </td>
        </tr>

        <!-- Reply Button -->
        <tr>
          <td style="padding:0 32px 32px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <a href="mailto:${safeEmail}?subject=Re: Your Villa Lithos Booking Request" style="display:inline-block;background:linear-gradient(135deg,#c9a962 0%,#a88b4a 100%);color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">
                    Reply to Guest
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8f6f1;padding:20px 32px;border-top:1px solid #e8e5de;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <div style="font-size:11px;color:#8a8578;line-height:1.6;">
                    ${sentAt ? `<strong>Received:</strong> ${escapeHtml(sentAt)}<br/>` : ''}
                    ${safeUrl ? `<strong>Source:</strong> <a href="${safeUrl}" style="color:#c9a962;text-decoration:none;">Website Contact Form</a>` : ''}
                  </div>
                </td>
                <td align="right">
                  <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#8a8578;">
                    Villa Lithos<br/>Concierge
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>

      <!-- Bottom Branding -->
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:100%;">
        <tr>
          <td align="center" style="padding:24px 0;">
            <div style="font-size:11px;letter-spacing:0.1em;color:#666666;">
              This is an automated message from the Villa Lithos website
            </div>
          </td>
        </tr>
      </table>

    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

export async function sendContactMail(payload: ContactPayload) {
  const t = transporter();
  const { subject, html, text } = buildContactEmail(payload);

  await t.sendMail({
    from: SMTP_FROM!,
    to: SMTP_TO!,
    bcc: SMTP_BCC || undefined,  // Optional: για monitoring
    subject,
    html,
    text,
    replyTo: payload.email,
  });

  return true;
}
