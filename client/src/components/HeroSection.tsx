/*
 * HERO — Club ADM Fitness (Épuré)
 * Image plein écran, typographie massive mais propre
 * Deux CTA simples, pas de stats bar
 */
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/hero-v2-Wd9sTMiBsMDSAURtT8kPz3.webp";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="Entraînement fonctionnel au Club ADM" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-6xl sm:text-7xl lg:text-[110px] text-white leading-[0.9] mb-6">
            ENTRAÎNE-TOI
            <br />
            <span style={{ color: "#ed1c24" }}>SANS LIMITES</span>
          </h1>

          <p className="text-white/70 text-lg lg:text-xl max-w-lg mb-10 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Entraînement fonctionnel en salle à Alma ou programmation en ligne — notre expertise, ton terrain de jeu.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-adm-red hover:bg-adm-red-hover text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Essai gratuit en salle
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white text-[14px] font-bold tracking-[0.08em] uppercase px-8 py-4 transition-colors"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Programmes en ligne
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.a
          href="#gym"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
