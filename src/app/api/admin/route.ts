import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_FILES: Record<string, string> = {
  global: "content/global/index.json",
  page: "content/page/home.json",
};

const REPO = "Zoi14/Villa-Lithos";

/** GET /api/admin?file=global|page → returns JSON content */
export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");
  if (!file || !CONTENT_FILES[file]) {
    return NextResponse.json({ error: "Invalid file param" }, { status: 400 });
  }

  try {
    const filePath = join(process.cwd(), CONTENT_FILES[file]);
    const content = JSON.parse(readFileSync(filePath, "utf8"));
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

/** PUT /api/admin { file, content, password } → saves content */
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { file, content, password } = body;

  if (!file || !CONTENT_FILES[file]) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }

  // Simple password protection
  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminPass && password !== adminPass) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const jsonStr = JSON.stringify(content, null, 2) + "\n";
  const githubToken = process.env.GITHUB_TOKEN;

  if (githubToken) {
    // Production (Vercel): commit to GitHub via API
    try {
      const path = CONTENT_FILES[file];

      // 1. Get current file SHA
      const getRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!getRes.ok) {
        return NextResponse.json(
          { error: "Failed to read file from GitHub" },
          { status: 500 }
        );
      }

      const { sha } = await getRes.json();

      // 2. Update file via GitHub Contents API
      const updateRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/${path}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message: `content: update ${file === "global" ? "site settings" : "home page"}`,
            content: Buffer.from(jsonStr).toString("base64"),
            sha,
          }),
        }
      );

      if (!updateRes.ok) {
        const err = await updateRes.text();
        return NextResponse.json(
          { error: `GitHub API error: ${err}` },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Saved to GitHub. Site will redeploy in ~2 minutes.",
      });
    } catch (e) {
      return NextResponse.json(
        { error: `Save failed: ${e}` },
        { status: 500 }
      );
    }
  } else {
    // Local development: write to filesystem
    try {
      const filePath = join(process.cwd(), CONTENT_FILES[file]);
      writeFileSync(filePath, jsonStr);
      return NextResponse.json({
        success: true,
        message: "Saved locally.",
      });
    } catch (e) {
      return NextResponse.json(
        { error: `Local save failed: ${e}` },
        { status: 500 }
      );
    }
  }
}
