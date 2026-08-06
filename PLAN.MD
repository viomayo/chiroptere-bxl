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
- [fait] Exports CSV/JSON avec `user_id`/`user_name`, y compris pour les sessions distantes (superviseur), et comptage du groupe limité aux contacts non attribués à une espèce.
- [fait] CSV compatible Excel (UTF-8 avec BOM, séparateur `;`, accents préservés), avec colonne `chouette_hulotte`, et ligne groupe émise seulement si les espèces du groupe diffèrent d'au moins une tranche positive ou s'il reste des contacts non attribués.
- [fait] Case « Cri(s) de Chouette hulotte » par point, sauvegardée localement, synchronisée et exportée.
- [fait] Bouton MAX placé sous les boutons −/+ sur mobile pour éviter les clics accidentels.
- [fait] Tests unitaires/intégration, scénarios Playwright et CI.
- [fait] Mise à jour vers Next.js 16.3 et audit production sans vulnérabilité connue.

## Déploiement

- [fait] Sauvegarde logique distante du schéma, des données et des rôles, vérifiée par SHA-256.
- [fait] Validation des migrations sur Supabase local dans la CI.
- [fait] Dry-run examiné puis migrations appliquées manuellement au Supabase distant.
- [fait] Vérification distante des RPC, RLS, privilèges, advisors et de l'historique des migrations.
- [à faire] Exécuter une recette réelle sur iOS Safari et Android installés en PWA.
- [à faire] Appliquer manuellement la migration `202608060001_owl_call.sql` (colonne `chouette_hulotte`) au Supabase distant avant le déploiement client.

## Évolutions produit possibles

- [à faire] Export GeoJSON à partir des coordonnées existantes.
- [à faire] Remplacer l'identifiant utilisateur abrégé de la vue superviseur par un nom provenant d'un profil contrôlé.
- [à faire] Ajouter une observabilité distante des erreurs de synchronisation si le projet choisit un service de suivi.

Les éléments de cette section sont planifiés et ne doivent pas être présentés comme implémentés.
