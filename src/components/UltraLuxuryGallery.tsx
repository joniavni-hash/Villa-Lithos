"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// --- Types ---
type CategoryId = "all" | "rooms" | "interior" | "pool" | "exterior" | "wellness" | "sports";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: CategoryId;
  // Κρατάμε τα πεδία για να μην χτυπάει το TypeScript, αλλά τα αγνοούμε στο UI
  title?: string;
  description?: string;
}

interface CategoryData {
  id: CategoryId;
  label: string;
}

interface Props {
  title?: string;
  subtitle?: string;
}

// --- Icons Mapping ---
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  all: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  rooms: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M4 10V6a2 2 0 012-2h12a2 2 0 012 2v4" />
      <path d="M12 4v6" />
    </svg>
  ),
  interior: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  ),
  pool: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12h20" />
      <path d="M2 16c5 3 15-3 20 0" />
      <path d="M12 3v5" />
      <path d="M8 5l4-2 4 2" />
    </svg>
  ),
  exterior: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="8 6 12 2 16 6" />
    </svg>
  ),
  wellness: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2.69l5.74 5.74a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  sports: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
};

export default function PremiumGallery({
  title = "Visual Narrative",
  subtitle = "DISCOVER THE ESTATE",
}: Props) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [loading, setLoading] = useState(true);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Touch swipe state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Scroll animation state
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        const data = await res.json();
        setImages(data.items);
        setCategories(data.categories);
      } catch (error) {
        console.error("Gallery Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter((img) => img.category === activeCategory);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.getAttribute('data-image-id');
            if (imageId) {
              setVisibleImages(prev => new Set([...prev, imageId]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const imageElements = document.querySelectorAll('[data-image-id]');
    imageElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredImages]);

  const showNext = useCallback(() => {
    setIsImageLoading(true);
    setLightboxIndex((prev) =>
      prev === null || prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const showPrev = useCallback(() => {
    setIsImageLoading(true);
    setLightboxIndex((prev) =>
      prev === null || prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  // Touch handlers for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      showNext();
    }
    if (isRightSwipe) {
      showPrev();
    }
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, showNext, showPrev]);

  if (loading) return <GallerySkeleton />;

  return (
    <section className="py-20 md:py-32 bg-[#FAFAF8] text-[#1F1E1C]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#8B7E6A] uppercase">
            {subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#111]">
            {title}
          </h2>
          <div className="w-16 h-[1px] bg-[#8B7E6A]/30 mt-6" />
        </div>

        {/* Categories */}
        <div className="mb-14 overflow-x-auto pb-6 scrollbar-hide">
          <div className="flex justify-start md:justify-center gap-4 min-w-max px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  relative group flex items-center gap-2 px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]
                  border-2 active:translate-y-1 active:shadow-none
                  ${activeCategory === cat.id
                    ? "bg-[#1F1E1C] border-[#1F1E1C] text-[#FAFAF8] shadow-[0_6px_0_#4A4A48]"
                    : "bg-[#FAFAF8] border-[#E5E2DC] text-[#8B7E6A] shadow-[0_6px_0_#E5E2DC] hover:border-[#8B7E6A] hover:text-[#1F1E1C] hover:shadow-[0_6px_0_#8B7E6A] hover:-translate-y-1"
                  }
                `}
              >
                <span className={`opacity-80 group-hover:opacity-100 transition-opacity`}>
                  {CATEGORY_ICONS[cat.id] || CATEGORY_ICONS["all"]}
                </span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid (No Text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredImages.map((image, index) => {
            const isVisible = visibleImages.has(image.id);
            return (
              <div
                key={image.id}
                data-image-id={image.id}
                onClick={() => {
                  setLightboxIndex(index);
                  setIsImageLoading(true);
                }}
                className={`group cursor-pointer block transition-all duration-700 ease-out ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#E8E5DF]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8fvx4PQAIrwM4y5UN+QAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Icon on Hover (Optional - remove if you want 100% clean grid too) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 bg-white/95 backdrop-blur rounded-full shadow-lg flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500">
                      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- PREMIUM LIGHTBOX (NO CAPTIONS) --- */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-[20px] animate-in fade-in duration-500"
          onClick={() => setLightboxIndex(null)}
        >
          {/* --- Controls --- */}

          {/* Close Button (Desktop Only) */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="hidden md:flex absolute top-6 right-6 z-[120] items-center justify-center w-12 h-12 rounded-full bg-black/30 text-white/70 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev/Next Buttons (Desktop) */}
          <button
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-[110] items-center justify-center w-14 h-14 rounded-full bg-black/30 text-white/70 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-[110] items-center justify-center w-14 h-14 rounded-full bg-black/30 text-white/70 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16 lg:p-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full h-full max-w-[100vw] max-h-[100vh] flex items-center justify-center"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                </div>
              )}

              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                className={`object-contain transition-all duration-500 ease-out ${isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                sizes="100vw"
                priority
                onLoad={() => setIsImageLoading(false)}
              />
            </div>
          </div>

          {/* Controls - Mobile Only (Floating Bar) */}
          <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[120] inline-flex flex-row items-center gap-2 p-1.5 rounded-full bg-black/50 backdrop-blur-lg border border-white/10 shadow-2xl">
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-white/80 active:bg-white/10 transition-colors shrink-0"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-white/80 active:bg-white/10 transition-colors shrink-0"
            >
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full text-white/80 active:bg-white/10 transition-colors shrink-0"
            >
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function GallerySkeleton() {
  return (
    <div className="py-24 max-w-[1400px] mx-auto px-6">
      <div className="w-48 h-4 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />
      <div className="w-96 h-12 bg-gray-200 rounded mx-auto mb-16 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-[4/5] bg-gray-100 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}