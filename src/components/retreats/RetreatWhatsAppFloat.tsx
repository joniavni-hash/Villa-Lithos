"use client";

import { useEffect, useState } from "react";
import { waLink, WhatsAppIcon } from "./contact";

const TEXT = "Hi, I'm planning a company retreat and would like to talk about Villa Lithos for our team.";

/**
 * Green floating "Talk to us" WhatsApp pill for /corporate-retreats.
 * Appears once the hero is scrolled past; steps aside while the proposal section
 * (which carries its own WhatsApp button) is on screen.
 */
export default function RetreatWhatsAppFloat({ hideWhenVisibleId = "proposal" }: { hideWhenVisibleId?: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [targetInView, setTargetInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | null = null;
    const el = document.getElementById(hideWhenVisibleId);
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(([entry]) => setTargetInView(entry.isIntersecting), { threshold: 0.25 });
      io.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [hideWhenVisibleId]);

  const on = pastHero && !targetInView;

  return (
    <a
      href={waLink(TEXT)}
      target="_blank"
      rel="noopener noreferrer"
      className={`rc-float ${on ? "is-in" : ""}`}
      aria-label="Talk to us on WhatsApp"
      aria-hidden={!on}
      tabIndex={on ? 0 : -1}
      data-lead-block="retreats-float-whatsapp"
    >
      <WhatsAppIcon size={24} />
      <span>Talk to us</span>
    </a>
  );
}
