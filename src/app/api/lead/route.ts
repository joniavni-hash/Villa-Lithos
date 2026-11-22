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
//
// Traffic source (22.11.2026): the client also sends the session's first-touch
// data (referrer hostname, utm_source/medium/campaign, gclid yes/no, landing
// path). The row stores those values (trimmed) plus a `source` classification:
//   ai       referrer or utm_source is an AI answer engine (chatgpt.com, perplexity.ai, gemini.google.com, claude.ai, ...)
//   paid     gclid present, or utm_medium in cpc/ppc/paid/paidsearch
//   organic  referrer is a search engine (google.*, bing.com, duckduckgo.com, yahoo.*, ecosia.org, yandex.*, baidu.com, search.brave.com, startpage.com), or utm_medium=organic
//   email    utm_medium=email
//   social   referrer is a social network (facebook, instagram, t.co, x.com, twitter, linkedin, lnkd.in, pinterest.*, tiktok, youtube, whatsapp.com, wa.me)
//   referral any other external referrer
//   direct   no external referrer and no utm values
// Rows written before this change have no `source` and are reported as "unknown".

const SUPABASE_URL = "https://lxrcynvmxeuoftdmynnk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Whvc9ybv0Fg0H5XPZheakg_c_bt1gcz";

const CHANNELS = new Set(["whatsapp", "messenger", "email", "phone", "direct_booking", "airbnb", "booking_com"]);

const AI_HOSTS = [
  "chatgpt.com",
  "chat.openai.com",
  "openai.com",
  "perplexity.ai",
  "gemini.google.com",
  "bard.google.com",
  "copilot.microsoft.com",
  "claude.ai",
  "you.com",
  "phind.com",
  "poe.com",
  "meta.ai",
];
// Bare utm_source names that unambiguously mean an AI answer engine.
const AI_NAMES = new Set(["chatgpt", "openai", "perplexity", "gemini", "copilot", "claude", "phind", "poe"]);
const SEARCH_HOSTS: RegExp[] = [
  /(^|\.)google\.[a-z.]+$/,
  /(^|\.)bing\.com$/,
  /(^|\.)duckduckgo\.com$/,
  /(^|\.)yahoo\.[a-z.]+$/,
  /(^|\.)ecosia\.org$/,
  /(^|\.)yandex\.[a-z.]+$/,
  /(^|\.)baidu\.com$/,
  /^search\.brave\.com$/,
  /(^|\.)startpage\.com$/,
];
const SOCIAL_HOSTS: RegExp[] = [
  /(^|\.)facebook\.com$/,
  /(^|\.)instagram\.com$/,
  /^t\.co$/,
  /(^|\.)x\.com$/,
  /(^|\.)twitter\.com$/,
  /(^|\.)linkedin\.com$/,
  /^lnkd\.in$/,
  /(^|\.)pinterest\.[a-z.]+$/,
  /(^|\.)tiktok\.com$/,
  /(^|\.)youtube\.com$/,
  /(^|\.)whatsapp\.com$/,
  /^wa\.me$/,
];
const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paidsearch"]);

function hostMatches(host: string, domain: string): boolean {
  return host === domain || host.endsWith(`.${domain}`);
}

type LeadSource = "ai" | "paid" | "organic" | "email" | "social" | "referral" | "direct";

function classifySource(input: {
  ref_host: string;
  utm_source: string;
  utm_medium: string;
  gclid: boolean;
}): LeadSource {
  const ref = input.ref_host.toLowerCase();
  const utmSource = input.utm_source.toLowerCase();
  const utmMedium = input.utm_medium.toLowerCase();
  if (AI_HOSTS.some((d) => hostMatches(ref, d) || hostMatches(utmSource, d)) || AI_NAMES.has(utmSource)) return "ai";
  if (input.gclid || PAID_MEDIUMS.has(utmMedium)) return "paid";
  if (SEARCH_HOSTS.some((re) => re.test(ref)) || utmMedium === "organic") return "organic";
  if (utmMedium === "email") return "email";
  if (SOCIAL_HOSTS.some((re) => re.test(ref))) return "social";
  if (ref) return "referral";
  return "direct";
}

function device(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: {
    channel?: unknown;
    block?: unknown;
    page?: unknown;
    ref_host?: unknown;
    utm_source?: unknown;
    utm_medium?: unknown;
    utm_campaign?: unknown;
    gclid?: unknown;
    landing?: unknown;
  };
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

  // Traffic source (first touch of the session, sent by the client).
  const refHost = text(body.ref_host, 100).toLowerCase().replace(/[^a-z0-9.-]/g, "");
  const utmSource = text(body.utm_source, 100);
  const utmMedium = text(body.utm_medium, 100);
  const utmCampaign = text(body.utm_campaign, 100);
  const gclid = body.gclid === true;
  const landingRaw = text(body.landing, 200);
  const landing = landingRaw.startsWith("/") ? landingRaw : page;
  const source = classifySource({ ref_host: refHost, utm_source: utmSource, utm_medium: utmMedium, gclid });
  const sourced = { ...row, source, ref_host: refHost, utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign, landing };

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const iso = new Date().toISOString();
      await put(`leads/${iso.slice(0, 10)}/${iso.slice(11, 19).replace(/:/g, "")}.json`, JSON.stringify({ created_at: iso, ...sourced }), {
        access: "public",
        addRandomSuffix: true,
        contentType: "application/json",
      });
    } else {
      // Legacy table has no source columns: keep the original row shape.
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
