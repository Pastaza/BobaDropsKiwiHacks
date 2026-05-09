import { Card, Container } from "../components/ui";
import { FEATURED_LOCATIONS } from "../lib/forecast";

export const metadata = {
  title: "Sky Forecast"
};

export default function ForecastIndex() {
  return (
    <main className="py-12">
      <Container>
        <h1 className="font-display text-4xl tracking-tight text-ink-950">Sky forecast</h1>
        <p className="mt-3 max-w-2xl text-ink-800">
          A simple “sky moment” score for the next 48 hours. Pick a location.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {FEATURED_LOCATIONS.map((loc) => (
            <a
              key={`${loc.country}-${loc.name}`}
              href={`/forecast/${loc.country.toLowerCase()}/${encodeURIComponent(loc.name.toLowerCase().replace(/\s+/g, "-"))}?lat=${loc.lat}&lon=${loc.lon}&tz=${encodeURIComponent(loc.tz)}&name=${encodeURIComponent(loc.name)}`}
            >
              <Card className="transition hover:bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink-950">{loc.name}</h2>
                  <span className="text-xs text-ink-600">View →</span>
                </div>
                <p className="mt-2 text-sm text-ink-700">
                  {loc.country} · {loc.lat.toFixed(3)}, {loc.lon.toFixed(3)}
                </p>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </main>
  );
}
