# Chiroptère BXL

Application PWA mobile-first pour les relevés de chauves-souris à Bruxelles. Elle fonctionne localement sur le terrain, puis synchronise les sessions avec Supabase.

## Fonctions disponibles

- Authentification Google avec Supabase Auth et routes protégées par le Proxy Next.js 16.
- Création de sessions et 319 points prédéfinis avec coordonnées et description.
- Compteur chronométré par tranches, groupes et espèces, avec pause, reprise, MAX, annulation et révision.
- Sauvegarde automatique des brouillons dans IndexedDB.
- Données locales isolées par compte. Les anciennes données sans propriétaire restent en quarantaine jusqu'à attribution explicite ou export JSON.
- Synchronisation par snapshot atomique : session, points et observations sont écrits dans une transaction Supabase.
- Révision distante agrégée, conflits sur le snapshot complet et choix explicite entre version locale ou distante.
- Suppressions hors ligne conservées sous forme de tombstones jusqu'à confirmation Supabase.
- Vue superviseur avec cache local séparé par compte superviseur.
- Exports CSV et JSON. L'export GeoJSON n'est pas implémenté.
- PWA installable, caches HTML/RSC séparés et page de diagnostic `/sw-status`.

## Routes

- `/` : tableau de bord
- `/site` : nouvelle session
- `/points` : points de la session
- `/compteur` : compteur d'un point
- `/login` et `/auth/callback` : authentification
- `/sw-status` : diagnostic PWA

## Installation

Prérequis : Node.js 20 ou plus récent.

```bash
npm ci
cp .env.example .env
npm run dev
```

Variables requises :

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=
```

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
npm run test:e2e
npm audit --omit=dev --audit-level=high
```

Les tests E2E nécessitent Chromium et ses bibliothèques système :

```bash
npx playwright install --with-deps chromium
```

La CI exécute qualité, couverture, build, audit, Playwright et tests Supabase sous Node 20. La couverture impose au minimum 80 % des lignes et fonctions sur le stockage, la synchronisation, le comptage et les exports.

## Base de données et déploiement

Le schéma versionné se trouve dans `supabase/migrations/`. Les migrations ajoutent notamment :

- RLS complète, y compris la suppression propriétaire des sessions ;
- table `supervisors` inaccessible directement aux clients ;
- fonction contrôlée `current_user_is_supervisor()` ;
- révision agrégée des sessions ;
- RPC transactionnelle `sync_session_snapshot()` ;
- contraintes uniques et seed espèces idempotent.

Les migrations ont été appliquées manuellement au projet distant le 5 août 2026 après sauvegarde logique, dry-run et validation CI. Pour une prochaine migration :

```bash
supabase start
supabase db reset
supabase test db
supabase link --project-ref VOTRE_REFERENCE
supabase db push --dry-run
supabase db push
```

Ne pas exécuter les deux dernières commandes sans sauvegarde vérifiée et validation explicite du propriétaire du projet.

## Sécurité et offline

Le Proxy peut lire un JWT non expiré depuis les cookies pour laisser ouvrir le shell déjà mis en cache hors ligne. Cette lecture ne remplace pas l'autorisation serveur : toute donnée distante et tout droit superviseur restent contrôlés par Supabase Auth et les politiques RLS.

## Démo et auteurs

[Démo](https://chiroptere-bxl.vercel.app) · [@viomayo](https://github.com/viomayo) · [@thedasken](https://github.com/thedasken)
