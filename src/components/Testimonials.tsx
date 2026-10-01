"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AIRBNB_SUMMARY,
  AIRBNB_URL,
  FEATURED_TESTIMONIAL,
  GOOGLE_REVIEWS_URL,
  TESTIMONIALS,
  type Testimonial,
} from "@/app/lib/testimonials";
import styles from "./Testimonials.module.css";

const ALL: Testimonial[] = [FEATURED_TESTIMONIAL, ...TESTIMONIALS];
const INTERVAL = 6500;
const GRID = 3;

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5 stars" role="img">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2l3 6.9 7.5.6-5.7 4.9 1.8 7.3L12 17.8 5.4 21.7l1.8-7.3L1.5 9.5 9 8.9z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

function QuoteMark() {
  return (
    <svg className={styles.quoteMark} width="32" height="25" viewBox="0 0 36 28" aria-hidden="true">
      <path d="M0 28V16C0 7 5 1.5 14 0l1.5 3.5C10 5 7.5 8.5 7.5 13H14v15H0zm21 0V16c0-9 5-14.5 14-16l1.5 3.5C31 5 28.5 8.5 28.5 13H35v15H21z" fill="currentColor" />
    </svg>
  );
}

function Byline({ t }: { t: Testimonial }) {
  return (
    <div className={styles.byline}>
      <span className={styles.who}>
        <cite className={styles.name}>{t.name}</cite>
        {t.meta && <span className={styles.meta}>{t.meta}</span>}
      </span>
      <span className={styles.sourceTag}>{t.source}</span>
    </div>
  );
}

/**
 * Reviews carousel. Every INTERVAL ms the featured quote and the three cards
 * below it advance by one; arrows and dots give manual control; hover pauses.
 * All quotes stay in the DOM (visually hidden) so crawlers read the full set.
 */
export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const n = ALL.length;

  const go = useCallback((d: number) => setIdx((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => go(1), INTERVAL);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [paused, go]);

  const featured = ALL[idx];
  const cards = Array.from({ length: GRID }, (_, k) => ALL[(idx + 1 + k) % n]);

  return (
    <section id="reviews" className={styles.section} aria-labelledby="reviews-title">
      <div className={styles.container}>
        <div className={styles.head}>
          <div>
            <p className={styles.kicker}>Guest reviews</p>
            <h2 id="reviews-title" className={styles.title}>In their own words</h2>
            <p className={styles.intro}>
              Reviews from guests who stayed at Villa Lithos, quoted word for word from Airbnb and Google.
            </p>
          </div>
          <div className={styles.headLinks}>
            <a className={styles.textLink} href={`${AIRBNB_URL}#reviews`} target="_blank" rel="noopener noreferrer">
              All reviews on Airbnb
            </a>
            <a className={styles.textLink} href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
              Reviews on Google
            </a>
          </div>
        </div>

        <div className={styles.summary}>
          <div className={styles.score}>
            <span className={styles.scoreNum}>{AIRBNB_SUMMARY.rating}</span>
            <Stars />
            <span className={styles.scoreSrc}>Airbnb · {AIRBNB_SUMMARY.count} reviews</span>
            <span className={styles.badge}>{AIRBNB_SUMMARY.badge}</span>
          </div>
          <ul className={styles.cats} aria-label="Airbnb category ratings" style={{ listStyle: "none", margin: 0 }}>
            {AIRBNB_SUMMARY.categories.map((c) => (
              <li key={c} className={styles.cat}>
                <span className={styles.catRow}>
                  <span className={styles.catLabel}>{c}</span>
                  <strong>{AIRBNB_SUMMARY.rating}</strong>
                </span>
                <span className={styles.catBar} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        <div
          className={styles.carousel}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <figure className={styles.featured} style={{ margin: 0 }} aria-live="polite">
            <div className={styles.featuredImg}>
              <Image
                src="/img/gallery/Exterior%20%26%20Pool%20(12).jpg"
                alt="Pool terrace at Villa Lithos"
                fill
                sizes="(max-width: 960px) 100vw, 420px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.featuredBody} key={idx}>
              <blockquote style={{ margin: 0 }}>
                <p className={styles.featuredQuote}>{featured.quote}</p>
              </blockquote>
              <Byline t={featured} />
            </div>
          </figure>

          <div className={styles.grid} role="list" key={`g${idx}`}>
            {cards.map((t) => (
              <figure key={t.name} className={styles.card} role="listitem">
                <blockquote style={{ margin: 0 }}>
                  <QuoteMark />
                  <p className={styles.quote}>{t.quote}</p>
                </blockquote>
                <Byline t={t} />
              </figure>
            ))}
          </div>

          <div className={styles.controls}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous review">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div className={styles.dots} role="tablist" aria-label="Choose review">
              {ALL.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={`Review by ${t.name}`}
                  className={`${styles.dot} ${i === idx ? styles.dotOn : ""}`}
                  onClick={() => setIdx(i)}
                />
              ))}
            </div>
            <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next review">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        {/* Full set for crawlers; visually hidden */}
        <ul className={styles.srList}>
          {ALL.map((t) => (
            <li key={`sr-${t.name}`}>{t.quote} ({t.name}, {t.source})</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
