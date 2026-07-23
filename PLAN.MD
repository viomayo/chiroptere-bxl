# Chiroptère BXL — Plan

## Objectif

Transformer le prototype local-first actuel en application de terrain fiable, synchronisée et testée.

## Phase 1 — Stabiliser l'application locale

- [fait] Ajouter `loading="eager"` et `unoptimized` sur les logos (chunk PNG incompatible avec l'optimiseur Next.js).
- [fait] Rattraper `public/logo.png` manquant dans git et unifier les icônes PWA sur `/logo.png`.
- [fait] Colorer les groupes d'espèces (violet pipistrelles, vert murins, orange sérotules, rose autres) sur les boutons +/− et badges de la liste des points.
- [fait] Rendre les pastilles de tranches cliquables : un clic ajoute directement un comptage dans cette tranche, sans sélection préalable.
- [fait] Rendre chaque compteur indépendant (plus de sélection partagée entre groupes ni entre espèces d'un même groupe).
- [fait] Ajouter des tests ciblés pour IndexedDB, la persistance du compteur, la remise à zéro et les exports.
- [fait] Renforcer la validation du formulaire de session.
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
- [fait] Ajouter des politiques RLS limitées aux utilisateurs authentifiés et propriétaires des données, avec une exception `is_supervisor()` pour la lecture.
- [fait] Ajouter la table `supervisors` (email PK) et la fonction `is_supervisor()` pour le contrôle d'accès superviseur.
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
- [fait] Séparer les caches navigate (`pages-navigate`) et RSC (`pages-rsc`) : chaque requête RSC déclenche aussi une mise en cache de la page HTML complète dans `pages-navigate`, garantissant que les deux types de navigation fonctionnent hors ligne après une visite en ligne.
- [fait] Ajouter un cache par pathname (sans query params) dans `pages-navigate` : toutes les variantes d'URL d'une même route (ex. `/compteur?pointId=xxx`) sont disponibles hors ligne dès qu'une seule a été visitée en ligne. Un fallback `handlerDidError` sert le shell pathname ou l'accueil si l'URL exacte n'est pas en cache.

## Phase 8 — Supervision multi-utilisateur

- [fait] Ajouter la table `supervisors` (email PK, `created_at`) dans le schéma Supabase avec RLS et trigger de normalisation des emails.
- [fait] Ajouter la fonction `is_supervisor()` (SECURITY DEFINER) utilisée par les RLS SELECT pour donner accès en lecture à toutes les données.
- [fait] Modifier les politiques RLS `owner_select` sur `sessions`, `points`, `observations` pour autoriser les superviseurs (`user_id = auth.uid() OR is_supervisor()`).
- [fait] Injecter l'en-tête `x-user-is-supervisor` dans le middleware `proxy.ts` via une requête best-effort à Supabase.
- [fait] Extraire l'email depuis le JWT dans `getSessionFromCookies()` pour la détection superviseur même en fallback offline.
- [fait] Normaliser la casse des emails (LOWER côté SQL, ilike côté middleware, trigger BEFORE INSERT/UPDATE sur `supervisors`).
- [fait] Implémenter le pull des données de tous les utilisateurs dans le tableau de bord superviseur : nouvelle fonction `pullAllSessionsForSupervisor()` dans `sync.ts`, stores distants dédiés dans IndexedDB (`remote_sessions`, `remote_points`), bouton « Récupérer » dans le Dashboard pour les superviseurs qui déclenche l'import et affiche les sessions avec le badge utilisateur.

## Phase 9 — Édition post-point et révision

- [fait] Ajouter un historique d'actions (undo) dans le compteur : chaque action (+, -, MAX, ajout d'espèce) sauvegarde un snapshot des comptages ; un bouton « Annuler » permet de restaurer l'état précédent (pile de 50 max).
- [fait] Rendre les pastilles de tranches remplies cliquables : un clic ouvre le sélecteur d'espèces pour cette tranche ; un second clic (picker déjà ouvert) retire le contact du groupe et des espèces associées pour cette tranche.
- [fait] Ajouter un mode « Révision » accessible après la fin du point : grille espèces × tranches complète avec cases à cocher pour chaque combinaison, permettant d'ajuster les espèces a posteriori.
- [fait] Réduire l'espacement mobile entre les pastilles de tranches (`gap-px` au lieu de `gap-0.5`) pour que les 18 tranches des transects forestiers tiennent sur une seule ligne.
- [fait] Réorganiser la grille des groupes dans le compteur : sérotules en haut à droite, murins en bas à gauche.

## Phase 10 — Fiabilisation offline

- [fait] Ajouter `networkTimeoutSeconds: 3` sur les caches navigate et RSC du service worker pour éviter les timeouts réseau de 30+s en mode hors-ligne.
- [fait] Ajouter `handlerDidError` sur le cache RSC avec fallback vers la page d'accueil si la donnée RSC n'est pas en cache.
- [fait] Inverser l'ordre dans le proxy : extraire la session depuis le cookie JWT avant tout appel Supabase, pour que les redirections auth ne nécessitent pas de réseau.
- [fait] Gérer le format `base64-` + base64url du cookie Supabase SSR (encodage par défaut) et le chunking en cookies multiples (`sb-{ref}-auth-token.0`, `.1`…) pour les tokens > 3 Ko.
- [fait] Remplacer `router.push()` par `<a href>` dans la liste des points pour garantir l'accès hors ligne : le clic sur un point déclenchait une navigation client-side (fetch RSC) qui échouait hors ligne car `handlerDidError` du cache RSC renvoie du HTML non interprété par Next.js. En passant à `<a href>` (navigation plein document), le service worker intercepte la requête `'navigate'` et `handlerDidError` du cache navigate sert le HTML depuis le cache pathname (`/compteur`), les données sont ensuite lues depuis IndexedDB.

## Phase 11 — Pull multi-appareil

- [fait] Ajouter `pullMySessions()` dans `sync.ts` : rapatrie les sessions, points et observations de l'utilisateur depuis Supabase vers les stores locaux IndexedDB, avec fusion basée sur `updatedAt`.
- [fait] Modifier le bouton Sync pour faire push + pull : pousse d'abord les données locales, puis tire les données distantes en l'absence de conflits.
- [fait] Ajouter un événement custom `synced` sur `window` pour recharger automatiquement le tableau de bord après un pull réussi.
- [fait] Corriger l'affichage des points distants pour le superviseur : `PointsList` tombait en fallback 'Aucune session' car il ne lisait que les stores locaux ; ajout d'un fallback vers `remote_sessions`/`remote_points` avec `getRemoteSessionById`/`getRemotePointsBySession`. Les points distants sont affichés en lecture seule (pas de navigation vers le compteur, pas d'export).
