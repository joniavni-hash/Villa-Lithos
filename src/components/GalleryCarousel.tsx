"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

type GalleryItem = {
  src: string;
  alt?: string;
};

type Props = {
  title: string;
  subtitle: string;
};

export default function GalleryCarousel({ title, subtitle }: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch gallery items
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
          })) satisfies GalleryItem[];

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

  // Scroll handlers for carousel
  const scroll = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Navigate lightbox
  const navigateLightbox = useCallback((direction: "prev" | "next") => {
    setLightboxIndex((prev) => {
      if (direction === "prev") {
        return (prev - 1 + items.length) % items.length;
      }
      return (prev + 1) % items.length;
    });
  }, [items.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };

    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  const hasItems = items.length > 0;

  // Lightbox modal
  const lightboxModal = lightboxOpen && hasItems && (
    <div
      className="gallery-lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image viewer"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeLightbox();
      }}
    >
      <div className="gallery-lightbox-content">
        <button
          ref={closeBtnRef}
          type="button"
          className="gallery-lightbox-close"
          onClick={closeLightbox}
          aria-label="Close gallery"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="gallery-lightbox-counter">
          {lightboxIndex + 1} / {items.length}
        </div>

        <button
          type="button"
          className="gallery-lightbox-nav gallery-lightbox-prev"
          onClick={() => navigateLightbox("prev")}
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="gallery-lightbox-image-wrapper">
          <Image
            src={items[lightboxIndex].src}
            alt={items[lightboxIndex].alt || "Gallery image"}
            fill
            sizes="100vw"
            className="gallery-lightbox-image"
            priority
          />
        </div>

        <button
          type="button"
          className="gallery-lightbox-nav gallery-lightbox-next"
          onClick={() => navigateLightbox("next")}
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="gallery-carousel-section">
      <div className="container-page">
        {/* Header */}
        <div className="gallery-carousel-header">
          <p className="kicker">Villa Lithos</p>
          <h2 className="h2 mt-2">{title}</h2>
          <p className="lead mt-3">{subtitle}</p>
        </div>
      </div>

      {/* Carousel */}
      {loading ? (
        <div className="gallery-carousel-loading">
          <span>Loading gallery...</span>
        </div>
      ) : !hasItems ? (
        <div className="gallery-carousel-empty">
          <span>{err ? "Gallery unavailable" : "No photos yet"}</span>
        </div>
      ) : (
        <div className="gallery-carousel-wrapper">
          {/* Navigation buttons */}
          <button
            type="button"
            className="gallery-carousel-nav gallery-carousel-nav--left"
            onClick={() => scroll("left")}
            aria-label="Scroll gallery left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            className="gallery-carousel-nav gallery-carousel-nav--right"
            onClick={() => scroll("right")}
            aria-label="Scroll gallery right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Scrollable track */}
          <div
            ref={carouselRef}
            className="gallery-carousel-track"
            role="region"
            aria-label="Gallery carousel"
          >
            {items.map((item, index) => (
              <button
                key={item.src}
                type="button"
                className="gallery-carousel-item"
                onClick={() => openLightbox(index)}
                aria-label={`View ${item.alt || `image ${index + 1}`}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt || "Villa Lithos"}
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
                  className="gallery-carousel-image"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox portal */}
      {mounted && lightboxOpen ? createPortal(lightboxModal, document.body) : null}
    </div>
  );
}
