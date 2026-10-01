"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type Item = { src: string; alt: string; caption: string; span?: "w2" | "h2" | "w2h2" };

const ITEMS: Item[] = [
  { src: "/img/gallery/Exterior%20%26%20Pool%20(12).jpg", alt: "Villa Lithos at dusk with the heated pool lit", caption: "Pool at dusk", span: "w2h2" },
  { src: "/img/gallery/Living%20%26%20Dining%20(6).jpg", alt: "Living room with stone fireplace wall and wooden ceiling", caption: "Living room" },
  { src: "/img/gallery/Bedrooms%20(3).jpg", alt: "Bedroom with garden access", caption: "Bedroom" },
  { src: "/img/gallery/Exterior%20%26%20Pool%20(15).jpg", alt: "Pergola dining terrace beside the pool at sunset", caption: "Pergola terrace", span: "w2" },
  { src: "/img/gallery/Wellness%20%26%20Spa%20(3).jpg", alt: "Bathtub with a window onto the hills", caption: "Bath with a view" },
  { src: "/img/gallery/Sports%20%26%20Activities.jpg", alt: "Private padel court on the estate", caption: "Padel court" },
  { src: "/img/gallery/Living%20%26%20Dining%20(9).jpg", alt: "Dining room seating the full party", caption: "Dining room", span: "w2" },
  { src: "/img/gallery/Exterior%20%26%20Pool.jpg", alt: "Pool seen from above with the mosaic detail", caption: "From above" },
  { src: "/img/gallery/Wellness%20%26%20Spa.jpg", alt: "Outdoor sauna interior", caption: "Sauna" },
  { src: "/img/gallery/Exterior%20%26%20Pool%20(13).jpg", alt: "Villa facade and pool in daylight", caption: "The house", span: "w2" },
];

export default function BentoGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [list, setList] = useState<{ src: string; alt: string }[]>(ITEMS);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const close = useCallback(() => {
    setOpen(null);
    setList(ITEMS);
  }, []);
  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)),
    [list.length]
  );

  const viewAll = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      const all: { src: string; alt: string }[] = (data.items || []).map((it: { src: string; alt: string }) => ({ src: it.src, alt: it.alt }));
      if (all.length) {
        setList(all);
        setOpen(0);
        return;
      }
    } catch {
      /* fall back to the curated set */
    }
    setOpen(0);
  }, []);

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="vl-section" aria-labelledby="gallery-title">
      <div className="vl-container">
        <header className="vl-head vl-reveal">
          <h2 id="gallery-title" className="vl-h2">Every corner, in its own light</h2>
        </header>

        <div className="vl-bento">
          {ITEMS.map((it, i) => {
            const cls = [
              "vl-bento__item",
              "vl-reveal",
              it.span === "w2" || it.span === "w2h2" ? "vl-bento__item--w2" : "",
              it.span === "h2" || it.span === "w2h2" ? "vl-bento__item--h2" : "",
            ].join(" ");
            return (
              <button
                key={it.src}
                type="button"
                className={cls}
                data-caption={it.caption}
                data-delay={String(i % 4)}
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${it.alt}`}
              >
                <Image src={it.src} alt={it.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
              </button>
            );
          })}
        </div>

        <div className="vl-gallery__foot vl-reveal">
          <button type="button" onClick={viewAll} className="vl-btn vl-btn--ghost">View all photos</button>
        </div>
      </div>

      {mounted && open !== null
        ? createPortal(
            <div className="vl-lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
              <button type="button" className="vl-lb__btn vl-lb__close" onClick={close} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
              <button type="button" className="vl-lb__btn vl-lb__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" className="vl-lb__btn vl-lb__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={list[open].src} alt={list[open].alt} onClick={(e) => e.stopPropagation()} />
              <div className="vl-lb__count">{open + 1} / {list.length}</div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
