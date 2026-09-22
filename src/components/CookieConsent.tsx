"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cookie consent banner wired to Google Consent Mode v2.
// - Default consent (all denied except essential) is set in the root layout
//   before any Google tag loads; this component only records the choice and
//   sends the consent update.
// - The choice is stored in the `vl_consent` cookie for 12 months.
// - Footer "Cookie settings" dispatches the `vl-open-cookie-settings` event to reopen.

const COOKIE = "vl_consent";
const MAX_AGE = 60 * 60 * 24 * 365;
export const OPEN_EVENT = "vl-open-cookie-settings";

type Choice = "all" | "essential";

function readChoice(): Choice | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )vl_consent=([^;]*)/);
  const v = m ? decodeURIComponent(m[1]) : null;
  return v === "all" || v === "essential" ? v : null;
}

function writeChoice(choice: Choice) {
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${choice}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function pushConsent(choice: Choice) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  // gtag.js recognises consent commands only when an `arguments` object is pushed, not a plain array,
  // so the fallback must use a classic function. Normally window.gtag already exists (root layout).
  // eslint-disable-next-line prefer-rest-params
  const gtag = w.gtag || function () { w.dataLayer!.push(arguments); };
  const v = choice === "all" ? "granted" : "denied";
  gtag("consent", "update", {
    analytics_storage: v,
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
  w.dataLayer.push({ event: "vl_consent_update", vl_consent: choice });
  window.dispatchEvent(new Event("vl-consent-changed"));
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    // Show the banner after mount when no choice is stored (deferred so it is not a synchronous setState in the effect body).
    const timer = window.setTimeout(() => {
      if (!readChoice()) onOpen();
    }, 0);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  if (!open) return null;

  const choose = (choice: Choice) => {
    writeChoice(choice);
    pushConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie choices"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 9999,
        margin: "0 auto",
        maxWidth: 720,
        background: "#faf8f3",
        color: "#1A2332",
        border: "1px solid rgba(26,35,50,0.12)",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(26,35,50,0.12)",
        padding: "18px 20px",
        fontFamily: "var(--font-sans), sans-serif",
        fontSize: 14,
        lineHeight: 1.55,
      }}
    >
      <div style={{ fontFamily: "var(--font-serif), serif", fontSize: 18, marginBottom: 6 }}>Cookies on this site</div>
      <p style={{ margin: 0, color: "#3D4A5C" }}>
        One essential cookie remembers your choice. Analytics and marketing cookies (Google Analytics, Meta Pixel) are set only if you accept them. Details in the{" "}
        <Link href="/privacy#cookies" style={{ color: "#7a8c6e", textDecoration: "underline" }}>Privacy Notice</Link>.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
        <button
          type="button"
          onClick={() => choose("all")}
          style={{ background: "#7a8c6e", color: "#fff", border: "none", borderRadius: 6, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => choose("essential")}
          style={{ background: "transparent", color: "#1A2332", border: "1px solid rgba(26,35,50,0.25)", borderRadius: 6, padding: "10px 18px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
        >
          Essential only
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      style={{ background: "none", border: "none", padding: 0, font: "inherit", color: "inherit", cursor: "pointer" }}
    >
      Cookie settings
    </button>
  );
}
