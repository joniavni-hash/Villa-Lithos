"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BOOKING_URL =
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";

const highlights = [
  { label: "Bedrooms", value: "9" },
  { label: "Guests", value: "22" },
  { label: "Bathrooms", value: "10" },
  { label: "Floors", value: "4" },
];

const amenities = [
  "Private Pool",
  "Outdoor Sauna",
  "Padel Court",
  "Modern Gym",
  "Elevator",
  "Private Parking",
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
  const infoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Changed to once: true to prevent continuous re-renders on scroll (reduces TBT)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });
  const galleryInView = useInView(galleryRef, { once: true, amount: 0.2 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.3 });
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });
  const amenitiesInView = useInView(amenitiesRef, { once: true, amount: 0.3 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.3 });
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
          className="villa-intro__stats"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.label}
              className="villa-intro__stat"
              variants={staggerItem}
              transition={{ duration: 0.5 }}
            >
              <span className="villa-intro__stat-value">{item.value}</span>
              <span className="villa-intro__stat-label">{item.label}</span>
            </motion.div>
          ))}
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
                src="/img/services/IMG_0068-2.webp"
                alt="Villa Lithos luxury interior"
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
                Villa Lithos is a four-storey home built for up to 22 guests.
                Nine bedrooms, ten bathrooms, and enough space for large families,
                friend groups, or work retreats.
              </p>
              <p>
                Swim in the pool, warm up in the outdoor sauna, or play padel
                in the sun. There's a gym, an elevator, lounges on two floors,
                and private parking.
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

        {/* Amenities - fade up */}
        <motion.div
          ref={amenitiesRef}
          className="villa-intro__amenities"
          initial="hidden"
          animate={amenitiesInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h3 className="villa-intro__section-title">Amenities</h3>
          <motion.ul
            className="villa-intro__amenities-list"
            variants={staggerContainer}
            initial="hidden"
            animate={amenitiesInView ? "visible" : "hidden"}
          >
            {amenities.map((amenity) => (
              <motion.li
                key={amenity}
                variants={staggerItem}
                transition={{ duration: 0.4 }}
              >
                {amenity}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Guest Info Cards - fade up */}
        <motion.div
          ref={infoRef}
          className="villa-intro__info-grid"
          initial="hidden"
          animate={infoInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div
            className="villa-intro__info-card"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            <h4>Guest Access</h4>
            <p>
              Full access to the pool, sauna, gym, padel court, garden, and
              all indoor spaces. The fireplace is not available for guest use.
            </p>
          </motion.div>
          <motion.div
            className="villa-intro__info-card"
            variants={staggerItem}
            transition={{ duration: 0.6 }}
          >
            <h4>Check-in &amp; Check-out</h4>
            <p>
              <strong>Check-in:</strong> 4:00 PM
              <br />
              <strong>Check-out:</strong> 10:00 AM
              <br />
              <strong>Quiet hours:</strong> 10 PM to 8 AM
            </p>
          </motion.div>
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
