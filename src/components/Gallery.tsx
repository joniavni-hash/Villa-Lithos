"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const TourGallery = dynamic(() => import("@/components/TourGallery"), { ssr: false });
type TourGalleryItem = {
  src: string;
  alt?: string;
};
type Props = {
  title: string;
  subtitle: string;
};

export default function Gallery({ title, subtitle }: Props) {
  const [items, setItems] = useState<TourGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch("/api/gallery", { cache: "no-store" });
        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = (await res.json()) as { items?: { src: string; alt?: string }[] };

        const clean = (data.items ?? [])
          .filter((x) => typeof x?.src === "string" && x.src.trim().length > 0)
          .map((x) => ({
            src: x.src,
            alt: x.alt ?? "Villa Lithos photo",
          })) satisfies TourGalleryItem[];

        if (!alive) return;
        setItems(clean);
      } catch (e: unknown) {
        if (!alive) return;
        const message = e instanceof Error ? e.message : "Failed to load gallery";
        setErr(message);
        setItems([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const hasItems = items.length > 0;

  // mobile-first layout: στο mobile το κουμπί κάτω, στο desktop δεξιά
  return (
    <div className="container-page">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">Villa Lithos</p>
          <h2 className="h2 mt-2">{title}</h2>
          <p className="lead mt-3 max-w-2xl">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {loading ? (
            <span className="text-sm opacity-70">Loading…</span>
          ) : hasItems ? (
            <TourGallery
              items={items}
              title={title}
              buttonLabel="View gallery"
              initialIndex={0}
            />
          ) : (
            <span className="text-sm opacity-70">
              {err ? "Gallery unavailable" : "No photos yet"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
