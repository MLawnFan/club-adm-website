import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Trophy, Calendar, Lightbulb, Eye } from "lucide-react";
import { PROGRAMME_MODULES } from "@/data/programmeModules";
import { Link, useParams, useLocation } from "wouter";

/**
 * Mode Preview d'un module individuel - accessible sans authentification
 * URL: /programme/preview/:id
 */
export default function ProgrammePreviewModule() {
  const params = useParams<{ id: string }>();
  const [location] = useLocation();
  
  // Fallback: extract ID from URL path if useParams doesn't work
  const getModuleId = (): number => {
    if (params.id) return parseInt(params.id);
    const match = location.match(/\/programme\/preview\/(\d+)/);
    if (match) return parseInt(match[1]);
    if (typeof window !== 'undefined') {
      const urlMatch = window.location.pathname.match(/\/programme\/preview\/(\d+)/);
      if (urlMatch) return parseInt(urlMatch[1]);
    }
    return 0;
  };
  
  const moduleId = getModuleId();
  const module = PROGRAMME_MODULES.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center px-6">
          <p className="text-white text-lg mb-4">Module introuvable</p>
          <p className="text-white/40 text-sm mb-6">Le module demandé n'existe pas ou l'URL est incorrecte.</p>
          <Link href="/programme/preview" className="text-sm hover:underline" style={{ color: "#ed1c24" }}>
            ← Retour à la liste des modules
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      {/* Header */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/programme/preview">
            <ArrowLeft size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
          </Link>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>{module.title}</p>
            <h1 className="text-lg text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>{module.subtitle.toUpperCase()}</h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
            <Eye size={14} style={{ color: "#f59e0b" }} />
            <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>APERÇU</span>
          </div>
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-6 py-8">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-xl border-l-4"
          style={{ backgroundColor: "rgba(237,28,36,0.04)", borderLeftColor: "#ed1c24" }}
        >
          <p className="text-white italic text-lg mb-2" style={{ fontFamily: "var(--font-body)" }}>
            "{module.quote}"
          </p>
          <p className="text-xs text-white/40">— {module.quoteAuthor}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {module.content.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Habit objective */}
        {module.habit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
                <span className="text-lg">{module.icon}</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>Habitude de la semaine</p>
                <p className="text-white font-bold">{module.habit}</p>
              </div>
            </div>
            <p className="text-sm text-white/50 mb-4">{module.habitObjective}</p>
          </motion.div>
        )}

        {/* Tips */}
        {module.tips && module.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} style={{ color: "#f59e0b" }} />
              <p className="text-sm font-bold text-white">Trucs & Astuces</p>
            </div>
            <div className="space-y-2.5">
              {module.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} style={{ color: "#ed1c24" }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/50">{tip}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Appointment alert */}
        {module.hasAppointment && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8 p-5 rounded-xl border-2"
            style={{ backgroundColor: "rgba(237,28,36,0.08)", borderColor: "#ed1c24" }}
          >
            <div className="flex items-center gap-3">
              <Calendar size={20} style={{ color: "#ed1c24" }} />
              <div>
                <p className="text-sm font-bold text-white">{module.appointmentType}</p>
                <p className="text-xs text-white/50">Prends rendez-vous cette semaine! C'est inclus dans ton programme.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Check-in section (read-only preview) */}
        {module.checkinHabits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#ed1c24" }}>
              Check-in de la semaine
            </h3>
            <p className="text-xs text-white/40 mb-5">Note chaque habitude de 1 à 10 selon ta performance cette semaine.</p>
            <div className="space-y-4">
              {module.checkinHabits.map(habit => (
                <div key={habit} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-white/70 flex-1">{habit}</span>
                  <select
                    disabled
                    className="px-3 py-2 rounded-lg text-sm font-bold text-white/40 border border-white/[0.08] cursor-not-allowed"
                    style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                  >
                    <option>—</option>
                  </select>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-amber-500/70 italic">Les check-ins sont désactivés en mode aperçu.</p>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          {moduleId > 1 ? (
            <Link href={`/programme/preview/${moduleId - 1}`} className="text-sm text-white/40 hover:text-white transition-colors">
              ← Module précédent
            </Link>
          ) : <span />}
          {moduleId < 14 ? (
            <Link href={`/programme/preview/${moduleId + 1}`} className="text-sm hover:underline" style={{ color: "#ed1c24" }}>
              Module suivant →
            </Link>
          ) : (
            <Link href="/programme/preview" className="text-sm text-white/40 hover:text-white transition-colors">
              Retour à la liste →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
