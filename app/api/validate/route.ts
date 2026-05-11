import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenMeteoHourly, scoreSkyMoment } from "../../lib/forecast";

export const runtime = "nodejs";

const PhotoEstimateSchema = z.object({
  confidence: z.enum(["low", "medium", "high"]),
  estimatedCloudCover: z.number().min(0).max(100),
  estimatedLowCloud: z.number().min(0).max(100),
  estimatedMidCloud: z.number().min(0).max(100),
  estimatedHighCloud: z.number().min(0).max(100),
  estimatedPrecipProb: z.number().min(0).max(100),
  estimatedVisibilityKm: z.number().min(0).max(60),
  estimatedHorizonBreakLikelihood: z.number().min(0).max(100),
  notes: z.array(z.string()).default([])
});

type PhotoEstimate = z.infer<typeof PhotoEstimateSchema>;

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

function isGoldenHour(h: number) {
  return h === 6 || h === 7 || h === 18 || h === 19;
}

function hourFromOpenMeteoTime(t: string) {
  const h = Number(t.slice(11, 13));
  return Number.isFinite(h) ? h : 0;
}

function nowKeyInTz(tz: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
  const yyyy = get("year");
  const mm = get("month");
  const dd = get("day");

  const hh = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    hour12: false
  }).format(now);

  return `${yyyy}-${mm}-${dd}T${hh}`;
}

function matchScore(forecast: {
  cloudCover: number;
  cloudLow: number;
  cloudMid: number;
  cloudHigh: number;
  precipProb: number;
  visibilityKm: number;
  horizonBreakLikelihood: number;
}, photo: PhotoEstimate) {
  // A simple “does this look like the forecast?” score.
  // Keep it forgiving: a single photo can’t reveal everything.
  const diffs = {
    cloudCover: Math.abs(photo.estimatedCloudCover - forecast.cloudCover),
    low: Math.abs(photo.estimatedLowCloud - forecast.cloudLow),
    mid: Math.abs(photo.estimatedMidCloud - forecast.cloudMid),
    high: Math.abs(photo.estimatedHighCloud - forecast.cloudHigh),
    precip: Math.abs(photo.estimatedPrecipProb - forecast.precipProb),
    vis: Math.abs(photo.estimatedVisibilityKm - forecast.visibilityKm),
    horizon: Math.abs(photo.estimatedHorizonBreakLikelihood - forecast.horizonBreakLikelihood)
  };

  // Weighted penalty (tuned for “photography realism”, not meteorology perfection).
  const penalty =
    diffs.cloudCover * 0.35 +
    diffs.low * 0.22 +
    diffs.mid * 0.12 +
    diffs.high * 0.10 +
    diffs.precip * 0.18 +
    diffs.horizon * 0.20 +
    Math.min(diffs.vis, 20) * 0.25;

  return clamp(Math.round(100 - penalty));
}

export async function POST(req: Request) {
  const form = await req.formData();
  const image = form.get("image");
  if (!(image instanceof Blob)) {
    return NextResponse.json({ ok: false, error: "Missing image" }, { status: 400 });
  }

  const lat = Number(form.get("lat"));
  const lon = Number(form.get("lon"));
  const tz = String(form.get("tz") ?? "UTC");
  const timeKey = String(form.get("timeKey") ?? "").trim();

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ ok: false, error: "Missing lat/lon" }, { status: 400 });
  }

  const data = await getOpenMeteoHourly(lat, lon, tz);
  const key = timeKey || nowKeyInTz(tz);

  const idx = Math.max(0, data.hourly.time.findIndex((t) => t.startsWith(key)));
  const t = data.hourly.time[idx];

  const hour = hourFromOpenMeteoTime(t);
  const cloudCover = data.hourly.cloud_cover[idx];
  const cloudLow = data.hourly.cloud_cover_low[idx];
  const cloudMid = data.hourly.cloud_cover_mid[idx];
  const cloudHigh = data.hourly.cloud_cover_high[idx];
  const visibilityKm = data.hourly.visibility[idx] / 1000;
  const precipProb = data.hourly.precipitation_probability[idx];
  const precipMm = data.hourly.precipitation[idx];
  const windKph = data.hourly.wind_speed_10m[idx];
  const wind80Kph = data.hourly.wind_speed_80m[idx];
  const windShearKph = Math.abs(wind80Kph - windKph);
  const horizonBreakLikelihood = clamp(100 - cloudLow);

  const scored = scoreSkyMoment({
    cloudCover,
    cloudLow,
    cloudMid,
    cloudHigh,
    precipProb,
    precipMm,
    visibilityKm,
    windKph,
    isGoldenHour: isGoldenHour(hour),
    isNight: hour < 6 || hour > 21
  });

  const forecast = {
    time: t,
    hour,
    score: scored.score,
    note: scored.note,
    cloudCover,
    cloudLow,
    cloudMid,
    cloudHigh,
    precipProb,
    precipMm,
    visibilityKm,
    windKph,
    windShearKph,
    horizonBreakLikelihood
  };

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      ok: true,
      forecast,
      photo: null,
      match: null,
      message: "AI photo validation isn’t configured on this deployment yet (missing OPENAI_API_KEY). Forecast details are shown anyway."
    });
  }

  try {
    const bytes = Buffer.from(await image.arrayBuffer());
    const base64 = bytes.toString("base64");

    const { default: OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const prompt =
      "You are a careful sky + cloud observer. Estimate conditions visible in the photo. " +
      "Return STRICT JSON with keys: confidence (low|medium|high), estimatedCloudCover (0-100), estimatedLowCloud (0-100), " +
      "estimatedMidCloud (0-100), estimatedHighCloud (0-100), estimatedPrecipProb (0-100), estimatedVisibilityKm (0-60), " +
      "estimatedHorizonBreakLikelihood (0-100), notes (array of short strings). " +
      "Do NOT include any extra keys. Be conservative: if unsure, choose medium values and low confidence.";

    const resp = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: prompt },
            {
              type: "input_image",
              image_url: `data:${image.type || "image/jpeg"};base64,${base64}`,
              detail: "auto"
            }
          ]
        }
      ]
    });

    const text = resp.output_text?.trim() || "";
    const parsed = PhotoEstimateSchema.safeParse(JSON.parse(text));
    if (!parsed.success) {
      return NextResponse.json({ ok: true, forecast, photo: null, match: null, message: "Could not parse AI result." });
    }

    const photo = parsed.data;
    const ms = matchScore(
      {
        cloudCover,
        cloudLow,
        cloudMid,
        cloudHigh,
        precipProb,
        visibilityKm,
        horizonBreakLikelihood
      },
      photo
    );

    let summary = "";
    if (ms >= 80) summary = "Nice — your photo matches the forecast really well.";
    else if (ms >= 60) summary = "Pretty close — the forecast and photo mostly agree.";
    else summary = "Interesting — your photo doesn’t match the forecast much. (Could be timing/location, or the model’s guess.)";

    return NextResponse.json({ ok: true, forecast, photo, match: { score: ms, summary } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Validation failed";
    return NextResponse.json({ ok: true, forecast, photo: null, match: null, message: msg });
  }
}
