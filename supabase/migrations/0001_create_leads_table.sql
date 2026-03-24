-- Create leads table for capturing website contact form submissions and CTA signups
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  service     text,
  message     text,
  source      text not null default 'website',
  created_at  timestamptz not null default now(),

  constraint leads_email_source_unique unique (email, source)
);

-- Indexes
create index if not exists leads_email_idx    on public.leads (email);
create index if not exists leads_source_idx   on public.leads (source);
create index if not exists leads_created_idx  on public.leads (created_at desc);

-- Row-level security
alter table public.leads enable row level security;

-- Only service-role (server actions / admin) can read/write rows
create policy "service_role_all" on public.leads
  for all
  to service_role
  using (true)
  with check (true);

-- Anon role may INSERT (contact form / CTA) but never read
create policy "anon_insert" on public.leads
  for insert
  to anon
  with check (true);
