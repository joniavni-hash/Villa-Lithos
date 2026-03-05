"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ============================================================================
// Constants
// ============================================================================

const WHATSAPP_NUMBER = "306932757142";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in booking Villa Lithos. I'd like to know more about availability and rates."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const MESSENGER_URL = "https://m.me/61577079999587";

// ============================================================================
// Animation
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// ============================================================================
// Component
// ============================================================================

type ContactData = {
  badge?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export default function ContactForm({ cmsData }: { cmsData?: ContactData }) {
  const badge = cmsData?.badge || "Contact";
  const formTitle = cmsData?.title || "Get in Touch";
  const formSubtitle =
    cmsData?.subtitle ||
    "Reach out to us directly. We typically respond within minutes.";

  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(containerRef, { once: true, amount: 0.15 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const buttonsInView = useInView(buttonsRef, { once: true, amount: 0.2 });

  const handleClick = (channel: string) => {
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "contact_click", {
        event_category: "engagement",
        event_label: channel,
        contact_method: channel,
      });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      id="inquiry"
      className="bf-section bf-visible"
      aria-label="Contact Us"
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <div className="bf-container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="bf-header"
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <span className="bf-badge">{badge}</span>
          <h2 className="bf-title">{formTitle}</h2>
          <p className="bf-subtitle">{formSubtitle}</p>
        </motion.div>

        {/* Contact Buttons */}
        <motion.div
          ref={buttonsRef}
          className="bf-form"
          initial="hidden"
          animate={buttonsInView ? "visible" : "hidden"}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "480px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick("whatsapp")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "18px 32px",
              backgroundColor: "#25D366",
              color: "#ffffff",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 14px rgba(37, 211, 102, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 211, 102, 0.3)";
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Message on WhatsApp
          </a>

          {/* Messenger Button */}
          <a
            href={MESSENGER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick("messenger")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              padding: "18px 32px",
              backgroundColor: "#0084FF",
              color: "#ffffff",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 4px 14px rgba(0, 132, 255, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 132, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 132, 255, 0.3)";
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z"/>
            </svg>
            Message on Messenger
          </a>

          {/* Phone option */}
          <a
            href="tel:+306932757142"
            onClick={() => handleClick("phone")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "14px 32px",
              backgroundColor: "transparent",
              color: "#c9a962",
              border: "2px solid #c9a962",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.backgroundColor = "rgba(201, 169, 98, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call +30 693 275 7142
          </a>

          {/* Footer Note */}
          <p className="bf-footer-note" style={{ textAlign: "center", marginTop: "8px" }}>
            We typically respond within minutes during business hours.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
