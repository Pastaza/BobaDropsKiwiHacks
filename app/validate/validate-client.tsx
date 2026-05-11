"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Card, Container, Pill } from "../components/ui";

type Forecast = {
  time: string;
  hour: number;
  score: number;
  note: string;
  cloudCover: number;
  cloudLow: number;
  cloudMid: number;
  cloudHigh: number;
  precipProb: number;
  precipMm: number;
  visibilityKm: number;
  windKph: number;
  windShearKph: number;
  horizonBreakLikelihood: number;
};

type PhotoEstimate = {
  confidence: "low" | "medium" | "high";
  estimatedCloudCover: number;
  estimatedLowCloud: number;
  estimatedMidCloud: number;
  estimatedHighCloud: number;
  estimatedPrecipProb: number;
  estimatedVisibilityKm: number;
  estimatedHorizonBreakLikelihood: number;
  notes: string[];
};

type ValidateResult =
  | {
      ok: true;
      forecast: Forecast;
      photo: PhotoEstimate | null;
      match: { score: number; summary: string } | null;
      message?: string;
    }
  | { ok: false; error: string };

function num(s: string | null, fallback: number) {
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

export function ValidateClient() {
  const sp = useSearchParams();

  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ValidateResult | null>(null);

  const [lat, setLat] = useState(() => String(num(sp.get("lat"), -36.8485)));
  const [lon, setLon] = useState(() => String(num(sp.get("lon"), 174.7633)));
  const [tz, setTz] = useState(() => sp.get("tz") || "Pacific/Auckland");
  const [timeKey, setTimeKey] = useState(() => sp.get("timeKey") || "");
  const name = sp.get("name") || "";

  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  async function onValidate() {
    if (!file) return;

    setBusy(true);
    setResult(null);

    const form = new FormData();
    form.append("image", file);
    form.append("lat", lat);
    form.append("lon", lon);
    form.append("tz", tz);
    if (timeKey.trim()) form.append("timeKey", timeKey.trim());

    const res = await fetch("/api/validate", { method: "POST", body: form });
    const json = (await res.json()) as ValidateResult;
    setResult(json);
    setBusy(false);
  }

  return (
    <main className="py-12">
      <Container>
        <Pill>Camera validation (beta)</Pill>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink-950">Does your photo match the forecast?</h1>
        <p className="mt-3 max-w-2xl text-ink-800">
          Upload a sky photo, and we’ll compare what’s visible against the forecast for a location + hour.
          {name ? ` Location: ${name}.` : ""}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <h2 className="font-semibold">Upload + location</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-ink-900">Latitude</span>
                <input
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
                />
              </label>
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-ink-900">Longitude</span>
                <input
                  value={lon}
                  onChange={(e) => setLon(e.target.value)}
                  className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
                />
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-semibold text-ink-900">Timezone</span>
                <input
                  value={tz}
                  onChange={(e) => setTz(e.target.value)}
                  className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
                />
                <span className="text-xs text-ink-600">Example: Pacific/Auckland</span>
              </label>
              <label className="grid gap-1 text-sm sm:col-span-2">
                <span className="font-semibold text-ink-900">Hour (optional)</span>
                <input
                  value={timeKey}
                  onChange={(e) => setTimeKey(e.target.value)}
                  placeholder="YYYY-MM-DDTHH (leave blank for current hour)"
                  className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
                />
              </label>
            </div>

            <input
              className="mt-4 block w-full text-sm"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            {preview ? (
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl ring-1 ring-ink-900/10">
                <Image
                  src={preview}
                  alt="Preview"
                  width={1280}
                  height={720}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <div className="mt-4 aspect-video w-full rounded-xl bg-white/60 ring-1 ring-ink-900/10" />
            )}

            <div className="mt-4 flex gap-3">
              <button
                onClick={onValidate}
                disabled={!file || busy}
                className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-ink-900 disabled:opacity-50"
              >
                {busy ? "Validating…" : "Validate"}
              </button>
              <Button href="/forecast" kind="secondary">Back to forecast</Button>
            </div>

            <p className="mt-4 text-xs text-ink-600">Privacy note: this beta doesn’t store your image.</p>
          </Card>

          <Card>
            <h2 className="font-semibold">Result</h2>
            {!result ? (
              <p className="mt-3 text-sm text-ink-700">Upload a photo and hit Validate.</p>
            ) : !result.ok ? (
              <p className="mt-3 text-sm text-red-700">{result.error}</p>
            ) : (
              <div className="mt-4 grid gap-4">
                {result.match ? (
                  <div>
                    <div className="text-xs font-semibold text-ink-900">Match score</div>
                    <div className="mt-1 text-3xl font-semibold text-ink-950">{result.match.score}/100</div>
                    <div className="mt-2 text-sm text-ink-700">{result.match.summary}</div>
                  </div>
                ) : null}

                {result.message ? <p className="text-sm text-ink-700">{result.message}</p> : null}

                <div>
                  <div className="text-xs font-semibold text-ink-900">
                    Forecast (hour: {String(result.forecast.hour).padStart(2, "0")}:00)
                  </div>
                  <div className="mt-2 text-sm text-ink-700">
                    Score: {result.forecast.score}/100 · {result.forecast.note}
                  </div>
                  <div className="mt-2 text-xs text-ink-600">
                    Clouds: {result.forecast.cloudCover}% (low {result.forecast.cloudLow} / mid {result.forecast.cloudMid} / high {result.forecast.cloudHigh}) ·
                    Rain: {result.forecast.precipProb}% ·
                    Visibility: {result.forecast.visibilityKm.toFixed(1)} km ·
                    Wind: {Math.round(result.forecast.windKph)} kph ·
                    Shear: {Math.round(result.forecast.windShearKph)} kph ·
                    Horizon breaks: {Math.round(result.forecast.horizonBreakLikelihood)}%
                  </div>
                </div>

                {result.photo ? (
                  <div>
                    <div className="text-xs font-semibold text-ink-900">
                      Photo estimate (confidence: {result.photo.confidence})
                    </div>
                    <div className="mt-2 text-xs text-ink-600">
                      Clouds: {result.photo.estimatedCloudCover}% (low {result.photo.estimatedLowCloud} / mid {result.photo.estimatedMidCloud} / high {result.photo.estimatedHighCloud}) ·
                      Rain: {result.photo.estimatedPrecipProb}% ·
                      Visibility: {result.photo.estimatedVisibilityKm.toFixed(1)} km ·
                      Horizon breaks: {Math.round(result.photo.estimatedHorizonBreakLikelihood)}%
                    </div>
                    {result.photo.notes.length ? (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-ink-700">
                        {result.photo.notes.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )}
          </Card>
        </div>
      </Container>
    </main>
  );
}
