const STATS: { num: string; unit?: string; label: string }[] = [
  { num: "9", label: "Bedrooms" },
  { num: "22", label: "Guests" },
  { num: "8.5", label: "Bathrooms" },
  { num: "800", unit: "m²", label: "Built" },
  { num: "5,000", unit: "m²", label: "Private estate" },
  { num: "16", unit: "km", label: "To the airport" },
];

export default function StatsStrip() {
  return (
    <section id="stats" className="vl-stats" aria-label="Villa at a glance">
      <div className="vl-stats__in">
        {STATS.map((s, i) => (
          <div key={s.label} className="vl-stat vl-reveal" data-delay={String(Math.min(i, 4))}>
            <div className="vl-stat__num">
              {s.num}
              {s.unit ? <sup>{s.unit}</sup> : null}
            </div>
            <div className="vl-label vl-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
