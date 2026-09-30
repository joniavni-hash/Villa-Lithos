import Image from "next/image";
import Link from "next/link";

const WHATSAPP_URL = `https://wa.me/306932757142?text=${encodeURIComponent(
  "Hi, I'd like to check availability at Villa Lithos."
)}`;

export default function FinalCta() {
  return (
    <section className="vl-final" aria-labelledby="final-title">
      <Image
        src="/img/gallery/Exterior%20%26%20Pool%20(12).jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="vl-final__in vl-reveal">
        <span className="vl-label">Your dates could be next</span>
        <h2 id="final-title" className="vl-final__title">Twenty minutes from the airport. A world away.</h2>
        <p className="vl-final__text">
          Tell us your dates and group size. The same team that meets you at the gate replies, usually within minutes.
        </p>
        <div className="vl-final__cta">
          <Link href="/#inquiry" className="vl-btn vl-btn--light">Check availability</Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="vl-btn vl-btn--outline-light">
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
