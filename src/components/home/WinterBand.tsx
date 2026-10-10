import Image from "next/image";
import Link from "next/link";
import NowInPortoRafti from "./NowInPortoRafti";
import { WINTER_STATS as S } from "@/app/lib/season";

// Winter-fit amenities. Every line below is already stated elsewhere on the site
// (Signature block, wellness article facilities table, gallery captions).
const WINTER_AMENITIES = [
  {
    href: "/#gallery",
    img: "/img/gallery/Wellness%20%26%20Spa%20(2).jpg",
    alt: "Outdoor barrel sauna at Villa Lithos among the olive trees in Porto Rafti",
    title: "Outdoor sauna",
    text: "Barrel sauna in the garden among the olive trees, with a red-light therapy panel. Post-training recovery, or simply the end of a cold day.",
  },
  {
    href: "/wellness-retreat-villa-greece#facilities",
    img: "/img/gallery/Sports%20%26%20Activities%20(4).jpg",
    alt: "Private gym pavilion at Villa Lithos with cable machine, bench and glass doors open to the lawn",
    title: "Private gym",
    text: "Garden pavilion beside the pool with glass doors onto the lawn. Cable machine, adjustable bench and dumbbells, treadmill.",
  },
  {
    href: "/#gallery",
    img: "/img/gallery/Living%20%26%20Dining%20(6).jpg",
    alt: "Fireplace lounge at Villa Lithos with a stone wall and wooden beamed ceiling",
    title: "Fireplace lounge",
    text: "Stone fireplace under a wooden ceiling, two living rooms on separate levels and an attic floor with a large screen. Starlink throughout.",
  },
];

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
            Weekday offsites, wellness weeks and long stays, in an estate built for the cold months: an outdoor sauna,
            a private gym, a fireplace lounge and a floodlit padel court for the early evenings. Last winter the sky
            stayed sunny on {S.portoRafti.sunnyDays} of {S.days} days.
          </p>
        </header>

        <div className="vl-reveal">
          <span className="vl-label vl-winter__sub">Built for the cold months</span>
          <div className="vl-winter__amen">
            {WINTER_AMENITIES.map((a) => (
              <Link key={a.title} href={a.href} className="vl-amen">
                <div className="vl-amen__img">
                  <Image src={a.img} alt={a.alt} fill sizes="(max-width: 759px) 40vw, 33vw" />
                </div>
                <div className="vl-amen__body">
                  <h3 className="vl-amen__title">{a.title}</h3>
                  <p className="vl-amen__text">{a.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="vl-reveal" data-delay="1">
          <span className="vl-label vl-winter__sub">The weather, measured</span>
          <div className="vl-winter__grid">
            <NowInPortoRafti />

            <div className="vl-winter__tile">
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

            <div className="vl-winter__tile">
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
        </div>

        <div className="vl-winter__cta vl-reveal" data-delay="2">
          <Link href="/corporate-retreats" className="vl-btn">
            Plan a team offsite
          </Link>
          <Link href="/wellness-retreat-villa-greece" className="vl-btn vl-btn--ghost">
            Winter wellness retreats
          </Link>
        </div>
      </div>
    </section>
  );
}
