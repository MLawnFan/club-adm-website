/*
 * HERO SECTION — Club ADM Fitness
 * Full-viewport cinematic hero with massive typography
 * Inspired by Ethos Athletic Club + Equinox dual CTA pattern
 * Dark overlay on dramatic gym image, scroll indicator at bottom
 */
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/hero-v2-Wd9sTMiBsMDSAURtT8kPz3.webp";

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Entraînement fonctionnel au Club ADM"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/30 to-navy-dark/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 lg:pb-32 max-w-[1400px] mx-auto px-4 lg:px-8">
        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 h-[3px] bg-adm-red mb-6 origin-left"
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-[clamp(2.8rem,8vw,7rem)] leading-[0.88] text-white mb-4 max-w-4xl"
        >
          ENTRAÎNE-TOI<br />
          <span className="text-adm-red">SANS LIMITES</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg lg:text-xl text-cream/70 max-w-xl mb-10 font-light leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Entraînement fonctionnel en salle à Alma ou programmation en ligne — 
          notre expertise, ton terrain de jeu.
        </motion.p>

        {/* Dual CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-adm-red hover:bg-adm-red-hover text-white font-bold text-[15px] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 hover:shadow-xl hover:shadow-adm-red/30 hover:-translate-y-0.5 group"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Essai Gratuit en Salle
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#online"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-bold text-[15px] tracking-[0.1em] uppercase px-8 py-4 transition-all duration-300 hover:bg-white/5 group"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Programmes En Ligne
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="hidden lg:flex items-center gap-12 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { value: "500+", label: "Membres actifs" },
            { value: "15+", label: "Coachs certifiés" },
            { value: "6", label: "Programmes en ligne" },
            { value: "98%", label: "Taux de satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <span className="font-display text-3xl text-adm-red">{stat.value}</span>
              <span className="text-xs tracking-[0.15em] uppercase text-cream/50" style={{ fontFamily: "var(--font-heading)" }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-cream/40" style={{ fontFamily: "var(--font-heading)" }}>Découvrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
