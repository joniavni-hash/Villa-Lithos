"use client";

import { useEffect } from "react";

// PostHog usage statistics (PostHog Cloud EU, data stored in Frankfurt).
// - Until the visitor clicks "Accept all" (no choice yet, or "Essential only") PostHog
//   keeps its state in memory only: no cookie, no localStorage, no sessionStorage.
//   Page views and clicks are counted, but the visitor is not recognised on a later
//   page load.
// - After "Accept all" (vl_consent=all) PostHog switches to a first-party cookie and
//   localStorage, so repeat visits count as one visitor. Session replay stays off unless
//   it is switched on in the PostHog project, and even then it runs only with consent.
// - Withdrawing consent ("Cookie settings" in the footer) switches back to memory, which
//   removes the PostHog cookies, localStorage entries and tab-scoped sessionStorage keys.
// - The SDK is loaded from PostHog's EU CDN instead of the npm package, so the site
//   bundle does not grow. The project token is a public, write-only key.
// - Not loaded on /admin (Tina CMS), and only on the live domain, so local development and
//   Vercel previews do not add visits to the statistics.

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "phc_pbdcPcYvxdresJcVCCYvftPuZHeU6FrmiYFGZ9FN9KKy";
const API_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
const ASSET_HOST = API_HOST.replace(".i.posthog.com", "-assets.i.posthog.com");
const CONSENT_EVENT = "vl-consent-changed";
const SCRIPT_ID = "posthog-js";
// Live hosts only. Setting NEXT_PUBLIC_POSTHOG_HOST (local testing) lifts the restriction.
const LIVE_HOST = /(^|\.)villalithos\.com$/;
const HOST_OVERRIDE = Boolean(process.env.NEXT_PUBLIC_POSTHOG_HOST);

type PosthogConfig = Record<string, unknown>;
type Posthog = {
  __loaded?: boolean;
  init: (token: string, config: PosthogConfig) => unknown;
  set_config: (config: PosthogConfig) => void;
};

function hasFullConsent(): boolean {
  const m = document.cookie.match(/(?:^|; )vl_consent=([^;]*)/);
  return m ? decodeURIComponent(m[1]) === "all" : false;
}

function getPosthog(): Posthog | undefined {
  return (window as unknown as { posthog?: Posthog }).posthog;
}

// The two settings that depend on the cookie choice.
function consentConfig(full: boolean): PosthogConfig {
  return {
    persistence: full ? "localStorage+cookie" : "memory",
    disable_session_recording: !full,
  };
}

let appliedFull: boolean | null = null;

function clearSessionKeys() {
  try {
    const store = window.sessionStorage;
    for (const k of Object.keys(store)) if (k.startsWith("ph_")) store.removeItem(k);
  } catch {
    // storage unavailable
  }
}

function init() {
  const ph = getPosthog();
  if (!ph || typeof ph.init !== "function" || ph.__loaded) return;
  const full = hasFullConsent();
  ph.init(KEY, {
    api_host: API_HOST,
    defaults: "2026-08-30",
    person_profiles: "identified_only",
    disable_surveys: true,
    session_recording: { maskAllInputs: true },
    ...consentConfig(full),
  });
  appliedFull = full;
}

function applyConsent() {
  const ph = getPosthog();
  if (!ph || !ph.__loaded) return; // not initialised yet: init() reads the cookie itself
  const full = hasFullConsent();
  if (full === appliedFull) return;
  ph.set_config(consentConfig(full));
  appliedFull = full;
  // Switching back to memory removes PostHog's cookies and localStorage entry; its tab-scoped
  // sessionStorage keys (window id) are left behind, so remove those as well.
  if (!full) clearSessionKeys();
}

function load() {
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `${ASSET_HOST}/static/array.js`;
  s.onload = init;
  document.head.appendChild(s);
}

export default function PosthogLoader() {
  useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) return;
    if (!HOST_OVERRIDE && !LIVE_HOST.test(window.location.hostname)) return;
    load();
    window.addEventListener(CONSENT_EVENT, applyConsent);
    return () => window.removeEventListener(CONSENT_EVENT, applyConsent);
  }, []);
  return null;
}
