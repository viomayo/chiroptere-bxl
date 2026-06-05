```sql
-- =========================
-- Seed bat groups
-- =========================

insert into public.bat_groups (code, name) values
  ('pip', 'Pipistrelles'),
  ('mur', 'Murins'),
  ('ser', 'Sérotules'),
  ('aut', 'Autres')
on conflict (code) do nothing;


-- =========================
-- Seed bat species
-- =========================

insert into public.bat_species (group_id, code, common_name)
select id, 'pip_common', 'Pipistrelle commune'
from public.bat_groups where code = 'pip'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'pip_nathusius_kuhl', 'Pipistrelle de Nathusius/Kuhl'
from public.bat_groups where code = 'pip'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'pip_pygmy', 'Pipistrelle pygmée'
from public.bat_groups where code = 'pip'
on conflict (code) do nothing;


insert into public.bat_species (group_id, code, common_name)
select id, 'mur_daubenton', 'Murin de Daubenton'
from public.bat_groups where code = 'mur'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'mur_natterer', 'Murin de Natterer'
from public.bat_groups where code = 'mur'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'mur_dark_muzzle', 'Murin à museaux sombres'
from public.bat_groups where code = 'mur'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'mur_emarginated', 'Murin à oreilles échancrées'
from public.bat_groups where code = 'mur'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'mur_large', 'Grand Murin / Murin de Bechstein'
from public.bat_groups where code = 'mur'
on conflict (code) do nothing;


insert into public.bat_species (group_id, code, common_name)
select id, 'ser_common', 'Sérotine commune'
from public.bat_groups where code = 'ser'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'ser_leisler', 'Noctule de Leisler'
from public.bat_groups where code = 'ser'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'ser_noctule', 'Noctule commune'
from public.bat_groups where code = 'ser'
on conflict (code) do nothing;


insert into public.bat_species (group_id, code, common_name)
select id, 'aut_oreillard', 'Oreillard sp.'
from public.bat_groups where code = 'aut'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'aut_greater_horseshoe', 'Grand Rhinolophe'
from public.bat_groups where code = 'aut'
on conflict (code) do nothing;

insert into public.bat_species (group_id, code, common_name)
select id, 'aut_other', 'Autres'
from public.bat_groups where code = 'aut'
on conflict (code) do nothing;
```