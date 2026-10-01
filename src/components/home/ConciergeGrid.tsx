import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  { label: "Private chefs", img: "/img/gallery/Exterior%20%26%20Pool%20(16).jpg", alt: "Outdoor kitchen and dining terrace" },
  { label: "Transfers & yachts", img: "/img/gallery/Exterior%20%26%20Pool%20(6).jpg", alt: "View over Porto Rafti bay at dusk" },
  { label: "Padel coaching", img: "/img/gallery/Sports%20%26%20Activities.jpg", alt: "Padel court" },
  { label: "Wellness workshops", img: "/img/gallery/Wellness%20%26%20Spa%20(2).jpg", alt: "Outdoor sauna" },
  { label: "Local musicians", img: "/img/gallery/Exterior%20%26%20Pool%20(17).jpg", alt: "Barbecue and pergola" },
  { label: "Housekeeping", img: "/img/gallery/Bedrooms%20(5).jpg", alt: "Bedroom" },
  { label: "Themed events", img: "/img/gallery/Living%20%26%20Dining%20(10).jpg", alt: "Dining table set for a group" },
  { label: "Corporate offsites", img: "/img/gallery/Living%20%26%20Dining%20(4).jpg", alt: "Kitchen and living area" },
];

export default function ConciergeGrid() {
  return (
    <section id="services" className="vl-section" aria-labelledby="conc-title">
      <div className="vl-container">
        <header className="vl-head vl-reveal">
          <span className="vl-label">Concierge</span>
          <h2 id="conc-title" className="vl-h2">One team, before and during the stay</h2>
          <p className="vl-lead">
            Pre-stocking the villa, private chefs, boats, coaches and musicians. Ask, and the team on
            the ground arranges it.
          </p>
        </header>

        <div className="vl-conc__grid">
          {SERVICES.map((s, i) => (
            <div key={s.label} className="vl-tile vl-reveal" data-delay={String(i % 4)}>
              <Image src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 50vw, 25vw" />
              <span className="vl-tile__label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="vl-conc__foot vl-reveal">
          <p>Typical reply within minutes during business hours.</p>
          <Link href="/#inquiry" className="vl-btn vl-btn--ghost">Plan your stay</Link>
        </div>
      </div>
    </section>
  );
}
