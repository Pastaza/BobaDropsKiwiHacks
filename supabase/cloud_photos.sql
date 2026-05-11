-- Supabase schema for ireallylikeclouds.xyz cloud photo feed
--
-- Run this in Supabase SQL Editor.
--
-- Notes:
-- - Image bytes live in Supabase Storage (bucket: cloud-photos)
-- - Photo metadata lives in Postgres (table: public.cloud_photos)
-- - Our app writes server-side using SUPABASE_SERVICE_ROLE_KEY.

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- Optional: create the storage bucket via SQL (you can also do this in the UI)
insert into storage.buckets (id, name, public)
values ('cloud-photos', 'cloud-photos', true)
on conflict (id) do nothing;

create extension if not exists pgcrypto;

create table if not exists public.cloud_photos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  caption text,
  status text not null default 'approved' check (status in ('pending','approved','rejected')),
  storage_path text not null,
  featured_scope text null check (featured_scope in ('week','month'))
);

-- At most one featured photo per scope.
create unique index if not exists cloud_photos_featured_scope_unique
  on public.cloud_photos (featured_scope)
  where featured_scope is not null;

create index if not exists cloud_photos_created_at_idx on public.cloud_photos (created_at desc);
create index if not exists cloud_photos_status_idx on public.cloud_photos (status);

-- Optional: if you later want to read directly from the client with anon key,
-- you can enable RLS and add policies. For now we keep it server-side.
