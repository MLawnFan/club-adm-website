import { motion } from "framer-motion";
import { Trophy, Zap, Flame, Star, ChevronRight, ArrowLeft, Eye, CheckCircle2, Lock } from "lucide-react";
import { PROGRAMME_MODULES, LEVELS, BADGES } from "@/data/programmeModules";
import { Link } from "wouter";
import { useState, useMemo } from "react";

/**
 * Mode Preview/Démo du programme - accessible sans authentification
 * Affiche la liste des modules avec progression synchronisée depuis localStorage
 * URL: /programme/preview
 */

function getLevel(totalXp: number) {
  if (totalXp >= 1200) return LEVELS[4];
  if (totalXp >= 800) return LEVELS[3];
  if (totalXp >= 500) return LEVELS[2];
  if (totalXp >= 200) return LEVELS[1];
  return LEVELS[0];
}

export default function ProgrammePreview() {
  // Read progress from localStorage
  const [completedModules] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("preview_completed_modules") || "[]"); } catch { return []; }
  });
  const [totalXp] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("preview_xp") || "0"); } catch { return 0; }
  });
  const [streak] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("preview_streak") || "0"); } catch { return 0; }
  });

  const completedIds = new Set(completedModules);
  const currentLevel = getLevel(totalXp);
  const completedCount = completedModules.length;
  const totalModules = PROGRAMME_MODULES.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const earnedBadges = useMemo(() => {
    return BADGES.filter(b => completedCount >= b.moduleRequired);
  }, [completedCount]);

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
              <p className="text-[10px] sm:text-xs text-white/40">Programme de transformation — 12 semaines</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
                <Flame size={12} style={{ color: "#f59e0b" }} />
                <span className="text-[10px] font-bold" style={{ color: "#f59e0b" }}>{streak}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full" style={{ backgroundColor: `${currentLevel.color}15`, border: `1px solid ${currentLevel.color}40` }}>
              <Star size={12} style={{ color: currentLevel.color }} fill="currentColor" />
              <span className="text-[10px] sm:text-xs font-bold" style={{ color: currentLevel.color }}>{currentLevel.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats card - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-lg sm:text-2xl font-bold text-yellow-400">{totalXp}</span>
              </div>
              <p className="text-[9px] sm:text-xs text-white/30">XP Total</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame size={14} style={{ color: streak > 0 ? "#f59e0b" : "rgba(255,255,255,0.3)" }} />
                <span className="text-lg sm:text-2xl font-bold" style={{ color: streak > 0 ? "#f59e0b" : "rgba(255,255,255,0.3)" }}>{streak}</span>
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
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: currentLevel.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-bold text-white/50 flex-shrink-0">{progressPercent}%</span>
          </div>
          <p className="text-[10px] text-white/30 mt-2">{completedCount} module{completedCount > 1 ? "s" : ""} complété{completedCount > 1 ? "s" : ""} sur {totalModules}</p>
        </motion.div>

        {/* Badges section */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-6 sm:mb-8"
          >
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Badges débloqués</h3>
            <div className="flex flex-wrap gap-2">
              {BADGES.map(badge => {
                const earned = earnedBadges.includes(badge);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium ${earned ? "" : "opacity-25 grayscale"}`}
                    style={{ backgroundColor: earned ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.02)", border: earned ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(255,255,255,0.05)" }}
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    <span className={earned ? "text-white" : "text-white/30"}>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Modules grid */}
        <h3 className="text-[10px] sm:text-sm font-bold uppercase tracking-wider text-white/50 mb-3 sm:mb-4">Les 14 modules</h3>
        <div className="grid gap-2 sm:gap-3">
          {PROGRAMME_MODULES.map((module, index) => {
            const isModuleCompleted = completedIds.has(module.id);
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Link href={`/programme/preview/${module.id}`}>
                  <div
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.005] sm:hover:scale-[1.01] ${
                      isModuleCompleted ? "border-green-500/20" : "border-white/[0.06] hover:border-white/[0.12]"
                    }`}
                    style={{ backgroundColor: isModuleCompleted ? "rgba(34,197,94,0.04)" : "rgba(255,255,255,0.02)" }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg sm:text-xl relative"
                      style={{ backgroundColor: isModuleCompleted ? "rgba(34,197,94,0.12)" : "rgba(237,28,36,0.12)" }}
                    >
                      {module.icon}
                      {isModuleCompleted && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#22c55e" }}>
                          <CheckCircle2 size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" style={{ color: isModuleCompleted ? "#22c55e" : "#ed1c24" }}>
                          {module.title}
                        </span>
                        {isModuleCompleted && (
                          <span className="text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
                            +100 XP
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-white font-medium mt-0.5 truncate">{module.subtitle}</p>
                      <p className="text-[10px] sm:text-xs text-white/35 mt-0.5 truncate hidden sm:block">{module.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-white/30 flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
