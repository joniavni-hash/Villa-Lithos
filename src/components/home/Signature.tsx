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
    href: "/#gallery",
    img: "/img/gallery/Exterior%20%26%20Pool%20(11).jpg",
    alt: "Infinity pool edge with a sunbed and the Attica hills behind",
    title: "The pool above the hills",
    text: "Heated, infinity-edge and private, with a jacuzzi beside it. Most days start and end here.",
  },
];

export default function Signature() {
  return (
    <section id="about" className="vl-section" aria-labelledby="sig-title">
      <div className="vl-container">
        <header className="vl-head vl-reveal">
          <h2 id="sig-title" className="vl-h2">
            What we love the most in the Villa
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
