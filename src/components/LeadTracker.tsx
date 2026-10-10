"use client";

import { useEffect } from "react";

// Site-wide lead measurement. One document-level click listener classifies every
// outbound contact or booking link (WhatsApp, Messenger, email, phone, direct
// booking, Airbnb, Booking.com) and sends a GA4 `generate_lead` event with the
// channel and the page it came from. Works for links added later without any
// per-component code. gtag honours Google Consent Mode (set in the root layout):
// without consent GA4 receives a cookieless ping only. GTM, when loaded after
// consent, also gets a `lead_click` dataLayer event.

type Gtag = (...args: unknown[]) => void;

const RULES: { channel: string; test: (href: string) => boolean }[] = [
  { channel: "whatsapp", test: (h) => h.includes("wa.me/") || h.includes("api.whatsapp.com") },
  { channel: "messenger", test: (h) => h.includes("m.me/") },
  { channel: "email", test: (h) => h.startsWith("mailto:") },
  { channel: "phone", test: (h) => h.startsWith("tel:") },
  { channel: "direct_booking", test: (h) => h.includes("guestybookings.com") },
  { channel: "airbnb", test: (h) => h.includes("airbnb.") },
  { channel: "booking_com", test: (h) => h.includes("booking.com/hotel") },
];

function classify(href: string): string | null {
  const h = href.toLowerCase();
  for (const r of RULES) if (r.test(h)) return r.channel;
  return null;
}

export default function LeadTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const channel = classify(a.getAttribute("href") || "");
      if (!channel) return;
      const block = (a.closest("[data-lead-block]") as HTMLElement | null)?.dataset.leadBlock || "page";
      const params = {
        lead_channel: channel,
        lead_block: block,
        page_path: window.location.pathname,
        link_url: a.href,
      };
      const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
      if (typeof w.gtag === "function") w.gtag("event", "generate_lead", params);
      if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: "lead_click", ...params });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
