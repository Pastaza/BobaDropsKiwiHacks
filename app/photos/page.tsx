import { unstable_noStore as noStore } from "next/cache";
import { Button, Card, Container, Pill } from "../components/ui";
import { getPhotoThreads } from "../lib/photos";
import { getFeaturedCloudPhoto, listApprovedCloudPhotos } from "../lib/photos-supabase";

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
  // This page should reflect new uploads quickly.
  // (Avoids confusion when someone uploads and the gallery looks empty due to caching.)
  noStore();
  const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  const featuredWeek = hasSupabase ? await getFeaturedCloudPhoto("week") : null;
  const featuredMonth = hasSupabase ? await getFeaturedCloudPhoto("month") : null;
  const photos = hasSupabase ? await listApprovedCloudPhotos() : [];
  const threads = !hasSupabase ? await getPhotoThreads() : [];

  const repo = process.env.PHOTO_THREADS_REPO ?? "Pastaza/BobaDropsKiwiHacks";
  const label = process.env.PHOTO_THREADS_LABEL ?? "cloud-photo";

  // If Supabase is configured, uploads happen on-site. Otherwise we use GitHub issues.
  const shareUrl = hasSupabase
    ? "/photos/new"
    : `https://github.com/${repo}/issues/new?template=${encodeURIComponent("cloud-photo.yml")}&labels=${encodeURIComponent(
        label
      )}&title=${encodeURIComponent("Cloud photo: ")}`;

  return (
    <main className="py-10">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <Pill>Community beta</Pill>
            <h1 className="mt-4 font-display text-3xl tracking-tight text-ink-950 sm:text-4xl">Cloud photo threads</h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              A simple, photographer-friendly place to share cloud shots. We can run this either with GitHub issues ($0) or
              Supabase (a real backend).
            </p>
          </div>
          <div className="flex gap-3">
            <Button href={shareUrl}>Share a cloud photo</Button>
            <Button href="/identify" kind="secondary">
              Identify
            </Button>
          </div>
        </div>

        {hasSupabase && (featuredWeek || featuredMonth) ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {featuredWeek ? (
              <Card>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredWeek.image_url}
                  alt={featuredWeek.title}
                  className="h-64 w-full rounded-xl object-cover ring-1 ring-ink-900/10"
                  loading="lazy"
                />
                <div className="mt-4">
                  <Pill>Photo of the week</Pill>
                  <div className="mt-2 font-semibold text-ink-950">{featuredWeek.title}</div>
                  {featuredWeek.caption ? <p className="mt-2 text-sm text-ink-700">{featuredWeek.caption}</p> : null}
                </div>
              </Card>
            ) : null}

            {featuredMonth ? (
              <Card>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredMonth.image_url}
                  alt={featuredMonth.title}
                  className="h-64 w-full rounded-xl object-cover ring-1 ring-ink-900/10"
                  loading="lazy"
                />
                <div className="mt-4">
                  <Pill>Photo of the month</Pill>
                  <div className="mt-2 font-semibold text-ink-950">{featuredMonth.title}</div>
                  {featuredMonth.caption ? <p className="mt-2 text-sm text-ink-700">{featuredMonth.caption}</p> : null}
                </div>
              </Card>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hasSupabase ? (
            photos.length === 0 ? (
              <Card>
                <h2 className="font-semibold">No approved photos yet</h2>
                <p className="mt-2 text-sm text-ink-700">
                  Upload one with “Share a cloud photo”. New uploads start as <span className="font-semibold">pending</span>
                  until approved.
                </p>
              </Card>
            ) : (
              photos.map((p) => (
                <Card key={p.id} className="h-full">
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
                  </div>
                </Card>
              ))
            )
          ) : threads.length === 0 ? (
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
