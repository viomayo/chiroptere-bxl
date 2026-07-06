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
- [fait] Adapter la taille des pastilles de tranches et bulles du timer en responsive (6 px mobile / 12 px desktop) pour tenir sur une ligne avec 18 tranches.
- [fait] Réduire le bouton MAX (text-[10px], px-1.5) pour qu'il prenne moins de place que +/−.
- [fait] Abréger les noms d'espèces dans l'interface (SPECIES_LABELS) et fusionner les espèces au même libellé court dans le résumé.
- [fait] Remplacer les acronymes d'espèces par les noms français complets dans l'interface.
- [fait] Séparer la localisation du point (description prédéfinie) des remarques libres de l'observateur : nouveau champ `localisation` dans `PointData`, affiché en lecture seule au-dessus du champ Remarques dans le compteur, et dans l'export CSV.
- [fait] Changer le bouton − pour retirer la tranche courante (celle du timer) au lieu de la dernière tranche ajoutée.
- [fait] Ajouter le mode MAX : remplit toutes les tranches d'un groupe et ouvre automatiquement le sélecteur d'espèces à chaque nouvelle tranche.
- [fait] Activer l'enregistrement du service worker (`register: true`) pour le fonctionnement hors-ligne.
- [fait] Corriger le label des espèces : passage des acronymes (PippiT, Myodau…) aux noms français complets (Pipistrelle commune, Murin de Daubenton…).
- [fait] Ajouter l'icône `apple-touch-icon` pour l'installabilité PWA sur iOS.
- [fait] Ajouter les logs de cycle de vie du SW (install, activate, message) pour le débogage.
- [fait] Exclure `logo.png` du proxy auth pour que les icônes PWA soient accessibles sans authentification.
- [fait] Ajouter la page `/sw-status` pour diagnostiquer l'enregistrement et l'état du service worker.

## Phase 2 — Persistance Supabase

- [fait] Créer de vraies migrations pour les sites, sessions, points, observations et espèces de référence (SQL à copier-coller).
- [fait] Ajouter des politiques RLS limitées aux utilisateurs authentifiés et propriétaires des données.
- [fait] Ajouter un seed pour les groupes et espèces de chauves-souris.

## Phase 3 — Synchronisation

- [fait] Envoyer les sessions, points et observations locaux vers Supabase.
- [fait] Marquer les données locales avec `syncedAt` après synchronisation réussie.
- [fait] Récupérer l'historique synchronisé dans le tableau de bord.
- [fait] Définir un comportement simple en cas de conflit (détection + résolution manuelle avec diff).

## Phase 4 — Exports et qualité des données

- [fait] Ajouter les coordonnées des points avant de réintroduire un export GeoJSON.
- [fait] Intégrer les 319 points d'écoute prédéfinis (coordonnées X/Y + descriptions) directement dans la configuration des sites. Le nombre de points et leurs données sont automatiquement utilisés lors de la création d'une session.
- [fait] Ajouter les coordonnées des points (`coord_x`, `coord_y`) dans l'export CSV.

## Phase 5 — PWA et offline

- [fait] Remplacer les icônes PWA dédiées par `/logo.png` pour le manifeste et le splash screen.
- [fait] Générer des icônes PWA aux bonnes dimensions (192×192, 512×512 maskable) depuis le logo.
- [fait] Générer l'icône `apple-touch-icon` 180×180.
- [fait] Remplacer le logo par le nouveau design chauve-souris (500×500, fond transparent).
- [fait] Rendre le middleware compatible offline : lecture du token Supabase depuis le cookie au lieu de l'API distante.
- [fait] Générer les favicons (16×16, 32×32) depuis le logo pour l'onglet du navigateur.
- [fait] Corriger le cache du Service Worker : ignorer les query params dans les URLs de navigation (offline compteur).
- [fait] Ajouter un fond sombre `#0f0d0b` aux icônes PWA pour une meilleure visibilité sur l'écran d'accueil.

## Phase 6 — Documentation et maintenance

- [fait] Garder `README.md` aligné avec l'état réel de l'application.
- [fait] Mettre à jour ce plan après chaque lot fonctionnel.
- [fait] Documenter les choix de synchronisation et de schéma dès qu'ils sont implémentés.

## Phase 7 — Correction PWA et fiabilisation offline

- [fait] Supprimer le `navigationCache` custom qui doublonnait avec le `defaultCache` de Serwist, causant des conflits de cache et des erreurs `ERR_FAILED` sur les navigations non encore visitées dans la PWA.
- [fait] Désactiver `navigationPreload` qui provoquait des échecs avec les redirections 307 du proxy d'authentification.
- [fait] Simplifier le SW pour utiliser uniquement les stratégies par défaut de Serwist (`defaultCache`), déjà configurées en `NetworkFirst` pour les pages HTML, RSC et données.
