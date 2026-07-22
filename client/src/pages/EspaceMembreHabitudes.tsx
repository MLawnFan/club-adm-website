import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Heart, Moon, Brain, Droplets, Target, Check, Lock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ─────────────────────────────────────────────────────
interface HabitModule {
  id: string;
  titre: string;
  icon: any;
  color: string;
  borderColor: string;
  iconColor: string;
  description: string;
  lecons: Lecon[];
  habitudes: string[];
}

interface Lecon {
  titre: string;
  contenu: string;
  pourquoi: string;
  comment: string;
  quand: string;
}

interface HabitsProgress {
  completedModules: string[];
  checkedHabits: Record<string, boolean>;
  weeklyCheckins: Record<string, boolean[]>;
}

// ─── Données des modules ───────────────────────────────────────
const MODULES: HabitModule[] = [
  {
    id: "sommeil",
    titre: "Sommeil",
    icon: Moon,
    color: "from-indigo-500/20 to-indigo-600/5",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
    description: "Optimise la qualité de ton sommeil pour une meilleure récupération et plus d'énergie.",
    lecons: [
      {
        titre: "L'importance du sommeil",
        contenu: "Le sommeil est le pilier #1 de la récupération. C'est pendant le sommeil profond que ton corps répare les tissus musculaires, consolide la mémoire et régule les hormones (testostérone, hormone de croissance, cortisol).",
        pourquoi: "Un manque de sommeil chronique augmente le cortisol de 37%, réduit la testostérone de 15%, et diminue la sensibilité à l'insuline — rendant la perte de poids quasi impossible.",
        comment: "Vise 7-9 heures de sommeil par nuit. La qualité compte autant que la quantité.",
        quand: "Couche-toi et lève-toi à la même heure chaque jour, même les weekends (±30 min max).",
      },
      {
        titre: "Routine du soir",
        contenu: "Crée un rituel de 30-60 minutes avant le coucher pour signaler à ton cerveau qu'il est temps de dormir.",
        pourquoi: "La lumière bleue des écrans supprime la mélatonine de 50%. Une routine constante conditionne ton horloge biologique.",
        comment: "Éteins les écrans 60 min avant le lit. Tamise les lumières. Lis, médite, ou fais des étirements légers.",
        quand: "Commence ta routine 60 minutes avant ton heure de coucher cible.",
      },
      {
        titre: "Environnement optimal",
        contenu: "Ta chambre doit être un sanctuaire de sommeil : fraîche, sombre et silencieuse.",
        pourquoi: "La température idéale pour dormir est 18-20°C. L'obscurité totale maximise la production de mélatonine.",
        comment: "Rideaux opaques, température à 18-20°C, bouchons d'oreilles ou bruit blanc si nécessaire. Pas de téléphone dans la chambre.",
        quand: "Prépare ton environnement 30 minutes avant de te coucher.",
      },
    ],
    habitudes: ["Coucher à heure fixe (±30 min)", "7-9h de sommeil", "Pas d'écran 60 min avant", "Chambre fraîche (18-20°C)", "Routine du soir en place"],
  },
  {
    id: "stress",
    titre: "Gestion du stress",
    icon: Brain,
    color: "from-rose-500/20 to-rose-600/5",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
    description: "Apprends à gérer ton stress pour protéger ta santé et optimiser tes résultats.",
    lecons: [
      {
        titre: "Comprendre le cortisol",
        contenu: "Le cortisol est l'hormone du stress. En quantité normale, il est essentiel (énergie le matin, réponse au danger). En excès chronique, il détruit tes résultats.",
        pourquoi: "Le cortisol chroniquement élevé favorise le stockage de gras abdominal, la perte musculaire, les troubles du sommeil et l'inflammation.",
        comment: "Identifie tes stresseurs principaux. Classe-les en 'contrôlables' et 'non-contrôlables'. Agis sur les premiers, accepte les seconds.",
        quand: "Fais un audit de stress une fois par semaine (dimanche soir, 5 minutes).",
      },
      {
        titre: "Respiration tactique",
        contenu: "La respiration est le seul levier direct sur ton système nerveux autonome. En 2 minutes, tu peux passer de 'fight or flight' à 'rest and digest'.",
        pourquoi: "La respiration 4-7-8 active le nerf vague et réduit le cortisol de 20% en quelques minutes.",
        comment: "Inspire 4 secondes par le nez → Retiens 7 secondes → Expire 8 secondes par la bouche. Répète 4 cycles.",
        quand: "Matin au réveil, avant un moment stressant, et le soir avant le coucher.",
      },
      {
        titre: "Mouvement et nature",
        contenu: "L'activité physique et le temps en nature sont les anti-stress les plus puissants et les plus sous-estimés.",
        pourquoi: "20 minutes de marche en nature réduit le cortisol de 21%. L'exercice libère des endorphines et de la sérotonine.",
        comment: "Marche 20 minutes dehors chaque jour. Pas besoin de courir — la marche suffit pour l'effet anti-stress.",
        quand: "Idéalement le matin (lumière naturelle + mouvement = double bénéfice) ou sur l'heure du dîner.",
      },
    ],
    habitudes: ["Respiration 4-7-8 (2x/jour)", "20 min marche dehors", "Audit de stress hebdomadaire", "Limiter les réseaux sociaux", "Moment de gratitude quotidien"],
  },
  {
    id: "recuperation",
    titre: "Récupération",
    icon: Heart,
    color: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    description: "Maximise ton adaptation à l'entraînement grâce à une récupération intelligente.",
    lecons: [
      {
        titre: "Repos actif vs passif",
        contenu: "Les jours de repos ne signifient pas rester sur le divan. Le repos actif (marche, yoga, natation légère) accélère la récupération en augmentant le flux sanguin.",
        pourquoi: "Le repos actif réduit les courbatures de 30% comparé au repos complet. Il maintient la mobilité et prévient la raideur.",
        comment: "Jours de repos : 20-30 min d'activité légère (marche, vélo facile, yoga, natation). Intensité = conversation facile.",
        quand: "1-2 jours de repos actif par semaine, entre tes jours d'entraînement les plus intenses.",
      },
      {
        titre: "Étirements et mobilité",
        contenu: "La mobilité n'est pas un luxe — c'est une nécessité pour performer et prévenir les blessures à long terme.",
        pourquoi: "10 minutes de mobilité quotidienne réduit le risque de blessure de 35% et améliore l'amplitude de mouvement pour de meilleurs gains.",
        comment: "Routine de 10 min : hanches, épaules, colonne thoracique. Tiens chaque position 30-60 secondes. Respire profondément.",
        quand: "Après chaque entraînement (5 min) + routine complète 2-3x/semaine.",
      },
      {
        titre: "Décharge et périodisation",
        contenu: "Ton corps s'adapte pendant le repos, pas pendant l'entraînement. Les semaines allégées sont essentielles pour progresser.",
        pourquoi: "Sans décharge, tu accumules de la fatigue qui mène au plateau ou à la blessure. La supercompensation nécessite du repos.",
        comment: "Toutes les 3-4 semaines, réduis le volume de 40-50% (moins de séries, pas moins d'exercices). Garde l'intensité.",
        quand: "Semaines 4 et 8 de ton programme sont déjà planifiées comme semaines allégées.",
      },
    ],
    habitudes: ["Repos actif 1-2x/semaine", "Étirements post-entraînement (5 min)", "Routine mobilité 2-3x/semaine", "Respecter les semaines allégées", "Écouter les signaux de fatigue"],
  },
  {
    id: "hydratation",
    titre: "Hydratation & Suppléments",
    icon: Droplets,
    color: "from-cyan-500/20 to-cyan-600/5",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
    description: "Les bases souvent négligées qui font une vraie différence sur tes résultats.",
    lecons: [
      {
        titre: "Besoins en eau",
        contenu: "L'eau représente 60% de ton corps. Une déshydratation de seulement 2% réduit tes performances de 10-20%.",
        pourquoi: "L'eau transporte les nutriments, régule la température, lubrifie les articulations et élimine les déchets métaboliques.",
        comment: "Formule simple : ton poids en lbs ÷ 2 = oz d'eau par jour. Ajoute 500ml par heure d'entraînement.",
        quand: "Commence la journée avec 500ml au réveil. Bois régulièrement tout au long de la journée, pas tout d'un coup.",
      },
      {
        titre: "Électrolytes",
        contenu: "L'eau seule ne suffit pas si tu transpires beaucoup. Les électrolytes (sodium, potassium, magnésium) sont essentiels.",
        pourquoi: "Les crampes, la fatigue et les maux de tête à l'entraînement sont souvent liés à un déséquilibre électrolytique, pas à un manque d'eau.",
        comment: "Ajoute une pincée de sel dans ton eau d'entraînement, ou utilise un supplément d'électrolytes sans sucre.",
        quand: "Avant et pendant l'entraînement, surtout si tu transpires abondamment ou t'entraînes plus de 60 minutes.",
      },
      {
        titre: "Suppléments essentiels",
        contenu: "La majorité des suppléments sont inutiles. Concentre-toi sur les 3 qui ont le plus de preuves scientifiques.",
        pourquoi: "Vitamine D : 70% des Canadiens sont déficients. Oméga-3 : anti-inflammatoire puissant. Magnésium : améliore le sommeil et la récupération.",
        comment: "Vitamine D3 : 2000-4000 UI/jour. Oméga-3 : 2-3g EPA+DHA/jour. Magnésium glycinate : 200-400mg au coucher.",
        quand: "Vitamine D et Oméga-3 avec un repas contenant du gras. Magnésium 30-60 min avant le coucher.",
      },
    ],
    habitudes: ["Boire poids÷2 en oz d'eau/jour", "500ml au réveil", "Électrolytes à l'entraînement", "Vitamine D quotidienne", "Magnésium au coucher"],
  },
  {
    id: "mindset",
    titre: "Mindset & Constance",
    icon: Target,
    color: "from-amber-500/20 to-amber-600/5",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
    description: "Le facteur #1 de succès à long terme. Développe la discipline qui dure.",
    lecons: [
      {
        titre: "Identité vs Objectifs",
        contenu: "Les objectifs te donnent une direction. L'identité te donne la constance. Au lieu de 'je veux perdre 20 lbs', pense 'je suis quelqu'un qui prend soin de sa santé'.",
        pourquoi: "Les recherches montrent que les changements basés sur l'identité ont 3x plus de chances de durer que ceux basés uniquement sur des objectifs chiffrés.",
        comment: "Choisis 1-2 phrases d'identité : 'Je suis quelqu'un qui s'entraîne régulièrement' ou 'Je suis quelqu'un qui mange pour performer'.",
        quand: "Répète-toi ces phrases chaque matin et chaque fois que tu hésites à faire le bon choix.",
      },
      {
        titre: "La règle des 2 jours",
        contenu: "Tu vas manquer des jours — c'est normal et humain. La clé : ne jamais manquer 2 jours consécutifs.",
        pourquoi: "Un jour manqué est un accident. Deux jours consécutifs est le début d'une nouvelle habitude (la mauvaise). La science montre que la constance bat la perfection.",
        comment: "Si tu manques un entraînement ou un repas sain, assure-toi que le LENDEMAIN tu reviens sur le plan. Même une version réduite compte.",
        quand: "Applique cette règle dès maintenant. Pas de culpabilité pour un jour manqué — juste un retour immédiat.",
      },
      {
        titre: "Environnement > Motivation",
        contenu: "La motivation fluctue. L'environnement est constant. Arrange ton environnement pour que le bon choix soit le choix facile.",
        pourquoi: "Tu fais 95% de tes décisions en mode autopilote. Si les chips sont sur le comptoir, tu les manges. Si ton sac de gym est prêt, tu y vas.",
        comment: "Prépare tes vêtements d'entraînement la veille. Meal prep le dimanche. Retire la malbouffe de la maison. Mets tes suppléments en évidence.",
        quand: "Dimanche : planifie ta semaine. Chaque soir : prépare le lendemain. Réduis les décisions à prendre.",
      },
    ],
    habitudes: ["Phrase d'identité chaque matin", "Règle des 2 jours (jamais 2 jours off)", "Préparer la veille pour le lendemain", "Meal prep hebdomadaire", "Journal de gratitude (3 choses/jour)"],
  },
];

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreHabitudes() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [progress, setProgress] = useState<HabitsProgress>({
    completedModules: [],
    checkedHabits: {},
    weeklyCheckins: {},
  });

  useEffect(() => {
    const saved = localStorage.getItem("starterpack-habits");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const saveProgress = (newProgress: HabitsProgress) => {
    setProgress(newProgress);
    localStorage.setItem("starterpack-habits", JSON.stringify(newProgress));
    // Update global progress
    const globalProgress = JSON.parse(localStorage.getItem("starterpack-progress") || "{}");
    globalProgress.habits = newProgress.completedModules.length;
    localStorage.setItem("starterpack-progress", JSON.stringify(globalProgress));
  };

  const completeModule = (moduleId: string) => {
    if (!progress.completedModules.includes(moduleId)) {
      const newProgress = { ...progress, completedModules: [...progress.completedModules, moduleId] };
      saveProgress(newProgress);
    }
  };

  const toggleHabit = (habitKey: string) => {
    const newChecked = { ...progress.checkedHabits, [habitKey]: !progress.checkedHabits[habitKey] };
    saveProgress({ ...progress, checkedHabits: newChecked });
  };

  const isModuleUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    return progress.completedModules.includes(MODULES[index - 1].id);
  };

  const currentModule = MODULES.find(m => m.id === selectedModule);

  // ─── Module detail view ────────────────────────────────────────
  if (currentModule) {
    const isCompleted = progress.completedModules.includes(currentModule.id);
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setSelectedModule(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Retour aux modules
            </button>

            {/* Module header */}
            <div className={`bg-gradient-to-br ${currentModule.color} border ${currentModule.borderColor} rounded-2xl p-6 mb-8`}>
              <div className="flex items-center gap-3 mb-2">
                <currentModule.icon className={`w-6 h-6 ${currentModule.iconColor}`} />
                <h1 className="font-display text-3xl text-foreground">{currentModule.titre}</h1>
              </div>
              <p className="text-muted-foreground">{currentModule.description}</p>
            </div>

            {/* Leçons */}
            <div className="space-y-6 mb-8">
              {currentModule.lecons.map((lecon, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-3">{lecon.titre}</h3>
                  <p className="text-muted-foreground mb-4">{lecon.contenu}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <span className="text-xs font-semibold text-primary block mb-1">POURQUOI ?</span>
                      <p className="text-sm text-muted-foreground">{lecon.pourquoi}</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <span className="text-xs font-semibold text-blue-400 block mb-1">COMMENT ?</span>
                      <p className="text-sm text-muted-foreground">{lecon.comment}</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <span className="text-xs font-semibold text-amber-400 block mb-1">QUAND ?</span>
                      <p className="text-sm text-muted-foreground">{lecon.quand}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tracker d'habitudes */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-lg text-foreground mb-4">Tracker d'habitudes</h3>
              <p className="text-sm text-muted-foreground mb-4">Coche les habitudes que tu intègres cette semaine :</p>
              <div className="space-y-3">
                {currentModule.habitudes.map((habit, i) => {
                  const key = `${currentModule.id}-${i}`;
                  const isChecked = progress.checkedHabits[key] || false;
                  return (
                    <button
                      key={i}
                      onClick={() => toggleHabit(key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                        isChecked ? "border-green-500/30 bg-green-500/5" : "border-border bg-secondary/20 hover:border-primary/30"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        isChecked ? "border-green-500 bg-green-500" : "border-muted-foreground"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${isChecked ? "text-foreground" : "text-muted-foreground"}`}>{habit}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complete module button */}
            {!isCompleted && (
              <Button
                onClick={() => completeModule(currentModule.id)}
                className="w-full"
                size="lg"
              >
                <Check className="w-4 h-4 mr-2" /> Marquer ce module comme complété
              </Button>
            )}
            {isCompleted && (
              <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <span className="text-green-400 font-semibold">Module complété !</span>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ─── Module list view ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/espace-membre">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Retour à l'espace membre
            </button>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-4xl text-foreground mb-2">Habitudes de Vie</h1>
            <p className="text-muted-foreground">5 modules pour transformer tes habitudes durablement. Complète-les dans l'ordre.</p>
          </div>

          {/* Progress */}
          <div className="bg-card border border-border rounded-xl p-4 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progression</span>
              <span className="text-sm font-semibold text-foreground">{progress.completedModules.length}/5</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${(progress.completedModules.length / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Module list */}
          <div className="space-y-3">
            {MODULES.map((mod, index) => {
              const unlocked = isModuleUnlocked(index);
              const completed = progress.completedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => unlocked && setSelectedModule(mod.id)}
                  disabled={!unlocked}
                  className={`w-full bg-gradient-to-br ${mod.color} border ${mod.borderColor} rounded-xl p-5 text-left transition-all ${
                    unlocked ? "hover:scale-[1.01] cursor-pointer" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center ${mod.iconColor}`}>
                        {unlocked ? <mod.icon className="w-5 h-5" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{mod.titre}</h3>
                        <p className="text-sm text-muted-foreground">{mod.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {completed && <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"><Check className="w-4 h-4 text-white" /></span>}
                      {unlocked && !completed && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
