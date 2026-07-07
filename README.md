# Chiroptère BXL

Application web mobile-first pour accompagner les relevés de chauves-souris sur le terrain à Bruxelles.

## État actuel

L'application est aujourd'hui un prototype local-first fonctionnel :

- l'accès est protégé par une connexion Google via Supabase Auth ;
- les données de terrain sont enregistrées localement dans IndexedDB, dans le navigateur ;
- un footer avec les crédits des développeurs et leurs liens GitHub est affiché sur toutes les pages ;
- la création de sessions, les points d'écoute (avec coordonnées X/Y et descriptions de localisation prédéfinies), le compteur chronométré, la sauvegarde automatique des brouillons, la remise à zéro, le tableau de bord, les exports CSV/JSON (avec coordonnées) et les bases PWA sont en place ;
- les groupes d'espèces (pipistrelles, murins, sérotules, autres) sont identifiés par des couleurs distinctes (violet, vert, orange, rose) sur les boutons +/− et les badges ;
- les pastilles de tranches sont cliquables : un clic sur une pastille vide ajoute directement un comptage dans cette tranche, sans passer par le bouton + ;
- chaque compteur (groupe et espèce) est indépendant : cliquer une pastille dans un groupe ou une espèce n'affecte pas les autres ;
- le sélecteur d'espèces est intégré en ligne au compteur : cliquer le bouton + d'un groupe ou une pastille de tranche ouvre un choix d'espèces immédiat pour cette tranche, sans accordéon séparé ; un résumé des espèces comptées apparaît sous chaque groupe ;
- le bouton MAX remplit toutes les tranches d'un groupe en un clic et active le mode « auto-picker » : le sélecteur d'espèces s'ouvre automatiquement à chaque nouvelle tranche pour noter les espèces présentes tranche par tranche ;
- le bouton − retire la tranche courante (celle du timer) du groupe et des espèces associées ;
- les noms d'espèces sont affichés en français complet (ex. Pipistrelle commune, Murin de Daubenton) ;
- la localisation de chaque point (description prédéfinie issue des données CSV) est affichée en lecture seule dans le compteur, séparée du champ de remarques libres de l'observateur ;
- les logos (LCP potentiels) utilisent `loading="eager"` avec `unoptimized` (le PNG contient un chunk propriétaire incompatible avec l'optimiseur Next.js) ;
- les icônes PWA sont générées aux bonnes dimensions (192×192 avec fond sombre, 512×512, 512×512 maskable, apple-touch-icon 180×180, favicons 16×16 et 32×32) toutes depuis le logo chauve-souris ;
- le service worker (Serwist) est enregistré et actif en production : les ressources statiques sont précachées et les pages sont servies offline via les stratégies par défaut de Serwist (NetworkFirst pour les navigations, RSC et données) ;
- l'application est installable sur l'écran d'accueil (PWA) et fonctionne hors-ligne : le middleware lit le token Supabase depuis le cookie plutôt que d'appeler l'API distante, évitant les redirections vers `/login` quand le réseau est coupé ;
- les caches de navigation sont séparés : les requêtes `navigate` (pleine page) sont servies depuis `pages-navigate` (NetworkFirst), les requêtes `RSC` depuis `pages-rsc`. Chaque page visitée en ligne est automatiquement disponible hors ligne, y compris pour toutes les variantes de query params (ex. `/compteur?pointId=xxx`), grâce à un double cache par URL exacte et par pathname seul ;
- une page de diagnostic `/sw-status` permet de vérifier l'état du service worker (enregistrement, caches, ping) ;
- le fichier `proxy.ts` fait office de middleware (Next.js v16) : il protège l'accès aux routes et injecte les infos utilisateur dans les en-têtes ; les ressources PWA (`/logo.png`, `/sw.js`, `/manifest.webmanifest`, `/icon-*.png`, `/favicon-*.png`) sont exclues du contrôle d'accès ;
- la synchronisation unidirectionnelle (local → Supabase) est implémentée : un bouton Sync dans l'en-tête déclenche la poussée des sessions, points et observations vers Supabase ; les conflits (données modifiées à distance après le dernier sync) sont détectés et affichés dans une modale de résolution avec diff ; la synchronisation se déclenche automatiquement au retour en ligne.

## Routes principales

- `/` : tableau de bord
- `/login` : connexion
- `/site` : création d'une nouvelle session
- `/points` : liste des points d'écoute de la session
- `/compteur` : compteur chronométré pour un point
- `/sw-status` : diagnostic du service worker (enregistrement, état, caches)
- `/auth/callback` : retour OAuth Supabase

## Installation locale

```bash
npm install
cp .env.example .env
npm run dev
```

La configuration locale nécessite au minimum :

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=
```

## Commandes utiles

```bash
npm run dev
npm run lint
npm run build
```

## Données

Les données sont stockées localement dans IndexedDB et synchronisées unidirectionnellement (local → Supabase) via un bouton Sync dans l'en-tête ou automatiquement au retour en ligne. Le schéma Supabase (`sessions`, `points`, `observations`, `species_ref`) est défini dans `supabase/init.sql` avec RLS et seed des espèces.

Les exports sont générés côté client :

- CSV détaillé avec sessions, points (identifiés par acronyme + numéro, ex. `CAM-01`), horaires de début/fin, groupes, espèces et tranches ;
- JSON complet de la session et des points locaux.

Chaque site dispose de points d'écoute prédéfinis avec coordonnées (X, Y) et descriptions de localisation. Lors de la création d'une session, le nombre de points est automatiquement prérempli et les points sont créés avec leurs coordonnées et description de localisation dans IndexedDB. La description est affichée en lecture seule dans le compteur, tandis que le champ Remarques reste libre pour l'observateur.

## Limites connues

- Pas de récupération multi-appareil.
- Pas encore de tests automatisés.

## Démo

[https://chiroptere-bxl.vercel.app](https://chiroptere-bxl.vercel.app)

## Auteurs

- [@viomayo](https://www.github.com/viomayo)
- [@thedasken](https://www.github.com/thedasken)
