import { motion } from "framer-motion";
import { Trophy, Zap, Flame, Star, ChevronRight, ArrowLeft, Eye } from "lucide-react";
import { PROGRAMME_MODULES, LEVELS, BADGES } from "@/data/programmeModules";
import { Link } from "wouter";

/**
 * Mode Preview/Démo du programme - accessible sans authentification
 * Permet de visualiser le contenu de tous les modules
 * URL: /programme/preview
 */
export default function ProgrammePreview() {
  const completedModules: number[] = [];
  const completedIds = new Set(completedModules);
  const currentLevel = LEVELS[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      {/* Header */}
      <header className="border-b border-white/[0.06] sticky top-0 z-50" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeft size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
            </Link>
            <div>
              <h1 className="text-lg text-white font-bold" style={{ fontFamily: "var(--font-display)" }}>ON R'START LA MACHINE</h1>
              <p className="text-xs text-white/40">Mode aperçu</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30" style={{ backgroundColor: "rgba(245,158,11,0.1)" }}>
              <Eye size={14} style={{ color: "#f59e0b" }} />
              <span className="text-xs font-bold" style={{ color: "#f59e0b" }}>APERÇU</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Demo banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl border border-amber-500/20"
          style={{ backgroundColor: "rgba(245,158,11,0.06)" }}
        >
          <div className="flex items-start gap-3">
            <Eye size={18} style={{ color: "#f59e0b" }} className="flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-white mb-1">Mode aperçu</p>
              <p className="text-xs text-white/50">
                Tu visualises le contenu du programme en mode lecture seule. Tous les modules sont accessibles. 
                Les check-ins et la progression ne sont pas sauvegardés.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modules grid */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">Les 14 modules</h3>
        <div className="grid gap-3">
          {PROGRAMME_MODULES.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link href={`/programme/preview/${module.id}`}>
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer hover:scale-[1.01]"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ backgroundColor: "rgba(237,28,36,0.12)" }}
                  >
                    {module.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ed1c24" }}>
                        {module.title}
                      </span>
                    </div>
                    <p className="text-sm text-white font-medium mt-0.5">{module.subtitle}</p>
                    <p className="text-xs text-white/35 mt-0.5 truncate">{module.description}</p>
                  </div>
                  <ChevronRight size={18} className="text-white/30 flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
