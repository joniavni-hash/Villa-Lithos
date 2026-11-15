"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { whatsappHref } from "@/app/lib/whatsapp";

type Props = {
  title?: string;
  kicker?: string;
  /** Optional third action (October to March: the winter offsites page). */
  tertiaryLabel?: string;
  tertiaryHref?: string;
  /** Direct booking (Guesty), the secondary action since 2026-11. */
  bookingHref?: string;
  videoDesktop?: string;
  videoMobile?: string | undefined;
  posterDesktop?: string;
  posterMobile?: string | undefined;
};

// Primary action is WhatsApp since 2026-11 (owner's decision 25.10.2026): the
// direct booking page has no way to ask a question, and no Guesty click from
// the homepage had turned into an inquiry. Direct booking stays as the
// secondary button.
const WHATSAPP_HERO = whatsappHref("Hi, I'd like to ask about dates and availability at Villa Lithos.");

export default function HeroCinematic({
  title = "Your private Gem above the Aegean",
  kicker,
  tertiaryLabel,
  tertiaryHref,
  bookingHref = "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72",
  videoDesktop = "/videos/heroPC.mp4",
  videoMobile,
  posterDesktop = "/img/gallery/Exterior%20%26%20Pool%20(14).jpg",
  posterMobile,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const mobile = window.innerWidth < 768;
    const chosen = mobile ? videoMobile : videoDesktop;
    if (!chosen) return; // no mobile video: the poster carries the fold
    // Defer the video until the poster has painted so LCP stays on the image.
    const t = window.setTimeout(() => setSrc(chosen), 600);
    return () => window.clearTimeout(t);
  }, [videoDesktop, videoMobile]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    const onCanPlay = () => {
      // The source clip opens on ~1s of black; start past it.
      if (v.currentTime < 1) v.currentTime = 1.2;
      setReady(true);
      v.play().catch(() => {});
    };
    v.addEventListener("canplay", onCanPlay);
    v.load();
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [src]);

  return (
    <section className="vl-hero" aria-label="Villa Lithos" data-lead-block="hero">
      <div className="vl-hero__media" aria-hidden="true">
        <picture>
          {posterMobile ? <source media="(max-width: 767px)" srcSet={posterMobile} /> : null}
          <Image
            src={posterDesktop}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={78}
          />
        </picture>
        {src && (
          <video
            ref={videoRef}
            className={ready ? "is-ready" : ""}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
        <div className="vl-hero__shade" />
      </div>

      <div className="vl-hero__in">
        {kicker ? <p className="vl-hero__kicker">{kicker}</p> : null}
        <h1 className="vl-hero__title">{title}</h1>
        <div className="vl-hero__cta">
          <a href={WHATSAPP_HERO} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--light">
            WhatsApp the team
          </a>
          <a href={bookingHref} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--outline-light">
            Check availability
          </a>
          {tertiaryHref && tertiaryLabel ? (
            <Link href={tertiaryHref} className="vl-btn vl-btn--outline-light">
              {tertiaryLabel}
            </Link>
          ) : null}
        </div>
        <p className="vl-hero__trust">
          <span className="vl-stars" aria-hidden="true">★★★★★</span>
          <span>5.0 on Airbnb · Guest Favourite · Top 10% of homes</span>
        </p>
      </div>

      <a href="#stats" className="vl-hero__scroll" aria-label="Scroll to content">
        Scroll
      </a>
    </section>
  );
}
