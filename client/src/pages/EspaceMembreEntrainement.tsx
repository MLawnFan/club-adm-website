import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Dumbbell, Check, RotateCcw, Play, ExternalLink, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ─────────────────────────────────────────────────────
interface TrainingProfile {
  environment: "maison" | "gym";
  experience: "debutant" | "intermediaire" | "avance";
  joursParSemaine: 3 | 4 | 5;
  objectif: "force" | "hypertrophie" | "endurance" | "fonctionnel" | "perte_poids";
  limitations: string[];
}

interface ExerciseBlock {
  titre: string;
  format?: string; // ex: "EMOM 8 min", "3 Rounds", "For Time"
  exercices: { nom: string; detail: string; videoUrl?: string }[];
}

interface SessionDay {
  titre: string;
  blocs: ExerciseBlock[];
}

interface WeekPlan {
  numero: number;
  tag: string;
  jours: SessionDay[];
}

interface TrainingPlan {
  environment: string;
  objectif: string;
  joursParSemaine: number;
  semaines: WeekPlan[];
}

// ─── Exercice databases ────────────────────────────────────────
// Gym exercises by category and objective
const GYM_WARMUPS: ExerciseBlock = {
  titre: "Warm Up",
  format: "2 Rounds",
  exercices: [
    { nom: "Rameur ou vélo", detail: "3:00 facile", videoUrl: "https://www.youtube.com/results?search_query=rowing+warmup" },
    { nom: "Banded Pull Aparts", detail: "15 reps", videoUrl: "https://www.youtube.com/results?search_query=banded+pull+aparts" },
    { nom: "Scapular Push Ups", detail: "10 reps", videoUrl: "https://www.youtube.com/results?search_query=scapular+push+ups" },
    { nom: "Goblet Squat Hold", detail: "30 sec", videoUrl: "https://www.youtube.com/results?search_query=goblet+squat+hold" },
    { nom: "Hip Circles", detail: "10/côté", videoUrl: "https://www.youtube.com/results?search_query=hip+circles+warmup" },
  ],
};

const MAISON_WARMUPS: ExerciseBlock = {
  titre: "Warm Up",
  format: "2 Rounds",
  exercices: [
    { nom: "Jumping Jacks", detail: "30 sec" },
    { nom: "Arm Circles", detail: "10/direction" },
    { nom: "Bodyweight Squats", detail: "10 reps" },
    { nom: "Inchworms", detail: "5 reps", videoUrl: "https://www.youtube.com/results?search_query=inchworm+exercise" },
    { nom: "World's Greatest Stretch", detail: "5/côté", videoUrl: "https://www.youtube.com/results?search_query=worlds+greatest+stretch" },
  ],
};

// ─── Program Generator ─────────────────────────────────────────
function generateProgram(profile: TrainingProfile): TrainingPlan {
  const isGym = profile.environment === "gym";
  const semaines: WeekPlan[] = [];

  for (let w = 1; w <= 4; w++) {
    let tag = "";
    if (w === 1) tag = "FONDATION";
    else if (w === 2) tag = "PROGRESSION";
    else if (w === 3) tag = "INTENSIFICATION";
    else if (w === 4) tag = "CONSOLIDATION";

    const jours: SessionDay[] = [];

    for (let d = 0; d < profile.joursParSemaine; d++) {
      const day = isGym
        ? buildGymDay(d, profile, w)
        : buildMaisonDay(d, profile, w);
      jours.push(day);
    }

    semaines.push({ numero: w, tag, jours });
  }

  return {
    environment: isGym ? "Gym" : "Maison",
    objectif: profile.objectif,
    joursParSemaine: profile.joursParSemaine,
    semaines,
  };
}

function buildGymDay(dayIndex: number, profile: TrainingProfile, week: number): SessionDay {
  const { objectif, joursParSemaine, limitations } = profile;
  const hasEpaule = limitations.includes("epaule");
  const hasGenou = limitations.includes("genou");
  const hasDos = limitations.includes("dos");

  // Progression: increase volume/intensity per week
  const volMod = week === 1 ? "" : week === 2 ? " (+1 set)" : week === 3 ? " (tempo 3-1-1)" : " (drop set)";

  // Split based on days/week
  let focus: string;
  if (joursParSemaine === 3) {
    focus = ["Full Body A", "Full Body B", "Full Body C"][dayIndex];
  } else if (joursParSemaine === 4) {
    focus = ["Upper Push", "Lower Quad", "Upper Pull", "Lower Post"][dayIndex];
  } else {
    focus = ["Push", "Pull", "Legs", "Upper", "Full Body"][dayIndex];
  }

  const blocs: ExerciseBlock[] = [GYM_WARMUPS];

  // Build strength block based on objective and focus
  if (objectif === "hypertrophie" || objectif === "perte_poids") {
    blocs.push(buildGymStrengthBlock(focus, "hypertrophie", week, hasEpaule, hasGenou, hasDos));
    blocs.push(buildGymAccessoryBlock(focus, "hypertrophie", week, hasEpaule, hasGenou, hasDos));
    if (objectif === "perte_poids") {
      blocs.push(buildConditioningBlock(week));
    }
  } else if (objectif === "force") {
    blocs.push(buildGymStrengthBlock(focus, "force", week, hasEpaule, hasGenou, hasDos));
    blocs.push(buildGymAccessoryBlock(focus, "force", week, hasEpaule, hasGenou, hasDos));
  } else if (objectif === "fonctionnel") {
    blocs.push(buildGymStrengthBlock(focus, "fonctionnel", week, hasEpaule, hasGenou, hasDos));
    blocs.push(buildFunctionalBlock(week, hasGenou));
  } else {
    blocs.push(buildGymStrengthBlock(focus, "endurance", week, hasEpaule, hasGenou, hasDos));
    blocs.push(buildConditioningBlock(week));
  }

  blocs.push(buildCooldownBlock());

  return { titre: `Session ${dayIndex + 1} — ${focus}`, blocs };
}

function buildGymStrengthBlock(focus: string, style: string, week: number, noEpaule: boolean, noGenou: boolean, noDos: boolean): ExerciseBlock {
  const sets = style === "force" ? "5" : style === "hypertrophie" ? "4" : "3";
  const reps = style === "force" ? "3-5" : style === "hypertrophie" ? "8-12" : "12-15";
  const rest = style === "force" ? "3:00" : style === "hypertrophie" ? "90s" : "60s";

  let exercices: { nom: string; detail: string; videoUrl?: string }[] = [];

  if (focus.includes("Push") || focus.includes("Upper") || focus.includes("Full Body A") || focus.includes("Full Body")) {
    exercices = [
      !noEpaule ? { nom: "Développé couché (barre)", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=bench+press+tutorial" } : { nom: "Chest Press (machine)", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=chest+press+machine" },
      !noEpaule ? { nom: "Développé militaire (haltères)", detail: `3x10-12 — repos 75s`, videoUrl: "https://www.youtube.com/results?search_query=dumbbell+shoulder+press" } : { nom: "Élévations latérales", detail: `3x15 — repos 60s`, videoUrl: "https://www.youtube.com/results?search_query=lateral+raises" },
      { nom: "Dips ou Push-ups déclinés", detail: `3x8-12 — repos 75s`, videoUrl: "https://www.youtube.com/results?search_query=dips+form" },
    ];
  } else if (focus.includes("Pull") || focus.includes("Full Body B")) {
    exercices = [
      { nom: "Tractions (ou Lat Pulldown)", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=pull+ups+form" },
      !noDos ? { nom: "Rowing barre", detail: `4x8-10 — repos 90s`, videoUrl: "https://www.youtube.com/results?search_query=barbell+row+form" } : { nom: "Rowing machine (chest supported)", detail: `4x10-12 — repos 75s`, videoUrl: "https://www.youtube.com/results?search_query=chest+supported+row" },
      { nom: "Face Pulls", detail: `3x15-20 — repos 60s`, videoUrl: "https://www.youtube.com/results?search_query=face+pulls" },
    ];
  } else if (focus.includes("Quad") || focus.includes("Legs") || focus.includes("Full Body C")) {
    exercices = [
      !noGenou ? { nom: "Squat (barre)", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=barbell+squat+form" } : { nom: "Presse à cuisses", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=leg+press+form" },
      !noGenou ? { nom: "Fentes marchées", detail: `3x12/jambe — repos 75s`, videoUrl: "https://www.youtube.com/results?search_query=walking+lunges" } : { nom: "Leg Extension (machine)", detail: `3x12-15 — repos 60s`, videoUrl: "https://www.youtube.com/results?search_query=leg+extension" },
      { nom: "Mollets debout", detail: `4x15-20 — repos 45s`, videoUrl: "https://www.youtube.com/results?search_query=calf+raise" },
    ];
  } else if (focus.includes("Post") || focus.includes("Lower")) {
    exercices = [
      !noDos ? { nom: "Soulevé de terre roumain", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=romanian+deadlift" } : { nom: "Leg Curl (machine)", detail: `${sets}x${reps} — repos ${rest}`, videoUrl: "https://www.youtube.com/results?search_query=leg+curl" },
      { nom: "Hip Thrust (barre)", detail: `4x10-12 — repos 75s`, videoUrl: "https://www.youtube.com/results?search_query=hip+thrust+form" },
      { nom: "Fentes bulgares", detail: `3x10/jambe — repos 75s`, videoUrl: "https://www.youtube.com/results?search_query=bulgarian+split+squat" },
    ];
  }

  return { titre: "Strength", format: `Week ${week} — ${style === "force" ? "Heavy" : style === "hypertrophie" ? "Volume" : "Endurance"}`, exercices };
}

function buildGymAccessoryBlock(focus: string, style: string, week: number, noEpaule: boolean, noGenou: boolean, noDos: boolean): ExerciseBlock {
  let exercices: { nom: string; detail: string; videoUrl?: string }[] = [];

  if (focus.includes("Push") || focus.includes("Upper") || focus.includes("Full Body")) {
    exercices = [
      { nom: "Extensions triceps (poulie)", detail: "3x12-15 — repos 60s", videoUrl: "https://www.youtube.com/results?search_query=tricep+pushdown" },
      { nom: "Élévations latérales", detail: "3x15 — repos 45s", videoUrl: "https://www.youtube.com/results?search_query=lateral+raises" },
      { nom: "Chest Fly (machine ou haltères)", detail: "3x12 — repos 60s", videoUrl: "https://www.youtube.com/results?search_query=chest+fly" },
    ];
  } else if (focus.includes("Pull")) {
    exercices = [
      { nom: "Curl biceps (haltères)", detail: "3x10-12 — repos 60s", videoUrl: "https://www.youtube.com/results?search_query=bicep+curl" },
      { nom: "Rowing unilatéral", detail: "3x10/côté — repos 60s", videoUrl: "https://www.youtube.com/results?search_query=single+arm+row" },
      { nom: "Rear Delt Fly", detail: "3x15 — repos 45s", videoUrl: "https://www.youtube.com/results?search_query=rear+delt+fly" },
    ];
  } else {
    exercices = [
      { nom: "Abducteurs (machine)", detail: "3x15-20 — repos 45s", videoUrl: "https://www.youtube.com/results?search_query=hip+abduction" },
      { nom: "Leg Curl", detail: "3x12 — repos 60s", videoUrl: "https://www.youtube.com/results?search_query=leg+curl" },
      { nom: "Extension mollets assis", detail: "3x15 — repos 45s", videoUrl: "https://www.youtube.com/results?search_query=seated+calf+raise" },
    ];
  }

  return { titre: "Accessory Work", exercices };
}

function buildFunctionalBlock(week: number, noGenou: boolean): ExerciseBlock {
  const rounds = week + 2; // 3, 4, 5, 6 rounds
  return {
    titre: "Functional Circuit",
    format: `${rounds} Rounds — repos 60s entre rounds`,
    exercices: [
      { nom: "Kettlebell Swings", detail: "15 reps", videoUrl: "https://www.youtube.com/results?search_query=kettlebell+swing+form" },
      !noGenou ? { nom: "Box Step-Ups", detail: "10/jambe" } : { nom: "Glute Bridge", detail: "15 reps" },
      { nom: "Planche", detail: "30 sec" },
      { nom: "Farmer's Carry", detail: "40m", videoUrl: "https://www.youtube.com/results?search_query=farmers+carry" },
      { nom: "Ball Slams", detail: "10 reps", videoUrl: "https://www.youtube.com/results?search_query=ball+slams" },
    ],
  };
}

function buildConditioningBlock(week: number): ExerciseBlock {
  const formats = ["AMRAP 8 min", "EMOM 10 min", "For Time (cap 12 min)", "Tabata 4 min x2"];
  return {
    titre: "Conditioning",
    format: formats[week - 1],
    exercices: week === 1 ? [
      { nom: "Rameur", detail: "200m" },
      { nom: "Burpees", detail: "8 reps" },
      { nom: "Air Squats", detail: "12 reps" },
    ] : week === 2 ? [
      { nom: "Min impaire: Bike/Rameur", detail: "15 cal" },
      { nom: "Min paire: Burpees", detail: "8 reps" },
    ] : week === 3 ? [
      { nom: "Thrusters (léger)", detail: "21-15-9" },
      { nom: "Pull-ups ou Ring Rows", detail: "21-15-9" },
    ] : [
      { nom: "Tabata 1: Mountain Climbers", detail: "20s on / 10s off x8" },
      { nom: "Tabata 2: Jump Squats", detail: "20s on / 10s off x8" },
    ],
  };
}

function buildCooldownBlock(): ExerciseBlock {
  return {
    titre: "Cool Down",
    format: "5 min",
    exercices: [
      { nom: "Étirement quadriceps", detail: "30s/côté" },
      { nom: "Pigeon stretch (hanches)", detail: "45s/côté" },
      { nom: "Child's pose", detail: "60s" },
      { nom: "Respiration 4-7-8", detail: "3 cycles" },
    ],
  };
}

function buildMaisonDay(dayIndex: number, profile: TrainingProfile, week: number): SessionDay {
  const { objectif, joursParSemaine } = profile;

  let focus: string;
  if (joursParSemaine === 3) {
    focus = ["Full Body Force", "Cardio-Musculaire", "Mobilité + Core"][dayIndex];
  } else if (joursParSemaine === 4) {
    focus = ["Full Body Force", "HIIT", "Upper + Core", "Lower + Cardio"][dayIndex];
  } else {
    focus = ["Push + Core", "Lower Body", "Pull + Cardio", "Full Body", "Active Recovery"][dayIndex];
  }

  const blocs: ExerciseBlock[] = [MAISON_WARMUPS];

  if (focus.includes("Force") || focus.includes("Push") || focus.includes("Full Body")) {
    blocs.push({
      titre: "Strength",
      format: `${week + 2} Rounds`,
      exercices: [
        { nom: "Pompes (variante adaptée)", detail: objectif === "force" ? "8-10 reps tempo 3-1-1" : "12-15 reps", videoUrl: "https://www.youtube.com/results?search_query=push+up+variations" },
        { nom: "Squats (poids du corps ou lestés)", detail: "15-20 reps", videoUrl: "https://www.youtube.com/results?search_query=bodyweight+squat" },
        { nom: "Rowing inversé (sous table/barre basse)", detail: "10-12 reps", videoUrl: "https://www.youtube.com/results?search_query=inverted+row" },
        { nom: "Fentes alternées", detail: "12/jambe", videoUrl: "https://www.youtube.com/results?search_query=alternating+lunges" },
        { nom: "Planche", detail: `${30 + week * 5}s` },
      ],
    });
  } else if (focus.includes("HIIT") || focus.includes("Cardio")) {
    blocs.push({
      titre: "HIIT Circuit",
      format: `${week === 1 ? "30s on / 30s off" : week === 2 ? "35s on / 25s off" : week === 3 ? "40s on / 20s off" : "45s on / 15s off"} x ${week + 2} rounds`,
      exercices: [
        { nom: "Burpees", detail: "Max reps", videoUrl: "https://www.youtube.com/results?search_query=burpees+form" },
        { nom: "Mountain Climbers", detail: "Max reps", videoUrl: "https://www.youtube.com/results?search_query=mountain+climbers" },
        { nom: "Jump Squats", detail: "Max reps", videoUrl: "https://www.youtube.com/results?search_query=jump+squats" },
        { nom: "High Knees", detail: "Max reps" },
        { nom: "Plank Shoulder Taps", detail: "Max reps" },
      ],
    });
  } else if (focus.includes("Lower")) {
    blocs.push({
      titre: "Lower Body Strength",
      format: "4 séries chaque",
      exercices: [
        { nom: "Squats bulgares", detail: "10/jambe", videoUrl: "https://www.youtube.com/results?search_query=bulgarian+split+squat+bodyweight" },
        { nom: "Pont fessier (single leg)", detail: "12/côté", videoUrl: "https://www.youtube.com/results?search_query=single+leg+glute+bridge" },
        { nom: "Step-ups (chaise)", detail: "10/jambe" },
        { nom: "Wall Sit", detail: `${30 + week * 10}s` },
        { nom: "Calf Raises", detail: "20 reps" },
      ],
    });
  } else if (focus.includes("Pull")) {
    blocs.push({
      titre: "Pull + Core",
      format: "3-4 séries chaque",
      exercices: [
        { nom: "Rowing inversé", detail: "10-12 reps", videoUrl: "https://www.youtube.com/results?search_query=inverted+row" },
        { nom: "Superman Holds", detail: "10 reps x 3s hold", videoUrl: "https://www.youtube.com/results?search_query=superman+exercise" },
        { nom: "Dead Bug", detail: "10/côté", videoUrl: "https://www.youtube.com/results?search_query=dead+bug+exercise" },
        { nom: "Planche latérale", detail: "30s/côté" },
        { nom: "Hollow Body Hold", detail: "20-30s", videoUrl: "https://www.youtube.com/results?search_query=hollow+body+hold" },
      ],
    });
  } else if (focus.includes("Upper")) {
    blocs.push({
      titre: "Upper Body + Core",
      format: "4 séries chaque",
      exercices: [
        { nom: "Pompes diamant", detail: "8-12 reps", videoUrl: "https://www.youtube.com/results?search_query=diamond+push+ups" },
        { nom: "Pike Push-ups", detail: "8-10 reps", videoUrl: "https://www.youtube.com/results?search_query=pike+push+ups" },
        { nom: "Tricep Dips (chaise)", detail: "12-15 reps" },
        { nom: "Planche dynamique (shoulder taps)", detail: "10/côté" },
        { nom: "Bicycle Crunches", detail: "20 reps" },
      ],
    });
  } else {
    // Active Recovery
    blocs.push({
      titre: "Active Recovery",
      format: "Flow — 20-30 min",
      exercices: [
        { nom: "Marche ou vélo léger", detail: "10-15 min" },
        { nom: "Cat-Cow", detail: "10 reps", videoUrl: "https://www.youtube.com/results?search_query=cat+cow+stretch" },
        { nom: "World's Greatest Stretch", detail: "5/côté" },
        { nom: "Pigeon Stretch", detail: "60s/côté" },
        { nom: "Respiration diaphragmatique", detail: "3 min" },
      ],
    });
  }

  blocs.push(buildCooldownBlock());
  return { titre: `Session ${dayIndex + 1} — ${focus}`, blocs };
}

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreEntrainement() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<TrainingProfile>>({ limitations: [] });
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [generating, setGenerating] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("starterpack-training");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPlan(data.plan);
        setProfile(data.profile);
        setCompletedSessions(new Set(data.completed || []));
        setStep(99);
      } catch {}
    }
  }, []);

  const handleGenerate = (finalProfile: TrainingProfile) => {
    setGenerating(true);
    setTimeout(() => {
      const generatedPlan = generateProgram(finalProfile);
      setPlan(generatedPlan);
      setGenerating(false);
      setStep(99);
      localStorage.setItem("starterpack-training", JSON.stringify({ plan: generatedPlan, profile: finalProfile, completed: [] }));
      const progress = JSON.parse(localStorage.getItem("starterpack-progress") || "{}");
      progress.training = true;
      localStorage.setItem("starterpack-progress", JSON.stringify(progress));
    }, 2000);
  };

  const toggleSession = (key: string) => {
    const next = new Set(completedSessions);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCompletedSessions(next);
    const saved = JSON.parse(localStorage.getItem("starterpack-training") || "{}");
    saved.completed = Array.from(next);
    localStorage.setItem("starterpack-training", JSON.stringify(saved));
  };

  const handleReset = () => {
    localStorage.removeItem("starterpack-training");
    const progress = JSON.parse(localStorage.getItem("starterpack-progress") || "{}");
    progress.training = false;
    localStorage.setItem("starterpack-progress", JSON.stringify(progress));
    setProfile({ limitations: [] });
    setPlan(null);
    setCompletedSessions(new Set());
    setStep(0);
    setSelectedWeek(1);
    setSelectedDay(0);
  };

  // ─── Current week/day data ─────────────────────────────────────
  const currentWeek = plan?.semaines.find(s => s.numero === selectedWeek);
  const currentDay = currentWeek?.jours[selectedDay];

  // Days of the week labels
  const JOURS_LABELS = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

  // ─── Questionnaire steps ──────────────────────────────────────
  const questions = [
    // Step 0: Environment
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Où vas-tu t'entraîner ?</h2>
        <p className="text-muted-foreground">On adapte les exercices selon ton environnement.</p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { value: "gym", label: "Gym", desc: "Machines et poids libres", emoji: "🏋️" },
            { value: "maison", label: "Maison", desc: "Poids du corps + minimal", emoji: "🏠" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setProfile({ ...profile, environment: opt.value as "gym" | "maison" }); setStep(1); }}
              className={`p-6 rounded-xl border-2 transition-all text-center ${
                profile.environment === opt.value ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-4xl block mb-2">{opt.emoji}</span>
              <span className="font-semibold text-foreground block">{opt.label}</span>
              <span className="text-xs text-muted-foreground">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 1: Experience
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Ton niveau d'expérience ?</h2>
        <div className="space-y-3 mt-8">
          {[
            { value: "debutant", label: "Débutant", desc: "< 6 mois d'entraînement" },
            { value: "intermediaire", label: "Intermédiaire", desc: "6 mois à 2 ans" },
            { value: "avance", label: "Avancé", desc: "2+ ans structuré" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setProfile({ ...profile, experience: opt.value as any }); setStep(2); }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                profile.experience === opt.value ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="font-semibold text-foreground block">{opt.label}</span>
              <span className="text-sm text-muted-foreground">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 2: Days
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Combien de jours par semaine ?</h2>
        <p className="text-muted-foreground">Choisis un nombre soutenable à long terme.</p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[3, 4, 5].map((j) => (
            <button
              key={j}
              onClick={() => { setProfile({ ...profile, joursParSemaine: j as 3 | 4 | 5 }); setStep(3); }}
              className={`p-6 rounded-xl border-2 transition-all text-center ${
                profile.joursParSemaine === j ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-3xl font-bold text-foreground block">{j}</span>
              <span className="text-sm text-muted-foreground">jours</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 3: Objective
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Ton objectif principal ?</h2>
        <div className="space-y-3 mt-8">
          {[
            { value: "hypertrophie", label: "Esthétique / Volume", desc: "Functional bodybuilding — focus sur le look" },
            { value: "force", label: "Force", desc: "Plus fort sur les mouvements de base" },
            { value: "fonctionnel", label: "Santé / Fonctionnel", desc: "Mouvements fonctionnels pour la longévité" },
            { value: "perte_poids", label: "Transformation", desc: "Cardio + musculation pour la composition corporelle" },
            { value: "endurance", label: "Endurance musculaire", desc: "Circuits et supersets" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setProfile({ ...profile, objectif: opt.value as any }); setStep(4); }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                profile.objectif === opt.value ? "border-primary bg-primary/10" : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="font-semibold text-foreground block">{opt.label}</span>
              <span className="text-sm text-muted-foreground">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 4: Limitations
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Limitations physiques ?</h2>
        <p className="text-muted-foreground">On adapte pour éviter les blessures.</p>
        <div className="space-y-3 mt-8">
          {[
            { value: "aucune", label: "Aucune limitation" },
            { value: "epaule", label: "Épaule (douleur/blessure)" },
            { value: "genou", label: "Genou (douleur/blessure)" },
            { value: "dos", label: "Dos (douleur/blessure)" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                if (opt.value === "aucune") {
                  const finalProfile = { ...profile, limitations: [] } as TrainingProfile;
                  setProfile(finalProfile);
                  handleGenerate(finalProfile);
                } else {
                  const lims = profile.limitations || [];
                  const newLims = lims.includes(opt.value) ? lims.filter(l => l !== opt.value) : [...lims, opt.value];
                  setProfile({ ...profile, limitations: newLims });
                }
              }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                opt.value === "aucune"
                  ? "border-border bg-card hover:border-primary/50"
                  : (profile.limitations || []).includes(opt.value)
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="font-semibold text-foreground">{opt.label}</span>
            </button>
          ))}
          {(profile.limitations || []).length > 0 && (
            <Button onClick={() => handleGenerate(profile as TrainingProfile)} className="w-full mt-4" size="lg">
              Générer mon programme <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    ),
  ];

  // ─── Generating animation ─────────────────────────────────────
  if (generating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h2 className="font-display text-3xl text-foreground">Création de ton programme...</h2>
          <p className="text-muted-foreground">4 semaines adaptées à ton profil</p>
        </div>
      </div>
    );
  }

  // ─── BRUTE-style Results view ──────────────────────────────────
  if (step === 99 && plan) {
    const totalSessions = plan.semaines.reduce((acc, s) => acc + s.jours.length, 0);
    const completedCount = completedSessions.size;
    const sessionKey = `${selectedWeek}-${selectedDay}`;
    const isSessionCompleted = completedSessions.has(sessionKey);

    // Determine which days have sessions in current week
    const activeDays = currentWeek ? currentWeek.jours.map((_, i) => i) : [];

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Link href="/espace-membre">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" /> Refaire
              </Button>
            </div>

            {/* Program title + progress */}
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl text-foreground mb-1">Starter Pack ADM</h1>
              <p className="text-sm text-muted-foreground">{plan.environment} — {plan.objectif} — {plan.joursParSemaine} jours/sem</p>
              <div className="mt-3 flex items-center gap-3 justify-center">
                <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completedCount / totalSessions) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{completedCount}/{totalSessions}</span>
              </div>
            </div>

            {/* Week selector */}
            <div className="flex gap-2 justify-center mb-4">
              {plan.semaines.map((s) => (
                <button
                  key={s.numero}
                  onClick={() => { setSelectedWeek(s.numero); setSelectedDay(0); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedWeek === s.numero
                      ? "bg-primary text-white"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sem {s.numero}
                </button>
              ))}
            </div>

            {/* Week tag */}
            {currentWeek?.tag && (
              <div className="text-center mb-4">
                <span className="text-xs font-bold text-primary tracking-wider">{currentWeek.tag}</span>
              </div>
            )}

            {/* Day calendar strip (BRUTE style) */}
            <div className="bg-card border border-border rounded-xl p-3 mb-4">
              <div className="flex justify-between">
                {JOURS_LABELS.slice(0, 7).map((label, i) => {
                  const isActive = i < (currentWeek?.jours.length || 0);
                  const isSelected = i === selectedDay && isActive;
                  const dayKey = `${selectedWeek}-${i}`;
                  const isDone = completedSessions.has(dayKey);
                  return (
                    <button
                      key={i}
                      onClick={() => isActive && setSelectedDay(i)}
                      disabled={!isActive}
                      className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all ${
                        isSelected
                          ? "bg-primary/20 border border-primary"
                          : isActive
                            ? "hover:bg-secondary/50 cursor-pointer"
                            : "opacity-30 cursor-default"
                      }`}
                    >
                      <span className="text-[10px] text-muted-foreground font-medium">{label}</span>
                      <span className={`text-sm font-bold ${isSelected ? "text-primary" : "text-foreground"}`}>
                        {i + 1}
                      </span>
                      {isDone && isActive && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                      {!isDone && isActive && <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Session header card */}
            {currentDay && (
              <div className={`rounded-xl border-l-4 p-4 mb-4 ${isSessionCompleted ? "border-l-green-500 bg-green-500/5 border border-green-500/20" : "border-l-primary bg-card border border-border"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{currentDay.titre}</h3>
                    <p className="text-xs text-muted-foreground">{currentDay.blocs.length} blocs</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleSession(sessionKey)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                        isSessionCompleted
                          ? "bg-green-500 text-white"
                          : "bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"
                      }`}
                    >
                      {isSessionCompleted ? <Check className="w-4 h-4" /> : <span className="w-4 h-4 rounded-full border-2 border-primary" />}
                      {isSessionCompleted ? "Validé" : "Valider"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Exercise blocks */}
            {currentDay && (
              <div className="space-y-3">
                {currentDay.blocs.map((bloc, bi) => (
                  <div key={bi} className="bg-card border border-border rounded-xl overflow-hidden">
                    {/* Block header */}
                    <div className="px-4 py-3 border-b border-border bg-secondary/20">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-foreground text-sm">{bloc.titre}</h4>
                        {bloc.format && <span className="text-xs text-primary font-medium">{bloc.format}</span>}
                      </div>
                    </div>
                    {/* Exercises */}
                    <div className="p-4 space-y-2">
                      {bloc.exercices.map((ex, ei) => (
                        <div key={ei} className="flex items-start gap-3 py-1.5">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-foreground font-medium">{ex.nom}</span>
                              {ex.videoUrl && (
                                <a href={ex.videoUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 transition-colors flex-shrink-0">
                                  <Link2 className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">{ex.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Media count */}
                    {bloc.exercices.filter(e => e.videoUrl).length > 0 && (
                      <div className="px-4 pb-3">
                        <div className="flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
                          <Link2 className="w-4 h-4" />
                          {bloc.exercices.filter(e => e.videoUrl).length} Media
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
          <div className="mb-8">
            {step === 0 ? (
              <Link href="/espace-membre">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Retour à l'espace membre
                </button>
              </Link>
            ) : (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour
              </button>
            )}
          </div>

          <div className="mb-10">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Question {step + 1} / 5</span>
              <span>{Math.round(((step + 1) / 5) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${((step + 1) / 5) * 100}%` }} />
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            {questions[step]?.()}
          </div>
        </div>
      </div>
    </div>
  );
}
