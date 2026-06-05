```sql
-- =========================
-- Enable RLS
-- =========================

alter table public.sites enable row level security;
alter table public.monitoring_sessions enable row level security;
alter table public.session_participants enable row level security;
alter table public.monitoring_points enable row level security;
alter table public.observations enable row level security;

alter table public.bat_groups enable row level security;
alter table public.bat_species enable row level security;


-- =========================
-- Public read for reference tables
-- =========================

create policy "Anyone can read bat groups"
on public.bat_groups
for select
to authenticated
using (true);

create policy "Anyone can read bat species"
on public.bat_species
for select
to authenticated
using (true);


-- =========================
-- Sites policies
-- =========================

create policy "Users can read their own sites"
on public.sites
for select
to authenticated
using (owner_id = auth.uid());

create policy "Users can create their own sites"
on public.sites
for insert
to authenticated
with check (owner_id = auth.uid());

create policy "Users can update their own sites"
on public.sites
for update
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Users can delete their own sites"
on public.sites
for delete
to authenticated
using (owner_id = auth.uid());


-- =========================
-- Sessions policies
-- =========================

create policy "Users can read their own sessions"
on public.monitoring_sessions
for select
to authenticated
using (created_by = auth.uid());

create policy "Users can create their own sessions"
on public.monitoring_sessions
for insert
to authenticated
with check (created_by = auth.uid());

create policy "Users can update their own sessions"
on public.monitoring_sessions
for update
to authenticated
using (created_by = auth.uid())
with check (created_by = auth.uid());

create policy "Users can delete their own sessions"
on public.monitoring_sessions
for delete
to authenticated
using (created_by = auth.uid());

-- =========================
-- Participants policies
-- =========================

create policy "Users can read participants from their sessions"
on public.session_participants
for select
to authenticated
using (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = session_participants.session_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can create participants in their sessions"
on public.session_participants
for insert
to authenticated
with check (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = session_participants.session_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can update participants from their sessions"
on public.session_participants
for update
to authenticated
using (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = session_participants.session_id
    and s.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = session_participants.session_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can delete participants from their sessions"
on public.session_participants
for delete
to authenticated
using (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = session_participants.session_id
    and s.created_by = auth.uid()
  )
);


-- =========================
-- Points policies
-- =========================

create policy "Users can read points from their sessions"
on public.monitoring_points
for select
to authenticated
using (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = monitoring_points.session_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can create points in their sessions"
on public.monitoring_points
for insert
to authenticated
with check (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = monitoring_points.session_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can update points from their sessions"
on public.monitoring_points
for update
to authenticated
using (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = monitoring_points.session_id
    and s.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = monitoring_points.session_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can delete points from their sessions"
on public.monitoring_points
for delete
to authenticated
using (
  exists (
    select 1
    from public.monitoring_sessions s
    where s.id = monitoring_points.session_id
    and s.created_by = auth.uid()
  )
);


-- =========================
-- Observations policies
-- =========================

create policy "Users can read observations from their sessions"
on public.observations
for select
to authenticated
using (
  exists (
    select 1
    from public.monitoring_points p
    join public.monitoring_sessions s on s.id = p.session_id
    where p.id = observations.point_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can create observations in their sessions"
on public.observations
for insert
to authenticated
with check (
  exists (
    select 1
    from public.monitoring_points p
    join public.monitoring_sessions s on s.id = p.session_id
    where p.id = observations.point_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can update observations from their sessions"
on public.observations
for update
to authenticated
using (
  exists (
    select 1
    from public.monitoring_points p
    join public.monitoring_sessions s on s.id = p.session_id
    where p.id = observations.point_id
    and s.created_by = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.monitoring_points p
    join public.monitoring_sessions s on s.id = p.session_id
    where p.id = observations.point_id
    and s.created_by = auth.uid()
  )
);

create policy "Users can delete observations from their sessions"
on public.observations
for delete
to authenticated
using (
  exists (
    select 1
    from public.monitoring_points p
    join public.monitoring_sessions s on s.id = p.session_id
    where p.id = observations.point_id
    and s.created_by = auth.uid()
  )
);
```