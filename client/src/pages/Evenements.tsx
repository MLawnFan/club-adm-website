/*
 * PAGE ÉVÉNEMENTS — Dark premium
 * Page placeholder pour les événements à venir
 */
import { motion } from "framer-motion";
import { Calendar, Bell, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

export default function Evenements() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="py-24 lg:py-36" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
              <Calendar size={36} style={{ color: "#ed1c24" }} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
              Événements
            </p>
            <h1 className="text-5xl lg:text-7xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              NOS ÉVÉNEMENTS<br /><span style={{ color: "#ed1c24" }}>À VENIR</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Compétitions, journées portes ouvertes, défis communautaires et plus encore. Reste à l'affût pour ne rien manquer!
            </p>

            {/* Coming Soon Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl p-10 border border-white/[0.08] max-w-md mx-auto"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "rgba(237,28,36,0.15)" }}>
                <Bell size={24} style={{ color: "#ed1c24" }} />
              </div>
              <h3 className="text-2xl mb-3 text-white" style={{ fontFamily: "var(--font-display)" }}>
                BIENTÔT DISPONIBLE
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                Notre calendrier d'événements arrive bientôt. En attendant, suis-nous sur les réseaux sociaux pour rester informé!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://www.instagram.com/clubadm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/20 hover:border-white/40 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/crossfitadm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/20 hover:border-white/40 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Facebook
                </a>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <Link
                href="/consultation-gratuite"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
              >
                Consultation Gratuite <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
