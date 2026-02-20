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

const DEFAULT_NAV_LINKS = [
  { href: "/#about", label: "The Villa" },
  { href: "/#services", label: "Concierge" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#location", label: "Location" },
];

export default function Header({ data }: { data?: HeaderData }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname.startsWith("/admin")) return null;

  const brandName = data?.brandName || "Villa Lithos";
  const bookingUrl = data?.bookingUrl || DEFAULT_BOOKING_URL;
  const navLinks = data?.navLinks || DEFAULT_NAV_LINKS;

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <button
          type="button"
          className="site-header__brand"
          aria-label={`${brandName} - Scroll to top`}
          onClick={scrollToTop}
        >
          {brandName}
        </button>

        {/* Desktop Navigation */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <Link key={`${link.href}-${index}`} href={link.href} className="site-header__link">
              {link.label}
            </Link>
          ))}
          <Link
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__cta"
          >
            Book Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="site-header__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={`site-header__menu-icon ${menuOpen ? "is-open" : ""}`}>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="site-header__mobile-links">
            {navLinks.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className="site-header__mobile-link"
                onClick={handleNavClick}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="site-header__mobile-cta-wrapper">
            <Link
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__mobile-cta"
              onClick={handleNavClick}
            >
              Book Your Stay
            </Link>
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
