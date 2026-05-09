"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button, Card, Container, Pill } from "../components/ui";

type IdentifyResult = {
  title: string;
  confidence: "low" | "medium" | "high";
  summary: string;
  whatToLookFor: string[];
  whatItMeans: string[];
  photographyTips: string[];
};

export default function IdentifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<IdentifyResult | null>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  async function onIdentify() {
    if (!file) return;
    setBusy(true);
    setResult(null);

    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/identify", { method: "POST", body: form });
    const json = (await res.json()) as IdentifyResult;
    setResult(json);
    setBusy(false);
  }

  return (
    <main className="py-12">
      <Container>
        <Pill>Identify (beta)</Pill>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink-950">Identify a cloud</h1>
        <p className="mt-3 max-w-2xl text-ink-800">
          Upload a sky photo. If AI is configured, you’ll get a richer result. If not, you’ll still get a helpful guess.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card>
            <h2 className="font-semibold">Upload</h2>
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
                onClick={onIdentify}
                disabled={!file || busy}
                className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-ink-900 disabled:opacity-50"
              >
                {busy ? "Identifying…" : "Identify"}
              </button>
              <Button href="/atlas" kind="secondary">Browse the atlas</Button>
            </div>

            <p className="mt-4 text-xs text-ink-600">
              Privacy note: in this MVP we don’t store your image. If you later enable history/diary, we’ll make that explicit.
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold">Result</h2>
            {!result ? (
              <p className="mt-3 text-sm text-ink-700">Upload a photo and hit Identify.</p>
            ) : (
              <div className="mt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-ink-950">{result.title}</h3>
                    <p className="mt-1 text-sm text-ink-700">Confidence: {result.confidence}</p>
                  </div>
                  <a
                    className="text-xs font-semibold text-ink-900 hover:text-ink-700"
                    href={`/api/og?title=${encodeURIComponent(result.title)}`}
                  >
                    OG preview
                  </a>
                </div>

                <p className="mt-3 text-sm text-ink-800">{result.summary}</p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div>
                    <div className="text-xs font-semibold text-ink-900">Look for</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-ink-700">
                      {result.whatToLookFor.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ink-900">Meaning</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-ink-700">
                      {result.whatItMeans.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-ink-900">Photo tips</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-ink-700">
                      {result.photographyTips.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Container>
    </main>
  );
}
