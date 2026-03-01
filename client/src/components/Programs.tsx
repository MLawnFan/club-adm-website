/*
 * PROGRAMS — Club ADM Fitness
 * Online programming cards with pricing
 * Inspired by Mayhem Nation programming tiers + HWPO structure
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronRight, Zap, Target, Heart } from "lucide-react";

const PROGRAMS = [
  {
    icon: Zap,
    name: "FONCTIONNEL",
    tagline: "Le programme signature",
    description: "Programmation complète d'entraînement fonctionnel. WODs quotidiens, force, cardio et gymnastique. Idéal pour les athlètes qui veulent progresser sur tous les fronts.",
    price: "49",
    period: "/mois",
    features: ["5-6 entraînements/semaine", "Vidéos explicatives", "Scaling options", "Communauté privée"],
    popular: true,
  },
  {
    icon: Target,
    name: "PERFORMANCE",
    tagline: "Pour les compétiteurs",
    description: "Programme avancé pour les athlètes qui visent la compétition. Volume élevé, accessoire work, et programmation périodisée pour peaker au bon moment.",
    price: "79",
    period: "/mois",
    features: ["Double sessions", "Programmation périodisée", "Suivi de progression", "Coaching vidéo mensuel"],
    popular: false,
  },
  {
    icon: Heart,
    name: "BIEN-ÊTRE",
    tagline: "Santé et longévité",
    description: "Programme axé sur la santé globale. Mobilité, force fonctionnelle et conditionnement à intensité modérée. Parfait pour ceux qui veulent bouger mieux, plus longtemps.",
    price: "39",
    period: "/mois",
    features: ["4 entraînements/semaine", "Focus mobilité", "Plans nutrition inclus", "Adapté 40+"],
    popular: false,
  },
];

export default function Programs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="programs" className="py-24 lg:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="accent-line mb-6" />
              <h2 className="font-display text-5xl lg:text-7xl text-white mb-3">
                PROGRAMMES <span className="text-adm-red">EN LIGNE</span>
              </h2>
              <p className="text-cream/50 text-lg max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
                Notre expertise d'entraînement fonctionnel, accessible partout. 
                Choisis le programme qui correspond à tes objectifs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Program cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`group relative border transition-all duration-500 hover:-translate-y-1 ${
                  program.popular
                    ? "border-adm-red/40 bg-gradient-to-b from-adm-red/10 to-transparent"
                    : "border-white/8 bg-card hover:border-white/15"
                }`}
              >
                {program.popular && (
                  <div className="absolute -top-px left-0 right-0 h-[2px] bg-adm-red" />
                )}

                <div className="p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 flex items-center justify-center ${program.popular ? "bg-adm-red/20" : "bg-white/5"}`}>
                      <Icon className={`w-6 h-6 ${program.popular ? "text-adm-red" : "text-cream/60"}`} />
                    </div>
                    {program.popular && (
                      <span className="text-[10px] tracking-[0.15em] uppercase text-adm-red font-bold px-3 py-1 border border-adm-red/30 bg-adm-red/10" style={{ fontFamily: "var(--font-heading)" }}>
                        Populaire
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-3xl text-white mb-1">{program.name}</h3>
                  <p className="text-[12px] tracking-[0.1em] uppercase text-cream/40 mb-4" style={{ fontFamily: "var(--font-heading)" }}>{program.tagline}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-display text-5xl text-white">{program.price}$</span>
                    <span className="text-cream/40 text-sm" style={{ fontFamily: "var(--font-body)" }}>{program.period}</span>
                  </div>

                  <p className="text-cream/50 text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
                    {program.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {program.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-adm-red rounded-full flex-shrink-0" />
                        <span className="text-cream/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className={`w-full inline-flex items-center justify-center gap-2 font-bold text-[13px] tracking-[0.1em] uppercase py-3.5 transition-all duration-300 group/btn ${
                      program.popular
                        ? "bg-adm-red hover:bg-adm-red-hover text-white hover:shadow-lg hover:shadow-adm-red/25"
                        : "border border-white/15 text-white hover:border-white/30 hover:bg-white/5"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Commencer
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All Access Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 border border-adm-red/20 bg-gradient-to-r from-adm-red/8 via-navy/20 to-adm-red/8 p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-3xl lg:text-4xl text-white mb-2">
              ALL ACCESS — 69$/MOIS
            </h3>
            <p className="text-cream/50" style={{ fontFamily: "var(--font-body)" }}>
              Tous les programmes + coaching + nutrition + communauté. L'expérience complète.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-adm-red hover:bg-adm-red-hover text-white font-bold text-[13px] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 hover:shadow-lg hover:shadow-adm-red/25 flex-shrink-0"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Commencer Maintenant
            <ChevronRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
