import { NextRequest, NextResponse } from "next/server";

const REPO = "Zoi14/Villa-Lithos";

function getToken() {
  return process.env.GITHUB_TOKEN || "";
}

function ghHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

/** GET /api/admin/gallery-meta → read gallery metadata */
export async function GET() {
  const token = getToken();
  if (!token) {
    // Fallback: read from local filesystem in dev
    try {
      const fs = await import("fs");
      const path = await import("path");
      const metaPath = path.join(process.cwd(), "content/gallery-meta.json");
      const raw = fs.readFileSync(metaPath, "utf-8");
      return NextResponse.json(JSON.parse(raw));
    } catch {
      return NextResponse.json({});
    }
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/content/gallery-meta.json?ref=main`,
      { headers: ghHeaders() }
    );

    if (!res.ok) return NextResponse.json({});

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({});
  }
}

/** POST /api/admin/gallery-meta { meta, password } → save gallery metadata */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { meta, password } = body;

  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminPass && password !== adminPass) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = getToken();
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  const filePath = "content/gallery-meta.json";
  const content = Buffer.from(JSON.stringify(meta, null, 2)).toString("base64");

  try {
    // Get SHA for update
    let sha: string | undefined;
    const checkRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=main`,
      { headers: ghHeaders() }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }

    const uploadRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: ghHeaders(),
        body: JSON.stringify({
          message: `content: update gallery metadata`,
          content,
          ...(sha ? { sha } : {}),
        }),
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      return NextResponse.json({ error: `Save failed: ${err}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Gallery descriptions saved. Site will redeploy in ~2 minutes.",
    });
  } catch (e) {
    return NextResponse.json({ error: `Save error: ${e}` }, { status: 500 });
  }
}
