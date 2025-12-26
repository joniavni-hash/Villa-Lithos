"use client";

import React, { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

type FormState = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  arrival: string; // yyyy-mm-dd
  departure: string; // yyyy-mm-dd
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  guests: "",
  arrival: "",
  departure: "",
  message: "",
};

function daysBetween(arrival: string, departure: string) {
  if (!arrival || !departure) return 0;
  const a = new Date(arrival + "T00:00:00");
  const d = new Date(departure + "T00:00:00");
  const diff = d.getTime() - a.getTime();
  const nights = Math.round(diff / (1000 * 60 * 60 * 24));
  return Number.isFinite(nights) ? nights : 0;
}

function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    const dt = new Date(iso + "T00:00:00");
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return iso;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<FormState>(INITIAL);

  const nights = useMemo(
    () => daysBetween(data.arrival, data.departure),
    [data.arrival, data.departure]
  );

  const dateInvalid =
    Boolean(data.arrival) && Boolean(data.departure) && (nights <= 0 || isNaN(nights));

  const canSubmit =
    data.name.trim() &&
    data.email.trim() &&
    data.guests.trim() &&
    data.arrival &&
    data.departure &&
    !dateInvalid &&
    status !== "sending";

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setData((prev) => ({ ...prev, [name]: value }));
    if (status === "sent" || status === "error") setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("sending");

    const payload = {
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      guests: Number(data.guests) || data.guests,
      arrival: data.arrival,
      departure: data.departure,
      nights,
      villa: "Villa Lithos",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Request failed");
      }

      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  function resetAll() {
    setData(INITIAL);
    setStatus("idle");
  }

  return (
    <section aria-label="Inquiry" className="container-page">
      <div className="fs-inquiry">
        {/* LEFT / ASIDE */}
        <aside className="fs-inquiry__aside">
          <div className="fs-inquiry__block">
            <div className="fs-aside__title">Villa Lithos</div>

            {/* Booking summary card */}
            <div className="fs-summary card">
              <div className="fs-summary__kicker">Booking summary</div>

              <div className="fs-summary__row">
                <div className="fs-summary__label">Arrival</div>
                <div className="fs-summary__value">{formatDate(data.arrival)}</div>
              </div>

              <div className="fs-summary__row">
                <div className="fs-summary__label">Departure</div>
                <div className="fs-summary__value">{formatDate(data.departure)}</div>
              </div>

              <div className="fs-summary__row">
                <div className="fs-summary__label">Guests</div>
                <div className="fs-summary__value">{data.guests?.trim() ? data.guests : "—"}</div>
              </div>

              <div className="fs-summary__divider" />

              <div className="fs-summary__row fs-summary__row--big">
                <div className="fs-summary__label">Nights</div>
                <div className="fs-summary__value">
                  {data.arrival && data.departure ? nights || "—" : "—"}
                </div>
              </div>

              {dateInvalid ? (
                <div className="fs-summary__warn" role="alert">
                  Departure must be after arrival.
                </div>
              ) : null}

              <div className="fs-summary__hint">
                We’ll reply with availability and tailored options for your stay.
              </div>

              <div className="fs-summary__actions">
                <a className="btn ghost" href="mailto:reservations@villalithos.com">
                  Email us
                </a>
                <button type="button" className="btn secondary" onClick={resetAll}>
                  Reset
                </button>
              </div>
            </div>

            <div className="fs-aside__meta">
              <div className="fs-aside__metaRow">
                <span className="fs-aside__metaLabel">Response</span>
                <span className="fs-aside__metaValue">Within 24 hours</span>
              </div>
              <div className="fs-aside__metaRow">
                <span className="fs-aside__metaLabel">Concierge</span>
                <span className="fs-aside__metaValue">Available</span>
              </div>
              <div className="fs-aside__metaRow">
                <span className="fs-aside__metaLabel">Support</span>
                <span className="fs-aside__metaValue">We’re here to help</span>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <div className="fs-aside__sub">How it works</div>
              <p className="fs-aside__muted">
                Send your preferred dates and a few details. We’ll reply with availability and tailored options for
                your stay.
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT / FORM */}
        <div>
          <div className="fs-form__header">
            <div className="kicker">Inquiry</div>
            <h2 className="fs-form__title">Plan your stay</h2>
            <p className="fs-form__lead">
              Fill in the essentials and we’ll get back to you promptly with availability, rates, and recommendations.
            </p>
          </div>

          <form className="fs-form form-modern" onSubmit={onSubmit}>
            <div className="fs-grid">
              <div className="fs-field">
                <label>
                  Full name <span className="fs-required">*</span>
                </label>
                <input name="name" required placeholder="Your full name" value={data.name} onChange={onChange} />
              </div>

              <div className="fs-field">
                <label>
                  Email <span className="fs-required">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={data.email}
                  onChange={onChange}
                />
              </div>

              <div className="fs-field">
                <label>Phone (optional)</label>
                <input name="phone" placeholder="+30 …" value={data.phone} onChange={onChange} />
              </div>

              <div className="fs-field">
                <label>
                  Guests <span className="fs-required">*</span>
                </label>
                <input name="guests" required placeholder="e.g. 6" value={data.guests} onChange={onChange} />
              </div>

              <div className="fs-field">
                <label>
                  Arrival <span className="fs-required">*</span>
                </label>
                <input name="arrival" type="date" required value={data.arrival} onChange={onChange} />
              </div>

              <div className="fs-field">
                <label>
                  Departure <span className="fs-required">*</span>
                </label>
                <input name="departure" type="date" required value={data.departure} onChange={onChange} />
              </div>

              <div className="fs-field" style={{ gridColumn: "1 / -1" }}>
                <label>Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Anything we should know? (occasion, preferences, etc.)"
                  value={data.message}
                  onChange={onChange}
                />
              </div>
            </div>

            <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn primary" type="submit" disabled={!canSubmit}>
                {status === "sending" ? "Sending…" : "Send inquiry"}
              </button>

              {status === "sent" ? (
                <span style={{ color: "var(--muted)", alignSelf: "center" }}>
                  ✓ Sent — we’ll get back to you shortly.
                </span>
              ) : null}

              {status === "error" ? (
                <span style={{ color: "var(--muted)", alignSelf: "center" }}>
                  Something went wrong. Please try again or email us.
                </span>
              ) : null}

              {!canSubmit && status === "idle" ? (
                <span style={{ color: "var(--muted)", alignSelf: "center" }}>
                  Please complete required fields.
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
