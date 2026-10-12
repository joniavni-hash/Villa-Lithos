import { NextResponse } from "next/server";
import sitemap from "../../sitemap";

// IndexNow: tells Bing (and Yandex, Seznam, Naver, Yep) that site URLs changed,
// so they recrawl within hours instead of weeks. ChatGPT search draws on Bing's
// index, so this also speeds up AI-search visibility.
//
// The key is public by design: the same value is served at /<key>.txt (public/),
// which proves ownership of the host. Added 2026-10-12, after the domain move.
//
// Called by Vercel Cron (vercel.json, weekly) with "Authorization: Bearer
// CRON_SECRET". It submits every non-fragment URL from sitemap.ts. For one-off
// pings after a deploy, POST directly to https://api.indexnow.org/indexnow with
// the same key; this route is not needed for that.

const INDEXNOW_KEY = "b3321e4bfcff82be3557a283b0255858";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse(null, { status: 401 });
  }

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.villalithos.com").replace(/\/$/, "");
  const host = new URL(base).host;
  const urlList = Array.from(
    new Set(
      sitemap()
        .map((entry) => entry.url)
        .filter((url) => !url.includes("#") && new URL(url).host === host),
    ),
  );

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${base}/${INDEXNOW_KEY}.txt`, urlList }),
      cache: "no-store",
    });
    return NextResponse.json({ indexnow_status: res.status, submitted: urlList.length });
  } catch {
    return NextResponse.json({ indexnow_status: "network_error", submitted: 0 }, { status: 502 });
  }
}
