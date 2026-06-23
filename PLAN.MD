# Chiroptère BXL — Plan

## Objectif

Transformer le prototype local-first actuel en application de terrain fiable, synchronisée et testée.

## Phase 1 — Stabiliser l'application locale

- [fait] Ajouter `loading="eager"` et `unoptimized` sur les logos (chunk PNG incompatible avec l'optimiseur Next.js).
- [fait] Rattraper `public/logo.png` manquant dans git et unifier les icônes PWA sur `/logo.png`.
- [fait] Colorer les groupes d'espèces (violet pipistrelles, vert murins, orange sérotules, rose autres) sur les boutons +/− et badges de la liste des points.
- [fait] Rendre les pastilles de tranches cliquables : un clic ajoute directement un comptage dans cette tranche, sans sélection préalable.
- [fait] Rendre chaque compteur indépendant (plus de sélection partagée entre groupes ni entre espèces d'un même groupe).
- Ajouter des tests ciblés pour IndexedDB, la persistance du compteur, la remise à zéro et les exports.
- Renforcer la validation du formulaire de session.
- [fait] Vérifier le comportement mobile, notamment la synthèse vocale sur iOS Safari.

## Phase 2 — Persistance Supabase

- Créer de vraies migrations pour les sites, sessions, points, observations et espèces de référence.
- Ajouter des politiques RLS limitées aux utilisateurs authentifiés et propriétaires des données.
- Ajouter un seed pour les groupes et espèces de chauves-souris.

## Phase 3 — Synchronisation

- Envoyer les sessions, points et observations locaux vers Supabase.
- Marquer les données locales avec `syncedAt` après synchronisation réussie.
- Récupérer l'historique synchronisé dans le tableau de bord.
- Définir un comportement simple en cas de conflit.

## Phase 4 — Exports et qualité des données

- [fait] Ajouter les coordonnées des points avant de réintroduire un export GeoJSON.
- [fait] Intégrer les 319 points d'écoute prédéfinis (coordonnées X/Y + descriptions) directement dans la configuration des sites. Le nombre de points et leurs données sont automatiquement utilisés lors de la création d'une session.
- [fait] Ajouter les coordonnées des points (`coord_x`, `coord_y`) dans l'export CSV.

## Phase 5 — Documentation et maintenance

- [fait] Garder `README.md` aligné avec l'état réel de l'application.
- [fait] Mettre à jour ce plan après chaque lot fonctionnel.
- [fait] Remplacer les icônes PWA dédiées par `/logo.png` pour le manifeste et le splash screen.
- Documenter les choix de synchronisation et de schéma dès qu'ils sont implémentés.
