# Chiroptère BXL — Plan

## État livré

- [fait] Parcours terrain : sessions, points prédéfinis, compteur, timer, espèces, annulation et révision.
- [fait] Persistance IndexedDB avec sauvegarde automatique et isolation par utilisateur.
- [fait] Quarantaine attribuable ou exportable pour les anciennes données locales sans propriétaire.
- [fait] PWA installable, navigation offline, cache des routes avec paramètres et diagnostic `/sw-status`.
- [fait] Synchronisation atomique de snapshots via RPC Supabase.
- [fait] Révisions agrégées détectant les modifications de points sans changement des métadonnées de session.
- [fait] Remplacement distant des observations par une liste éventuellement vide.
- [fait] Conflits portant sur la session, les points, les groupes, les espèces et les tranches.
- [fait] Suppressions offline rejouées avec tombstones et conservation des erreurs.
- [fait] RLS propriétaire et superviseur durcie par migrations versionnées.
- [fait] Exports CSV et JSON.
- [fait] Tests unitaires/intégration, scénarios Playwright et CI.
- [fait] Mise à jour vers Next.js 16.3 et audit production sans vulnérabilité connue.

## Déploiement restant

- [à faire] Sauvegarder la base Supabase distante.
- [à faire] Valider la migration localement avec la CLI Supabase et Docker.
- [à faire] Examiner `supabase db push --dry-run`, puis appliquer manuellement la migration avec l'autorisation du propriétaire.
- [à faire] Exécuter une recette réelle sur iOS Safari et Android installés en PWA.

## Évolutions produit possibles

- [à faire] Export GeoJSON à partir des coordonnées existantes.
- [à faire] Remplacer l'identifiant utilisateur abrégé de la vue superviseur par un nom provenant d'un profil contrôlé.
- [à faire] Ajouter une observabilité distante des erreurs de synchronisation si le projet choisit un service de suivi.

Les éléments de cette section sont planifiés et ne doivent pas être présentés comme implémentés.
