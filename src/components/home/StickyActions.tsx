"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappHref, whatsappTextForPath } from "@/app/lib/whatsapp";

const PAGES_WITH_OWN_PILL = new Set(["/corporate-retreats"]);
const BOOKING_URL = "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";

/**
 * Floating WhatsApp pill (desktop) + sticky bottom bar with WhatsApp and
 * direct booking (mobile and tablet). Rendered from the root layout on every
 * public page; appears once the visitor has scrolled past the opening.
 * The pre-filled message names the page the visitor was reading.
 */
export default function StickyActions() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > (isHome ? window.innerHeight * 0.7 : 240));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (pathname?.startsWith("/admin")) return null;
  // Pages that render their own floating WhatsApp button (corporate retreats) keep it.
  if (PAGES_WITH_OWN_PILL.has(pathname || "")) return null;

  const wa = whatsappHref(whatsappTextForPath(pathname));

  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className={`vl-wa ${on ? "is-in" : ""}`}
        aria-label="Message Villa Lithos on WhatsApp"
        data-lead-block="sticky-whatsapp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.2-.2-.4-.3Z" />
        </svg>
        <span>WhatsApp</span>
      </a>
      <div className={`vl-sticky ${on ? "is-in" : ""}`} aria-hidden={!on} data-lead-block="sticky-bar">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="vl-btn">WhatsApp</a>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--ghost">Check availability</a>
      </div>
    </>
  );
}
