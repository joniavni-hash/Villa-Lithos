"use client";

import { useEffect } from "react";

// Loads the Google Tag Manager container only after the visitor has accepted
// analytics and marketing cookies (vl_consent=all). The container fires tags
// (GA4 property G-1ZD1ZWF68G, Meta Pixel) that set cookies on their own, so it
// must not run before consent. Google Consent Mode defaults are set in the root
// layout; the direct GA4 tag there already honours them.

const GTM_ID = "GTM-W679GNPL";
const CONSENT_EVENT = "vl-consent-changed";

function hasFullConsent() {
  const m = document.cookie.match(/(?:^|; )vl_consent=([^;]*)/);
  return m ? decodeURIComponent(m[1]) === "all" : false;
}

function loadGtm() {
  if (document.getElementById("gtm-js")) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-js";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

export default function GtmLoader() {
  useEffect(() => {
    const check = () => {
      if (hasFullConsent()) loadGtm();
    };
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);
  return null;
}
