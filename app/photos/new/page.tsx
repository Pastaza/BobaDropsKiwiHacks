import { Button, Card, Container, Pill } from "../../components/ui";

export default function NewPhotoPage() {
  return (
    <main className="py-10">
      <Container>
        <div className="max-w-2xl">
          <Pill>Community beta</Pill>
          <h1 className="mt-4 font-display text-3xl tracking-tight text-ink-950 sm:text-4xl">Share a cloud photo</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            Upload one cloud photo. Submissions start as <span className="font-semibold">pending</span> until approved.
          </p>

          <Card className="mt-6">
            <form action="/api/photos/upload" method="post" encType="multipart/form-data" className="grid gap-4">
              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-ink-900">Title</span>
                <input
                  name="title"
                  required
                  defaultValue="Cloud photo"
                  className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-ink-900">Caption (optional)</span>
                <textarea
                  name="caption"
                  rows={4}
                  placeholder="Location, date/time, cloud guess, camera/lens…"
                  className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-900/10"
                />
              </label>

              <label className="grid gap-1 text-sm">
                <span className="font-semibold text-ink-900">Photo</span>
                <input name="file" type="file" accept="image/*" required className="block text-sm" />
              </label>

              <div className="flex flex-wrap gap-3">
                <Button>Upload</Button>
                <Button href="/photos" kind="secondary">
                  Back to photos
                </Button>
              </div>

              <p className="text-xs text-ink-700">
                Please keep it cloud-only (no faces, people, or license plates). Moderation is light for now.
              </p>
            </form>
          </Card>
        </div>
      </Container>
    </main>
  );
}
