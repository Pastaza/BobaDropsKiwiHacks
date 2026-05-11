-- Supabase schema for ireallylikeclouds.xyz cloud photo feed
--
-- Suggested usage:
-- 1) Create a public Storage bucket: cloud-photos
-- 2) Run this SQL in the Supabase SQL editor
-- 3) Keep writes server-side using SUPABASE_SERVICE_ROLE_KEY (simplest for MVP)

create table if not exists public.cloud_photos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  caption text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  storage_path text not null
);

create index if not exists cloud_photos_created_at_idx on public.cloud_photos (created_at desc);
create index if not exists cloud_photos_status_idx on public.cloud_photos (status);

-- Optional: if you later want to read directly from the client with anon key,
-- you can enable RLS and add policies. For now we keep it server-side.
