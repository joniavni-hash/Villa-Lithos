"use client";

import { useEffect, useRef, useState } from "react";

type MapData = {
  title?: string | null;
  address?: string | null;
  gettingHereTitle?: string | null;
  gettingHereIntro?: string | null;
  distances?: { name: string; detail: string }[] | null;
};

type Props = {
  data?: MapData;
  lat?: number;
  lng?: number;
  placeId?: string;
  className?: string;
};

const DEFAULT_LAT = 37.9022327;
const DEFAULT_LNG = 24.0224142;
const DEFAULT_ADDRESS = "Villa Lithos, Vravronos 70, Porto Rafti 190 03, Greece";

/**
 * VillaMapSection - Google Maps iframe implementation (no API key required)
 * Uses IntersectionObserver for lazy loading
 */
// SVG icons for distance items (mapped by index)
const DISTANCE_ICONS = [
  // Airport
  <svg key="airport" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
  // City
  <svg key="city" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M9 21v-6h6v6"/><path d="M10 9h4"/><path d="M10 13h4"/></svg>,
  // Beach
  <svg key="beach" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/></svg>,
  // Port
  <svg key="port" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></svg>,
];

const DEFAULT_DISTANCES = [
  { name: "Athens Int. Airport (El. Venizelos)", detail: "16 km \u2014 approx. 15 min drive" },
  { name: "Athens City Center", detail: "37 km via Attiki Odos \u2014 approx. 40 min drive" },
  { name: "Nearest Beach (Avlaki/Erotospilia)", detail: "1.5 km \u2014 approx. 3 min drive" },
  { name: "Rafina Port (Islands Ferry)", detail: "20 min drive \u2014 gateway to Cyclades & Evia" },
];

export default function VillaMapSection({
  data,
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  placeId,
  className = "",
}: Props) {
  const title = data?.title || "Location";
  const address = data?.address || DEFAULT_ADDRESS;
  const gettingHereTitle = data?.gettingHereTitle || "Getting Here";
  const gettingHereIntro = data?.gettingHereIntro || "Villa Lithos is ideally situated in Porto Rafti, one of Attica\u2019s most sought-after coastal destinations. Enjoy the perfect balance of serene privacy and convenient access to Athens International Airport, the city center, and the pristine beaches of the Athenian Riviera.";
  const distances = data?.distances || DEFAULT_DISTANCES;
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Fallback: if IntersectionObserver isn't available, load immediately
    if (typeof IntersectionObserver === "undefined") {
      // Use setTimeout to avoid synchronous state update warning
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.01 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Google Maps embed URL (no API key)
  const simpleEmbedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;

  // Directions link (optionally uses placeId if provided)
  const googleMapsLink = placeId
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(
        placeId
      )}`
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;
      }}
      className={`vms py-2 md:py-4 ${className}`}
      aria-label="Villa location map"
    >
      <div className="vms-container">
        {/* Header */}
        <div className="vms-header">
          <h2 className="vms-title">{title}</h2>

          <address className="vms-address">
            <svg
              className="vms-address__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{address}</span>
          </address>
        </div>

        {/* Map Container */}
        <div className="vms-map">
          {isVisible ? (
            <iframe
              src={simpleEmbedUrl}
              className={`vms-map__iframe ${
                hasLoaded ? "vms-map__iframe--loaded" : ""
              }`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Villa Lithos location on Google Maps"
              aria-label={`Map showing ${address}`}
              onLoad={() => setHasLoaded(true)}
            />
          ) : (
            <div className="vms-map__placeholder" aria-hidden="true">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          )}
        </div>

        {/* Location Distances */}
        <div className="vms-distances text-center flex flex-col items-center">
          <h3 className="vms-distances__title">{gettingHereTitle}</h3>
          <p className="vms-distances__intro mx-auto text-center" style={{ maxWidth: "600px" }}>
            {gettingHereIntro}
          </p>
          <ul className="vms-distances__list w-full max-w-[800px] mx-auto text-left">
            {distances.map((d, i) => (
              <li key={i}>
                <span className="vms-distances__icon">
                  {DISTANCE_ICONS[i] || DISTANCE_ICONS[0]}
                </span>
                <div>
                  <strong>{d.name}</strong>
                  <span>{d.detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="vms-actions flex justify-center">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="vms-btn"
            aria-label="Open directions in Google Maps"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
