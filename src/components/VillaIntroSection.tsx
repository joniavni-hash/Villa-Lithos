"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ImageLightbox from "./ImageLightbox";
import {
  Bed,
  Users,
  Bath,
  Home,
  TreePine,
  type LucideIcon
} from "lucide-react";

const BOOKING_URL =
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";

// Stats with professional monochrome icons from lucide-react
const highlights: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Bedrooms", value: "9", icon: Bed },
  { label: "Guests", value: "22", icon: Users },
  { label: "Bathrooms", value: "8.5", icon: Bath },
  { label: "Build", value: "800m²", icon: Home },
  { label: "Plot", value: "5000m²", icon: TreePine },
];



const galleryImages = [
  { src: "/img/gallery/01.webp", alt: "Villa Lithos exterior view" },
  { src: "/img/gallery/03.webp", alt: "Villa Lithos pool area" },
  { src: "/img/gallery/05.webp", alt: "Villa Lithos interior" },
  { src: "/img/gallery/06.webp", alt: "Villa Lithos living space" },
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

export default function VillaIntroSection() {
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
            Welcome to
          </motion.span>
          <motion.h2
            id="villa-intro-title"
            className="villa-intro__title"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            Villa Lithos
          </motion.h2>
          <motion.p
            className="villa-intro__tagline"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            A 9-bedroom villa with space to breathe and room to gather
          </motion.p>
        </motion.header>

        {/* Stats Row */}
        <motion.div
          ref={statsRef}
          className="stats-grid py-4 mb-6 border-y border-stone-200/40 md:py-8 md:mb-10 md:border-stone-300/30"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {highlights.map((item) => {
            const IconComponent = item.icon;
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
          {galleryImages.map((image) => (
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
                src="/img/gallery/insidevilla.jpg"
                alt="Villa Lithos luxury interior view"
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
              <p>
                Villa Lithos is a stunning 800m² home built on a 5000m² plot, designed
                for up to 22 guests. Nine bedrooms, ten bathrooms, and enough space
                for large families, friend groups, or work retreats.
              </p>
              <p>
                Swim in the pool, relax in the jacuzzi, warm up in the outdoor sauna,
                or play padel in the sun. There&apos;s a gym, an elevator, lounges on
                two floors, and private parking.
              </p>
            </motion.div>

            <motion.div className="villa-intro__details" variants={staggerItem} transition={{ duration: 0.6 }}>
              <h3 className="villa-intro__section-title">The Space</h3>
              <p>
                Inside, the living spaces are open and modern. Two living rooms,
                one on the ground floor and one below, give everyone a place
                to sit, talk, or be alone.
              </p>
              <p>
                The kitchen is fully equipped with a pantry and everything
                you need to cook for a crowd.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Amenities - Replaced with new component */}
        <motion.div
          ref={amenitiesRef}
          className="relative mb-10 -mx-4 px-4 md:mx-0 md:px-0"
          initial="hidden"
          animate={amenitiesInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <Amenities />
        </motion.div>

        {/* CTA - fade up */}
        <motion.div
          ref={ctaRef}
          className="villa-intro__cta"
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="villa-intro__btn villa-intro__btn--primary"
          >
            Book Your Stay
          </Link>
          <Link
            href="/#inquiry"
            className="villa-intro__btn villa-intro__btn--secondary"
          >
            Send Inquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
