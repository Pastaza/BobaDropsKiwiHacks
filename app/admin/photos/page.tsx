"use client";

import { useEffect, useMemo, useState } from "react";

type Photo = {
  id: string;
  created_at: string;
  title: string;
  caption: string | null;
  image_url: string;
  featured_scope: "week" | "month" | null;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function AdminPhotosPage() {
  const [token, setToken] = useState("");
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = window.localStorage.getItem("PHOTO_ADMIN_TOKEN");
    if (t) setSavedToken(t);
  }, []);

  const effectiveToken = useMemo(() => token.trim() || savedToken?.trim() || "", [token, savedToken]);

  async function load() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/photos/list", { cache: "no-store" });
      const json = (await res.json()) as { ok: boolean; photos?: Photo[]; error?: string };
      if (!json.ok) throw new Error(json.error || "Failed to load");
      setPhotos(json.photos ?? []);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  async function feature(id: string, scope: "week" | "month" | null) {
    if (!effectiveToken) {
      setMsg("Enter PHOTO_ADMIN_TOKEN first.");
      return;
    }

    setMsg(null);
    const res = await fetch("/api/photos/feature", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${effectiveToken}`
      },
      body: JSON.stringify({ id, scope })
    });

    const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !json?.ok) {
      setMsg(json?.error || `Failed (${res.status})`);
      return;
    }

    await load();
  }

  function saveToken() {
    const t = token.trim();
    if (!t) return;
    window.localStorage.setItem("PHOTO_ADMIN_TOKEN", t);
    setSavedToken(t);
    setToken("");
    setMsg("Saved token locally in this browser.");
  }

  function clearToken() {
    window.localStorage.removeItem("PHOTO_ADMIN_TOKEN");
    setSavedToken(null);
    setToken("");
    setMsg("Cleared saved token.");
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <h1 className="font-display text-3xl tracking-tight text-ink-950">Admin · Featured photos</h1>
      <p className="mt-2 text-sm text-ink-700">
        Pick a “photo of the week” / “photo of the month”.
        <br />
        Security note: this page stores the admin token in your browser localStorage.
      </p>

      <div className="mt-6 grid gap-3 rounded-2xl bg-white/75 p-5 shadow-cloud ring-1 ring-ink-900/10 backdrop-blur">
        <div className="text-sm font-semibold text-ink-900">PHOTO_ADMIN_TOKEN</div>
        <div className="flex flex-wrap gap-3">
          <input
            className="min-w-[280px] flex-1 rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder={savedToken ? "(token saved in this browser)" : "paste token here"}
          />
          <button
            className="rounded-xl bg-ink-950 px-4 py-2 text-sm font-semibold text-white shadow-glow hover:bg-ink-900"
            onClick={saveToken}
          >
            Save
          </button>
          <button
            className="rounded-xl bg-white/80 px-4 py-2 text-sm font-semibold text-ink-950 ring-1 ring-ink-900/10 hover:bg-white"
            onClick={clearToken}
          >
            Clear
          </button>
          <button
            className="rounded-xl bg-white/80 px-4 py-2 text-sm font-semibold text-ink-950 ring-1 ring-ink-900/10 hover:bg-white"
            onClick={load}
          >
            Refresh
          </button>
        </div>
        {msg ? <div className="text-sm text-ink-800">{msg}</div> : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? <div className="text-sm text-ink-700">Loading…</div> : null}
        {photos.map((p) => (
          <div key={p.id} className="rounded-2xl bg-white/75 p-5 shadow-cloud ring-1 ring-ink-900/10 backdrop-blur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image_url}
              alt={p.title}
              className="h-48 w-full rounded-xl object-cover ring-1 ring-ink-900/10"
              loading="lazy"
            />
            <div className="mt-4">
              <div className="font-semibold text-ink-950">{p.title}</div>
              <div className="mt-1 text-xs text-ink-600">{formatDate(p.created_at)}</div>
              {p.caption ? <p className="mt-3 text-sm text-ink-700">{p.caption}</p> : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  className="rounded-xl bg-ink-950 px-3 py-2 text-xs font-semibold text-white hover:bg-ink-900"
                  onClick={() => feature(p.id, "week")}
                >
                  Set week
                </button>
                <button
                  className="rounded-xl bg-ink-950 px-3 py-2 text-xs font-semibold text-white hover:bg-ink-900"
                  onClick={() => feature(p.id, "month")}
                >
                  Set month
                </button>
                <button
                  className="rounded-xl bg-white/80 px-3 py-2 text-xs font-semibold text-ink-950 ring-1 ring-ink-900/10 hover:bg-white"
                  onClick={() => feature(p.id, null)}
                >
                  Unfeature
                </button>
              </div>
              {p.featured_scope ? (
                <div className="mt-3 text-xs font-semibold text-ink-700">Featured: {p.featured_scope}</div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
