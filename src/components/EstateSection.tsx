import Image from "next/image";
import Link from "next/link";

// "The Estate": who is behind Villa Lithos and why it is the way it is.
// Server component, no client JS. Anchor: /#estate (also /about, /estate, /our-story).

const FACTS = [
  { label: "Ownership", value: "Privately owned" },
  { label: "Management", value: "Goldenberg Luxe" },
  { label: "Languages", value: "English, Greek, Hebrew" },
];

export default function EstateSection() {
  return (
    <section id="estate" className="estate" aria-labelledby="estate-title">
      <div className="estate__container">
        <header className="estate__header">
          <span className="estate__kicker">The Estate</span>
          <h2 id="estate-title" className="estate__title">
            A private estate, opened to guests
          </h2>
        </header>

        <div className="estate__grid">
          <div className="estate__image-wrap">
            <Image
              src="/img/gallery/Exterior%20%26%20Pool%20(5).jpg"
              alt="Aerial view of the Villa Lithos estate in Porto Rafti"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              className="estate__image"
            />
          </div>

          <div className="estate__text">
            <p className="estate__lead">
              Villa Lithos Porto Rafti is privately owned, not part of a hotel group or a developer&apos;s
              portfolio. The owners use the house themselves and open it to guests for the rest of
              the year, which is why it is planned the way it is: nine real bedrooms rather than sofa
              beds, an elevator to every floor for grandparents and pushchairs, two living rooms so
              that twenty people are not always in one room, and a dining table that seats the full
              party.
            </p>
            <p>
              The location does much of the work. Porto Rafti is a working Greek coastal town
              20 minutes from Athens International Airport, with a sheltered bay of calm, shallow
              water, fish tavernas on the harbour, and the Acropolis, Cape Sounion, and the Rafina
              ferries within an easy day trip. A group of twenty lands in the morning and is at the
              pool the same afternoon.
            </p>
            <p>
              Day-to-day operations, check-in, housekeeping, and the concierge are run by Goldenberg
              Luxe, a Greek luxury property management company, so guests have one team on the
              ground before and during the stay. The owners remain involved in how the house is kept
              and what is added to it each season.
            </p>

            <dl className="estate__facts">
              {FACTS.map((f) => (
                <div key={f.label} className="estate__fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>

            <p className="estate__closing">
              Questions before booking reach the same team that will meet you at the gate.{" "}
              <Link href="/#inquiry" className="estate__link">
                Ask us anything &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
