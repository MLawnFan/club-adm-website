export type ProgrammeRatio = {
  label: string;
  value: number;
  color: string;
};

export type ProgrammeProfile = {
  ratios: ProgrammeRatio[];
  summary?: string;
  note: string;
};

// Repères existants de la page Programmes, partagés avec le carrousel d’accueil.
// Les axes indépendants ne représentent pas une répartition du temps total.
export const PROGRAMME_PROFILES: Record<string, ProgrammeProfile> = {
  groupe: {
    ratios: [
      { label: "Force", value: 70, color: "#ed1c24" },
      { label: "Endurance", value: 60, color: "#f97316" },
      { label: "Technique", value: 65, color: "#eab308" },
      { label: "Cardio", value: 55, color: "#22c55e" },
    ],
    note: "Axes de travail indépendants. La répartition varie selon la périodisation.",
  },
  "semi-prive": {
    ratios: [
      { label: "Personnalisation", value: 95, color: "#ed1c24" },
      { label: "Force", value: 75, color: "#f97316" },
      { label: "Endurance", value: 50, color: "#eab308" },
      { label: "Suivi individuel", value: 90, color: "#22c55e" },
    ],
    note: "Axes de travail indépendants. Le programme est adapté à tes objectifs.",
  },
  hyrox: {
    ratios: [
      { label: "Endurance", value: 75, color: "#ed1c24" },
      { label: "Musculation", value: 25, color: "#f97316" },
      { label: "Cardio", value: 85, color: "#eab308" },
      { label: "Mental", value: 80, color: "#22c55e" },
    ],
    summary: "75 % endurance · 25 % musculation",
    note: "Les axes cardio et mental sont des repères indépendants de cette répartition.",
  },
  hybrid: {
    ratios: [
      { label: "Musculation", value: 60, color: "#ed1c24" },
      { label: "Endurance", value: 40, color: "#f97316" },
      { label: "Force", value: 70, color: "#eab308" },
      { label: "Composition corporelle", value: 75, color: "#22c55e" },
    ],
    summary: "60 % musculation · 40 % endurance",
    note: "Les axes force et composition corporelle sont des repères indépendants de cette répartition.",
  },
  rstart: {
    ratios: [
      { label: "Habitudes de vie", value: 90, color: "#ed1c24" },
      { label: "Nutrition", value: 80, color: "#f97316" },
      { label: "Entraînement", value: 65, color: "#eab308" },
      { label: "Communauté", value: 85, color: "#22c55e" },
    ],
    note: "Axes d’accompagnement indépendants, pas une répartition du temps total.",
  },
  nutrition: {
    ratios: [
      { label: "Nutrition", value: 95, color: "#ed1c24" },
      { label: "Habitudes de vie", value: 85, color: "#f97316" },
      { label: "Suivi personnalisé", value: 90, color: "#eab308" },
      { label: "Éducation", value: 80, color: "#22c55e" },
    ],
    note: "Axes d’accompagnement indépendants, pas une répartition du temps total.",
  },
  "en-ligne": {
    ratios: [],
    summary: "Musculation et endurance : selon le programme choisi",
    note: "Le ratio dépend de tes objectifs. On t’aide à choisir pendant la consultation.",
  },
};
