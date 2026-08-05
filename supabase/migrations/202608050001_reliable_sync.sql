-- Chiroptère BXL: idempotent baseline, hardened authorization and atomic sync.
-- This migration is prepared for manual deployment; it must not be applied remotely automatically.

create table if not exists public.sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  type_site text not null,
  nom_site text not null,
  acronyme text not null,
  debut_session timestamptz not null,
  fin_session timestamptz,
  compteur_principal text not null,
  autres_compteurs text default '',
  nb_points_ecoute integer not null,
  detecteurs text[] default '{}',
  commentaire text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  synced_at timestamptz,
  sync_revision bigint not null default 0
);

alter table public.sessions add column if not exists sync_revision bigint not null default 0;

create table if not exists public.points (
  id text primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  numero integer not null,
  heure_debut timestamptz,
  heure_fin timestamptz,
  nb_especes integer default 0,
  statut text default 'non_demarre',
  localisation text default '',
  commentaire text default '',
  coord_x double precision,
  coord_y double precision,
  updated_at timestamptz not null default now()
);

create table if not exists public.observations (
  id uuid primary key default gen_random_uuid(),
  point_id text not null references public.points(id) on delete cascade,
  session_id uuid not null references public.sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  groupe text not null,
  espece text not null,
  total integer default 0,
  tranches integer[] default '{}'
);

create table if not exists public.species_ref (
  id uuid primary key default gen_random_uuid(),
  groupe text not null,
  espece text not null,
  espece_label text not null,
  ordre integer not null
);

create table if not exists public.supervisors (
  email text primary key,
  created_at timestamptz not null default now()
);

delete from public.species_ref a
using public.species_ref b
where a.ctid < b.ctid and a.groupe = b.groupe and a.espece = b.espece;

delete from public.observations a
using public.observations b
where a.ctid < b.ctid
  and a.point_id = b.point_id
  and a.groupe = b.groupe
  and a.espece = b.espece;

create unique index if not exists uq_species_ref_group_species
  on public.species_ref(groupe, espece);
create unique index if not exists uq_observations_point_group_species
  on public.observations(point_id, groupe, espece);
create index if not exists idx_sessions_user on public.sessions(user_id);
create index if not exists idx_points_session on public.points(session_id);
create index if not exists idx_points_user on public.points(user_id);
create index if not exists idx_observations_point on public.observations(point_id);
create index if not exists idx_observations_session on public.observations(session_id);

create or replace function public.lowercase_supervisor_email()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.email = lower(new.email);
  return new;
end;
$$;

drop trigger if exists trg_supervisors_lowercase_email on public.supervisors;
create trigger trg_supervisors_lowercase_email
  before insert or update on public.supervisors
  for each row execute function public.lowercase_supervisor_email();

create or replace function public.is_supervisor()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, auth
as $$
  select exists (
    select 1 from public.supervisors
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.current_user_is_supervisor()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public, auth
as $$ select public.is_supervisor(); $$;

revoke all on public.supervisors from anon, authenticated;
revoke all on function public.is_supervisor() from public, anon, authenticated;
revoke all on function public.current_user_is_supervisor() from public, anon;
grant execute on function public.current_user_is_supervisor() to authenticated;

alter table public.sessions enable row level security;
alter table public.points enable row level security;
alter table public.observations enable row level security;
alter table public.species_ref enable row level security;
alter table public.supervisors enable row level security;

drop policy if exists owner_select on public.sessions;
drop policy if exists owner_insert on public.sessions;
drop policy if exists owner_update on public.sessions;
drop policy if exists owner_delete on public.sessions;
create policy owner_select on public.sessions for select
  using (user_id = auth.uid() or public.is_supervisor());
create policy owner_insert on public.sessions for insert
  with check (user_id = auth.uid());
create policy owner_update on public.sessions for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy owner_delete on public.sessions for delete
  using (user_id = auth.uid());

drop policy if exists owner_select on public.points;
drop policy if exists owner_insert on public.points;
drop policy if exists owner_update on public.points;
drop policy if exists owner_delete on public.points;
create policy owner_select on public.points for select
  using (user_id = auth.uid() or public.is_supervisor());
create policy owner_insert on public.points for insert
  with check (user_id = auth.uid());
create policy owner_update on public.points for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy owner_delete on public.points for delete
  using (user_id = auth.uid());

drop policy if exists owner_select on public.observations;
drop policy if exists owner_insert on public.observations;
drop policy if exists owner_update on public.observations;
drop policy if exists owner_delete on public.observations;
create policy owner_select on public.observations for select
  using (user_id = auth.uid() or public.is_supervisor());
create policy owner_insert on public.observations for insert
  with check (user_id = auth.uid());
create policy owner_update on public.observations for update
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy owner_delete on public.observations for delete
  using (user_id = auth.uid());

drop policy if exists read_species on public.species_ref;
create policy read_species on public.species_ref for select
  using (auth.role() = 'authenticated');

create or replace function public.update_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.updated_at = clock_timestamp();
  if tg_table_name = 'sessions' then
    new.sync_revision = old.sync_revision + 1;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_sessions_updated_at on public.sessions;
create trigger trg_sessions_updated_at before update on public.sessions
  for each row execute function public.update_updated_at();
drop trigger if exists trg_points_updated_at on public.points;
create trigger trg_points_updated_at before update on public.points
  for each row execute function public.update_updated_at();

create or replace function public.touch_parent_session()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare target_session uuid;
begin
  target_session := coalesce(new.session_id, old.session_id);
  update public.sessions set updated_at = clock_timestamp() where id = target_session;
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_points_touch_session on public.points;
create trigger trg_points_touch_session after insert or update or delete on public.points
  for each row execute function public.touch_parent_session();
drop trigger if exists trg_observations_touch_session on public.observations;
create trigger trg_observations_touch_session after insert or update or delete on public.observations
  for each row execute function public.touch_parent_session();

create or replace function public.sync_session_snapshot(
  p_snapshot jsonb,
  p_expected_revision bigint default null,
  p_force boolean default false
)
returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog, public, auth
as $$
declare
  v_user uuid := auth.uid();
  v_session_id uuid := (p_snapshot -> 'session' ->> 'id')::uuid;
  v_owner uuid;
  v_revision bigint;
  v_point jsonb;
  v_observation jsonb;
begin
  if v_user is null then raise exception 'authentication required'; end if;

  select user_id, sync_revision into v_owner, v_revision
  from public.sessions where id = v_session_id for update;

  if found and v_owner <> v_user then raise exception 'session ownership mismatch'; end if;
  if found and not p_force and p_expected_revision is distinct from v_revision then
    return jsonb_build_object('status', 'conflict', 'revision', v_revision);
  end if;

  insert into public.sessions (
    id, user_id, type_site, nom_site, acronyme, debut_session, fin_session,
    compteur_principal, autres_compteurs, nb_points_ecoute, detecteurs,
    commentaire, created_at, synced_at
  ) values (
    v_session_id, v_user,
    p_snapshot -> 'session' ->> 'type_site', p_snapshot -> 'session' ->> 'nom_site',
    p_snapshot -> 'session' ->> 'acronyme',
    (p_snapshot -> 'session' ->> 'debut_session')::timestamptz,
    nullif(p_snapshot -> 'session' ->> 'fin_session', '')::timestamptz,
    p_snapshot -> 'session' ->> 'compteur_principal',
    coalesce(p_snapshot -> 'session' ->> 'autres_compteurs', ''),
    (p_snapshot -> 'session' ->> 'nb_points_ecoute')::integer,
    coalesce(array(select jsonb_array_elements_text(p_snapshot -> 'session' -> 'detecteurs')), '{}'),
    coalesce(p_snapshot -> 'session' ->> 'commentaire', ''),
    coalesce((p_snapshot -> 'session' ->> 'created_at')::timestamptz, now()), now()
  ) on conflict (id) do update set
    type_site = excluded.type_site, nom_site = excluded.nom_site, acronyme = excluded.acronyme,
    debut_session = excluded.debut_session, fin_session = excluded.fin_session,
    compteur_principal = excluded.compteur_principal, autres_compteurs = excluded.autres_compteurs,
    nb_points_ecoute = excluded.nb_points_ecoute, detecteurs = excluded.detecteurs,
    commentaire = excluded.commentaire, synced_at = excluded.synced_at;

  delete from public.points where session_id = v_session_id;
  for v_point in select value from jsonb_array_elements(coalesce(p_snapshot -> 'points', '[]'::jsonb)) loop
    insert into public.points (
      id, session_id, user_id, numero, heure_debut, heure_fin, nb_especes, statut,
      localisation, commentaire, coord_x, coord_y, updated_at
    ) values (
      v_point ->> 'id', v_session_id, v_user, (v_point ->> 'numero')::integer,
      nullif(v_point ->> 'heure_debut', '')::timestamptz,
      nullif(v_point ->> 'heure_fin', '')::timestamptz,
      coalesce((v_point ->> 'nb_especes')::integer, 0), coalesce(v_point ->> 'statut', 'non_demarre'),
      coalesce(v_point ->> 'localisation', ''), coalesce(v_point ->> 'commentaire', ''),
      (v_point ->> 'coord_x')::double precision, (v_point ->> 'coord_y')::double precision,
      coalesce((v_point ->> 'updated_at')::timestamptz, now())
    );
  end loop;

  for v_observation in select value from jsonb_array_elements(coalesce(p_snapshot -> 'observations', '[]'::jsonb)) loop
    insert into public.observations (point_id, session_id, user_id, groupe, espece, total, tranches)
    values (
      v_observation ->> 'point_id', v_session_id, v_user,
      v_observation ->> 'groupe', v_observation ->> 'espece',
      coalesce((v_observation ->> 'total')::integer, 0),
      coalesce(array(select jsonb_array_elements_text(v_observation -> 'tranches'))::integer[], '{}')
    );
  end loop;

  select sync_revision into v_revision from public.sessions where id = v_session_id;
  return jsonb_build_object('status', 'ok', 'revision', v_revision);
end;
$$;

revoke all on function public.sync_session_snapshot(jsonb, bigint, boolean) from public, anon;
grant execute on function public.sync_session_snapshot(jsonb, bigint, boolean) to authenticated;

insert into public.species_ref (groupe, espece, espece_label, ordre) values
  ('pipistrelles', 'Pip. commune', 'Pipistrelle commune', 1),
  ('pipistrelles', 'Pip. de Nathusius/Kuhl', 'Pipistrelle de Nathusius/Kuhl', 2),
  ('pipistrelles', 'Pip. pygmée', 'Pipistrelle pygmée', 3),
  ('murins', 'M. de Daubenton', 'Murin de Daubenton', 4),
  ('murins', 'M. de Natterer', 'Murin de Natterer', 5),
  ('murins', 'M. à oreilles échancrées', 'Murin à oreilles échancrées', 6),
  ('murins', 'Autres murins', 'Autres murins', 7),
  ('serotules', 'Sérotine commune', 'Sérotine commune', 8),
  ('serotules', 'Noctule de Leisler', 'Noctule de Leisler', 9),
  ('serotules', 'Noctule commune', 'Noctule commune', 10),
  ('autres', 'Oreillard sp', 'Oreillard sp.', 11),
  ('autres', 'Autres', 'Autres', 12)
on conflict (groupe, espece) do update set
  espece_label = excluded.espece_label, ordre = excluded.ordre;
