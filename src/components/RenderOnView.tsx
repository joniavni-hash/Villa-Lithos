"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Placeholder height to prevent CLS - matches expected content height */
  fallbackHeight?: string;
  /** rootMargin for IntersectionObserver - load before visible */
  rootMargin?: string;
  /** Once visible, stay rendered (default: true) */
  once?: boolean;
  /** Optional className for the wrapper */
  className?: string;
  /** Optional id for anchor links */
  id?: string;
};

/**
 * RenderOnView - Lazy mounts children only when near viewport
 * Uses IntersectionObserver for performance
 * Prevents CLS with min-height placeholder
 */
export default function RenderOnView({
  children,
  fallbackHeight = "400px",
  rootMargin = "300px",
  once = true,
  className = "",
  id,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already visible and once=true, skip observer
    if (hasBeenVisible && once) return;

    // Fallback for browsers without IntersectionObserver
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin, once, hasBeenVisible]);

  const shouldRender = once ? hasBeenVisible : isVisible;

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={!shouldRender ? { minHeight: fallbackHeight } : undefined}
    >
      {shouldRender ? children : null}
    </div>
  );
}
