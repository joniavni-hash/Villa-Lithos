"use client";

import { useEffect, useState } from "react";

type Weather = { ok: boolean; temperature?: number; condition?: string; windKmh?: number; observedAt?: string };

// Live conditions tile for the winter band. Renders a quiet placeholder until the
// forecast arrives and disappears if the weather route is unavailable.
export default function NowInPortoRafti() {
  const [w, setW] = useState<Weather | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/weather", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j: Weather) => { if (alive) (j.ok && typeof j.temperature === "number" ? setW(j) : setFailed(true)); })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, []);

  if (failed) return null;

  return (
    <div className="vl-winter__tile vl-winter__tile--live" aria-live="polite">
      <div className="vl-label vl-winter__kicker">Right now in Porto Rafti</div>
      <div className="vl-stat__num vl-winter__num">
        {w ? (
          <>
            {w.temperature}
            <sup>°C</sup>
          </>
        ) : (
          <span className="vl-winter__dots" aria-label="Loading">···</span>
        )}
      </div>
      <div className="vl-winter__text">
        {w ? (
          <>
            {w.condition || "Live conditions"}
            {typeof w.windKmh === "number" ? ` · wind ${w.windKmh} km/h` : ""}
          </>
        ) : (
          "Fetching live conditions"
        )}
      </div>
      <div className="vl-winter__src">Live forecast, MET Norway</div>
    </div>
  );
}
