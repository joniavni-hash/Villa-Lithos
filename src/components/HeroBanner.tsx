"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  bookingUrl?: string;
  mapUrl?: string;
  whatsappUrl?: string;
  contactHref?: string;
};

export default function HeroBanner({
  kicker = "WELCOME TO",
  title = "Villa Lithos",
  subtitle = "A private retreat in Greece — designed for serene stays, curated comfort, and effortless luxury.",
  imageUrl = "/img/hero.jpg",
  bookingUrl = "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72?minOccupancy=1",
  mapUrl,
  whatsappUrl,
  contactHref = "/#inquiry",
}: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: "max(env(safe-area-inset-top), 14px)",
      }}
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Villa Lithos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />

        {/* ✅ LIGHTER overlay (photo stays visible) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,.10) 0%, rgba(0,0,0,.38) 55%, rgba(0,0,0,.55) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative container-page"
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          paddingTop: "clamp(4.5rem, 10vh, 7rem)",
          paddingBottom: "clamp(5rem, 10vh, 7rem)",
        }}
      >
        <div className="max-w-3xl">
          <motion.p
            className="kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{ color: "rgba(255,255,255,.78)" }}
          >
            {kicker}
          </motion.p>

          <motion.h1
            className="h1 mt-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.4rem)",
              lineHeight: 1.02,
              color: "rgba(255,255,255,.95)",
              textShadow: "0 18px 55px rgba(0,0,0,.55)",
            }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="lead mt-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            style={{
              maxWidth: 56 * 16,
              fontSize: "clamp(1.02rem, 2.2vw, 1.2rem)",
              color: "rgba(255,255,255,.80)",
              textShadow: "0 14px 38px rgba(0,0,0,.55)",
            }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <a className="btn primary" href={bookingUrl} target="_blank" rel="noreferrer">
              Check availability & book
            </a>

            <Link href={contactHref} className="btn ghost">
              Contact
            </Link>

            {whatsappUrl ? (
              <a className="btn ghost" href={whatsappUrl} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            ) : null}

            {mapUrl ? (
              <a className="btn ghost" href={mapUrl} target="_blank" rel="noreferrer">
                Map
              </a>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
