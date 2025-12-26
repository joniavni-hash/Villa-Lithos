"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

const panel = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.16 } },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const itemVar = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.42 } },
};

type Item = { href: string; label: string };

function MenuItem({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  const pathname = usePathname();
  const active = useMemo(
    () => (href === "/" ? pathname === "/" : pathname?.startsWith(href)),
    [href, pathname]
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className="group flex items-center justify-between border-b py-4"
      style={{ borderColor: "rgba(17,17,17,.10)", textDecoration: "none" }}
    >
      <span
        style={{
          fontFamily: 'ui-serif, Georgia, "Times New Roman", Times, serif',
          fontSize: "clamp(1.25rem, 5vw, 2rem)",
          letterSpacing: ".06em",
          textTransform: "uppercase",
          color: "rgba(12,12,12,.92)",
        }}
      >
        {label}
      </span>

      <span
        aria-hidden
        className="transition-opacity group-hover:opacity-100"
        style={{
          opacity: 0.7,
          color: "rgba(12,12,12,.62)",
          letterSpacing: ".12em",
        }}
      >
        →
      </span>
    </Link>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const items: Item[] = useMemo(
    () => [
      { href: "/#top", label: "Home" },
      { href: "/#services", label: "Services" },
      { href: "/#gallery", label: "Gallery" },
      { href: "/#inquiry", label: "Contact" },
    ],
    []
  );

  const HEADER_OFFSET = 56 + 14;

  function isHomeAnchor(href: string) {
    return href.startsWith("#") || href.startsWith("/#");
  }

  function smoothScrollTo(href: string) {
    const hash = href.includes("#") ? href.split("#")[1] : "";
    const id = hash || "top";

    const url = id === "top" ? "/" : `/#${id}`;
    window.history.pushState(null, "", url);

    const target = id === "top" ? document.documentElement : document.getElementById(id);
    if (!target) return;

    const y =
      id === "top"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function handleLinkClick(e: React.MouseEvent, href: string) {
    if (!isHomeAnchor(href)) return;

    e.preventDefault();
    setOpen(false);

    requestAnimationFrame(() => smoothScrollTo(href));
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("menu-open", open);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  useFocusTrap(drawerRef, open, () => setOpen(false));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Top header */}
      <header className="sticky top-0 z-40">
        <div
          className="border-b"
          style={{
            borderColor: "rgba(17,17,17,.10)",
            background: "rgba(246,243,238,.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          <div
            className="container-page"
            style={{
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link
              href="/#top"
              onClick={(e) => handleLinkClick(e, "/#top")}
              className="inline-flex items-center gap-3"
              style={{ textDecoration: "none" }}
            >
              <div className="hidden sm:block leading-tight">
                <div
                  style={{
                    fontFamily: 'ui-serif, Georgia, "Times New Roman", Times, serif',
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "rgba(12,12,12,.92)",
                    fontSize: "1rem",
                  }}
                >
                  Villa Lithos
                </div>
                <div style={{ color: "rgba(12,12,12,.62)", fontSize: ".85rem" }}>
                  Greece
                </div>
              </div>
            </Link>

            <nav
              className="hidden md:flex items-center gap-7 text-sm"
              style={{ color: "rgba(12,12,12,.72)" }}
              aria-label="Primary"
            >
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={(e) => handleLinkClick(e, it.href)}
                  className="hover:opacity-100 transition-opacity"
                  style={{ letterSpacing: ".08em", textTransform: "uppercase", opacity: 0.85 }}
                >
                  {it.label}
                </Link>
              ))}
              <Link
                href="/#inquiry"
                onClick={(e) => handleLinkClick(e, "/#inquiry")}
                className="btn primary"
              >
                Inquire <span aria-hidden>→</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Bottom MENU pill */}
      <button
        id="menu-fab"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="site-menu"
      >
        ≡ <span>Menu</span>
      </button>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="site-menu"
            id="site-menu"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={overlay}
            role="dialog"
            aria-modal="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2147483647,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            <motion.div
              ref={drawerRef}
              variants={panel}
              className="container-page"
              style={{
                paddingTop: "max(env(safe-area-inset-top), 18px)",
                paddingBottom: "max(env(safe-area-inset-bottom), 24px)",
                minHeight: "100%",
              }}
            >
              {/* Sticky top row inside menu (so X always works) */}
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 5,
                  paddingTop: 10,
                  paddingBottom: 10,
                  background: "rgba(246,243,238,.86)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="menu-close"
                  aria-label="Close menu"
                  type="button"
                  style={{ zIndex: 6 }}
                >
                  <span style={{ color: "rgba(12,12,12,.88)", fontSize: 18 }}>✕</span>
                </button>

      
              </div>

              {/* Content grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.15fr",
                  gap: 42,
                  marginTop: 28,
                  alignItems: "start",
                }}
              >
                <motion.nav
                  variants={list}
                  initial="hidden"
                  animate="show"
                  className="menu-nav"
                  aria-label="Menu"
                >
                  {items.map((it) => (
                    <motion.div key={it.href} variants={itemVar}>
                      <MenuItem
                        href={it.href}
                        label={it.label}
                        onClick={(e) => handleLinkClick(e, it.href)}
                      />
                    </motion.div>
                  ))}
                </motion.nav>

              </div>

              {/* Mobile layout */}
              <style jsx>{`
                @media (max-width: 860px) {
                  #site-menu .container-page > div[style*="grid-template-columns"] {
                    grid-template-columns: 1fr !important;
                    gap: 18px !important;
                  }
                  .menu-actions {
                    position: static !important;
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 10px !important;
                    justify-content: flex-end !important;
                    padding-left: 70px; /* space for X */
                  }
                }
              `}</style>

           {/* Footer (NOT absolute, so it won’t block scroll/taps) */}
<div className="menu-footer">
  <div className="footer-content">
    <span className="footer-text">Villa Lithos</span>
    <span className="footer-separator">•</span>
    <span className="footer-text">Greece</span>
  </div>
  <div className="footer-contact">
    <span className="footer-label">Email:</span>
    <a
      href="mailto:reservations@villalithos.com"
      className="footer-email"
    >
      reservations@villalithos.com
    </a>
  </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
