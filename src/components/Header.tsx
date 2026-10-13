"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { whatsappHref, whatsappTextForPath } from "@/app/lib/whatsapp";

type HeaderData = {
  brandName: string;
  bookingUrl?: string | null;
  navLinks?: { href: string; label: string }[] | null;
};

const DEFAULT_BOOKING_URL =
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";

const DEFAULT_NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#services", label: "Concierge" },
  { href: "/corporate-retreats", label: "Retreats" },
  { href: "/#reviews", label: "Guest reviews" },
  { href: "/articles", label: "Journal" },
];

export default function Header({ data }: { data?: HeaderData }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  if (pathname.startsWith("/admin")) return null;

  const brandName = "Villa Lithos";
  const bookingUrl = data?.bookingUrl || DEFAULT_BOOKING_URL;
  const navLinks = DEFAULT_NAV_LINKS;
  const waHref = whatsappHref(whatsappTextForPath(pathname));

  const solid = scrolled || !isHome || menuOpen;
  const cls = ["vl-header", solid ? (isHome ? "vl-header--solid" : "vl-header--inner") : ""].join(" ");

  return (
    <>
      <header className={cls} data-lead-block="nav">
        <div className="vl-header__in">
          <Link
            href="/"
            className="vl-header__brand"
            aria-label={`${brandName}, home`}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.replaceState(null, "", "/");
              }
              setMenuOpen(false);
            }}
          >
            {brandName}
          </Link>

          <nav className="vl-header__nav" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="vl-header__link">
                {l.label}
              </Link>
            ))}
          </nav>

          <a href={waHref} target="_blank" rel="noopener noreferrer" className="vl-header__wa" aria-label="WhatsApp Villa Lithos">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4.3-.4v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.2.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.2-.2-.2-.4-.3Z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="vl-btn vl-header__cta">
            Check availability
          </a>

          <button
            type="button"
            className={`vl-header__burger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="vl-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="vl-mobile-menu" className={`vl-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} data-lead-block="nav-mobile">
        <nav className="vl-menu__links" aria-label="Mobile navigation">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="vl-menu__link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="vl-menu__book">
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--light" onClick={() => setMenuOpen(false)}>
            WhatsApp the team
          </a>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--outline-light" onClick={() => setMenuOpen(false)}>
            Check availability
          </a>
          <Link href="/#inquiry" className="vl-btn vl-btn--outline-light" onClick={() => setMenuOpen(false)}>
            Ask the team
          </Link>
        </div>
        <div className="vl-menu__foot">
          <a href="tel:+306932757142">+30 693 275 7142</a>
          <span>Porto Rafti, Attica, Greece</span>
        </div>
      </div>
    </>
  );
}
