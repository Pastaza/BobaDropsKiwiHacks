export type Location = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  tz: string;
};

export const FEATURED_LOCATIONS: Location[] = [
  { name: "Auckland", country: "NZ", lat: -36.8485, lon: 174.7633, tz: "Pacific/Auckland" },
  { name: "Wellington", country: "NZ", lat: -41.2865, lon: 174.7762, tz: "Pacific/Auckland" },
  { name: "Christchurch", country: "NZ", lat: -43.5321, lon: 172.6362, tz: "Pacific/Auckland" },
  { name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093, tz: "Australia/Sydney" },
  { name: "San Francisco", country: "US", lat: 37.7749, lon: -122.4194, tz: "America/Los_Angeles" }
];

export type SkyMoment = {
  timeISO: string;
  cloudCover: number; // 0-100
  visibilityKm?: number;
  score: number; // 0-100
  note: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function scoreSkyMoment(params: {
  cloudCover: number;
  isGoldenHour: boolean;
  isNight: boolean;
}) {
  // Heuristic: a little cloud is great, too much or too little is less exciting.
  // Sweet spot around 35–65%.
  const { cloudCover, isGoldenHour, isNight } = params;

  const sweetSpot = 55;
  const distance = Math.abs(cloudCover - sweetSpot);
  const base = 100 - distance * 1.7;

  const goldenBoost = isGoldenHour ? 12 : 0;
  const nightPenalty = isNight ? 10 : 0;

  const score = clamp(Math.round(base + goldenBoost - nightPenalty), 0, 100);

  let note = "";
  if (cloudCover < 15) note = "Mostly clear — great for stars, less dramatic for sunsets.";
  else if (cloudCover < 35) note = "Some texture — good odds for a colorful sky.";
  else if (cloudCover < 70) note = "Excellent cloud drama range — keep an eye on the horizon.";
  else note = "Mostly cloudy — watch for breaks near sunset.";

  return { score, note };
}

export async function getOpenMeteoHourly(lat: number, lon: number, tz: string) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("hourly", ["cloud_cover", "visibility"].join(","));
  url.searchParams.set("forecast_days", "2");
  url.searchParams.set("timezone", tz);

  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  return res.json() as Promise<{
    hourly: {
      time: string[];
      cloud_cover: number[];
      visibility: number[];
    };
  }>;
}
