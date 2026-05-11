-- Migration: add featured photo support (photo of the week/month)

alter table public.cloud_photos
  add column if not exists featured_scope text null
  check (featured_scope in ('week','month'));

create unique index if not exists cloud_photos_featured_scope_unique
  on public.cloud_photos (featured_scope)
  where featured_scope is not null;
