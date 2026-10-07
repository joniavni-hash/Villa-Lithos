// Winter mode for the homepage: October to March (decided 8.10.2026).
// The homepage is regenerated daily (ISR), so the switch happens on its own.
export const WINTER_MONTHS = [10, 11, 12, 1, 2, 3];

export function isWinterSeason(date: Date = new Date()): boolean {
  return WINTER_MONTHS.includes(date.getUTCMonth() + 1);
}

// Last winter, measured: 1 Oct 2025 to 31 Mar 2026 (182 days), from Open-Meteo
// historical weather data (ERA5 reanalysis). "Sunny day" = 6 hours of sunshine or more.
// Refresh every October with the agent's winter-stats procedure.
export const WINTER_STATS = {
  period: "October 2025 to March 2026",
  days: 182,
  portoRafti: { sunnyDays: 161, avgHigh: 17.3, sunHours: 1554 },
  london: { sunnyDays: 81, avgHigh: 11.1, sunHours: 894 },
  berlin: { sunnyDays: 88, avgHigh: 7.2, sunHours: 915 },
};
