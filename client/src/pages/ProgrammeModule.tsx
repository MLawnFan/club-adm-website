import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Trophy, Calendar, Lightbulb, AlertTriangle } from "lucide-react";
import { PROGRAMME_MODULES } from "@/data/programmeModules";
import { Link, useParams, useLocation, useRoute } from "wouter";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export default function ProgrammeModule() {
  const params = useParams<{ id: string }>();
  const [location, navigate] = useLocation();
  
  // Fallback: extract ID from URL path if useParams doesn't work
  const getModuleId = (): number => {
    if (params.id) return parseInt(params.id);
    // Fallback: parse from current URL
    const match = location.match(/\/programme\/module\/(\d+)/);
    if (match) return parseInt(match[1]);
    // Last resort: try window.location
    if (typeof window !== 'undefined') {
      const urlMatch = window.location.pathname.match(/\/programme\/module\/(\d+)/);
      if (urlMatch) return parseInt(urlMatch[1]);
    }
    return 0;
  };
  
  const moduleId = getModuleId();
  const module = PROGRAMME_MODULES.find(m => m.id === moduleId);

  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { data: enrollment } = trpc.programme.getEnrollment.useQuery(undefined, { enabled: isAuthenticated });
  const { data: progress } = trpc.programme.getProgress.useQuery(undefined, { enabled: isAuthenticated });

  const completeMutation = trpc.programme.completeModule.useMutation({
    onSuccess: (data) => {
      toast.success(`Module complété! +${data.xpEarned} XP 🎉`);
      setTimeout(() => navigate("/programme"), 1500);
    },
  });

  const saveCheckinMutation = trpc.programme.saveCheckin.useMutation({
    onSuccess: () => toast.success("Check-in sauvegardé!"),
  });

  // Check-in state
  const existingProgress = progress?.find(p => p.moduleId === moduleId);
  const existingCheckin = (existingProgress?.checkinData as Record<string, number>) || {};
  
  const [checkinValues, setCheckinValues] = useState<Record<string, number>>(() => existingCheckin);

  const isCompleted = existingProgress?.completed === 1;
  const isUnlocked = moduleId <= (enrollment?.currentModule || 1) || isCompleted;

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "#ed1c24", borderTopColor: "transparent" }} />
          <p className="text-white/50">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center px-6">
          <p className="text-white text-lg mb-4">Module introuvable</p>
          <p className="text-white/40 text-sm mb-6">Le module demandé n'existe pas ou l'URL est incorrecte.</p>
          <Link href="/programme" className="text-sm hover:underline" style={{ color: "#ed1c24" }}>
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center px-6">
          <AlertTriangle size={48} className="mx-auto mb-4" style={{ color: "#ed1c24" }} />
          <h2 className="text-2xl text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>MODULE VERROUILLÉ</h2>
          <p className="text-white/50 mb-6">Complète le module précédent pour débloquer celui-ci.</p>
          <Link href="/programme" className="text-sm hover:underline" style={{ color: "#ed1c24" }}>
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckinChange = (habit: string, value: number) => {
    setCheckinValues(prev => ({ ...prev, [habit]: value }));
  };

  const handleSaveCheckin = () => {
    if (module.checkinHabits.length > 0) {
      saveCheckinMutation.mutate({ moduleId, checkinData: checkinValues });
    }
  };

  const handleComplete = () => {
    completeMutation.mutate({ moduleId, checkinData: checkinValues });
  };

  const allCheckinsFilled = module.checkinHabits.length === 0 || 
    module.checkinHabits.every(h => checkinValues[h] && checkinValues[h] > 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      {/* Header */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/programme">
            <ArrowLeft size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
          </Link>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>{module.title}</p>
            <h1 className="text-lg text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>{module.subtitle.toUpperCase()}</h1>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)" }}>
              <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
              <span className="text-xs font-bold" style={{ color: "#22c55e" }}>Complété</span>
            </div>
          )}
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

        {/* Check-in section */}
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
                    value={checkinValues[habit] || ""}
                    onChange={(e) => handleCheckinChange(habit, parseInt(e.target.value))}
                    className="px-3 py-2 rounded-lg text-sm font-bold text-white border border-white/[0.12] focus:border-red-500/50 focus:outline-none transition-colors"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <option value="">—</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n} style={{ backgroundColor: "#1a1d3a", color: "white" }}>{n}/10</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button
              onClick={handleSaveCheckin}
              disabled={saveCheckinMutation.isPending}
              className="mt-5 w-full py-2.5 text-sm font-bold rounded-lg border border-white/[0.12] text-white/70 hover:border-red-500/40 hover:text-white transition-all disabled:opacity-50"
            >
              {saveCheckinMutation.isPending ? "Sauvegarde..." : "Sauvegarder le check-in"}
            </button>
          </motion.div>
        )}

        {/* Complete module button */}
        {!isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={handleComplete}
              disabled={completeMutation.isPending || !allCheckinsFilled}
              className="w-full py-4 text-white text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
            >
              <Trophy size={18} />
              {completeMutation.isPending ? "Complétion..." : "Compléter ce module (+100 XP)"}
            </button>
            {!allCheckinsFilled && module.checkinHabits.length > 0 && (
              <p className="text-xs text-white/30 text-center mt-2">Remplis tous les check-ins pour compléter le module</p>
            )}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          {moduleId > 1 ? (
            <Link href={`/programme/module/${moduleId - 1}`} className="text-sm text-white/40 hover:text-white transition-colors">
              ← Module précédent
            </Link>
          ) : <span />}
          {moduleId < 14 && isCompleted ? (
            <Link href={`/programme/module/${moduleId + 1}`} className="text-sm hover:underline" style={{ color: "#ed1c24" }}>
              Module suivant →
            </Link>
          ) : (
            <Link href="/programme" className="text-sm text-white/40 hover:text-white transition-colors">
              Tableau de bord →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
