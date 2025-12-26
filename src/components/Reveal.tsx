"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  rotateX?: number;
  scale?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
  rotateX = 6,
  scale = 0.98,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    once: false,
    amount: 0.2,
  });

  return (
    <div
      ref={ref}
      className="reveal-wrap"
      style={{
        perspective: 1200,
        position: "relative",
        zIndex: 1, // 🔑 δεν καλύπτει menu
      }}
    >
      <motion.div
        className={className}
        initial={{
          opacity: 0,
          y,
          rotateX,
          scale,
          filter: "blur(8px)",
        }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)",
              }
            : {}
        }
        transition={{
          duration: 0.6,
          ease: [0.22, 0.8, 0.22, 1],
          delay,
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
