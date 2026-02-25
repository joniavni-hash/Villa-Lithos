"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImageLightbox from "./ImageLightbox";
import Amenities from "./Amenities";
import {
  Bed,
  Users,
  Bath,
  Home,
  TreePine,
  type LucideIcon
} from "lucide-react";

type VillaIntroData = {
  kicker?: string | null;
  title?: string | null;
  tagline?: string | null;
  bodyParagraphs?: (string | null)[] | null;
  stats?: { label: string; value: string }[] | null;
  spaceTitle?: string | null;
  spaceParagraphs?: (string | null)[] | null;
  featuredImage?: string | null;
  galleryImages?: { src: string; alt: string }[] | null;
};

type AmenitiesData = {
  sectionTitle?: string | null;
  items?: { name: string; image: string }[] | null;
};

const DEFAULT_BOOKING_URL =
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";

// Icon mapping by index position
const STAT_ICONS: LucideIcon[] = [Bed, Users, Bath, Home, TreePine];

const DEFAULT_STATS = [
  { label: "Bedrooms", value: "9" },
  { label: "Guests", value: "22" },
  { label: "Bathrooms", value: "8.5" },
  { label: "Build", value: "800m²" },
  { label: "Plot", value: "5000m²" },
];



const galleryImages = [
  { src: "/img/gallery/Exterior%20%26%20Pool.jpg", alt: "Illuminated pool at twilight" },
  { src: "/img/gallery/Exterior%20%26%20Pool%20(5).jpg", alt: "Estate aerial view" },
  { src: "/img/gallery/Living%20%26%20Dining%20(6).jpg", alt: "Fireplace lounge with wooden ceiling" },
  { src: "/img/gallery/Wellness%20%26%20Spa%20(3).jpg", alt: "Bathtub with sea views" },
];

// Animation variants - simplified
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function VillaIntroSection({ data, amenitiesData, bookingUrl }: { data?: VillaIntroData; amenitiesData?: AmenitiesData; bookingUrl?: string }) {
  const kicker = data?.kicker || "Luxury accommodation near Athens";
  const title = data?.title || "Villa Lithos";
  const tagline = data?.tagline || "A 9-bedroom luxury retreat with space to unwind and room for memorable gatherings";
  const bodyParagraphs = data?.bodyParagraphs?.filter(Boolean) as string[] || [
    "Villa Lithos is a stunning 800m\u00b2 luxury villa set on a 5000m\u00b2 private estate in Porto Rafti, Attica. Designed for up to 22 guests, this exclusive property features nine bedrooms, ten bathrooms, and generous spaces for families, groups of friends, or corporate retreats.",
    "Enjoy the heated infinity pool with panoramic sea views, unwind in the jacuzzi, rejuvenate in the outdoor sauna, or challenge friends on the padel court. The villa also offers a fully equipped gym, private elevator, dual lounges, and secure parking.",
  ];
  const stats = data?.stats || DEFAULT_STATS;
  const spaceTitle = data?.spaceTitle || "The Space";
  const spaceParagraphs = data?.spaceParagraphs?.filter(Boolean) as string[] || [
    "Inside, the contemporary interiors blend modern design with warm Mediterranean touches. Two spacious living rooms, on the ground floor and lower level, provide versatile spaces for relaxation, conversation, or quiet moments.",
    "The designer kitchen is fully equipped with premium appliances and a walk-in pantry, perfect for preparing memorable meals during your stay near Athens.",
  ];
  const finalFeaturedImage = data?.featuredImage || "/img/gallery/Exterior%20%26%20Pool%20(14).jpg";
  const finalGalleryImages = data?.galleryImages?.length ? data.galleryImages : galleryImages;
  const BOOKING_URL = bookingUrl || DEFAULT_BOOKING_URL;
  const BOOKING_COM_URL = "https://www.booking.com/hotel/gr/villa-lithos-porto-rafti";
  const AIRBNB_URL = "https://airbnb.com/h/lithoss";
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Changed to once: true to prevent continuous re-renders on scroll (reduces TBT)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.2 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const amenitiesInView = useInView(amenitiesRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <section
      id="about"
      className="villa-intro"
      aria-labelledby="villa-intro-title"
    >
      <div className="villa-intro__container">
        {/* Hero Header - fade up */}
        <motion.header
          ref={headerRef}
          className="villa-intro__header"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.span
            className="villa-intro__kicker"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            {kicker}
          </motion.span>
          <motion.h2
            id="villa-intro-title"
            className="villa-intro__title"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="villa-intro__tagline"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            {tagline}
          </motion.p>
        </motion.header>

        {/* Stats Row */}
        <motion.div
          ref={statsRef}
          className="stats-grid py-4 mb-6 border-y border-stone-200/40 md:py-6 md:mb-8 md:border-stone-300/30"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {stats.map((item, index) => {
            const IconComponent = STAT_ICONS[index] || Home;
            return (
              <motion.div
                key={item.label}
                className="stats-grid__item flex flex-col items-center text-center"
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                <span className="flex items-center justify-center w-10 h-10 mb-2 rounded-lg bg-gradient-to-br from-white to-stone-100 shadow-sm md:w-14 md:h-14 md:mb-3 md:rounded-xl md:shadow-md">
                  <IconComponent className="w-5 h-5 text-stone-700 md:w-7 md:h-7" strokeWidth={1.5} />
                </span>
                <span className="text-xl font-semibold leading-none text-stone-800 md:text-3xl md:font-normal md:font-serif">{item.value}</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-stone-500 mt-1 md:text-xs">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Image Gallery - fade up with stagger */}
        <motion.div
          ref={galleryRef}
          className="villa-intro__gallery"
          initial="hidden"
          animate={galleryInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {finalGalleryImages.map((image) => (
            <motion.div
              key={image.src}
              className="villa-intro__gallery-item"
              variants={staggerItem}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="villa-intro__gallery-img"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid - Image slides from left, text fades up */}
        <div className="villa-intro__content-section">
          {/* Featured Image - slides from LEFT */}
          <motion.div
            ref={imageRef}
            className="villa-intro__featured-image"
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
            variants={slideFromLeft}
            transition={{ duration: 0.8, ease: [0.22, 0.8, 0.22, 1] }}
          >
            <div className="villa-intro__featured-img-wrapper">
              <Image
                src={finalFeaturedImage}
                alt="Villa Lithos luxury exterior view"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="villa-intro__featured-img"
              />
            </div>
          </motion.div>

          {/* Text Content - fades up */}
          <motion.div
            ref={contentRef}
            className="villa-intro__text-content"
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div className="villa-intro__lead" variants={staggerItem} transition={{ duration: 0.6 }}>
              {bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>

            <motion.div className="villa-intro__details" variants={staggerItem} transition={{ duration: 0.6 }}>
              <h3 className="villa-intro__section-title">{spaceTitle}</h3>
              {spaceParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Amenities - Replaced with new component */}
        <motion.div
          ref={amenitiesRef}
          className="relative mb-4 -mx-4 px-4 md:mx-0 md:px-0"
          initial="hidden"
          animate={amenitiesInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <Amenities data={amenitiesData} />
        </motion.div>

        {/* CTA - fade up */}
        <motion.div
          ref={ctaRef}
          className="villa-intro__cta mt-0"
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <div className="villa-intro-booking-options">
            <a
              href={BOOKING_COM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="villa-intro-booking-btn villa-intro-btn-booking"
            >
              <span className="villa-intro-booking-icon icon-booking"></span>
              <span className="villa-intro-booking-info">
                <strong>Booking.com</strong>
                <small>Book Via Booking</small>
              </span>
            </a>
            <a
              href={AIRBNB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="villa-intro-booking-btn villa-intro-btn-airbnb"
            >
              <span className="villa-intro-booking-icon icon-airbnb"></span>
              <span className="villa-intro-booking-info">
                <strong>Airbnb</strong>
                <small>Book Via Airbnb</small>
              </span>
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="villa-intro-booking-btn villa-intro-btn-direct"
            >
              <span className="villa-intro-booking-icon icon-direct"></span>
              <span className="villa-intro-booking-info">
                <strong>Direct</strong>
                <small>Book Directly</small>
              </span>
            </a>
          </div>
          <Link
            href="/#inquiry"
            className="villa-intro__btn villa-intro__btn--secondary"
          >
            More Information
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
