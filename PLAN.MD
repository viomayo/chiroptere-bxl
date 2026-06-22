# Chiroptère BXL — Plan

## Objectif

Transformer le prototype local-first actuel en application de terrain fiable, synchronisée et testée.

## Phase 1 — Stabiliser l'application locale

- [fait] Ajouter `fetchPriority="high"` sur les logos (éléments LCP potentiels).
- Ajouter des tests ciblés pour IndexedDB, la persistance du compteur, la remise à zéro et les exports.
- Renforcer la validation du formulaire de session.
- Vérifier le comportement mobile, notamment la synthèse vocale sur iOS Safari.

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

- Ajouter les coordonnées des points avant de réintroduire un export GeoJSON.
- Valider plus strictement la structure des exports CSV et JSON.
- Prévoir un outil d'import ou de récupération si nécessaire.

## Phase 5 — Documentation et maintenance

- [fait] Garder `README.md` aligné avec l'état réel de l'application.
- [fait] Mettre à jour ce plan après chaque lot fonctionnel.
- [fait] Remplacer les icônes PWA par le nouveau logo (chauve-souris).
- Documenter les choix de synchronisation et de schéma dès qu'ils sont implémentés.
