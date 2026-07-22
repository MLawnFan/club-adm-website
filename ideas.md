# Brainstorming Design — Club ADM Fitness

## Contexte
Site d'accueil pour un gym d'entraînement fonctionnel québécois. Couleurs de marque : bleu marine #232862, rouge #ed1c24, blanc. Ambiance athlétique, professionnelle, canadienne. Inspiré de Mayhem Nation, HWPO Training. Offre hybride : gym physique + programmation en ligne.

---

<response>
<idea>

## Approche 1 : « Brutalisme Athlétique »

**Design Movement :** Brutalisme web revisité, inspiré des affiches de compétitions de strongman et des panneaux industriels de gym.

**Core Principles :**
1. Typographie massive et brute comme élément graphique dominant
2. Contrastes extrêmes entre sections (noir profond / blanc pur / rouge vif)
3. Grilles cassées et asymétriques qui évoquent la puissance et le mouvement
4. Textures industrielles (béton, métal, grain) en arrière-plan

**Color Philosophy :** Le noir domine comme un gym sombre la nuit, le rouge #ed1c24 frappe comme un signal d'urgence — il représente l'effort, la sueur, le dépassement. Le bleu marine #232862 apporte la structure et la confiance. Le blanc est utilisé avec parcimonie comme respiration visuelle.

**Layout Paradigm :** Sections plein écran empilées verticalement avec des coupes diagonales (clip-path) entre elles. Chaque section est un « bloc de béton » visuel. Le contenu est aligné à gauche avec des images qui débordent de leur conteneur.

**Signature Elements :**
- Barres de progression animées qui rappellent les barres d'haltères
- Texte qui apparaît lettre par lettre comme un chronomètre de WOD
- Séparateurs diagonaux rouges entre les sections

**Interaction Philosophy :** Les interactions sont directes et percutantes — pas de subtilité, mais de l'impact. Les boutons ont un effet de « slam » au clic, les sections apparaissent avec un mouvement de poussée.

**Animation :** Entrées par translation latérale agressive (depuis la gauche pour le texte, depuis la droite pour les images). Parallaxe sur les images de fond. Compteurs animés pour les statistiques.

**Typography System :** Oswald (Black 900) pour les titres — condensé, vertical, puissant. Barlow pour le corps de texte — technique et lisible. Tailles de titres extrêmes (clamp 4rem-8rem).

</idea>
<probability>0.07</probability>
</response>

---

<response>
<idea>

## Approche 2 : « Cinématique Sombre »

**Design Movement :** Dark cinematic, inspiré des trailers de documentaires sportifs Netflix et des sites de marques premium comme Nike Training.

**Core Principles :**
1. Fond sombre omniprésent avec des révélations lumineuses progressives
2. Images et vidéos en plein écran comme toile de fond narrative
3. Typographie élégante mais affirmée — l'équilibre entre luxe et force
4. Storytelling visuel : chaque scroll raconte un chapitre de l'histoire Club ADM

**Color Philosophy :** Le fond est un noir profond (#0a0a12) teinté de bleu marine, évoquant l'atmosphère d'un gym à 5h du matin. Le rouge #ed1c24 est utilisé exclusivement pour les CTA et les accents — il est le « feu intérieur » qui motive. Le bleu #232862 crée des dégradés subtils dans les ombres. Le blanc cassé pour le texte principal.

**Layout Paradigm :** Full-bleed sections avec des images qui occupent 60-70% de la hauteur d'écran. Le texte est superposé sur des overlays semi-transparents. Alternance entre sections « immersives » (image dominante) et sections « informatives » (fond uni sombre).

**Signature Elements :**
- Lignes lumineuses rouges qui traversent les sections comme des lasers de gym
- Effet de « reveal » au scroll — le contenu émerge de l'obscurité
- Bordure rouge fine (1px) comme accent sur les cartes et les séparateurs

**Interaction Philosophy :** Fluide et cinématique. Les transitions sont douces, les hover effects révèlent des informations supplémentaires avec un fondu. L'expérience est contemplative mais engageante — comme regarder un documentaire.

**Animation :** Fade-in au scroll avec léger mouvement vertical (translateY). Parallaxe subtile sur les images de fond. Les CTA ont un glow rouge au hover. Les statistiques comptent progressivement quand elles entrent dans le viewport.

**Typography System :** Bebas Neue pour les titres — cinématique, impactant, condensé. Inter ou DM Sans pour le corps — moderne et très lisible sur fond sombre. Hiérarchie claire avec des tailles généreuses et un line-height aéré.

</idea>
<probability>0.06</probability>
</response>

---

<response>
<idea>

## Approche 3 : « Géométrie Militaire »

**Design Movement :** Tactical design, inspiré de l'esthétique militaire/tactique et des marques comme 5.11 Tactical et Rogue Fitness.

**Core Principles :**
1. Grilles rigides et modulaires rappelant des plans tactiques
2. Éléments graphiques angulaires (coins coupés, hexagones, chevrons)
3. Palette restreinte et disciplinée — chaque couleur a un rôle précis
4. Iconographie technique et fonctionnelle

**Color Philosophy :** Le bleu marine #232862 est la couleur « uniforme » — il domine les en-têtes et les zones de navigation. Le rouge #ed1c24 est le « marqueur tactique » — il signale les actions importantes et les urgences. Un gris acier (#1a1a2e à #2d2d44) sert de fond neutre. Le blanc est réservé au texte et aux données.

**Layout Paradigm :** Grille modulaire stricte avec des cartes à coins coupés (clip-path sur les coins supérieurs droits). Les sections sont séparées par des bandes horizontales colorées rappelant des grades militaires. Navigation fixe en haut avec un style « HUD » (heads-up display).

**Signature Elements :**
- Coins coupés à 45° sur les boutons et les cartes (style tactical)
- Numérotation des sections (01, 02, 03...) en grand format
- Lignes de grille subtiles en arrière-plan rappelant un plan de mission

**Interaction Philosophy :** Précise et fonctionnelle. Chaque interaction a un feedback immédiat et net. Les boutons ont un état « actif » marqué avec une bordure rouge. La navigation est efficace — pas de fioritures, chaque clic mène quelque part.

**Animation :** Entrées séquentielles (stagger) des éléments de grille. Les cartes se « déploient » avec un effet de rotation 3D subtile. Les numéros de section apparaissent avec un effet de compteur digital.

**Typography System :** Rajdhani ou Chakra Petch pour les titres — géométrique, technique, avec une touche futuriste. Source Sans 3 pour le corps — neutre, professionnel, hautement lisible. Utilisation de lettres capitales pour les labels et les catégories.

</idea>
<probability>0.05</probability>
</response>

---

## Choix retenu : Approche 2 — « Cinématique Sombre »

Cette approche est la plus alignée avec l'identité Club ADM et les références (Mayhem Nation, HWPO). Elle offre un impact visuel fort tout en restant professionnelle et moderne. Le storytelling visuel est idéal pour présenter à la fois le gym physique et l'offre en ligne.
