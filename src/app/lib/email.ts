// FILE: src/app/lib/email.ts
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  pageUrl?: string;
  createdAt?: string;
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

function buildContactEmail(p: ContactPayload) {
  const subject = `New Inquiry — Villa Lithos`;

  const safeName = escapeHtml(p.fullName);
  const safeEmail = escapeHtml(p.email);
  const safePhone = escapeHtml(p.phone || "");
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
   VILLA LITHOS — NEW INQUIRY
════════════════════════════════════════

CONTACT INFORMATION
─────────────────────────────────────────
Name:        ${p.fullName}
Email:       ${p.email}
Phone:       ${p.phone || "Not provided"}

MESSAGE
─────────────────────────────────────────
${p.message || "No message provided"}

────────────────────────────────────────
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
  <title>New Inquiry — Villa Lithos</title>
</head>
<body style="margin:0;padding:0;background:#f5f3ef;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f3ef;padding:20px 12px;">
    <tr><td align="center">

      <!-- Main Container -->
      <table role="presentation" width="480" cellspacing="0" cellpadding="0" style="width:480px;max-width:100%;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.05);">

        <!-- Header -->
        <tr>
          <td style="background:#1a1a1a;padding:16px 20px;border-bottom:2px solid #c9a962;">
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a962;margin-bottom:2px;">
              New Inquiry
            </div>
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:400;letter-spacing:0.04em;color:#ffffff;">
              Villa Lithos
            </div>
          </td>
        </tr>

        <!-- Contact Card -->
        <tr>
          <td style="padding:12px 20px 8px 20px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fafaf8;border-radius:6px;border:1px solid #e8e5de;">
              <tr>
                <td style="padding:12px 14px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="42" valign="top">
                        <div style="width:34px;height:34px;background:linear-gradient(135deg,#c9a962 0%,#b8944d 100%);border-radius:50%;text-align:center;line-height:34px;font-size:14px;font-weight:600;color:#ffffff;">
                          ${safeName.charAt(0).toUpperCase()}
                        </div>
                      </td>
                      <td valign="top" style="padding-left:2px;">
                        <div style="font-size:14px;font-weight:600;color:#2c2c2c;">${safeName}</div>
                        <a href="mailto:${safeEmail}" style="font-size:12px;color:#c9a962;text-decoration:none;">${safeEmail}</a>
                        ${safePhone ? `<div style="font-size:12px;color:#6b6b6b;">${safePhone}</div>` : ''}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding:4px 20px 12px 20px;">
            <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#999;margin-bottom:6px;font-weight:600;">Message</div>
            <div style="background:#ffffff;border:1px solid #e8e5de;border-radius:5px;padding:10px 12px;">
              <div style="font-size:13px;color:#3a3a3a;line-height:1.5;white-space:pre-wrap;">${safeMessage || '<span style="color:#aaa;font-style:italic;">No message provided</span>'}</div>
            </div>
          </td>
        </tr>

        <!-- Reply Button -->
        <tr>
          <td style="padding:2px 20px 14px 20px;" align="center">
            <a href="mailto:${safeEmail}?subject=Re: Your Villa Lithos Inquiry" style="display:inline-block;background:#c9a962;color:#ffffff;text-decoration:none;padding:9px 24px;border-radius:5px;font-size:12px;font-weight:600;letter-spacing:0.04em;">
              Reply to ${safeName.split(' ')[0]}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafaf8;padding:10px 20px;border-top:1px solid #e8e5de;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <div style="font-size:10px;color:#999;">
                    ${sentAt ? `${sentAt}` : ''}
                  </div>
                </td>
                <td align="right">
                  <div style="font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:#bbb;">
                    Villa Lithos
                  </div>
                </td>
              </tr>
            </table>
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
