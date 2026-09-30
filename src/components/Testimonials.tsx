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

export default function Testimonials() {
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

        <figure className={styles.featured} style={{ margin: 0 }}>
          <div className={styles.featuredImg}>
            <Image
              src="/img/gallery/Exterior%20%26%20Pool%20(12).jpg"
              alt="Pool terrace at Villa Lithos"
              fill
              sizes="(max-width: 960px) 100vw, 420px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.featuredBody}>
            <blockquote style={{ margin: 0 }}>
              <p className={styles.featuredQuote}>{FEATURED_TESTIMONIAL.quote}</p>
            </blockquote>
            <Byline t={FEATURED_TESTIMONIAL} />
          </div>
        </figure>

        <div className={styles.grid} role="list">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className={styles.card} role="listitem">
              <blockquote style={{ margin: 0 }}>
                <QuoteMark />
                <p className={styles.quote}>{t.quote}</p>
              </blockquote>
              <Byline t={t} />
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
