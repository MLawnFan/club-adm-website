/*
 * PAGE PROGRAMMATION EN LIGNE — En Construction / Stay Tuned
 * Dark premium, message d'attente avec design cohérent
 */
import { motion } from "framer-motion";
import { Rocket, Bell, ArrowRight } from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HERO_IMG = "/manus-storage/fb-deadlift-woman_58b054bf.jpeg";

export default function OnlinePrograms() {
  return (
    <>
      <PromoBanner />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#0f1229" }}>
          {/* Background image with heavy overlay */}
          <div className="absolute inset-0">
            <img
              src={HERO_IMG}
              alt="Entraînement en ligne"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f1229]/80 via-[#0f1229]/60 to-[#0f1229]" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 border border-white/10"
                style={{ backgroundColor: "rgba(237, 28, 36, 0.15)" }}
              >
                <Rocket size={16} style={{ color: "#ed1c24" }} />
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#ed1c24" }}>
                  En Construction
                </span>
              </motion.div>

              {/* Title */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] mb-6"
                style={{ fontFamily: "var(--font-display)", color: "#ffffff" }}
              >
                PROGRAMMATION<br />
                <span style={{ color: "#ed1c24" }}>EN LIGNE</span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.55)" }}
              >
                Nous travaillons activement sur notre plateforme d'entraînement en ligne. 
                Bientôt, tu pourras accéder à nos programmes depuis n'importe où.
              </p>

              {/* Animated dots */}
              <div className="flex items-center justify-center gap-2 mb-12">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#ed1c24" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </div>

              {/* Stay Tuned Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-2xl p-8 border border-white/[0.08] max-w-lg mx-auto mb-10"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Bell size={20} style={{ color: "#ed1c24" }} />
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                    STAY TUNED
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Sois parmi les premiers à accéder à nos programmes en ligne. 
                  Réserve ta consultation gratuite et nous te tiendrons informé du lancement.
                </p>
                <a
                  href="/consultation-gratuite"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 w-full sm:w-auto"
                  style={{ backgroundColor: "#ed1c24" }}
                >
                  Consultation Gratuite
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              {/* What's coming */}
              <div className="grid sm:grid-cols-3 gap-6 mt-12">
                {[
                  { title: "Programmes variés", desc: "Transformation, performance, bien-être et plus" },
                  { title: "Suivi personnalisé", desc: "Coaching et support de nos coachs certifiés" },
                  { title: "Communauté", desc: "Rejoins des centaines de membres motivés" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                    className="p-5 rounded-xl border border-white/[0.06]"
                    style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
