/*
 * HERO — Design chaleureux, humain, accueillant
 * Split-screen asymétrique : texte à gauche sur fond crème chaud, image à droite
 * Tons dorés, ambiance communautaire
 */
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Play } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/hero-light-dNTkbntzjMhRTrQjjkSyZc.webp";
const COMMUNITY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/warm-community-M6iUrbm2XzLgnQXpZaqtX2.webp";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden" style={{ backgroundColor: "#faf7f2" }}>
      {/* Grid layout — text left, images right */}
      <div className="max-w-[1440px] mx-auto h-full">
        <div className="grid lg:grid-cols-2 min-h-[90vh] lg:min-h-screen">
          
          {/* Left — Text content */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-32 lg:py-20 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Tagline */}
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
                style={{ fontFamily: "var(--font-display)", color: "#232862" }}
              >
                LA MEILLEURE<br />
                HEURE DE<br />
                <span style={{ color: "#ed1c24" }}>TA JOURNÉE.</span>
              </h1>

              <p
                className="text-lg sm:text-xl leading-relaxed mb-10 max-w-md"
                style={{ fontFamily: "var(--font-body)", color: "rgba(35,40,98,0.6)" }}
              >
                Rejoins une communauté qui a ta santé à cœur. Entraînement fonctionnel pour tous les niveaux, encadré par des coachs passionnés.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://clubadm.com/contact-us/"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  Consultation Gratuite
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link
                  href="/en-ligne"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 border-2 text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                  style={{ borderColor: "#232862", color: "#232862" }}
                >
                  S'entraîner en ligne
                </Link>
              </div>

              {/* Social proof mini */}
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: i % 2 === 0 ? "#232862" : "#ed1c24" }}
                    >
                      {["M", "S", "J", "L"][i - 1]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#232862" }}>500+ membres actifs</p>
                  <p className="text-xs" style={{ color: "rgba(35,40,98,0.5)" }}>qui s'entraînent chaque semaine</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Image collage */}
          <div className="relative order-1 lg:order-2 min-h-[50vh] lg:min-h-0">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={HERO_IMG}
                alt="Entraînement fonctionnel au Club ADM"
                className="w-full h-full object-cover"
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#faf7f2] lg:via-transparent lg:to-transparent opacity-60" />
            </motion.div>

            {/* Floating community card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto lg:w-72"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl shadow-black/5">
                <img
                  src={COMMUNITY_IMG}
                  alt="Communauté Club ADM"
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <p className="text-sm font-semibold" style={{ color: "#232862" }}>
                  Plus qu'un gym, une famille.
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(35,40,98,0.5)" }}>
                  Rejoins une communauté qui te soutient.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
