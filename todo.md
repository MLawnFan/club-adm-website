# Project TODO

## Pages publiques
- [x] Homepage layout complet
- [x] Widget Chat GHL
- [x] /programmes — Page listing de tous les programmes
- [x] /horaire-prix — Page Horaire & Prix
- [x] /notre-equipe — Page Notre Équipe (en construction)
- [x] /contact — Page Contact
- [x] /consultation-gratuite — Page consultation
- [x] /evenements — Page événements
- [x] /evenements/course-19-septembre — Événement course
- [x] Pages de remerciement courses
- [x] Pages de programmation (5km, 10km, 21km)
- [x] Drop In links (Brossard & Chambly) sur Horaire & Prix

## Espace Membre - Programme On R'start la Machine
- [x] Upgrade fullstack (web-db-user) pour authentification
- [x] Schéma DB pour suivi de progression
- [x] Procédures tRPC (enrollment, progress, check-in)
- [x] Données des 14 modules (contenu, habitudes, astuces)
- [x] Page tableau de bord programme (login gate, enrollment, liste modules)
- [x] Page détail module (contenu, check-in, complétion)
- [x] Routes /programme et /programme/module/:id
- [x] Ajouter lien "Espace Membre" dans la navbar
- [x] Écrire tests vitest pour les procédures du programme
- [x] Vérifier le flux complet dans le navigateur
- [x] Mettre à jour le webhook GHL de la page Thank You 10km

## Mode Démo
- [x] Ajouter un mode démo/preview pour accéder au contenu des modules sans authentification
- [x] Ajouter des boutons de téléchargement fictifs avec icônes dans le Module 2 (Les Outils)
- [x] Ajouter un lecteur vidéo fictif au-dessus des boutons de téléchargement dans le Module 2
- [x] Ajouter bouton "Marquer comme terminé" sous la vidéo + barre de progression globale du programme

## Gamification & Redevabilité
- [x] Système de streak (série consécutive de check-ins complétés)
- [x] Barre XP animée avec gains visuels à chaque action
- [x] Badges/Achievements débloquables (première semaine, streak 4 sem, etc.)
- [x] Check-in obligatoire avant déblocage du module suivant
- [x] Confettis à la complétion d'un module
- [x] Indicateur de niveau visuel (Débutant → Engagé → Discipliné → Machine → Légende)

## Responsive
- [x] Rendre ProgrammePreview responsive (mobile-first)
- [x] Rendre ProgrammePreviewModule responsive (mobile-first)
- [x] Rendre ProgrammeDashboard responsive (mobile-first)
- [x] Rendre ProgrammeModule responsive (mobile-first)

## Programmation adaptative (course)
- [x] Extraire les données des 3 programmations (5km, 10km, 21km) en fichiers de données
- [x] Créer composant React de programmation adaptative (calcul semaines, allures, localStorage)
- [x] Remplacer les 3 pages iframe par les nouvelles pages React adaptatives
- [x] Tester les 3 distances et vérifier la persistance des données
- [x] Corriger le PDF de téléchargement des programmations de course (couleurs, polices, espaces lisibles)
- [x] Ajuster la numérotation des semaines pour commencer à 1 (au lieu du numéro original du plan complet)
- [x] Corriger le PDF : texte invisible (blanc sur blanc) lors de l'impression — forcer texte noir sur fond blanc
