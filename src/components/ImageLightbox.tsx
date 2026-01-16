"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

type Props = {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
};

export default function ImageLightbox({ src, alt, children, className = "" }: Props) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = useCallback(() => {
    setLoading(true);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Lock body scroll and keyboard navigation
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => closeBtnRef.current?.focus());

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, handleClose]);

  const modal = (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="lightbox-content">
        <button
          ref={closeBtnRef}
          type="button"
          className="lightbox-close"
          onClick={handleClose}
          aria-label="Close lightbox"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {loading && (
          <div className="lightbox-loading">Loading...</div>
        )}

        <img
          src={src}
          alt={alt}
          className="lightbox-image"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          draggable={false}
        />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={`lightbox-trigger ${className}`}
        onClick={handleOpen}
        aria-label={`View ${alt} in full size`}
      >
        {children}
      </button>

      {mounted && open ? createPortal(modal, document.body) : null}
    </>
  );
}
