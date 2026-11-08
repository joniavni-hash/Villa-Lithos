import { createSign, timingSafeEqual } from "node:crypto";

// Shared helpers for the /api/seo/* routes that the daily SEO agent (Cowork
// scheduled task "Villa Lithos SEO daily") calls instead of the former Lovable
// Supabase database (retired November 2026).
//
// Auth: every /api/seo/* request carries "Authorization: Bearer <SEO_AGENT_TOKEN>".
// The token is a Vercel environment variable known only to the owner and the agent.
//
// Search Console: read directly through the Search Console API with a Google
// service account (GSC_SERVICE_ACCOUNT_JSON = the key file's JSON, one line).
// The service account's e-mail must be added as a user of the property in
// Search Console (Settings > Users and permissions, Full or Restricted).

export function agentAuthorized(req: Request): boolean {
  const expected = process.env.SEO_AGENT_TOKEN || "";
  const header = req.headers.get("authorization") || "";
  const given = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const GSC_DEFAULT_SITE = process.env.GSC_SITE_URL || "sc-domain:villalithos.com";
export const GSC_ALLOWED_SITES = new Set([
  "sc-domain:villalithos.com",
  "sc-domain:villalithosgreece.com",
  "https://www.villalithos.com/",
  "https://www.villalithosgreece.com/",
]);

type ServiceAccount = { client_email: string; private_key: string };

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

let cachedToken: { value: string; expiresAt: number } | null = null;

export function gscConfigured(): boolean {
  return Boolean(process.env.GSC_SERVICE_ACCOUNT_JSON);
}

export async function gscAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("GSC_SERVICE_ACCOUNT_JSON is not set");
  let sa: ServiceAccount;
  try {
    sa = JSON.parse(raw) as ServiceAccount;
  } catch {
    throw new Error("GSC_SERVICE_ACCOUNT_JSON is not valid JSON");
  }
  if (!sa.client_email || !sa.private_key) throw new Error("GSC_SERVICE_ACCOUNT_JSON lacks client_email or private_key");

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = b64url(signer.sign(sa.private_key.replace(/\\n/g, "\n")));

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Google token endpoint ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in || 3600) * 1000 };
  return cachedToken.value;
}

export type GscRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

export type GscFilter = { dimension: "query" | "page" | "country" | "device"; operator: "contains" | "equals" | "notContains" | "notEquals"; expression: string };

export async function gscQuery(opts: {
  site: string;
  startDate: string;
  endDate: string;
  dimensions: string[];
  filters?: GscFilter[];
  dataState?: "final" | "all";
  maxRows?: number;
}): Promise<GscRow[]> {
  const token = await gscAccessToken();
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(opts.site)}/searchAnalytics/query`;
  const pageSize = 25000;
  const maxRows = opts.maxRows ?? 100000;
  const rows: GscRow[] = [];
  for (let startRow = 0; startRow < maxRows; startRow += pageSize) {
    const body: Record<string, unknown> = {
      startDate: opts.startDate,
      endDate: opts.endDate,
      dimensions: opts.dimensions,
      rowLimit: pageSize,
      startRow,
      dataState: opts.dataState || "final",
    };
    if (opts.filters && opts.filters.length) body.dimensionFilterGroups = [{ filters: opts.filters }];
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Search Console ${res.status}: ${(await res.text()).slice(0, 300)}`);
    const data = (await res.json()) as { rows?: GscRow[] };
    const page = data.rows || [];
    rows.push(...page);
    if (page.length < pageSize) break;
  }
  return rows;
}

export async function gscSites(): Promise<Array<{ siteUrl: string; permissionLevel: string }>> {
  const token = await gscAccessToken();
  const res = await fetch("https://searchconsole.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Search Console sites ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { siteEntry?: Array<{ siteUrl: string; permissionLevel: string }> };
  return data.siteEntry || [];
}
