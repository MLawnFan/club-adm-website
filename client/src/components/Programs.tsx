/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Section programmes: cartes avec hover reveal, prix, et CTA.
 * Layout en grille 3 colonnes sur desktop.
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Trophy, Heart, Crown } from "lucide-react";

const programs = [
  {
    icon: Flame,
    title: "TRANSFORMATION",
    subtitle: "90 Jours",
    description:
      "Programme complet de 90 jours conçu pour une transformation physique radicale. Entraînement, nutrition et suivi personnalisé pour des résultats visibles.",
    price: "39",
    period: "/mois",
    features: ["5 entraînements/semaine", "Plan nutritionnel inclus", "Suivi hebdomadaire", "Communauté privée"],
    popular: false,
    color: "from-orange-500/20 to-red-600/20",
  },
  {
    icon: Trophy,
    title: "PERFORMANCE",
    subtitle: "Athlète",
    description:
      "Programmation fonctionnelle avancée pour les athlètes qui veulent repousser leurs limites. Force, conditionnement et skills gymniques.",
    price: "49",
    period: "/mois",
    features: ["6 entraînements/semaine", "Cycles de force périodisés", "Analyse de performance", "Accès coaching vidéo"],
    popular: true,
    color: "from-adm-red/20 to-adm-red/5",
  },
  {
    icon: Heart,
    title: "BIEN-ÊTRE 40+",
    subtitle: "Vitalité",
    description:
      "Entraînement adapté pour les adultes de 40 ans et plus. Mobilité, force fonctionnelle et longévité pour une vie active et sans douleur.",
    price: "29",
    period: "/mois",
    features: ["4 entraînements/semaine", "Focus mobilité & récupération", "Adapté à votre niveau", "Support nutritionnel"],
    popular: false,
    color: "from-blue-500/20 to-indigo-600/20",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="relative py-24 md:py-32 bg-[#0a0a14]">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">
            Programmes En Ligne
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
            TROUVEZ VOTRE
            <br />
            <span className="text-white/40">PROGRAMME</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg font-[var(--font-body)]">
            Des programmes structurés par des experts, adaptés à vos objectifs.
            Essayez gratuitement pendant 14 jours.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`relative group rounded-xl overflow-hidden border transition-all duration-500 ${
                program.popular
                  ? "border-adm-red/30 bg-white/[0.04]"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
              }`}
            >
              {/* Popular badge */}
              {program.popular && (
                <div className="absolute top-0 right-0 bg-adm-red text-white text-xs font-bold tracking-wider uppercase px-4 py-1.5 rounded-bl-lg flex items-center gap-1.5">
                  <Crown className="h-3 w-3" />
                  Populaire
                </div>
              )}

              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color}`} />

              <div className="p-8">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <program.icon className="h-6 w-6 text-adm-red" />
                  <span className="text-white/40 text-sm tracking-wider uppercase font-[var(--font-body)]">
                    {program.subtitle}
                  </span>
                </div>
                <h3 className="font-[var(--font-display)] text-4xl text-white mb-4">
                  {program.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 font-[var(--font-body)]">
                  {program.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-[var(--font-display)] text-5xl text-white">
                    {program.price}$
                  </span>
                  <span className="text-white/40 text-sm font-[var(--font-body)]">
                    {program.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/60 text-sm font-[var(--font-body)]">
                      <div className="w-1.5 h-1.5 bg-adm-red rounded-full shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full font-semibold tracking-wider uppercase group/btn ${
                    program.popular
                      ? "bg-adm-red hover:bg-adm-red-hover text-white shadow-lg shadow-adm-red/20"
                      : "bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10"
                  }`}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Essai Gratuit — 14 Jours
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Access Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-adm-red/10 via-adm-navy/20 to-adm-red/10 border border-adm-red/20 rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-white mb-2">
              ALL ACCESS — 69$/MOIS
            </h3>
            <p className="text-white/50 font-[var(--font-body)]">
              Tous les programmes + coaching + nutrition + communauté. L'expérience complète.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-adm-red hover:bg-adm-red-hover text-white font-semibold tracking-wider uppercase shrink-0 shadow-lg shadow-adm-red/20"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Commencer Maintenant
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
