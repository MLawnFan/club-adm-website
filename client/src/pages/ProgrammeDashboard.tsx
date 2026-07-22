import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { motion } from "framer-motion";
import { Lock, Trophy, Zap, Flame, Star, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { PROGRAMME_MODULES, LEVELS, BADGES } from "@/data/programmeModules";
import { Link } from "wouter";

export default function ProgrammeDashboard() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { data: enrollment, isLoading: enrollLoading } = trpc.programme.getEnrollment.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const { data: progress, isLoading: progressLoading } = trpc.programme.getProgress.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );
  const startMutation = trpc.programme.startProgramme.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  // Not logged in
  if (!authLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f1229" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
            <Lock size={30} style={{ color: "#ed1c24" }} />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-3 sm:mb-4" style={{ fontFamily: "var(--font-display)" }}>
            ESPACE MEMBRE
          </h1>
          <p className="text-sm sm:text-base mb-6 sm:mb-8" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
            Connecte-toi pour accéder à ton programme On R'start la Machine et suivre ta progression.
          </p>
          <a
            href={getLoginUrl()}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105"
            style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
          >
            Se connecter
          </a>
          <div className="mt-5 sm:mt-6">
            <Link href="/" className="text-sm hover:underline" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Loading
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

  // Not enrolled yet
  if (!enrollment) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#0f1229" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <div className="text-5xl sm:text-6xl mb-5 sm:mb-6">🔥</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4" style={{ fontFamily: "var(--font-display)" }}>
            ON R'START<br /><span style={{ color: "#ed1c24" }}>LA MACHINE</span>
          </h1>
          <p className="text-sm sm:text-base mb-3 sm:mb-4 text-white/50" style={{ fontFamily: "var(--font-body)" }}>
            Programme de transformation en 12 semaines
          </p>
          <p className="text-xs sm:text-sm mb-6 sm:mb-8 text-white/35 max-w-sm mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            14 modules progressifs pour bâtir des habitudes durables. Une nouvelle habitude par semaine. Gamifié pour te garder motivé.
          </p>
          <button
            onClick={() => startMutation.mutate()}
            disabled={startMutation.isPending}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:scale-105 disabled:opacity-50"
            style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}
          >
            {startMutation.isPending ? "Démarrage..." : "Commencer le programme"} <Zap size={18} />
          </button>
          <div className="mt-5 sm:mt-6">
            <Link href="/" className="text-sm hover:underline" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  const completedModules = progress?.filter(p => p.completed === 1) || [];
  const completedIds = new Set(completedModules.map(p => p.moduleId));
  const progressPercent = Math.round((completedModules.length / 14) * 100);
  const currentLevel = LEVELS.slice().reverse().find(l => completedModules.length >= l.minModules) || LEVELS[0];
  const earnedBadges = BADGES.filter(b => completedModules.length >= b.moduleRequired);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      {/* Header - responsive */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/">
              <ArrowLeft size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-lg text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>ON R'START LA MACHINE</h1>
              <p className="text-[10px] sm:text-xs text-white/40">Salut, {user?.name || "Membre"} 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full" style={{ backgroundColor: "rgba(237,28,36,0.12)" }}>
              <Zap size={12} style={{ color: "#ed1c24" }} />
              <span className="text-[10px] sm:text-sm font-bold text-white">{enrollment.totalXp} XP</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full" style={{ backgroundColor: `${currentLevel.color}20` }}>
              <Star size={12} style={{ color: currentLevel.color }} />
              <span className="text-[10px] sm:text-sm font-bold hidden sm:inline" style={{ color: currentLevel.color }}>{currentLevel.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats card - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.06]"
          style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        >
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-lg sm:text-2xl font-bold text-yellow-400">{enrollment.totalXp}</span>
              </div>
              <p className="text-[9px] sm:text-xs text-white/30">XP Total</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame size={14} style={{ color: enrollment.streak > 0 ? "#f59e0b" : "rgba(255,255,255,0.3)" }} />
                <span className="text-lg sm:text-2xl font-bold" style={{ color: enrollment.streak > 0 ? "#f59e0b" : "rgba(255,255,255,0.3)" }}>{enrollment.streak}</span>
              </div>
              <p className="text-[9px] sm:text-xs text-white/30">Streak</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy size={14} style={{ color: "#ed1c24" }} />
                <span className="text-lg sm:text-2xl font-bold text-white">{earnedBadges.length}</span>
              </div>
              <p className="text-[9px] sm:text-xs text-white/30">Badges</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-sm text-white/50">Progression globale</span>
            <span className="text-xs sm:text-sm font-bold text-white">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 sm:h-3 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: "#ed1c24" }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] sm:text-xs text-white/30">{completedModules.length} / 14 modules</span>
            <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor: `${currentLevel.color}20`, color: currentLevel.color }}>
              {currentLevel.name}
            </span>
          </div>
        </motion.div>

        {/* Badges */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <h3 className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/50 mb-3 sm:mb-4">Tes badges</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {BADGES.map(badge => {
                const earned = earnedBadges.includes(badge);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border ${earned ? "border-white/[0.08]" : "border-white/[0.04] opacity-30 grayscale"}`}
                    style={{ backgroundColor: earned ? "rgba(237,28,36,0.06)" : "rgba(255,255,255,0.02)" }}
                  >
                    <span className="text-base sm:text-lg">{badge.icon}</span>
                    <span className={`text-[10px] sm:text-xs font-bold ${earned ? "text-white" : "text-white/30"}`}>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Modules grid */}
        <h3 className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/50 mb-3 sm:mb-4">Les modules</h3>
        <div className="grid gap-2 sm:gap-3">
          {PROGRAMME_MODULES.map((module, index) => {
            const isCompleted = completedIds.has(module.id);
            const isUnlocked = module.id <= (enrollment.currentModule || 1) || isCompleted;
            const isCurrent = module.id === enrollment.currentModule && !isCompleted;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                {isUnlocked ? (
                  <Link href={`/programme/module/${module.id}`}>
                    <div
                      className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.005] sm:hover:scale-[1.01] ${
                        isCurrent
                          ? "border-red-500/40 shadow-lg shadow-red-500/5"
                          : isCompleted
                          ? "border-green-500/20"
                          : "border-white/[0.06] hover:border-white/[0.12]"
                      }`}
                      style={{
                        backgroundColor: isCurrent
                          ? "rgba(237,28,36,0.06)"
                          : isCompleted
                          ? "rgba(34,197,94,0.04)"
                          : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg sm:text-xl relative"
                        style={{
                          backgroundColor: isCompleted ? "rgba(34,197,94,0.15)" : "rgba(237,28,36,0.12)",
                        }}
                      >
                        {isCompleted ? <CheckCircle2 size={20} style={{ color: "#22c55e" }} /> : module.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: isCompleted ? "#22c55e" : "#ed1c24" }}>
                            {module.title}
                          </span>
                          {isCurrent && (
                            <span className="text-[8px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full font-bold text-white" style={{ backgroundColor: "#ed1c24" }}>
                              EN COURS
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-white font-medium mt-0.5 truncate">{module.subtitle}</p>
                        <p className="text-[10px] sm:text-xs text-white/35 mt-0.5 truncate hidden sm:block">{module.description}</p>
                      </div>
                      <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
                    </div>
                  </Link>
                ) : (
                  <div
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/[0.04] opacity-50"
                    style={{ backgroundColor: "rgba(255,255,255,0.01)" }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                      <Lock size={14} className="text-white/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/30">{module.title}</span>
                      <p className="text-xs sm:text-sm text-white/40 font-medium mt-0.5">{module.subtitle}</p>
                      <p className="text-[9px] sm:text-xs text-white/20 mt-0.5">Complète le module précédent pour débloquer</p>
                    </div>
                    <Lock size={12} className="text-white/20 flex-shrink-0" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
