"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/#about", label: "The Villa" },
  { href: "/#services", label: "Concierge" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#location", label: "Location" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking a nav link
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  // Prevent body scroll when menu is open
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
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__container">
        {/* Logo */}
        <Link href="/" className="site-header__logo" aria-label="Villa Lithos Home">
          <Image
            src="/img/logo.webp"
            alt="Villa Lithos"
            width={44}
            height={44}
            className="site-header__logo-img"
          />
          <span className="site-header__logo-text">Villa Lithos</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-header__link">
              {link.label}
            </Link>
          ))}
          <Link href="/#inquiry" className="site-header__cta">
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
          {/* Close button */}
          <button
            type="button"
            className="site-header__mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <nav className="site-header__mobile-links">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="site-header__mobile-link"
                onClick={handleNavClick}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/#inquiry"
            className="site-header__mobile-cta"
            onClick={handleNavClick}
          >
            Book Your Stay
          </Link>

          <div className="site-header__mobile-footer">
            <p>Porto Rafti, Greece</p>
            <a href="tel:+306932757142">+30 693 275 7142</a>
          </div>
        </div>
      </div>
    </header>
  );
}
