"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type TourGalleryItem = {
  src: string;
  alt?: string;
  caption?: string;
};

type Props = {
  items: TourGalleryItem[];
  title?: string;
  buttonLabel?: string;
  initialIndex?: number;
  className?: string;
};

export default function TourGallery({
  items,
  title,
  buttonLabel = "View gallery",
  initialIndex = 0,
  className = "",
}: Props) {
  const safeItems = useMemo(
    () =>
      (items ?? []).filter(
        (i) => typeof i?.src === "string" && i.src.trim().length > 0
      ),
    [items]
  );

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const canNav = safeItems.length > 1;
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const max = Math.max(0, safeItems.length - 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(Math.max(0, Math.min(initialIndex, max)));
  }, [initialIndex, safeItems.length]);

  // lock body scroll + keyboard nav
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (!canNav) return;

      if (e.key === "ArrowRight") {
        setLoading(true);
        setIndex((i) => (i + 1) % safeItems.length);
      }
      if (e.key === "ArrowLeft") {
        setLoading(true);
        setIndex((i) => (i - 1 + safeItems.length) % safeItems.length);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, canNav, safeItems.length]);

  // swipe
  const pointerDown = useRef(false);
  const startX = useRef(0);
  const dx = useRef(0);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerDown.current = true;
    startX.current = e.clientX;
    dx.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerDown.current) return;
    dx.current = e.clientX - startX.current;
  };

  const onPointerUp = () => {
    if (!pointerDown.current) return;
    pointerDown.current = false;

    if (!canNav) return;
    const delta = dx.current;
    dx.current = 0;

    if (Math.abs(delta) < 60) return;

    setLoading(true);
    if (delta < 0) setIndex((i) => (i + 1) % safeItems.length);
    else setIndex((i) => (i - 1 + safeItems.length) % safeItems.length);
  };

  if (safeItems.length === 0) return null;

  const current = safeItems[index];

  const goPrev = () => {
    if (!canNav) return;
    setLoading(true);
    setIndex((i) => (i - 1 + safeItems.length) % safeItems.length);
  };

  const goNext = () => {
    if (!canNav) return;
    setLoading(true);
    setIndex((i) => (i + 1) % safeItems.length);
  };

  const modal = (
    <div
      className="tg-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Gallery"}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "pan-y" }}
    >
      <div className="tg-shell">
        <div className="tg-top">
          <div className="tg-left">
            <div className="tg-pill">
              {index + 1} / {safeItems.length}
            </div>
            {title ? <div className="tg-title">{title}</div> : null}
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="tg-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="tg-stage">
          {loading ? <div className="tg-loading">Loading…</div> : null}

          <div className="tg-frame">
            <img
              className="tg-image"
              src={current.src}
              alt={current.alt ?? title ?? ""}
              draggable={false}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          </div>

          {canNav ? (
            <>
              <button
                className="tg-arrow tg-prev"
                type="button"
                onClick={goPrev}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className="tg-arrow tg-next"
                type="button"
                onClick={goNext}
                aria-label="Next"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {current.caption ? (
          <div className="tg-caption">{current.caption}</div>
        ) : null}

        {safeItems.length > 1 ? (
          <div className="tg-thumbs">
            <div className="tg-thumbs-inner">
              {safeItems.map((it, i) => (
                <button
                  key={`${it.src}-${i}`}
                  type="button"
                  className={`tg-thumb ${i === index ? "is-active" : ""}`}
                  onClick={() => {
                    setLoading(true);
                    setIndex(i);
                  }}
                  aria-label={`Open image ${i + 1}`}
                >
                  <img src={it.src} alt={it.alt ?? ""} draggable={false} />
                </button>
              ))}
            </div>
            <div className="tg-hint">Swipe • arrows • Esc</div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={`tg-trigger ${className}`}
        onClick={() => {
          const max = Math.max(0, safeItems.length - 1);
          setIndex(Math.max(0, Math.min(initialIndex, max)));
          setLoading(true);
          setOpen(true);
        }}
      >
        {buttonLabel}
      </button>

      {mounted && open ? createPortal(modal, document.body) : null}
    </>
  );
}
