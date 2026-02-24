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
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__cta"
          >
            Book Now
          </a>
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
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-header__mobile-cta"
              onClick={handleNavClick}
            >
              Book Your Stay
            </a>
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
