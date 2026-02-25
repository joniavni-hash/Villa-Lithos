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

const MAIN_SITE = "https://www.villalithosgreece.com";

const DEFAULT_NAV_LINKS = [
  { href: MAIN_SITE + "/#about", label: "The Villa" },
  { href: MAIN_SITE + "/#services", label: "Concierge" },
  { href: MAIN_SITE + "/#gallery", label: "Gallery" },
  { href: MAIN_SITE + "/#location", label: "Location" },
  { href: "https://blog.villalithosgreece.com/articles", label: "Articles" },
];

export default function Header({ data }: { data?: HeaderData }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  const brandName = data?.brandName || "Villa Lithos";
  const bookingUrl = data?.bookingUrl || DEFAULT_BOOKING_URL;
const BOOKING_COM_URL = "https://www.booking.com/hotel/gr/villa-lithos-porto-rafti";
const AIRBNB_URL = "https://airbnb.com/h/lithoss";
  const rawNavLinks = data?.navLinks || DEFAULT_NAV_LINKS;

  // Ensure anchor-only links always point to the main site
  const navLinks = rawNavLinks.map((link) => {
    if (link.href.startsWith("/#")) {
      return { ...link, href: MAIN_SITE + link.href };
    }
    return link;
  });

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header site-header--scrolled">
      <div className="site-header__container">
        {/* Brand Name */}
        <a
          href={MAIN_SITE}
          className="site-header__brand"
          aria-label={`${brandName} - Go to homepage`}
        >
          {brandName}
        </a>

        {/* Desktop Navigation */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <a
              key={`${link.href}-${index}`}
              href={link.href}
              className="site-header__link">
              {link.label}
            </a>
          ))}
            <div className="book-now-dropdown">
              <button className="book-now-trigger">
                Book Now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div className="dropdown-menu">
                <a href={BOOKING_COM_URL} target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  <div className="platform-icon icon-booking">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M2 7h8v10H2V7zm0-4h20v4H2V3zm10 4h10v10H12V7z"/></svg>
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">Booking.com</span>
                    <span className="platform-sub">Book Via Booking</span>
                  </div>
                </a>
                <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  <div className="platform-icon icon-airbnb">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C8 2 6 5.5 6 8c0 4 6 11 6 11s6-7 6-11c0-2.5-2-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5z"/></svg>
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">Airbnb</span>
                    <span className="platform-sub">Book Via Airbnb</span>
                  </div>
                </a>
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="dropdown-item">
                  <div className="platform-icon icon-direct">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>
                  </div>
                  <div className="platform-info">
                    <span className="platform-name">Direct</span>
                    <span className="platform-sub">Book Directly</span>
                  </div>
                </a>
              </div>
            </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="site-header__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`site-header__menu-icon ${menuOpen ? "is-open" : ""}`}
          >
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`site-header__mobile-nav ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="site-header__mobile-content">
          {/* Mobile Header */}
          <div className="site-header__mobile-header">
            <span className="site-header__mobile-brand">{brandName}</span>
            <button
              type="button"
              className="site-header__mobile-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="site-header__mobile-links">
            {navLinks.map((link, index) => (
              <a
                key={`${link.href}-${index}`}
                href={link.href}
                className="site-header__mobile-link"
                onClick={handleNavClick}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="site-header__mobile-cta-wrapper">
            {/* Mobile Booking Options */}
            <div className="mobile-booking-options">
              <a href={BOOKING_COM_URL} target="_blank" rel="noopener noreferrer" className="mobile-booking-btn mobile-btn-booking" onClick={() => setMenuOpen(false)}>
                <span className="mobile-btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M2 7h8v10H2V7zm0-4h20v4H2V3zm10 4h10v10H12V7z"/></svg></span>
                <span className="mobile-btn-text"><span className="mobile-btn-title">Booking.com</span><span className="mobile-btn-sub">Book Via Booking</span></span>
              </a>
              <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="mobile-booking-btn mobile-btn-airbnb" onClick={() => setMenuOpen(false)}>
                <span className="mobile-btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C8 2 6 5.5 6 8c0 4 6 11 6 11s6-7 6-11c0-2.5-2-6-6-6zm0 8.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 5.5 12 5.5s2.5 1.1 2.5 2.5S13.4 10.5 12 10.5z"/></svg></span>
                <span className="mobile-btn-text"><span className="mobile-btn-title">Airbnb</span><span className="mobile-btn-sub">Book Via Airbnb</span></span>
              </a>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mobile-booking-btn mobile-btn-direct" onClick={() => setMenuOpen(false)}>
                <span className="mobile-btn-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg></span>
                <span className="mobile-btn-text"><span className="mobile-btn-title">Direct</span><span className="mobile-btn-sub">Book Directly</span></span>
              </a>
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="site-header__mobile-footer">
            <a href="tel:+306932757142">+30 693 275 7142</a>
            <span>Porto Rafti, Greece</span>
          </div>
        </div>
      </div>
    </header>
  );
}
