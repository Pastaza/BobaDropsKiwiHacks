import { Card, Container } from "../components/ui";
import { ATLAS } from "../lib/atlas";

export const metadata = {
  title: "Cloud Atlas"
};

export default function AtlasIndex() {
  return (
    <main className="py-12">
      <Container>
        <h1 className="font-display text-4xl tracking-tight text-ink-950">Cloud Atlas</h1>
        <p className="mt-3 max-w-2xl text-ink-800">
          Fast, practical guides for spotting clouds and understanding what they usually mean.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ATLAS.map((e) => (
            <a key={e.slug} href={`/atlas/${e.slug}`}>
              <Card className="transition hover:bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink-950">{e.name}</h2>
                  <span className="text-xs text-ink-600">Read →</span>
                </div>
                <p className="mt-2 text-sm text-ink-700">{e.summary}</p>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </main>
  );
}
