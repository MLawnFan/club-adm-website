/*
 * BLOG — Club ADM Fitness
 * Design lumineux, fond blanc dominant, inspiré Mayhem Nation
 * Listing d'articles avec catégories, recherche, et featured article
 * Couleurs: navy #232862, rouge #ed1c24, blanc, cream
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, Tag, User } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── IMAGES ─── */
const IMG_FEATURED = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80";
const IMG_NUTRITION = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80";
const IMG_RECOVERY = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80";
const IMG_STRENGTH = "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80";
const IMG_MINDSET = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80";
const IMG_MOBILITY = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80";
const IMG_BEGINNERS = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80";
const IMG_HIIT = "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80";
const IMG_SLEEP = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80";
const IMG_PROTEIN = "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80";

/* ─── CATEGORIES ─── */
const CATEGORIES = [
  "Tous",
  "Entraînement",
  "Nutrition",
  "Récupération",
  "Mindset",
  "Débutants",
];

/* ─── ARTICLES DATA ─── */
export const BLOG_ARTICLES = [
  {
    slug: "5-mouvements-fonctionnels-essentiels",
    title: "5 Mouvements Fonctionnels Essentiels Pour Transformer Ton Corps",
    excerpt: "Découvre les mouvements de base qui forment la fondation de tout programme d'entraînement fonctionnel efficace. Du squat au deadlift, maîtrise les fondamentaux.",
    content: `L'entraînement fonctionnel repose sur des mouvements naturels du corps humain. Contrairement aux machines de gym traditionnelles qui isolent les muscles, ces exercices recrutent plusieurs groupes musculaires simultanément, améliorant ta force, ta mobilité et ta coordination.

## 1. Le Squat

Le squat est le roi des mouvements fonctionnels. Il travaille les quadriceps, les fessiers, les ischio-jambiers et le tronc. C'est un mouvement que tu fais naturellement chaque jour — quand tu t'assieds, quand tu ramasses quelque chose au sol.

**Points clés :**
- Pieds à la largeur des épaules
- Pousse les genoux vers l'extérieur
- Garde la poitrine haute
- Descends sous le parallèle si ta mobilité le permet

## 2. Le Deadlift

Le deadlift est l'exercice le plus fonctionnel qui existe. Il simule le geste de ramasser un objet lourd au sol — un mouvement que tu fais quotidiennement.

**Points clés :**
- Barre au-dessus du milieu du pied
- Épaules au-dessus de la barre
- Dos neutre tout au long du mouvement
- Pousse le sol avec les pieds

## 3. Le Press (Overhead)

Pousser un objet au-dessus de ta tête est un mouvement fondamental. Le press développe la force des épaules, des triceps et du tronc.

**Points clés :**
- Prise légèrement plus large que les épaules
- Coudes devant la barre au départ
- Pousse la tête à travers une fois la barre passée
- Verrouille les coudes en haut

## 4. Le Pull-up

Le pull-up est le meilleur exercice pour développer la force du haut du dos et des biceps. C'est aussi un excellent indicateur de ta force relative.

**Points clés :**
- Prise pronation, légèrement plus large que les épaules
- Pars d'une position bras tendus
- Tire les coudes vers le bas et l'arrière
- Menton au-dessus de la barre

## 5. Le Burpee

Le burpee combine un squat, une planche, une pompe et un saut. C'est l'exercice cardio fonctionnel par excellence.

**Points clés :**
- Mains au sol, saute les pieds en arrière
- Poitrine au sol
- Pousse, ramène les pieds et saute
- Extension complète en haut

## Conclusion

Maîtrise ces 5 mouvements et tu auras une base solide pour n'importe quel programme d'entraînement fonctionnel. Chez Club ADM, nous intégrons ces mouvements dans chacune de nos séances pour garantir des résultats optimaux.`,
    category: "Entraînement",
    author: "Coach Maxime",
    date: "28 février 2026",
    readTime: "6 min",
    image: IMG_FEATURED,
    featured: true,
  },
  {
    slug: "guide-nutrition-pre-post-entrainement",
    title: "Guide Complet : Quoi Manger Avant et Après l'Entraînement",
    excerpt: "Optimise tes performances et ta récupération avec les bons choix alimentaires. Un guide pratique basé sur la science de la nutrition sportive.",
    content: `La nutrition autour de l'entraînement est l'un des facteurs les plus importants pour maximiser tes résultats. Ce que tu manges avant et après ta séance peut faire la différence entre des progrès constants et la stagnation.

## Avant l'Entraînement (1-2h avant)

L'objectif est de fournir à ton corps l'énergie nécessaire pour performer sans te sentir lourd.

**Repas idéal :**
- Glucides complexes (riz, patates douces, avoine)
- Protéines maigres (poulet, poisson, oeufs)
- Peu de gras (ralentit la digestion)

**Exemples concrets :**
- Bol de riz + poulet grillé + légumes
- Gruau + banane + beurre d'amande (petite quantité)
- Toast de grains entiers + oeufs brouillés

## Après l'Entraînement (dans les 60 min)

La fenêtre post-entraînement est cruciale pour la récupération et la croissance musculaire.

**Repas idéal :**
- Protéines rapides (whey, poulet, poisson)
- Glucides pour reconstituer le glycogène
- Hydratation adéquate

**Exemples concrets :**
- Shake protéiné + banane
- Poulet + riz + légumes verts
- Saumon + patate douce + brocoli

## L'Hydratation

Ne sous-estime jamais l'importance de l'hydratation. Une déshydratation de seulement 2% peut réduire tes performances de 10-20%.

**Recommandations :**
- 500ml d'eau 2h avant l'entraînement
- Petites gorgées pendant la séance
- 500-750ml après l'entraînement
- Ajoute des électrolytes pour les séances de plus de 60 min

## Conclusion

La nutrition n'a pas besoin d'être compliquée. Concentre-toi sur des aliments entiers, mange suffisamment de protéines et hydrate-toi bien. Nos coachs en nutrition chez Club ADM peuvent t'aider à créer un plan personnalisé adapté à tes objectifs.`,
    category: "Nutrition",
    author: "Coach Sarah",
    date: "25 février 2026",
    readTime: "8 min",
    image: IMG_NUTRITION,
    featured: false,
  },
  {
    slug: "importance-recuperation-entrainement",
    title: "Pourquoi la Récupération Est Aussi Importante Que l'Entraînement",
    excerpt: "La récupération est souvent négligée, pourtant c'est pendant le repos que ton corps se reconstruit et devient plus fort. Voici comment optimiser ta récupération.",
    content: `Beaucoup de gens pensent que plus ils s'entraînent, plus ils progressent. En réalité, c'est pendant la récupération que la magie opère. L'entraînement crée le stimulus, mais c'est le repos qui permet l'adaptation.

## Les Piliers de la Récupération

### 1. Le Sommeil
Le sommeil est le facteur de récupération numéro un. Pendant le sommeil profond, ton corps libère l'hormone de croissance, répare les tissus musculaires et consolide les apprentissages moteurs.

**Objectif :** 7-9 heures par nuit

### 2. La Nutrition Post-Entraînement
Comme mentionné dans notre article sur la nutrition, ce que tu manges après l'entraînement est crucial pour la récupération.

### 3. La Mobilité et les Étirements
Consacre 10-15 minutes après chaque séance à la mobilité. Cela aide à réduire les courbatures et améliore ta flexibilité.

### 4. La Gestion du Stress
Le stress chronique augmente le cortisol, ce qui nuit à la récupération. Trouve des stratégies pour gérer ton stress : méditation, marche en nature, lecture.

## Signes de Sur-entraînement

- Fatigue persistante
- Baisse de performance
- Irritabilité
- Troubles du sommeil
- Blessures fréquentes

## Conclusion

Écoute ton corps. Les jours de repos ne sont pas des jours perdus — ce sont des jours de construction. Chez Club ADM, nous programmons intelligemment les jours de récupération active pour maximiser tes résultats.`,
    category: "Récupération",
    author: "Coach Maxime",
    date: "20 février 2026",
    readTime: "5 min",
    image: IMG_RECOVERY,
    featured: false,
  },
  {
    slug: "progresser-en-force-programme-lineaire",
    title: "Comment Progresser en Force avec un Programme Linéaire Simple",
    excerpt: "Un programme de force linéaire est la méthode la plus efficace pour les débutants et intermédiaires. Découvre comment structurer ta progression.",
    content: `La progression linéaire est la méthode la plus simple et la plus efficace pour développer ta force. Le principe est simple : ajouter un peu de poids à chaque séance.

## Le Principe de Base

Chaque semaine, tu augmentes la charge de 2.5-5 lbs sur tes mouvements principaux. Cela semble peu, mais sur 12 semaines, ça représente 30-60 lbs de progression.

## Programme Exemple (3 jours/semaine)

### Jour A
- Back Squat : 5×5
- Bench Press : 5×5
- Barbell Row : 5×5

### Jour B
- Back Squat : 5×5
- Overhead Press : 5×5
- Deadlift : 1×5

## Règles de Progression

1. Si tu complètes tous les sets et reps, augmente de 5 lbs la prochaine séance
2. Si tu échoues, garde le même poids et réessaie
3. Après 3 échecs consécutifs, réduis de 10% et recommence

## Conclusion

La clé est la constance. Ne cherche pas à aller trop vite. La force se construit avec le temps et la patience. Nos coachs Club ADM peuvent t'aider à déterminer tes charges de départ et superviser ta technique.`,
    category: "Entraînement",
    author: "Coach Alex",
    date: "15 février 2026",
    readTime: "7 min",
    image: IMG_STRENGTH,
    featured: false,
  },
  {
    slug: "mindset-athlete-mental-entrainement",
    title: "Le Mindset d'Athlète : Comment le Mental Transforme Tes Résultats",
    excerpt: "Ton corps est capable de bien plus que ce que ton esprit te laisse croire. Découvre les stratégies mentales utilisées par les meilleurs athlètes.",
    content: `Le mental est souvent le facteur limitant numéro un. Ton corps peut en faire plus, mais ton esprit te dit d'arrêter. Apprendre à repousser ces limites mentales est ce qui sépare ceux qui obtiennent des résultats de ceux qui stagnent.

## Les 4 Piliers du Mindset d'Athlète

### 1. La Visualisation
Avant chaque séance, visualise-toi en train de réussir tes mouvements. Les études montrent que la visualisation active les mêmes circuits neuronaux que l'exécution réelle.

### 2. Le Dialogue Interne
Remplace "je ne suis pas capable" par "je suis en train d'apprendre". Le langage que tu utilises avec toi-même influence directement tes performances.

### 3. La Présence
Sois 100% présent pendant ta séance. Pas de téléphone, pas de distractions. Chaque rep compte.

### 4. L'Acceptation de l'Inconfort
La croissance se produit en dehors de ta zone de confort. Apprends à être à l'aise avec l'inconfort — c'est là que la transformation se produit.

## Conclusion

Le gym est un laboratoire pour le mental autant que pour le physique. Les qualités que tu développes — discipline, résilience, persévérance — se transfèrent dans tous les aspects de ta vie.`,
    category: "Mindset",
    author: "Coach Maxime",
    date: "10 février 2026",
    readTime: "5 min",
    image: IMG_MINDSET,
    featured: false,
  },
  {
    slug: "mobilite-routine-10-minutes",
    title: "Routine de Mobilité en 10 Minutes Pour Améliorer Tes Performances",
    excerpt: "Une routine de mobilité quotidienne peut transformer ta qualité de mouvement et prévenir les blessures. Voici une routine simple et efficace.",
    content: `La mobilité est la capacité à bouger tes articulations dans leur amplitude complète avec contrôle. C'est la fondation de tout mouvement de qualité.

## Routine de 10 Minutes

### 1. Cat-Cow (1 min)
Alterne entre la flexion et l'extension de la colonne. Respire profondément.

### 2. World's Greatest Stretch (2 min)
Fente avant, rotation thoracique, extension du bras. Le meilleur stretch qui existe.

### 3. Hip 90/90 (2 min)
Assis au sol, jambes à 90 degrés. Alterne entre rotation interne et externe.

### 4. Shoulder Pass-Throughs (1 min)
Avec un bâton ou une bande, passe de l'avant vers l'arrière en gardant les bras tendus.

### 5. Deep Squat Hold (2 min)
Tiens une position de squat profond. Utilise un support si nécessaire.

### 6. Ankle Circles + Calf Stretch (2 min)
Mobilise les chevilles dans toutes les directions, puis étire les mollets.

## Quand la Faire ?

- Le matin au réveil pour bien commencer la journée
- Avant l'entraînement comme échauffement
- Le soir pour favoriser la récupération

## Conclusion

10 minutes par jour peuvent transformer ta mobilité en quelques semaines. Intègre cette routine dans ton quotidien et tu verras une amélioration significative de tes performances.`,
    category: "Récupération",
    author: "Coach Sarah",
    date: "5 février 2026",
    readTime: "4 min",
    image: IMG_MOBILITY,
    featured: false,
  },
  {
    slug: "guide-debutant-entrainement-fonctionnel",
    title: "Guide du Débutant : Tes 30 Premiers Jours en Entraînement Fonctionnel",
    excerpt: "Tu veux commencer l'entraînement fonctionnel mais tu ne sais pas par où débuter ? Ce guide étape par étape t'accompagne dans tes 30 premiers jours.",
    content: `Commencer un nouveau programme d'entraînement peut être intimidant. Ce guide t'accompagne semaine par semaine pour tes 30 premiers jours.

## Semaine 1 : Les Fondations

L'objectif est d'apprendre les mouvements de base avec une charge légère ou au poids du corps.

- Air Squat
- Push-up (modifié si nécessaire)
- Ring Row
- Planche
- Box Step-up

**Fréquence :** 3 séances de 30-40 minutes

## Semaine 2 : Ajouter de l'Intensité

Tu commences à ajouter de la charge légère et à augmenter le rythme.

- Goblet Squat
- Dumbbell Press
- Kettlebell Deadlift
- Rowing machine
- Burpees modifiés

**Fréquence :** 3-4 séances de 40-45 minutes

## Semaine 3 : Introduction aux WODs

Tu es prêt pour tes premiers WODs (Workout of the Day) avec des mouvements que tu maîtrises.

## Semaine 4 : Consolidation

Reviens sur les mouvements de base avec plus de confiance et de charge.

## Conseils Importants

1. **Ne compare pas** — Chacun a son propre parcours
2. **Écoute ton corps** — La douleur n'est pas normale
3. **Sois constant** — 3 fois par semaine suffit pour commencer
4. **Demande de l'aide** — Nos coachs sont là pour toi

## Conclusion

Les 30 premiers jours sont les plus importants. C'est là que tu construis les habitudes qui te porteront pendant des années. Chez Club ADM, notre cours d'initiation est spécialement conçu pour t'accompagner dans cette transition.`,
    category: "Débutants",
    author: "Coach Alex",
    date: "1 février 2026",
    readTime: "6 min",
    image: IMG_BEGINNERS,
    featured: false,
  },
  {
    slug: "hiit-vs-steady-state-cardio",
    title: "HIIT vs Cardio Continu : Lequel Est Meilleur Pour Toi ?",
    excerpt: "Le débat entre HIIT et cardio continu fait rage. La vérité ? Les deux ont leur place. Découvre quand utiliser chaque méthode.",
    content: `Le HIIT (High-Intensity Interval Training) et le cardio continu sont deux approches différentes avec des bénéfices distincts.

## HIIT : Les Avantages

- Brûle plus de calories en moins de temps
- Effet EPOC (continue à brûler après l'entraînement)
- Améliore la capacité anaérobie
- Sessions courtes (15-25 minutes)

## Cardio Continu : Les Avantages

- Développe la base aérobie
- Moins stressant pour le système nerveux
- Favorise la récupération active
- Accessible à tous les niveaux

## Notre Recommandation

La meilleure approche combine les deux :
- 2-3 sessions HIIT par semaine
- 1-2 sessions de cardio continu (30-45 min)
- 1 jour de récupération active (marche, yoga)

## Conclusion

Ne choisis pas l'un ou l'autre — utilise les deux intelligemment. Chez Club ADM, nos programmations intègrent les deux types de cardio pour des résultats optimaux.`,
    category: "Entraînement",
    author: "Coach Sarah",
    date: "28 janvier 2026",
    readTime: "5 min",
    image: IMG_HIIT,
    featured: false,
  },
  {
    slug: "sommeil-performance-sportive",
    title: "Le Sommeil : L'Arme Secrète de la Performance Sportive",
    excerpt: "Les meilleurs athlètes du monde dorment 8-10 heures par nuit. Découvre pourquoi le sommeil est ton meilleur outil de récupération.",
    content: `Le sommeil est le facteur de récupération le plus sous-estimé. Pendant que tu dors, ton corps libère l'hormone de croissance, répare les tissus et consolide la mémoire musculaire.

## L'Impact du Sommeil sur la Performance

- **Force :** Une nuit de mauvais sommeil peut réduire ta force de 10-30%
- **Réaction :** Le temps de réaction diminue significativement avec le manque de sommeil
- **Blessures :** Les athlètes qui dorment moins de 7h ont 1.7x plus de risques de blessure
- **Récupération :** Le sommeil profond est essentiel pour la réparation musculaire

## Stratégies Pour Mieux Dormir

1. Couche-toi et lève-toi à la même heure chaque jour
2. Évite les écrans 1h avant le coucher
3. Garde ta chambre fraîche (18-20°C)
4. Évite la caféine après 14h
5. Crée un rituel de coucher relaxant

## Conclusion

Investis dans ton sommeil autant que dans ton entraînement. C'est gratuit, c'est efficace, et ça transforme tes résultats.`,
    category: "Récupération",
    author: "Coach Maxime",
    date: "22 janvier 2026",
    readTime: "4 min",
    image: IMG_SLEEP,
    featured: false,
  },
  {
    slug: "combien-proteines-par-jour",
    title: "Combien de Protéines Par Jour ? Le Guide Définitif",
    excerpt: "Les protéines sont essentielles pour la récupération et la croissance musculaire. Mais combien en as-tu vraiment besoin ? La réponse dépend de tes objectifs.",
    content: `Les protéines sont les briques de construction de tes muscles. Sans un apport suffisant, tu ne pourras pas récupérer ni progresser de manière optimale.

## Les Recommandations

- **Sédentaire :** 0.8g par kg de poids corporel
- **Actif (3-4x/semaine) :** 1.2-1.6g par kg
- **Athlète / Objectif musculaire :** 1.6-2.2g par kg
- **Perte de poids :** 1.8-2.4g par kg (pour préserver la masse musculaire)

## Les Meilleures Sources

### Animales
- Poulet, dinde
- Poisson, fruits de mer
- Oeufs
- Boeuf maigre
- Produits laitiers (yogourt grec, fromage cottage)

### Végétales
- Légumineuses (lentilles, pois chiches)
- Tofu, tempeh
- Quinoa
- Noix et graines

## Timing

Répartis tes protéines sur 3-5 repas dans la journée (25-40g par repas) plutôt que de tout concentrer en un seul repas.

## Conclusion

Les protéines ne sont pas compliquées. Mange une source de protéines à chaque repas, vise 1.6-2.2g par kg si tu t'entraînes régulièrement, et privilégie les aliments entiers. Nos coachs en nutrition peuvent t'aider à calculer tes besoins précis.`,
    category: "Nutrition",
    author: "Coach Sarah",
    date: "15 janvier 2026",
    readTime: "6 min",
    image: IMG_PROTEIN,
    featured: false,
  },
];

/* ─── ARTICLE CARD ─── */
function ArticleCard({ article, index }: { article: typeof BLOG_ARTICLES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={`/blog/${article.slug}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden mb-4">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-adm-red text-white text-[10px] font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 text-navy/40 text-xs mb-2">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {article.readTime}
            </span>
            <span>{article.date}</span>
          </div>
          <h3
            className="text-navy text-lg leading-tight mb-2 group-hover:text-adm-red transition-colors"
            style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}
          >
            {article.title}
          </h3>
          <p className="text-navy/50 text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-1.5 mt-3 text-adm-red text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
            Lire l'article
            <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── FEATURED ARTICLE ─── */
function FeaturedArticle({ article }: { article: typeof BLOG_ARTICLES[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${article.slug}`} className="group block">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-adm-red text-white text-[11px] font-bold uppercase tracking-wider">
                Article Vedette
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-cream/50 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-navy/40 text-xs mb-4">
              <span className="flex items-center gap-1">
                <Tag size={11} />
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>
            <h2
              className="text-navy text-3xl lg:text-4xl leading-tight mb-4 group-hover:text-adm-red transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {article.title}
            </h2>
            <p className="text-navy/60 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User size={14} className="text-navy/40" />
                <span className="text-navy/60 text-sm font-medium">{article.author}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-adm-red text-sm font-bold uppercase tracking-wider">
              Lire l'article
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticle = BLOG_ARTICLES.find((a) => a.featured);
  
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      if (article.featured) return false; // exclude featured from grid
      const matchCategory = activeCategory === "Tous" || article.category === activeCategory;
      const matchSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-12 pb-8 lg:pt-20 lg:pb-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="text-adm-red text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Blog & Ressources
            </span>
            <h1
              className="text-navy text-5xl lg:text-6xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NOTRE EXPERTISE,{" "}
              <span className="text-adm-red">PARTAGÉE.</span>
            </h1>
            <p className="text-navy/50 text-lg leading-relaxed">
              Conseils d'entraînement, nutrition, récupération et mindset par nos coachs certifiés. Tout ce dont tu as besoin pour progresser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="pb-12 lg:pb-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </section>
      )}

      {/* Filters + Search */}
      <section className="py-6 bg-white border-t border-gray-100">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    activeCategory === cat
                      ? "bg-navy text-white"
                      : "bg-cream text-navy/60 hover:text-navy hover:bg-cream/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/30" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-cream border-0 text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-adm-red/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredArticles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-navy/40 text-lg">Aucun article trouvé pour cette recherche.</p>
              <button
                onClick={() => { setActiveCategory("Tous"); setSearchQuery(""); }}
                className="mt-4 text-adm-red text-sm font-bold uppercase tracking-wider hover:underline"
              >
                Voir tous les articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#232862" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-white text-3xl lg:text-4xl mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              RESTE INFORMÉ
            </h2>
            <p className="text-white/50 max-w-lg mx-auto mb-8">
              Reçois nos meilleurs articles, conseils d'entraînement et offres exclusives directement dans ta boîte courriel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ton courriel"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-adm-red"
              />
              <button className="px-6 py-3 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors">
                S'abonner
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
