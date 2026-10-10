import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  Clock,
  BedDouble,
  Users,
  TreePine,
  CalendarDays,
  Sofa,
  MonitorPlay,
  Wifi,
  UtensilsCrossed,
  Trophy,
  Waves,
  Flame,
  Dumbbell,
  Umbrella,
  Landmark,
  Ship,
  ChefHat,
  Check,
  X,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Lock,
  User,
  Building2,
  Music,
  Sparkles,
  Thermometer,
} from "lucide-react";
import { WINTER_STATS } from "@/app/lib/season";

const TITLE = "Corporate Retreat Venue Near Athens | Villa Lithos";
const H1 = "A corporate retreat venue near Athens, 20 minutes from the airport.";
const DESC = "Private corporate retreat venue near Athens for offsites of 10 to 22. A 5,000 m² estate 20 minutes from the airport, Starlink internet, pool, padel, gym, sauna.";
const URL = "https://www.villalithosgreece.com/corporate-retreats";
const PUBLISHED = "2026-09-22";
const MODIFIED = "2026-10-09";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: [
    "corporate retreat venue near athens",
    "company offsite villa greece",
    "executive team retreat athens airport",
    "corporate retreat greece",
    "corporate retreat villa greece",
    "company offsite greece",
    "team retreat near athens",
    "leadership offsite greece",
    "private villa for company retreat",
    "offsite venue athens",
    "team building villa greece",
    "startup offsite greece",
    "executive retreat greece",
    "corporate retreat athens riviera",
    "winter offsite greece",
    "winter corporate retreat near athens",
  ],
  openGraph: { type: "article", title: TITLE, description: DESC, url: URL, images: [{ url: "https://www.villalithosgreece.com/img/hero.webp", width: 1920, height: 1080 }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  alternates: { canonical: URL },
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
  image: ["https://www.villalithosgreece.com/img/hero.webp"],
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  url: URL,
  about: { "@type": "Thing", name: "Corporate retreats and company offsites in Greece" },
};

const faqs = [
  { q: "What team size works best?", a: "Eight to nine if everyone needs a private bedroom, up to 22 with shared rooms. Most retreats fall between 10 and 16." },
  { q: "Can we run working sessions on site?", a: "Yes. Two living rooms, the attic workshop floor with a large screen, a dedicated workspace, WiFi and air conditioning throughout, plus the outdoor areas. Presentation equipment and facilitation are arranged through the concierge team." },
  { q: "Is the internet reliable enough for remote work?", a: "Yes. The estate runs on fast, stable Starlink internet, with WiFi throughout the house." },
  { q: "Is catering included?", a: "Catering is arranged separately. A private chef cooks on the estate, from dinners only to half board or full board, with Greek and Mediterranean menus and kosher or other dietary requirements on advance request. It is quoted with the retreat proposal by team size, board level and menu." },
  { q: "What can the team do after the sessions?", a: "Padel with a coach or a team tournament on the private court, wellness workshops, live bouzouki musicians for a Greek evening, boat days from Rafina and visits to Sounion, Brauron or the Acropolis, all arranged by the concierge team." },
  { q: "What is the weather like for a winter offsite, October to March?", a: `Mild and mostly sunny. Last winter (${WINTER_STATS.period}) Porto Rafti had ${WINTER_STATS.portoRafti.sunnyDays} days with six or more hours of sunshine out of ${WINTER_STATS.days}, against ${WINTER_STATS.london.sunnyDays} in London and ${WINTER_STATS.berlin.sunnyDays} in Berlin, with an average daytime high of ${WINTER_STATS.portoRafti.avgHigh.toFixed(1)}°C (Open-Meteo historical data). Expect some rain and wind on individual days; the padel court is floodlit for early evenings.` },
  { q: "Is the house set up for the cold months?", a: "Yes. A stone fireplace lounge under a wooden ceiling, two living rooms on separate levels and the attic workshop floor keep the team indoors and together when it is cold outside, and the outdoor barrel sauna and the private gym pavilion are used year round. Air conditioning throughout the house." },
  { q: "When is the estate available for retreats?", a: "Weekday blocks from October to May are the natural fit, and the Attica coast stays mild for most of that period. Summer dates compete with holiday bookings. Rates and availability are quoted on request." },
  { q: "How far is the venue from Athens?", a: "The estate is 16 km from Athens International Airport, about 20 minutes by car, and about 40 minutes from central Athens. Transfers are arranged on request in the vehicle you prefer, from executive cars to a coach." },
];

// EventVenue node for the estate as an offsite venue (work amenities and capacity)
const venueJsonLd = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  "@id": "https://www.villalithosgreece.com/corporate-retreats#venue",
  name: "Villa Lithos Porto Rafti, corporate retreat venue near Athens",
  url: URL,
  description: DESC,
  sameAs: "https://www.villalithosgreece.com/#villa",
  maximumAttendeeCapacity: 22,
  publicAccess: false,
  isAccessibleForFree: false,
  address: { "@type": "PostalAddress", streetAddress: "Vravronos 70", addressLocality: "Porto Rafti", addressRegion: "Attica", postalCode: "19003", addressCountry: "GR" },
  geo: { "@type": "GeoCoordinates", latitude: "37.9022", longitude: "24.0224" },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Starlink internet with WiFi throughout the house", value: true },
    { "@type": "LocationFeatureSpecification", name: "Large presentation screen on the attic workshop floor", value: true },
    { "@type": "LocationFeatureSpecification", name: "Blackout curtains for daytime presentations", value: true },
    { "@type": "LocationFeatureSpecification", name: "Two living rooms on separate levels for plenary and breakout sessions", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dedicated work area", value: true },
    { "@type": "LocationFeatureSpecification", name: "Dining table for the whole team", value: true },
    { "@type": "LocationFeatureSpecification", name: "Nine bedrooms, private rooms for 8 to 9 or shared rooms for up to 22", value: true },
    { "@type": "LocationFeatureSpecification", name: "Air conditioning throughout", value: true },
    { "@type": "LocationFeatureSpecification", name: "Heated infinity pool", value: true },
    { "@type": "LocationFeatureSpecification", name: "Padel court", value: true },
    { "@type": "LocationFeatureSpecification", name: "Private gym", value: true },
    { "@type": "LocationFeatureSpecification", name: "Outdoor sauna", value: true },
    { "@type": "LocationFeatureSpecification", name: "Private parking inside the gated estate", value: true },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

// Gallery files are referenced exactly as the gallery API does (encodeURIComponent on the filename).
const img = (file: string) => `/img/gallery/${encodeURIComponent(file)}`;

const SAGE = "#7a8c6e";
const INK = "#1A2332";
const CREAM = "#faf8f3";
const CHART_GREEN = "#5F8F4E";
const CHART_BLUE = "#2A6FA0";
const CHART_GOLD = "#B07A1E";
const CHART_GRAY = "#C9CDD3";

const stats = [
  { icon: Clock, value: "20 min", label: "from Athens airport" },
  { icon: BedDouble, value: "9", label: "bedrooms, 8.5 baths" },
  { icon: Users, value: "10 to 22", label: "people per retreat" },
  { icon: TreePine, value: "5,000 m²", label: "walled private estate" },
  { icon: CalendarDays, value: "Oct to May", label: "weekday blocks" },
];

const spaces = [
  { icon: Sofa, title: "Two living rooms", text: "On separate levels. A plenary in one, a breakout in the other." },
  { icon: MonitorPlay, title: "Attic workshop floor", text: "Wide, wooden, with a large screen and blackout curtains for daytime presentations." },
  { icon: Wifi, title: "Starlink internet", text: "Fast, stable Starlink internet, WiFi and air conditioning throughout the house, and a dedicated work area." },
  { icon: UtensilsCrossed, title: "One table for everyone", text: "A dining table for the whole team and a kitchen built for a private chef." },
];

const rooming = [
  { icon: User, title: "Leadership offsite", size: "8 to 9 people", text: "Everyone in a private bedroom, most of them en suite. The guest apartment for the CEO or a facilitator." },
  { icon: Users, title: "Mixed team", size: "10 to 15 people", text: "Private rooms for senior staff, shared rooms for the rest. Two living rooms to spread out in." },
  { icon: Building2, title: "Whole company", size: "16 to 22 people", text: "Shared rooms across the main house and the apartment. The attic floor becomes the big room." },
];

const specs = [
  { k: "Internet", v: "Starlink, WiFi throughout the house" },
  { k: "Presenting", v: "Large screen on the attic workshop floor, blackout curtains" },
  { k: "Plenary", v: "Two living rooms on separate levels" },
  { k: "Breakouts", v: "Second living room, attic floor, terraces and garden" },
  { k: "Dining", v: "One table for the whole team, private chef on request" },
  { k: "Climate", v: "Air conditioning throughout" },
];

const offHours = [
  { icon: Trophy, label: "Padel coach or a team tournament" },
  { icon: Sparkles, label: "Wellness workshops" },
  { icon: Music, label: "Live bouzouki evening" },
  { icon: Waves, label: "Heated infinity pool and jacuzzi" },
  { icon: Flame, label: "Outdoor sauna" },
  { icon: Dumbbell, label: "Private gym" },
  { icon: Umbrella, label: "Beach at 1.5 km" },
  { icon: Ship, label: "Boat day from Rafina, 20 min" },
  { icon: Landmark, label: "Sounion, Brauron, the Acropolis" },
  { icon: ChefHat, label: "Private chef, dinner to full board" },
];

const winterAmenities = [
  { icon: Flame, title: "Outdoor sauna", text: "Barrel sauna in the garden among the olive trees, with a red-light therapy panel. Post-training recovery, or simply the end of a cold day." },
  { icon: Dumbbell, title: "Private gym", text: "Garden pavilion beside the pool with glass doors onto the lawn. Cable machine, adjustable bench and dumbbells, treadmill." },
  { icon: Sofa, title: "Fireplace lounge", text: "Stone fireplace under a wooden ceiling, two living rooms on separate levels and an attic floor with a large screen. Starlink throughout." },
];

const catering = [
  { title: "Dinners only", text: "Breakfast and lunch on your own schedule from the stocked kitchen, with a private chef cooking dinner for the whole team each evening." },
  { title: "Half board", text: "Breakfast laid out before the first session and a chef-cooked dinner, so the working day runs without a lunch break off site." },
  { title: "Full board", text: "Breakfast, a working lunch on the terrace and dinner, all cooked on the estate. Nobody leaves the gate unless they want to." },
];

const cateringSpecs = [
  { k: "Kitchen", v: "Designer kitchen with walk-in pantry, equipped for catering large groups" },
  { k: "Seating", v: "One dining table for the whole team, plus the alfresco dining terrace" },
  { k: "Outdoor", v: "BBQ area for a grill night on the estate" },
  { k: "Cuisine", v: "Greek and Mediterranean menus, built around the team" },
  { k: "Dietary", v: "Kosher and other dietary requirements on advance request" },
  { k: "Nights out", v: "Porto Rafti fish tavernas booked ahead for the group" },
  { k: "Pricing", v: "Quoted with the retreat proposal, by team size, board level and menu" },
];

const agenda = [
  {
    day: "Day 1",
    items: [
      { icon: Sun, text: "Land at ATH, 20-minute transfer, lunch on the terrace" },
      { icon: Sunset, text: "Opening session, then a padel tournament at sunset" },
      { icon: Moon, text: "Private chef dinner for the whole team" },
    ],
  },
  {
    day: "Day 2",
    items: [
      { icon: Sun, text: "Strategy plenary, breakouts in the second living room and the attic" },
      { icon: Sunset, text: "Pool, gym, sauna, or a boat from Rafina" },
      { icon: Moon, text: "Taverna in Porto Rafti or a BBQ on the estate" },
    ],
  },
  {
    day: "Day 3",
    items: [
      { icon: Sun, text: "Decisions and commitments, closing session" },
      { icon: Sunset, text: "Athens for the afternoon, or the airport in 20 minutes" },
      { icon: Moon, text: "Home" },
    ],
  },
];

const compare = [
  { row: "Airport to first session", lithos: "20 minutes, one transfer", island: "Half a day, flight or ferry", hotel: "40 to 60 minutes" },
  { row: "Whole venue to yourselves", lithos: true, island: true, hotel: false },
  { row: "Several working spaces", lithos: true, island: false, hotel: "Booked by the hour" },
  { row: "Padel, pool, gym, sauna on site", lithos: true, island: false, hotel: false },
  { row: "Weekday blocks Oct to May", lithos: true, island: "Thin transport", hotel: true },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <span className="inline-flex items-center gap-1 font-semibold" style={{ color: CHART_GREEN }}><Check size={18} /> Yes</span>;
  if (v === false) return <span className="inline-flex items-center gap-1" style={{ color: "#9CA3AF" }}><X size={18} /> No</span>;
  return <span>{v}</span>;
}

export default function Page() {
  return (
    <main className="cr" style={{ fontFamily: "var(--font-sans), sans-serif", color: INK, background: "#fff" }}>
      <style>{`
        .cr .mx-auto{margin-left:auto;margin-right:auto}
        .cr .mt-1{margin-top:.25rem}.cr .mt-2{margin-top:.5rem}.cr .mt-3{margin-top:.75rem}.cr .mt-4{margin-top:1rem}.cr .mt-5{margin-top:1.25rem}.cr .mt-6{margin-top:1.5rem}.cr .mt-8{margin-top:2rem}.cr .mt-10{margin-top:2.5rem}.cr .mb-4{margin-bottom:1rem}.cr .mt-0\\.5{margin-top:.125rem}
        .cr .cr-white{color:#fff}.cr .cr-white85{color:rgba(255,255,255,.85)}.cr .cr-white70{color:rgba(255,255,255,.7)}
        .cr details>summary::-webkit-details-marker{display:none}
      `}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(venueJsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ minHeight: "82vh" }}>
        <Image
          src={img("Exterior & Pool (14).jpg")}
          alt="Villa Lithos Porto Rafti at sunset, aerial view of the estate with pool and sea beyond"
          fill
          priority
          sizes="100vw"
          quality={78}
          className="object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,16,24,0.10) 0%, rgba(10,16,24,0.35) 55%, rgba(10,16,24,0.82) 100%)" }} />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-end px-6 pb-16 pt-40 md:pb-24 md:pt-48" style={{ minHeight: "82vh" }}>
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#D8E0CF" }}>Corporate retreats and company offsites</span>
          <h1 className="max-w-3xl text-4xl leading-tight cr-white md:text-6xl" style={{ fontFamily: "var(--font-serif), serif" }}>
            {H1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg cr-white85 md:text-xl">
            A private 9-bedroom estate on the coast of Attica, Greece. Leadership offsites and company retreats for 10 to 22 people, weekday blocks from October to May.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#inquiry" className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-base font-semibold cr-white" style={{ background: SAGE }}>
              Request a proposal <ArrowRight size={18} />
            </Link>
            <a href="#rooming" className="inline-flex items-center rounded-md border border-white/60 px-6 py-3.5 text-base font-semibold cr-white backdrop-blur-sm">
              See the rooming plans
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 py-8 md:grid-cols-5 md:gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-xl bg-white p-5 shadow-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
              <Icon size={22} style={{ color: SAGE }} />
              <div className="mt-3 text-2xl font-semibold" style={{ fontFamily: "var(--font-serif), serif" }}>{value}</div>
              <div className="mt-1 text-sm" style={{ color: "#6B7280" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY AN OFFSITE: CHARTS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>The case for getting together</span>
        <h2 className="mt-3 max-w-2xl text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>
          Most teams are no longer in one room. The ones that meet on purpose stay connected longer.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Chart 1: Atlassian */}
          <figure className="rounded-2xl p-7 shadow-sm" style={{ background: CREAM, border: "1px solid rgba(26,35,50,0.06)" }}>
            <div className="text-5xl font-semibold" style={{ fontFamily: "var(--font-serif), serif", color: CHART_GREEN }}>+27%</div>
            <figcaption className="mt-2 text-base font-medium">Team connection after an in-person gathering</figcaption>
            <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>Connection index, before vs after. The lift fades back to baseline after about 4 months, so plan roughly three a year.</p>
            <svg viewBox="0 0 420 200" role="img" aria-label="Bar chart: team connection index 100 before an in-person gathering, 127 after" className="mt-5 w-full">
              <line x1="40" y1="160" x2="400" y2="160" stroke="#D9DDE3" strokeWidth="1" />
              <line x1="40" y1="100" x2="400" y2="100" stroke="#EEF0F3" strokeWidth="1" />
              <line x1="40" y1="40" x2="400" y2="40" stroke="#EEF0F3" strokeWidth="1" />
              <text x="34" y="164" fontSize="11" textAnchor="end" fill="#6B7280">0</text>
              <text x="34" y="104" fontSize="11" textAnchor="end" fill="#6B7280">70</text>
              <text x="34" y="44" fontSize="11" textAnchor="end" fill="#6B7280">140</text>
              {/* before: 100 -> height 100/140*120 = 85.7 */}
              <g>
                <title>Before the gathering: 100 (baseline)</title>
                <rect x="105" y="74.3" width="90" height="85.7" rx="4" fill={CHART_GRAY} />
                <text x="150" y="66" fontSize="14" fontWeight="600" textAnchor="middle" fill={INK}>100</text>
                <text x="150" y="182" fontSize="12" textAnchor="middle" fill="#3D4A5C">Before</text>
              </g>
              {/* after: 127 -> height 108.9 */}
              <g>
                <title>After the gathering: 127 (+27%)</title>
                <rect x="245" y="51.1" width="90" height="108.9" rx="4" fill={CHART_GREEN} />
                <text x="290" y="43" fontSize="14" fontWeight="600" textAnchor="middle" fill={INK}>127</text>
                <text x="290" y="182" fontSize="12" textAnchor="middle" fill="#3D4A5C">After</text>
              </g>
            </svg>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
              <CalendarDays size={18} style={{ color: SAGE }} />
              <span>Effect lasts about <strong>4 months</strong>. Atlassian&apos;s recommendation: <strong>about 3 gatherings a year</strong>.</span>
            </div>
            <p className="mt-3 text-xs" style={{ color: "#9CA3AF" }}>
              Source: Atlassian, Intentional Team Gatherings research, 1,600+ gatherings, average 16 people.{" "}
              <a href="https://www.atlassian.com/blog/distributed-work/intentional-togetherness-research" target="_blank" rel="nofollow noopener" style={{ color: SAGE }}>Read the study</a>
            </p>
          </figure>

          {/* Chart 2: Gallup */}
          <figure className="rounded-2xl p-7 shadow-sm" style={{ background: CREAM, border: "1px solid rgba(26,35,50,0.06)" }}>
            <div className="text-5xl font-semibold" style={{ fontFamily: "var(--font-serif), serif", color: CHART_BLUE }}>4 in 5</div>
            <figcaption className="mt-2 text-base font-medium">remote-capable employees are not in the office full time</figcaption>
            <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>Where remote-capable US employees work, Q2 2025. The team you want in one room is usually spread across three arrangements.</p>
            <svg viewBox="0 0 420 200" role="img" aria-label="Stacked bar: 52% hybrid, 28% exclusively remote, 21% on-site" className="mt-5 w-full">
              {/* bar spans x 20..400 = 380 px */}
              <g>
                <title>Hybrid: 52%</title>
                <rect x="20" y="70" width="195.6" height="56" rx="4" fill={CHART_GREEN} />
                <text x="117" y="103" fontSize="16" fontWeight="600" textAnchor="middle" fill="#fff">52%</text>
              </g>
              <g>
                <title>Exclusively remote: 28%</title>
                <rect x="217.6" y="70" width="104.4" height="56" rx="4" fill={CHART_BLUE} />
                <text x="269" y="103" fontSize="16" fontWeight="600" textAnchor="middle" fill="#fff">28%</text>
              </g>
              <g>
                <title>On-site: 21%</title>
                <rect x="324" y="70" width="76" height="56" rx="4" fill={CHART_GOLD} />
                <text x="362" y="103" fontSize="16" fontWeight="600" textAnchor="middle" fill="#fff">21%</text>
              </g>
              <g fontSize="12" fill="#3D4A5C">
                <rect x="20" y="150" width="12" height="12" rx="2" fill={CHART_GREEN} /><text x="38" y="160">Hybrid</text>
                <rect x="120" y="150" width="12" height="12" rx="2" fill={CHART_BLUE} /><text x="138" y="160">Exclusively remote</text>
                <rect x="270" y="150" width="12" height="12" rx="2" fill={CHART_GOLD} /><text x="288" y="160">On-site</text>
              </g>
            </svg>
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
              <Users size={18} style={{ color: SAGE }} />
              <span>Hybrid employees spend about <strong>46% of the week</strong> in the office. Rarely the same days as everyone else.</span>
            </div>
            <p className="mt-3 text-xs" style={{ color: "#9CA3AF" }}>
              Source: Gallup, Hybrid Work in Retreat? Barely, survey of remote-capable US employees, May 2025 (figures rounded).{" "}
              <a href="https://www.gallup.com/workplace/694361/hybrid-work-retreat-barely.aspx" target="_blank" rel="nofollow noopener" style={{ color: SAGE }}>Read the report</a>
            </p>
          </figure>
        </div>
      </section>

      {/* SPACES */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-md">
            <Image src={img("Bedrooms (2).jpg")} alt="Attic-level workshop space at Villa Lithos with wooden beams and a large screen" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>One house. Not a conference hotel.</span>
            <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Dedicated working spaces for company offsites.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {spaces.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl bg-white p-5 shadow-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
                  <Icon size={22} style={{ color: SAGE }} />
                  <div className="mt-3 font-semibold">{title}</div>
                  <div className="mt-1 text-sm" style={{ color: "#3D4A5C" }}>{text}</div>
                </div>
              ))}
            </div>
            <dl className="mt-6 rounded-xl bg-white p-5 text-sm shadow-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: SAGE }}>Technical spec</div>
              {specs.map(({ k, v }) => (
                <div key={k} className="mt-2" style={{ display: "grid", gridTemplateColumns: "6.5rem 1fr", gap: "0.75rem" }}>
                  <dt className="font-semibold">{k}</dt>
                  <dd style={{ color: "#3D4A5C" }}>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm" style={{ color: "#6B7280" }}>Extra screens, whiteboards, printing, a facilitator: tell the concierge team what the sessions need and it is set up before you land.</p>
          </div>
        </div>
      </section>

      {/* ROOMING */}
      <section id="rooming" className="mx-auto max-w-6xl px-6 py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>Rooming plans</span>
        <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Private rooms for 9. Shared rooms for 22.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {rooming.map(({ icon: Icon, title, size, text }) => (
            <div key={title} className="rounded-2xl p-7 shadow-sm" style={{ background: CREAM, border: "1px solid rgba(26,35,50,0.06)" }}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "rgba(122,140,110,0.15)" }}>
                <Icon size={22} style={{ color: SAGE }} />
              </div>
              <div className="mt-4 text-xl" style={{ fontFamily: "var(--font-serif), serif" }}>{title}</div>
              <div className="mt-1 text-sm font-semibold" style={{ color: SAGE }}>{size}</div>
              <p className="mt-3 text-sm" style={{ color: "#3D4A5C" }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PHOTO STRIP */}
      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { f: "Sports & Activities.jpg", a: "Private padel court at Villa Lithos with the mountains behind", c: "Private padel court" },
            { f: "Exterior & Pool (5).jpg", a: "Aerial view of the estate at dusk with the pool and the padel court lit", c: "The estate at dusk" },
            { f: "Exterior & Pool (4).jpg", a: "Outdoor dining terrace overlooking the pool", c: "Alfresco dining terrace" },
            { f: "Wellness & Spa (2).jpg", a: "Outdoor sauna among olive trees", c: "Garden sauna" },
          ].map(({ f, a, c }) => (
            <figure key={f} className="group relative aspect-[4/5] overflow-hidden rounded-xl md:aspect-[3/4]">
              <Image src={img(f)} alt={a} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-sm font-medium cr-white" style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.65), rgba(0,0,0,0))" }}>{c}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* OFF HOURS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>After the sessions</span>
        <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>The part of the retreat people remember.</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {offHours.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium" style={{ background: "rgba(122,140,110,0.12)", color: INK }}>
              <Icon size={16} style={{ color: SAGE }} /> {label}
            </span>
          ))}
        </div>
      </section>

      {/* WINTER OFFSITES */}
      <section id="winter" className="mx-auto max-w-6xl px-6 py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>Winter offsites, October to March</span>
        <h2 className="mt-3 max-w-3xl text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>A winter offsite venue near Athens: sun outside, a fireplace inside.</h2>
        <p className="mt-4 max-w-3xl text-lg" style={{ color: "#4a4a4a" }}>
          The quiet months are the natural fit for a company offsite here: weekday blocks are open, the airport is 20 minutes away and the Attica coast stays mild. Last winter the sky stayed sunny on {WINTER_STATS.portoRafti.sunnyDays} of {WINTER_STATS.days} days, and the estate has what a team needs when the day ends early: an outdoor sauna, a private gym, a fireplace lounge and a floodlit padel court.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-5">
          <figure className="rounded-2xl p-7 shadow-sm md:col-span-1" style={{ background: CREAM, border: "1px solid rgba(26,35,50,0.06)" }}>
            <Sun size={22} style={{ color: SAGE }} />
            <div className="mt-3 text-5xl font-semibold" style={{ fontFamily: "var(--font-serif), serif", color: CHART_GOLD }}>{WINTER_STATS.portoRafti.sunnyDays}</div>
            <figcaption className="mt-2 text-base font-medium">sunny days out of {WINTER_STATS.days}</figcaption>
            <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>Days with 6+ hours of sunshine. London {WINTER_STATS.london.sunnyDays}, Berlin {WINTER_STATS.berlin.sunnyDays}.</p>
          </figure>
          <figure className="rounded-2xl p-7 shadow-sm md:col-span-1" style={{ background: CREAM, border: "1px solid rgba(26,35,50,0.06)" }}>
            <Thermometer size={22} style={{ color: SAGE }} />
            <div className="mt-3 text-5xl font-semibold" style={{ fontFamily: "var(--font-serif), serif", color: CHART_BLUE }}>{WINTER_STATS.portoRafti.avgHigh.toFixed(1)}°</div>
            <figcaption className="mt-2 text-base font-medium">average daytime high</figcaption>
            <p className="mt-1 text-sm" style={{ color: "#6B7280" }}>October to March. London {WINTER_STATS.london.avgHigh.toFixed(1)}°C, Berlin {WINTER_STATS.berlin.avgHigh.toFixed(1)}°C. {WINTER_STATS.portoRafti.sunHours.toLocaleString("en-US")} sunshine hours in the period.</p>
          </figure>
          {winterAmenities.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl bg-white p-6 shadow-sm md:col-span-1" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
              <Icon size={22} style={{ color: SAGE }} />
              <h3 className="mt-3 text-xl" style={{ fontFamily: "var(--font-serif), serif", color: INK }}>{title}</h3>
              <p className="mt-2 text-sm" style={{ color: "#4a4a4a" }}>{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: "#9CA3AF" }}>Weather figures: Open-Meteo historical data, {WINTER_STATS.period}. Updated every October.</p>
      </section>

      {/* CATERING */}
      <section id="catering" style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>Private chef and catering</span>
          <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Corporate catering on the estate, from one dinner to full board.</h2>
          <p className="mt-4 max-w-3xl text-lg" style={{ color: "#4a4a4a" }}>
            A private chef cooks in the villa kitchen for the whole team, so meals happen around the programme rather than the other way round. Choose the board level that fits the agenda; the concierge team plans menus, shopping and service before you land.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {catering.map(({ title, text }) => (
              <div key={title} className="rounded-2xl bg-white p-6 shadow-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
                <ChefHat size={22} style={{ color: SAGE }} />
                <h3 className="mt-3 text-xl" style={{ fontFamily: "var(--font-serif), serif", color: INK }}>{title}</h3>
                <p className="mt-2 text-base" style={{ color: "#4a4a4a" }}>{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
            <table className="w-full text-left text-base">
              <caption className="sr-only">Catering and dining at Villa Lithos for corporate retreats</caption>
              <tbody>
                {cateringSpecs.map(({ k, v }) => (
                  <tr key={k} style={{ borderBottom: "1px solid rgba(26,35,50,0.06)" }}>
                    <th scope="row" className="w-40 px-6 py-4 font-semibold" style={{ color: INK }}>{k}</th>
                    <td className="px-6 py-4" style={{ color: "#4a4a4a" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-base" style={{ color: "#4a4a4a" }}>
            For an evening out, most Porto Rafti tavernas seat 10 to 14 at one table and need 24 to 48 hours&apos; notice to set up for a larger group; the concierge team books ahead. More on the local food in our guide to <Link href="/articles/eating-in-porto-rafti" style={{ color: SAGE }}>eating in Porto Rafti</Link>.
          </p>
        </div>
      </section>

      {/* LOGISTICS */}
      <section style={{ background: INK, color: "#fff" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "#B9C7AE" }}>Land before lunch. Work before dinner.</span>
          <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Executive team retreats 20 minutes from Athens Airport.</h2>
          <div className="mt-10 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Plane size={24} style={{ color: "#B9C7AE" }} />
              <div className="mt-3 text-xl font-semibold">Athens International (ATH)</div>
              <div className="mt-1 text-sm cr-white70">Direct flights year round. About 2 hours from Tel Aviv, 3 to 4 hours from most Western European hubs.</div>
            </div>
            <ArrowRight className="hidden md:block" size={28} style={{ color: "#B9C7AE" }} />
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Clock size={24} style={{ color: "#B9C7AE" }} />
              <div className="mt-3 text-xl font-semibold">16 km, 20 minutes</div>
              <div className="mt-1 text-sm cr-white70">Executive cars, minivans or a coach, as you prefer. No ferry, no connecting flight, no lost afternoon.</div>
            </div>
            <ArrowRight className="hidden md:block" size={28} style={{ color: "#B9C7AE" }} />
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.06)" }}>
              <Lock size={24} style={{ color: "#B9C7AE" }} />
              <div className="mt-3 text-xl font-semibold">Gate closes behind you</div>
              <div className="mt-1 text-sm cr-white70">A walled estate, private parking, no other guests. Athens 40 minutes away when you want it.</div>
            </div>
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>A sample three days</span>
        <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Built around your programme, not ours.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {agenda.map(({ day, items }) => (
            <div key={day} className="rounded-2xl p-6 shadow-sm" style={{ background: CREAM, border: "1px solid rgba(26,35,50,0.06)" }}>
              <div className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: SAGE }}>{day}</div>
              <ul className="mt-4 space-y-4">
                {items.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3 text-sm" style={{ color: "#3D4A5C" }}>
                    <Icon size={18} className="mt-0.5 shrink-0" style={{ color: SAGE }} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARE */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>How it compares</span>
          <h2 className="mt-3 text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Private estate, island villa, or an Athens hotel.</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl bg-white shadow-sm" style={{ border: "1px solid rgba(26,35,50,0.06)" }}>
            <table className="w-full text-left text-sm" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ background: "rgba(122,140,110,0.10)" }}>
                  <th className="px-5 py-4 font-semibold"></th>
                  <th className="px-5 py-4 font-semibold" style={{ color: SAGE }}>Villa Lithos</th>
                  <th className="px-5 py-4 font-semibold">Island villa</th>
                  <th className="px-5 py-4 font-semibold">Athens hotel</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.row} style={{ borderTop: "1px solid rgba(26,35,50,0.06)" }}>
                    <td className="px-5 py-4 font-medium">{r.row}</td>
                    <td className="px-5 py-4"><Cell v={r.lithos} /></td>
                    <td className="px-5 py-4"><Cell v={r.island} /></td>
                    <td className="px-5 py-4"><Cell v={r.hotel} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-serif), serif" }}>Questions planners ask</h2>
        <div className="mt-6 divide-y" style={{ borderTop: "1px solid rgba(26,35,50,0.1)", borderBottom: "1px solid rgba(26,35,50,0.1)" }}>
          {faqs.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold">
                {q}
                <span className="text-xl transition-transform group-open:rotate-45" style={{ color: SAGE }}>+</span>
              </summary>
              <p className="mt-3 text-sm" style={{ color: "#3D4A5C" }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <Image src={img("Exterior & Pool (12).jpg")} alt="Villa Lithos and the pool under the evening sky" fill sizes="100vw" quality={70} className="object-cover" />
        <div className="absolute inset-0" style={{ background: "rgba(10,16,24,0.7)" }} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center cr-white">
          <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "var(--font-serif), serif" }}>Request a retreat proposal</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg cr-white85">Send your dates, team size and what the retreat needs to achieve. You get availability, a rooming plan and a proposal for meals, transfers and activities.</p>
          <Link href="/#inquiry" className="mt-8 inline-flex items-center gap-2 rounded-md px-8 py-4 text-base font-semibold cr-white" style={{ background: SAGE }}>
            Request a proposal <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOT NOTE */}
      <section className="mx-auto max-w-6xl px-6 py-10 text-xs" style={{ color: "#9CA3AF" }}>
        <p>
          Last updated 9 October 2026. Property facts as published on <Link href="/luxury-villa-porto-rafti" style={{ color: SAGE }}>the luxury villa rental in Porto Rafti guide</Link>. Distances are approximate driving times. Research cited: Atlassian, Intentional Team Gatherings; Gallup, Hybrid Work in Retreat? Barely (2025). Winter weather figures: Open-Meteo historical data (ERA5), October 2025 to March 2026.
          {" "}Related: <Link href="/villas-near-athens-airport" style={{ color: SAGE }}>Large private villa near Athens airport</Link> · <Link href="/large-family-villa-greece" style={{ color: SAGE }}>Villas in Greece for groups of 20</Link> · <Link href="/articles/wellness-retreats-greece-mainland" style={{ color: SAGE }}>Fitness retreat venue in Greece</Link> · <Link href="/plan-a-group-stay" style={{ color: SAGE }}>Plan a group stay: rooms, beds and a sample schedule</Link>
        </p>
      </section>
    </main>
  );
}
