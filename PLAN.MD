# Chiroptère BXL — Plan

## État livré

- [fait] Parcours terrain : sessions, points prédéfinis, compteur, timer, espèces, annulation et révision.
- [fait] Horaires de point fiables : `heure_debut` fixée au lancement du minuteur, `heure_fin` fixée à sa terminaison et exportées telles quelles ; les modifications ultérieures (identification ou autre) et la validation ne les écrasent plus, seul un reset suivi d'un nouveau lancement les remet à jour.
- [fait] Persistance IndexedDB avec sauvegarde automatique et isolation par utilisateur.
- [fait] Profil d'identité offline actif persistant, remplaçable ou désactivable sans purge des données métier.
- [fait] Provider client global distinguant identité Supabase vérifiée, profil offline, session expirée et absence d'identité, sans autorisation superviseur locale.
- [fait] Shells terrain prérendus et consommateurs IndexedDB migrés vers l'identité cliente, avec verrouillage pendant la résolution et au changement de compte.
- [fait] Proxy retiré du chemin des shells terrain, sans décodage JWT, headers utilisateur ni vérification superviseur ; logout local prioritaire et données métier conservées hors ligne.
- [fait] Quarantaine attribuable ou exportable pour les anciennes données locales sans propriétaire, avec trois fichiers séparés (CSV, JSON, GeoJSON) distincts de l'export des données courantes.
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
- [fait] Export agrégé de toutes les sessions et points du compte courant en CSV, JSON et GeoJSON depuis le tableau de bord.
- [fait] Exports CSV et JSON.
- [fait] Exports CSV/JSON avec `user_id`/`user_name`, y compris pour les sessions distantes (superviseur), et comptage du groupe limité aux contacts non attribués à une espèce.
- [fait] CSV compatible Excel (UTF-8 avec BOM, séparateur `;`, accents préservés), avec colonne `chouette_hulotte`, et ligne groupe émise seulement si les espèces du groupe diffèrent d'au moins une tranche positive ou s'il reste des contacts non attribués.
- [fait] Quatre compteurs sans tranches « Oiseaux », « Autres mammifères », « Insectes » et « Amphibiens », de la même taille que les compteurs à tranches, en cases à cocher et repliés derrière une flèche avec sections internes également dépliables.
- [fait] Chouette hulotte intégrée au compteur « Oiseaux » ; l'ancien drapeau `chouette_hulotte` est conservé pour les exports et migré dans le compteur à la lecture des anciennes données.
- [fait] Export GeoJSON d'une FeatureCollection avec CRS déclarée `EPSG:31370`, coordonnées Lambert 72 brutes, comptages groupés par point et `geometry: null` pour les points sans coordonnées.
- [fait] Bouton MAX rond et compact à droite du nom de chaque groupe d'espèces.
- [fait] Bouton MIN rond à gauche du nom de chaque groupe, qui remet le groupe à zéro (total, tranches et espèces).
- [fait] Listes d'espèces enrichies (Pipistrelles, Murins, Sérotines/Noctules, Oreillards) avec saisie libre « Autres ».
- [fait] Historique complet des sessions sur le tableau de bord : 5 plus récentes puis « Voir plus »/« Voir moins ».
- [fait] `allowedDevOrigins` (`127.0.0.1`, `localhost`) pour débloquer le websocket HMR et l'hydratation en développement.
- [fait] Profils utilisateurs contrôlés : table `profiles` préremplie au premier sign-in (nom Google), renommable depuis le tableau de bord en ligne, et noms affichés dans la vue superviseur à la place de l'identifiant tronqué (repli sur l'identifiant abrégé si le profil manque).
- [fait] Export CSV/JSON/GeoJSON par utilisateur dans la vue superviseur, avec `user_id`/`user_name` et nom de fichier dérivé du profil.
- [fait] Rôle superviseur confirmé uniquement en ligne via `current_user_is_supervisor()`, jamais déduit du cache local ; la section reste masquée hors ligne et toute erreur vaut un refus.
- [fait] Tests unitaires/intégration, scénarios Playwright et CI.
- [fait] Échange PKCE du code OAuth déplacé vers la route serveur `/api/auth/exchange`, stockage Supabase verrouillé sur la clé `chiroptere-auth`, et page `/auth/auth-code-error` affichant l'erreur exacte renvoyée par Supabase.
- [fait] Mise à jour vers Next.js 16.3 et audit production sans vulnérabilité connue.
- [fait] Pied de page de l'application avec les crédits « Développé par thedasken et viomayo avec l'aide de l'IA ».
- [fait] Favicon du navigateur basé sur `icon-512.png` (fond noir), régénéré en 16×16 et 32×32.
- [fait] Répartition des contacts du tableau de bord étendue à Oiseaux, Autres mammifères, Insectes et Amphibiens.
- [fait] Compteurs secondaires affichés dans la couleur beige de base de l'interface.
- [fait] Caches de points distants normalisés à la lecture, avec reprise de l'ancien groupe `reptiles` vers `amphibiens`.

## Déploiement

- [fait] Sauvegarde logique distante du schéma, des données et des rôles, vérifiée par SHA-256.
- [fait] Validation des migrations sur Supabase local dans la CI.
- [fait] Dry-run examiné puis migrations appliquées manuellement au Supabase distant.
- [fait] Vérification distante des RPC, RLS, privilèges, advisors et de l'historique des migrations.
- [fait] Corriger dans le dashboard Supabase la « Site URL » (redirigée en erreur vers `http://localhost:3000`) et vérifier le secret Google du provider, puis lever l'erreur affichée sur `/auth/auth-code-error` à l'occasion d'un login réel (fait le 14 août 2026 : Site URL = `https://chiroptere-bxl.vercel.app`, Redirect URL ajoutée, login Google réel concluant).
- [fait] Exécuter une recette réelle sur iOS Safari et Android installés en PWA (fait le 14 août 2026, version `71dd5d1` déployée sur Vercel, login et usage mobile concluants).
- [fait] Appliquer manuellement les migrations `202608060001_owl_call.sql` (colonne `chouette_hulotte`) et `202608140001_profiles.sql` (table `profiles`) au Supabase distant (fait le 14 août 2026, avec `supabase link`, dry-run puis push, et vérification du schéma distant : colonne, table `profiles` backfillée, trigger `trg_profiles_on_signup` actif).

## Évolutions produit possibles

- [à faire] Ajouter une observabilité distante des erreurs de synchronisation si le projet choisit un service de suivi.

Les éléments de cette section sont planifiés et ne doivent pas être présentés comme implémentés.
