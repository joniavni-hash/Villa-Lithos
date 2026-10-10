import { NextResponse } from "next/server";

// First-party lead counter. <LeadTracker /> beacons every click on a contact or
// booking link here; the row lands in the lead_clicks table of the Supabase
// project behind the SEO dashboard (Lovable "Villa SEO Champion"), where the
// daily SEO agent reads it. No cookies, no IP, no user identifiers: only the
// channel, the block, the page, the country code and the device class, so it
// works for every visitor regardless of the cookie choice.
//
// The key is Supabase's publishable key (public by design). The table's row-level
// security allows anonymous INSERT only, with CHECK constraints on every column.

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

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/lead_clicks`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ channel, block, page, country, device: device(req.headers.get("user-agent") || "") }),
      cache: "no-store",
    });
  } catch {
    // Never break the visitor's click over a counter.
  }
  return new NextResponse(null, { status: 204 });
}
