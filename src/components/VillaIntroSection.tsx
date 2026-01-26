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
  Waves,
  Sparkles,
  Flame,
  Circle,
  Dumbbell,
  ArrowUpDown,
  ChefHat,
  Monitor,
  Mountain,
  Sunrise,
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

// Amenities with monochrome lucide-react icons
const amenities: { name: string; icon: LucideIcon; image: string }[] = [
  { name: "Private Pool", icon: Waves, image: "/img/gallery/Exterior & Pool.jpg" },
  { name: "Jacuzzi", icon: Sparkles, image: "/img/gallery/Exterior & Pool.jpg" },
  { name: "Sea View", icon: Sunrise, image: "/img/gallery/Exterior & Pool.jpg" },
  { name: "Mountain View", icon: Mountain, image: "/img/gallery/Exterior & Pool.jpg" },
  { name: "Outdoor Sauna", icon: Flame, image: "/img/gallery/Wellness & Spa (2).jpg" },
  { name: "Padel Court", icon: Circle, image: "/img/gallery/Sports & Activities (2).jpg" },
  { name: "Gym", icon: Dumbbell, image: "/img/gallery/Sports & Activities (4).jpg" },
  { name: "Elevator", icon: ArrowUpDown, image: "/img/gallery/10.jpg" },
  { name: "Design Kitchen", icon: ChefHat, image: "/img/gallery/Kitchen.jpg" },
  { name: "Workspace", icon: Monitor, image: "/img/gallery/Living & Dining (3).jpg" },
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

        {/* Stats Row - fade up with stagger */}
        <motion.div
          ref={statsRef}
          className="villa-intro__stats villa-intro__stats--five-col"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {highlights.map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.label}
                className="villa-intro__stat"
                variants={staggerItem}
                transition={{ duration: 0.5 }}
              >
                <span className="villa-intro__stat-icon" aria-hidden="true">
                  <IconComponent size={28} strokeWidth={1.5} />
                </span>
                <span className="villa-intro__stat-value">{item.value}</span>
                <span className="villa-intro__stat-label">{item.label}</span>
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

        {/* Amenities - fade up with centered title */}
        <motion.div
          ref={amenitiesRef}
          className="villa-intro__amenities"
          initial="hidden"
          animate={amenitiesInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h3 className="villa-intro__section-title villa-intro__section-title--centered">
            Amenities
          </h3>
          <motion.ul
            className="villa-intro__amenities-list villa-intro__amenities-list--with-images"
            variants={staggerContainer}
            initial="hidden"
            animate={amenitiesInView ? "visible" : "hidden"}
          >
            {amenities.map((amenity) => {
              const AmenityIcon = amenity.icon;
              return (
                <motion.li
                  key={amenity.name}
                  variants={staggerItem}
                  transition={{ duration: 0.4 }}
                >
                  <ImageLightbox
                    src={amenity.image}
                    alt={amenity.name}
                    className="villa-intro__amenity-item"
                  >
                    <span className="villa-intro__amenity-icon" aria-hidden="true">
                      <AmenityIcon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="villa-intro__amenity-name">{amenity.name}</span>
                  </ImageLightbox>
                </motion.li>
              );
            })}
          </motion.ul>
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
