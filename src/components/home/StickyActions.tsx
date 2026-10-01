"use client";

import { useEffect, useState } from "react";

const WHATSAPP_URL = `https://wa.me/306932757142?text=${encodeURIComponent(
  "Hi, I'd like to check availability at Villa Lithos."
)}`;

/** Floating WhatsApp pill (all sizes) + sticky bottom bar (mobile), both appear after the hero. */
export default function StickyActions() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`vl-wa ${on ? "is-in" : ""}`}
        aria-label="Message Villa Lithos on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.2-.2-.4-.3Z" />
        </svg>
        <span>WhatsApp</span>
      </a>
      <div className={`vl-sticky ${on ? "is-in" : ""}`} aria-hidden={!on}>
        <a href="https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72" target="_blank" rel="noopener noreferrer" className="vl-btn">Check availability</a>
      </div>
    </>
  );
}
