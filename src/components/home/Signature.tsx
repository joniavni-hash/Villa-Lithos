import Image from "next/image";
import Link from "next/link";

const ITEMS = [
  {
    href: "/#gallery",
    img: "/img/gallery/Sports%20%26%20Activities%20(6).jpg",
    alt: "Floodlit private padel court at Villa Lithos at night",
    title: "A private padel court",
    text: "Floodlit and on the estate. Coaching can be arranged through the concierge.",
  },
  {
    href: "/#gallery",
    img: "/img/gallery/Wellness%20%26%20Spa%20(2).jpg",
    alt: "Outdoor barrel sauna set in the garden with hillside views",
    title: "Wellness with a view",
    text: "Outdoor sauna, jacuzzi, a fully equipped gym and a red-light therapy panel.",
  },
  {
    href: "/planner",
    img: "/img/gallery/10.jpg",
    alt: "Stairwell seen from above across the four levels of Villa Lithos",
    title: "An elevator to every floor",
    text: "Four levels, nine real bedrooms, step-free ground floor. Nobody is left behind.",
  },
];

export default function Signature() {
  return (
    <section className="vl-section" aria-labelledby="sig-title">
      <div className="vl-container">
        <header className="vl-head vl-reveal">
          <span className="vl-label">What sets it apart</span>
          <h2 id="sig-title" className="vl-h2">
            Three things no other villa near Athens offers
          </h2>
        </header>
        <div className="vl-sig__grid">
          {ITEMS.map((it, i) => (
            <Link key={it.title} href={it.href} className="vl-card vl-reveal" data-delay={String(i + 1)}>
              <Image src={it.img} alt={it.alt} fill sizes="(max-width: 900px) 100vw, 33vw" />
              <div className="vl-card__body">
                <h3 className="vl-card__title">{it.title}</h3>
                <p className="vl-card__text">{it.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
