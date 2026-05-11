import { Button, Card, Container, Pill } from "../components/ui";
import { getPhotoThreads } from "../lib/photos";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return iso;
  }
}

export default async function PhotosPage() {
  const threads = await getPhotoThreads();

  const repo = process.env.PHOTO_THREADS_REPO ?? "Pastaza/BobaDropsKiwiHacks";
  const label = process.env.PHOTO_THREADS_LABEL ?? "cloud-photo";

  const newIssueUrl = `https://github.com/${repo}/issues/new?labels=${encodeURIComponent(label)}&title=${encodeURIComponent(
    "Cloud photo: "
  )}&body=${encodeURIComponent(
    [
      "Upload (drag & drop) a single cloud photo and share a few details:",
      "",
      "- Location (optional):",
      "- Date/time (optional):",
      "- Cloud guess (optional):",
      "- Camera / lens (optional):",
      "",
      "Tip: keep it cloud-only 🌥️",
      "",
      "(This is a beta community feed; moderation is light for now.)"
    ].join("\n")
  )}`;

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Pill>Community beta</Pill>
            <h1 className="mt-4 font-display text-3xl tracking-tight text-ink-950 sm:text-4xl">Cloud photo threads</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              A simple, photographer-friendly place to share cloud shots. For now this feed is powered by GitHub issues (free,
              no logins on our side).
            </p>
          </div>
          <div className="flex gap-3">
            <Button href={newIssueUrl}>Share a cloud photo</Button>
            <Button href="/identify" kind="secondary">
              Identify
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {threads.length === 0 ? (
            <Card>
              <h2 className="font-semibold">No photos yet</h2>
              <p className="mt-2 text-sm text-ink-700">
                Be the first: click “Share a cloud photo”, attach your image, and it will appear here.
              </p>
            </Card>
          ) : (
            threads.map((t) => (
              <a key={t.id} href={t.url} className="group">
                <Card className="h-full transition group-hover:bg-white">
                  {t.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.imageUrl}
                      alt={t.title}
                      className="h-48 w-full rounded-xl object-cover ring-1 ring-ink-900/10"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center rounded-xl bg-ink-950/5 text-sm text-ink-700 ring-1 ring-ink-900/10">
                      (image in thread)
                    </div>
                  )}

                  <div className="mt-4">
                    <div className="font-semibold text-ink-950 group-hover:text-ink-800">{t.title}</div>
                    <div className="mt-1 text-xs text-ink-600">
                      @{t.authorLogin} · {formatDate(t.createdAt)}
                    </div>
                    <div className="mt-3 text-xs text-ink-700">Open thread →</div>
                  </div>
                </Card>
              </a>
            ))
          )}
        </div>

        <div className="mt-10 text-sm text-ink-700">
          <p>
            Want this fully on-site (uploads, profiles, moderation)? That’s on the roadmap — this GitHub-backed approach lets us
            start immediately with $0 infrastructure.
          </p>
        </div>
      </Container>
    </main>
  );
}
