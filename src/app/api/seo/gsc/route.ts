import { NextResponse } from "next/server";
import { agentAuthorized, gscConfigured, gscQuery, gscSites, GSC_ALLOWED_SITES, GSC_DEFAULT_SITE, type GscFilter } from "../../../lib/seo-agent";

// Search Console data for the daily SEO agent, read live from Google.
// Replaces the Lovable/Supabase sync tables (gsc_daily, gsc_page_daily,
// gsc_site_daily, gsc_query_page_28d) from November 2026.
//
// GET /api/seo/gsc?op=status                      configuration check (no Google call)
// GET /api/seo/gsc?op=sites                       properties the service account can read
// GET /api/seo/gsc?start=YYYY-MM-DD&end=YYYY-MM-DD&dimensions=date|query|page|date,query|query,page|...
//     [&site=sc-domain:villalithos.com] [&queryContains=..] [&pageContains=..] [&dataState=final|all]
// Rows: {keys:[...in dimension order], clicks, impressions, ctr, position}. Pages
// through Google's 25,000-row limit on its own. Always "Authorization: Bearer SEO_AGENT_TOKEN".

export const dynamic = "force-dynamic";

const DIMENSIONS = new Set(["date", "query", "page", "country", "device", "searchAppearance"]);
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: Request) {
  if (!agentAuthorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const params = new URL(req.url).searchParams;
  const op = params.get("op");

  if (op === "status") {
    return NextResponse.json({
      ok: true,
      gsc_configured: gscConfigured(),
      blob_configured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      default_site: GSC_DEFAULT_SITE,
      checked_at: new Date().toISOString(),
    });
  }

  if (!gscConfigured()) {
    return NextResponse.json({ error: "GSC_SERVICE_ACCOUNT_JSON is not set on Vercel" }, { status: 503 });
  }

  try {
    if (op === "sites") {
      return NextResponse.json({ sites: await gscSites(), checked_at: new Date().toISOString() });
    }

    const start = params.get("start") || "";
    const end = params.get("end") || "";
    if (!DATE.test(start) || !DATE.test(end) || start > end) {
      return NextResponse.json({ error: "start and end must be YYYY-MM-DD with start <= end" }, { status: 400 });
    }
    const dimensions = (params.get("dimensions") || "date").split(",").map((d) => d.trim()).filter(Boolean);
    if (!dimensions.length || dimensions.some((d) => !DIMENSIONS.has(d))) {
      return NextResponse.json({ error: `dimensions must be a comma list of ${Array.from(DIMENSIONS).join(", ")}` }, { status: 400 });
    }
    const site = params.get("site") || GSC_DEFAULT_SITE;
    if (!GSC_ALLOWED_SITES.has(site)) return NextResponse.json({ error: "site not allowed" }, { status: 400 });

    const filters: GscFilter[] = [];
    const queryContains = params.get("queryContains");
    const pageContains = params.get("pageContains");
    if (queryContains) filters.push({ dimension: "query", operator: "contains", expression: queryContains });
    if (pageContains) filters.push({ dimension: "page", operator: "contains", expression: pageContains });
    const dataState = params.get("dataState") === "all" ? "all" : "final";

    const rows = await gscQuery({ site, startDate: start, endDate: end, dimensions, filters, dataState });
    return NextResponse.json({
      site,
      start,
      end,
      dimensions,
      dataState,
      row_count: rows.length,
      rows,
      fetched_at: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
