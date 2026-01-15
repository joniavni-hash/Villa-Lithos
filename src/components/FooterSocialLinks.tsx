"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, MessageCircle, Facebook } from "lucide-react";

type SocialLink = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const socialLinks: SocialLink[] = [
  {
    icon: <Instagram size={18} strokeWidth={1.5} />,
    label: "Instagram",
    href: "https://www.instagram.com/villa.lithos/",
  },
  {
    icon: <MessageCircle size={18} strokeWidth={1.5} />,
    label: "WhatsApp",
    href: "https://wa.me/306932757142",
  },
  {
    icon: <Facebook size={18} strokeWidth={1.5} />,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61577079999587",
  },
];

function SocialIconButton({
  icon,
  label,
  href,
}: SocialLink) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            className="social-tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon-btn"
        aria-label={label}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.a>
    </div>
  );
}

export default function FooterSocialLinks() {
  return (
    <div className="fsl">
      <p className="fsl-label">Connect</p>
      <div className="fsl-links">
        {socialLinks.map((link) => (
          <SocialIconButton key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
}
