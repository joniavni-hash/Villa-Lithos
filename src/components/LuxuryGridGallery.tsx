"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";

interface GalleryItem {
  src: string;
  alt?: string;
  category?: string; // Θα το γεμίσουμε δυναμικά
}

interface Props {
  title?: string;
  subtitle?: string;
}

const CATEGORIES = [
  "All",
  "Exterior & Pool",
  "Living & Dining",
  "Bedrooms",
  "Kitchen",
  "Wellness",
  "Sports",
];

export default function LuxuryGridGallery({
  title = "Our Gallery",
  subtitle = "Discover Villa Lithos",
}: Props) {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // 1. Fetch και Αυτόματη Κατηγοριοποίηση βάσει ονόματος αρχείου
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        
        const categorized = (data.items || []).map((img: GalleryItem) => {
          const name = img.src.toLowerCase();
          let cat = "Exterior & Pool"; // Default

          if (name.includes("room")) cat = "Bedrooms";
          else if (name.includes("salon") || name.includes("trapezaria") || name.includes("inside")) cat = "Living & Dining";
          else if (name.includes("kichen") || name.includes("kicheb")) cat = "Kitchen";
          else if (name.includes("sauna") || name.includes("bathroom")) cat = "Wellness";
          else if (name.includes("padel")) cat = "Sports";
          else if (name.includes("pool") || name.includes("view") || name.includes("barbeque") || name.includes("exterior")) cat = "Exterior & Pool";

          return { ...img, category: cat };
        });

        setImages(categorized);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // 2. Φιλτράρισμα εικόνων
  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // 3. Navigation Lightbox
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [filteredImages.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [filteredImages.length]);

  return (
    <section className="py-20 bg-[#fdfdfd]">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#8B9A7D] uppercase tracking-[0.3em] text-xs font-bold mb-4 block">
            {subtitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-8 italic">
            {title}
          </h2>

          {/* Filters - Pinterest Style Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#1a1a1a] text-white shadow-lg"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid - Portrait Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-[2/3] overflow-hidden rounded-2xl bg-gray-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <Image
                src={img.src}
                alt={img.alt || "Villa Lithos"}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/70 text-[10px] uppercase tracking-widest mb-1">
                  {img.category}
                </p>
                <h3 className="text-white text-lg font-medium">
                  {img.alt || "Villa Lithos Experience"}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Lightbox Modal */}
      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Close */}
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          {/* Controls */}
          <button 
            onClick={showPrev}
            className="absolute left-4 md:left-10 p-4 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={filteredImages[selectedIdx].src}
              alt="Villa Gallery"
              fill
              className="object-contain"
              priority
            />
          </div>

          <button 
            onClick={showNext}
            className="absolute right-4 md:right-10 p-4 text-white hover:bg-white/10 rounded-full transition-all"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="absolute bottom-10 text-white/80 text-sm tracking-widest">
            {selectedIdx + 1} / {filteredImages.length}
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease; }
      `}</style>
    </section>
  );
}