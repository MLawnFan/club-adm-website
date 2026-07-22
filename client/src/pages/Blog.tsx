/*
 * BLOG — Club ADM Fitness — Dark premium
 * Fond navy sombre, cartes sombres, texte blanc/crème
 */
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Clock, ArrowRight, Tag, User } from "lucide-react";
import { Link } from "wouter";
import PromoBanner from "@/components/PromoBanner";
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

const CATEGORIES = ["Tous", "Entraînement", "Nutrition", "Récupération", "Mindset", "Débutants"];

export const BLOG_ARTICLES = [
  {
    slug: "5-mouvements-fonctionnels-essentiels",
    title: "5 Mouvements Fonctionnels Essentiels Pour Transformer Ton Corps",
    excerpt: "Découvre les mouvements de base qui forment la fondation de tout programme d'entraînement fonctionnel efficace. Du squat au deadlift, maîtrise les fondamentaux.",
    content: `L'entraînement fonctionnel repose sur des mouvements naturels du corps humain. Contrairement aux machines de gym traditionnelles qui isolent les muscles, ces exercices recrutent plusieurs groupes musculaires simultanément, améliorant ta force, ta mobilité et ta coordination.\n\n## 1. Le Squat\n\nLe squat est le roi des mouvements fonctionnels. Il travaille les quadriceps, les fessiers, les ischio-jambiers et le tronc.\n\n**Points clés :**\n- Pieds à la largeur des épaules\n- Pousse les genoux vers l'extérieur\n- Garde la poitrine haute\n- Descends sous le parallèle si ta mobilité le permet\n\n## 2. Le Deadlift\n\nLe deadlift est l'exercice le plus fonctionnel qui existe. Il simule le geste de ramasser un objet lourd au sol.\n\n**Points clés :**\n- Barre au-dessus du milieu du pied\n- Épaules au-dessus de la barre\n- Dos neutre tout au long du mouvement\n- Pousse le sol avec les pieds\n\n## 3. Le Press (Overhead)\n\nPousser un objet au-dessus de ta tête est un mouvement fondamental.\n\n**Points clés :**\n- Prise légèrement plus large que les épaules\n- Coudes devant la barre au départ\n- Pousse la tête à travers une fois la barre passée\n- Verrouille les coudes en haut\n\n## 4. Le Pull-up\n\nLe pull-up est le meilleur exercice pour développer la force du haut du dos et des biceps.\n\n**Points clés :**\n- Prise pronation, légèrement plus large que les épaules\n- Pars d'une position bras tendus\n- Tire les coudes vers le bas et l'arrière\n- Menton au-dessus de la barre\n\n## 5. Le Burpee\n\nLe burpee combine un squat, une planche, une pompe et un saut.\n\n**Points clés :**\n- Mains au sol, saute les pieds en arrière\n- Poitrine au sol\n- Pousse, ramène les pieds et saute\n- Extension complète en haut\n\n## Conclusion\n\nMaîtrise ces 5 mouvements et tu auras une base solide pour n'importe quel programme d'entraînement fonctionnel. Chez Club ADM, nous intégrons ces mouvements dans chacune de nos séances pour garantir des résultats optimaux.`,
    category: "Entraînement", author: "Coach Maxime", date: "28 février 2026", readTime: "6 min", image: IMG_FEATURED, featured: true,
  },
  {
    slug: "guide-nutrition-pre-post-entrainement",
    title: "Guide Complet : Quoi Manger Avant et Après l'Entraînement",
    excerpt: "Optimise tes performances et ta récupération avec les bons choix alimentaires. Un guide pratique basé sur la science de la nutrition sportive.",
    content: `La nutrition autour de l'entraînement est l'un des facteurs les plus importants pour maximiser tes résultats.\n\n## Avant l'Entraînement (1-2h avant)\n\n**Repas idéal :**\n- Glucides complexes (riz, patates douces, avoine)\n- Protéines maigres (poulet, poisson, oeufs)\n- Peu de gras\n\n## Après l'Entraînement (dans les 60 min)\n\n**Repas idéal :**\n- Protéines rapides (whey, poulet, poisson)\n- Glucides pour reconstituer le glycogène\n- Hydratation adéquate\n\n## Conclusion\n\nLa nutrition n'a pas besoin d'être compliquée. Nos coachs en nutrition chez Club ADM peuvent t'aider à créer un plan personnalisé.`,
    category: "Nutrition", author: "Coach Sarah", date: "25 février 2026", readTime: "8 min", image: IMG_NUTRITION, featured: false,
  },
  {
    slug: "importance-recuperation-entrainement",
    title: "Pourquoi la Récupération Est Aussi Importante Que l'Entraînement",
    excerpt: "La récupération est souvent négligée, pourtant c'est pendant le repos que ton corps se reconstruit et devient plus fort.",
    content: `Beaucoup de gens pensent que plus ils s'entraînent, plus ils progressent. En réalité, c'est pendant la récupération que la magie opère.\n\n## Les Piliers de la Récupération\n\n### 1. Le Sommeil\n**Objectif :** 7-9 heures par nuit\n\n### 2. La Nutrition Post-Entraînement\n\n### 3. La Mobilité et les Étirements\n\n### 4. La Gestion du Stress\n\n## Conclusion\n\nÉcoute ton corps. Les jours de repos ne sont pas des jours perdus — ce sont des jours de construction.`,
    category: "Récupération", author: "Coach Maxime", date: "20 février 2026", readTime: "5 min", image: IMG_RECOVERY, featured: false,
  },
  {
    slug: "progresser-en-force-programme-lineaire",
    title: "Comment Progresser en Force avec un Programme Linéaire Simple",
    excerpt: "Un programme de force linéaire est la méthode la plus efficace pour les débutants et intermédiaires.",
    content: `La progression linéaire est la méthode la plus simple et la plus efficace pour développer ta force.\n\n## Le Principe de Base\n\nChaque semaine, tu augmentes la charge de 2.5-5 lbs sur tes mouvements principaux.\n\n## Conclusion\n\nLa clé est la constance. Nos coachs Club ADM peuvent t'aider à déterminer tes charges de départ.`,
    category: "Entraînement", author: "Coach Alex", date: "15 février 2026", readTime: "7 min", image: IMG_STRENGTH, featured: false,
  },
  {
    slug: "mindset-athlete-mental-entrainement",
    title: "Le Mindset d'Athlète : Comment le Mental Transforme Tes Résultats",
    excerpt: "Ton corps est capable de bien plus que ce que ton esprit te laisse croire. Découvre les stratégies mentales utilisées par les meilleurs athlètes.",
    content: `Le mental est souvent le facteur limitant numéro un.\n\n## Les 4 Piliers du Mindset d'Athlète\n\n### 1. La Visualisation\n### 2. Le Dialogue Interne\n### 3. La Routine\n### 4. L'Acceptation de l'Inconfort\n\n## Conclusion\n\nLe mental se travaille comme un muscle. Plus tu le sollicites, plus il devient fort.`,
    category: "Mindset", author: "Coach Maxime", date: "10 février 2026", readTime: "6 min", image: IMG_MINDSET, featured: false,
  },
  {
    slug: "mobilite-cle-performance-longevite",
    title: "La Mobilité : La Clé Secrète de la Performance et de la Longévité",
    excerpt: "La mobilité est souvent le chaînon manquant entre toi et tes objectifs de performance.",
    content: `La mobilité est la capacité de bouger une articulation à travers son amplitude complète de mouvement avec contrôle.\n\n## Conclusion\n\nInvestis 10-15 minutes par jour dans ta mobilité. C'est le meilleur investissement que tu puisses faire pour ta santé à long terme.`,
    category: "Récupération", author: "Coach Sarah", date: "5 février 2026", readTime: "5 min", image: IMG_MOBILITY, featured: false,
  },
  {
    slug: "guide-debutant-crossfit-fonctionnel",
    title: "Guide du Débutant : Ta Première Semaine en Entraînement Fonctionnel",
    excerpt: "Tu veux commencer l'entraînement fonctionnel mais tu ne sais pas par où commencer? Ce guide est fait pour toi.",
    content: `Commencer un nouveau programme d'entraînement peut être intimidant. Ce guide va t'accompagner pas à pas.\n\n## Conclusion\n\nLa première semaine est toujours la plus difficile. Après, ça devient une habitude. Et on est là pour t'accompagner à chaque étape.`,
    category: "Débutants", author: "Coach Alex", date: "1 février 2026", readTime: "8 min", image: IMG_BEGINNERS, featured: false,
  },
  {
    slug: "hiit-vs-steady-state-cardio",
    title: "HIIT vs Cardio Traditionnel : Quel Est le Meilleur Pour Toi?",
    excerpt: "Le débat entre HIIT et cardio steady-state fait rage. Voici ce que la science dit vraiment.",
    content: `Le HIIT et le cardio traditionnel ont chacun leurs avantages.\n\n## Conclusion\n\nLa meilleure approche est souvent une combinaison des deux. Chez Club ADM, nos programmes intègrent les deux types de cardio.`,
    category: "Entraînement", author: "Coach Sarah", date: "28 janvier 2026", readTime: "6 min", image: IMG_HIIT, featured: false,
  },
  {
    slug: "sommeil-performance-athletique",
    title: "Comment le Sommeil Affecte Directement Tes Performances Athlétiques",
    excerpt: "Le sommeil est l'outil de récupération le plus puissant et le plus sous-estimé.",
    content: `Le sommeil est le pilier fondamental de la récupération.\n\n## Conclusion\n\nPriorise ton sommeil autant que ton entraînement. C'est pendant que tu dors que tu deviens plus fort.`,
    category: "Récupération", author: "Coach Maxime", date: "22 janvier 2026", readTime: "5 min", image: IMG_SLEEP, featured: false,
  },
  {
    slug: "proteines-combien-quand-comment",
    title: "Protéines : Combien, Quand et Comment Pour des Résultats Optimaux",
    excerpt: "Les protéines sont essentielles pour la récupération et la croissance musculaire. Voici tout ce que tu dois savoir.",
    content: `Les protéines sont les briques de construction de tes muscles.\n\n## Conclusion\n\nVise 1.6-2.2g de protéines par kg de poids corporel par jour, réparties sur 3-4 repas.`,
    category: "Nutrition", author: "Coach Sarah", date: "15 janvier 2026", readTime: "7 min", image: IMG_PROTEIN, featured: false,
  },
];

/* ─── ARTICLE CARD ─── */
function ArticleCard({ article, index }: { article: typeof BLOG_ARTICLES[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.4 }}>
      <Link href={`/blog/${article.slug}`} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-4">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded text-white" style={{ backgroundColor: "rgba(237,28,36,0.85)" }}>{article.category}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 text-xs mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
            <span>{article.date}</span>
          </div>
          <h3 className="text-lg leading-tight mb-2 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>{article.excerpt}</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#ed1c24" }}>
            Lire l'article <ArrowRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── FEATURED ARTICLE ─── */
function FeaturedArticle({ article }: { article: typeof BLOG_ARTICLES[0] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Link href={`/blog/${article.slug}`} className="group block">
        <div className="grid lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-white/[0.06]">
          <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 text-white text-[11px] font-bold uppercase tracking-wider rounded" style={{ backgroundColor: "#ed1c24" }}>Article Vedette</span>
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-center gap-3 text-xs mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
              <span className="flex items-center gap-1"><Tag size={11} />{article.category}</span>
              <span className="flex items-center gap-1"><Clock size={11} />{article.readTime}</span>
              <span>{article.date}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl leading-tight mb-4 text-white group-hover:text-red-400 transition-colors" style={{ fontFamily: "var(--font-display)" }}>{article.title}</h2>
            <p className="leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{article.excerpt}</p>
            <div className="flex items-center gap-2">
              <User size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{article.author}</span>
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>
              Lire l'article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
      if (article.featured) return false;
      const matchCategory = activeCategory === "Tous" || article.category === activeCategory;
      const matchSearch = searchQuery === "" || article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="pt-12 pb-8 lg:pt-20 lg:pb-12" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: "#ed1c24" }}>Blog & Ressources</span>
            <h1 className="text-5xl lg:text-6xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
              NOTRE EXPERTISE, <span style={{ color: "#ed1c24" }}>PARTAGÉE.</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Conseils d'entraînement, nutrition, récupération et mindset par nos coachs certifiés. Tout ce dont tu as besoin pour progresser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featuredArticle && (
        <section className="pb-12 lg:pb-16" style={{ backgroundColor: "#131636" }}>
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <FeaturedArticle article={featuredArticle} />
          </div>
        </section>
      )}

      {/* Filters + Search */}
      <section className="py-6 border-t border-white/[0.06]" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${activeCategory === cat ? "text-white" : "text-white/40 hover:text-white/70"}`}
                  style={activeCategory === cat ? { backgroundColor: "#ed1c24" } : { backgroundColor: "rgba(255,255,255,0.05)" }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.2)" }} />
              <input type="text" placeholder="Rechercher un article..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 placeholder:text-white/20"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredArticles.map((article, i) => (
                <ArticleCard key={article.slug} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg" style={{ color: "rgba(255,255,255,0.3)" }}>Aucun article trouvé pour cette recherche.</p>
              <button onClick={() => { setActiveCategory("Tous"); setSearchQuery(""); }} className="mt-4 text-sm font-bold uppercase tracking-wider hover:underline" style={{ color: "#ed1c24" }}>
                Voir tous les articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: "#232862" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-white text-3xl lg:text-4xl mb-4" style={{ fontFamily: "var(--font-display)" }}>RESTE INFORMÉ</h2>
            <p className="max-w-lg mx-auto mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              Reçois nos meilleurs articles, conseils d'entraînement et offres exclusives directement dans ta boîte courriel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Ton courriel" className="flex-1 px-4 py-3 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/30 placeholder:text-white/20" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }} />
              <button className="px-6 py-3 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24" }}>S'abonner</button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
