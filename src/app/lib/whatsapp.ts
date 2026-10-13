// Single source for the villa's WhatsApp link. The number belongs to the
// property manager (Goldenberg Luxe). Clicks are counted by <LeadTracker />.

export const WHATSAPP_NUMBER = "306932757142";

export function whatsappHref(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Pre-filled message that tells the team which page the guest was reading. */
export function whatsappTextForPath(pathname: string | null | undefined) {
  const p = (pathname || "/").split("?")[0];
  if (p === "/" || p === "") return "Hi, I'd like to check availability at Villa Lithos.";
  return `Hi, I'm reading villalithos.com${p} and would like to check availability at Villa Lithos.`;
}
