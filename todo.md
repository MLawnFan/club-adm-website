# Project TODO - Club ADM

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

## Starter Pack ADM — Modules interactifs
- [x] Structure de base : routes /espace-membre, dashboard, navigation
- [x] Module 1 — Plan nutritionnel personnalisé (questionnaire interactif + génération plan)
- [x] Module 2 — Programmation entraînement adaptée (gym/maison, objectifs, blessures, 12 semaines)
- [x] Module 3 — Guide habitudes de vie (5 sous-modules + tracker + check-ins)
- [x] Module 4 — Espace communauté (fil d'actualité + défis + Q&A)
- [x] Dashboard membre avec progression globale

## Starter Pack ADM — Améliorations
- [x] Refactorer Module Entraînement : 4 semaines (pas 12), style BRUTE Pro (calendrier semaine, blocs détaillés, bouton Valider, liens Media)
- [x] Enrichir Module Nutrition : ajouter portions en grammes + liste d'aliments avec quantités exactes par portion
- [x] Ajouter liste d'épicerie hebdomadaire automatique basée sur les portions en grammes et équivalents choisis
- [x] Ajouter des explications adaptées au niveau d'expérience dans le module entraînement (débutant = détaillé, avancé = concis)

## Hub membre et onboarding commun — 12 octobre 2026
- [x] Hub /espace-membre : On R’start la Machine (12 semaines) et Starter Pack ADM (4 semaines), deux parcours distincts.
- [x] Navigation publique Espace Membre vers le hub; anciens URLs /programme et modules Starter conservés.
- [x] Dashboard Starter déplacé à /espace-membre/starter-pack; liens retour depuis les modules.
- [x] Questionnaire guidé en 6 étapes : profil, sécurité/contexte, quotidien, habitudes, entraînement, vérification.
- [x] Reprise et modification des étapes; validation des champs et récapitulatif avant confirmation.
- [x] Table privée member_onboarding, unicité compte/produit, procédures tRPC protégées et cache client isolé par compte.
- [x] Reprise du parcours choisi après la connexion existante; pas de nouvel accès payant ni de nouveau trial.
- [x] Questionnaire nutrition aligné sur les 19 questions du document interne fourni.
- [x] Triage serveur : statut referred pour santé, relation alimentaire, refus/incertitude de triage ou mineur; pas de diagnostic.
- [x] Nutrition réelle : aucun guide chiffré livré automatiquement ni présenté comme validé. Aperçu fictif séparé conserve équivalents et épicerie.
- [x] Entraînement : reprend le profil partagé, 4 semaines; suspend la génération pour triage ou limitations déclarées; conseils adaptés au niveau.
- [x] Tests : 19 réussis, TypeScript et build réussis; navigation des 6 étapes, confirmation et génération fictive testées; desktop et cellulaire vérifiés.
- [ ] Organiser le processus humain à deux temps : préparateur, seconde validation/responsable autorisé, canal privé, décisions documentées.
- [ ] Implémenter le workflow équipe de préparation/validation/remise réelle du guide (pas de statut approved ni de livraison simulée dans cette version).
- [ ] Connecter la remise au PDF personnalisé et aux préférences/horaire/budget après validation, sans promesse de délai.
- [ ] Stripe/GHL, contrôle d’accès produit et vraies règles communautaires : intégrations futures inchangées, aucun nouvel essai créé.
- [ ] Synchroniser les séances et les trackers éducatifs en base; ils restent locaux dans la version actuelle.

## Landing /online-project — 13 octobre 2026 (non publiée)
- [x] Source React autorisée récupérée depuis la tâche AJ1RwiQTPKGwX7HKq5dQmH, version de référence e24e5066; pas de reconstruction d’après le site publié.
- [x] Neuf pages transférées sous /online-project, styles Oswald/Source Sans 3 et palette isolée online; site principal, programmes course, profils et base préservés.
- [x] Trois témoignages sources et logo téléversés dans le stockage destination; thumbnails originaux conservés.
- [x] Aucun ajout au menu ni au footer du site principal. Pas d’iframe, redirection externe ou nouvelle tâche.
- [x] URLs Stripe succès/annulation préfixées et retour portail sous /online-project/mes-achats; prix CAD 39/49/70 et fin absolue des 30 jours préservés.
- [x] Verrou serveur ONLINE_PROJECT_CHECKOUT_ENABLED : fermé par défaut. STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET absents du site destination; aucun secret source copié.
- [x] Pas de faux paiement : toutes les pages de confirmation requièrent une vérification serveur Stripe; /merci-programme protégée contre une fausse confirmation par accès direct.
- [x] Quiz → offre → checkout prérempli testé avec profil fictif; URLs/attributs de liens sans réponses ou coordonnées; paramètres privés en history.state et navigation isolée des routes du site.
- [x] Pixel 702064657485858 : consentement, refus, dédoublonnage et exclusion des paiements de test couverts par tests; aucun événement réel envoyé pendant cette intégration.
- [x] TypeScript, build et 68 tests réussis; captures desktop/mobile, chargement des 3 vidéos, absence du lien dans la navigation et état du bouton de paiement désactivé vérifiés.
- [ ] Identifier/autoriser le compte Stripe destination; configurer les clés de manière privée, installer/valider webhook et remise avant activation. Aucun achat réel ou essai Stripe effectué.
- [ ] Brancher GHL pour capture consentie et guide gratuit indépendamment de l’achat; actuellement aucun prospect ni courriel créé par le quiz.
- [ ] Relier achat vérifié → compte/droits Starter → onboarding existant; génération nutrition humaine et remise privée restent celles du parcours précédent, non activées par le checkout.
- [ ] Remplacer la vidéo explicative principale encore vide; revoir avant lancement les promesses de la landing héritées (accès immédiat/à vie, compte à rebours, durée et garanties).
- [ ] Valider événements Meta dans le compte réel après autorisation, publication distincte et DNS hors périmètre. Aucun domaine/DNS modifié, aucune publication effectuée.

## Responsive landing /online-project — 16 octobre 2026
- [x] Audit Chromium en émulation de 40 layouts : cinq pages (landing, résultat, programme, checkout, upsell), largeurs 320/360/375/390/430/768/1024/1440 px.
- [x] Retrait du double padding mobile; CTA adaptés à la largeur; cartes/prix/logos de paiement aérés et retour à la ligne propre.
- [x] Boutons principaux d’au moins 44 px; menu tactile sous 1024 px, menu paysage défilable, fermeture Échap, focus et verrouillage/restauration du défilement.
- [x] Consentement défilable sur écrans courts, zones sûres pour encoches, refus inchangé; zoom navigateur rétabli et champs courriel adaptés au clavier mobile.
- [x] Quiz : retour en haut entre étapes, focus sur la question, labels associés, réponses conservées au retour, annulation de l’avance différée sur choix rapprochés.
- [x] 7 scénarios d’interaction réussis : quiz complet à 320/375/430 px, menus portrait/paysage/tablette, consentement paysage. Données fictives uniquement, aucun prospect envoyé, événements Meta bloqués et checkout désactivé.
- [x] Résultats finaux : zéro débordement horizontal, zéro élément de contenu hors écran, zéro cible principale inférieure à 44 px, zéro erreur JavaScript et toutes les images chargées dans les 40 layouts. Seuls les dépassements internes décoratifs intentionnels (halo/encart négatif) subsistent.
- [x] TypeScript, build et 72 tests Vitest réussis; captures finales ordinateur et cellulaire vérifiées. Aucun changement de média, thumbnail, prix, base, droits ou branchement Stripe/GHL.
- [x] Correctifs préparés dans le projet existant; pas d’action de publication ni de changement DNS par cet audit. Tests en navigateur émulé, pas une garantie de test sur tous les appareils physiques.

## Dashboard tendances marketing — en attente (16 octobre 2026)
Décision utilisateur : mettre le dashboard en attente jusqu’à ce qu’une source de données soit disponible. Périmètre validé pour une éventuelle reprise : dashboard privé Club ADM, Google Trends au Québec, mots-clés gym, HYROX, entraînement fonctionnel, perte de poids et programme d’entraînement, évolution et recherches associées, actualisation quotidienne sous réserve d’accès aux données. La connexion DataForSEO proposée n’a pas été activée; l’accès public testé a retourné HTTP 429 et aucune API intégrée utilisable n’a été découverte. Aucune page de dashboard, donnée fictive, nouvelle table ou planification n’a été créée. Aucune actualisation automatique activée. Ne pas reprendre ni proposer à nouveau la connexion refusée sans une nouvelle demande utilisateur.

## Suivi ventes / Umami + récapitulatif Slack — 20 octobre 2026
- [x] Événements Umami et copie privée des pages marketing, clics consultation/téléphone, choix/découverte des services, vidéos (démarrage/50 %), étapes et fin du quiz, ouverture réelle Stripe.
- [x] Consentement analytique révocable distinct du consentement Meta; panneau unique, choix désactivés par défaut, DNT/GPC, exclusion des aperçus, administrateurs connectés et parcours membres/santé; aucune réponse de santé ou coordonnée dans les événements.
- [x] Attribution minimale source / campagne UTM et dernier service découvert; identifiant aléatoire par navigateur (30 jours), visite par onglet (30 min), événements privés conservés 90 jours.
- [x] /consultation-gratuite : remplacement de l’envoi simulé par une réception validée dans la boîte privée; consentement de contact, contrôle serveur, idempotence, piège antirobot, notification propriétaire sans coordonnées. Envoi désactivé depuis le preview; aucune donnée de test en base.
- [x] /admin/ventes : accès administrateur seulement; périodes complètes heure Montréal, suivi privé distinct des chiffres Umami, sources/pages/services/appareils/parcours, boîte de 50 demandes récentes et statuts de traitement.
- [x] Revenu programme : enregistrement dédoublonné côté serveur uniquement après résumé Stripe payé/live; événement Umami payé vérifié au retour client. Aucun achat test ou abonnement d’essai compté comme vente. Limite : reconnaissance au retour/vérification Stripe, pas réconciliation exhaustive webhook ou remboursements.
- [x] ScheduleTask activée sur cette tâche : récapitulatif quotidien à 08:00 America/Toronto, Slack privé de Maxime (D02GHE3J9FS), source réelle server/marketingDigest.ts, dédoublonnage des messages par journée, états explicites pour données non mesurées.
- [x] Test de livraison Slack réussi : https://clubadm.slack.com/archives/D02GHE3J9FS/p1792512585710729
- [x] Migration additive 0003_unusual_black_bird.sql appliquée; tables membres, onboarding et programmes préservées.
- [x] Validation : TypeScript, 114 tests Vitest; QA navigateur 12 scénarios aux largeurs 320/375/1440, quiz complet, panneau privé avec données fictives isolées. Aucun profil QA enregistré; thumbnails et URLs de course inchangés.
- [ ] Publier le checkpoint final depuis Manus : aucun outil de publication autonome disponible. Le site public conserve l’ancienne version jusque-là; le digest signale « suivi en attente de publication ».
- [ ] GHL LeadConnector non connecté; pas de synchronisation CRM ni vrai calendrier de réservation ajouté. La boîte privée reçoit les demandes après publication, sans prétendre réserver un rendez-vous ou transmettre au CRM.
- [ ] Stripe reste verrouillé (clés/configuration absentes; remise/accès à valider). Aucun paiement activé dans cette tâche.
- [ ] Pas d’accès API aux rapports Umami historiques ni création native de Goals/Funnels dans son interface. Le panneau et Slack utilisent clairement le suivi privé du site, pas les statistiques historiques Umami.
- [ ] Coûts publicitaires, ventes coach et rendez-vous honorés non connectés, affichés non mesurés. Dashboard mots-clés toujours en attente.
