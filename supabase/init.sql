-- ============================================================
-- Chiroptère BXL — Initialisation de la base Supabase
-- ============================================================

-- 1. Tables ---------------------------------------------------

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type_site TEXT NOT NULL,
  nom_site TEXT NOT NULL,
  acronyme TEXT NOT NULL,
  debut_session TIMESTAMPTZ NOT NULL,
  fin_session TIMESTAMPTZ,
  compteur_principal TEXT NOT NULL,
  autres_compteurs TEXT DEFAULT '',
  nb_points_ecoute INT NOT NULL,
  detecteurs TEXT[] DEFAULT '{}',
  commentaire TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  synced_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS points (
  id UUID PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  numero INT NOT NULL,
  heure_debut TIMESTAMPTZ,
  heure_fin TIMESTAMPTZ,
  nb_especes INT DEFAULT 0,
  statut TEXT DEFAULT 'non_demarre',
  localisation TEXT DEFAULT '',
  commentaire TEXT DEFAULT '',
  coord_x FLOAT,
  coord_y FLOAT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  point_id UUID NOT NULL REFERENCES points(id) ON DELETE CASCADE,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  groupe TEXT NOT NULL,
  espece TEXT NOT NULL,
  total INT DEFAULT 0,
  tranches INT[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS species_ref (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  groupe TEXT NOT NULL,
  espece TEXT NOT NULL,
  espece_label TEXT NOT NULL,
  ordre INT NOT NULL
);

-- 2. Table superviseurs -----------------------------------------

-- Les superviseurs peuvent voir les données de tous les utilisateurs
CREATE TABLE IF NOT EXISTS supervisors (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Normalisation : les emails sont toujours stockés en minuscule
CREATE OR REPLACE FUNCTION lowercase_supervisor_email()
RETURNS TRIGGER AS $$
BEGIN
  NEW.email = LOWER(NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_supervisors_lowercase_email
  BEFORE INSERT OR UPDATE ON supervisors
  FOR EACH ROW EXECUTE FUNCTION lowercase_supervisor_email();

-- 3. Index ----------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_points_session ON points(session_id);
CREATE INDEX IF NOT EXISTS idx_observations_point ON observations(point_id);
CREATE INDEX IF NOT EXISTS idx_observations_session ON observations(session_id);

-- 4. Fonction utilitaire ---------------------------------------

CREATE OR REPLACE FUNCTION is_supervisor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM supervisors
    WHERE LOWER(email) = LOWER((SELECT email FROM auth.users WHERE id = auth.uid()))
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 5. RLS ------------------------------------------------------

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE points ENABLE ROW LEVEL SECURITY;
ALTER TABLE observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE species_ref ENABLE ROW LEVEL SECURITY;

-- Chacun ne voit que ses propres données ; les superviseurs voient tout
CREATE POLICY owner_select ON sessions
  FOR SELECT USING (user_id = auth.uid() OR is_supervisor());
CREATE POLICY owner_insert ON sessions
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY owner_update ON sessions
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY owner_select ON points
  FOR SELECT USING (user_id = auth.uid() OR is_supervisor());
CREATE POLICY owner_insert ON points
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY owner_update ON points
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY owner_delete ON points
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY owner_select ON observations
  FOR SELECT USING (user_id = auth.uid() OR is_supervisor());
CREATE POLICY owner_insert ON observations
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY owner_update ON observations
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY owner_delete ON observations
  FOR DELETE USING (user_id = auth.uid());

-- species_ref : accessible en lecture pour tout utilisateur authentifié
CREATE POLICY read_species ON species_ref
  FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Auto-update updated_at -----------------------------------

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_points_updated_at
  BEFORE UPDATE ON points
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 7. Seed espèces ---------------------------------------------

INSERT INTO species_ref (groupe, espece, espece_label, ordre) VALUES
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
  ('autres', 'Autres', 'Autres', 12);
