# ireallylikeclouds.xyz

A delightful, high-performance cloud identification + sky forecast site.

## Features (MVP)
- **Cloud Atlas**: fast, SEO-friendly guides for common cloud types.
- **Local sky forecast**: a simple “sky moment” view powered by Open-Meteo (no API key).
- **Identify (beta)**: upload a sky photo and get a best-effort ID.
  - If `OPENAI_API_KEY` is set, the server uses vision to generate a richer result.
  - If not set, the app falls back to a friendly, non-blocking placeholder.
- **Cloud photo threads (beta)**: a community feed powered by GitHub issues (no extra infra).
  - Default repo: `Pastaza/BobaDropsKiwiHacks`
  - Label: `cloud-photo`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment variables (optional)
Create `.env.local`:

```bash
OPENAI_API_KEY=...
SITE_URL=https://ireallylikeclouds.xyz

# Community photo feed (choose one)

## Option A: GitHub issues (default, $0 infra)
PHOTO_THREADS_REPO=Pastaza/BobaDropsKiwiHacks
PHOTO_THREADS_LABEL=cloud-photo
# Optional: increases GitHub API rate limits
GITHUB_TOKEN=...

## Option B: Supabase (real backend)
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_PHOTO_BUCKET=cloud-photos
# Used by /api/photos/approve (basic admin approval step)
PHOTO_ADMIN_TOKEN=...
# Optional: by default uploads are auto-approved (open to the public).
# Set to false if you want moderation first.
PHOTO_AUTO_APPROVE=true

# Admin page (feature photos)
# Visit /admin/photos and paste PHOTO_ADMIN_TOKEN into the page once.
```

## Deploy
Works great on Vercel.

- Set `SITE_URL` to your production URL (used for absolute metadata in a few places).
- Point `ireallylikeclouds.xyz` at the deployment.

