/*
 * HERO — Design lumineux Mayhem-inspired
 * Image lumineuse, overlay blanc côté gauche, texte navy
 * CTA "Consultation Gratuite" en rouge
 */
import { motion } from "framer-motion";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/hero-light-7enzNZkAb3PkrsCfpSMFTS.png";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Club ADM Fitness — Entraînement fonctionnel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent" />
      </div>

      {/* Content — aligned left */}
      <div className="relative h-full max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5"
            style={{ fontFamily: "var(--font-display)", color: "#232862" }}
          >
            LA MEILLEURE<br />
            HEURE DE<br />
            TA JOURNÉE.
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed mb-8 max-w-md"
            style={{ fontFamily: "var(--font-body)", color: "rgba(35,40,98,0.7)" }}
          >
            Rejoins la communauté ADM et atteins tes objectifs, peu importe ton niveau.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://clubadm.com/contact-us/"
              className="inline-flex items-center justify-center px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.06em] transition-colors"
              style={{ backgroundColor: "#ed1c24" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d41920")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ed1c24")}
            >
              Consultation Gratuite
            </a>
            <a
              href="/en-ligne"
              className="inline-flex items-center justify-center px-8 py-4 border-2 text-sm font-bold uppercase tracking-[0.06em] transition-colors hover:text-white"
              style={{ borderColor: "#232862", color: "#232862" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#232862"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#232862"; }}
            >
              S'entraîner en ligne
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
