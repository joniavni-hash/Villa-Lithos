"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ============================================================================
// Types
// ============================================================================

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

// ============================================================================
// Constants
// ============================================================================

const INITIAL_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

// ============================================================================
// Validation
// ============================================================================

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  // Full name
  if (!data.fullName.trim()) {
    errors.fullName = "Please enter your full name";
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters";
  }

  // Email
  if (!data.email.trim()) {
    errors.email = "Please enter your email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Phone (optional but validate format if provided)
  if (data.phone && !/^[+\d\s\-()]{6,}$/.test(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  return errors;
}

// ============================================================================
// Component
// ============================================================================

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactForm() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLFormElement>(null);

  // Changed to once: true to prevent continuous re-renders on scroll (reduces TBT)
  const sectionInView = useInView(containerRef, { once: true, amount: 0.15 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const formInView = useInView(formContainerRef, { once: true, amount: 0.2 });

  // Validate on change for touched fields
  useEffect(() => {
    if (touched.size > 0) {
      const newErrors = validateForm(data);
      // Only show errors for touched fields
      const visibleErrors: FormErrors = {};
      touched.forEach((field) => {
        if (newErrors[field]) {
          visibleErrors[field] = newErrors[field];
        }
      });
      setErrors(visibleErrors);
    }
  }, [data, touched]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear server error when user starts typing
      if (serverError) setServerError("");
      if (status === "error") setStatus("idle");
    },
    [serverError, status]
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => new Set(prev).add(name as keyof FormData));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const allErrors = validateForm(data);
    setErrors(allErrors);
    setTouched(new Set(Object.keys(data) as (keyof FormData)[]));

    if (Object.keys(allErrors).length > 0) {
      // Focus first error field
      const firstErrorField = Object.keys(allErrors)[0];
      const element = document.getElementById(`bf-${firstErrorField}`);
      element?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");

    const payload = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim() || undefined,
      message: data.message.trim() || "Booking inquiry from website",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send request");
      }

      setStatus("success");
    } catch (err) {
      console.error("Booking request error:", err);
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    setErrors({});
    setTouched(new Set());
    setStatus("idle");
    setServerError("");
  };

  return (
    <motion.section
      ref={containerRef}
      id="inquiry"
      className="bf-section bf-visible"
      aria-label="Booking Request"
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.6 }}
    >
      <div className="bf-container">
        {/* Success State */}
        {status === "success" ? (
          <motion.div
            className="bf-success"
            role="status"
            aria-live="polite"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <div className="bf-success__icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="rgba(139, 169, 125, 0.15)" />
                <path
                  d="M14 24L21 31L34 18"
                  stroke="#8BA97D"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="bf-success__title">Request Received</h3>
            <p className="bf-success__text">
              Thank you. We&apos;ll get back to you within 24 hours.
            </p>
            <button type="button" className="bf-btn bf-btn--secondary" onClick={handleReset}>
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <>
            {/* Header - fades up */}
            <motion.div
              ref={headerRef}
              className="bf-header"
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <span className="bf-badge">Contact</span>
              <h2 className="bf-title">Get in Touch</h2>
              <p className="bf-subtitle">
                Send us a message. We&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>

            {/* Form - fades up */}
            <motion.form
              ref={formContainerRef}
              className="bf-form"
              onSubmit={handleSubmit}
              noValidate
              aria-describedby={serverError ? "bf-server-error" : undefined}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Server Error Banner */}
              {serverError && (
                <div id="bf-server-error" className="bf-error-banner" role="alert">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{serverError}</span>
                </div>
              )}

              {/* Row: Full Name + Email */}
              <div className="bf-row">
                <div className="bf-field">
                  <label htmlFor="bf-fullName" className="bf-label">
                    Full Name <span className="bf-required">*</span>
                  </label>
                  <input
                    id="bf-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="John Smith"
                    value={data.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "bf-fullName-error" : undefined}
                    className={`bf-input ${errors.fullName ? "bf-input--error" : ""}`}
                  />
                  {errors.fullName && (
                    <span id="bf-fullName-error" className="bf-error" role="alert">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div className="bf-field">
                  <label htmlFor="bf-email" className="bf-label">
                    Email <span className="bf-required">*</span>
                  </label>
                  <input
                    id="bf-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "bf-email-error" : undefined}
                    className={`bf-input ${errors.email ? "bf-input--error" : ""}`}
                  />
                  {errors.email && (
                    <span id="bf-email-error" className="bf-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Phone - Full Width */}
              <div className="bf-field bf-field--full">
                  <label htmlFor="bf-phone" className="bf-label">
                    Phone <span className="bf-optional">(optional)</span>
                  </label>
                  <input
                    id="bf-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+30 6912 345678"
                    value={data.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "bf-phone-error" : undefined}
                    className={`bf-input ${errors.phone ? "bf-input--error" : ""}`}
                  />
                  {errors.phone && (
                    <span id="bf-phone-error" className="bf-error" role="alert">
                      {errors.phone}
                    </span>
                  )}
              </div>

              {/* Message */}
              <div className="bf-field bf-field--full">
                <label htmlFor="bf-message" className="bf-label">
                  Message <span className="bf-optional">(optional)</span>
                </label>
                <textarea
                  id="bf-message"
                  name="message"
                  rows={4}
                  autoComplete="off"
                  placeholder="Special requests, occasion, dietary needs..."
                  value={data.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bf-input bf-textarea"
                />
              </div>

              {/* Submit */}
              <div className="bf-actions">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  aria-disabled={status === "submitting"}
                  className="bf-btn bf-btn--primary"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="bf-spinner" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>

              {/* Footer Note */}
              <p className="bf-footer-note">
                We only use your information to process this request.
              </p>
            </motion.form>
          </>
        )}
      </div>
    </motion.section>
  );
}
