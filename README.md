# Chiroptère BXL

Application web mobile-first pour accompagner les relevés de chauves-souris sur le terrain à Bruxelles.

## État actuel

L'application est aujourd'hui un prototype local-first fonctionnel :

- l'accès est protégé par une connexion Google via Supabase Auth ;
- les données de terrain sont enregistrées localement dans IndexedDB, dans le navigateur ;
- un footer avec les crédits des développeurs et leurs liens GitHub est affiché sur toutes les pages ;
- la création de sessions, les points d'écoute, le compteur chronométré, la sauvegarde automatique des brouillons, la remise à zéro, le tableau de bord, les exports CSV/JSON et les bases PWA sont en place ;
- les logos (LCP potentiels) utilisent `loading="eager"` pour optimiser le Largest Contentful Paint ;
- la synchronisation vers une base de données Supabase n'est pas encore implémentée.

## Routes principales

- `/` : tableau de bord
- `/login` : connexion
- `/site` : création d'une nouvelle session
- `/points` : liste des points d'écoute de la session
- `/compteur` : compteur chronométré pour un point
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
```

## Commandes utiles

```bash
npm run dev
npm run lint
npm run build
```

## Données

Pour le moment, les sessions et les points vivent uniquement dans IndexedDB. Le champ `syncedAt` existe déjà comme marqueur de synchronisation future, mais aucune donnée d'observation n'est encore écrite dans Supabase.

Les exports sont générés côté client :

- CSV détaillé avec sessions, points, groupes, espèces et tranches ;
- JSON complet de la session et des points locaux.

## Limites connues

- Pas encore de persistance Supabase pour les observations.
- Pas de récupération multi-appareil.
- Pas encore de migrations de base de données.
- Pas encore de tests automatisés.
- Pas de GeoJSON tant que les points n'ont pas de coordonnées.

## Démo

[https://chiroptere-bxl.vercel.app](https://chiroptere-bxl.vercel.app)

## Auteurs

- [@viomayo](https://www.github.com/viomayo)
- [@thedasken](https://www.github.com/thedasken)
