import type { GlobalData, PageData } from "./tina-types";

async function getClient() {
  try {
    // @ts-expect-error — generated at build time by tinacms build
    const mod = await import("../../../tina/__generated__/client");
    return mod.default;
  } catch {
    return null;
  }
}

export async function getGlobalData(): Promise<GlobalData | null> {
  try {
    const client = await getClient();
    if (!client) return null;
    const { data } = await client.queries.global({
      relativePath: "index.json",
    });
    return data.global as GlobalData;
  } catch {
    return null;
  }
}

export async function getPageData(): Promise<PageData | null> {
  try {
    const client = await getClient();
    if (!client) return null;
    const { data } = await client.queries.page({
      relativePath: "home.json",
    });
    return data.page as PageData;
  } catch {
    return null;
  }
}
