// src/app/api/gallery/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import path from "path";

const ALLOWED_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function isImageFile(name: string) {
  const ext = path.extname(name).toLowerCase();
  return ALLOWED_EXT.has(ext);
}

// Natural sort: 1,2,3,10 (όχι 1,10,2)
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "img", "gallery");
    const files = await readdir(galleryDir);

    const items = files
      .filter(isImageFile)
      .sort((a, b) => collator.compare(a, b))
      .map((file) => ({
        src: `/img/gallery/${file}`,
        alt: path.parse(file).name.replace(/[-_]/g, " "),
      }));

    return NextResponse.json({ items });
  } catch (err) {
    // Μην σπάει το site αν κάτι πάει στραβά
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
