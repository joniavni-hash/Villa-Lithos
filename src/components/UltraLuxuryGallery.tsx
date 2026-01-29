"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

// Image descriptions for each photo
const imageDescriptions: Record<string, { title: string; alt: string }> = {
  // Exterior & Pool
  'Exterior & Pool.jpg': { title: 'Illuminated Pool at Twilight', alt: 'Aerial view of the infinity pool beautifully lit at night' },
  'Exterior & Pool (2).jpg': { title: 'Morning Yoga by the Pool', alt: 'Yoga session beside the pool with mountain views' },
  'Exterior & Pool (3).jpg': { title: 'Poolside Relaxation', alt: 'Comfortable sun loungers by the infinity pool' },
  'Exterior & Pool (4).jpg': { title: 'Alfresco Dining Terrace', alt: 'Outdoor dining area overlooking the pool and mountains' },
  'Exterior & Pool (5).jpg': { title: 'Estate Aerial View', alt: 'Aerial view of the entire property with pool and padel court at dusk' },
  'Exterior & Pool (6).jpg': { title: 'Villa at Golden Hour', alt: 'The villa illuminated at sunset with sea and city views' },
  'Exterior & Pool (7).jpg': { title: 'Refreshing Pool Moments', alt: 'Guest relaxing in the crystal-clear pool water' },
  'Exterior & Pool (8).jpg': { title: 'Shaded Pool Lounge', alt: 'Friends enjoying the pool area under the pergola' },
  'Exterior & Pool (9).jpg': { title: 'Evening Pool Ambiance', alt: 'Pool area with loungers beautifully lit at night' },
  'Exterior & Pool (10).jpg': { title: 'Outdoor Shower with Views', alt: 'Pool shower surrounded by natural landscape' },
  'Exterior & Pool (11).jpg': { title: 'Poolside Fresh Fruits', alt: 'Sun lounger with fresh seasonal fruits by the pool' },
  'Exterior & Pool (12).jpg': { title: 'Villa Night Scene', alt: 'The villa and pool area under the evening sky' },
  'Exterior & Pool (13).jpg': { title: 'Pool Waterfall Feature', alt: 'Villa exterior with the stunning pool waterfall' },
  'Exterior & Pool (14).jpg': { title: 'Sunset Over the Estate', alt: 'Aerial view of villa at sunset with rocky landscape' },

  // Living & Dining
  'Living & Dining.jpg': { title: 'Stone Wall Living Room', alt: 'Elegant living room with natural stone accent wall' },
  'Living & Dining (3).jpg': { title: 'Work from Paradise', alt: 'Guest working remotely in the bright living room' },
  'Living & Dining (4).jpg': { title: 'Modern Kitchen Island', alt: 'Fully equipped kitchen with island and dining space' },
  'Living & Dining (5).jpg': { title: 'Main Living Room', alt: 'Spacious living room with comfortable sofas' },
  'Living & Dining (6).jpg': { title: 'Fireplace Lounge', alt: 'Living room with wooden beamed ceiling and fireplace' },
  'Living & Dining (8).jpg': { title: 'Elegant Dining Corner', alt: 'Dining table set near the staircase' },
  'Living & Dining (9).jpg': { title: 'Dining with Pool View', alt: 'Dining area connected to living room with pool views' },
  'Living & Dining (10).jpg': { title: 'Grand Dining Table', alt: 'Large dining table perfect for family gatherings' },

  // Bedrooms
  'Bedrooms.jpg': { title: 'Loft Relaxation Area', alt: 'Cozy loft space with sofas and bean bags' },
  'Bedrooms (2).jpg': { title: 'Entertainment Loft', alt: 'Loft area with large TV and wooden ceiling' },
  'Bedrooms (3).jpg': { title: 'Serene Master Bedroom', alt: 'Bedroom with elegant pendant lights and garden view' },
  'Bedrooms (4).jpg': { title: 'Warm & Inviting Suite', alt: 'Comfortable bedroom with soft lighting' },
  'Bedrooms (5).jpg': { title: 'Bedroom with Court View', alt: 'Bedroom overlooking the private padel court' },

  // Wellness & Spa
  'Wellness & Spa.jpg': { title: 'Finnish Barrel Sauna', alt: 'Interior of the authentic wooden sauna' },
  'Wellness & Spa (2).jpg': { title: 'Garden Sauna Retreat', alt: 'Outdoor barrel sauna surrounded by olive trees' },
  'Wellness & Spa (3).jpg': { title: 'Bathtub with Sea Views', alt: 'Luxurious bathtub overlooking the coastline' },
  'Wellness & Spa (4).jpeg': { title: 'Spa Treatment Area', alt: 'Relaxing spa and wellness space' },
  'Wellness & Spa (5).jpeg': { title: 'Wellness Corner', alt: 'Tranquil wellness amenities' },
  'Wellness & Spa (6).jpg': { title: 'Modern Designer Bathroom', alt: 'Contemporary bathroom with bathtub and rain shower' },

  // Sports & Activities
  'Sports & Activities.jpg': { title: 'Private Padel Court', alt: 'Professional padel court with mountain backdrop' },
  'Sports & Activities (2).jpg': { title: 'Night Padel Session', alt: 'Floodlit padel court for evening games' },
  'Sports & Activities (3).jpg': { title: 'Fitness with a View', alt: 'Treadmill workout with panoramic views' },
  'Sports & Activities (4).jpg': { title: 'Fully Equipped Gym', alt: 'Home gym with weight training equipment' },

  // Kitchen
  'Kitchen.jpg': { title: 'Bespoke Wooden Kitchen', alt: 'Custom-designed kitchen with premium cabinetry' },
}

// Helper function to get title and alt for each image
const getImageInfo = (filename: string): { title: string; alt: string } => {
  return imageDescriptions[filename] || { title: 'Villa Lithos', alt: 'Luxury accommodation at Villa Lithos' }
}

// --- FIX: Helper function to encode URL correctly ---
// Αυτό φτιάχνει τα σύμβολα &, (), κενά
const getEncodedPath = (filename: string) => `/img/gallery/${encodeURIComponent(filename)}`

// Generate image array from folder structure
const generateImageArray = () => {
  const images: { src: string; alt: string; title: string; category: string }[] = []

  // Exterior & Pool: 1 base + 14 numbered (2-14) = 14 total
  const extBase = 'Exterior & Pool.jpg'
  images.push({
    src: getEncodedPath(extBase),
    alt: getImageInfo(extBase).alt,
    title: getImageInfo(extBase).title,
    category: 'exterior'
  })
  for (let i = 2; i <= 14; i++) {
    const filename = `Exterior & Pool (${i}).jpg`
    images.push({
      src: getEncodedPath(filename),
      alt: getImageInfo(filename).alt,
      title: getImageInfo(filename).title,
      category: 'exterior'
    })
  }

  // Living & Dining: 1 base + numbered (excluding 2, 3, 7) = 7 total
  const livBase = 'Living & Dining.jpg'
  images.push({
    src: getEncodedPath(livBase),
    alt: getImageInfo(livBase).alt,
    title: getImageInfo(livBase).title,
    category: 'living'
  })
  for (let i = 4; i <= 10; i++) {
    if (i === 7) continue
    const filename = `Living & Dining (${i}).jpg`
    images.push({
      src: getEncodedPath(filename),
      alt: getImageInfo(filename).alt,
      title: getImageInfo(filename).title,
      category: 'living'
    })
  }

  // Bedrooms: 1 base + 5 numbered (2-5) = 5 total
  const bedBase = 'Bedrooms.jpg'
  images.push({
    src: getEncodedPath(bedBase),
    alt: getImageInfo(bedBase).alt,
    title: getImageInfo(bedBase).title,
    category: 'bedrooms'
  })
  for (let i = 2; i <= 5; i++) {
    const filename = `Bedrooms (${i}).jpg`
    images.push({
      src: getEncodedPath(filename),
      alt: getImageInfo(filename).alt,
      title: getImageInfo(filename).title,
      category: 'bedrooms'
    })
  }

  // Wellness & Spa: 1 base + numbered (2-3 jpg, 4-5 jpeg, 6 jpg)
  const wellBase = 'Wellness & Spa.jpg'
  images.push({
    src: getEncodedPath(wellBase),
    alt: getImageInfo(wellBase).alt,
    title: getImageInfo(wellBase).title,
    category: 'wellness'
  })
  // 2-3 are .jpg
  for (let i = 2; i <= 3; i++) {
    const filename = `Wellness & Spa (${i}).jpg`
    images.push({
      src: getEncodedPath(filename),
      alt: getImageInfo(filename).alt,
      title: getImageInfo(filename).title,
      category: 'wellness'
    })
  }
  // 4-5 are .jpeg
  for (let i = 4; i <= 5; i++) {
    const filename = `Wellness & Spa (${i}).jpeg`
    images.push({
      src: getEncodedPath(filename),
      alt: getImageInfo(filename).alt,
      title: getImageInfo(filename).title,
      category: 'wellness'
    })
  }
  // 6 is .jpg
  const well6 = 'Wellness & Spa (6).jpg'
  images.push({
    src: getEncodedPath(well6),
    alt: getImageInfo(well6).alt,
    title: getImageInfo(well6).title,
    category: 'wellness'
  })

  // Sports & Activities: 1 base + 4 numbered (2-4) = 4 total
  const sportBase = 'Sports & Activities.jpg'
  images.push({
    src: getEncodedPath(sportBase),
    alt: getImageInfo(sportBase).alt,
    title: getImageInfo(sportBase).title,
    category: 'sports'
  })
  for (let i = 2; i <= 4; i++) {
    const filename = `Sports & Activities (${i}).jpg`
    images.push({
      src: getEncodedPath(filename),
      alt: getImageInfo(filename).alt,
      title: getImageInfo(filename).title,
      category: 'sports'
    })
  }

  return images
}

const villaImages = generateImageArray()

interface Props {
  title?: string;
  subtitle?: string;
}

export default function UltraLuxuryGallery({
  title = "The Gallery",
  subtitle = "EXPLORE",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(2)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [showFullGallery, setShowFullGallery] = useState(false)

  /* ========== ANIMATION STATE ========== */
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev' | null>(null)

  // Mobile centered slider config
  const mobileSlideWidth = 82 // percentage of container width
  const mobileSpaceBetween = 15 // pixels

  // Minimum swipe distance
  const minSwipeDistance = 50

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) {
        setSlidesPerView(1) // Centered mode uses 1 slide
      } else {
        setSlidesPerView(2)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null)
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % villaImages.length)
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + villaImages.length) % villaImages.length)
      }
    }

    // Hide header when lightbox is open
    const header = document.querySelector('.site-header') as HTMLElement
    const originalDisplay = header ? header.style.display : ''
    if (header) {
      header.style.display = 'none'
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      // Restore header
      if (header) {
        header.style.display = originalDisplay
      }
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxIndex])

  // For mobile centered mode, max is last image index
  // For desktop, it's length - slidesPerView
  const maxIndex = isMobile
    ? villaImages.length - 1
    : Math.max(0, Math.ceil(villaImages.length - slidesPerView))

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }, [maxIndex])

  // Get desktop transform
  const getDesktopTransform = () => {
    return `translateX(-${currentIndex * (100 / slidesPerView)}%)`
  }

  return (
    <section className={`bg-background overflow-hidden ${showFullGallery ? 'py-1 md:pt-4 md:pb-8' : 'py-2 md:py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-0 md:px-6 lg:px-8">

        {showFullGallery ? (
          /* ========== FULL GALLERY GRID VIEW ========== */
          <div
            className="opacity-0"
            style={{
              animation: 'galleryFadeSlideIn 0.6s ease-out forwards',
            }}
          >
            {/* Back Button - Sticky */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm py-3 px-4 md:px-0 border-b border-[#E8E0D8]/50 flex justify-center">
              <button
                onClick={() => setShowFullGallery(false)}
                className="group inline-flex items-center gap-3 transition-all duration-300 hover:gap-4"
                style={{ color: '#8B7355' }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group-hover:bg-[#8B7355]/10"
                  style={{ border: '1.5px solid #8B7355' }}
                >
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                <span className="relative text-sm font-medium tracking-widest uppercase">
                  Back to Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8B7355] transition-all duration-300 group-hover:w-full" />
                </span>
              </button>
            </div>

            {/* Full Gallery Header - More breathing room */}
            <div className="flex flex-col items-center text-center mt-4 md:mt-6 mb-6 md:mb-10 px-4 md:px-0">
              <h2 className="concierge__title mb-3 md:mb-4 text-center">Full Gallery</h2>
              <span className="concierge__kicker mb-3 md:mb-4 text-center block">Complete Collection</span>
              <p className="text-muted-foreground text-center max-w-lg mx-auto">
                Explore every detail of Villa Lithos through our curated collection
              </p>
            </div>

            {/* Grid Layout - Increased gaps for luxury spacing */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8 px-4 md:px-0 mb-8 md:mb-12">
              {villaImages.map((image, index) => (
                <div
                  key={image.src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted cursor-pointer opacity-0 shadow-sm hover:shadow-xl transition-shadow duration-500"
                  style={{
                    animation: `gridItemFadeIn 0.5s ease-out ${0.1 + index * 0.04}s forwards`,
                  }}
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F7F6F4] z-0">
                    <div className="w-8 h-8 border-2 border-[#8B7355]/30 border-t-[#8B7355] rounded-full animate-spin" />
                  </div>
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 relative z-10"
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                  {/* Permanent strong gradient at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Hover Overlay - even stronger */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Title - Pure white with strong shadow */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 transition-all duration-400">
                    <span
                      className="font-serif text-sm md:text-lg font-semibold block transition-all duration-400 group-hover:translate-y-0 translate-y-1"
                      style={{
                        color: '#FFFFFF',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {image.title}
                    </span>
                  </div>
                  {/* Zoom icon on hover */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 border border-white/20">
                    <svg className="w-5 h-5" style={{ color: '#FFFFFF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Slider Button - More prominent */}
            <div className="relative z-10 flex justify-center pt-2 pb-2 px-4 md:px-0">
              <button
                onClick={() => {
                  setShowFullGallery(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="group inline-flex items-center gap-3 px-10 py-5 transition-all duration-400"
                style={{
                  border: '2px solid #8B7355',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: '#8B7355',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#8B7355'
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 115, 85, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#8B7355'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm font-semibold tracking-[0.2em] uppercase">Return to Slider View</span>
              </button>
            </div>

            {/* CSS Keyframes for animations */}
            <style jsx global>{`
              @keyframes galleryFadeSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes gridItemFadeIn {
                from {
                  opacity: 0;
                  transform: translateY(25px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>
          </div>
        ) : (
          /* ========== SLIDER VIEW ========== */
          <>
            {/* Header */}
            <div className="flex flex-col mb-4 md:mb-8 gap-3 md:gap-6 px-4 md:px-0">
              {/* Centered Title & Description with Left Kicker */}
              <div className="flex flex-col items-center justify-center w-full">
                <h2 className="concierge__title mb-4 text-center">
                  Gallery
                </h2>
                <div className="w-full text-center">
                  <span className="concierge__kicker mb-4 block">
                    A Visual Journey
                  </span>
                </div>
                <div className="concierge__content pt-2 flex flex-col items-center">
                  <p className="text-muted-foreground text-center">
                    Every corner tells a story of craftsmanship and natural beauty.
                  </p>
                </div>
              </div>

              {/* Navigation Arrows - Right Aligned or centered based on preference, here kept clean */}
              <div className="hidden md:flex justify-center md:justify-end gap-2 md:gap-3">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                  className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: currentIndex === 0
                      ? 'linear-gradient(135deg, #E8E0D8 0%, #D5CCC1 100%)'
                      : 'linear-gradient(135deg, #FFFFFF 0%, #F5F1ED 100%)',
                    boxShadow: currentIndex === 0
                      ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      : '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(139, 115, 85, 0.12), inset 0 -2px 4px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(139, 115, 85, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    if (currentIndex !== 0) {
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(139, 115, 85, 0.2), inset 0 -2px 4px rgba(0,0,0,0.05)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentIndex !== 0) {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(139, 115, 85, 0.12), inset 0 -2px 4px rgba(0,0,0,0.03)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                  aria-label="Previous slide"
                >
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6 text-foreground transition-transform group-hover:-translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  disabled={currentIndex >= maxIndex}
                  className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: currentIndex >= maxIndex
                      ? 'linear-gradient(135deg, #E8E0D8 0%, #D5CCC1 100%)'
                      : 'linear-gradient(135deg, #FFFFFF 0%, #F5F1ED 100%)',
                    boxShadow: currentIndex >= maxIndex
                      ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
                      : '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(139, 115, 85, 0.12), inset 0 -2px 4px rgba(0,0,0,0.03)',
                    border: '1px solid rgba(139, 115, 85, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    if (currentIndex < maxIndex) {
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(139, 115, 85, 0.2), inset 0 -2px 4px rgba(0,0,0,0.05)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentIndex < maxIndex) {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(139, 115, 85, 0.12), inset 0 -2px 4px rgba(0,0,0,0.03)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }
                  }}
                  aria-label="Next slide"
                >
                  <svg
                    className="h-5 w-5 md:h-6 md:w-6 text-foreground transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slider Container */}
            <div
              className="pt-4 md:pt-8"
              style={{
                overflow: 'hidden',
                width: '100%',
                position: 'relative',
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {isMobile ? (
                /* Mobile: Centered Peek Layout */
                <div
                  className="transition-transform duration-500 ease-out"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    gap: `${mobileSpaceBetween}px`,
                    transform: `translateX(calc(${(100 - mobileSlideWidth) / 2}% - ${currentIndex * (mobileSlideWidth)}% - ${currentIndex * mobileSpaceBetween}px))`,
                  }}
                >
                  {villaImages.map((image, index) => {
                    const isActive = index === currentIndex
                    return (
                      <div
                        key={image.src}
                        style={{
                          width: `${mobileSlideWidth}%`,
                          flexShrink: 0,
                          flexGrow: 0,
                          transition: 'transform 0.4s ease, opacity 0.4s ease',
                          transform: isActive ? 'scale(1)' : 'scale(0.92)',
                          opacity: isActive ? 1 : 0.5,
                        }}
                      >
                        <div
                          className="group relative aspect-[16/9] overflow-hidden rounded-xl bg-muted cursor-pointer"
                          style={{
                            boxShadow: isActive
                              ? '0 20px 40px rgba(0,0,0,0.15), 0 10px 20px rgba(139,115,85,0.1)'
                              : '0 5px 15px rgba(0,0,0,0.08)',
                          }}
                          onClick={() => setLightboxIndex(index)}
                        >
                          <Image
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            fill
                            sizes="85vw"
                            className="object-cover"
                            loading={index <= 2 ? "eager" : "lazy"}
                            priority={index === 0}
                          />
                          {/* Gradient Overlay - Strong for text readability */}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300"
                            style={{ opacity: isActive ? 1 : 0.4 }}
                          />
                          {/* Title - Pure white, only on active slide */}
                          <div
                            className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-all duration-300"
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                            }}
                          >
                            <span
                              className="font-serif text-lg font-semibold tracking-wide"
                              style={{
                                color: '#FFFFFF',
                                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)'
                              }}
                            >
                              {image.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                /* Desktop: Standard Horizontal Slider */
                <div
                  className="transition-transform duration-700 ease-out"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    transform: getDesktopTransform(),
                  }}
                >
                  {villaImages.map((image, index) => (
                    <div
                      key={image.src}
                      className="px-3"
                      style={{
                        width: `${100 / slidesPerView}%`,
                        flexShrink: 0,
                        flexGrow: 0,
                      }}
                    >
                      <div
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted cursor-pointer"
                        onClick={() => setLightboxIndex(index)}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          sizes="50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading={index === 0 ? "eager" : "lazy"}
                          priority={index === 0}
                        />
                        {/* Permanent subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        {/* Hover Overlay - Strong for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Title - Pure white */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span
                            className="font-serif text-2xl font-semibold tracking-wide"
                            style={{
                              color: '#FFFFFF',
                              textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.5)'
                            }}
                          >
                            {image.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center items-center mt-4 md:mt-8 py-2 md:pb-6 px-4 md:px-0">
              {isMobile ? (
                /* Mobile: Premium counter with progress */
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-4">
                    <span
                      className="font-serif text-2xl font-light"
                      style={{ color: '#8B7355' }}
                    >
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="w-20 h-0.5 bg-[#E8E0D8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8B7355] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentIndex + 1) / villaImages.length) * 100}%` }}
                      />
                    </div>
                    <span
                      className="font-serif text-sm font-light"
                      style={{ color: '#B5A898' }}
                    >
                      {String(villaImages.length).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-xs tracking-widest uppercase" style={{ color: '#A69882' }}>
                    Swipe to explore
                  </span>
                </div>
              ) : (
                /* Desktop: Hide dots as requested */
                null
              )}
            </div>

            {/* View All Gallery CTA */}
            <div className="flex justify-center mt-5 md:mt-8 px-4 md:px-0">
              <button
                onClick={() => setShowFullGallery(true)}
                className="group relative inline-flex items-center justify-center overflow-hidden px-8 py-3 md:px-10 md:py-4"
                style={{
                  border: '1.5px solid #8B7355',
                  borderRadius: '2px',
                  backgroundColor: 'transparent',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#8B7355'
                  e.currentTarget.style.borderColor = '#8B7355'
                  const text = e.currentTarget.querySelector('span')
                  if (text) (text as HTMLElement).style.color = '#FFFFFF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#8B7355'
                  const text = e.currentTarget.querySelector('span')
                  if (text) (text as HTMLElement).style.color = '#8B7355'
                }}
              >
                <span
                  className="font-sans text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-400"
                  style={{ color: '#1a1714ff' }}
                >
                  View All Gallery
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Rendering via Portal */}
      {mounted && lightboxIndex !== null && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 flex flex-col items-center justify-center w-screen h-screen"
          style={{
            backgroundColor: 'rgba(50, 40, 30, 0.95)',
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh'
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[120] flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full transition-all hover:scale-110"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderWidth: '2px',
              borderColor: 'rgba(255, 255, 255, 0.25)'
            }}
            aria-label="Close"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>



          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSlideDirection('prev')
              setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + villaImages.length) % villaImages.length)
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[110] flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSlideDirection('next')
              setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % villaImages.length)
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[110] flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full transition-all hover:scale-110"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', borderWidth: '2px', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            aria-label="Next image"
          >
            <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container with Animation */}
          <div
            key={lightboxIndex} // Forces re-render for animation
            className={`relative w-full h-full max-w-[90vw] md:max-w-[85vw] max-h-[70vh] md:max-h-[75vh] flex items-center justify-center ${slideDirection === 'next' ? 'animate-slide-left' :
              slideDirection === 'prev' ? 'animate-slide-right' : 'animate-fade-in'
              }`}
            style={{
              animation: slideDirection === 'next'
                ? 'slideInRight 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                : slideDirection === 'prev'
                  ? 'slideInLeft 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
                  : 'fadeIn 0.4s ease-out forwards'
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return
              const distance = touchStart - touchEnd
              if (distance > minSwipeDistance) {
                setSlideDirection('next')
                setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % villaImages.length)
              }
              if (distance < -minSwipeDistance) {
                setSlideDirection('prev')
                setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + villaImages.length) % villaImages.length)
              }
            }}
          >
            <Image
              src={villaImages[lightboxIndex].src}
              alt={villaImages[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
              quality={90}
            />
          </div>

          {/* Preload Next/Prev Images */}
          <div className="hidden">
            <Image
              src={villaImages[(lightboxIndex + 1) % villaImages.length].src}
              alt="preload"
              width={100} height={100}
              priority
            />
            <Image
              src={villaImages[(lightboxIndex - 1 + villaImages.length) % villaImages.length].src}
              alt="preload"
              width={100} height={100}
              priority
            />
          </div>

          {/* Image Title */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] px-8 py-4 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-center">
            <span className="font-serif text-lg md:text-xl font-semibold block" style={{ color: '#FFFFFF' }}>
              {villaImages[lightboxIndex].title}
            </span>
            <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {lightboxIndex + 1} / {villaImages.length}
            </p>
          </div>

          <style jsx>{`
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(40px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-40px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>,
        document.body
      )}
    </section>
  )
}