import { readFileSync } from "fs";
import { join } from "path";
import type { GlobalData, PageData } from "./tina-types";

/**
 * Read content JSON files directly from the filesystem.
 * TinaCMS admin edits these files (committed to git via TinaCloud),
 * and the site reads them at build/request time — no tinacms build needed.
 */

export async function getGlobalData(): Promise<GlobalData | null> {
  try {
    const filePath = join(process.cwd(), "content/global/index.json");
    const raw = readFileSync(filePath, "utf8");
    return JSON.parse(raw) as GlobalData;
  } catch {
    return null;
  }
}

export async function getPageData(): Promise<PageData | null> {
  try {
    const filePath = join(process.cwd(), "content/page/home.json");
    const raw = readFileSync(filePath, "utf8");
    return JSON.parse(raw) as PageData;
  } catch {
    return null;
  }
}
