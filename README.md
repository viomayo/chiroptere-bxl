# Chiroptère BXL

Application PWA mobile-first pour les relevés de chauves-souris à Bruxelles. Elle fonctionne localement sur le terrain, puis synchronise les sessions avec Supabase.

## Fonctions disponibles

- Authentification Google avec Supabase Auth. Les shells terrain sont publics et statiques ; les données locales sont verrouillées par l'identité cliente et les données distantes par Supabase Auth/RLS.
- Création de sessions et 319 points prédéfinis avec coordonnées et description.
- Compteur chronométré par tranches, groupes et espèces, avec pause, reprise, MAX (placé sous les boutons −/+ sur mobile pour éviter les clics accidentels), annulation et révision.
- Case « Cri(s) de Chouette hulotte » par point, sauvegardée localement et synchronisée.
- Sauvegarde automatique des brouillons dans IndexedDB.
- Profil d'identité offline actif conservé dans IndexedDB, sans jeton ni droit distant, et désactivable sans supprimer les relevés locaux.
- Données locales isolées par compte. Les anciennes données sans propriétaire restent en quarantaine jusqu'à attribution explicite ou export JSON.
- Synchronisation par snapshot atomique : session, points et observations sont écrits dans une transaction Supabase.
- Synchronisation déclenchée à la confirmation d'une identité en ligne, au retour du réseau ou manuellement, avec un seul push/pull actif à la fois.
- Révision distante agrégée, conflits sur le snapshot complet et choix explicite entre version locale ou distante.
- Suppressions hors ligne conservées sous forme de tombstones jusqu'à confirmation Supabase.
- Cache superviseur local séparé par compte ; l'interface superviseur reste désactivée jusqu'à l'ajout d'une validation distante côté client.
- Exports CSV et JSON (avec `user_id`/`user_name`), y compris pour les sessions distantes (vue superviseur). Le CSV est encodé en UTF-8 avec BOM et séparé par des points-virgules pour s'ouvrir correctement dans Excel (colonnes et accents préservés), et inclut la colonne `chouette_hulotte`. L'export GeoJSON n'est pas implémenté.
- PWA installable avec précache Serwist versionné des quatre shells terrain et page de diagnostic `/sw-status`. Une seule ouverture en ligne prépare `/`, `/site`, `/points` et `/compteur` ; les query strings réutilisent le shell canonique sans modifier l'URL visible.
- Indicateur discret de disponibilité terrain : « Prêt hors ligne » n'apparaît qu'après vérification par le Service Worker de la version et des quatre shells, indépendamment de l'état de synchronisation des relevés.

## Routes

- `/` : tableau de bord
- `/site` : nouvelle session
- `/points` : points de la session
- `/compteur` : compteur d'un point
- `/login` et `/auth/callback` : authentification
- `/auth/auth-code-error` : page d'erreur si l'échange du code OAuth échoue
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
- colonne `chouette_hulotte` sur les points (cri de Chouette hulotte) ;
- contraintes uniques et seed espèces idempotent.

Les migrations ont été appliquées manuellement au projet distant le 5 août 2026 après sauvegarde logique, dry-run et validation CI. La migration `202608060001_owl_call.sql` (colonne `chouette_hulotte`) reste à appliquer manuellement au projet distant avant le déploiement client. Pour une prochaine migration :

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

Le Proxy n'intercepte plus les shells `/`, `/site`, `/points` et `/compteur` : il ne lit plus leurs cookies, n'injecte plus d'identité et n'appelle plus le RPC superviseur. Le callback OAuth reste un flux en ligne, mais l'échange PKCE est effectué dans le navigateur. Le code verifier et la session Supabase utilisent le même stockage local persistant avant le retour sur `/`. Toute donnée distante reste contrôlée par Supabase Auth et les politiques RLS.

Une couche cliente globale vérifie l'utilisateur avec Supabase puis, si le serveur est injoignable ou la session expirée, expose uniquement l'identité locale active. Les shells `/`, `/site`, `/points` et `/compteur` sont prérendus sans donnée utilisateur ; ils ne lisent IndexedDB qu'après résolution de cette identité. Cette couche ne confère aucun droit distant.

L'installation du Service Worker précache atomiquement ces quatre shells et leurs assets pour la version courante du build. Le protocole `OFFLINE_STATUS` permet de vérifier la version et la présence de chaque route. Les appels vers l'origine Supabase restent strictement réseau et ne sont jamais mis en cache par Serwist.

Les navigations et payloads RSC ne disposent plus de cache runtime : les shells terrain viennent uniquement du précache versionné, et toute autre navigation reste réseau. À l'activation, le Service Worker supprime seulement les anciens caches applicatifs `pages-navigate`, `pages-rsc`, `pages-rsc-prefetch` et `pages`. Une route terrain absente échoue explicitement sans recevoir le document d'une autre route.

Après authentification en ligne, l'interface déclenche automatiquement `PREPARE_OFFLINE`. Une confirmation réussie enregistre aussi la version préparée dans le profil local, uniquement comme métadonnée : le Service Worker reste la source de vérité du statut. En cas d'échec ou de mise à jour incomplète, un bouton « Réessayer » relance la vérification sans toucher aux données métier.

Une déconnexion volontaire verrouille immédiatement l'interface, désactive le profil offline avant de tenter la déconnexion Supabase et conserve les relevés, conflits et suppressions en attente. Une panne réseau ordinaire ne désactive pas le profil offline.

La synchronisation automatique ne démarre qu'après confirmation distante de l'identité. Au retour du réseau, le provider revalide d'abord Supabase ; les états `offline` et `expired` ne déclenchent aucun appel métier distant. Les sessions `dirty`, tombstones, révisions et conflits suivent ensuite exactement le même flux que le bouton Sync.

## Démo et auteurs

[Démo](https://chiroptere-bxl.vercel.app) · [@viomayo](https://github.com/viomayo) · [@thedasken](https://github.com/thedasken)
