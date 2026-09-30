"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Floor = {
  num: string;
  name: string;
  sub: string;
  sleeps: string;
  img: string;
  rooms: string[];
};

const FLOORS: Floor[] = [
  {
    num: "03",
    name: "Attic lofts",
    sub: "Two open spaces with blackout curtains",
    sleeps: "Flex · 4",
    img: "/img/gallery/Bedrooms.jpg",
    rooms: ["Loft I, floor mattresses", "Loft II, floor mattresses", "Workshop or play space by day", "Blackout curtains, no doors"],
  },
  {
    num: "02",
    name: "Living floor",
    sub: "Main living room, kitchen, dining and four bedrooms",
    sleeps: "Sleeps 8",
    img: "/img/gallery/Living%20%26%20Dining%20(6).jpg",
    rooms: ["Master Suite I, king, en-suite", "Master Suite II, queen, en-suite", "Master Suite III, queen, en-suite", "Bedroom IV, queen, private bathroom", "Living room with fireplace", "Designer kitchen and dining for the full party"],
  },
  {
    num: "01",
    name: "Ground floor",
    sub: "Step-free, opens to the pool",
    sleeps: "Sleeps 2",
    img: "/img/gallery/Exterior%20%26%20Pool%20(15).jpg",
    rooms: ["Grand Master Suite, en-suite, step-free", "Direct access to pool and terraces", "Elevator and stairs to every level"],
  },
  {
    num: "00",
    name: "Lower level",
    sub: "Second living room, gym and three bedrooms",
    sleeps: "Sleeps 6",
    img: "/img/gallery/Living%20%26%20Dining%20(5).jpg",
    rooms: ["Lower Suite, queen, en-suite", "Bedroom A, queen", "Bedroom B, queen", "Shared bathroom with bathtub", "Second living room and TV lounge", "Gym"],
  },
  {
    num: "+",
    name: "Garden apartment",
    sub: "Separate building with its own kitchen and bathroom",
    sleeps: "2 + 2",
    img: "/img/gallery/Exterior%20%26%20Pool%20(13).jpg",
    rooms: ["Bedroom, queen", "Lounge with two extra beds on request", "Own kitchen and shower room", "Privacy for grandparents or staff"],
  },
];

export default function Floors() {
  const [active, setActive] = useState(1);
  const f = FLOORS[active];

  return (
    <section id="floors" className="vl-floors vl-section" aria-labelledby="floors-title">
      <div className="vl-container">
        <header className="vl-head vl-reveal">
          <span className="vl-label">Room by room</span>
          <h2 id="floors-title" className="vl-h2">Four levels and a garden apartment</h2>
          <p className="vl-lead">
            Nine proper bedrooms, 8.5 bathrooms and two living rooms, spread so that twenty-two people
            never feel like twenty-two. Tap a level to see what is on it.
          </p>
        </header>

        <div className="vl-floors__grid">
          <div className="vl-floors__list vl-reveal" role="tablist" aria-label="Levels">
            {FLOORS.map((fl, i) => (
              <button
                key={fl.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`vl-floor ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="vl-floor__num">{fl.num}</span>
                <span>
                  <span className="vl-floor__name">{fl.name}</span>
                  <span className="vl-floor__sub">{fl.sub}</span>
                </span>
                <span className="vl-floor__sleeps">{fl.sleeps}</span>
              </button>
            ))}
          </div>

          <div className="vl-floors__detail vl-reveal" data-delay="1" role="tabpanel">
            <Image key={f.img} src={f.img} alt="" fill sizes="(max-width: 1024px) 100vw, 55vw" />
            <div className="vl-floors__detail-in">
              <span className="vl-label">Level {f.num}</span>
              <h3>{f.name}</h3>
              <ul className="vl-rooms">
                {f.rooms.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="vl-floors__actions">
                <Link href="/planner" className="vl-btn vl-btn--light">Plan who sleeps where</Link>
                <Link href="/#inquiry" className="vl-btn vl-btn--outline-light">Ask about the rooms</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
