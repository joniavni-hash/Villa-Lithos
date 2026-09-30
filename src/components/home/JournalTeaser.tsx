import Image from "next/image";
import Link from "next/link";

const POSTS = [
  {
    href: "/articles/best-beaches-porto-rafti",
    label: "Beaches",
    title: "Best beaches in Porto Rafti",
    excerpt: "Eleven beaches with sand vs pebble, wind exposure and family suitability rated.",
    img: "/img/gallery/Exterior%20%26%20Pool%20(6).jpg",
  },
  {
    href: "/articles/day-trips-from-porto-rafti",
    label: "Day trips",
    title: "Day trips from Porto Rafti",
    excerpt: "Acropolis, Sounion, Brauron, Marathon and the ferries to the islands.",
    img: "/img/gallery/Exterior%20%26%20Pool%20(14).jpg",
  },
  {
    href: "/corporate-retreats",
    label: "Retreats & offsites",
    title: "Company offsites 20 minutes from the airport",
    excerpt: "Rooming plans, working spaces and a sample agenda for teams of 10 to 22.",
    img: "/img/gallery/Living%20%26%20Dining%20(9).jpg",
  },
];

export default function JournalTeaser() {
  return (
    <section className="vl-section" aria-labelledby="journal-title">
      <div className="vl-container">
        <header className="vl-head vl-reveal">
          <span className="vl-label">Journal</span>
          <h2 id="journal-title" className="vl-h2">Plan the days around the villa</h2>
        </header>
        <div className="vl-journal__grid">
          {POSTS.map((p, i) => (
            <Link key={p.href} href={p.href} className="vl-post vl-reveal" data-delay={String(i + 1)}>
              <div className="vl-post__img">
                <Image src={p.img} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <span className="vl-label">{p.label}</span>
              <h3 className="vl-post__title">{p.title}</h3>
              <p className="vl-post__ex">{p.excerpt}</p>
            </Link>
          ))}
        </div>
        <div className="vl-journal__foot vl-reveal">
          <Link href="/articles" className="vl-btn vl-btn--ghost">All guides and articles</Link>
        </div>
      </div>
    </section>
  );
}
