# ireallylikeclouds.xyz

A delightful, high-performance cloud identification + sky forecast site.

## Features (MVP)
- **Cloud Atlas**: fast, SEO-friendly guides for common cloud types.
- **Local sky forecast**: a simple “sky moment” view powered by Open-Meteo (no API key).
- **Identify (beta)**: upload a sky photo and get a best-effort ID.
  - If `OPENAI_API_KEY` is set, the server uses vision to generate a richer result.
  - If not set, the app falls back to a friendly, non-blocking placeholder.

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
```

## Deploy
Works great on Vercel.

- Set `SITE_URL` to your production URL (used for absolute metadata in a few places).
- Point `ireallylikeclouds.xyz` at the deployment.

