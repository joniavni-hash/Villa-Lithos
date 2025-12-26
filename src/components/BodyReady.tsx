// src/components/BodyReady.tsx
"use client";

import { useEffect } from "react";

type Props = {
  className?: string; // προαιρετικά: αν θες να προσθέσεις άλλη κλάση πέρα από is-ready
};

export default function BodyReady({ className }: Props) {
  useEffect(() => {
    const cls = ["is-ready", className].filter(Boolean) as string[];

    cls.forEach((c) => document.body.classList.add(c));
    return () => cls.forEach((c) => document.body.classList.remove(c));
  }, [className]);

  return null;
}
