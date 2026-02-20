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

/** GET /api/admin/images?path=img/gallery  → list images in folder */
export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("path") || "img";
  const fullPath = `public/${folder}`;

  const token = getToken();
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${fullPath}?ref=main`,
      { headers: ghHeaders() }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }

    const items = await res.json();

    // Filter to images and directories
    const result = (Array.isArray(items) ? items : []).map(
      (item: { name: string; type: string; size: number; sha: string; path: string }) => ({
        name: item.name,
        type: item.type, // "file" or "dir"
        size: item.size,
        sha: item.sha,
        path: item.path.replace("public/", "/"), // /img/gallery/photo.webp
      })
    );

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to list" }, { status: 500 });
  }
}

/** POST /api/admin/images { path, filename, content (base64), password } */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { path: folder, filename, content, password } = body;

  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminPass && password !== adminPass) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = getToken();
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  const filePath = `public/${folder}/${filename}`;

  try {
    // Check if file exists (to get SHA for update)
    let sha: string | undefined;
    const checkRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=main`,
      { headers: ghHeaders() }
    );
    if (checkRes.ok) {
      const existing = await checkRes.json();
      sha = existing.sha;
    }

    // Upload/update file
    const uploadRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${filePath}`,
      {
        method: "PUT",
        headers: ghHeaders(),
        body: JSON.stringify({
          message: `images: upload ${filename} to ${folder}`,
          content, // already base64
          ...(sha ? { sha } : {}),
        }),
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      return NextResponse.json({ error: `Upload failed: ${err}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      path: `/${folder}/${filename}`,
      message: "Image uploaded. Site will redeploy in ~2 minutes.",
    });
  } catch (e) {
    return NextResponse.json({ error: `Upload error: ${e}` }, { status: 500 });
  }
}

/** DELETE /api/admin/images { filePath, password } */
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { filePath, password } = body;

  const adminPass = process.env.ADMIN_PASSWORD;
  if (adminPass && password !== adminPass) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = getToken();
  if (!token) {
    return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
  }

  const ghPath = `public${filePath}`;

  try {
    // Get SHA
    const getRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${ghPath}?ref=main`,
      { headers: ghHeaders() }
    );

    if (!getRes.ok) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const { sha } = await getRes.json();

    // Delete
    const delRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${ghPath}`,
      {
        method: "DELETE",
        headers: ghHeaders(),
        body: JSON.stringify({
          message: `images: delete ${filePath}`,
          sha,
        }),
      }
    );

    if (!delRes.ok) {
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Image deleted. Site will redeploy in ~2 minutes.",
    });
  } catch (e) {
    return NextResponse.json({ error: `Delete error: ${e}` }, { status: 500 });
  }
}
