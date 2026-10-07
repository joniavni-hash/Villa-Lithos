import { Metadata } from "next";
import Link from "next/link";

const TITLE = "Fitness & Wellness Retreat Venue in Greece | Villa Lithos";
const H1 = "Fitness and Wellness Retreats in Greece: A Practical Guide to Mainland Venues";
const DESC = "Luxury wellness retreat villa in Greece, 20 min from Athens airport: 9 bedrooms for 22 guests, heated infinity pool, private gym, padel court, outdoor sauna.";
const URL = "https://www.villalithosgreece.com/articles/wellness-retreats-greece-mainland";
const PUBLISHED = "2026-05-11";
const MODIFIED = "2026-09-29";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "fitness retreat greece",
    "fitness retreat venue greece",
    "fitness retreat near athens",
    "private training villa greece",
    "retreat venue hire greece",
    "wellness retreat greece",
    "wellness villa athens",
    "yoga retreat greece mainland",
    "spa villa porto rafti",
    "private wellness retreat athens riviera",
    "villa with sauna gym greece",
    "padel villa greece",
    "private retreat venue greece",
    "wellness tourism greece",
  ],
  openGraph: { type: "article", title: TITLE, description: DESC, url: URL, images: [{ url: "https://www.villalithosgreece.com/img/gallery/Exterior%20%26%20Pool%20(15).jpg", width: 2048, height: 1365 }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
};

// Measured specifications. Every field is null until the on-site team confirms it;
// a null value hides that detail, so no placeholder number can reach the page.
const SPEC: {
  poolLengthM: number | null;
  poolWidthM: number | null;
  deckAreaM2: number | null;
  deckMats: number | null;
  gymAreaM2: number | null;
  dumbbellRangeKg: string | null;
  padelDimensions: string | null;
  saunaSeats: number | null;
  portableKit: string | null;
  anchors: string | null;
} = {
  poolLengthM: null,
  poolWidthM: null,
  deckAreaM2: null,
  deckMats: null,
  gymAreaM2: null,
  dumbbellRangeKg: null,
  padelDimensions: null,
  saunaSeats: null,
  portableKit: null,
  anchors: null,
};

const facilities = [
  {
    facility: "Private gym",
    spec: [
      "Garden pavilion beside the pool with folding glass doors onto the lawn, wooden floor and rubber matting",
      SPEC.gymAreaM2 ? `${SPEC.gymAreaM2} m²` : null,
      "Multi-station cable machine, adjustable bench, adjustable dumbbells" + (SPEC.dumbbellRangeKg ? ` (${SPEC.dumbbellRangeKg})` : "") + ", treadmill",
    ].filter(Boolean).join(". "),
    use: "Strength sessions for 4 to 6 at a time; doors open for indoor-outdoor circuits",
  },
  {
    facility: "Heated infinity pool",
    spec: [
      "Sea views, jacuzzi alongside, heated for the shoulder season",
      SPEC.poolLengthM && SPEC.poolWidthM ? `${SPEC.poolLengthM} × ${SPEC.poolWidthM} m` : null,
    ].filter(Boolean).join(". "),
    use: "Swim sessions, recovery, cold-to-warm contrast with the sauna",
  },
  {
    facility: "Outdoor training deck",
    spec: [
      "Pergola-shaded stone terrace beside the pool, plus the upper terrace for sunrise sessions",
      SPEC.deckAreaM2 ? `${SPEC.deckAreaM2} m² under shade` : null,
      SPEC.deckMats ? `room for ${SPEC.deckMats} mats` : null,
    ].filter(Boolean).join(". "),
    use: "Yoga, mobility, HIIT and group mat work in the shade",
  },
  {
    facility: "Padel court",
    spec: [
      "Full-size, glass-walled, artificial turf, floodlit for evening play",
      SPEC.padelDimensions,
      "Rackets and balls provided; a coach can be booked through the concierge",
    ].filter(Boolean).join(". "),
    use: "Tournaments, active recovery, team sessions",
  },
  {
    facility: "Outdoor sauna",
    spec: ["Barrel sauna in the garden among the olive trees", SPEC.saunaSeats ? `${SPEC.saunaSeats} seats` : null].filter(Boolean).join(". "),
    use: "Post-training recovery, contrast sessions with the pool",
  },
  {
    facility: "Indoor session space",
    spec: "Two living rooms on separate levels and the attic workshop floor with a large screen; Starlink internet throughout",
    use: "Briefings, workshops, breathwork and meditation when the weather turns",
  },
  ...(SPEC.portableKit ? [{ facility: "Portable kit", spec: SPEC.portableKit, use: "Circuit and mobility sessions anywhere on the estate" }] : []),
  ...(SPEC.anchors ? [{ facility: "Suspension anchor points", spec: SPEC.anchors, use: "TRX and band work" }] : []),
];

const facilityPhotos = [
  { file: "Sports & Activities (4).jpg", alt: "Private gym pavilion at Villa Lithos Porto Rafti with cable machine, bench and folding doors open to the lawn and pool" },
  { file: "Exterior & Pool (15).jpg", alt: "Pergola-shaded training deck beside the heated infinity pool at Villa Lithos Porto Rafti at dusk" },
  { file: "Exterior & Pool.jpg", alt: "Heated infinity pool and terraces of Villa Lithos Porto Rafti with sea views" },
  { file: "Sports & Activities (6).jpg", alt: "Floodlit glass-walled padel court at Villa Lithos Porto Rafti in the evening" },
];
const img = (file: string) => `/img/gallery/${encodeURIComponent(file)}`;

const faqs = [
  { q: "Can Villa Lithos host a fitness retreat in Greece?", a: "Yes. The estate has a private gym pavilion, a heated infinity pool, a full-size floodlit padel court, an outdoor sauna and shaded terraces for mat work, all for the exclusive use of one group of up to 22. Trainers, yoga teachers and therapists are arranged and quoted by the concierge team." },
  { q: "How far is the venue from Athens airport?", a: "16 km, about 20 minutes by car. Groups can land in the morning and train the same afternoon, with no ferry or domestic flight." },
  { q: "How many people can a retreat host?", a: "Up to 22 guests across nine bedrooms. Eight to nine people if everyone needs a private room; most retreats run between 10 and 16." },
  { q: "Is catering for athletic or dietary programmes available?", a: "Yes. Private chefs are arranged by the concierge, from single meals to full board, with plant-forward, high-protein, kosher and other dietary briefs on request. Catering is quoted separately by group size and menu." },
  { q: "Are the facilities shared with other guests?", a: "No. The whole estate, including the pool, gym, padel court and sauna, is rented to one group at a time." },
  { q: "When is the venue available for retreats?", a: "Weekday blocks from October to May are the natural fit and the coast stays mild for most of that period. Summer dates compete with holiday bookings. Rates are quoted on request." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: H1,
  description: DESC,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { "@type": "Organization", name: "Villa Lithos Porto Rafti", url: "https://www.villalithosgreece.com" },
  publisher: { "@type": "Organization", name: "Villa Lithos Porto Rafti", logo: { "@type": "ImageObject", url: "https://www.villalithosgreece.com/img/logo.webp" } },
  image: ["https://www.villalithosgreece.com/img/hero.webp", ...facilityPhotos.map((p) => `https://www.villalithosgreece.com${img(p.file)}`)],
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  url: URL,
  about: [
    { "@type": "Thing", name: "Fitness retreats in Greece" },
    { "@type": "Thing", name: "Wellness retreats in Greece" },
    { "@id": "https://www.villalithosgreece.com/#villa" },
  ],
};

const s = {
  article: { maxWidth: 820, margin: "0 auto", padding: "60px 24px 80px", fontFamily: "var(--font-sans), sans-serif", color: "#333", lineHeight: 1.8 } as React.CSSProperties,
  h1: { fontFamily: "var(--font-serif), serif", fontSize: "2.4rem", color: "#2c2c2c", marginBottom: 16, lineHeight: 1.2 } as React.CSSProperties,
  meta: { color: "#888", fontSize: "0.92rem", marginBottom: 36, display: "block" } as React.CSSProperties,
  intro: { fontSize: "1.15rem", lineHeight: 1.7, marginBottom: 28, padding: "20px 24px", background: "#f8f6f1", borderLeft: "3px solid #7a8c6e", borderRadius: 4 } as React.CSSProperties,
  h2: { fontFamily: "var(--font-serif), serif", fontSize: "1.6rem", color: "#2c2c2c", marginTop: 48, marginBottom: 12 } as React.CSSProperties,
  h3: { fontFamily: "var(--font-serif), serif", fontSize: "1.25rem", color: "#2c2c2c", marginTop: 28, marginBottom: 10 } as React.CSSProperties,
  p: { marginBottom: 18, fontSize: "1.05rem" } as React.CSSProperties,
  ul: { marginBottom: 18, paddingLeft: 22 } as React.CSSProperties,
  li: { marginBottom: 8, fontSize: "1.05rem" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 22, fontSize: "0.95rem" } as React.CSSProperties,
  th: { textAlign: "left" as const, padding: "10px 12px", background: "#f0ede4", borderBottom: "2px solid #d8d3c4" } as React.CSSProperties,
  td: { padding: "10px 12px", borderBottom: "1px solid #e8e3d3" } as React.CSSProperties,
  source: { fontSize: "0.86rem", color: "#666", fontStyle: "italic" } as React.CSSProperties,
  cta: { display: "inline-block", background: "#7a8c6e", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontWeight: 600, fontSize: "1.05rem", marginTop: 12 } as React.CSSProperties,
  ctaBox: { marginTop: 48, padding: "40px 32px", background: "#f8f6f1", borderRadius: 12, textAlign: "center" as const } as React.CSSProperties,
  ctaHeading: { fontFamily: "var(--font-serif), serif", fontSize: "1.5rem", color: "#2c2c2c", marginBottom: 12, marginTop: 0 } as React.CSSProperties,
  ctaText: { fontSize: "1.05rem", color: "#555", marginBottom: 24 } as React.CSSProperties,
  back: { display: "inline-block", marginTop: 32, color: "#7a8c6e", textDecoration: "none", fontSize: "0.97rem" } as React.CSSProperties,
  updated: { fontSize: "0.86rem", color: "#888", marginTop: 36, paddingTop: 14, borderTop: "1px solid #e8e3d3" } as React.CSSProperties,
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, marginBottom: 22 } as React.CSSProperties,
  photo: { width: "100%", height: "auto", aspectRatio: "3 / 2", objectFit: "cover" as const, borderRadius: 8, display: "block" } as React.CSSProperties,
  note: { fontSize: "0.95rem", color: "#555", marginBottom: 18 } as React.CSSProperties,
  faqItem: { borderBottom: "1px solid #e8e3d3", padding: "14px 0" } as React.CSSProperties,
  faqQ: { fontWeight: 600, fontSize: "1.05rem", cursor: "pointer", listStyle: "none" } as React.CSSProperties,
  faqA: { marginTop: 8, fontSize: "1.02rem", color: "#444" } as React.CSSProperties,
};

export default function Page() {
  return (
    <article style={s.article}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <h1 style={s.h1}>{H1}</h1>
      <span style={s.meta}>Last updated: September 2026 · 13 minute read · Villa Lithos Porto Rafti</span>

      <p style={s.intro}>
        The Greek wellness travel category has grown rapidly since 2022, and fitness retreats have grown with it. Mainland Greece, particularly the Athens Riviera and East Attica, has emerged as an alternative to the established island spa resorts for both. This guide compares the two practical formats, dedicated wellness resorts and private villas with full training and wellness amenities, identifies when each is the right choice for a group, a family, or a corporate retreat, and sets out the <a href="#fitness-facilities" style={{ color: "#7a8c6e" }}>exact fitness facilities</a> a facilitator can plan around at Villa Lithos Porto Rafti.
      </p>

      <h2 style={s.h2}>The Wellness Tourism Market in Greece</h2>
      <p style={s.p}>
        Wellness tourism is one of the fastest-growing segments of global travel. The <a href="https://globalwellnessinstitute.org/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Global Wellness Institute</a> reports that the global wellness tourism market reached USD 814 billion in 2022 and is projected to exceed USD 1.3 trillion by 2027. Greece sits in the upper quartile of European destinations by wellness traveller volume, helped by the climate, the Mediterranean diet, and a strong base of thermal springs and coastal spa resorts.
      </p>
      <p style={s.p}>
        Industry research from <a href="https://skift.com/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Skift</a> and <a href="https://www.phocuswright.com/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Phocuswright</a> identifies a clear behavioural shift, the average wellness traveller is moving from formal "wellness resort" stays toward private, customised programmes in villas that offer the same amenities (sauna, gym, yoga space, healthy catering) without the structured schedule of a resort. This is the structural opening for villa-based wellness retreats in Greece.
      </p>

      <h2 style={s.h2}>Two Formats, Two Use Cases</h2>
      <h3 style={s.h3}>Dedicated wellness resorts</h3>
      <p style={s.p}>
        Greece has a small but high-quality set of dedicated wellness resorts. The category includes Euphoria Retreat in Mystras (Peloponnese), Aegialis Hotel and Spa on Amorgos, Atrium Hotel and Spa on Kos, and a number of Cycladic island spa hotels. The resort format works well for solo travellers and small groups (typically two to six guests) who want a structured programme with on-site instructors, set meals, and a daily schedule.
      </p>
      <p style={s.p}>
        Trade-offs. The resorts are constrained in group size (usually under 10 in shared programmes), in dietary flexibility, and in privacy. The average price per guest per night, including programme, runs from EUR 250 to EUR 600 depending on tier.
      </p>
      <h3 style={s.h3}>Private villas with full wellness amenities</h3>
      <p style={s.p}>
        The newer format is a private villa rental with on-site amenities matching what a wellness resort offers, combined with a bespoke programme arranged by the villa management. The advantages are group capacity, dietary flexibility, schedule control, and privacy. The disadvantages are that the responsibility for organising practitioners (yoga instructor, masseuse, nutritionist) shifts from the resort to the villa concierge.
      </p>
      <p style={s.p}>
        For groups of 10 to 22 guests, the villa format is usually the only realistic option. Resort programmes rarely scale beyond 10 shared participants.
      </p>

      <h2 style={s.h2}>What a Wellness-Ready Villa Should Have</h2>
      <p style={s.p}>
        Not every luxury villa is suitable for a wellness retreat. The following amenity checklist separates a true wellness venue from a generic high-end rental:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Dedicated yoga or movement space.</strong> Either a covered outdoor terrace large enough for 12 mats, or an interior room with sprung flooring.</li>
        <li style={s.li}><strong>Sauna and steam.</strong> Outdoor sauna is preferable for the Greek climate. Steam room is a plus.</li>
        <li style={s.li}><strong>Gym with strength and cardio.</strong> Free weights, kettlebells, cable machine, treadmill, rower. Minimum standard for serious users.</li>
        <li style={s.li}><strong>Pool with adequate length.</strong> A pool of at least 12 metres allows lap swimming. Heated for shoulder season.</li>
        <li style={s.li}><strong>Padel court or tennis court.</strong> An optional but increasingly expected amenity for active retreats.</li>
        <li style={s.li}><strong>Designer kitchen with walk-in pantry.</strong> Required for in-villa healthy catering and private chef setups.</li>
        <li style={s.li}><strong>Quiet exterior soundscape.</strong> Critical for meditation, yoga, and rest. Beach roads, party scenes, or proximity to nightlife districts disqualify a villa.</li>
        <li style={s.li}><strong>Outdoor relaxation zones.</strong> Multiple shaded areas, hammocks, daybeds, allowing dispersed rest patterns.</li>
        <li style={s.li}><strong>Air conditioning throughout.</strong> Essential for summer guest comfort.</li>
        <li style={s.li}><strong>Reliable concierge.</strong> Capable of arranging certified instructors, masseurs, nutritionists, and acupuncturists at short notice.</li>
      </ul>

      <h2 style={s.h2}>The Mainland Greek Options in 2026</h2>
      <p style={s.p}>
        A short survey of the leading wellness-ready private villa options on the Greek mainland:
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Region</th>
            <th style={s.th}>Capacity</th>
            <th style={s.th}>Wellness amenities</th>
            <th style={s.th}>Airport access</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={s.td}>Porto Rafti, East Attica</td>
            <td style={s.td}>up to 22</td>
            <td style={s.td}>Heated infinity pool, sauna, gym, padel, two living rooms (Villa Lithos)</td>
            <td style={s.td}>~20 min</td>
          </tr>
          <tr>
            <td style={s.td}>Athens Riviera south</td>
            <td style={s.td}>typically 8 to 14</td>
            <td style={s.td}>Pool, gym, optional spa setup</td>
            <td style={s.td}>~30 to 45 min</td>
          </tr>
          <tr>
            <td style={s.td}>Porto Heli (Peloponnese)</td>
            <td style={s.td}>up to 16</td>
            <td style={s.td}>Beach access, pool, occasional sauna</td>
            <td style={s.td}>~2 hours</td>
          </tr>
          <tr>
            <td style={s.td}>Costa Navarino (Messenia)</td>
            <td style={s.td}>up to 16</td>
            <td style={s.td}>Full resort spa adjacent, golf, pool</td>
            <td style={s.td}>~3.5 hours</td>
          </tr>
          <tr>
            <td style={s.td}>Mani peninsula</td>
            <td style={s.td}>up to 12</td>
            <td style={s.td}>Pool, sometimes hammam</td>
            <td style={s.td}>~4 hours</td>
          </tr>
        </tbody>
      </table>
      <p style={s.source}>
        Capacity ranges reflect typical largest villa in each region as of public listings on The Thinking Traveller, Oliver&apos;s Travels, Welcome Beyond, and direct rental sites. Airport access is from Athens International Airport.
      </p>

      <h2 style={s.h2}>The Programme Side, Practitioners and Logistics</h2>
      <p style={s.p}>
        A villa-based wellness retreat is only as good as the practitioners assembled around it. For a typical week's retreat with 10 to 22 guests, the standard staffing model looks like this:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>Lead facilitator</strong>, usually a yoga or movement teacher, sets the daily rhythm</li>
        <li style={s.li}><strong>One or two assistant practitioners</strong>, breathwork, meditation, or guided walks</li>
        <li style={s.li}><strong>Massage therapist</strong>, on call for 30 to 60 minute sessions throughout the week</li>
        <li style={s.li}><strong>Private chef</strong>, with nutrition orientation, capable of plant-forward and dietary-restricted catering</li>
        <li style={s.li}><strong>Sound therapist</strong>, optional, for evening sessions</li>
        <li style={s.li}><strong>Acupuncturist or Reiki practitioner</strong>, optional, on guest demand</li>
      </ul>
      <p style={s.p}>
        Athens has a deep pool of certified practitioners trained in international standards (RYT for yoga, ITEC for massage, etc.) and most are reachable within a 30 to 40 minute drive of Porto Rafti. For specialised modalities, practitioners can be flown in from Athens for the duration of the retreat. The villa concierge handles the contracting and scheduling.
      </p>

      <h2 style={s.h2}>Sample Daily Schedule for a Wellness Week</h2>
      <p style={s.p}>
        A typical schedule for a 7-day retreat at a villa like Villa Lithos:
      </p>
      <ul style={s.ul}>
        <li style={s.li}><strong>07:00</strong>, Sunrise yoga on the upper terrace (60 min)</li>
        <li style={s.li}><strong>08:30</strong>, Breakfast, Mediterranean breakfast with seasonal fruit, Greek yogurt, fresh bread</li>
        <li style={s.li}><strong>10:00</strong>, Movement session, padel, swim laps, or pilates (60 to 90 min)</li>
        <li style={s.li}><strong>11:30</strong>, Massage or treatment slots</li>
        <li style={s.li}><strong>13:30</strong>, Lunch, plant-forward, prepared by villa chef</li>
        <li style={s.li}><strong>15:00</strong>, Rest, beach option, or quiet reading</li>
        <li style={s.li}><strong>17:00</strong>, Workshop or guided session (breathwork, meditation, journaling)</li>
        <li style={s.li}><strong>18:30</strong>, Sauna and pool sequence</li>
        <li style={s.li}><strong>20:00</strong>, Dinner, three-course Greek dietary-adapted</li>
        <li style={s.li}><strong>21:30</strong>, Sound bath or restorative yoga (3 nights a week)</li>
      </ul>
      <p style={s.p}>
        This is a representative schedule. Programmes are tailored to the group's goals (detox, fitness, mindfulness, recovery from work intensity, post-natal, etc.) by the lead facilitator in coordination with the villa concierge.
      </p>

      <h2 style={s.h2}>Why Porto Rafti Works Particularly Well for Wellness</h2>
      <p style={s.p}>
        Three factors make Porto Rafti and the surrounding East Attica coast particularly suitable for a wellness retreat venue:
      </p>
      <ol style={s.ul}>
        <li style={s.li}><strong>Quiet by default.</strong> Porto Rafti is not a nightlife destination. The evening soundscape is village restaurant chatter, not nightclub bass. This matters for sleep quality, meditation, and the overall sense of the place.</li>
        <li style={s.li}><strong>Airport proximity reduces arrival stress.</strong> Wellness retreats often start with a depleted group of travellers. A 20-minute transfer is materially better than a 90-minute transfer for cortisol recovery.</li>
        <li style={s.li}><strong>Access to Athens for arrivals and departures.</strong> Groups can fly in from anywhere globally without complex internal transfers, and can extend their trip with one or two nights in Athens if desired.</li>
      </ol>

      <h2 style={s.h2}>Villa Lithos, Specifically</h2>
      <p style={s.p}>
        Villa Lithos Porto Rafti is one of the only mainland Greek villas that ships with the full wellness amenity stack as standard. The infinity pool is heated. The outdoor sauna is built-in. The gym is a separate pavilion beside the pool with cardio and resistance equipment. The padel court is a full-size singles or doubles court. The kitchen pantry supports a chef catering for 22 guests. Two living rooms allow simultaneous workshop sessions and rest, important for groups where not everyone wants to be in the same activity at the same time.
      </p>
      <p style={s.p}>
        The villa concierge team has standing relationships with Athens-based yoga instructors, massage therapists, and a small panel of private chefs trained in healthy and dietary-restricted catering. Retreat planning typically begins six to eight weeks before arrival, with the lead facilitator finalised first and the supporting practitioners booked based on the group's interests.
      </p>

      <h2 id="fitness-facilities" style={s.h2}>Fitness Facilities and Equipment Inventory at Villa Lithos</h2>
      <p style={s.p}>
        Facilitators planning a <strong>fitness retreat in Greece</strong> need specifications, not adjectives. The table below lists what is physically on the estate and what each space is used for during a training week. Every facility is for the exclusive use of the one group renting the villa. Programme staff (trainers, yoga teachers, physiotherapists) are arranged and quoted by the concierge team.
      </p>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>Facility</th>
            <th style={s.th}>Specification</th>
            <th style={s.th}>Retreat use</th>
          </tr>
        </thead>
        <tbody>
          {facilities.map((f) => (
            <tr key={f.facility}>
              <td style={s.td}><strong>{f.facility}</strong></td>
              <td style={s.td}>{f.spec}</td>
              <td style={s.td}>{f.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={s.note}>
        Measured dimensions (pool length, shaded deck area, gym floor area) and the portable kit inventory are supplied on request for facilitators building a programme.
      </p>
      <div style={s.grid}>
        {facilityPhotos.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.file} src={img(p.file)} alt={p.alt} loading="lazy" style={s.photo} />
        ))}
      </div>
      <p style={s.p}>
        <Link href="/#inquiry" style={s.cta}>Inquire for Retreat Facilitators &amp; Equipment Specs</Link>
      </p>

      <h2 style={s.h2}>Questions Retreat Organisers Ask</h2>
      {faqs.map(({ q, a }) => (
        <details key={q} style={s.faqItem}>
          <summary style={s.faqQ}>{q}</summary>
          <p style={s.faqA}>{a}</p>
        </details>
      ))}

      <h2 style={s.h2}>Sources and Further Reading</h2>
      <ul style={s.ul}>
        <li style={s.li}><a href="https://globalwellnessinstitute.org/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Global Wellness Institute</a>, wellness tourism market data</li>
        <li style={s.li}><a href="https://skift.com/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Skift</a>, wellness travel trends and behaviour shifts</li>
        <li style={s.li}><a href="https://www.phocuswright.com/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Phocuswright</a>, travel industry research</li>
        <li style={s.li}><a href="https://www.thethinkingtraveller.com/greece" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>The Thinking Traveller: Greece</a>, luxury villa context</li>
        <li style={s.li}><a href="https://www.welcomebeyond.com/rentals/villa-rentals/greece" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Welcome Beyond: Greece</a>, curated villa marketplace</li>
        <li style={s.li}><a href="https://www.visitgreece.gr/" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Visit Greece</a>, Greek National Tourism Organisation</li>
        <li style={s.li}><a href="https://en.wikipedia.org/wiki/Mediterranean_diet" target="_blank" rel="nofollow noopener" style={{ color: "#7a8c6e" }}>Wikipedia: Mediterranean diet</a>, dietary tradition context</li>
      </ul>

      <div style={s.ctaBox}>
        <h2 style={s.ctaHeading}>A Fitness and Wellness Retreat Venue for Up to 22 Guests</h2>
        <p style={s.ctaText}>Heated infinity pool, outdoor sauna, private gym, floodlit padel court, designer kitchen, two living rooms, 20 minutes from Athens airport. Concierge arranges trainers, yoga, breathwork, massage, and chef catering tailored to your group. See also the <Link href="/corporate-retreats" style={{ color: "#7a8c6e" }}>corporate retreat venue</Link> page for team offsites.</p>
        <Link href="/#inquiry" style={s.cta}>Inquire About a Retreat</Link>
      </div>

      <p style={s.updated}>Last updated: 29 September 2026. All external sources opened in a new tab with rel=&quot;nofollow noopener&quot;.</p>

      <Link href="/articles" style={s.back}>&larr; Back to Articles</Link>
    </article>
  );
}
