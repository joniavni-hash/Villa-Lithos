"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  title?: string;
  address?: string;
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
export default function VillaMapSection({
  title = "Location",
  address = DEFAULT_ADDRESS,
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  placeId,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Fallback: if IntersectionObserver isn't available, load immediately
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
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
      ref={(node) => {
        containerRef.current = node;
      }}
      className={`vms ${className}`}
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
        <div className="vms-distances">
          <h3 className="vms-distances__title">Getting Here</h3>
          <p className="vms-distances__intro">
            Villa Lithos enjoys a privileged location in Porto Rafti, Attica,
            offering the perfect balance between peaceful seclusion and easy access
            to Athens, the airport, and the beautiful beaches of the Athenian Riviera.
          </p>
          <ul className="vms-distances__list">
            <li>
              <span className="vms-distances__icon">✈</span>
              <div>
                <strong>Athens Int. Airport (El. Venizelos)</strong>
                <span>16 km — approx. 15 min drive</span>
              </div>
            </li>
            <li>
              <span className="vms-distances__icon">🏛</span>
              <div>
                <strong>Athens City Center</strong>
                <span>37 km via Attiki Odos — approx. 40 min drive</span>
              </div>
            </li>
            <li>
              <span className="vms-distances__icon">🏖</span>
              <div>
                <strong>Nearest Beach (Avlaki/Erotospilia)</strong>
                <span>1.5 km — approx. 3 min drive</span>
              </div>
            </li>
            <li>
              <span className="vms-distances__icon">⛴</span>
              <div>
                <strong>Rafina Port (Islands Ferry)</strong>
                <span>20 min drive — gateway to Cyclades & Evia</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="vms-actions">
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
