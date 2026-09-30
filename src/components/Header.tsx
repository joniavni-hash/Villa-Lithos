"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type HeaderData = {
  brandName: string;
  bookingUrl?: string | null;
  navLinks?: { href: string; label: string }[] | null;
};

const DEFAULT_BOOKING_URL =
  "https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72";
const BOOKING_COM_URL = "https://www.booking.com/hotel/gr/villa-lithos-porto-rafti";
const AIRBNB_URL = "https://airbnb.com/h/lithoss";

const DEFAULT_NAV_LINKS = [
  { href: "/#about", label: "The Villa" },
  { href: "/#floors", label: "Rooms" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#services", label: "Concierge" },
  { href: "/corporate-retreats", label: "Retreats" },
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

  const solid = scrolled || !isHome || menuOpen;
  const cls = ["vl-header", solid ? (isHome ? "vl-header--solid" : "vl-header--inner") : ""].join(" ");

  return (
    <>
      <header className={cls}>
        <div className="vl-header__in">
          <Link href="/" className="vl-header__brand" aria-label={`${brandName}, home`}>
            {brandName}
          </Link>

          <nav className="vl-header__nav" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="vl-header__link">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="vl-book">
            <Link href="/#inquiry" className="vl-btn vl-header__cta">
              Check availability
            </Link>
            <div className="vl-book__menu" role="menu" aria-label="Booking options">
              <Link href="/#inquiry" className="vl-book__item" role="menuitem">
                <strong>Direct request</strong>
                <span>Best terms, concierge included</span>
              </Link>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="vl-book__item" role="menuitem">
                <strong>Book online</strong>
                <span>Instant confirmation</span>
              </a>
              <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="vl-book__item" role="menuitem">
                <strong>Airbnb</strong>
                <span>Guest Favourite, 5.0</span>
              </a>
              <a href={BOOKING_COM_URL} target="_blank" rel="noopener noreferrer" className="vl-book__item" role="menuitem">
                <strong>Booking.com</strong>
                <span>Free cancellation options</span>
              </a>
            </div>
          </div>

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

      <div id="vl-mobile-menu" className={`vl-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="vl-menu__links" aria-label="Mobile navigation">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="vl-menu__link" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="vl-menu__book">
          <Link href="/#inquiry" className="vl-btn vl-btn--light" onClick={() => setMenuOpen(false)}>
            Check availability
          </Link>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--outline-light">
            Book online
          </a>
        </div>
        <div className="vl-menu__foot">
          <a href="tel:+306932757142">+30 693 275 7142</a>
          <span>Porto Rafti, Attica, Greece</span>
        </div>
      </div>
    </>
  );
}
