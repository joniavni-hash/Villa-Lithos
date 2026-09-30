"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from "@/app/lib/faq";
import styles from "./FaqSection.module.css";

const WHATSAPP_URL = `https://wa.me/306932757142?text=${encodeURIComponent(
  "Hi, I have a question about Villa Lithos."
)}`;

const RETREATS_LINK_TEXT = "Corporate Retreats page";

// Every answer is rendered into the HTML (closed <details>, or [hidden] when
// filtered out), so crawlers read the same text as the FAQPage JSON-LD.
export default function FaqSection() {
  const [category, setCategory] = useState<FaqCategory | "all">("all");

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container}>
        <div className={styles.aside}>
          <p className={styles.kicker}>Questions &amp; answers</p>
          <h2 id="faq-title" className={styles.title}>Before you book</h2>
          <p className={styles.intro}>
            The questions groups ask us most, answered plainly. Anything else, the team replies on WhatsApp.
          </p>
          <div className={styles.photo}>
            <Image
              src="/img/gallery/Living & Dining (6).jpg"
              alt="Living and dining area at Villa Lithos"
              fill
              sizes="360px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.contact}>
            <h3 className={styles.contactTitle}>Still have a question?</h3>
            <p className={styles.contactText}>English, Greek and Hebrew.</p>
            <a className={styles.btn} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Message the team
            </a>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.pills} role="group" aria-label="Filter questions by topic">
            {FAQ_CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={styles.pill}
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className={styles.list}>
            {FAQ_ITEMS.map((item, i) => (
              <details
                key={item.id}
                name="villa-faq"
                className={styles.item}
                open={i === 0 ? true : undefined}
                hidden={category !== "all" && item.category !== category}
              >
                <summary className={styles.q}>
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className={styles.a}>
                  {item.answer.includes(RETREATS_LINK_TEXT) ? (
                    <>
                      {item.answer.split(RETREATS_LINK_TEXT)[0]}
                      <Link href="/corporate-retreats">{RETREATS_LINK_TEXT}</Link>
                      {item.answer.split(RETREATS_LINK_TEXT)[1]}
                    </>
                  ) : (
                    item.answer
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
