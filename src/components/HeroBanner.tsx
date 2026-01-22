"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  videoSrcMobile?: string;
  videoSrcDesktop?: string;
  videoSrc?: string; // fallback for backward compatibility
  poster?: string;
  imageUrl?: string;
  contactHref?: string;
  galleryHref?: string;
};

// Desktop breakpoint matches CSS (1024px)
const DESKTOP_BREAKPOINT = 1024;

export default function HeroBanner({
  kicker = "WELCOME TO",
  title = "Villa Lithos",
  subtitle = "A private villa in Greece. Quiet stays, thoughtful comfort.",
  videoSrcMobile,
  videoSrcDesktop,
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check screen size after mount
  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Check reduced motion preference after mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Determine video source based on screen size
  const currentVideoSrc = mounted
    ? (isDesktop ? (videoSrcDesktop || videoSrc) : (videoSrcMobile || videoSrc))
    : videoSrc;

  // Handle video load/error
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideoSrc || prefersReducedMotion) return;

    // Reset states when video source changes
    setVideoReady(false);
    setVideoError(false);

    const onCanPlay = () => setVideoReady(true);
    const onError = () => setVideoError(true);

    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("error", onError);

    // Load the new source
    video.load();

    return () => {
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [currentVideoSrc, prefersReducedMotion]);

  const showVideo = currentVideoSrc && !videoError && !prefersReducedMotion;
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
              key={currentVideoSrc} // Force remount when source changes
              className={`hv-video ${videoReady ? "hv-video--loaded" : ""}`}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={currentVideoSrc} type="video/mp4" />
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
