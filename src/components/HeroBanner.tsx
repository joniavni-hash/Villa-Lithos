"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

// Check if we're on the client
const getIsDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= DESKTOP_BREAKPOINT;

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

  // Use useSyncExternalStore for isDesktop to avoid hydration mismatch
  const isDesktop = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    getIsDesktop,
    () => false // Server snapshot
  );

  const prefersReducedMotion = useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  // Determine video source based on screen size
  const currentVideoSrc = isDesktop
    ? (videoSrcDesktop || videoSrc)
    : (videoSrcMobile || videoSrc);

  // Handle video load/error - only subscribe to events, no sync setState
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideoSrc || prefersReducedMotion) return;

    const onCanPlay = () => {
      setVideoReady(true);
      // Try to play manually for Safari compatibility
      video.play().catch(() => {
        // Autoplay was prevented
      });
    };
    const onError = () => setVideoError(true);

    video.addEventListener("canplaythrough", onCanPlay);
    video.addEventListener("error", onError);

    // Load the video
    video.load();

    return () => {
      video.removeEventListener("canplaythrough", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [currentVideoSrc, prefersReducedMotion]);

  // Reset video states when source changes using key prop instead of setState in effect
  const videoKey = currentVideoSrc || "no-video";

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
            <Video
              key={videoKey}
              ref={videoRef}
              src={currentVideoSrc!}
              poster={fallbackImage}
              isReady={videoReady}
            />
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
              More Information
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

// Separate Video component to isolate state resets via key prop
import { forwardRef } from "react";

interface VideoProps {
  src: string;
  poster: string;
  isReady: boolean;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ src, poster, isReady }, ref) => {
    return (
      <video
        ref={ref}
        className={`hv-video ${isReady ? "hv-video--loaded" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }
);

Video.displayName = "Video";
