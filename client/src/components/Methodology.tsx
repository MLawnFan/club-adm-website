/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Section méthodologie: image du coach à gauche, contenu à droite.
 * Layout asymétrique, accents rouges, compteurs animés.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Target, Users, Zap } from "lucide-react";

const COACH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/coach-training-MU2Ud72F39yqYFts5tVSeZ.webp";

const pillars = [
  {
    icon: Target,
    title: "Programmation Scientifique",
    description: "Chaque programme est basé sur des principes d'entraînement éprouvés, avec une périodisation intelligente pour des résultats optimaux.",
  },
  {
    icon: Users,
    title: "Coaching Expert",
    description: "Nos coachs certifiés vous guident à chaque étape, corrigent votre technique et adaptent les mouvements à votre niveau.",
  },
  {
    icon: Shield,
    title: "Approche Holistique",
    description: "Entraînement, nutrition et récupération. Nous prenons en charge tous les aspects de votre transformation.",
  },
  {
    icon: Zap,
    title: "Communauté Engagée",
    description: "Rejoignez une communauté de personnes motivées qui partagent les mêmes objectifs. Ensemble, on va plus loin.",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Methodology() {
  return (
    <section id="community" className="relative py-24 md:py-32 bg-[#0d0d18] overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Coach Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={COACH_IMG}
                alt="Coach Club ADM Fitness"
                className="w-full max-w-md mx-auto lg:max-w-none rounded-lg object-cover"
                style={{ maxHeight: "700px" }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d18] via-transparent to-transparent rounded-lg" />

              {/* Red accent line */}
              <div className="absolute -left-4 top-1/4 w-1 h-32 bg-adm-red hidden lg:block" />

              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 -right-4 lg:right-4 bg-[#0a0a14]/90 backdrop-blur-md border border-white/10 rounded-lg p-5"
              >
                <div className="font-[var(--font-display)] text-4xl text-adm-red">
                  <AnimatedCounter target={98} suffix="%" />
                </div>
                <div className="text-white/50 text-sm font-[var(--font-body)]">
                  Taux de satisfaction
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">
              Notre Approche
            </span>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl text-white leading-[0.95] mb-6">
              LA DIFFÉRENCE
              <br />
              <span className="text-adm-red">CLUB ADM</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10 font-[var(--font-body)]">
              Nous ne sommes pas un gym ordinaire. Notre méthodologie combine
              science de l'entraînement, coaching de qualité et esprit
              communautaire pour créer une expérience qui transforme des vies.
            </p>

            {/* Pillars Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-adm-red/10 flex items-center justify-center group-hover:bg-adm-red/20 transition-colors">
                      <pillar.icon className="h-5 w-5 text-adm-red" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 font-[var(--font-body)]">
                        {pillar.title}
                      </h4>
                      <p className="text-white/40 text-sm leading-relaxed font-[var(--font-body)]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
