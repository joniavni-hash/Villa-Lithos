"use client";

import dynamic from "next/dynamic";
import config from "../../../../tina/config";

const TinaAdmin = dynamic(() => import("tinacms").then((m) => m.TinaAdmin), {
  ssr: false,
});

export default function AdminPage() {
  return <TinaAdmin config={config} />;
}
