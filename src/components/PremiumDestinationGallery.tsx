"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// --- Types (Matching the API) ---

type CategoryId = "all" | "rooms" | "interior" | "pool" | "exterior" | "wellness" | "sports";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: CategoryId;
  title: string;
  description: string;
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
// Αντιστοιχίζουμε τα IDs του API με εικονίδια
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
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Fetch Data
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

  // Filter Logic
  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter((img) => img.category === activeCategory);

  // Keyboard Navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    document.body.style.overflow = "hidden"; // Lock scroll
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = ""; // Unlock scroll
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredImages]);

  const showNext = () => {
    setIsImageLoading(true);
    setLightboxIndex((prev) => 
      prev === null || prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const showPrev = () => {
    setIsImageLoading(true);
    setLightboxIndex((prev) => 
      prev === null || prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  if (loading) return <GallerySkeleton />;

  return (
    <section className="py-20 md:py-32 bg-[#FAFAF8] text-[#1F1E1C]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-[#8B7E6A] uppercase">
            {subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#111]">
            {title}
          </h2>
          <div className="w-16 h-[1px] bg-[#8B7E6A]/30 mt-6" />
        </div>

        {/* --- Categories Filters --- */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex justify-start md:justify-center gap-2 min-w-max px-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-500
                  ${activeCategory === cat.id 
                    ? "bg-[#111] text-white shadow-xl scale-105" 
                    : "bg-white text-[#666] border border-[#E5E2DC] hover:border-[#111] hover:text-[#111]"
                  }
                `}
              >
                <span className={`opacity-70 group-hover:opacity-100 transition-opacity`}>
                   {CATEGORY_ICONS[cat.id] || CATEGORY_ICONS["all"]}
                </span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Masonry-style Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => {
                setLightboxIndex(index);
                setIsImageLoading(true);
              }}
              className="group cursor-pointer flex flex-col gap-3"
            >
              {/* Image Container */}
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
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-white/95 backdrop-blur rounded-full shadow-lg">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                       <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex flex-col items-center text-center mt-2 px-4">
                 <h3 className="font-serif text-lg text-[#111] leading-tight mb-1 group-hover:text-[#8B7E6A] transition-colors">
                   {image.title}
                 </h3>
                 <p className="text-[13px] text-[#666] line-clamp-1 max-w-[90%]">
                   {image.description}
                 </p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
           <div className="py-24 text-center text-[#888]">
             <p>No images found in this category.</p>
           </div>
        )}

      </div>

      {/* --- PREMIUM LIGHTBOX --- */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md animate-in fade-in duration-300">
          
          {/* Controls */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 p-4 text-white/50 hover:text-white transition-colors"
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white transition-colors hidden md:block"
          >
            <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white transition-colors hidden md:block"
          >
             <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1">
               <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Main Image Stage */}
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12" onClick={() => setLightboxIndex(null)}>
            <div 
              className="relative w-full h-full max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()} 
            >
              {isImageLoading && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                 </div>
              )}
              
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onLoad={() => setIsImageLoading(false)}
              />
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-4" onClick={(e) => e.stopPropagation()}>
               <div className="inline-block max-w-2xl bg-black/40 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/10">
                 <h3 className="font-serif text-2xl text-white mb-2">
                   {filteredImages[lightboxIndex].title}
                 </h3>
                 <p className="text-sm text-white/80 font-light leading-relaxed">
                   {filteredImages[lightboxIndex].description}
                 </p>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- Skeleton Component ---
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