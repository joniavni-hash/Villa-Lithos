import { NextResponse } from "next/server";
import { list, put } from "@vercel/blob";
import { agentAuthorized } from "../../../lib/seo-agent";

// Lead clicks for the daily SEO agent, read from Vercel Blob where /api/lead
// writes one small JSON object per click (leads/YYYY-MM-DD/<time>-<suffix>.json).
// Replaces the lead_clicks table in the Lovable/Supabase database from November 2026.
//
// GET  /api/seo/leads?since=YYYY-MM-DD[&until=YYYY-MM-DD]   rows {created_at, channel, block, page, country, device}
// POST /api/seo/leads  {rows:[{created_at, channel, block, page, country, device}]}
//      one-time import of historical rows (each becomes a blob dated by created_at)
// Always "Authorization: Bearer SEO_AGENT_TOKEN".

export const dynamic = "force-dynamic";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const CHANNELS = new Set(["whatsapp", "messenger", "email", "phone", "direct_booking", "airbnb", "booking_com"]);

export type LeadRow = {
  created_at: string;
  channel: string;
  block: string | null;
  page: string;
  country: string | null;
  device: string | null;
};

export async function GET(req: Request) {
  if (!agentAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN is not set: connect a Blob store to the Vercel project" }, { status: 503 });
  }
  const params = new URL(req.url).searchParams;
  const since = params.get("since") || "2026-10-11";
  const until = params.get("until") || "9999-12-31";
  if (!DATE.test(since) || !DATE.test(until)) {
    return NextResponse.json({ error: "since and until must be YYYY-MM-DD" }, { status: 400 });
  }

  try {
    const urls: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "leads/", cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const day = blob.pathname.slice("leads/".length, "leads/".length + 10);
        if (day >= since && day <= until && blob.pathname.endsWith(".json")) urls.push(blob.url);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    const rows: LeadRow[] = [];
    const batch = 40;
    for (let i = 0; i < urls.length; i += batch) {
      const chunk = await Promise.all(
        urls.slice(i, i + batch).map(async (url) => {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) return null;
          try {
            return (await res.json()) as LeadRow;
          } catch {
            return null;
          }
        }),
      );
      for (const row of chunk) if (row && row.created_at) rows.push(row);
    }
    rows.sort((a, b) => a.created_at.localeCompare(b.created_at));
    return NextResponse.json({ since, until, row_count: rows.length, rows, fetched_at: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(req: Request) {
  if (!agentAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "BLOB_READ_WRITE_TOKEN is not set" }, { status: 503 });
  }
  let body: { rows?: unknown };
  try {
    body = (await req.json()) as { rows?: unknown };
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }
  const rows = Array.isArray(body.rows) ? (body.rows as Partial<LeadRow>[]) : [];
  if (!rows.length || rows.length > 2000) return NextResponse.json({ error: "rows must hold 1 to 2000 items" }, { status: 400 });

  let written = 0;
  const errors: string[] = [];
  for (const row of rows) {
    const createdAt = typeof row.created_at === "string" ? new Date(row.created_at) : null;
    if (!createdAt || Number.isNaN(createdAt.getTime()) || typeof row.channel !== "string" || !CHANNELS.has(row.channel)) {
      errors.push(`skipped: ${JSON.stringify(row).slice(0, 120)}`);
      continue;
    }
    const iso = createdAt.toISOString();
    const clean: LeadRow = {
      created_at: iso,
      channel: row.channel,
      block: typeof row.block === "string" && row.block ? row.block.replace(/[^a-z0-9-]/gi, "").slice(0, 60) : null,
      page: typeof row.page === "string" && row.page.startsWith("/") ? row.page.slice(0, 200) : "/",
      country: typeof row.country === "string" && /^[A-Z]{2}$/.test(row.country) ? row.country : null,
      device: row.device === "mobile" || row.device === "tablet" || row.device === "desktop" ? row.device : null,
    };
    try {
      await put(`leads/${iso.slice(0, 10)}/${iso.slice(11, 19).replace(/:/g, "")}-import.json`, JSON.stringify(clean), {
        access: "public",
        addRandomSuffix: true,
        contentType: "application/json",
      });
      written += 1;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }
  return NextResponse.json({ written, errors });
}
