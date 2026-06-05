```sql
-- Chiroptère BXL database schema
-- Target: Supabase Postgres
-- Auth provider: Supabase Auth with Google OAuth
-- No public profiles table.
-- User display data comes directly from Google/Supabase Auth metadata in the app.

create extension if not exists "pgcrypto";

-- =========================
-- Sites
-- =========================

create table public.sites (
  id uuid primary key default gen_random_uuid(),

  -- Owner is the authenticated Supabase user.
  -- Display name/avatar/email are NOT stored here.
  owner_id uuid not null references auth.users(id) on delete cascade,

  name text not null,
  type text not null check (type in ('water', 'transect')),
  acronym text,

  latitude double precision,
  longitude double precision,

  description text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index sites_owner_id_idx on public.sites(owner_id);


-- =========================
-- Monitoring sessions
-- =========================

create table public.monitoring_sessions (
  id uuid primary key default gen_random_uuid(),

  site_id uuid not null references public.sites(id) on delete cascade,

  -- User who created the session.
  -- This is the logged-in Supabase user.
  created_by uuid not null references auth.users(id) on delete cascade,

  started_at timestamptz,
  ended_at timestamptz,

  status text not null default 'draft'
    check (status in ('draft', 'active', 'completed')),

  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index monitoring_sessions_site_id_idx on public.monitoring_sessions(site_id);
create index monitoring_sessions_created_by_idx on public.monitoring_sessions(created_by);


-- =========================
-- Session volunteers / counters
-- =========================

create table public.session_participants (
  id uuid primary key default gen_random_uuid(),

  session_id uuid not null references public.monitoring_sessions(id) on delete cascade,

  -- Free text name because not every volunteer needs an account.
  full_name text not null,

  -- Optional role for display/export.
  role text not null default 'counter'
    check (role in ('main_counter', 'counter', 'observer', 'other')),

  created_at timestamptz not null default now()
);

create index session_participants_session_id_idx
  on public.session_participants(session_id);


-- =========================
-- Monitoring points
-- =========================

create table public.monitoring_points (
  id uuid primary key default gen_random_uuid(),

  session_id uuid not null references public.monitoring_sessions(id) on delete cascade,

  label text not null,
  position integer not null,

  started_at timestamptz,
  ended_at timestamptz,

  notes text,

  status text not null default 'todo'
    check (status in ('todo', 'active', 'completed')),

  created_at timestamptz not null default now(),

  unique (session_id, position)
);

create index monitoring_points_session_id_idx
  on public.monitoring_points(session_id);


-- =========================
-- Bat groups
-- =========================

create table public.bat_groups (
  id uuid primary key default gen_random_uuid(),

  code text not null unique,
  name text not null,

  created_at timestamptz not null default now()
);


-- =========================
-- Bat species
-- =========================

create table public.bat_species (
  id uuid primary key default gen_random_uuid(),

  group_id uuid not null references public.bat_groups(id) on delete cascade,

  code text not null unique,
  common_name text not null,
  scientific_name text,

  created_at timestamptz not null default now()
);

create index bat_species_group_id_idx
  on public.bat_species(group_id);


-- =========================
-- Observations
-- =========================

create table public.observations (
  id uuid primary key default gen_random_uuid(),

  point_id uuid not null references public.monitoring_points(id) on delete cascade,

  -- A contact can be counted at group level.
  group_id uuid references public.bat_groups(id),

  -- Species detail is optional.
  species_id uuid references public.bat_species(id),

  count integer not null default 0 check (count >= 0),

  -- Example: one interval every 10 seconds.
  interval_index integer check (interval_index >= 0),

  is_max boolean not null default false,

  observed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),

  -- At least one biological classification must be present.
  check (group_id is not null or species_id is not null)
);

create index observations_point_id_idx
  on public.observations(point_id);

create index observations_group_id_idx
  on public.observations(group_id);

create index observations_species_id_idx
  on public.observations(species_id);
```