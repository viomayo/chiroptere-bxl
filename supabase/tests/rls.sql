begin;
select plan(8);

select has_table('public', 'supervisors', 'supervisors exists');
select row_security_active('public.supervisors'), 'supervisors RLS is active';
select has_function('public', 'current_user_is_supervisor', array[]::text[], 'safe supervisor check exists');
select has_function('public', 'sync_session_snapshot', array['jsonb', 'bigint', 'boolean'], 'snapshot RPC exists');
select policies_are('public', 'sessions', array['owner_delete', 'owner_insert', 'owner_select', 'owner_update']);
select policies_are('public', 'points', array['owner_delete', 'owner_insert', 'owner_select', 'owner_update']);
select policies_are('public', 'observations', array['owner_delete', 'owner_insert', 'owner_select', 'owner_update']);
select results_eq(
  $$select count(*)::bigint from pg_policies where schemaname = 'public' and tablename = 'supervisors'$$,
  array[0::bigint],
  'supervisors has no client policy'
);

select * from finish();
rollback;
