import Link from "next/link";
import { Card, Container, Pill } from "../components/ui";

export const metadata = {
  title: "How to identify clouds",
  description:
    "A fast, practical guide to cloud identification: the 10 WMO genera, the finger test, halos vs coronas, and classic weather patterns."
};

export default function GuidePage() {
  return (
    <main className="py-12">
      <Container>
        <Pill>Guide</Pill>
        <h1 className="mt-4 font-display text-4xl tracking-tight text-ink-950">
          How to identify clouds (without guessing)
        </h1>
        <p className="mt-3 max-w-3xl text-ink-800">
          This site uses the WMO (World Meteorological Organization) cloud classification as the backbone.
          The goal is practical: figure out what you’re seeing, and what it usually implies — without pretending
          clouds are perfect weather predictors.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Card>
            <h2 className="font-semibold">The 10 official “genera” (WMO)</h2>
            <p className="mt-2 text-sm text-ink-700">
              Every cloud you see belongs to one (and only one) genus.
            </p>
            <ul className="mt-4 grid list-disc gap-x-8 gap-y-2 pl-5 text-sm text-ink-700 sm:grid-cols-2">
              <li>Cirrus (Ci)</li>
              <li>Cirrocumulus (Cc)</li>
              <li>Cirrostratus (Cs)</li>
              <li>Altocumulus (Ac)</li>
              <li>Altostratus (As)</li>
              <li>Nimbostratus (Ns)</li>
              <li>Stratocumulus (Sc)</li>
              <li>Stratus (St)</li>
              <li>Cumulus (Cu)</li>
              <li>Cumulonimbus (Cb)</li>
            </ul>
            <p className="mt-4 text-xs text-ink-600">
              Tip: “nimbo-” implies precipitation; “strato-” implies layers; “cumulo-” implies heaps; “cirro-” implies high/ice.
            </p>
          </Card>

          <Card>
            <h2 className="font-semibold">The finger test (for ‘mackerel sky’ clouds)</h2>
            <p className="mt-2 text-sm text-ink-700">
              If the sky is full of little bumps/ripples, hold up your hand at arm’s length and compare the size
              of the cloud elements.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-700">
              <li>
                <span className="font-semibold">Cirrocumulus:</span> tiny grains &lt; ~1° (about your little finger width).
              </li>
              <li>
                <span className="font-semibold">Altocumulus:</span> 1–5° (bigger than little finger, smaller than ~3 fingers).
              </li>
              <li>
                <span className="font-semibold">Stratocumulus:</span> &gt; ~5° (≈ three fingers or more).
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="font-semibold">Halos vs coronas</h2>
            <p className="mt-2 text-sm text-ink-700">
              A quick optical clue that narrows the search.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-700">
              <li>
                <span className="font-semibold">Halo</span> around the Sun/Moon → commonly <span className="font-semibold">cirrostratus</span> (ice crystals).
              </li>
              <li>
                <span className="font-semibold">Corona</span> (colored ring close to the Sun/Moon) → can happen with thin <span className="font-semibold">altocumulus</span>.
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="font-semibold">A classic pattern: warm-front approach</h2>
            <p className="mt-2 text-sm text-ink-700">
              One common progression (not guaranteed) is clouds thickening and lowering:
            </p>
            <div className="mt-4 rounded-xl bg-white/70 p-4 text-sm text-ink-800 ring-1 ring-ink-900/10">
              Cirrus → Cirrostratus → Altostratus → (lower) Stratus/Nimbostratus
            </div>
            <p className="mt-3 text-xs text-ink-600">
              This is why thin high veils can be the opening act for later steady rain.
            </p>
          </Card>
        </div>

        <div className="mt-10">
          <Link className="text-sm font-semibold text-ink-900 hover:text-ink-700" href="/atlas">
            Browse the Cloud Atlas →
          </Link>
        </div>
      </Container>
    </main>
  );
}
