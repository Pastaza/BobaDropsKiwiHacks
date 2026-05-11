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
  cloudLow?: number;
  cloudMid?: number;
  cloudHigh?: number;
  precipProb?: number;
  precipMm?: number;
  visibilityKm?: number;
  windKph?: number;
  windShearKph?: number;
  isGoldenHour: boolean;
  isNight: boolean;
}) {
  // Heuristic v2:
  // - Most “dramatic skies” happen with *some* cloud to catch light,
  //   especially mid/high layers near golden hour.
  // - Too much low cloud tends to make a flat grey lid.
  // - High precip probability reduces score (rain blocks light + people avoid going out).
  const {
    cloudCover,
    cloudLow = 0,
    cloudMid = 0,
    cloudHigh = 0,
    precipProb = 0,
    precipMm = 0,
    visibilityKm,
    windKph,
    windShearKph,
    isGoldenHour,
    isNight
  } = params;

  // Sweet spot: overall coverage around 35–70, but we’ll shape it with layers.
  const sweetSpot = 55;
  const distance = Math.abs(cloudCover - sweetSpot);
  let score = 100 - distance * 1.6;

  // Prefer mid/high texture (they light up at sunrise/sunset).
  score += cloudMid * 0.12;
  score += cloudHigh * 0.08;

  // Penalize heavy low cloud.
  score -= cloudLow * 0.18;

  // Rain reduces “go outside and look up” likelihood.
  score -= precipProb * 0.35;
  score -= precipMm * 4;

  // Visibility helps color/contrast a bit.
  if (typeof visibilityKm === "number") score += clamp((visibilityKm - 5) * 0.8, -10, 10);

  // Wind: small boost (moving breaks) but too much makes it unpleasant.
  if (typeof windKph === "number") {
    if (windKph < 10) score += 2;
    else if (windKph < 25) score += 4;
    else score -= 6;
  }

  // Horizon breaks (very rough): low cloud tends to cap the horizon and flatten the scene.
  // We use this as a gentle adjustment, not a big swing.
  const horizonBreakLikelihood = clamp(100 - cloudLow, 0, 100);
  score += (horizonBreakLikelihood - 50) * 0.05;

  // Wind shear (very rough): difference between surface and higher winds can correlate with texture.
  // Keep effect small until validated.
  if (typeof windShearKph === "number") {
    if (windShearKph > 35) score -= 4;
    else if (windShearKph > 20) score += 2;
  }

  if (isGoldenHour) score += 14;
  if (isNight) score -= 12;

  score = clamp(Math.round(score), 0, 100);

  let note = "";
  if (precipProb >= 60) note = "Rain likely — dramatic light is harder, but watch for post-shower breaks.";
  else if (cloudLow > 70) note = "Lots of low cloud — look for brief breaks near the horizon.";
  else if (horizonBreakLikelihood < 30) note = "Horizon looks capped — you may get flat light unless breaks open up.";
  else if (cloudCover < 15) note = "Mostly clear — great for stars; less texture for sunsets.";
  else if (cloudCover < 35) note = "Some texture — good odds for color if clouds catch the sun.";
  else if (cloudCover < 75) note = "Excellent cloud drama range — keep an eye on breaks near sunset.";
  else note = "Mostly cloudy — your best bet is a thin spot on the western horizon.";

  return { score, note };
}

export async function getOpenMeteoHourly(lat: number, lon: number, tz: string) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "hourly",
    [
      "cloud_cover",
      "cloud_cover_low",
      "cloud_cover_mid",
      "cloud_cover_high",
      "visibility",
      "precipitation_probability",
      "precipitation",
      "wind_speed_10m",
      "wind_speed_80m"
    ].join(",")
  );
  url.searchParams.set("forecast_days", "2");
  url.searchParams.set("timezone", tz);

  const res = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  return res.json() as Promise<{
    hourly: {
      time: string[];
      cloud_cover: number[];
      cloud_cover_low: number[];
      cloud_cover_mid: number[];
      cloud_cover_high: number[];
      visibility: number[];
      precipitation_probability: number[];
      precipitation: number[];
      wind_speed_10m: number[];
      wind_speed_80m: number[];
    };
  }>;
}
