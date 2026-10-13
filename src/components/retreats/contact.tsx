// Shared contact details and the WhatsApp mark for the /corporate-retreats CTAs.
// Clicks are measured by <LeadTracker /> through the nearest data-lead-block.

export const WA_NUMBER = "306932757142";
export const WA_GREEN = "#25D366";
export const WA_GREEN_HOVER = "#1EBE5A";
export const RETREAT_EMAIL = "info@villalithosgreece.com";

export function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.2-.2-.4-.3Z" />
    </svg>
  );
}

/** Scoped styles for every retreat CTA (green WhatsApp button, bands, builder, floating pill). */
export const RETREAT_CTA_CSS = `
.rc-wa{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 24px;border-radius:999px;background:${WA_GREEN};color:#fff;font-weight:700;font-size:16px;text-decoration:none;box-shadow:0 8px 22px rgba(37,211,102,.28);transition:background .2s,transform .2s,box-shadow .2s;white-space:nowrap}
.rc-wa:hover{background:${WA_GREEN_HOVER};transform:translateY(-1px);box-shadow:0 12px 26px rgba(37,211,102,.36)}
.rc-wa:focus-visible,.rc-sec:focus-visible,.rc-chip:focus-visible{outline:3px solid #1A2332;outline-offset:3px}
.rc-sec{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:52px;padding:0 22px;border-radius:999px;font-weight:600;font-size:15px;text-decoration:none;border:1.5px solid currentColor;transition:background .2s,color .2s}
.rc-band{display:flex;flex-direction:column;gap:20px;align-items:flex-start;padding:26px 28px;border-radius:18px}
@media(min-width:900px){.rc-band{flex-direction:row;align-items:center;justify-content:space-between;gap:32px;padding:30px 36px}}
.rc-band__btns{display:flex;flex-wrap:wrap;gap:12px}
@media(max-width:520px){.rc-band__btns{width:100%}.rc-band__btns>a{flex:1 1 100%}}
.rc-chip{min-height:44px;padding:0 16px;border-radius:999px;border:1.5px solid rgba(26,35,50,.18);background:#fff;color:#1A2332;font-size:14px;font-weight:600;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
.rc-chip[aria-pressed="true"]{background:#1A2332;border-color:#1A2332;color:#fff}
.rc-float{position:fixed;right:20px;bottom:20px;z-index:60;display:inline-flex;align-items:center;gap:10px;height:56px;padding:0 22px 0 16px;border-radius:999px;background:${WA_GREEN};color:#fff;font-weight:700;font-size:16px;text-decoration:none;box-shadow:0 14px 34px rgba(0,0,0,.25);opacity:0;transform:translateY(18px);pointer-events:none;transition:opacity .4s ease,transform .4s ease,background .2s}
.rc-float.is-in{opacity:1;transform:none;pointer-events:auto}
.rc-float:hover{background:${WA_GREEN_HOVER}}
.rc-float.is-in::after{content:"";position:absolute;inset:0;border-radius:inherit;box-shadow:0 0 0 0 rgba(37,211,102,.55);animation:rc-ring 2.2s ease-out 2}
@keyframes rc-ring{0%{box-shadow:0 0 0 0 rgba(37,211,102,.55)}100%{box-shadow:0 0 0 18px rgba(37,211,102,0)}}
@media(max-width:600px){.rc-float{right:14px;bottom:14px;height:52px;padding:0 18px 0 14px;font-size:15px}}
@media(prefers-reduced-motion:reduce){.rc-float,.rc-wa{transition:none}.rc-float.is-in::after{animation:none}}
`;
