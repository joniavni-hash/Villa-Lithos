import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

// First-party lead counter. <LeadTracker /> beacons every click on a contact or
// booking link here. No cookies, no IP, no user identifiers: only the channel,
// the block, the page, the country code and the device class, so it works for
// every visitor regardless of the cookie choice.
//
// Storage (November 2026): one small JSON object per click in Vercel Blob,
// leads/YYYY-MM-DD/<time>-<suffix>.json, read by the daily SEO agent through
// /api/seo/leads. Needs BLOB_READ_WRITE_TOKEN (set when a Blob store is connected
// to the Vercel project). Until that token exists the click still goes to the
// legacy lead_clicks table in the retired Lovable/Supabase project, so no click
// is lost during the switch; that fallback can be removed once Blob is live.

const SUPABASE_URL = "https://lxrcynvmxeuoftdmynnk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Whvc9ybv0Fg0H5XPZheakg_c_bt1gcz";

const CHANNELS = new Set(["whatsapp", "messenger", "email", "phone", "direct_booking", "airbnb", "booking_com"]);

function device(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

export async function POST(req: Request) {
  let body: { channel?: unknown; block?: unknown; page?: unknown };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const channel = typeof body.channel === "string" ? body.channel : "";
  if (!CHANNELS.has(channel)) return new NextResponse(null, { status: 400 });
  const page = typeof body.page === "string" && body.page.startsWith("/") ? body.page.slice(0, 200) : "/";
  const block = typeof body.block === "string" ? body.block.replace(/[^a-z0-9-]/gi, "").slice(0, 60) : null;
  const countryRaw = req.headers.get("x-vercel-ip-country") || "";
  const country = /^[A-Z]{2}$/.test(countryRaw) ? countryRaw : null;
  const row = { channel, block, page, country, device: device(req.headers.get("user-agent") || "") };

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const iso = new Date().toISOString();
      await put(`leads/${iso.slice(0, 10)}/${iso.slice(11, 19).replace(/:/g, "")}.json`, JSON.stringify({ created_at: iso, ...row }), {
        access: "public",
        addRandomSuffix: true,
        contentType: "application/json",
      });
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/lead_clicks`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
        cache: "no-store",
      });
    }
  } catch {
    // Never break the visitor's click over a counter.
  }
  return new NextResponse(null, { status: 204 });
}
