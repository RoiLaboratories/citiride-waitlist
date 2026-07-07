create extension if not exists "pgcrypto";

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  state_city text not null,
  email text not null,
  category text not null check (category in ('Driver', 'Rider')),
  created_at timestamptz not null default now()
);

-- create unique index if not exists waitlist_entries_email_idx
--   on public.waitlist_entries (lower(email));

create index if not exists waitlist_entries_category_created_at_idx
  on public.waitlist_entries (category, created_at desc);

alter table public.waitlist_entries enable row level security;

comment on table public.waitlist_entries is
  'Stores CitiRide waitlist registrations submitted through the backend service.';
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (lower(email));

alter table public.newsletter_subscribers enable row level security;

comment on table public.newsletter_subscribers is
  'Stores CitiRide newsletter and update subscriptions submitted through the backend service.';
-- Row Level Security policies
-- These tables are write-only for public form submissions. No select, update,
-- or delete policies are defined, so client roles cannot read or mutate records
-- after insertion. The Node backend still uses the Supabase service role key,
-- which bypasses RLS for trusted server-side inserts and duplicate checks.

grant usage on schema public to anon, authenticated;
grant insert on table public.waitlist_entries to anon, authenticated;
grant insert on table public.newsletter_subscribers to anon, authenticated;

drop policy if exists "Allow public waitlist registrations" on public.waitlist_entries;
create policy "Allow public waitlist registrations"
  on public.waitlist_entries
  for insert
  to anon, authenticated
  with check (
    full_name is not null
    and length(trim(full_name)) > 0
    and state_city is not null
    and length(trim(state_city)) > 0
    and email is not null
    and length(trim(email)) > 0
    and category in ('Driver', 'Rider')
  );

drop policy if exists "Allow public newsletter subscriptions" on public.newsletter_subscribers;
create policy "Allow public newsletter subscriptions"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (
    email is not null
    and length(trim(email)) > 0
  );
