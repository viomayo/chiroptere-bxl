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
- les noms d'espèces sont abrégés dans l'interface (ex. PippiT, Myodau, Eptser) et les espèces au même libellé court sont fusionnées dans le résumé (ex. « autres Myo » regroupe les murins non listés) ;
- les pastilles de tranches et les bulles du timer sont dimensionnées de manière responsive (6 px sur mobile, 12 px sur desktop) pour tenir sur une ligne, même avec 18 tranches (transects forestiers) ;
- le bouton MAX est réduit (`text-[10px]`, `px-1.5`) pour prendre moins de place que +/− ;
- la localisation de chaque point (description prédéfinie issue des données CSV) est affichée en lecture seule dans le compteur, séparée du champ de remarques libres de l'observateur ;
- les logos (LCP potentiels) utilisent `loading="eager"` avec `unoptimized` (le PNG contient un chunk propriétaire incompatible avec l'optimiseur Next.js) ;
- les icônes PWA (manifeste et splash screen) pointent vers `/logo.png` ;
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
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=
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

Chaque site dispose de points d'écoute prédéfinis avec coordonnées (X, Y) et descriptions de localisation. Lors de la création d'une session, le nombre de points est automatiquement prérempli et les points sont créés avec leurs coordonnées et description de localisation dans IndexedDB. La description est affichée en lecture seule dans le compteur, tandis que le champ Remarques reste libre pour l'observateur.

## Limites connues

- Pas encore de persistance Supabase pour les observations.
- Pas de récupération multi-appareil.
- Pas encore de migrations de base de données.
- Pas encore de tests automatisés.

## Démo

[https://chiroptere-bxl.vercel.app](https://chiroptere-bxl.vercel.app)

## Auteurs

- [@viomayo](https://www.github.com/viomayo)
- [@thedasken](https://www.github.com/thedasken)
