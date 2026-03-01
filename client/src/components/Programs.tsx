/*
 * PROGRAMS — Club ADM Fitness (Épuré)
 * Fond cream léger, cartes propres avec bordures fines
 * Couleurs: navy #232862, rouge #ed1c24
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Target, Heart } from "lucide-react";

const PROGRAMS = [
  {
    icon: Zap,
    name: "FONCTIONNEL",
    tagline: "Le programme signature",
    description: "WODs quotidiens, force, cardio et gymnastique. Idéal pour progresser sur tous les fronts.",
    price: "49",
    features: ["5-6 entraînements/semaine", "Vidéos explicatives", "Scaling options", "Communauté privée"],
    popular: true,
  },
  {
    icon: Target,
    name: "PERFORMANCE",
    tagline: "Pour les compétiteurs",
    description: "Volume élevé, accessoire work et programmation périodisée pour peaker au bon moment.",
    price: "79",
    features: ["Double sessions", "Programmation périodisée", "Suivi de progression", "Coaching vidéo mensuel"],
    popular: false,
  },
  {
    icon: Heart,
    name: "BIEN-ÊTRE",
    tagline: "Santé et longévité",
    description: "Mobilité, force fonctionnelle et conditionnement à intensité modérée. Parfait pour bouger mieux.",
    price: "39",
    features: ["4 entraînements/semaine", "Focus mobilité", "Plans nutrition inclus", "Adapté 40+"],
    popular: false,
  },
];

export default function Programs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="programs" className="py-24 lg:py-32" style={{ backgroundColor: "#f8f8f6" }} ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="accent-line mx-auto mb-5" />
          <h2 className="font-display text-5xl lg:text-7xl mb-4" style={{ color: "#232862" }}>
            PROGRAMMES <span style={{ color: "#ed1c24" }}>EN LIGNE</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Notre expertise accessible partout. Choisis le programme qui correspond à tes objectifs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white p-8 lg:p-10 border transition-shadow duration-300 hover:shadow-lg ${
                  program.popular ? "border-[#ed1c24]/30" : "border-gray-100"
                }`}
              >
                {program.popular && (
                  <div className="h-[3px] w-12 mb-6" style={{ backgroundColor: "#ed1c24" }} />
                )}
                {!program.popular && <div className="h-[3px] w-12 bg-gray-200 mb-6" />}

                <div className="flex items-center justify-between mb-6">
                  <Icon className="w-6 h-6" style={{ color: program.popular ? "#ed1c24" : "#232862" }} />
                  {program.popular && (
                    <span className="text-[10px] tracking-[0.12em] uppercase font-bold px-3 py-1" style={{ fontFamily: "var(--font-heading)", color: "#ed1c24", backgroundColor: "rgba(237,28,36,0.08)" }}>
                      Populaire
                    </span>
                  )}
                </div>

                <h3 className="font-display text-3xl mb-1" style={{ color: "#232862" }}>{program.name}</h3>
                <p className="text-[12px] tracking-[0.08em] uppercase text-gray-400 mb-5" style={{ fontFamily: "var(--font-heading)" }}>{program.tagline}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-display text-5xl" style={{ color: "#232862" }}>{program.price}$</span>
                  <span className="text-gray-400 text-sm" style={{ fontFamily: "var(--font-body)" }}>/mois</span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
                  {program.description}
                </p>

                <div className="space-y-3 mb-8">
                  {program.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#ed1c24" }} />
                      <span className="text-gray-600 text-sm" style={{ fontFamily: "var(--font-body)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center gap-2 font-bold text-[13px] tracking-[0.08em] uppercase py-3.5 transition-colors ${
                    program.popular
                      ? "text-white hover:opacity-90"
                      : "border text-gray-700 hover:text-white"
                  }`}
                  style={{
                    fontFamily: "var(--font-heading)",
                    backgroundColor: program.popular ? "#ed1c24" : "transparent",
                    borderColor: program.popular ? "transparent" : "#232862",
                    ...(program.popular ? {} : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (!program.popular) {
                      (e.target as HTMLElement).style.backgroundColor = "#232862";
                      (e.target as HTMLElement).style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!program.popular) {
                      (e.target as HTMLElement).style.backgroundColor = "transparent";
                      (e.target as HTMLElement).style.color = "#374151";
                    }
                  }}
                >
                  Commencer
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
