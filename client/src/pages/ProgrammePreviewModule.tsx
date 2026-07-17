import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Trophy, Calendar, Lightbulb, Eye, Download, FileText, Play, Volume2, Check, Flame, Zap, Lock, Star } from "lucide-react";
import { PROGRAMME_MODULES, LEVELS, BADGES } from "@/data/programmeModules";
import { Link, useParams, useLocation } from "wouter";
import { useState, useEffect, useMemo, useCallback } from "react";

/**
 * Mode Preview d'un module individuel - accessible sans authentification
 * Gamifié avec streaks, XP, badges, check-in obligatoire, confettis
 * URL: /programme/preview/:id
 */

// XP values
const XP_MODULE_COMPLETE = 100;
const XP_CHECKIN_COMPLETE = 50;
const XP_STREAK_BONUS = 25;

function getLevel(totalXp: number) {
  if (totalXp >= 1200) return LEVELS[4];
  if (totalXp >= 800) return LEVELS[3];
  if (totalXp >= 500) return LEVELS[2];
  if (totalXp >= 200) return LEVELS[1];
  return LEVELS[0];
}

function getNextLevel(totalXp: number) {
  if (totalXp >= 1200) return null;
  if (totalXp >= 800) return { ...LEVELS[4], xpRequired: 1200 };
  if (totalXp >= 500) return { ...LEVELS[3], xpRequired: 800 };
  if (totalXp >= 200) return { ...LEVELS[2], xpRequired: 500 };
  return { ...LEVELS[1], xpRequired: 200 };
}

// Confetti component
function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1,
    color: ["#ed1c24", "#f59e0b", "#22c55e", "#3b82f6", "#8b5cf6", "#ffffff"][Math.floor(Math.random() * 6)],
    size: 4 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 360 + Math.random() * 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

export default function ProgrammePreviewModule() {
  const params = useParams<{ id: string }>();
  const [location] = useLocation();
  
  // State from localStorage
  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("preview_completed_modules") || "[]"); } catch { return []; }
  });
  const [checkinData, setCheckinData] = useState<Record<number, Record<string, number>>>(() => {
    try { return JSON.parse(localStorage.getItem("preview_checkin_data") || "{}"); } catch { return {}; }
  });
  const [streak, setStreak] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("preview_streak") || "0"); } catch { return 0; }
  });
  const [totalXp, setTotalXp] = useState<number>(() => {
    try { return parseInt(localStorage.getItem("preview_xp") || "0"); } catch { return 0; }
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [xpGain, setXpGain] = useState<number | null>(null);

  // Persist state
  useEffect(() => { try { localStorage.setItem("preview_completed_modules", JSON.stringify(completedModules)); } catch {} }, [completedModules]);
  useEffect(() => { try { localStorage.setItem("preview_checkin_data", JSON.stringify(checkinData)); } catch {} }, [checkinData]);
  useEffect(() => { try { localStorage.setItem("preview_streak", streak.toString()); } catch {} }, [streak]);
  useEffect(() => { try { localStorage.setItem("preview_xp", totalXp.toString()); } catch {} }, [totalXp]);

  // Extract module ID
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

  const isCompleted = completedModules.includes(moduleId);
  const totalModules = PROGRAMME_MODULES.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  // Check if check-in is completed for this module
  const moduleCheckinData = checkinData[moduleId] || {};
  const checkinComplete = module ? module.checkinHabits.length === 0 || module.checkinHabits.every(h => moduleCheckinData[h] && moduleCheckinData[h] > 0) : false;

  // Can mark as complete? (check-in must be done first if module has checkin habits)
  const canComplete = module ? (module.checkinHabits.length === 0 || checkinComplete) : false;

  // Current level
  const currentLevel = getLevel(totalXp);
  const nextLevel = getNextLevel(totalXp);

  // Earned badges
  const earnedBadges = useMemo(() => {
    return BADGES.filter(b => completedCount >= b.moduleRequired);
  }, [completedCount]);

  const handleCheckinChange = (habit: string, value: number) => {
    setCheckinData(prev => ({
      ...prev,
      [moduleId]: { ...(prev[moduleId] || {}), [habit]: value }
    }));
  };

  const handleMarkComplete = useCallback(() => {
    if (!canComplete && !isCompleted) return;
    
    if (!isCompleted) {
      setCompletedModules(prev => [...prev, moduleId]);
      // Award XP
      let xp = XP_MODULE_COMPLETE;
      if (checkinComplete && module && module.checkinHabits.length > 0) {
        xp += XP_CHECKIN_COMPLETE;
      }
      // Streak bonus
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > 1) {
        xp += XP_STREAK_BONUS;
      }
      setTotalXp(prev => prev + xp);
      setXpGain(xp);
      setTimeout(() => setXpGain(null), 2500);
      // Confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setCompletedModules(prev => prev.filter(id => id !== moduleId));
      setTotalXp(prev => Math.max(0, prev - XP_MODULE_COMPLETE));
      setStreak(prev => Math.max(0, prev - 1));
    }
  }, [canComplete, isCompleted, moduleId, checkinComplete, module, streak]);

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
      <Confetti show={showConfetti} />

      {/* XP Gain popup */}
      <AnimatePresence>
        {xpGain !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[90] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3"
            style={{ backgroundColor: "rgba(237,28,36,0.95)", boxShadow: "0 8px 32px rgba(237,28,36,0.4)" }}
          >
            <Zap size={20} className="text-yellow-300" fill="currentColor" />
            <span className="text-white font-bold text-lg">+{xpGain} XP</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - responsive */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
          <Link href="/programme/preview">
            <ArrowLeft size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider truncate" style={{ color: "#ed1c24" }}>{module.title}</p>
            <h1 className="text-sm sm:text-lg text-white font-bold truncate" style={{ fontFamily: "var(--font-display)" }}>{module.subtitle.toUpperCase()}</h1>
          </div>
          {/* Status badge */}
          {isCompleted ? (
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "rgba(34,197,94,0.15)" }}>
              <CheckCircle2 size={12} style={{ color: "#22c55e" }} />
              <span className="text-[10px] sm:text-xs font-bold hidden sm:inline" style={{ color: "#22c55e" }}>Complété</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-amber-500/30 flex-shrink-0" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
              <Eye size={12} style={{ color: "#f59e0b" }} />
              <span className="text-[10px] sm:text-xs font-bold hidden sm:inline" style={{ color: "#f59e0b" }}>APERÇU</span>
            </div>
          )}
        </div>

        {/* Progress + Level bar */}
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 pb-2 sm:pb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak */}
            {streak > 0 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Flame size={14} style={{ color: "#f59e0b" }} />
                <span className="text-[10px] sm:text-xs font-bold" style={{ color: "#f59e0b" }}>{streak}</span>
              </div>
            )}
            {/* Progress bar */}
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: currentLevel.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
            {/* Level + count */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${currentLevel.color}20`, color: currentLevel.color }}>
                {currentLevel.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-white/40">
                {completedCount}/{totalModules}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* XP & Level card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl border border-white/[0.08]"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star size={16} style={{ color: currentLevel.color }} fill="currentColor" />
              <span className="text-sm font-bold text-white">{currentLevel.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-yellow-400" />
              <span className="text-sm font-bold text-yellow-400">{totalXp} XP</span>
            </div>
          </div>
          {nextLevel && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/30">Prochain niveau: {nextLevel.name}</span>
                <span className="text-[10px] text-white/30">{totalXp}/{nextLevel.xpRequired} XP</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: nextLevel.color }}
                  animate={{ width: `${Math.min(100, (totalXp / nextLevel.xpRequired) * 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
          {/* Streak display */}
          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame size={16} style={{ color: streak > 0 ? "#f59e0b" : "rgba(255,255,255,0.2)" }} />
              <span className="text-xs text-white/60">
                {streak > 0 ? `Streak de ${streak} module${streak > 1 ? "s" : ""} consécutif${streak > 1 ? "s" : ""}` : "Complète un module pour démarrer ta streak!"}
              </span>
            </div>
            {streak >= 3 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                +{XP_STREAK_BONUS} XP bonus
              </span>
            )}
          </div>
        </motion.div>

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
          <p className="text-xs text-white/40">— {module.quoteAuthor}</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8 space-y-3 sm:space-y-4"
        >
          {module.content.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)" }}>
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Video Player (Module with documents) */}
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
                  onClick={() => alert('Vidéo tutoriel à intégrer prochainement')}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
                  style={{ backgroundColor: "rgba(237,28,36,0.9)" }}
                >
                  <Play size={28} className="text-white ml-1" fill="white" />
                </button>
              </div>
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: "rgba(237,28,36,0.8)", color: "white" }}>Tutoriel</span>
              </div>
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4">
                <span className="text-[10px] sm:text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: "rgba(0,0,0,0.7)", color: "white" }}>12:34</span>
              </div>
            </div>
            <div className="px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">Comment utiliser tes outils</p>
                <p className="text-[10px] sm:text-xs text-white/40 mt-0.5">Tutoriel complet pour bien démarrer le programme</p>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 size={14} className="text-white/30" />
                <span className="text-xs text-white/30">FR</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Check-in section (INTERACTIVE - must complete before marking module done) */}
        {module.checkinHabits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border-2"
            style={{ 
              backgroundColor: checkinComplete ? "rgba(34,197,94,0.04)" : "rgba(237,28,36,0.04)",
              borderColor: checkinComplete ? "#22c55e" : "#ed1c24"
            }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider" style={{ color: checkinComplete ? "#22c55e" : "#ed1c24" }}>
                Check-in de la semaine {checkinComplete ? "✓" : "(obligatoire)"}
              </h3>
              {!checkinComplete && (
                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: "rgba(237,28,36,0.1)", color: "#ed1c24" }}>
                  <Lock size={10} /> Requis
                </span>
              )}
              {checkinComplete && (
                <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                  +{XP_CHECKIN_COMPLETE} XP
                </span>
              )}
            </div>
            <p className="text-[10px] sm:text-xs text-white/40 mb-4 sm:mb-5">
              {checkinComplete 
                ? "Excellent! Ton check-in est complété. Tu peux maintenant marquer ce module comme terminé."
                : "Note chaque habitude de 1 à 10 pour débloquer la complétion du module."
              }
            </p>
            <div className="space-y-3 sm:space-y-4">
              {module.checkinHabits.map(habit => (
                <div key={habit} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <span className="text-xs sm:text-sm text-white/70 flex-1">{habit}</span>
                  <select
                    value={moduleCheckinData[habit] || 0}
                    onChange={(e) => handleCheckinChange(habit, parseInt(e.target.value))}
                    className="px-3 py-2 rounded-lg text-sm font-bold text-white border transition-colors w-full sm:w-auto"
                    style={{ 
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderColor: moduleCheckinData[habit] ? "#22c55e" : "rgba(255,255,255,0.1)"
                    }}
                  >
                    <option value={0}>— Sélectionner —</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n}/10</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mark as complete button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <button
            onClick={handleMarkComplete}
            disabled={!canComplete && !isCompleted}
            className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 transition-all ${
              isCompleted
                ? "border-2"
                : canComplete
                  ? "hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                  : "opacity-50 cursor-not-allowed"
            }`}
            style={
              isCompleted
                ? { backgroundColor: "rgba(34,197,94,0.1)", borderColor: "#22c55e", color: "#22c55e" }
                : canComplete
                  ? { backgroundColor: "#ed1c24", color: "white" }
                  : { backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }
            }
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={18} />
                Module complété — Cliquer pour annuler
              </>
            ) : canComplete ? (
              <>
                <Check size={18} />
                Marquer comme terminé (+{XP_MODULE_COMPLETE} XP)
              </>
            ) : (
              <>
                <Lock size={18} />
                Complète ton check-in pour débloquer
              </>
            )}
          </button>

          {/* Progress summary */}
          <div className="mt-4 p-3 sm:p-4 rounded-lg flex items-center gap-3 sm:gap-4" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
              <Trophy size={18} style={{ color: "#ed1c24" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-white/40 mb-1">Progression globale</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex-1 h-2 sm:h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: progressPercent === 100 ? "#22c55e" : "#ed1c24" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white flex-shrink-0">{progressPercent}%</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-white/30 mt-1">
                {completedCount === totalModules
                  ? "Félicitations! Tu as complété tous les modules!"
                  : `${completedCount} module${completedCount > 1 ? "s" : ""} complété${completedCount > 1 ? "s" : ""} sur ${totalModules}`
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Badges earned */}
        {earnedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} style={{ color: "#f59e0b" }} />
              <span className="text-xs font-bold text-white">Badges débloqués ({earnedBadges.length}/{BADGES.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BADGES.map(badge => {
                const earned = earnedBadges.includes(badge);
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${earned ? "" : "opacity-30 grayscale"}`}
                    style={{ backgroundColor: earned ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.03)", border: earned ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(255,255,255,0.06)" }}
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    <span className={earned ? "text-white" : "text-white/40"}>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Documents / Downloads */}
        {module.documents && module.documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <FileText size={16} style={{ color: "#ed1c24" }} />
              <p className="text-xs sm:text-sm font-bold text-white">Documents à télécharger</p>
            </div>
            <div className="grid gap-2 sm:gap-3">
              {module.documents.map((doc, i) => (
                <button
                  key={i}
                  onClick={() => alert(`Téléchargement de "${doc.name}" (fictif — document à intégrer)`)}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-white/[0.06] hover:border-white/[0.15] transition-all group cursor-pointer text-left w-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-lg sm:text-xl" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                    {doc.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-white/90 truncate">{doc.name}</p>
                    <p className="text-[10px] sm:text-xs text-white/40 mt-0.5 truncate">{doc.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/[0.06] text-white/50">{doc.fileType}</span>
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
            transition={{ delay: 0.35 }}
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
            <p className="text-xs sm:text-sm text-white/50 mb-4">{module.habitObjective}</p>
          </motion.div>
        )}

        {/* Tips */}
        {module.tips && module.tips.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl border border-white/[0.08]"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Lightbulb size={16} style={{ color: "#f59e0b" }} />
              <p className="text-xs sm:text-sm font-bold text-white">Trucs & Astuces</p>
            </div>
            <div className="space-y-2 sm:space-y-2.5">
              {module.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-2.5">
                  <CheckCircle2 size={13} style={{ color: "#ed1c24" }} className="flex-shrink-0 mt-0.5" />
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
            transition={{ delay: 0.45 }}
            className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl border-2"
            style={{ backgroundColor: "rgba(237,28,36,0.08)", borderColor: "#ed1c24" }}
          >
            <div className="flex items-center gap-3">
              <Calendar size={20} style={{ color: "#ed1c24" }} />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">{module.appointmentType}</p>
                <p className="text-[10px] sm:text-xs text-white/50">Prends rendez-vous cette semaine! C'est inclus dans ton programme.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          {moduleId > 1 ? (
            <Link href={`/programme/preview/${moduleId - 1}`} className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors">
              ← Précédent
            </Link>
          ) : <span />}
          {moduleId < 14 ? (
            <Link href={`/programme/preview/${moduleId + 1}`} className="text-xs sm:text-sm hover:underline" style={{ color: "#ed1c24" }}>
              Suivant →
            </Link>
          ) : (
            <Link href="/programme/preview" className="text-xs sm:text-sm text-white/40 hover:text-white transition-colors">
              Retour à la liste →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
