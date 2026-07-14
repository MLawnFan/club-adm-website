/*
 * PAGE NOTRE ÉQUIPE — En construction
 * Fond navy sombre, message temporaire
 */
import { motion } from "framer-motion";
import { HardHat } from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

export default function NotreEquipe() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* En construction */}
      <section className="py-32 lg:py-48 flex items-center justify-center" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
              <HardHat size={40} style={{ color: "#ed1c24" }} />
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
              En construction
            </p>
            <h1 className="text-5xl lg:text-7xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              NOTRE ÉQUIPE
            </h1>
            <p className="text-lg leading-relaxed max-w-lg mx-auto mb-10" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Cette page est en cours de préparation. Reviens bientôt pour découvrir les coachs passionnés qui font de Club ADM un endroit unique.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
              style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
            >
              Retour à l'accueil
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
