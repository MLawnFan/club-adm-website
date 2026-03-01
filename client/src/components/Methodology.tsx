/*
 * METHODOLOGY — Club ADM Fitness (Épuré)
 * Fond navy #232862, 4 piliers en grille propre
 * Contraste blanc sur navy
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Users, Brain, TrendingUp } from "lucide-react";

const PILLARS = [
  {
    icon: Dumbbell,
    number: "01",
    title: "ENTRAÎNEMENT FONCTIONNEL",
    description: "Des mouvements qui ont un transfert direct dans ta vie quotidienne. Force, endurance, mobilité et puissance.",
  },
  {
    icon: Users,
    number: "02",
    title: "COACHING D'ÉLITE",
    description: "Nos coachs sont certifiés et passionnés. Chaque mouvement est enseigné, corrigé et optimisé.",
  },
  {
    icon: Brain,
    number: "03",
    title: "PROGRAMMATION INTELLIGENTE",
    description: "Programmes périodisés, progressifs et adaptés à chaque niveau pour maximiser tes résultats.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "COMMUNAUTÉ & RÉSULTATS",
    description: "L'énergie du groupe te pousse à te dépasser. Le suivi de progression te garde motivé.",
  },
];

export default function Methodology() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32" style={{ backgroundColor: "#232862" }} ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="accent-line mx-auto mb-5" />
          <h2 className="font-display text-5xl lg:text-7xl text-white mb-4">
            LA DIFFÉRENCE <span style={{ color: "#ed1c24" }}>CLUB ADM</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Notre approche repose sur quatre piliers fondamentaux.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 lg:p-10 group"
                style={{ backgroundColor: "#232862" }}
              >
                <span className="font-display text-5xl text-white/10 block mb-6 group-hover:text-white/20 transition-colors">
                  {pillar.number}
                </span>
                <Icon className="w-6 h-6 mb-4 group-hover:text-white transition-colors" style={{ color: "#ed1c24" }} />
                <h3 className="font-display text-xl text-white mb-3 leading-tight">{pillar.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
