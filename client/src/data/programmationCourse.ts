/**
 * Données des programmations de course pour les 3 distances.
 * Chaque séance: [numéro, titre, contenu, zone, isOptionnelle]
 */

export type Seance = [string, string, string, string, boolean];

export interface SemainePlan {
  s: number;
  tag: string;
  seances: Seance[];
}

export interface ProgrammeConfig {
  distance: string;
  distanceLabel: string;
  totalWeeks: number;
  seancesParSemaine: number;
  storageKey: string;
  courseZoneLabel: string;
  plan: SemainePlan[];
  /** Calcul des allures spécifique à la distance */
  calculatePaces: (tMileSec: number) => PaceSet;
  /** Prédiction du temps de course */
  predictTime: (tMileSec: number) => { label: string; seconds: number };
}

export interface PaceSet {
  recup: number;
  ef: number;
  tempo: number;
  course: number;
  vma: number;
}

export const ZONE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ef: { bg: "rgba(59,130,246,0.12)", text: "#60A5FA", border: "rgba(59,130,246,0.3)" },
  vma: { bg: "rgba(237,28,36,0.08)", text: "#F87171", border: "rgba(237,28,36,0.3)" },
  tempo: { bg: "rgba(245,158,11,0.12)", text: "#FCD34D", border: "rgba(245,158,11,0.3)" },
  course: { bg: "rgba(16,185,129,0.12)", text: "#34D399", border: "rgba(16,185,129,0.3)" },
  recup: { bg: "rgba(107,114,128,0.15)", text: "#9CA3AF", border: "rgba(107,114,128,0.3)" },
};

export const ZONE_LABELS: Record<string, string> = {
  ef: "Endurance fondamentale",
  vma: "VMA / Intervalles",
  tempo: "Tempo / Seuil",
  course: "Allure course",
  recup: "Récupération",
};

export const ZONE_BAR_COLORS: Record<string, string> = {
  ef: "#3B82F6",
  vma: "#ED1C24",
  tempo: "#F59E0B",
  course: "#10B981",
  recup: "#6B7280",
};

// ─── DATE DE L'ÉVÉNEMENT ─────────────────────────────────────
export const EVENT_DATE = new Date("2026-09-19T23:59:59");

// ─── PROGRAMMATION 5 KM ─────────────────────────────────────
const plan5km: SemainePlan[] = [
  { s: 1, tag: "BLOC 1 — CONSTRUCTION", seances: [["Séance 1", "EF — Footing de base", "30 min en endurance fondamentale", "ef", false], ["Séance 2", "Intervalles", "Échauffement 10 min EF + 8 × 200 m en VMA, récup 200 m jog + 10 min retour au calme", "vma", false], ["Séance 3", "Sortie longue", "40 min EF", "ef", false]] },
  { s: 2, tag: "", seances: [["Séance 1", "EF — Footing", "35 min EF", "ef", false], ["Séance 2", "Intervalles", "10 min EF + 10 × 200 m VMA, récup 200 m jog + 10 min retour au calme", "vma", false], ["Séance 3", "Sortie longue", "45 min EF", "ef", false]] },
  { s: 3, tag: "", seances: [["Séance 1", "EF + Accélérations", "35 min EF + 4 lignes droites (accélérations 80 m)", "ef", false], ["Séance 2", "Intervalles 400 m", "10 min EF + 6 × 400 m VMA, récup 90 s + 10 min retour au calme", "vma", false], ["Séance 3", "Sortie longue", "50 min EF", "ef", false]] },
  { s: 4, tag: "SEMAINE ALLÉGÉE", seances: [["Séance 1", "Récupération active", "25 min en récupération", "recup", false], ["Séance 2", "Tempo léger", "10 min EF + 10 min tempo + 10 min EF", "tempo", false], ["Séance 3", "Sortie longue", "40 min EF", "ef", false]] },
  { s: 5, tag: "BLOC 2 — DÉVELOPPEMENT", seances: [["Séance 1", "EF — Footing", "40 min EF", "ef", false], ["Séance 2", "Intervalles 400 m", "10 min EF + 8 × 400 m VMA, récup 90 s + 10 min retour au calme", "vma", false], ["Séance 3", "Sortie longue", "55 min EF", "ef", false]] },
  { s: 6, tag: "", seances: [["Séance 1", "Tempo double", "10 min EF + 2 × 10 min tempo (récup 3 min) + 10 min EF", "tempo", false], ["Séance 2", "Intervalles 600 m", "10 min EF + 5 × 600 m VMA, récup 2 min + 10 min retour au calme", "vma", false], ["Séance 3", "Sortie longue", "60 min EF", "ef", false]] },
  { s: 7, tag: "BLOC 3 — SPÉCIFICITÉ", seances: [["Séance 1", "EF + Accélérations", "40 min EF + 4 lignes droites", "ef", false], ["Séance 2", "Allure course 1 000 m", "10 min EF + 4 × 1 000 m à allure 5 km, récup 2 min + 10 min retour au calme", "course", false], ["Séance 3", "Sortie longue", "60 min EF", "ef", false]] },
  { s: 8, tag: "SEMAINE ALLÉGÉE", seances: [["Séance 1", "Récupération active", "30 min récupération", "recup", false], ["Séance 2", "Allure course 1 000 m", "10 min EF + 3 × 1 000 m allure 5 km, récup 2 min + 10 min retour au calme", "course", false], ["Séance 3", "Sortie longue", "45 min EF", "ef", false]] },
  { s: 9, tag: "BLOC 4 — AFFÛTAGE", seances: [["Séance 1", "EF — Footing", "35 min EF", "ef", false], ["Séance 2", "Séance clé", "10 min EF + 2 × 2 000 m allure 5 km, récup 3 min + 1 × 1 000 m tempo + 10 min retour au calme", "course", false], ["Séance 3", "Sortie longue", "50 min EF", "ef", false]] },
  { s: 10, tag: "SEMAINE DE COURSE", seances: [["Séance 1", "Affûtage", "25 min EF + 4 × 200 m allure 5 km", "course", false], ["Séance 2", "Activation (J-2)", "20 min récupération + 3 lignes droites — 2 jours avant la course", "recup", false], ["Séance 3", "COURSE 5 KM 🏅", "Objectif : tenir l'allure course du début à la fin", "course", false]] },
];

// ─── PROGRAMMATION 10 KM ────────────────────────────────────
const plan10km: SemainePlan[] = [
  { s: 1, tag: "BLOC 1 — CONSTRUCTION", seances: [["Séance 1", "EF — Footing", "35 min EF", "ef", false], ["Séance 2", "Intervalles 300 m", "10 min EF + 8 × 300 m VMA, récup 200 m jog + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "30 min EF", "ef", true], ["Séance 4", "Sortie longue", "50 min EF", "ef", false]] },
  { s: 2, tag: "", seances: [["Séance 1", "EF — Footing", "40 min EF", "ef", false], ["Séance 2", "Intervalles 500 m", "10 min EF + 6 × 500 m VMA, récup 90 s + 10 min retour au calme", "vma", false], ["Séance 3", "EF + Accélérations", "30 min EF + 4 lignes droites", "ef", true], ["Séance 4", "Sortie longue", "55 min EF", "ef", false]] },
  { s: 3, tag: "", seances: [["Séance 1", "Tempo", "10 min EF + 15 min tempo + 10 min EF", "tempo", false], ["Séance 2", "Intervalles 500 m", "10 min EF + 8 × 500 m VMA, récup 90 s + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "35 min EF", "ef", true], ["Séance 4", "Sortie longue", "60 min EF", "ef", false]] },
  { s: 4, tag: "SEMAINE ALLÉGÉE", seances: [["Séance 1", "Récupération active", "30 min récupération", "recup", false], ["Séance 2", "Tempo léger", "10 min EF + 10 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF bonus", "30 min EF", "ef", true], ["Séance 4", "Sortie longue", "45 min EF", "ef", false]] },
  { s: 5, tag: "BLOC 2 — DÉVELOPPEMENT", seances: [["Séance 1", "Tempo double", "10 min EF + 2 × 12 min tempo (récup 3 min) + 10 min EF", "tempo", false], ["Séance 2", "Intervalles 800 m", "10 min EF + 6 × 800 m VMA, récup 2 min + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "35 min EF", "ef", true], ["Séance 4", "Sortie longue", "65 min EF", "ef", false]] },
  { s: 6, tag: "BLOC 3 — SPÉCIFICITÉ", seances: [["Séance 1", "Allure course 1 500 m", "10 min EF + 3 × 1 500 m allure 10 km, récup 2 min + 10 min retour au calme", "course", false], ["Séance 2", "Intervalles 1 000 m", "10 min EF + 5 × 1 000 m VMA, récup 2 min 30 + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "40 min EF", "ef", true], ["Séance 4", "Sortie longue", "70 min EF", "ef", false]] },
  { s: 7, tag: "", seances: [["Séance 1", "Allure course 2 500 m", "10 min EF + 2 × 2 500 m allure 10 km, récup 3 min + 10 min retour au calme", "course", false], ["Séance 2", "Tempo long", "10 min EF + 20 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF + Accélérations", "40 min EF + 4 lignes droites", "ef", true], ["Séance 4", "Sortie longue", "75 min EF", "ef", false]] },
  { s: 8, tag: "SEMAINE ALLÉGÉE", seances: [["Séance 1", "Récupération active", "30 min récupération", "recup", false], ["Séance 2", "Allure course 1 000 m", "10 min EF + 3 × 1 000 m allure 10 km, récup 2 min + 10 min retour au calme", "course", false], ["Séance 3", "EF bonus", "30 min EF", "ef", true], ["Séance 4", "Sortie longue", "55 min EF", "ef", false]] },
  { s: 9, tag: "BLOC 4 — AFFÛTAGE", seances: [["Séance 1", "Séance clé — 5 km continu", "10 min EF + 5 000 m allure 10 km en continu + 10 min retour au calme", "course", false], ["Séance 2", "Intervalles 800 m", "10 min EF + 4 × 800 m VMA, récup 2 min + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "35 min EF", "ef", true], ["Séance 4", "Sortie longue", "60 min EF", "ef", false]] },
  { s: 10, tag: "SEMAINE DE COURSE", seances: [["Séance 1", "Affûtage", "30 min EF + 4 × 300 m allure 10 km", "course", false], ["Séance 2", "EF courte", "25 min EF", "ef", true], ["Séance 3", "Activation (J-2)", "20 min récupération + 3 lignes droites — 2 jours avant la course", "recup", false], ["Séance 4", "COURSE 10 KM 🏅", "Départ contrôlé, allure course stable, finish fort", "course", false]] },
];

// ─── PROGRAMMATION DEMI-MARATHON (21.1 KM) ──────────────────
const plan21km: SemainePlan[] = [
  { s: 1, tag: "BLOC 1 — CONSTRUCTION", seances: [["Séance 1", "EF — Footing", "40 min EF", "ef", false], ["Séance 2", "Tempo", "10 min EF + 15 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF bonus", "35 min EF", "ef", true], ["Séance 4", "Sortie longue", "70 min EF", "ef", false]] },
  { s: 2, tag: "", seances: [["Séance 1", "EF — Footing", "45 min EF", "ef", false], ["Séance 2", "Intervalles 600 m", "10 min EF + 6 × 600 m VMA, récup 90 s + 10 min retour au calme", "vma", false], ["Séance 3", "EF + Accélérations", "35 min EF + 4 lignes droites", "ef", true], ["Séance 4", "Sortie longue", "80 min EF", "ef", false]] },
  { s: 3, tag: "", seances: [["Séance 1", "Allure course 3 × 10 min", "10 min EF + 3 × 10 min allure demi (récup 2 min) + 10 min retour au calme", "course", false], ["Séance 2", "Tempo long", "10 min EF + 20 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF bonus", "40 min EF", "ef", true], ["Séance 4", "Sortie longue", "90 min EF", "ef", false]] },
  { s: 4, tag: "SEMAINE ALLÉGÉE", seances: [["Séance 1", "Récupération active", "35 min récupération", "recup", false], ["Séance 2", "Tempo léger", "10 min EF + 12 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF bonus", "35 min EF", "ef", true], ["Séance 4", "Sortie longue", "60 min EF", "ef", false]] },
  { s: 5, tag: "BLOC 2 — DÉVELOPPEMENT", seances: [["Séance 1", "Allure course 2 × 15 min", "10 min EF + 2 × 15 min allure demi (récup 3 min) + 10 min retour au calme", "course", false], ["Séance 2", "Intervalles 800 m", "10 min EF + 6 × 800 m VMA, récup 2 min + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "45 min EF", "ef", true], ["Séance 4", "Sortie longue", "100 min EF, derniers 15 min à allure demi", "ef", false]] },
  { s: 6, tag: "BLOC 3 — SPÉCIFICITÉ", seances: [["Séance 1", "Tempo double", "10 min EF + 2 × 15 min tempo (récup 3 min) + 10 min EF", "tempo", false], ["Séance 2", "Intervalles 1 000 m", "10 min EF + 5 × 1 000 m VMA, récup 2 min 30 + 10 min retour au calme", "vma", false], ["Séance 3", "EF bonus", "45 min EF", "ef", true], ["Séance 4", "Sortie longue", "110 min EF", "ef", false]] },
  { s: 7, tag: "", seances: [["Séance 1", "Allure course 8 km continu", "10 min EF + 8 km en continu à allure demi + 10 min retour au calme", "course", false], ["Séance 2", "Tempo long", "10 min EF + 25 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF + Accélérations", "40 min EF + 4 lignes droites", "ef", true], ["Séance 4", "Sortie longue", "120 min EF, derniers 20 min à allure demi (pic de volume)", "ef", false]] },
  { s: 8, tag: "SEMAINE ALLÉGÉE", seances: [["Séance 1", "Récupération active", "35 min récupération", "recup", false], ["Séance 2", "Allure course 2 × 10 min", "10 min EF + 2 × 10 min allure demi (récup 2 min) + 10 min retour au calme", "course", false], ["Séance 3", "EF bonus", "35 min EF", "ef", true], ["Séance 4", "Sortie longue", "75 min EF", "ef", false]] },
  { s: 9, tag: "BLOC 4 — AFFÛTAGE", seances: [["Séance 1", "Séance clé — 10 km continu", "10 min EF + 10 km en continu à allure demi + 10 min retour au calme", "course", false], ["Séance 2", "Tempo", "10 min EF + 15 min tempo + 10 min EF", "tempo", false], ["Séance 3", "EF bonus", "40 min EF", "ef", true], ["Séance 4", "Sortie longue", "80 min EF", "ef", false]] },
  { s: 10, tag: "SEMAINE DE COURSE", seances: [["Séance 1", "Affûtage", "35 min EF + 3 × 5 min allure demi", "course", false], ["Séance 2", "EF courte", "30 min EF", "ef", true], ["Séance 3", "Activation (J-2)", "20 min récupération + 3 lignes droites — 2 jours avant la course", "recup", false], ["Séance 4", "DEMI-MARATHON 🏅", "Négative split : 1re moitié légèrement sous contrôle, 2e moitié à l'allure course", "course", false]] },
];

// ─── CONFIGURATIONS PAR DISTANCE ─────────────────────────────
export const PROGRAMMES: Record<string, ProgrammeConfig> = {
  "5km": {
    distance: "5km",
    distanceLabel: "5 KM",
    totalWeeks: 10,
    seancesParSemaine: 3,
    storageKey: "clubadm-allures-5km",
    courseZoneLabel: "Allure Course 5 km",
    plan: plan5km,
    calculatePaces: (tMileSec: number): PaceSet => {
      const t5k = tMileSec * Math.pow(5 / 1.60934, 1.06);
      const p5k = t5k / 5;
      return { course: p5k, vma: p5k * 0.94, tempo: p5k * 1.06, ef: p5k * 1.25, recup: p5k * 1.38 };
    },
    predictTime: (tMileSec: number) => {
      const t5k = tMileSec * Math.pow(5 / 1.60934, 1.06);
      return { label: "Temps 5 km prédit selon ton test", seconds: t5k };
    },
  },
  "10km": {
    distance: "10km",
    distanceLabel: "10 KM",
    totalWeeks: 10,
    seancesParSemaine: 4,
    storageKey: "clubadm-allures-10km",
    courseZoneLabel: "Allure Course 10 km",
    plan: plan10km,
    calculatePaces: (tMileSec: number): PaceSet => {
      const t5k = tMileSec * Math.pow(5 / 1.60934, 1.06);
      const p5k = t5k / 5;
      const t10k = tMileSec * Math.pow(10 / 1.60934, 1.06);
      const p10k = t10k / 10;
      return { course: p10k, vma: p5k * 0.94, tempo: p10k * 1.05, ef: p10k * 1.22, recup: p10k * 1.35 };
    },
    predictTime: (tMileSec: number) => {
      const t10k = tMileSec * Math.pow(10 / 1.60934, 1.06);
      return { label: "Temps 10 km prédit selon ton test", seconds: t10k };
    },
  },
  "21km": {
    distance: "21km",
    distanceLabel: "DEMI-MARATHON",
    totalWeeks: 10,
    seancesParSemaine: 4,
    storageKey: "clubadm-allures-21km",
    courseZoneLabel: "Allure Course Demi-Marathon",
    plan: plan21km,
    calculatePaces: (tMileSec: number): PaceSet => {
      const t5k = tMileSec * Math.pow(5 / 1.60934, 1.06);
      const p5k = t5k / 5;
      const t10k = tMileSec * Math.pow(10 / 1.60934, 1.06);
      const tDemi = tMileSec * Math.pow(21.0975 / 1.60934, 1.06);
      const pDemi = tDemi / 21.0975;
      return { course: pDemi, tempo: t10k / 10, vma: p5k * 0.94, ef: pDemi * 1.18, recup: pDemi * 1.30 };
    },
    predictTime: (tMileSec: number) => {
      const tDemi = tMileSec * Math.pow(21.0975 / 1.60934, 1.06);
      return { label: "Temps demi-marathon prédit selon ton test", seconds: tDemi };
    },
  },
};

// ─── HELPERS ─────────────────────────────────────────────────
export function formatPace(seconds: number): string {
  const s = Math.round(seconds);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0") + " /km";
}

export function formatTime(seconds: number): string {
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (h ? h + " h " : "") + m + " min " + String(sec).padStart(2, "0") + " s";
}

/**
 * Calcule le nombre de semaines restantes entre aujourd'hui et la date de l'événement.
 */
export function getWeeksUntilEvent(): number {
  const now = new Date();
  const diffMs = EVENT_DATE.getTime() - now.getTime();
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return Math.max(0, diffWeeks);
}

/**
 * Retourne les semaines adaptées selon le nombre de semaines disponibles.
 * On prend toujours les X dernières semaines du plan (pour garder l'affûtage et la course).
 * Si weeksAvailable >= totalWeeks, on retourne tout.
 */
export function getAdaptedPlan(config: ProgrammeConfig, weeksAvailable: number): SemainePlan[] {
  if (weeksAvailable >= config.totalWeeks) {
    return config.plan;
  }
  if (weeksAvailable <= 0) {
    return [config.plan[config.plan.length - 1]]; // au minimum la semaine de course
  }
  // Prendre les X dernières semaines
  const startIndex = config.totalWeeks - weeksAvailable;
  return config.plan.slice(startIndex);
}
