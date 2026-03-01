/*
 * METHODOLOGY — Club ADM Fitness
 * 4 pillars of the Club ADM approach
 * Grid layout with hover effects, numbered pillars
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dumbbell, Users, Brain, TrendingUp } from "lucide-react";

const PILLARS = [
  {
    icon: Dumbbell,
    number: "01",
    title: "ENTRAÎNEMENT FONCTIONNEL",
    description: "Des mouvements qui ont un transfert direct dans ta vie quotidienne. Force, endurance, mobilité et puissance — tout est couvert dans chaque session.",
  },
  {
    icon: Users,
    number: "02",
    title: "COACHING D'ÉLITE",
    description: "Nos coachs sont certifiés et passionnés. Chaque mouvement est enseigné, corrigé et optimisé pour que tu progresses en toute sécurité.",
  },
  {
    icon: Brain,
    number: "03",
    title: "PROGRAMMATION INTELLIGENTE",
    description: "Rien n'est laissé au hasard. Nos programmes sont périodisés, progressifs et adaptés à chaque niveau pour maximiser tes résultats.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "COMMUNAUTÉ & RÉSULTATS",
    description: "L'énergie du groupe te pousse à te dépasser. Le suivi de progression et la communauté te gardent motivé sur le long terme.",
  },
];

export default function Methodology() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-background relative" ref={ref}>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="accent-line mx-auto mb-6" />
          <h2 className="font-display text-5xl lg:text-7xl text-white mb-4">
            LA DIFFÉRENCE <span className="text-adm-red">CLUB ADM</span>
          </h2>
          <p className="text-cream/50 text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Notre approche repose sur quatre piliers fondamentaux qui font de chaque entraînement 
            une expérience complète et transformatrice.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-background p-8 lg:p-10 group hover:bg-card transition-colors duration-500 relative"
              >
                {/* Number */}
                <span className="font-display text-6xl text-white/5 absolute top-4 right-6 group-hover:text-adm-red/10 transition-colors duration-500">
                  {pillar.number}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 group-hover:bg-adm-red/15 transition-colors duration-500 mb-6">
                  <Icon className="w-6 h-6 text-cream/50 group-hover:text-adm-red transition-colors duration-500" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl text-white mb-3 leading-tight">{pillar.title}</h3>
                <p className="text-cream/40 text-sm leading-relaxed group-hover:text-cream/60 transition-colors duration-500" style={{ fontFamily: "var(--font-body)" }}>
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
