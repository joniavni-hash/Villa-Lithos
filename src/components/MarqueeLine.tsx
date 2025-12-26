"use client";

import { motion } from "framer-motion";

type Props = {
  text?: string;
  speedSeconds?: number; // lower = faster
};

export default function MarqueeLine({
  text = "VILLA LITHOS • PRIVATE RETREAT • SEA VIEWS • INFINITY POOL • SAUNA • JACUZZI • PRIVATE PADEL COURT • BESPOKE EXPERIENCES • CONCIERGE • ",
  speedSeconds = 18,
}: Props) {
  // repeat enough so it loops smoothly
  const loopText = `${text}${text}${text}`;

  return (
    <div
      className="overflow-hidden border-y"
      style={{
        borderColor: "var(--border)",
        background: "rgba(255,255,255,.02)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        className="whitespace-nowrap"
        style={{
          color: "var(--muted)",
          padding: "14px 0",
          fontSize: ".78rem",
          letterSpacing: ".22em",
          textTransform: "uppercase",
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speedSeconds, ease: "linear", repeat: Infinity }}
      >
        <span style={{ marginRight: "2rem" }}>{loopText}</span>
      </motion.div>
    </div>
  );
}
