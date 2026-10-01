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
    <section id="estate" className="vl-estate" aria-labelledby="estate-title">
      <div className="vl-estate__grid">
        <div className="vl-estate__img">
          <Image
            src="/img/gallery/Exterior%20%26%20Pool%20(5).jpg"
            alt="Aerial view of the Villa Lithos estate at night, pool and padel court lit"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="vl-estate__text">
          <h2 id="estate-title" className="vl-h2">
            A private estate, opened to guests
          </h2>
          <p className="vl-lead">
            Villa Lithos Porto Rafti is privately owned, not part of a hotel group or a developer&apos;s
            portfolio. The owners use the house themselves and open it to guests for the rest of the
            year, which is why it is planned the way it is: nine real bedrooms rather than sofa beds,
            an elevator to every floor for grandparents and pushchairs, two living rooms so that
            twenty people are not always in one room, and a dining table that seats the full party.
          </p>
          <p>
            Porto Rafti is a working Greek coastal town 20 minutes from Athens International Airport,
            with a sheltered bay of calm, shallow water, fish tavernas on the harbour, and the
            Acropolis, Cape Sounion and the Rafina ferries within an easy day trip. A group of twenty
            lands in the morning and is at the pool the same afternoon.
          </p>
          <p>
            Check-in, housekeeping and the concierge are run by Goldenberg Luxe, a Greek luxury
            property management company, so guests have one team on the ground before and during
            the stay.
          </p>

          <dl className="vl-facts">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <Link href="/#inquiry" className="vl-btn vl-btn--outline-light">
            Ask us anything
          </Link>
        </div>
      </div>
    </section>
  );
}
