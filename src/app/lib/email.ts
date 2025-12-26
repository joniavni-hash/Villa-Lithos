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

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO } = process.env;

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
    ? `New Booking Inquiry — ${villa} (${subjectParts.join(", ")})`
    : `New Contact Inquiry — ${villa}`;

  const safeName = escapeHtml(p.fullName);
  const safeEmail = escapeHtml(p.email);
  const safePhone = escapeHtml(p.phone || "");
  const safeService = escapeHtml(p.service || "");
  const safeMessage = escapeHtml(p.message || "");
  const safeUrl = escapeHtml(p.pageUrl || "");
  const sentAt = p.createdAt ? new Date(p.createdAt).toLocaleString("en-GB") : "";

  const text = `NEW INQUIRY — ${villa}

Guest
- Name: ${p.fullName}
- Email: ${p.email}
- Phone: ${p.phone || "—"}

Stay
- Arrival: ${arrival}
- Departure: ${departure}
- Nights: ${nights}
- Guests: ${guests}

Message
${p.message || "—"}

${p.service ? `Service\n- ${p.service}\n\n` : ""}${p.pageUrl ? `Page\n${p.pageUrl}\n\n` : ""}${sentAt ? `Sent\n${sentAt}\n` : ""}
`;

  const html = `<!doctype html>
<html>
<head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f6f3ee;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f3ee;padding:28px 14px;">
    <tr><td align="center">
      <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:100%;background:rgba(255,255,255,.94);border:1px solid rgba(17,17,17,.12);border-radius:18px;overflow:hidden;">
        <tr>
          <td style="padding:22px 22px 14px 22px;">
            <div style="font-family:Georgia,'Times New Roman',serif;letter-spacing:.10em;text-transform:uppercase;font-size:14px;color:rgba(12,12,12,.55);">Inquiry</div>
            <div style="font-family:Georgia,'Times New Roman',serif;letter-spacing:.08em;text-transform:uppercase;font-size:28px;line-height:1.1;color:rgba(12,12,12,.92);margin-top:6px;">
              ${escapeHtml(villa)}
            </div>
            <div style="margin-top:10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:14px;line-height:1.7;color:rgba(12,12,12,.68);">
              New booking-style inquiry received. Details below.
            </div>
          </td>
        </tr>

        <tr><td style="padding:0 22px 18px 22px;">
          <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(17,17,17,.12),transparent);"></div>
        </td></tr>

        <tr>
          <td style="padding:0 22px 22px 22px;">

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid rgba(17,17,17,.10);border-radius:16px;background:rgba(255,255,255,.86);">
              <tr><td style="padding:16px 16px 10px 16px;">
                <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(12,12,12,.48);">
                  Booking Summary
                </div>
              </td></tr>
              <tr><td style="padding:0 16px 14px 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
                  ${row("Arrival", arrival)}
                  ${row("Departure", departure)}
                  ${row("Guests", guests)}
                  ${row("Nights", nights, true)}
                </table>
              </td></tr>
            </table>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:14px;border:1px solid rgba(17,17,17,.10);border-radius:16px;background:rgba(255,255,255,.86);">
              <tr><td style="padding:16px;">
                <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(12,12,12,.48);">Guest</div>
                <div style="margin-top:10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:14px;line-height:1.7;color:rgba(12,12,12,.86);">
                  <div><strong style="color:rgba(12,12,12,.92);">Name:</strong> ${safeName}</div>
                  <div><strong style="color:rgba(12,12,12,.92);">Email:</strong> <a href="mailto:${safeEmail}" style="color:#9f8753;text-decoration:none;">${safeEmail}</a></div>
                  <div><strong style="color:rgba(12,12,12,.92);">Phone:</strong> ${safePhone || "—"}</div>
                </div>
              </td></tr>
            </table>

            ${
              safeService
                ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:14px;border:1px solid rgba(17,17,17,.10);border-radius:16px;background:rgba(255,255,255,.86);">
                    <tr><td style="padding:16px;">
                      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(12,12,12,.48);">Service</div>
                      <div style="margin-top:10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:14px;line-height:1.7;color:rgba(12,12,12,.78);">
                        ${safeService}
                      </div>
                    </td></tr>
                  </table>`
                : ""
            }

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:14px;border:1px solid rgba(17,17,17,.10);border-radius:16px;background:rgba(255,255,255,.86);">
              <tr><td style="padding:16px;">
                <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:rgba(12,12,12,.48);">Message</div>
                <div style="margin-top:10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:14px;line-height:1.75;color:rgba(12,12,12,.78);white-space:pre-wrap;">
                  ${safeMessage || "—"}
                </div>
              </td></tr>
            </table>

            ${
              safeUrl || sentAt
                ? `<div style="margin-top:14px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;line-height:1.6;color:rgba(12,12,12,.55);">
                    ${safeUrl ? `Page: <a href="${safeUrl}" style="color:#9f8753;text-decoration:none;">${safeUrl}</a><br/>` : ""}
                    ${sentAt ? `Sent: ${escapeHtml(sentAt)}` : ""}
                  </div>`
                : ""
            }

          </td>
        </tr>

        <tr>
          <td style="padding:16px 22px;background:rgba(255,255,255,.78);border-top:1px solid rgba(17,17,17,.10);">
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:rgba(12,12,12,.55);">
              Villa Lithos • Concierge Inquiry
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
    subject,
    html,
    text,
    replyTo: payload.email,
  });

  return true;
}
