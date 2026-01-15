"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send } from "lucide-react";

const EMAIL = "Office@goldenberg-re.com";
const CONTACT_SECTION_ID = "contact";

export default function FloatingContactButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleClick = () => {
    const el = document.getElementById(CONTACT_SECTION_ID);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${EMAIL}`;
    setShowTooltip(false);
  };

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.8, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        whileHover: { y: -2, scale: 1.03 },
        whileTap: { scale: 0.97 },
        transition: { type: "spring", stiffness: 400, damping: 20 },
      };

  const tooltipMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 6, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 6, scale: 0.95 },
        transition: { duration: 0.15, ease: "easeOut" },
      };

  return (
    <div className="fcb-container">
      <AnimatePresence>
        {showTooltip && (
          <motion.div className="fcb-tooltip" {...tooltipMotion}>
            <button
              type="button"
              className="fcb-tooltip-btn"
              onClick={handleEmailClick}
            >
              <Send size={14} strokeWidth={1.5} />
              <span>Send Email</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="fcb-btn"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label="Scroll to contact form"
        {...motionProps}
      >
        <Mail size={22} strokeWidth={1.5} />
      </motion.button>
    </div>
  );
}
