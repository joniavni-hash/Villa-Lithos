"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

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

// The homepage inquiry section (#inquiry) is the target of every "Send an
// inquiry" link on the inner pages. A click there is recorded as page "/" and
// block "inquiry", which loses the page the visitor came from. When that page is
// known (the previous route in this visit, or a same-origin referrer on a fresh
// load) the block becomes "inquiry-via-<path>", e.g. inquiry-via-corporate-retreats.
function pathSlug(path: string): string {
  return path
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function sameOriginReferrerPath(): string | null {
  try {
    if (!document.referrer) return null;
    const ref = new URL(document.referrer);
    return ref.origin === window.location.origin ? ref.pathname : null;
  } catch {
    return null;
  }
}

function withSource(block: string, sourcePath: string | null): string {
  if (block !== "inquiry" || window.location.pathname !== "/") return block;
  if (!sourcePath || sourcePath === "/") return block;
  const slug = pathSlug(sourcePath);
  return slug ? `inquiry-via-${slug}` : block;
}

export default function LeadTracker() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastPath.current !== pathname) {
      prevPath.current = lastPath.current;
      lastPath.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const channel = classify(a.getAttribute("href") || "");
      if (!channel) return;
      const rawBlock = (a.closest("[data-lead-block]") as HTMLElement | null)?.dataset.leadBlock || "page";
      const block = withSource(rawBlock, prevPath.current ?? sameOriginReferrerPath());
      const params = {
        lead_channel: channel,
        lead_block: block,
        page_path: window.location.pathname,
        link_url: a.href,
      };
      const w = window as unknown as { gtag?: Gtag; dataLayer?: unknown[] };
      if (typeof w.gtag === "function") w.gtag("event", "generate_lead", params);
      if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: "lead_click", ...params });
      // First-party counter (/api/lead): counts every visitor, with or without cookie consent.
      // One row per visitor per channel in a 10-minute window, so repeated clicks on
      // the same booking or WhatsApp button count as one inquiry. GA4 and GTM above
      // still receive every click.
      try {
        const key = `vl_lead_${channel}`;
        const now = Date.now();
        let last = 0;
        try {
          last = Number(window.sessionStorage.getItem(key)) || 0;
        } catch {
          last = 0;
        }
        if (now - last < 10 * 60 * 1000) return;
        try {
          window.sessionStorage.setItem(key, String(now));
        } catch {
          // storage unavailable: count the click
        }
        const payload = JSON.stringify({ channel, block, page: window.location.pathname });
        const sent = navigator.sendBeacon?.("/api/lead", new Blob([payload], { type: "application/json" }));
        if (!sent) fetch("/api/lead", { method: "POST", body: payload, keepalive: true }).catch(() => {});
      } catch {
        // ignore
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
