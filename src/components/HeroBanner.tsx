"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

type Props = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  videoSrcMobile?: string;
  videoSrcDesktop?: string;
  videoSrc?: string;
  poster?: string;
  imageUrl?: string;
  contactHref?: string;
  galleryHref?: string;
};

const DESKTOP_BREAKPOINT = 1024;
const getIsDesktop = () =>
  typeof window !== "undefined" && window.innerWidth >= DESKTOP_BREAKPOINT;

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
        preload="none"
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

export default function HeroBanner({
  kicker = "LUXURY VILLA IN PORTO RAFTI",
  title = "Villa Lithos",
  subtitle = "A 9-bedroom private retreat near Athens with heated pool, sea views, and exclusive amenities for up to 22 guests.",
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

  const isDesktop = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    getIsDesktop,
    () => false
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

  // On mobile: NO video at all (saves ~3MB payload, fixes LCP from 5.6s)
  // On desktop: use desktop video source with lazy preload
  const currentVideoSrc = isDesktop
    ? (videoSrcDesktop || videoSrc)
    : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideoSrc || prefersReducedMotion) return;

    video.muted = true;
    video.defaultMuted = true;

    const onCanPlay = () => {
      setVideoReady(true);
      video.play().catch(() => {});
    };

    const onError = () => setVideoError(true);

    if (video.readyState >= 3) {
      onCanPlay();
    }

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [currentVideoSrc, prefersReducedMotion]);

  const videoKey = currentVideoSrc || "no-video";
  const showVideo = currentVideoSrc && !videoError && !prefersReducedMotion;
  const fallbackImage = poster || imageUrl;

  return (
    <section className="hv">
      <div className="hv-media">
        <div className="hv-media__inner">
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

          {showVideo && (
            <Video
              key={videoKey}
              ref={videoRef}
              src={currentVideoSrc!}
              poster={fallbackImage}
              isReady={videoReady}
            />
          )}

          <div className="hv-media__gradient" aria-hidden="true" />
        </div>
      </div>

      <div className="hv-divider" aria-hidden="true" />

      <div className="hv-content">
        <div className="hv-content__inner">
          <p className="hv-kicker">{kicker}</p>
          <h1 className="hv-title">{title}</h1>
          <p className="hv-subtitle">{subtitle}</p>
          <div className="hv-cta">
            <Link href={contactHref} className="hv-btn hv-btn--primary">
              Inquire Now
            </Link>
            <Link href={galleryHref} className="hv-btn hv-btn--secondary">
              Explore the Villa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
