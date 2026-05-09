import { notFound } from "next/navigation";
import { Card, Container, Pill } from "../../components/ui";
import { ATLAS, getAtlasEntry } from "../../lib/atlas";

export function generateStaticParams() {
  return ATLAS.map((e) => ({ slug: e.slug }));
}

function jsonLd(entry: { name: string; summary: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.name,
    description: entry.summary,
    mainEntityOfPage: { "@type": "WebPage", "@id": `/atlas/${entry.slug}` },
    author: { "@type": "Organization", name: "I Really Like Clouds" }
  };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getAtlasEntry(slug);
  if (!entry) return { title: "Cloud Atlas" };
  return {
    title: entry.name,
    description: entry.summary
  };
}

export default async function AtlasEntryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getAtlasEntry(slug);
  if (!entry) return notFound();

  return (
    <main className="py-12">
      <Container>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(entry)) }}
        />
        <Pill>Cloud Atlas</Pill>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink-950">{entry.name}</h1>
        <p className="mt-3 max-w-2xl text-ink-800">{entry.summary}</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Card>
            <h2 className="font-semibold">How to spot it</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-700">
              {entry.spotting.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-semibold">What it can mean</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-700">
              {entry.meaning.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-semibold">Photography tips</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-ink-700">
              {entry.photography.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-10">
          <a className="text-sm font-semibold text-ink-900 hover:text-ink-700" href="/identify">
            Identify a cloud from a photo →
          </a>
        </div>
      </Container>
    </main>
  );
}
