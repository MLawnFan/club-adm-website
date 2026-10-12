import { z } from "zod";

export const memberProductSchema = z.enum(["rstart", "starter"]);
export type MemberProduct = z.infer<typeof memberProductSchema>;
export const MEMBER_PRODUCTS = {
  rstart: {
    name: "On R’start la Machine",
    duration: "12 semaines",
    destination: "/programme",
  },
  starter: {
    name: "Le Starter Pack ADM",
    duration: "4 semaines",
    destination: "/espace-membre/starter-pack",
  },
} as const;

const text = z.string().max(2000).default("");
export const memberAnswersSchema = z.object({
  preferredName: z.string().max(100).default(""),
  consent: z.boolean().default(false),
  ageRange: text,
  exactAge: text,
  equationSex: text,
  objective: text,
  dailyGoal: text,
  weight: text,
  weightUnit: z.enum(["lbs", "kg"]).default("lbs"),
  height: text,
  heightUnit: z.enum(["cm", "in"]).default("cm"),
  activity: text,
  activityDetails: text,
  schedule: text,
  mealRhythm: text,
  restrictions: text,
  foodPreferences: text,
  budgetEquipment: text,
  household: text,
  habitLevel: text,
  habitReason: text,
  firstAction: text,
  pastExperience: text,
  eatingRelationship: text,
  healthSituation: text,
  healthDetails: text,
  extraInfo: text,
  environment: text,
  experience: text,
  trainingDays: text,
  trainingObjective: text,
  limitations: z.array(z.string().max(50)).max(8).default([]),
  limitationsAnswered: z.boolean().default(false),
  reviewed: z.boolean().default(false),
});
export type MemberAnswers = z.infer<typeof memberAnswersSchema>;
export const emptyMemberAnswers = (): MemberAnswers =>
  memberAnswersSchema.parse({});

export const HABIT_LEVELS = [
  {
    value: "1",
    name: "Fondation",
    description: "Une action de base répétable, même dans une semaine occupée.",
  },
  {
    value: "2",
    name: "Initiation",
    description:
      "Des repères simples à un repas, selon ma faim et mon énergie.",
  },
  {
    value: "3",
    name: "Progression",
    description:
      "Quelques repas interchangeables, une épicerie et un plan de secours.",
  },
  {
    value: "4",
    name: "Consolidation",
    description:
      "Des routines qui s’adaptent aux sorties, aux déplacements et à mon horaire.",
  },
  {
    value: "5",
    name: "Maîtrise",
    description:
      "Des choix flexibles et autonomes, sans rigidité ni recherche de perfection.",
  },
];

export const ONBOARDING_STEPS = [
  "Ton profil",
  "Sécurité et contexte",
  "Ton quotidien",
  "Tes habitudes",
  "Ton entraînement",
  "Vérification",
];
export const REQUIRED_BY_STEP: (keyof MemberAnswers)[][] = [
  [
    "preferredName",
    "consent",
    "ageRange",
    "equationSex",
    "objective",
    "dailyGoal",
    "weight",
    "height",
    "activity",
    "activityDetails",
  ],
  ["eatingRelationship", "healthSituation", "restrictions"],
  ["schedule", "mealRhythm", "foodPreferences", "budgetEquipment", "household"],
  ["habitLevel", "habitReason", "firstAction", "pastExperience"],
  [
    "environment",
    "experience",
    "trainingDays",
    "trainingObjective",
    "limitationsAnswered",
  ],
  ["reviewed"],
];
export function missingForStep(answers: MemberAnswers, step: number) {
  return (REQUIRED_BY_STEP[step] || []).filter(key => {
    const value = answers[key];
    return typeof value === "boolean"
      ? !value
      : typeof value === "string"
        ? !value.trim()
        : false;
  });
}
export function triageMember(
  answers: MemberAnswers
): "needs_review" | "referred" {
  return answers.eatingRelationship !== "non" ||
    answers.healthSituation !== "non" ||
    answers.ageRange === "moins-18"
    ? "referred"
    : "needs_review";
}
export function completedStepCount(answers: MemberAnswers) {
  return REQUIRED_BY_STEP.filter(
    (_, i) => missingForStep(answers, i).length === 0
  ).length;
}
export function numericProfileIssue(answers: MemberAnswers): string | null {
  if (
    answers.exactAge &&
    (!Number.isFinite(Number(answers.exactAge)) ||
      Number(answers.exactAge) < 1 ||
      Number(answers.exactAge) > 120)
  )
    return "Vérifie ton âge exact (1 à 120 ans), ou laisse ce champ vide.";
  if (
    answers.weight !== "non-partage" &&
    answers.weight &&
    (!Number.isFinite(Number(answers.weight)) ||
      Number(answers.weight) <= 0 ||
      Number(answers.weight) > (answers.weightUnit === "kg" ? 450 : 1000))
  )
    return "Vérifie le poids et l’unité, ou choisis de ne pas le partager.";
  if (
    answers.height !== "non-partage" &&
    answers.height &&
    (!Number.isFinite(Number(answers.height)) ||
      Number(answers.height) < (answers.heightUnit === "cm" ? 80 : 31) ||
      Number(answers.height) > (answers.heightUnit === "cm" ? 250 : 99))
  )
    return "Vérifie la taille et l’unité, ou choisis de ne pas la partager.";
  return null;
}

// Aperçu uniquement : aucune situation clinique réelle ni dossier privé dans le navigateur.
export function demoMemberAnswers(): MemberAnswers {
  return memberAnswersSchema.parse({
    preferredName: "Membre démo",
    consent: true,
    ageRange: "36-45",
    exactAge: "40",
    equationSex: "Femme",
    objective: "SG",
    dailyGoal: "Avoir une routine simple et plus d’énergie.",
    weight: "165",
    weightUnit: "lbs",
    height: "168",
    heightUnit: "cm",
    activity: "Actif",
    activityDetails:
      "Marche quotidienne et trois entraînements de 45 minutes à intensité modérée.",
    schedule: "Horaire de jour, parfois chargé.",
    mealRhythm: "3 repas et une collation selon ma faim.",
    restrictions: "Aucune restriction dans cet exemple fictif.",
    foodPreferences:
      "J’aime les repas simples; aucune exclusion dans cet exemple.",
    budgetEquipment:
      "Budget modéré, cuisine équipée, 30 minutes pour préparer.",
    household: "Une personne dans cet exemple.",
    habitLevel: "2",
    habitReason: "Des bases, mais un horaire irrégulier.",
    firstAction: "Préparer un lunch simple deux fois cette semaine.",
    pastExperience: "Plan trop compliqué auparavant.",
    eatingRelationship: "non",
    healthSituation: "non",
    environment: "gym",
    experience: "debutant",
    trainingDays: "3",
    trainingObjective: "fonctionnel",
    limitationsAnswered: true,
  });
}
