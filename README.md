# Chiroptère BXL

Application PWA mobile-first pour les relevés de chauves-souris à Bruxelles. Elle fonctionne localement sur le terrain, puis synchronise les sessions avec Supabase.

## Fonctions disponibles

- Authentification Google avec Supabase Auth. Les shells terrain sont publics et statiques ; les données locales sont verrouillées par l'identité cliente et les données distantes par Supabase Auth/RLS.
- Création de sessions par année de campagne (Année 1, 2 ou 3) puis par type de site, avec 932 points prédéfinis : 328 pour l'Année 1 (13 plans d'eau et 10 transects forestiers, avec coordonnées Lambert 72 et descriptions disponibles), 285 pour l'Année 2 (plans d'eau décrits, transects sans coordonnées) et 319 pour l'Année 3 (sites déjà saisis, à compléter).
- Compteur chronométré par tranches, groupes et espèces, avec pause, reprise, MAX (petit bouton rond à droite du nom de chaque groupe), MIN (petit bouton rond à gauche qui remet le groupe à zéro), annulation et révision. L'heure de début (`heure_debut`) est fixée au lancement du minuteur et l'heure de fin (`heure_fin`) à sa terminaison ; ces heures sont enregistrées en heure belge avec l'offset ISO correspondant (UTC+1 en hiver, UTC+2 en été), affichées en heure belge et normalisées en heure belge à la relecture des points distants. Modifier ensuite le point (identification des espèces ou autre) puis le valider ne change pas ces heures, seul un reset suivi d'un nouveau lancement les met à jour.
- Espèces proposées par groupe : Pipistrelles (commune, de Nathusius, de Nathusius/Kuhl, pygmée), Murins (de Brandt, à moustaches, d'Alcathoé, à oreilles échancrées, de Natterer, des marais, de Daubenton, de Bechstein, Grand Murin, Murin sp.), Sérotines/Noctules (Sérotine commune, Noctule de Leisler, Noctule commune) et Oreillards (gris, roux, Oreillard sp.). Le groupe « Autres » accepte en plus une identification libre saisie au clavier.
- Quatre compteurs sans tranches, de la même taille que les compteurs à tranches, présentés en cases à cocher et repliés derrière une flèche : « Oiseaux » (Chouette hulotte, Chouette effraie, Chevêche d'Athéna, Hibou moyen-duc), « Autres mammifères » (Chevreuil d'Europe, Hérisson commun, Renard roux, Fouine, Sanglier, Lérot), « Insectes » (vers luisants, orthoptères communs et orthoptères exceptionnels, regroupés en sections dépliables) et « Amphibiens » (Grenouille rousse, Grenouille verte, Crapaud commun, Salamandre tachetée, Triton alpestre, Triton ponctué, Triton palmé). L'ancienne case « Cri(s) de Chouette hulotte » est reprise dans le compteur « Oiseaux » ; les anciennes données sont migrées à la lecture. Ces compteurs secondaires utilisent la couleur beige de base de l'interface.
- Répartition des contacts du tableau de bord par groupe, y compris Oiseaux, Autres mammifères, Insectes et Amphibiens.
- Historique des sessions sur le tableau de bord : les 5 plus récentes sont affichées, les suivantes se déploient via « Voir plus » (et se replient via « Voir moins »).
- Sauvegarde automatique des brouillons dans IndexedDB.
- Profil d'identité offline actif conservé dans IndexedDB, sans jeton ni droit distant, et désactivable sans supprimer les relevés locaux.
- Données locales isolées par compte. Les anciennes données sans propriétaire restent en quarantaine jusqu'à attribution explicite ou export ; la quarantaine s'exporte séparément du reste des données, en CSV, JSON ou GeoJSON.
- Synchronisation par snapshot atomique : session, points et observations sont écrits dans une transaction Supabase.
- Synchronisation déclenchée à la confirmation d'une identité en ligne, au retour du réseau ou manuellement, avec un seul push/pull actif à la fois.
- Révision distante agrégée, conflits sur le snapshot complet et choix explicite entre version locale ou distante.
- Suppressions hors ligne conservées sous forme de tombstones jusqu'à confirmation Supabase.
- Cache superviseur local séparé par compte. La vue « Données des autres utilisateurs » n'apparaît qu'après confirmation en ligne du rôle superviseur via la fonction contrôlée `current_user_is_supervisor()` : aucun droit n'est déduit localement, et la section disparaît dès que l'identité n'est plus vérifiée ou que le réseau est coupé. Les points distants sont normalisés à la lecture, avec reprise de l'ancien groupe `reptiles` vers `amphibiens`.
- Profil utilisateur contrôlé : table `profiles` préremplie au premier sign-in (nom Google), renommable depuis le tableau de bord en ligne, et noms affichés dans la vue superviseur à la place de l'identifiant tronqué.
- Export agrégé de toutes les données de l'utilisateur courant en CSV, JSON et GeoJSON depuis le tableau de bord (section « Mes données »).
- Exports CSV et JSON (avec `user_id`/`user_name`) depuis la page des points d'une session, et pour les sessions distantes de chaque utilisateur dans la vue superviseur. Le CSV est encodé en UTF-8 avec BOM et séparé par des points-virgules pour s'ouvrir correctement dans Excel (colonnes et accents préservés), et inclut les colonnes `annee` et `chouette_hulotte` (dérivée du compteur « Oiseaux »). Export GeoJSON d'une FeatureCollection déclarant la CRS Lambert 72 (`EPSG:31370`) avec les coordonnées brutes des points ; les points sans coordonnées sont conservés avec `geometry: null`.
- PWA installable avec précache Serwist versionné des quatre shells terrain et page de diagnostic `/sw-status`. Une seule ouverture en ligne prépare `/`, `/site`, `/points` et `/compteur` ; les query strings réutilisent le shell canonique sans modifier l'URL visible.
- Indicateur discret de disponibilité terrain : « Prêt hors ligne » n'apparaît qu'après vérification par le Service Worker de la version et des quatre shells, indépendamment de l'état de synchronisation des relevés.
- Favicon du navigateur basé sur `icon-512.png` (fond noir), régénéré en 16×16 et 32×32.

## Routes

- `/` : tableau de bord
- `/site` : nouvelle session
- `/points` : points de la session
- `/compteur` : compteur d'un point
- `/login` et `/auth/callback` : authentification
- `/auth/auth-code-error` : page d'erreur si l'échange du code OAuth échoue, affichant la raison renvoyée par Supabase (ou l'erreur d'échange exacte) pour faciliter le diagnostic
- `/sw-status` : diagnostic PWA

## Installation

Prérequis : Node.js 20 ou plus récent.

```bash
npm ci
cp .env.example .env
npm run dev
```

En développement, `allowedDevOrigins` autorise `127.0.0.1` et `localhost` : sans cela, Next 16 bloque le websocket HMR et la page reste bloquée sur l'écran de démarrage (le logo).

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
- colonne `annee` sur les sessions (campagne 1, 2 ou 3, contrainte entre 1 et 3) ;
- colonne `chouette_hulotte` sur les points (cri de Chouette hulotte) ;
- table `profiles` (nom contrôlé de l'utilisateur, prérempli au premier sign-in, modifiable par son propriétaire et lisible par les superviseurs) ;
- contraintes uniques et seed espèces idempotent.

Les migrations jusqu'au 14 août 2026 ont été appliquées manuellement au projet distant (`202608060001_owl_call.sql` et `202608140001_profiles.sql`, après `supabase link`, dry-run et vérification du schéma distant). La migration `202611030001_session_annee.sql` est rédigée dans le dépôt et reste à appliquer au distant. Pour une prochaine migration :

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

Le Proxy n'intercepte plus les shells `/`, `/site`, `/points` et `/compteur` : il ne lit plus leurs cookies, n'injecte plus d'identité et n'appelle plus le RPC superviseur. Le callback OAuth reste un flux en ligne : le code verifier PKCE est relu dans le stockage local persistant, puis l'échange du code est effectué par la route serveur `/api/auth/exchange` avant que la session Supabase ne soit persistée dans le même stockage local, juste avant le retour sur `/`. Toute donnée distante reste contrôlée par Supabase Auth et les politiques RLS.

Une couche cliente globale vérifie l'utilisateur avec Supabase puis, si le serveur est injoignable ou la session expirée, expose uniquement l'identité locale active. Les shells `/`, `/site`, `/points` et `/compteur` sont prérendus sans donnée utilisateur ; ils ne lisent IndexedDB qu'après résolution de cette identité. Cette couche ne confère aucun droit distant.

L'installation du Service Worker précache atomiquement ces quatre shells et leurs assets pour la version courante du build. Le protocole `OFFLINE_STATUS` permet de vérifier la version et la présence de chaque route. Les appels vers l'origine Supabase restent strictement réseau et ne sont jamais mis en cache par Serwist.

Les navigations et payloads RSC ne disposent plus de cache runtime : les shells terrain viennent uniquement du précache versionné, et toute autre navigation reste réseau. À l'activation, le Service Worker supprime seulement les anciens caches applicatifs `pages-navigate`, `pages-rsc`, `pages-rsc-prefetch` et `pages`. Une route terrain absente échoue explicitement sans recevoir le document d'une autre route.

Après authentification en ligne, l'interface déclenche automatiquement `PREPARE_OFFLINE`. Une confirmation réussie enregistre aussi la version préparée dans le profil local, uniquement comme métadonnée : le Service Worker reste la source de vérité du statut. En cas d'échec ou de mise à jour incomplète, un bouton « Réessayer » relance la vérification sans toucher aux données métier.

Une déconnexion volontaire verrouille immédiatement l'interface, désactive le profil offline avant de tenter la déconnexion Supabase et conserve les relevés, conflits et suppressions en attente. Une panne réseau ordinaire ne désactive pas le profil offline.

La synchronisation automatique ne démarre qu'après confirmation distante de l'identité. Au retour du réseau, le provider revalide d'abord Supabase ; les états `offline` et `expired` ne déclenchent aucun appel métier distant. Les sessions `dirty`, tombstones, révisions et conflits suivent ensuite exactement le même flux que le bouton Sync.

## Journal

- 2026-11-05 — Campagnes 1/2/3, 932 points prédéfinis (328/285/319), horaires de point en heure belge avec offset, `Murin sp.`/`Oreillard sp.`, champ `annee` persisté et exporté. Migration `202611030001_session_annee.sql` prête, à appliquer au distant.

## Démo et auteurs

[Démo](https://chiroptere-bxl.vercel.app) · [@viomayo](https://github.com/viomayo) · [@thedasken](https://github.com/thedasken)

Le pied de page de l'application affiche les crédits « Développé par thedasken et viomayo avec l'aide de l'IA ».
