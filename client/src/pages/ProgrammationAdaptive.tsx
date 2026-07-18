import { useState, useEffect, useCallback } from "react";
import {
  ProgrammeConfig,
  PaceSet,
  SemainePlan,
  ZONE_COLORS,
  ZONE_LABELS,
  ZONE_BAR_COLORS,
  formatPace,
  formatTime,
  getWeeksUntilEvent,
  getAdaptedPlan,
} from "@/data/programmationCourse";

interface Props {
  config: ProgrammeConfig;
}

interface SavedData {
  min: string;
  sec: string;
  paces: PaceSet;
  weeksSnapshot: number;
  timestamp: number;
}

export default function ProgrammationAdaptive({ config }: Props) {
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [paces, setPaces] = useState<PaceSet | null>(null);
  const [prediction, setPrediction] = useState<string>("");
  const [weeksAvailable, setWeeksAvailable] = useState<number>(config.totalWeeks);
  const [adaptedPlan, setAdaptedPlan] = useState<SemainePlan[]>(config.plan);
  const [saved, setSaved] = useState(false);
  const [showSaveNotice, setShowSaveNotice] = useState(false);

  // Restaurer depuis localStorage au chargement
  useEffect(() => {
    const storageKey = config.storageKey;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const data: SavedData = JSON.parse(raw);
        setMin(data.min);
        setSec(data.sec);
        if (data.paces) {
          setPaces(data.paces);
          const tMile = parseInt(data.min) * 60 + parseInt(data.sec);
          const pred = config.predictTime(tMile);
          setPrediction(pred.label + " : " + formatTime(pred.seconds));
        }
        // Utiliser le snapshot de semaines figé lors de la première visite
        if (data.weeksSnapshot !== undefined) {
          setWeeksAvailable(data.weeksSnapshot);
          setAdaptedPlan(getAdaptedPlan(config, data.weeksSnapshot));
        }
        setSaved(true);
      } catch (e) {
        // Données corrompues, on ignore
      }
    } else {
      // Première visite: calculer et figer le nombre de semaines
      const weeks = getWeeksUntilEvent();
      const cappedWeeks = Math.min(weeks, config.totalWeeks);
      setWeeksAvailable(cappedWeeks);
      setAdaptedPlan(getAdaptedPlan(config, cappedWeeks));
    }
  }, [config]);

  // Sauvegarde automatique avant de quitter la page
  const saveToStorage = useCallback(() => {
    if (!paces) return;
    const data: SavedData = {
      min,
      sec,
      paces,
      weeksSnapshot: weeksAvailable,
      timestamp: Date.now(),
    };
    localStorage.setItem(config.storageKey, JSON.stringify(data));
  }, [min, sec, paces, weeksAvailable, config.storageKey]);

  useEffect(() => {
    const handleBeforeUnload = () => saveToStorage();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [saveToStorage]);

  // Calculer les allures
  const calculer = () => {
    const m = parseInt(min) || 0;
    const s = parseInt(sec) || 0;
    const tMile = m * 60 + s;
    if (tMile < 240) {
      alert("Entre un temps de 1 mile valide (minimum 4 minutes).");
      return;
    }
    const newPaces = config.calculatePaces(tMile);
    setPaces(newPaces);
    const pred = config.predictTime(tMile);
    setPrediction(pred.label + " : " + formatTime(pred.seconds));
  };

  // Sauvegarder manuellement
  const sauvegarder = () => {
    if (!paces) return;
    const data: SavedData = {
      min,
      sec,
      paces,
      weeksSnapshot: weeksAvailable,
      timestamp: Date.now(),
    };
    localStorage.setItem(config.storageKey, JSON.stringify(data));
    setSaved(true);
    setShowSaveNotice(true);
    setTimeout(() => setShowSaveNotice(false), 4000);
  };

  // Télécharger (imprimer)
  const telecharger = () => window.print();

  // Obtenir l'allure pour une zone
  const getPace = (zone: string): string => {
    if (!paces) return "—";
    return formatPace(paces[zone as keyof PaceSet] || 0);
  };

  const paceZones = [
    { key: "recup", label: "Récupération", usage: "Footings très faciles, retours au calme" },
    { key: "ef", label: "Endurance Fondamentale (EF)", usage: "Base aérobie — la majorité du volume" },
    { key: "tempo", label: "Tempo / Seuil", usage: "Effort soutenu mais contrôlé, « confortablement difficile »" },
    { key: "course", label: config.courseZoneLabel, usage: "Allure objectif le jour J" },
    { key: "vma", label: "VMA / Intervalles", usage: "Fractions courtes et rapides" },
  ];

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0a0e27", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-white/10">
        <img src="/manus-storage/club-adm-logo_a1b2c3d4.png" alt="Club ADM" className="h-10 sm:h-14" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        <div className="text-right">
          <div className="text-[10px] sm:text-xs uppercase tracking-[3px] text-white/50">Programme d'entraînement</div>
          <div className="text-2xl sm:text-4xl font-black tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {config.distanceLabel} —<br />{adaptedPlan.length} SEMAINES
          </div>
          <div className="text-xs text-white/40 mt-1">Brossard · Chambly · clubadm.com</div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        {/* Philosophie */}
        <section className="mb-12">
          <div className="text-xs uppercase tracking-[3px] text-red-500 mb-2">Avant de commencer</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>LA PHILOSOPHIE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", text: <><strong>{config.seancesParSemaine} séances de course par semaine.</strong> La séance optionnelle est un bonus — pas une obligation.</> },
              { n: "02", text: <><strong>Tes entraînements au gym comptent.</strong> Force, mobilité et conditionnement sont le complément direct de la course — pas une concurrence.</> },
              { n: "03", text: <><strong>On ne vire pas fou.</strong> Si une semaine est imparfaite, ce n'est pas grave. La constance sur {adaptedPlan.length} semaines bat la perfection sur 2.</> },
              { n: "04", text: <><strong>Les deux se complètent.</strong> Aucun entraînement de course ne devrait remplacer ton gym — ils se nourrissent mutuellement.</> },
            ].map((item) => (
              <div key={item.n} className="border border-white/10 rounded-lg p-4 sm:p-5">
                <div className="text-2xl font-black text-red-500 mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{item.n}</div>
                <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Étape 1: Test de départ */}
        <section className="mb-12">
          <div className="text-xs uppercase tracking-[3px] text-white/40 mb-2">Étape 1</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>TON TEST DE DÉPART</h2>
          <div className="border border-red-500/30 rounded-xl p-5 sm:p-8 bg-red-500/5">
            <p className="text-sm text-white/70 mb-6">
              Entre ton temps sur un test de <strong>1 mile (1,61 km)</strong>, effort maximal. Tes allures personnalisées seront calculées automatiquement et appliquées à l'ensemble de ton plan.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-sm font-semibold text-white/70">Temps :</span>
              <input
                type="number"
                placeholder="mm"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="w-16 sm:w-20 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-center text-white placeholder-white/30 focus:outline-none focus:border-red-500"
              />
              <span className="text-white/40">min</span>
              <input
                type="number"
                placeholder="ss"
                value={sec}
                onChange={(e) => setSec(e.target.value)}
                className="w-16 sm:w-20 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-center text-white placeholder-white/30 focus:outline-none focus:border-red-500"
              />
              <span className="text-white/40">sec</span>
              <button
                onClick={calculer}
                className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all text-sm sm:text-base"
              >
                ⚡ CALCULER MES ALLURES
              </button>
            </div>
            {prediction && (
              <div className="mt-4 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white/80">
                {prediction}
              </div>
            )}
            {paces && (
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={sauvegarder}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  Sauvegarder mes allures
                </button>
                <button
                  onClick={telecharger}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Télécharger mon plan (PDF)
                </button>
              </div>
            )}
            {showSaveNotice && (
              <div className="mt-3 text-sm text-green-400 animate-pulse">
                ✓ Tes allures ont été sauvegardées ! Elles seront automatiquement rechargées la prochaine fois que tu visiteras cette page.
              </div>
            )}
          </div>
        </section>

        {/* Étape 2: Allures */}
        <section className="mb-12">
          <div className="text-xs uppercase tracking-[3px] text-white/40 mb-2">Étape 2</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>TES ALLURES</h2>
          <div className="border border-white/10 rounded-xl p-5 sm:p-8 space-y-3">
            {paceZones.map((zone) => (
              <div key={zone.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-4 border border-white/5 rounded-lg hover:border-white/20 transition-all">
                <div>
                  <div className="font-semibold text-sm">{zone.label}</div>
                  <div className="text-xs text-white/50">{zone.usage}</div>
                </div>
                <div
                  className="text-xl sm:text-2xl font-black px-4 py-1 rounded"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: "1px",
                    backgroundColor: paces ? ZONE_COLORS[zone.key]?.bg : "transparent",
                    color: paces ? ZONE_COLORS[zone.key]?.text : "rgba(255,255,255,0.3)",
                  }}
                >
                  {getPace(zone.key)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Le Plan */}
        <section>
          <div className="text-xs uppercase tracking-[3px] text-white/40 mb-2">Le plan</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            LE PLAN — {adaptedPlan.length} SEMAINES
          </h2>
          <p className="text-sm text-white/50 mb-8">
            {config.seancesParSemaine === 3
              ? "3 séances obligatoires par semaine."
              : `3 séances obligatoires par semaine. Les séances optionnelles s'ajoutent seulement si tu en as l'envie et l'énergie — sinon, ton entraînement au gym remplit déjà ce rôle.`}
          </p>

          <div className="space-y-8">
            {adaptedPlan.map((week, weekIdx) => (
              <div key={weekIdx}>
                {/* Week header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: week.tag?.includes("ALLÉGÉE") || week.tag?.includes("COURSE") ? "#232862" : "#ED1C24",
                      color: "white",
                    }}
                  >
                    SEMAINE {weekIdx + 1}
                  </div>
                  {week.tag && <span className="text-xs text-white/40 uppercase tracking-wider">{week.tag}</span>}
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Sessions grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {week.seances.map((seance, sIdx) => {
                    const [num, titre, contenu, zone, isOpt] = seance;
                    const barColor = ZONE_BAR_COLORS[zone] || "#6B7280";
                    const zoneColor = ZONE_COLORS[zone];
                    return (
                      <div
                        key={sIdx}
                        className={`relative border rounded-lg p-4 transition-all ${isOpt ? "border-white/5 opacity-70" : "border-white/10"}`}
                        style={{ borderLeftWidth: "3px", borderLeftColor: barColor }}
                      >
                        <div className="text-xs font-bold text-white/60 uppercase mb-1">
                          {num}
                          {isOpt && <span className="ml-2 text-[10px] opacity-60 tracking-wider">OPTIONNELLE</span>}
                        </div>
                        <div className="font-semibold text-sm mb-1">{titre}</div>
                        <div className="text-xs text-white/50 mb-3 leading-relaxed">{contenu}</div>
                        <div
                          className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: zoneColor?.bg || "transparent",
                            color: zoneColor?.text || "white",
                            border: `1px solid ${zoneColor?.border || "transparent"}`,
                          }}
                        >
                          <span>{ZONE_LABELS[zone] || zone}</span>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "13px", letterSpacing: "1px" }}>
                            {getPace(zone)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">Club ADM Fitness — Brossard · Chambly · clubadm.com</p>
          <p className="text-xs text-white/20 mt-1">Programme adapté à {adaptedPlan.length} semaines avant l'événement du 19 septembre</p>
        </footer>
      </div>

      {/* Print styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700&display=swap');
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          body { background: #ffffff !important; color: #1a1a1a !important; font-family: 'Barlow', sans-serif !important; font-size: 11pt !important; line-height: 1.5 !important; }
          .min-h-screen { min-height: auto !important; background: #ffffff !important; color: #1a1a1a !important; }
          header { background: #ffffff !important; border-bottom: 2px solid #ED1C24 !important; padding: 12pt 20pt !important; }
          header * { color: #1a1a1a !important; }
          header .text-white\/50, header .text-white\/40 { color: #666666 !important; }
          .no-print, button, input { display: none !important; }
          section { page-break-inside: avoid; margin-bottom: 16pt !important; }
          .max-w-4xl { max-width: 100% !important; padding: 16pt 20pt !important; }
          
          /* Philosophie cards */
          .border.border-white\/10.rounded-lg { border: 1px solid #ddd !important; background: #f9f9f9 !important; padding: 10pt !important; }
          .border.border-white\/10.rounded-lg .text-red-500 { color: #ED1C24 !important; }
          .border.border-white\/10.rounded-lg p { color: #333333 !important; }
          
          /* Section titles */
          .text-red-500 { color: #ED1C24 !important; }
          h2 { color: #1a1a1a !important; font-family: 'Bebas Neue', sans-serif !important; font-size: 18pt !important; margin-bottom: 8pt !important; }
          .text-xs.uppercase.tracking-\[3px\] { color: #ED1C24 !important; font-size: 8pt !important; }
          
          /* Allures table */
          .border.border-white\/10.rounded-xl { border: 1px solid #ddd !important; background: #ffffff !important; padding: 12pt !important; }
          .border.border-white\/10.rounded-xl .font-semibold { color: #1a1a1a !important; }
          .border.border-white\/10.rounded-xl .text-xs.text-white\/50 { color: #666666 !important; }
          .border.border-white\/5 { border-color: #eee !important; }
          .hover\:border-white\/20 { border-color: #ddd !important; }
          
          /* Week headers */
          .px-3.py-1.rounded { padding: 3pt 8pt !important; border-radius: 3pt !important; }
          .text-xs.text-white\/40.uppercase { color: #666666 !important; }
          .flex-1.h-px { background: #ddd !important; height: 1px !important; }
          
          /* Session cards */
          .relative.border.rounded-lg { border: 1px solid #ddd !important; background: #ffffff !important; padding: 8pt !important; page-break-inside: avoid; margin-bottom: 6pt !important; }
          .relative.border.rounded-lg .text-xs.font-bold { color: #333333 !important; }
          .relative.border.rounded-lg .font-semibold.text-sm { color: #1a1a1a !important; font-weight: 600 !important; }
          .relative.border.rounded-lg .text-xs.text-white\/50 { color: #555555 !important; }
          .relative.border.rounded-lg .opacity-70 { opacity: 0.8 !important; }
          
          /* Zone badges - keep colored */
          .inline-flex.items-center.gap-2 { border-radius: 3pt !important; padding: 2pt 6pt !important; }
          
          /* Footer */
          footer { border-top: 1px solid #ddd !important; margin-top: 16pt !important; padding-top: 8pt !important; }
          footer p { color: #999999 !important; }
          
          /* Grid layout for print */
          .grid { display: grid !important; }
          .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-3 { grid-template-columns: repeat(3, 1fr) !important; gap: 8pt !important; }
          .grid-cols-1.sm\:grid-cols-2.lg\:grid-cols-4 { grid-template-columns: repeat(4, 1fr) !important; gap: 8pt !important; }
          
          /* Test section - show results but hide inputs */
          .border.border-red-500\/30 { border: 1px solid #ED1C24 !important; background: #fff5f5 !important; padding: 10pt !important; }
          .border.border-red-500\/30 p { color: #333333 !important; }
          .border.border-red-500\/30 .bg-white\/5 { background: #f0f0f0 !important; border-color: #ddd !important; color: #1a1a1a !important; }
          
          /* Prediction box */
          .mt-4.px-4.py-3.bg-white\/5 { background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #333333 !important; }
          
          /* Space between weeks */
          .space-y-8 > * + * { margin-top: 12pt !important; }
          
          /* Page margins */
          @page { margin: 15mm 12mm; size: A4; }
        }
      `}</style>
    </div>
  );
}
