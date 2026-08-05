-- Keep the privileged supervisor lookup outside the exposed API schema.
create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.is_supervisor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.supervisors
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function private.is_supervisor() from public, anon;
grant execute on function private.is_supervisor() to authenticated;

create or replace function public.current_user_is_supervisor()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$ select private.is_supervisor(); $$;

revoke all on function public.current_user_is_supervisor() from public, anon;
grant execute on function public.current_user_is_supervisor() to authenticated;

drop policy if exists owner_select on public.sessions;
drop policy if exists owner_insert on public.sessions;
drop policy if exists owner_update on public.sessions;
drop policy if exists owner_delete on public.sessions;
create policy owner_select on public.sessions for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_supervisor()));
create policy owner_insert on public.sessions for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy owner_update on public.sessions for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy owner_delete on public.sessions for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists owner_select on public.points;
drop policy if exists owner_insert on public.points;
drop policy if exists owner_update on public.points;
drop policy if exists owner_delete on public.points;
create policy owner_select on public.points for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_supervisor()));
create policy owner_insert on public.points for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy owner_update on public.points for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy owner_delete on public.points for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists owner_select on public.observations;
drop policy if exists owner_insert on public.observations;
drop policy if exists owner_update on public.observations;
drop policy if exists owner_delete on public.observations;
create policy owner_select on public.observations for select to authenticated
  using (user_id = (select auth.uid()) or (select private.is_supervisor()));
create policy owner_insert on public.observations for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy owner_update on public.observations for update to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
create policy owner_delete on public.observations for delete to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists read_species on public.species_ref;
create policy read_species on public.species_ref for select to authenticated
  using (true);

drop function if exists public.is_supervisor();
revoke all on function public.touch_parent_session() from public, anon, authenticated;
