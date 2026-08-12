# Chiroptère BXL — Plan

## État livré

- [fait] Parcours terrain : sessions, points prédéfinis, compteur, timer, espèces, annulation et révision.
- [fait] Persistance IndexedDB avec sauvegarde automatique et isolation par utilisateur.
- [fait] Profil d'identité offline actif persistant, remplaçable ou désactivable sans purge des données métier.
- [fait] Provider client global distinguant identité Supabase vérifiée, profil offline, session expirée et absence d'identité, sans autorisation superviseur locale.
- [fait] Shells terrain prérendus et consommateurs IndexedDB migrés vers l'identité cliente, avec verrouillage pendant la résolution et au changement de compte.
- [fait] Proxy retiré du chemin des shells terrain, sans décodage JWT, headers utilisateur ni vérification superviseur ; logout local prioritaire et données métier conservées hors ligne.
- [fait] Quarantaine attribuable ou exportable pour les anciennes données locales sans propriétaire.
- [fait] PWA installable, navigation offline, cache des routes avec paramètres et diagnostic `/sw-status`.
- [fait] Précache Serwist atomique et versionné de `/`, `/site`, `/points` et `/compteur`, avec statut vérifiable, normalisation ciblée des query strings et aucun faux fallback vers l'accueil.
- [fait] Indicateur utilisateur de readiness distinct de la synchronisation, préparation automatique en ligne, reprise manuelle et `preparedVersion` enregistré seulement après confirmation du Service Worker.
- [fait] Cache HTTP terrain durci : aucune stratégie runtime HTML/RSC, Supabase prioritaire en `NetworkOnly` et suppression ciblée des anciens caches de pages à l'activation.
- [fait] Synchronisation atomique de snapshots via RPC Supabase.
- [fait] Déclencheurs de synchronisation fiabilisés au démarrage en ligne, au retour réseau et au clic manuel, avec déduplication des exécutions concurrentes et revalidation Auth préalable.
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
