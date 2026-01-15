"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  videoSrc?: string;
  poster?: string;
  imageUrl?: string;
  contactHref?: string;
  galleryHref?: string;
};

export default function HeroBanner({
  kicker = "WELCOME TO",
  title = "Villa Lithos",
  subtitle = "A private villa in Greece. Quiet stays, thoughtful comfort, easy luxury.",
  videoSrc,
  poster = "/img/hero.webp",
  imageUrl = "/img/hero.webp",
  contactHref = "/#inquiry",
  galleryHref = "/#gallery",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference after mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Handle video load/error
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || prefersReducedMotion) return;

    const onCanPlay = () => setVideoReady(true);
    const onError = () => setVideoError(true);

    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [videoSrc, prefersReducedMotion]);

  const showVideo = videoSrc && !videoError && !prefersReducedMotion;
  const fallbackImage = poster || imageUrl;

  return (
    <section className="hv">
      {/* Media Container */}
      <div className="hv-media">
        <div className="hv-media__inner">
          {/*
            ALWAYS render the poster Image as base layer (SSR).
            This ensures LCP is the optimized Next.js Image, not the video poster.
          */}
          <Image
            src={fallbackImage}
            alt="Villa Lithos exterior"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="hv-poster"
            fetchPriority="high"
          />

          {/* Video overlays on top, fades in when ready */}
          {showVideo && (
            <video
              ref={videoRef}
              className={`hv-video ${videoReady ? "hv-video--loaded" : ""}`}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}

          {/* Gradient overlay */}
          <div className="hv-media__gradient" aria-hidden="true" />
        </div>
      </div>

      {/* Divider (desktop) */}
      <div className="hv-divider" aria-hidden="true" />

      {/* Content */}
      <div className="hv-content">
        <div className="hv-content__inner">
          <p className="hv-kicker">{kicker}</p>
          <h1 className="hv-title">{title}</h1>
          <p className="hv-subtitle">{subtitle}</p>

          <div className="hv-cta">
            <Link href={contactHref} className="hv-btn hv-btn--primary">
              Booking Request
            </Link>
            <Link href={galleryHref} className="hv-btn hv-btn--secondary">
              View Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
