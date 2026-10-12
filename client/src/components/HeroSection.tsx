/*
 * HERO — Dark premium, chaleureux
 * Split-screen : texte sur fond navy sombre, image à droite
 * Texte blanc/crème, accents rouges
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "/manus-storage/fb-group-100-milestone_a422922c.jpeg";

export default function HeroSection() {
  return (
    <section data-home-hero className="relative lg:min-h-screen overflow-hidden" style={{ backgroundColor: "#0f1229" }}>
      <div className="max-w-[1440px] mx-auto h-full">
        <div className="grid lg:grid-cols-2 lg:min-h-screen">
          
          {/* Left — Text content */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:py-20 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm font-semibold uppercase tracking-[0.15em] mb-6"
                style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}
              >
                Brossard &bull; Chambly
              </motion.p>

              <h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] mb-6"
                style={{ fontFamily: "var(--font-display)", color: "#ffffff" }}
              >
                LA MEILLEURE<br />
                HEURE DE<br />
                <span style={{ color: "#ed1c24" }}>TA JOURNÉE.</span>
              </h1>

              <p
                className="text-lg sm:text-xl leading-relaxed mb-10 max-w-md"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
              >
                Rejoins une communauté qui a ta santé à cœur. Entraînement fonctionnel pour tous les niveaux, encadré par des coachs passionnés.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/consultation-gratuite"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  Consultation Gratuite
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/en-ligne"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "#ffffff" }}
                >
                  S'entraîner en ligne
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-8 sm:mt-12 flex items-center gap-4 sm:gap-6">
                <div className="flex shrink-0 -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white"
                      style={{ borderColor: "#0f1229", backgroundColor: i % 2 === 0 ? "#232862" : "#ed1c24" }}
                    >
                      {["M", "S", "J", "L"][i - 1]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">500+ membres actifs</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>qui s'entraînent chaque semaine</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Image */}
          <div data-hero-image-frame className="relative order-1 lg:order-2 aspect-square sm:aspect-[4/3] lg:aspect-auto lg:min-h-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMG}
                alt="Des membres du Club ADM réunis au gym pour célébrer leur 100e entraînement"
                width={1440}
                height={1920}
                fetchPriority="high"
                className="w-full h-full object-cover object-bottom sm:object-[center_70%] lg:object-center"
              />
              {/* Mobile: blend only the floor, keeping the group unobscured. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0f1229] to-transparent sm:h-16 lg:hidden" />
              <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0f1229] via-[#0f1229]/30 to-transparent lg:block" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
