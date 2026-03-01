/*
 * DOUBLE OFFER — Club ADM Fitness (Épuré)
 * Fond blanc, deux colonnes propres avec images
 * Couleurs: navy #232862, rouge #ed1c24
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Globe, ArrowRight } from "lucide-react";

const GYM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/community-v2-i8UKGpRWbET2qKA6PMbBby.webp";
const ONLINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/online-v2-LGXoTCfNwW5TZZXbMafgMv.webp";

export default function DoubleOffer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gym" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="accent-line mx-auto mb-5" />
          <h2 className="font-display text-5xl lg:text-7xl mb-4" style={{ color: "#232862" }}>
            DEUX FAÇONS DE <span style={{ color: "#ed1c24" }}>S'ENTRAÎNER</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            En salle à Alma ou en ligne partout dans le monde.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Gym card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-6">
              <img src={GYM_IMG} alt="Entraînement en salle" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" style={{ color: "#ed1c24" }} />
              <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-gray-400" style={{ fontFamily: "var(--font-heading)" }}>Alma, Québec</span>
            </div>
            <h3 className="font-display text-4xl mb-3" style={{ color: "#232862" }}>EN SALLE</h3>
            <p className="text-gray-500 leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Cours de groupe, coaching personnalisé et une communauté qui te pousse à te dépasser chaque jour.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-semibold text-[13px] tracking-[0.06em] uppercase transition-colors hover:gap-3"
              style={{ fontFamily: "var(--font-heading)", color: "#ed1c24" }}
            >
              Réserver un essai
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Online card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-6">
              <img src={ONLINE_IMG} alt="Entraînement en ligne" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4" style={{ color: "#ed1c24" }} />
              <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-gray-400" style={{ fontFamily: "var(--font-heading)" }}>Partout dans le monde</span>
            </div>
            <h3 className="font-display text-4xl mb-3" style={{ color: "#232862" }}>EN LIGNE</h3>
            <p className="text-gray-500 leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
              Accède à nos programmes d'entraînement fonctionnel depuis n'importe où. Programmation quotidienne et suivi.
            </p>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 font-semibold text-[13px] tracking-[0.06em] uppercase transition-colors hover:gap-3"
              style={{ fontFamily: "var(--font-heading)", color: "#ed1c24" }}
            >
              Voir les programmes
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
