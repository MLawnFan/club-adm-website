/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Section blog: 3 cartes d'articles récents avec images, catégories et dates.
 */
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";

const articles = [
  {
    title: "5 Exercices Fonctionnels Essentiels pour Débutants",
    excerpt: "Découvrez les mouvements de base qui forment la fondation de tout programme d'entraînement fonctionnel efficace.",
    category: "Entraînement",
    date: "28 Fév 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
  },
  {
    title: "Nutrition Post-Entraînement : Le Guide Complet",
    excerpt: "Ce que vous mangez après votre WOD est crucial. Voici comment optimiser votre récupération et vos résultats.",
    category: "Nutrition",
    date: "22 Fév 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
  },
  {
    title: "Comment Rester Motivé : Conseils de Nos Coachs",
    excerpt: "La motivation fluctue, mais la discipline reste. Nos coachs partagent leurs stratégies pour maintenir le cap.",
    category: "Mindset",
    date: "15 Fév 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="relative py-24 md:py-32 bg-[#0a0a14]">
      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <span className="text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">
              Blog & Média
            </span>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl text-white leading-[0.95]">
              DERNIERS
              <br />
              <span className="text-white/40">ARTICLES</span>
            </h2>
          </div>
          <a
            href="#blog"
            className="mt-6 md:mt-0 flex items-center gap-2 text-adm-red hover:text-white transition-colors font-semibold text-sm tracking-wider uppercase group"
          >
            Voir Tous les Articles
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-lg mb-5 aspect-[3/2]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/60 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-adm-red/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Tag className="h-3 w-3 text-white" />
                  <span className="text-white text-xs font-medium tracking-wider uppercase">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center gap-4 mb-3 text-white/30 text-xs tracking-wider uppercase font-[var(--font-body)]">
                <span>{article.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="font-[var(--font-display)] text-2xl text-white group-hover:text-adm-red transition-colors duration-300 mb-2">
                {article.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed font-[var(--font-body)]">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
