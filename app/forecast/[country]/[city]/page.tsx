import { Container, Card, Pill } from "../../../components/ui";
import { getOpenMeteoHourly, scoreSkyMoment } from "../../../lib/forecast";

export const dynamic = "force-dynamic";

function isGoldenHour(h: number) {
  return h === 6 || h === 7 || h === 18 || h === 19;
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

function hourFromOpenMeteoTime(t: string) {
  // Open-Meteo returns local times like "YYYY-MM-DDTHH:00" when timezone is set.
  const h = Number(t.slice(11, 13));
  return Number.isFinite(h) ? h : 0;
}

export default async function ForecastCityPage({
  searchParams
}: {
  params: Promise<{ country: string; city: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const lat = Number(sp.lat);
  const lon = Number(sp.lon);
  const tz = typeof sp.tz === "string" ? sp.tz : "UTC";
  const name = typeof sp.name === "string" ? sp.name : "Selected location";

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return (
      <main className="py-12">
        <Container>
          <Card>
            <h1 className="text-lg font-semibold">Missing coordinates</h1>
            <p className="mt-2 text-sm text-ink-700">
              This page needs <code>lat</code> and <code>lon</code> query params.
            </p>
          </Card>
        </Container>
      </main>
    );
  }

  const data = await getOpenMeteoHourly(lat, lon, tz);

  const nowKey = nowKeyInTz(tz);

  const moments = data.hourly.time.slice(0, 24).map((t, i) => {
    const hour = hourFromOpenMeteoTime(t);

    const cloudCover = data.hourly.cloud_cover[i];
    const cloudLow = data.hourly.cloud_cover_low[i];
    const cloudMid = data.hourly.cloud_cover_mid[i];
    const cloudHigh = data.hourly.cloud_cover_high[i];

    const visKm = data.hourly.visibility[i] / 1000;
    const precipProb = data.hourly.precipitation_probability[i];
    const precipMm = data.hourly.precipitation[i];
    const windKph = data.hourly.wind_speed_10m[i];

    const scored = scoreSkyMoment({
      cloudCover,
      cloudLow,
      cloudMid,
      cloudHigh,
      precipProb,
      precipMm,
      visibilityKm: visKm,
      windKph,
      isGoldenHour: isGoldenHour(hour),
      isNight: hour < 6 || hour > 21
    });

    return {
      time: t,
      hour,
      isNow: t.startsWith(nowKey),
      isPast: t < nowKey,
      cloudCover,
      cloudLow,
      cloudMid,
      cloudHigh,
      visKm,
      precipProb,
      windKph,
      score: scored.score,
      note: scored.note
    };
  });

  const best = [...moments].sort((a, b) => b.score - a.score)[0];

  return (
    <main className="py-12">
      <Container>
        <Pill>Sky forecast</Pill>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink-950">{name}</h1>
        <p className="mt-3 max-w-2xl text-ink-800">
          A simple cloud-based score (0–100) for the next ~24 hours. Powered by Open‑Meteo.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="sm:col-span-1">
            <h2 className="font-semibold">Best moment (next 24h)</h2>
            <p className="mt-3 text-3xl font-semibold text-ink-950">{best.score}/100</p>
            <p className="mt-2 text-sm text-ink-700">{best.note}</p>
            <div className="mt-4 text-xs text-ink-600">
              Clouds: {best.cloudCover}% (low {best.cloudLow} / mid {best.cloudMid} / high {best.cloudHigh}) · Visibility: {best.visKm.toFixed(1)} km
            </div>
          </Card>

          <Card className="sm:col-span-2">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-semibold">Next 24 hours</h2>
              <div className="text-xs text-ink-600">Highlighted: current hour</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {moments.map((m) => {
                const cls = m.isNow
                  ? "rounded-xl bg-ink-950/5 p-3 ring-2 ring-ink-950/30"
                  : m.isPast
                    ? "rounded-xl bg-white/60 p-3 ring-1 ring-ink-900/10 opacity-70"
                    : "rounded-xl bg-white/70 p-3 ring-1 ring-ink-900/10";

                return (
                  <div key={m.time} className={cls}>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-ink-600">{String(m.hour).padStart(2, "0")}:00</div>
                      {m.isNow ? <span className="text-[11px] font-semibold text-ink-900">Now</span> : null}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-ink-950">{m.score}</div>
                    <div className="mt-1 text-xs text-ink-600">{m.cloudCover}% clouds</div>
                    <div className="mt-1 text-[11px] text-ink-600">
                      {m.precipProb}% rain · {Math.round(m.windKph)} kph
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-ink-600">
              This is v1: it’s intentionally simple. Later we’ll add horizon breaks, precipitation, wind shear, and camera-based validation.
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
