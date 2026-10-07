import Link from "next/link";
import NowInPortoRafti from "./NowInPortoRafti";
import { WINTER_STATS as S } from "@/app/lib/season";

// Shown on the homepage from October to March only (see src/app/lib/season.ts).
export default function WinterBand() {
  return (
    <section id="winter" className="vl-winter" aria-labelledby="winter-title">
      <div className="vl-winter__in">
        <header className="vl-winter__head vl-reveal">
          <span className="vl-label">October to March</span>
          <h2 id="winter-title" className="vl-h2">
            A winter base for teams, 20 minutes from Athens airport
          </h2>
          <p className="vl-winter__lead">
            Weekday offsites, wellness weeks and long stays. Nine bedrooms, a heated pool, a sauna and a gym,
            under a sky that stayed sunny on {S.portoRafti.sunnyDays} of the {S.days} days last winter.
          </p>
        </header>

        <div className="vl-winter__grid">
          <NowInPortoRafti />

          <div className="vl-winter__tile vl-reveal" data-delay="1">
            <div className="vl-label vl-winter__kicker">Sunny days last winter</div>
            <div className="vl-stat__num vl-winter__num">
              {S.portoRafti.sunnyDays}
              <sup>/{S.days}</sup>
            </div>
            <div className="vl-winter__text">
              Days with 6+ hours of sunshine. London {S.london.sunnyDays}, Berlin {S.berlin.sunnyDays}.
            </div>
            <div className="vl-winter__src">Open-Meteo historical data, {S.period}</div>
          </div>

          <div className="vl-winter__tile vl-reveal" data-delay="2">
            <div className="vl-label vl-winter__kicker">Average daytime high</div>
            <div className="vl-stat__num vl-winter__num">
              {S.portoRafti.avgHigh.toFixed(1)}
              <sup>°C</sup>
            </div>
            <div className="vl-winter__text">
              October to March. London {S.london.avgHigh.toFixed(1)}°C, Berlin {S.berlin.avgHigh.toFixed(1)}°C.
            </div>
            <div className="vl-winter__src">{S.portoRafti.sunHours.toLocaleString("en-US")} sunshine hours in the period</div>
          </div>
        </div>

        <div className="vl-winter__cta vl-reveal" data-delay="3">
          <Link href="/corporate-retreats" className="vl-btn">
            Plan a team offsite
          </Link>
          <Link href="/articles/wellness-retreats-greece-mainland" className="vl-btn vl-btn--ghost">
            Winter wellness retreats
          </Link>
        </div>
      </div>
    </section>
  );
}
