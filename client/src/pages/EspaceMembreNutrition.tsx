import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Apple, Check, Printer, RotateCcw, ShoppingCart, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ─────────────────────────────────────────────────────
interface NutritionProfile {
  sexe: string;
  ageRange: string;
  poids: number;
  tailleFeet: number;
  tailleInches: number;
  objectif: string;
  activite: string;
  niveauHabitudes: number;
}

interface PortionEquivalent {
  aliment: string;
  quantiteGrammes: number;
  unite: string;
}

interface NutritionPlan {
  imc: number;
  imcCategory: string;
  caloriesEstimees: number;
  proteinesGrammes: number;
  glucidesGrammes: number;
  lipidesGrammes: number;
  proteines: { paumes: number; grammes: number; equivalents: PortionEquivalent[] };
  legumes: { poings: number; grammes: number; equivalents: PortionEquivalent[] };
  glucides: { poings: number; grammes: number; equivalents: PortionEquivalent[] };
  lipides: { pouces: number; grammes: number; equivalents: PortionEquivalent[] };
  repas: MealPlan[];
  epicerie: GroceryCategory[];
  niveauDepart: number;
  progression: ProgressionLevel[];
}

interface MealPlan {
  nom: string;
  description: string;
  portions: string;
}

interface GroceryCategory {
  categorie: string;
  items: string[];
}

interface ProgressionLevel {
  niveau: number;
  titre: string;
  habitudes: string[];
  acquis: boolean;
  current: boolean;
}

// ─── Données de calcul ─────────────────────────────────────────
const OBJECTIFS: Record<string, { label: string; description: string }> = {
  PP: { label: "Transformation durable", description: "Perdre du poids de manière soutenable et maintenir les résultats" },
  PM: { label: "Prise de masse", description: "Gagner du muscle et de la force progressivement" },
  SG: { label: "Santé générale", description: "Améliorer ton bien-être global et ton énergie" },
  PE: { label: "Performance", description: "Optimiser tes performances sportives" },
  ED: { label: "Éducation", description: "Apprendre les bases d'une alimentation équilibrée" },
};

const ACTIVITES = [
  { value: "Sédentaire", label: "Sédentaire", description: "Bureau, peu de mouvement" },
  { value: "Légèrement actif", label: "Légèrement actif", description: "Marche quotidienne, 1-2 entraînements/sem" },
  { value: "Actif", label: "Actif", description: "3-5 entraînements/semaine" },
  { value: "Très actif", label: "Très actif", description: "6+ entraînements/semaine, travail physique" },
];

const NIVEAUX_HABITUDES = [
  { niveau: 1, titre: "Fondation", description: "Je pars de zéro — pas de structure de repas régulière" },
  { niveau: 2, titre: "Initiation", description: "J'ai des bases, mais sans structure précise" },
  { niveau: 3, titre: "Progression", description: "Je suis structuré, mais je manque de précision" },
  { niveau: 4, titre: "Consolidation", description: "Je suis précis, mais je manque de constance" },
  { niveau: 5, titre: "Maîtrise", description: "Je suis constant, je veux optimiser" },
];

// ─── Fonctions de calcul ───────────────────────────────────────
function calculateIMC(poidsLbs: number, tailleFeet: number, tailleInches: number): { imc: number; category: string } {
  const poidsKg = poidsLbs * 0.453592;
  const tailleCm = (tailleFeet * 12 + tailleInches) * 2.54;
  const tailleM = tailleCm / 100;
  const imc = poidsKg / (tailleM * tailleM);

  let category = "Normal";
  if (imc < 18.5) category = "Insuffisance pondérale";
  else if (imc < 25) category = "Normal";
  else if (imc < 30) category = "Surpoids";
  else category = "Obésité";

  return { imc: Math.round(imc * 10) / 10, category };
}

function calculateCalories(profile: NutritionProfile, imc: number): number {
  const poidsKg = profile.poids * 0.453592;
  const tailleCm = (profile.tailleFeet * 12 + profile.tailleInches) * 2.54;
  const age = parseInt(profile.ageRange.split("-")[0]) + 5; // milieu de la tranche

  // Harris-Benedict révisé
  let bmr: number;
  if (profile.sexe === "Homme") {
    bmr = 88.362 + 13.397 * poidsKg + 4.799 * tailleCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * poidsKg + 3.098 * tailleCm - 4.330 * age;
  }

  // Facteur d'activité
  const facteurs: Record<string, number> = {
    "Sédentaire": 1.2,
    "Légèrement actif": 1.375,
    "Actif": 1.55,
    "Très actif": 1.725,
  };
  const tdee = bmr * (facteurs[profile.activite] || 1.375);

  // Ajustement selon objectif
  switch (profile.objectif) {
    case "PP": return Math.round(tdee * 0.80); // déficit 20%
    case "PM": return Math.round(tdee * 1.15); // surplus 15%
    default: return Math.round(tdee);
  }
}

// ─── Équivalents en grammes par portion ──────────────────────
const EQUIVALENTS_PROTEINES: PortionEquivalent[] = [
  { aliment: "Poitrine de poulet", quantiteGrammes: 120, unite: "g" },
  { aliment: "Poisson blanc (tilapia, sole)", quantiteGrammes: 140, unite: "g" },
  { aliment: "Saumon", quantiteGrammes: 120, unite: "g" },
  { aliment: "Boeuf maigre (90%+)", quantiteGrammes: 110, unite: "g" },
  { aliment: "Oeufs entiers", quantiteGrammes: 150, unite: "g (3 oeufs)" },
  { aliment: "Yogourt grec 0%", quantiteGrammes: 200, unite: "g (¾ tasse)" },
  { aliment: "Tofu ferme", quantiteGrammes: 150, unite: "g" },
  { aliment: "Crevettes", quantiteGrammes: 140, unite: "g" },
  { aliment: "Dinde hachée", quantiteGrammes: 120, unite: "g" },
  { aliment: "Cottage cheese 1%", quantiteGrammes: 200, unite: "g (¾ tasse)" },
];

const EQUIVALENTS_LEGUMES: PortionEquivalent[] = [
  { aliment: "Brocoli", quantiteGrammes: 150, unite: "g (1 tasse)" },
  { aliment: "Épinards crus", quantiteGrammes: 60, unite: "g (2 tasses)" },
  { aliment: "Poivrons", quantiteGrammes: 150, unite: "g (1 moyen)" },
  { aliment: "Courgettes", quantiteGrammes: 180, unite: "g (1 moyenne)" },
  { aliment: "Carottes", quantiteGrammes: 130, unite: "g (2 moyennes)" },
  { aliment: "Chou-fleur", quantiteGrammes: 150, unite: "g (1 tasse)" },
  { aliment: "Tomates", quantiteGrammes: 180, unite: "g (1 grosse)" },
  { aliment: "Concombre", quantiteGrammes: 200, unite: "g (½ concombre)" },
  { aliment: "Haricots verts", quantiteGrammes: 150, unite: "g (1 tasse)" },
  { aliment: "Champignons", quantiteGrammes: 150, unite: "g (1 tasse)" },
];

const EQUIVALENTS_GLUCIDES: PortionEquivalent[] = [
  { aliment: "Riz cuit (basmati/jasmin)", quantiteGrammes: 150, unite: "g (¾ tasse)" },
  { aliment: "Patate douce", quantiteGrammes: 150, unite: "g (1 moyenne)" },
  { aliment: "Avoine sèche", quantiteGrammes: 45, unite: "g (½ tasse)" },
  { aliment: "Quinoa cuit", quantiteGrammes: 130, unite: "g (¾ tasse)" },
  { aliment: "Pain complet", quantiteGrammes: 60, unite: "g (2 tranches)" },
  { aliment: "Pâtes cuites", quantiteGrammes: 150, unite: "g (¾ tasse)" },
  { aliment: "Banane", quantiteGrammes: 120, unite: "g (1 moyenne)" },
  { aliment: "Pomme de terre", quantiteGrammes: 150, unite: "g (1 moyenne)" },
  { aliment: "Fruits de saison", quantiteGrammes: 150, unite: "g (1 tasse)" },
  { aliment: "Tortilla blé entier", quantiteGrammes: 60, unite: "g (1 grande)" },
];

const EQUIVALENTS_LIPIDES: PortionEquivalent[] = [
  { aliment: "Avocat", quantiteGrammes: 30, unite: "g (⅙ avocat)" },
  { aliment: "Huile d'olive", quantiteGrammes: 7, unite: "g (1 c. à thé)" },
  { aliment: "Noix mélangées", quantiteGrammes: 10, unite: "g (6-8 noix)" },
  { aliment: "Beurre d'arachide naturel", quantiteGrammes: 10, unite: "g (1 c. à thé)" },
  { aliment: "Graines de chia", quantiteGrammes: 8, unite: "g (1 c. à thé)" },
  { aliment: "Fromage", quantiteGrammes: 15, unite: "g (1 tranche mince)" },
  { aliment: "Graines de lin moulues", quantiteGrammes: 8, unite: "g (1 c. à thé)" },
  { aliment: "Olives", quantiteGrammes: 15, unite: "g (3-4 olives)" },
  { aliment: "Beurre d'amande", quantiteGrammes: 10, unite: "g (1 c. à thé)" },
  { aliment: "Huile de coco", quantiteGrammes: 7, unite: "g (1 c. à thé)" },
];

function calculatePortions(profile: NutritionProfile, calories: number) {
  const isFemme = profile.sexe === "Femme";
  const palmeCalories = isFemme ? 120 : 160;
  const poingLegCalories = 25;
  const poingGlucCalories = isFemme ? 100 : 130;
  const pouceCalories = 45;

  // Répartition macro: 30% prot, 35% glucides, 25% lipides, 10% légumes
  const calProt = calories * 0.30;
  const calGluc = calories * 0.35;
  const calLip = calories * 0.25;
  const calLeg = calories * 0.10;

  const palmesProteines = Math.round(calProt / palmeCalories);
  const poingsLegumes = Math.max(3, Math.round(calLeg / poingLegCalories));
  const poingsGlucides = Math.round(calGluc / poingGlucCalories);
  const poucesLipides = Math.round(calLip / pouceCalories);

  // Calcul en grammes de macros
  const proteinesGrammes = Math.round(calProt / 4);
  const glucidesGrammes = Math.round(calGluc / 4);
  const lipidesGrammes = Math.round(calLip / 9);

  // Grammes par portion
  const grammesParPalme = isFemme ? 100 : 130;
  const grammesParPoingLeg = 150;
  const grammesParPoingGluc = isFemme ? 120 : 150;
  const grammesParPouce = 10;

  return {
    proteines: {
      paumes: palmesProteines,
      grammes: palmesProteines * grammesParPalme,
      equivalents: EQUIVALENTS_PROTEINES,
    },
    legumes: {
      poings: poingsLegumes,
      grammes: poingsLegumes * grammesParPoingLeg,
      equivalents: EQUIVALENTS_LEGUMES,
    },
    glucides: {
      poings: poingsGlucides,
      grammes: poingsGlucides * grammesParPoingGluc,
      equivalents: EQUIVALENTS_GLUCIDES,
    },
    lipides: {
      pouces: poucesLipides,
      grammes: poucesLipides * grammesParPouce,
      equivalents: EQUIVALENTS_LIPIDES,
    },
    proteinesGrammes,
    glucidesGrammes,
    lipidesGrammes,
  };
}

function generatePlan(profile: NutritionProfile): NutritionPlan {
  const { imc, category } = calculateIMC(profile.poids, profile.tailleFeet, profile.tailleInches);
  const calories = calculateCalories(profile, imc);
  const portions = calculatePortions(profile, calories);

  const isFemme = profile.sexe === "Femme";
  const gProtParPalme = isFemme ? 100 : 130;
  const gGlucParPoing = isFemme ? 120 : 150;
  const gLipParPouce = 10;
  const gLegParPoing = 150;

  const protParRepas = Math.ceil(portions.proteines.paumes / 3);
  const glucParRepas = Math.ceil(portions.glucides.poings / 3);
  const lipParRepas = Math.ceil(portions.lipides.pouces / 3);
  const legParRepas = Math.ceil(portions.legumes.poings / 3);

  const repas: MealPlan[] = [
    {
      nom: "Déjeuner",
      description: "Premier repas de la journée — énergie et protéines",
      portions: `${protParRepas} paume(s) protéines (~${protParRepas * gProtParPalme}g) + ${glucParRepas} poing(s) glucides (~${glucParRepas * gGlucParPoing}g) + ${lipParRepas} pouce(s) lipides (~${lipParRepas * gLipParPouce}g)`,
    },
    {
      nom: "Dîner",
      description: "Repas du midi — équilibre complet",
      portions: `${protParRepas} paume(s) protéines (~${protParRepas * gProtParPalme}g) + ${legParRepas} poing(s) légumes (~${legParRepas * gLegParPoing}g) + ${glucParRepas} poing(s) glucides (~${glucParRepas * gGlucParPoing}g) + ${lipParRepas} pouce(s) lipides (~${lipParRepas * gLipParPouce}g)`,
    },
    {
      nom: "Souper",
      description: "Repas du soir — récupération",
      portions: `${protParRepas} paume(s) protéines (~${protParRepas * gProtParPalme}g) + ${Math.ceil(portions.legumes.poings / 2)} poing(s) légumes (~${Math.ceil(portions.legumes.poings / 2) * gLegParPoing}g) + ${Math.ceil(portions.glucides.poings / 4)} poing(s) glucides (~${Math.ceil(portions.glucides.poings / 4) * gGlucParPoing}g) + ${lipParRepas} pouce(s) lipides (~${lipParRepas * gLipParPouce}g)`,
    },
    {
      nom: "Collation (si nécessaire)",
      description: "Entre les repas — selon ta faim",
      portions: `1 paume protéines (~${gProtParPalme}g) + 1 poing fruits ou glucides (~${gGlucParPoing}g)`,
    },
  ];

  const epicerie: GroceryCategory[] = [
    { categorie: "Protéines", items: ["Poitrines de poulet", "Saumon/poisson blanc", "Oeufs", "Yogourt grec nature", "Tofu ferme", "Boeuf haché maigre"] },
    { categorie: "Légumes", items: ["Brocoli", "Épinards", "Poivrons colorés", "Courgettes", "Tomates", "Concombres", "Carottes"] },
    { categorie: "Glucides", items: ["Riz basmati/jasmin", "Patates douces", "Avoine", "Pain complet", "Quinoa", "Fruits de saison"] },
    { categorie: "Bons gras", items: ["Avocat", "Huile d'olive extra-vierge", "Noix mélangées", "Beurre d'arachide naturel", "Graines de chia/lin"] },
    { categorie: "Essentiels", items: ["Épices variées", "Sauce soya réduite en sodium", "Vinaigre balsamique", "Moutarde de Dijon", "Bouillon faible en sodium"] },
  ];

  const progression: ProgressionLevel[] = [
    { niveau: 1, titre: "Fondation", habitudes: ["Manger 3 repas par jour", "Boire 6-8 verres d'eau", "Inclure une protéine à chaque repas"], acquis: profile.niveauHabitudes > 1, current: profile.niveauHabitudes === 1 },
    { niveau: 2, titre: "Initiation", habitudes: ["Ajouter des légumes à 2 repas/jour", "Planifier ses repas la veille", "Préparer son lunch"], acquis: profile.niveauHabitudes > 2, current: profile.niveauHabitudes === 2 },
    { niveau: 3, titre: "Progression", habitudes: ["Respecter les portions recommandées", "Intégrer les bons gras", "Collation protéinée post-entraînement"], acquis: profile.niveauHabitudes > 3, current: profile.niveauHabitudes === 3 },
    { niveau: 4, titre: "Consolidation", habitudes: ["Meal prep hebdomadaire", "Varier les sources de protéines", "Ajuster selon les résultats"], acquis: profile.niveauHabitudes > 4, current: profile.niveauHabitudes === 4 },
    { niveau: 5, titre: "Maîtrise", habitudes: ["Adhérence 90%+", "Périodisation nutritionnelle", "Autonomie complète"], acquis: false, current: profile.niveauHabitudes === 5 },
  ];

  return {
    imc,
    imcCategory: category,
    caloriesEstimees: calories,
    proteinesGrammes: portions.proteinesGrammes,
    glucidesGrammes: portions.glucidesGrammes,
    lipidesGrammes: portions.lipidesGrammes,
    proteines: portions.proteines,
    legumes: portions.legumes,
    glucides: portions.glucides,
    lipides: portions.lipides,
    repas,
    epicerie,
    niveauDepart: profile.niveauHabitudes,
    progression,
  };
}

// ─── Liste d'épicerie hebdomadaire automatique ──────────────────
interface WeeklyGroceryItem {
  aliment: string;
  quantiteParPortion: number;
  unite: string;
  portionsParJour: number;
  totalSemaine: number;
  categorie: 'proteines' | 'legumes' | 'glucides' | 'lipides';
}

function generateWeeklyGroceryList(plan: NutritionPlan): WeeklyGroceryItem[] {
  const items: WeeklyGroceryItem[] = [];

  // Protéines: répartir les portions sur les top 5 aliments variés
  const protTopPicks = plan.proteines.equivalents.slice(0, 6);
  const protPortionsPerItem = plan.proteines.paumes / protTopPicks.length;
  protTopPicks.forEach((eq) => {
    items.push({
      aliment: eq.aliment,
      quantiteParPortion: eq.quantiteGrammes,
      unite: 'g',
      portionsParJour: Math.round(protPortionsPerItem * 10) / 10,
      totalSemaine: Math.round(protPortionsPerItem * eq.quantiteGrammes * 7),
      categorie: 'proteines',
    });
  });

  // Légumes: répartir sur les top 6 légumes
  const legTopPicks = plan.legumes.equivalents.slice(0, 6);
  const legPortionsPerItem = plan.legumes.poings / legTopPicks.length;
  legTopPicks.forEach((eq) => {
    items.push({
      aliment: eq.aliment,
      quantiteParPortion: eq.quantiteGrammes,
      unite: 'g',
      portionsParJour: Math.round(legPortionsPerItem * 10) / 10,
      totalSemaine: Math.round(legPortionsPerItem * eq.quantiteGrammes * 7),
      categorie: 'legumes',
    });
  });

  // Glucides: répartir sur les top 5 sources
  const glucTopPicks = plan.glucides.equivalents.slice(0, 5);
  const glucPortionsPerItem = plan.glucides.poings / glucTopPicks.length;
  glucTopPicks.forEach((eq) => {
    items.push({
      aliment: eq.aliment,
      quantiteParPortion: eq.quantiteGrammes,
      unite: 'g',
      portionsParJour: Math.round(glucPortionsPerItem * 10) / 10,
      totalSemaine: Math.round(glucPortionsPerItem * eq.quantiteGrammes * 7),
      categorie: 'glucides',
    });
  });

  // Lipides: répartir sur les top 5 sources
  const lipTopPicks = plan.lipides.equivalents.slice(0, 5);
  const lipPortionsPerItem = plan.lipides.pouces / lipTopPicks.length;
  lipTopPicks.forEach((eq) => {
    items.push({
      aliment: eq.aliment,
      quantiteParPortion: eq.quantiteGrammes,
      unite: 'g',
      portionsParJour: Math.round(lipPortionsPerItem * 10) / 10,
      totalSemaine: Math.round(lipPortionsPerItem * eq.quantiteGrammes * 7),
      categorie: 'lipides',
    });
  });

  return items;
}

function formatGrams(g: number): string {
  if (g >= 1000) return `${(g / 1000).toFixed(1)} kg`;
  return `${g}g`;
}

// ─── Composant WeeklyGrocerySection ────────────────────────────
interface SelectedFoods {
  proteines: string[];
  legumes: string[];
  glucides: string[];
  lipides: string[];
}

function WeeklyGrocerySection({ plan }: { plan: NutritionPlan }) {
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [selectedFoods, setSelectedFoods] = useState<SelectedFoods>(() => {
    const saved = localStorage.getItem('starterpack-grocery-selections');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    // Par défaut: sélectionner les 4 premiers de chaque catégorie
    return {
      proteines: plan.proteines.equivalents.slice(0, 4).map(e => e.aliment),
      legumes: plan.legumes.equivalents.slice(0, 5).map(e => e.aliment),
      glucides: plan.glucides.equivalents.slice(0, 4).map(e => e.aliment),
      lipides: plan.lipides.equivalents.slice(0, 4).map(e => e.aliment),
    };
  });

  // Persister les choix
  useEffect(() => {
    localStorage.setItem('starterpack-grocery-selections', JSON.stringify(selectedFoods));
  }, [selectedFoods]);

  const toggleFood = (categorie: keyof SelectedFoods, aliment: string) => {
    setSelectedFoods(prev => {
      const current = prev[categorie];
      const updated = current.includes(aliment)
        ? current.filter(a => a !== aliment)
        : [...current, aliment];
      return { ...prev, [categorie]: updated };
    });
  };

  // Calculer la liste d'épicerie basée sur les aliments sélectionnés
  const computedGrocery = useMemo(() => {
    const result: { categorie: string; aliment: string; totalSemaine: number; color: string }[] = [];

    // Protéines
    const selProt = plan.proteines.equivalents.filter(e => selectedFoods.proteines.includes(e.aliment));
    if (selProt.length > 0) {
      const portionsPerItem = plan.proteines.paumes / selProt.length;
      selProt.forEach(eq => {
        result.push({ categorie: 'proteines', aliment: eq.aliment, totalSemaine: Math.round(portionsPerItem * eq.quantiteGrammes * 7), color: 'green' });
      });
    }

    // Légumes
    const selLeg = plan.legumes.equivalents.filter(e => selectedFoods.legumes.includes(e.aliment));
    if (selLeg.length > 0) {
      const portionsPerItem = plan.legumes.poings / selLeg.length;
      selLeg.forEach(eq => {
        result.push({ categorie: 'legumes', aliment: eq.aliment, totalSemaine: Math.round(portionsPerItem * eq.quantiteGrammes * 7), color: 'emerald' });
      });
    }

    // Glucides
    const selGluc = plan.glucides.equivalents.filter(e => selectedFoods.glucides.includes(e.aliment));
    if (selGluc.length > 0) {
      const portionsPerItem = plan.glucides.poings / selGluc.length;
      selGluc.forEach(eq => {
        result.push({ categorie: 'glucides', aliment: eq.aliment, totalSemaine: Math.round(portionsPerItem * eq.quantiteGrammes * 7), color: 'amber' });
      });
    }

    // Lipides
    const selLip = plan.lipides.equivalents.filter(e => selectedFoods.lipides.includes(e.aliment));
    if (selLip.length > 0) {
      const portionsPerItem = plan.lipides.pouces / selLip.length;
      selLip.forEach(eq => {
        result.push({ categorie: 'lipides', aliment: eq.aliment, totalSemaine: Math.round(portionsPerItem * eq.quantiteGrammes * 7), color: 'purple' });
      });
    }

    return result;
  }, [plan, selectedFoods]);

  const categories = [
    { key: 'proteines' as const, label: 'Protéines', color: 'green', equivalents: plan.proteines.equivalents },
    { key: 'legumes' as const, label: 'Légumes', color: 'emerald', equivalents: plan.legumes.equivalents },
    { key: 'glucides' as const, label: 'Glucides', color: 'amber', equivalents: plan.glucides.equivalents },
    { key: 'lipides' as const, label: 'Bons gras', color: 'purple', equivalents: plan.lipides.equivalents },
  ];

  const colorClasses: Record<string, { bg: string; border: string; text: string; selected: string }> = {
    green: { bg: 'bg-green-500/5', border: 'border-green-500/20', text: 'text-green-400', selected: 'bg-green-500/20 border-green-500/50' },
    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-400', selected: 'bg-emerald-500/20 border-emerald-500/50' },
    amber: { bg: 'bg-amber-500/5', border: 'border-amber-500/20', text: 'text-amber-400', selected: 'bg-amber-500/20 border-amber-500/50' },
    purple: { bg: 'bg-purple-500/5', border: 'border-purple-500/20', text: 'text-purple-400', selected: 'bg-purple-500/20 border-purple-500/50' },
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground">Épicerie hebdomadaire</h2>
            <p className="text-sm text-muted-foreground">Sélectionne tes aliments préférés pour générer ta liste</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
          <button
            onClick={() => setNbPersonnes(Math.max(1, nbPersonnes - 1))}
            className="w-7 h-7 rounded-md bg-background flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Minus className="w-3 h-3 text-foreground" />
          </button>
          <span className="text-sm font-bold text-foreground min-w-[3ch] text-center">{nbPersonnes}</span>
          <button
            onClick={() => setNbPersonnes(Math.min(6, nbPersonnes + 1))}
            className="w-7 h-7 rounded-md bg-background flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-3 h-3 text-foreground" />
          </button>
          <span className="text-xs text-muted-foreground ml-1">pers.</span>
        </div>
      </div>

      {/* Sélection des aliments */}
      <div className="space-y-4 mb-6">
        {categories.map(({ key, label, color, equivalents }) => {
          const cls = colorClasses[color];
          const selected = selectedFoods[key];
          return (
            <div key={key} className={`${cls.bg} border ${cls.border} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-semibold ${cls.text} text-sm uppercase`}>{label}</h3>
                <span className="text-xs text-muted-foreground">{selected.length} sélectionné(s)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {equivalents.map((eq) => {
                  const isSelected = selected.includes(eq.aliment);
                  return (
                    <button
                      key={eq.aliment}
                      onClick={() => toggleFood(key, eq.aliment)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        isSelected
                          ? `${cls.selected} ${cls.text}`
                          : 'bg-background/30 border-border/50 text-muted-foreground hover:border-border'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                      {eq.aliment}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Liste d'épicerie calculée */}
      <div className="border-t border-border pt-6">
        <h3 className="font-display text-lg text-foreground mb-4">Ta liste de la semaine</h3>
        <div className="space-y-3">
          {(['proteines', 'legumes', 'glucides', 'lipides'] as const).map((cat) => {
            const items = computedGrocery.filter(g => g.categorie === cat);
            if (items.length === 0) return null;
            const cls = colorClasses[items[0].color];
            const catLabel = categories.find(c => c.key === cat)?.label || cat;
            return (
              <div key={cat} className={`${cls.bg} border ${cls.border} rounded-xl p-4`}>
                <h4 className={`font-semibold ${cls.text} mb-2 text-sm uppercase`}>{catLabel}</h4>
                <div className="space-y-1.5">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Check className={`w-3 h-3 ${cls.text} flex-shrink-0`} />
                        <span className="text-sm text-foreground">{item.aliment}</span>
                      </div>
                      <span className={`text-sm font-bold ${cls.text}`}>
                        {formatGrams(item.totalSemaine * nbPersonnes)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-border/50 flex justify-between">
                  <span className="text-xs text-muted-foreground">Total</span>
                  <span className={`text-xs font-bold ${cls.text}`}>
                    {formatGrams(items.reduce((sum, item) => sum + item.totalSemaine * nbPersonnes, 0))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Essentiels à toujours avoir */}
      <div className="mt-4 bg-secondary/30 border border-border rounded-xl p-4">
        <h3 className="font-semibold text-foreground mb-3 text-sm">ESSENTIELS À TOUJOURS AVOIR</h3>
        <div className="grid grid-cols-2 gap-2">
          {['Épices variées', 'Sauce soya réduite en sodium', 'Vinaigre balsamique', 'Moutarde de Dijon', 'Bouillon faible en sodium', 'Sel & poivre'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreNutrition() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<NutritionProfile>>({});
  const [plan, setPlan] = useState<NutritionPlan | null>(null);
  const [generating, setGenerating] = useState(false);

  // Restaurer un plan existant
  useEffect(() => {
    const saved = localStorage.getItem("starterpack-nutrition");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPlan(data.plan);
        setProfile(data.profile);
        setStep(99); // Show results
      } catch {}
    }
  }, []);

  const questions = [
    // Step 0: Sexe
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quel est ton sexe biologique ?</h2>
        <p className="text-muted-foreground">Cela influence le calcul de tes besoins caloriques.</p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {["Homme", "Femme"].map((s) => (
            <button
              key={s}
              onClick={() => { setProfile({ ...profile, sexe: s }); setStep(1); }}
              className={`p-6 rounded-xl border-2 transition-all text-center ${
                profile.sexe === s
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              <span className="text-4xl block mb-2">{s === "Homme" ? "♂" : "♀"}</span>
              <span className="font-semibold text-lg">{s}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 1: Âge
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quelle est ta tranche d'âge ?</h2>
        <p className="text-muted-foreground">Ton métabolisme évolue avec l'âge.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          {["18-25", "26-35", "36-45", "46-55", "56-65", "65+"].map((age) => (
            <button
              key={age}
              onClick={() => { setProfile({ ...profile, ageRange: age }); setStep(2); }}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                profile.ageRange === age
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              <span className="font-semibold">{age} ans</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 2: Poids
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quel est ton poids actuel ?</h2>
        <p className="text-muted-foreground">En livres (lbs). Cela sert au calcul de tes portions.</p>
        <div className="mt-8 max-w-xs">
          <div className="relative">
            <input
              type="number"
              value={profile.poids || ""}
              onChange={(e) => setProfile({ ...profile, poids: parseInt(e.target.value) || 0 })}
              placeholder="Ex: 165"
              className="w-full p-4 pr-16 rounded-xl border-2 border-border bg-card text-foreground text-2xl font-semibold focus:border-primary focus:outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">lbs</span>
          </div>
          <Button
            onClick={() => setStep(3)}
            disabled={!profile.poids || profile.poids < 80}
            className="mt-6 w-full"
            size="lg"
          >
            Continuer <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    ),
    // Step 3: Taille
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quelle est ta taille ?</h2>
        <p className="text-muted-foreground">En pieds et pouces.</p>
        <div className="mt-8 flex gap-4 max-w-xs">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-1 block">Pieds</label>
            <input
              type="number"
              value={profile.tailleFeet || ""}
              onChange={(e) => setProfile({ ...profile, tailleFeet: parseInt(e.target.value) || 0 })}
              placeholder="5"
              className="w-full p-4 rounded-xl border-2 border-border bg-card text-foreground text-2xl font-semibold focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-1 block">Pouces</label>
            <input
              type="number"
              value={profile.tailleInches ?? ""}
              onChange={(e) => setProfile({ ...profile, tailleInches: parseInt(e.target.value) || 0 })}
              placeholder="8"
              className="w-full p-4 rounded-xl border-2 border-border bg-card text-foreground text-2xl font-semibold focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <Button
          onClick={() => setStep(4)}
          disabled={!profile.tailleFeet || profile.tailleFeet < 4}
          className="mt-6"
          size="lg"
        >
          Continuer <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    ),
    // Step 4: Objectif
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quel est ton objectif principal ?</h2>
        <p className="text-muted-foreground">On adapte ton plan en fonction de ce que tu vises.</p>
        <div className="space-y-3 mt-8">
          {Object.entries(OBJECTIFS).map(([code, { label, description }]) => (
            <button
              key={code}
              onClick={() => { setProfile({ ...profile, objectif: code }); setStep(5); }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                profile.objectif === code
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="font-semibold text-foreground block">{label}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 5: Activité
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quel est ton niveau d'activité ?</h2>
        <p className="text-muted-foreground">Inclut l'entraînement ET le quotidien.</p>
        <div className="space-y-3 mt-8">
          {ACTIVITES.map((a) => (
            <button
              key={a.value}
              onClick={() => { setProfile({ ...profile, activite: a.value }); setStep(6); }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                profile.activite === a.value
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="font-semibold text-foreground block">{a.label}</span>
              <span className="text-sm text-muted-foreground">{a.description}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 6: Niveau d'habitudes
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Où en es-tu avec tes habitudes alimentaires ?</h2>
        <p className="text-muted-foreground">On commence ta progression au bon endroit.</p>
        <div className="space-y-3 mt-8">
          {NIVEAUX_HABITUDES.map((n) => (
            <button
              key={n.niveau}
              onClick={() => {
                setProfile({ ...profile, niveauHabitudes: n.niveau });
                handleGenerate({ ...profile, niveauHabitudes: n.niveau } as NutritionProfile);
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                profile.niveauHabitudes === n.niveau
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {n.niveau}
                </span>
                <div>
                  <span className="font-semibold text-foreground block">{n.titre}</span>
                  <span className="text-sm text-muted-foreground">{n.description}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    ),
  ];

  const handleGenerate = (finalProfile: NutritionProfile) => {
    setGenerating(true);
    // Simulate generation delay for UX
    setTimeout(() => {
      const generatedPlan = generatePlan(finalProfile);
      setPlan(generatedPlan);
      setGenerating(false);
      setStep(99);
      // Save to localStorage
      localStorage.setItem("starterpack-nutrition", JSON.stringify({ plan: generatedPlan, profile: finalProfile }));
      // Update global progress
      const progress = JSON.parse(localStorage.getItem("starterpack-progress") || "{}");
      progress.nutrition = true;
      localStorage.setItem("starterpack-progress", JSON.stringify(progress));
    }, 2000);
  };

  const handleReset = () => {
    localStorage.removeItem("starterpack-nutrition");
    const progress = JSON.parse(localStorage.getItem("starterpack-progress") || "{}");
    progress.nutrition = false;
    localStorage.setItem("starterpack-progress", JSON.stringify(progress));
    setProfile({});
    setPlan(null);
    setStep(0);
  };

  // ─── Generating animation ─────────────────────────────────────
  if (generating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="font-display text-3xl text-foreground">Génération de ton plan...</h2>
          <p className="text-muted-foreground">On calcule tes portions personnalisées</p>
        </div>
      </div>
    );
  }

  // ─── Results view ──────────────────────────────────────────────
  if (step === 99 && plan) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/espace-membre">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
              </Link>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Refaire
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-1" /> Imprimer
                </Button>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Apple className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-foreground">Ton Plan Nutritionnel</h1>
                  <p className="text-muted-foreground text-sm">Personnalisé selon ton profil</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-primary">{plan.caloriesEstimees}</span>
                  <p className="text-xs text-muted-foreground mt-1">Calories/jour</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-green-400">{plan.proteinesGrammes}g</span>
                  <p className="text-xs text-muted-foreground mt-1">Protéines</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-amber-400">{plan.glucidesGrammes}g</span>
                  <p className="text-xs text-muted-foreground mt-1">Glucides</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-purple-400">{plan.lipidesGrammes}g</span>
                  <p className="text-xs text-muted-foreground mt-1">Lipides</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-foreground">{plan.imc}</span>
                  <p className="text-xs text-muted-foreground mt-1">IMC ({plan.imcCategory})</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <span className="text-2xl font-bold text-foreground">Niv. {plan.niveauDepart}</span>
                  <p className="text-xs text-muted-foreground mt-1">Point de départ</p>
                </div>
              </div>
            </div>

            {/* Portions quotidiennes avec grammes */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="font-display text-xl text-foreground mb-6">Tes portions quotidiennes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Protéines</span>
                    <span className="text-green-400 font-bold">{plan.proteines.paumes} paumes/jour</span>
                  </div>
                  <p className="text-sm text-primary font-medium">≈ {plan.proteines.grammes}g total/jour</p>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Légumes</span>
                    <span className="text-emerald-400 font-bold">{plan.legumes.poings} poings/jour</span>
                  </div>
                  <p className="text-sm text-primary font-medium">≈ {plan.legumes.grammes}g total/jour</p>
                </div>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Glucides</span>
                    <span className="text-amber-400 font-bold">{plan.glucides.poings} poings/jour</span>
                  </div>
                  <p className="text-sm text-primary font-medium">≈ {plan.glucides.grammes}g total/jour</p>
                </div>
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Bons gras</span>
                    <span className="text-purple-400 font-bold">{plan.lipides.pouces} pouces/jour</span>
                  </div>
                  <p className="text-sm text-primary font-medium">≈ {plan.lipides.grammes}g total/jour</p>
                </div>
              </div>

              {/* Tableau d'équivalents en grammes */}
              <h3 className="font-semibold text-foreground mb-4 text-lg">1 portion = combien de grammes ?</h3>
              <div className="space-y-4">
                {/* Protéines */}
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                  <h4 className="font-semibold text-green-400 mb-3 text-sm">1 PAUME DE PROTÉINES =</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.proteines.equivalents.map((eq, i) => (
                      <div key={i} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                        <span className="text-sm text-foreground">{eq.aliment}</span>
                        <span className="text-sm font-bold text-green-400">{eq.quantiteGrammes}{eq.unite}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Légumes */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <h4 className="font-semibold text-emerald-400 mb-3 text-sm">1 POING DE LÉGUMES =</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.legumes.equivalents.map((eq, i) => (
                      <div key={i} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                        <span className="text-sm text-foreground">{eq.aliment}</span>
                        <span className="text-sm font-bold text-emerald-400">{eq.quantiteGrammes}{eq.unite}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Glucides */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                  <h4 className="font-semibold text-amber-400 mb-3 text-sm">1 POING DE GLUCIDES =</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.glucides.equivalents.map((eq, i) => (
                      <div key={i} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                        <span className="text-sm text-foreground">{eq.aliment}</span>
                        <span className="text-sm font-bold text-amber-400">{eq.quantiteGrammes}{eq.unite}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Lipides */}
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-400 mb-3 text-sm">1 POUCE DE LIPIDES =</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {plan.lipides.equivalents.map((eq, i) => (
                      <div key={i} className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2">
                        <span className="text-sm text-foreground">{eq.aliment}</span>
                        <span className="text-sm font-bold text-purple-400">{eq.quantiteGrammes}{eq.unite}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Plan de repas */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
              <h2 className="font-display text-xl text-foreground mb-6">Structure de repas</h2>
              <div className="space-y-4">
                {plan.repas.map((repas, i) => (
                  <div key={i} className="bg-secondary/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-foreground">{repas.nom}</span>
                    </div>
                    <p className="text-sm text-muted-foreground ml-11 mb-1">{repas.description}</p>
                    <p className="text-sm text-foreground ml-11 font-medium">{repas.portions}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liste d'épicerie hebdomadaire automatique */}
            <WeeklyGrocerySection plan={plan} />

            {/* Parcours de progression */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <h2 className="font-display text-xl text-foreground mb-6">Ton parcours de progression</h2>
              <div className="space-y-4">
                {plan.progression.map((level) => (
                  <div
                    key={level.niveau}
                    className={`rounded-xl p-4 border-2 transition-all ${
                      level.current
                        ? "border-primary bg-primary/5"
                        : level.acquis
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-border bg-secondary/20 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          level.current
                            ? "bg-primary text-white"
                            : level.acquis
                              ? "bg-green-500 text-white"
                              : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {level.acquis ? <Check className="w-4 h-4" /> : level.niveau}
                      </span>
                      <div>
                        <span className="font-semibold text-foreground">Niveau {level.niveau} — {level.titre}</span>
                        {level.current && <span className="ml-2 text-xs text-primary font-medium">← Tu es ici</span>}
                      </div>
                    </div>
                    <ul className="ml-11 space-y-1">
                      {level.habitudes.map((h, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${level.acquis ? "bg-green-400" : "bg-muted-foreground"}`} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Questionnaire view ────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            {step === 0 ? (
              <Link href="/espace-membre">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Retour à l'espace membre
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Question {step + 1} / 7</span>
              <span>{Math.round(((step + 1) / 7) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / 7) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {questions[step]?.()}
          </div>
        </div>
      </div>
    </div>
  );
}
