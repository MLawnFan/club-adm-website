/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Hero: Image plein écran avec overlay sombre, titre Bebas Neue massif,
 * sous-titre DM Sans, double CTA (Gym + En Ligne).
 * Animation: fade-in + translateY au chargement.
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/hero-gym-dark-amVBpGJHqwYSwYt7AXwRWP.webp";

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Club ADM Fitness - Entraînement fonctionnel"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14]/95 via-[#0a0a14]/70 to-[#0a0a14]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-[#0a0a14]/30" />
      </div>

      {/* Red accent line */}
      <div className="absolute left-0 top-1/4 w-1 h-32 bg-adm-red" />

      {/* Content */}
      <div className="container relative z-10 pt-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 font-[var(--font-body)]">
              Entraînement Fonctionnel
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[var(--font-display)] text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight mb-6"
          >
            VOTRE
            <br />
            <span className="text-adm-red">TRANSFORMATION</span>
            <br />
            COMMENCE ICI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/60 max-w-xl mb-10 leading-relaxed font-[var(--font-body)]"
          >
            Au gym ou de n'importe où dans le monde. Rejoignez une communauté
            d'athlètes déterminés et accédez à des programmes d'entraînement
            conçus par des experts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-adm-red hover:bg-adm-red-hover text-white font-semibold text-base tracking-wider uppercase px-8 py-6 shadow-xl shadow-adm-red/25 group"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Essai Gratuit — 7 Jours
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-semibold text-base tracking-wider uppercase px-8 py-6 group"
              onClick={() => document.getElementById("online")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Programmes En Ligne
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0a14] to-transparent pt-20 pb-8"
      >
        <div className="container">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-16">
            <StatItem number="500+" label="Membres Actifs" />
            <StatItem number="15+" label="Coachs Certifiés" />
            <StatItem number="50+" label="Cours / Semaine" />
            <StatItem number="3" label="Programmes En Ligne" />
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase rotate-90 origin-center translate-y-8">
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-12 bg-gradient-to-b from-adm-red to-transparent mt-12"
        />
      </motion.div>
    </section>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-[var(--font-display)] text-3xl md:text-4xl text-white">
        {number}
      </div>
      <div className="text-white/40 text-sm tracking-wider uppercase font-[var(--font-body)]">
        {label}
      </div>
    </div>
  );
}
