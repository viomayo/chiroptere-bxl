-- Chiroptère BXL: per-point Tawny Owl call flag (Chouette hulotte).
-- This migration is prepared for manual deployment; it must not be applied remotely automatically.

alter table public.points add column if not exists chouette_hulotte boolean not null default false;

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
      localisation, commentaire, coord_x, coord_y, chouette_hulotte, updated_at
    ) values (
      v_point ->> 'id', v_session_id, v_user, (v_point ->> 'numero')::integer,
      nullif(v_point ->> 'heure_debut', '')::timestamptz,
      nullif(v_point ->> 'heure_fin', '')::timestamptz,
      coalesce((v_point ->> 'nb_especes')::integer, 0), coalesce(v_point ->> 'statut', 'non_demarre'),
      coalesce(v_point ->> 'localisation', ''), coalesce(v_point ->> 'commentaire', ''),
      (v_point ->> 'coord_x')::double precision, (v_point ->> 'coord_y')::double precision,
      coalesce((v_point ->> 'chouette_hulotte')::boolean, false),
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
