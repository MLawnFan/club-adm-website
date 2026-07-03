/*
 * PAGE DÉTAIL — Événement Course 19 septembre Chambly
 * Événement caritatif au profit de la Fondation du Centre Jeunesse de la Montérégie
 * Design dark premium cohérent avec le reste du site
 */
import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, ArrowRight, ArrowLeft, Users, Target, Clock, Dumbbell, CalendarDays, Sun } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const DISTANCES = [
  { label: "21,1 KM", subtitle: "Demi-marathon", href: "#", color: "#ed1c24" },
  { label: "10 KM", subtitle: "Course", href: "#", color: "#ed1c24" },
  { label: "5 KM", subtitle: "Course", href: "#", color: "#ed1c24" },
  { label: "1 KM", subtitle: "Familial", href: "#", color: "#ed1c24" },
];

export default function EvenementCourse() {
  const handleDistanceClick = (distance: typeof DISTANCES[0]) => {
    if (distance.href === "#") {
      toast("Inscriptions bientôt disponibles", {
        description: `Le lien d'inscription pour le ${distance.label} sera disponible sous peu.`,
      });
      return;
    }
    window.open(distance.href, "_blank");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 pt-8">
        <Link href="/evenements">
          <span className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer" style={{ fontFamily: "var(--font-body)" }}>
            <ArrowLeft size={14} /> Retour aux événements
          </span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden" style={{ backgroundColor: "#0f1229" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1229]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 mb-6" style={{ backgroundColor: "rgba(237,28,36,0.08)" }}>
                <Calendar size={14} style={{ color: "#ed1c24" }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
                  19 septembre 2025 · Chambly
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl xl:text-7xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
                ÉVÉNEMENT<br /><span style={{ color: "#ed1c24" }}>COURSE</span>
              </h1>

              <p className="text-lg lg:text-xl leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>
                T'as déjà eu envie de te dépasser, mais de le faire pour quelque chose de <strong className="text-white">plus grand que toi</strong> ?
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
                Que tu coures 1 km ou 21,1 km, peu importe ton niveau, peu importe ton rythme — ce jour-là, on avance ensemble.
              </p>

              {/* Key info */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <MapPin size={16} style={{ color: "#ed1c24" }} />
                  <span className="text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>Chambly, QC</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <Calendar size={16} style={{ color: "#ed1c24" }} />
                  <span className="text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>19 septembre 2025</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <Clock size={16} style={{ color: "#ed1c24" }} />
                  <span className="text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>8h00</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <Users size={16} style={{ color: "#ed1c24" }} />
                  <span className="text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>Tous les niveaux</span>
                </div>
              </div>

              <a
                href="#distances"
                className="inline-flex items-center gap-2 px-8 py-4 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02]"
                style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
              >
                Choisis ta distance <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Section — Cause */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
              <Heart size={28} style={{ color: "#ed1c24" }} />
            </div>
            <h2 className="text-3xl lg:text-5xl leading-[0.9] mb-8 text-white" style={{ fontFamily: "var(--font-display)" }}>
              POURQUOI C'EST<br /><span style={{ color: "#ed1c24" }}>IMPORTANT</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)" }}>
              Les profits de cet événement sont entièrement remis à la <strong className="text-white">Fondation du Centre Jeunesse de la Montérégie</strong>.
            </p>

            {/* Impact Card */}
            <div className="rounded-2xl p-8 lg:p-10 border border-white/[0.08] text-center" style={{ backgroundColor: "rgba(237,28,36,0.05)" }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Target size={24} style={{ color: "#ed1c24" }} />
                <span className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>100 $ = 1 SAC D'ÉCOLE</span>
              </div>
              <p className="text-base leading-relaxed max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                Pour chaque tranche de 100 $ amassée, c'est un sac d'école complet qui est remis à un enfant en difficulté — avec tout le matériel dont il a besoin pour démarrer son année scolaire du bon pied.
              </p>
            </div>

            <p className="text-lg leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              <strong className="text-white">Un enfant. Un sac. Une chance de plus.</strong>
            </p>

            <p className="text-base leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              On croit fort ici que prendre soin de soi et redonner à la communauté, c'est pas deux choses séparées. C'est la même énergie. C'est le même état d'esprit.
            </p>

            <p className="text-lg leading-relaxed text-center font-semibold" style={{ color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body)" }}>
              Tu t'inscris. Tu cours. Tu te dépasses. Et tu aides un kid à se présenter en classe avec la tête haute.
            </p>

            <p className="text-xl text-center font-bold text-white" style={{ fontFamily: "var(--font-body)" }}>
              C'est ça, le Club ADM.
            </p>

            {/* Logo Fondation */}
            <div className="flex flex-col items-center gap-5 mt-12 pt-10 border-t border-white/[0.08]">
              <span className="text-sm uppercase tracking-[0.15em] font-semibold" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>Au profit de la fondation</span>
              <img
                src="/manus-storage/logo-fcjm-white_7b1042df.svg"
                alt="Fondation du Centre Jeunesse de la Montérégie"
                className="h-28 lg:h-36 w-auto"
              />
              <p className="text-sm text-center max-w-md" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                Fondation du Centre Jeunesse de la Montérégie
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programmation incluse */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
              Inclus avec ton inscription
            </p>
            <h2 className="text-3xl lg:text-5xl leading-[0.9] mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
              PROGRAMMATION DE<br /><span style={{ color: "#ed1c24" }}>COURSE</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Chaque participant reçoit une programmation de course sur 3 entraînements par semaine pour te préparer à ta distance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 2x sur ton temps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl p-6 lg:p-8 border border-white/[0.08] text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
                <Dumbbell size={24} style={{ color: "#ed1c24" }} />
              </div>
              <span className="text-3xl font-bold text-white block mb-1" style={{ fontFamily: "var(--font-display)" }}>2x</span>
              <span className="text-sm uppercase tracking-wider block mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>par semaine</span>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                Sur ton propre temps, à ton rythme. Programmation personnalisée selon ta distance.
              </p>
            </motion.div>

            {/* 1x Run Club */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl p-6 lg:p-8 border border-red-500/30 text-center"
              style={{ backgroundColor: "rgba(237,28,36,0.05)" }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
                <Sun size={24} style={{ color: "#ed1c24" }} />
              </div>
              <span className="text-3xl font-bold text-white block mb-1" style={{ fontFamily: "var(--font-display)" }}>1x</span>
              <span className="text-sm uppercase tracking-wider block mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>le dimanche</span>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                Avec le Run Club. On court ensemble, on se motive, on se dépasse en groupe.
              </p>
            </motion.div>

            {/* Total */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-2xl p-6 lg:p-8 border border-white/[0.08] text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
                <CalendarDays size={24} style={{ color: "#ed1c24" }} />
              </div>
              <span className="text-3xl font-bold text-white block mb-1" style={{ fontFamily: "var(--font-display)" }}>3x</span>
              <span className="text-sm uppercase tracking-wider block mb-3" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>par semaine</span>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
                Total : 3 entraînements par semaine pour être prêt le jour J.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Distances Section */}
      <section id="distances" className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
              Inscriptions ouvertes
            </p>
            <h2 className="text-3xl lg:text-5xl leading-[0.9] mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>
              CHOISIS TA<br /><span style={{ color: "#ed1c24" }}>DISTANCE</span>
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Choisis ta distance et réserve ta place pour le 19 septembre, à Chambly.
            </p>
          </motion.div>

          {/* Distance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DISTANCES.map((distance, index) => (
              <motion.button
                key={distance.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDistanceClick(distance)}
                className="group relative rounded-2xl p-8 border border-white/[0.1] hover:border-red-500/50 transition-all duration-300 cursor-pointer text-left overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: "radial-gradient(circle at center, rgba(237,28,36,0.08) 0%, transparent 70%)" }} />
                
                <div className="relative">
                  <span className="text-4xl lg:text-5xl font-bold text-white block mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {distance.label}
                  </span>
                  <span className="text-sm uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
                    {distance.subtitle}
                  </span>
                  <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>
                    S'inscrire <ArrowRight size={14} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-10 text-sm"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
          >
            Au profit de la Fondation du Centre Jeunesse de la Montérégie
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
