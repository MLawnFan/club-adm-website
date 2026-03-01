/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Double offre: deux blocs côte à côte — Gym physique et Programmation En Ligne.
 * Layout asymétrique avec images et overlays.
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, ArrowRight, Dumbbell, Wifi } from "lucide-react";

const GYM_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/community-workout-agtit3LeM8ntFJzTQWvDrE.webp";
const ONLINE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/online-training-PsTMLEYG76vevG27J66tPc.webp";

export default function DoubleOffer() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0d0d18]">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">
            Deux façons de s'entraîner
          </span>
          <h2 className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95]">
            CHOISISSEZ VOTRE
            <br />
            <span className="text-white/40">PARCOURS</span>
          </h2>
        </motion.div>

        {/* Two Offers Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Gym Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="group relative rounded-xl overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-end"
            id="gym"
          >
            <img
              src={GYM_IMG}
              alt="Entraînement au gym Club ADM"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/60 to-transparent" />
            <div className="absolute inset-0 bg-adm-navy/20 group-hover:bg-adm-navy/10 transition-colors duration-500" />

            {/* Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-adm-navy/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <MapPin className="h-4 w-4 text-adm-red" />
              <span className="text-white text-sm font-medium">En Personne</span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Dumbbell className="h-6 w-6 text-adm-red" />
                <h3 className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                  LE GYM
                </h3>
              </div>
              <p className="text-white/60 mb-6 max-w-md leading-relaxed font-[var(--font-body)]">
                Vivez l'expérience complète. Équipement de pointe, coachs
                certifiés, cours de groupe et une communauté qui vous pousse
                à donner le meilleur de vous-même.
              </p>
              <ul className="flex flex-col gap-2 mb-8 text-white/50 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-adm-red rounded-full" />
                  50+ cours par semaine
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-adm-red rounded-full" />
                  Coachs certifiés et passionnés
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-adm-red rounded-full" />
                  Équipement professionnel complet
                </li>
              </ul>
              <Button
                size="lg"
                className="bg-adm-red hover:bg-adm-red-hover text-white font-semibold tracking-wider uppercase group/btn"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Réserver une Visite
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Online Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative rounded-xl overflow-hidden min-h-[500px] md:min-h-[600px] flex flex-col justify-end"
            id="online"
          >
            <img
              src={ONLINE_IMG}
              alt="Entraînement en ligne Club ADM"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/60 to-transparent" />
            <div className="absolute inset-0 bg-adm-navy/20 group-hover:bg-adm-navy/10 transition-colors duration-500" />

            {/* Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-adm-red/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <Globe className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">En Ligne</span>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="h-6 w-6 text-adm-red" />
                <h3 className="font-[var(--font-display)] text-4xl md:text-5xl text-white">
                  EN LIGNE
                </h3>
              </div>
              <p className="text-white/60 mb-6 max-w-md leading-relaxed font-[var(--font-body)]">
                Notre expertise, sans frontières. Accédez à nos programmes
                d'entraînement professionnels de n'importe où dans le monde,
                avec un suivi personnalisé.
              </p>
              <ul className="flex flex-col gap-2 mb-8 text-white/50 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-adm-red rounded-full" />
                  Programmes structurés par objectif
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-adm-red rounded-full" />
                  Coaching personnalisé à distance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-adm-red rounded-full" />
                  Communauté mondiale de membres
                </li>
              </ul>
              <Button
                size="lg"
                className="bg-white text-[#0a0a14] hover:bg-white/90 font-semibold tracking-wider uppercase group/btn"
                onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
              >
                Voir les Programmes
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
