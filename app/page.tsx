import { Button, Card, Container, Pill } from "./components/ui";
import { FEATURED_LOCATIONS } from "./lib/forecast";

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <Container>
          <div className="py-14 sm:py-20">
            <div className="max-w-2xl">
              <Pill>Beta · built for ireallylikeclouds.xyz</Pill>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-ink-950 sm:text-6xl">
                The internet’s nicest way to figure out what you’re seeing in the sky.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-800">
                Identify clouds from a photo, learn what they mean, and get a simple forecast for the next beautiful sky moment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/identify">Identify a cloud</Button>
                <Button href="/photos" kind="secondary">
                  Browse cloud photos
                </Button>
                <Button href="/forecast" kind="secondary">
                  Check the sky forecast
                </Button>
                <Button href="/guide" kind="secondary">
                  Learn to identify clouds
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3">
              <Card>
                <h3 className="font-semibold">Cloud Atlas</h3>
                <p className="mt-2 text-sm text-ink-700">Fast, clear guides you can actually use outside.</p>
              </Card>
              <Card>
                <h3 className="font-semibold">Sky Moment Score</h3>
                <p className="mt-2 text-sm text-ink-700">A simple heuristic: you want texture — not a blank blue sheet, not a gray lid.</p>
              </Card>
              <Card>
                <h3 className="font-semibold">Shareable results</h3>
                <p className="mt-2 text-sm text-ink-700">Permalinks + beautiful previews (OG image) for easy posting.</p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl tracking-tight text-ink-950 sm:text-3xl">Featured sky forecasts</h2>
              <p className="mt-2 text-sm text-ink-700">Quick links while we build search + geolocation.</p>
            </div>
            <Button href="/forecast" kind="secondary">All locations</Button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {FEATURED_LOCATIONS.slice(0, 6).map((loc) => (
              <a
                key={`${loc.country}-${loc.name}`}
                href={`/forecast/${loc.country.toLowerCase()}/${encodeURIComponent(loc.name.toLowerCase().replace(/\s+/g, "-"))}?lat=${loc.lat}&lon=${loc.lon}&tz=${encodeURIComponent(loc.tz)}&name=${encodeURIComponent(loc.name)}`}
                className="group rounded-2xl bg-white/70 p-5 ring-1 ring-ink-900/10 backdrop-blur transition hover:bg-white"
              >
                <div className="text-sm font-semibold text-ink-950 group-hover:text-ink-800">{loc.name}</div>
                <div className="mt-1 text-xs text-ink-600">{loc.country} · {loc.tz}</div>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
