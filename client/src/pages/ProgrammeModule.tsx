import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Trophy, Calendar, Lightbulb, AlertTriangle, Download, FileText, Play, Volume2 } from "lucide-react";
import { PROGRAMME_MODULES } from "@/data/programmeModules";
import { Link, useParams, useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";

export default function ProgrammeModule() {
  const params = useParams<{ id: string }>();
  const [location, navigate] = useLocation();
  
  // Fallback: extract ID from URL path if useParams doesn't work
  const getModuleId = (): number => {
    if (params.id) return parseInt(params.id);
    const match = location.match(/\/programme\/module\/(\d+)/);
    if (match) return parseInt(match[1]);
    if (typeof window !== 'undefined') {
      const urlMatch = window.location.pathname.match(/\/programme\/module\/(\d+)/);
      if (urlMatch) return parseInt(urlMatch[1]);
    }
    return 0;
  };
  
  const moduleId = getModuleId();
  const module = PROGRAMME_MODULES.find(m => m.id === moduleId);

  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { data: enrollment, isLoading: enrollLoading } = trpc.programme.getEnrollment.useQuery(undefined, { enabled: isAuthenticated });
  const { data: progress, isLoading: progressLoading } = trpc.programme.getProgress.useQuery(undefined, { enabled: isAuthenticated });

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

  // Show loading while auth or data is being checked
  if (authLoading || enrollLoading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: "#ed1c24", borderTopColor: "transparent" }} />
          <p className="text-white/50 text-sm">Chargement...</p>
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
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center">
          <p className="text-white text-base sm:text-lg mb-4">Module introuvable</p>
          <p className="text-white/40 text-xs sm:text-sm mb-6">Le module demandé n'existe pas ou l'URL est incorrecte.</p>
          <Link href="/programme" className="text-sm hover:underline" style={{ color: "#ed1c24" }}>
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f1229" }}>
        <div className="text-center">
          <AlertTriangle size={40} className="mx-auto mb-4" style={{ color: "#ed1c24" }} />
          <h2 className="text-xl sm:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>MODULE VERROUILLÉ</h2>
          <p className="text-white/50 text-sm mb-6">Complète le module précédent pour débloquer celui-ci.</p>
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
      {/* Header - responsive */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Link href="/programme">
            <ArrowLeft size={18} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>{module.title}</p>
            <h1 className="text-sm sm:text-lg text-white font-bold truncate" style={{ fontFamily: "var(--font-display)" }}>{module.subtitle.toUpperCase()}</h1>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(34,197,94,0.15)" }}>
              <CheckCircle2 size={12} style={{ color: "#22c55e" }} />
              <span className="text-[10px] sm:text-xs font-bold" style={{ color: "#22c55e" }}>Complété</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border-l-4"
          style={{ backgroundColor: "rgba(237,28,36,0.04)", borderLeftColor: "#ed1c24" }}
        >
          <p className="text-white italic text-base sm:text-lg mb-2" style={{ fontFamily: "var(--font-body)" }}>
            "{module.quote}"
          </p>
          <p className="text-[10px] sm:text-xs text-white/40">— {module.quoteAuthor}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8 space-y-3 sm:space-y-4"
        >
          {module.content.map((paragraph, i) => (
            <p key={i} className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Video Player (Module 2 only) */}
        {module.documents && module.documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mb-6 sm:mb-8 rounded-xl overflow-hidden border border-white/[0.08]"
          >
            <div className="relative aspect-video w-full" style={{ backgroundColor: "#0a0c1a" }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1a1d3a 0%, #0f1229 50%, #1a0a0a 100%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => toast.info('Vidéo tutoriel à intégrer prochainement')}
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
                  style={{ backgroundColor: "rgba(237,28,36,0.9)" }}
                >
                  <Play size={24} className="text-white ml-0.5 sm:ml-1" fill="white" />
                </button>
              </div>
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 sm:px-2 py-0.5 sm:py-1 rounded" style={{ backgroundColor: "rgba(237,28,36,0.8)", color: "white" }}>Tutoriel</span>
              </div>
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                <span className="text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "white" }}>12:34</span>
              </div>
            </div>
            <div className="px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">Comment utiliser tes outils</p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">Tutoriel complet pour bien démarrer le programme</p>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Volume2 size={12} className="text-white/30" />
                <span className="text-[10px] sm:text-xs text-white/30">FR</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Documents / Downloads */}
        {module.documents && module.documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <FileText size={14} style={{ color: "#ed1c24" }} />
              <p className="text-xs sm:text-sm font-bold text-white">Documents à télécharger</p>
            </div>
            <div className="grid gap-2 sm:gap-3">
              {module.documents.map((doc, i) => (
                <button
                  key={i}
                  onClick={() => toast.info(`Téléchargement de "${doc.name}" bientôt disponible`)}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-white/[0.06] hover:border-white/[0.15] transition-all group cursor-pointer text-left w-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                >
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-base sm:text-xl" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-white/90 truncate">{doc.name}</p>
                    <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 truncate">{doc.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <span className="text-[8px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/[0.06] text-white/50">{doc.fileType}</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-red-500/20" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                      <Download size={12} style={{ color: "#ed1c24" }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Habit objective */}
        {module.habit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
                <span className="text-base sm:text-lg">{module.icon}</span>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>Habitude de la semaine</p>
                <p className="text-white font-bold text-sm sm:text-base">{module.habit}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/50">{module.habitObjective}</p>
          </motion.div>
        )}

        {/* Tips */}
        {module.tips && module.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Lightbulb size={14} style={{ color: "#f59e0b" }} />
              <p className="text-xs sm:text-sm font-bold text-white">Trucs & Astuces</p>
            </div>
            <div className="space-y-2 sm:space-y-2.5">
              {module.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle2 size={12} style={{ color: "#ed1c24" }} className="flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/50">{tip}</span>
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
            className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl border-2"
            style={{ backgroundColor: "rgba(237,28,36,0.08)", borderColor: "#ed1c24" }}
          >
            <div className="flex items-center gap-3">
              <Calendar size={18} style={{ color: "#ed1c24" }} className="flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">{module.appointmentType}</p>
                <p className="text-[10px] sm:text-xs text-white/50">Prends rendez-vous cette semaine! C'est inclus dans ton programme.</p>
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
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4" style={{ color: "#ed1c24" }}>
              Check-in de la semaine
            </h3>
            <p className="text-[10px] sm:text-xs text-white/40 mb-4 sm:mb-5">Note chaque habitude de 1 à 10 selon ta semaine.</p>
            <div className="space-y-3 sm:space-y-4">
              {module.checkinHabits.map(habit => (
                <div key={habit} className="flex items-center justify-between gap-3 sm:gap-4">
                  <span className="text-xs sm:text-sm text-white/70 flex-1">{habit}</span>
                  <select
                    value={checkinValues[habit] || ""}
                    onChange={(e) => handleCheckinChange(habit, parseInt(e.target.value))}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold text-white border border-white/[0.12] focus:border-red-500/50 focus:outline-none transition-colors"
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
              className="mt-4 sm:mt-5 w-full py-2 sm:py-2.5 text-xs sm:text-sm font-bold rounded-lg border border-white/[0.12] text-white/70 hover:border-red-500/40 hover:text-white transition-all disabled:opacity-50"
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
            className="mb-6 sm:mb-8"
          >
            <button
              onClick={handleComplete}
              disabled={completeMutation.isPending || !allCheckinsFilled}
              className="w-full py-3 sm:py-4 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.01] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
            >
              <Trophy size={16} />
              {completeMutation.isPending ? "Complétion..." : "Compléter ce module (+100 XP)"}
            </button>
            {!allCheckinsFilled && module.checkinHabits.length > 0 && (
              <p className="text-[10px] sm:text-xs text-white/30 text-center mt-2">Remplis tous les check-ins pour compléter le module</p>
            )}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          {moduleId > 1 ? (
            <Link href={`/programme/module/${moduleId - 1}`} className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors">
              ← Précédent
            </Link>
          ) : <span />}
          {moduleId < 14 && isCompleted ? (
            <Link href={`/programme/module/${moduleId + 1}`} className="text-xs sm:text-sm hover:underline" style={{ color: "#ed1c24" }}>
              Suivant →
            </Link>
          ) : (
            <Link href="/programme" className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors">
              Tableau de bord →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
