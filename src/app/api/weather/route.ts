import { NextResponse } from "next/server";

// Current conditions at the villa for the homepage winter band.
// Source: MET Norway Locationforecast 2.0 (free, commercial use allowed with
// attribution and an identifying User-Agent). Cached for 15 minutes.
const LAT = 37.9022;
const LON = 24.0224;

export const revalidate = 900;

const LABELS: Array<[RegExp, string]> = [
  [/^clearsky/, "Clear sky"],
  [/^fair/, "Fair"],
  [/^partlycloudy/, "Partly cloudy"],
  [/^cloudy/, "Cloudy"],
  [/^fog/, "Fog"],
  [/^(light)?rainshowers/, "Light showers"],
  [/^heavyrain/, "Heavy rain"],
  [/^(light)?rain/, "Rain"],
  [/^(light)?sleet/, "Sleet"],
  [/^(light)?snow/, "Snow"],
  [/thunder/, "Thunderstorm"],
];

function label(symbol: string | undefined) {
  if (!symbol) return "";
  for (const [re, text] of LABELS) if (re.test(symbol)) return text;
  return symbol.replace(/_(day|night|polartwilight)$/, "").replace(/_/g, " ");
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${LAT}&lon=${LON}`,
      {
        headers: { "User-Agent": "villalithosgreece.com/1.0 (info@villalithos.com)" },
        next: { revalidate: 900 },
      },
    );
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    const data = (await res.json()) as {
      properties?: {
        meta?: { updated_at?: string };
        timeseries?: Array<{
          time: string;
          data: {
            instant: { details: { air_temperature?: number; wind_speed?: number } };
            next_1_hours?: { summary?: { symbol_code?: string } };
            next_6_hours?: { summary?: { symbol_code?: string } };
          };
        }>;
      };
    };
    const now = data.properties?.timeseries?.[0];
    if (!now) return NextResponse.json({ ok: false }, { status: 502 });
    const symbol = now.data.next_1_hours?.summary?.symbol_code ?? now.data.next_6_hours?.summary?.symbol_code;
    const body = {
      ok: true,
      temperature: Math.round(now.data.instant.details.air_temperature ?? NaN),
      windKmh: Math.round((now.data.instant.details.wind_speed ?? 0) * 3.6),
      condition: label(symbol),
      symbol: symbol ?? null,
      observedAt: now.time,
      source: "MET Norway",
    };
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
