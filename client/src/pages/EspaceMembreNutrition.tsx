import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AlertTriangle, Apple, ArrowLeft, Check, ClipboardCheck, LockKeyhole, Minus, Plus, ShoppingCart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMemberOnboarding } from "@/hooks/useMemberOnboarding";
import { demoMemberAnswers, HABIT_LEVELS, type MemberAnswers } from "@shared/memberOnboarding";

// ─── Types ─────────────────────────────────────────────────────
interface NutritionProfile {
  sexe: string;
  exactAge: number;
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
  current: boolean;
}

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

function calculateCalories(profile: NutritionProfile): number {
  // Cette fonction est réservée à l’aperçu fictif. L’âge utilisé est l’âge exact
  // fourni par demoMemberAnswers(); aucun âge moyen de tranche n’est inventé.
  if (!Number.isFinite(profile.exactAge) || profile.exactAge <= 0) {
    throw new Error("Un âge exact est requis pour cet exemple fictif.");
  }

  const poidsKg = profile.poids * 0.453592;
  const tailleCm = (profile.tailleFeet * 12 + profile.tailleInches) * 2.54;
  const age = profile.exactAge;

  let bmr: number;
  if (profile.sexe === "Homme") {
    bmr = 88.362 + 13.397 * poidsKg + 4.799 * tailleCm - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * poidsKg + 3.098 * tailleCm - 4.330 * age;
  }

  const facteurs: Record<string, number> = {
    "Sédentaire": 1.2,
    "Légèrement actif": 1.375,
    "Actif": 1.55,
    "Très actif": 1.725,
  };
  const tdee = bmr * (facteurs[profile.activite] || 1.375);

  switch (profile.objectif) {
    case "PP": return Math.round(tdee * 0.8);
    case "PM": return Math.round(tdee * 1.15);
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

function buildProgression(habitLevel: number): ProgressionLevel[] {
  const level = Number.isInteger(habitLevel) && habitLevel >= 1 && habitLevel <= 5 ? habitLevel : 0;
  const habits: Record<number, string[]> = {
    1: ["Choisir une action de base répétable, même lors d’une semaine chargée.", "Observer ce qui rend cette action plus facile."],
    2: ["Explorer des repères visuels à un repas, selon la faim et l’énergie.", "Garder une approche souple, sans perfection recherchée."],
    3: ["Préparer quelques repas interchangeables.", "Prévoir une courte épicerie et un repas de secours."],
    4: ["Adapter les routines aux sorties, déplacements et horaires variables.", "Développer l’auto-observation plutôt qu’un contrôle rigide."],
    5: ["Faire des choix flexibles et autonomes.", "Réviser ce qui aide la continuité lorsque le contexte change."],
  };

  return HABIT_LEVELS.map(item => ({
    niveau: Number(item.value),
    titre: item.name,
    habitudes: habits[Number(item.value)] || [],
    // Le niveau est un repère choisi, pas une habitude acquise automatiquement.
    current: Number(item.value) === level,
  }));
}

function generatePlan(profile: NutritionProfile): NutritionPlan {
  const { imc, category } = calculateIMC(profile.poids, profile.tailleFeet, profile.tailleInches);
  const calories = calculateCalories(profile);
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

  const progression = buildProgression(profile.niveauHabitudes);

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
  const [selectedFoods, setSelectedFoods] = useState<SelectedFoods>(() => ({
    // Les choix de l’aperçu restent en mémoire seulement : aucune préférence de
    // profil réel n’est enregistrée dans le navigateur.
    proteines: plan.proteines.equivalents.slice(0, 4).map(e => e.aliment),
    legumes: plan.legumes.equivalents.slice(0, 5).map(e => e.aliment),
    glucides: plan.glucides.equivalents.slice(0, 4).map(e => e.aliment),
    lipides: plan.lipides.equivalents.slice(0, 4).map(e => e.aliment),
  }));

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
            <p className="text-sm text-muted-foreground">Exemple fictif : explore une liste, sans vérifier allergies, restrictions ou besoins réels.</p>
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

// ─── États onboarding et aperçu fictif ───────────────────────────
function buildDemoProfile(answers: MemberAnswers): NutritionProfile {
  const weight = Number(answers.weight);
  const weightLbs = answers.weightUnit === "kg" ? weight * 2.20462 : weight;
  const rawHeight = Number(answers.height);
  const totalInches = answers.heightUnit === "cm" ? rawHeight / 2.54 : rawHeight;

  return {
    sexe: answers.equationSex,
    exactAge: Number(answers.exactAge),
    poids: weightLbs,
    tailleFeet: Math.floor(totalInches / 12),
    tailleInches: totalInches % 12,
    objectif: answers.objective,
    activite: answers.activity,
    niveauHabitudes: Number(answers.habitLevel),
  };
}

function memberDestination(demo: boolean) {
  return `/espace-membre/starter-pack${demo ? "?apercu=1" : ""}`;
}

function BackToStarterPack({ demo }: { demo: boolean }) {
  return (
    <Link
      href={memberDestination(demo)}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
    </Link>
  );
}

function ProgressionSection({
  progression,
  firstAction,
  demo = false,
}: {
  progression: ProgressionLevel[];
  firstAction?: string;
  demo?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display text-xl text-foreground">Parcours d’habitudes souple</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fondation, Initiation, Progression, Consolidation et Maîtrise sont des repères de simplicité et d’autonomie — pas des niveaux acquis, ni une note de perfection.
        </p>
      </div>

      <div className="space-y-3">
        {progression.map(level => (
          <div
            key={level.niveau}
            className={`rounded-xl border p-4 ${
              level.current ? "border-primary bg-primary/5" : "border-border bg-secondary/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${level.current ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {level.niveau}
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{level.titre}</h3>
                {level.current && (
                  <p className="text-xs font-medium text-primary">
                    {demo ? "Repère choisi dans cet exemple fictif" : "Repère indiqué dans ton questionnaire"}
                  </p>
                )}
              </div>
            </div>
            <ul className="ml-11 mt-3 space-y-1.5">
              {level.habitudes.map(habit => (
                <li key={habit} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {habit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <h3 className="font-semibold text-foreground">Action personnelle</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {firstAction?.trim()
              ? demo
                ? `Exemple fictif d’action choisie : « ${firstAction} »`
                : `L’action que tu as proposée : « ${firstAction} »`
              : "Choisis une action modeste et réaliste à tester à la prochaine occasion qui te convient."}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-secondary/30 p-4">
          <h3 className="font-semibold text-foreground">Plan de reprise</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Si une routine est interrompue : reconnaître ce qui a changé sans se juger, revenir à une action Fondation, choisir la prochaine occasion réaliste, puis simplifier l’environnement ou le plan si l’obstacle persiste.
          </p>
        </div>
      </div>
    </div>
  );
}

function PreviewPlan({ answers, plan }: { answers: MemberAnswers; plan: NutritionPlan }) {
  const equivalents = [
    { label: "1 paume de protéines", color: "text-green-400", items: plan.proteines.equivalents },
    { label: "1 poing de légumes", color: "text-emerald-400", items: plan.legumes.equivalents },
    { label: "1 poing de glucides", color: "text-amber-400", items: plan.glucides.equivalents },
    { label: "1 pouce de lipides", color: "text-purple-400", items: plan.lipides.equivalents },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 pb-20 pt-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between gap-4">
            <BackToStarterPack demo />
            <Link
              href="/espace-membre/onboarding/starter?apercu=1"
              className="text-sm font-medium text-primary transition-colors hover:underline"
            >
              Voir le questionnaire fictif
            </Link>
          </div>

          <div className="mb-6 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <h1 className="font-display text-2xl text-foreground">Aperçu éducatif fictif — non validé</h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Cette page utilise uniquement des réponses de démonstration. Les chiffres, repères de portions et aliments servent à illustrer l’outil; ils ne constituent pas un plan personnel, ne vérifient pas les allergies, restrictions ou situations de santé, et ne sont pas livrés automatiquement.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                <Apple className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h2 className="font-display text-2xl text-foreground">Proposition chiffrée de démonstration</h2>
                <p className="text-sm text-muted-foreground">Basée sur le profil fictif « {answers.preferredName} » et sans validation humaine.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                [String(plan.caloriesEstimees), "calories/jour fictives", "text-primary"],
                [`${plan.proteinesGrammes} g`, "protéines fictives", "text-green-400"],
                [`${plan.glucidesGrammes} g`, "glucides fictifs", "text-amber-400"],
                [`${plan.lipidesGrammes} g`, "lipides fictifs", "text-purple-400"],
              ].map(([value, label, color]) => (
                <div key={label} className="rounded-xl bg-secondary/50 p-4 text-center">
                  <span className={`text-xl font-bold ${color}`}>{value}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              L’IMC de l’exemple ({plan.imc}, {plan.imcCategory}) est affiché à titre descriptif seulement; il ne détermine pas des besoins, des risques ou des portions.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl text-foreground">Repères de l’exemple fictif</h2>
            <p className="mt-1 text-sm text-muted-foreground">Les équivalents en grammes ci-dessous aident à explorer les aliments; ils ne sont pas des consignes personnelles.</p>
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {equivalents.map(group => (
                <div key={group.label} className="rounded-xl border border-border bg-secondary/20 p-4">
                  <h3 className={`mb-3 text-sm font-semibold uppercase ${group.color}`}>{group.label}</h3>
                  <div className="space-y-2">
                    {group.items.map(item => (
                      <div key={item.aliment} className="flex items-center justify-between gap-3 rounded-lg bg-background/50 px-3 py-2">
                        <span className="text-sm text-foreground">{item.aliment}</span>
                        <span className={`whitespace-nowrap text-sm font-bold ${group.color}`}>{item.quantiteGrammes}{item.unite}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl text-foreground">Structure de repas fictive</h2>
            <div className="mt-5 space-y-3">
              {plan.repas.map((meal, index) => (
                <div key={meal.nom} className="rounded-xl bg-secondary/30 p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">{index + 1}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{meal.nom}</h3>
                      <p className="text-sm text-muted-foreground">{meal.description}</p>
                      <p className="mt-1 text-sm font-medium text-foreground">{meal.portions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <WeeklyGrocerySection plan={plan} />
          <ProgressionSection progression={plan.progression} firstAction={answers.firstAction} demo />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function MessagePage({
  demo = false,
  children,
}: {
  demo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex min-h-[70vh] items-center px-4 pb-20 pt-28">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-8"><BackToStarterPack demo={demo} /></div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreNutrition() {
  const onboarding = useMemberOnboarding("starter");
  const urlPreview = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("apercu") === "1";
  const isDemo = onboarding.isDemo || urlPreview;
  const demoAnswers = useMemo(() => demoMemberAnswers(), []);
  const answers = isDemo ? demoAnswers : onboarding.answers;
  const demoProfile = useMemo(() => buildDemoProfile(demoAnswers), [demoAnswers]);
  const demoPlan = useMemo(() => (isDemo ? generatePlan(demoProfile) : null), [demoProfile, isDemo]);

  // La seule vue chiffrée vit derrière le mode aperçu et dépend exclusivement des données fictives partagées.
  if (isDemo && demoPlan) {
    return <PreviewPlan answers={demoAnswers} plan={demoPlan} />;
  }

  if (onboarding.loading) {
    return (
      <MessagePage>
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm text-muted-foreground">Chargement de ton espace nutrition…</p>
        </div>
      </MessagePage>
    );
  }

  if (!onboarding.isAuthenticated) {
    return (
      <MessagePage>
        <section className="rounded-2xl border border-border bg-card p-6 text-center md:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-4 font-display text-3xl text-foreground">Ton espace nutrition est privé</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
            Connecte-toi depuis le questionnaire du Starter Pack pour garder tes réponses dans ton dossier privé. Aucun profil nutritionnel réel n’est conservé dans cet aperçu public.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/espace-membre/onboarding/starter" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              <LockKeyhole className="h-4 w-4" /> Accéder au questionnaire / se connecter
            </Link>
            <Link href="/espace-membre/nutrition?apercu=1" className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              Voir l’aperçu fictif
            </Link>
          </div>
        </section>
      </MessagePage>
    );
  }

  if (onboarding.status === "referred") {
    return (
      <MessagePage>
        <section className="rounded-2xl border border-amber-500/30 bg-card p-6 md:p-8">
          <div className="flex gap-3">
            <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-amber-500" />
            <div>
              <h1 className="font-display text-3xl text-foreground">Orientation à prévoir</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Certaines réponses indiquent qu’une proposition nutritionnelle automatisée ne convient pas pour le moment. Il ne s’agit pas d’un diagnostic. Une orientation vers le professionnel approprié doit être organisée avant toute personnalisation.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Tu peux compléter ou corriger tes réponses dans ton espace privé. Aucun plan, cible de calories, macro ou portion n’est affiché ici.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/espace-membre/onboarding/starter" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Modifier mon questionnaire
            </Link>
          </div>
        </section>
      </MessagePage>
    );
  }

  if (onboarding.status === "needs_review") {
    return (
      <MessagePage>
        <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl text-foreground">Questionnaire reçu, de façon privée</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Tes réponses sont maintenant à organiser pour validation humaine. Cette étape vérifie la cohérence, les préférences, le contexte et les exceptions avant toute proposition personnalisée. Elle ne promet ni rendez-vous, ni délai, ni livraison automatique.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-border bg-secondary/30 p-4 text-sm leading-6 text-muted-foreground">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-primary" />
            Aucun plan validé n’est affiché : pas de cibles de calories, de macros ou de portions tant que la validation n’est pas organisée.
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/espace-membre/onboarding/starter" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
              Modifier mon questionnaire
            </Link>
          </div>
        </section>
        <div className="mt-6">
          <ProgressionSection progression={buildProgression(Number(answers.habitLevel))} firstAction={answers.firstAction} />
        </div>
      </MessagePage>
    );
  }

  return (
    <MessagePage>
      <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Apple className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-3xl text-foreground">Préparer ton questionnaire nutrition</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Pour qu’une proposition puisse être préparée de manière privée et responsable, complète ton questionnaire Starter Pack. Après l’envoi, les réponses passent par une validation humaine; aucun plan n’est généré ou livré automatiquement.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/espace-membre/onboarding/starter" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            {onboarding.status === "draft" ? "Continuer mon questionnaire" : "Commencer mon questionnaire"}
          </Link>
          <Link href="/espace-membre/nutrition?apercu=1" className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Voir un aperçu fictif
          </Link>
        </div>
      </section>
    </MessagePage>
  );
}
