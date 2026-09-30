"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  paragraphs?: string[];
};

const DEFAULT_PARAGRAPHS = [
  "Villa Lithos Porto Rafti is a 9-bedroom, 800 m² luxury villa set on a 5,000 m² private estate in Porto Rafti, Attica, Greece, 16 km from Athens International Airport. The villa sleeps up to 22 guests across nine bedrooms and 8.5 bathrooms, with two living rooms and generous outdoor space designed for families, multi-generational groups and corporate retreats.",
  "Inside the gates, guests have exclusive use of a heated infinity pool with panoramic sea views, an outdoor sauna, a jacuzzi, a private padel court, a fully equipped gym, two living rooms and a private elevator that connects all four floors. Goldenberg Luxe manages the property and the concierge team is on call throughout the stay.",
  "The contemporary interiors blend modern design with warm Mediterranean touches. Two spacious living rooms, on the ground floor and lower level, provide versatile spaces for relaxation, conversation or quiet moments. The designer kitchen is fully equipped with premium appliances and a walk-in pantry; a private chef can be arranged on request through the concierge team.",
];

export default function Story({ paragraphs = DEFAULT_PARAGRAPHS }: Props) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = paragraphs;

  return (
    <section id="about" className="vl-section" aria-labelledby="story-title">
      <div className="vl-container">
        <div className="vl-story__grid">
          <div className="vl-story__img vl-reveal">
            <Image
              src="/img/gallery/Exterior%20%26%20Pool%20(9).jpg"
              alt="Villa Lithos pool terrace at blue hour"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="vl-reveal" data-delay="1">
            <span className="vl-label" style={{ display: "block", marginBottom: 18 }}>The Villa</span>
            <h2 id="story-title" className="vl-h2" style={{ marginBottom: 24 }}>
              Nine bedrooms on the Attica coast
            </h2>
            <p className="vl-lead">{first}</p>
            <div className={`vl-story__more ${open ? "is-open" : ""}`} aria-hidden={!open}>
              <div>
                {rest.map((p, i) => (
                  <p key={i} className="vl-body">{p}</p>
                ))}
              </div>
            </div>
            <button type="button" className="vl-story__toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? "Show less" : "Read the full description"}
            </button>
            <div className="vl-story__actions">
              <Link href="/#inquiry" className="vl-btn">Check availability</Link>
              <Link href="/luxury-villa-porto-rafti" className="vl-btn vl-btn--ghost">The full guide</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
