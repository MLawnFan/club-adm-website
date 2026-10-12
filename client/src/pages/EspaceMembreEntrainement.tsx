import { useState, useEffect, useMemo } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Check,
  RotateCcw,
  Link2,
  ClipboardList,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMemberOnboarding } from "@/hooks/useMemberOnboarding";
import type { MemberAnswers } from "@shared/memberOnboarding";

// ─── Types ─────────────────────────────────────────────────────
interface TrainingProfile {
  environment: "maison" | "gym";
  experience: "debutant" | "intermediaire" | "avance";
  joursParSemaine: 3 | 4 | 5;
  objectif:
    "force" | "hypertrophie" | "endurance" | "fonctionnel" | "perte_poids";
  limitations: string[];
}

interface ExerciseBlock {
  titre: string;
  format?: string; // ex: "EMOM 8 min", "3 Rounds", "For Time"
  note?: string; // Block-level coaching note adapted to experience
  exercices: {
    nom: string;
    detail: string;
    videoUrl?: string;
    conseil?: string;
  }[];
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
  experience: "debutant" | "intermediaire" | "avance";
  semaines: WeekPlan[];
}

// ─── Exercice databases ────────────────────────────────────────
// Gym exercises by category and objective
const GYM_WARMUPS: ExerciseBlock = {
  titre: "Warm Up",
  format: "2 Rounds",
  exercices: [
    {
      nom: "Rameur ou vélo",
      detail: "3:00 facile",
      videoUrl: "https://www.youtube.com/results?search_query=rowing+warmup",
    },
    {
      nom: "Banded Pull Aparts",
      detail: "15 reps",
      videoUrl:
        "https://www.youtube.com/results?search_query=banded+pull+aparts",
    },
    {
      nom: "Scapular Push Ups",
      detail: "10 reps",
      videoUrl:
        "https://www.youtube.com/results?search_query=scapular+push+ups",
    },
    {
      nom: "Goblet Squat Hold",
      detail: "30 sec",
      videoUrl:
        "https://www.youtube.com/results?search_query=goblet+squat+hold",
    },
    {
      nom: "Hip Circles",
      detail: "10/côté",
      videoUrl:
        "https://www.youtube.com/results?search_query=hip+circles+warmup",
    },
  ],
};

const MAISON_WARMUPS: ExerciseBlock = {
  titre: "Warm Up",
  format: "2 Rounds",
  exercices: [
    { nom: "Jumping Jacks", detail: "30 sec" },
    { nom: "Arm Circles", detail: "10/direction" },
    { nom: "Bodyweight Squats", detail: "10 reps" },
    {
      nom: "Inchworms",
      detail: "5 reps",
      videoUrl:
        "https://www.youtube.com/results?search_query=inchworm+exercise",
    },
    {
      nom: "World's Greatest Stretch",
      detail: "5/côté",
      videoUrl:
        "https://www.youtube.com/results?search_query=worlds+greatest+stretch",
    },
  ],
};

// ─── Program Generator ─────────────────────────────────────────
// ─── Experience-based coaching notes ──────────────────────────
function getBlockNote(
  blockTitle: string,
  experience: string,
  objectif: string
): string | undefined {
  if (experience === "avance") {
    // Avancé: notes minimales, juste des cues d'intensité
    if (blockTitle === "Warm Up") return undefined;
    if (blockTitle === "Strength") return "RPE 8-9. Contrôle excentrique.";
    if (blockTitle === "Accessory Work")
      return "Superset si possible. Mind-muscle connection.";
    if (blockTitle === "Conditioning") return "Push à 90%+ effort.";
    if (blockTitle === "Cool Down") return undefined;
    return undefined;
  }
  if (experience === "intermediaire") {
    if (blockTitle === "Warm Up")
      return "Prends le temps de bien activer les muscles ciblés. 2-3 min de cardio léger + mouvements dynamiques.";
    if (blockTitle === "Strength")
      return "Focus sur la technique avant la charge. Augmente le poids seulement si la forme est parfaite.";
    if (blockTitle === "Accessory Work")
      return "Contrôle le mouvement — 2 sec en descendant, 1 sec en montant. Repos complets entre les séries.";
    if (blockTitle === "Conditioning")
      return "Maintiens une intensité élevée mais garde une forme propre. Réduis l'intensité si la technique se dégrade.";
    if (blockTitle === "Functional Circuit")
      return "Enchaîne les exercices avec un repos minimal entre chaque. Repos complet entre les rounds.";
    if (blockTitle === "Cool Down")
      return "Respire profondément pendant chaque étirement. Ne force jamais au-delà de l'inconfort léger.";
    return undefined;
  }
  // Débutant: explications détaillées
  if (blockTitle === "Warm Up")
    return "L'échauffement est crucial pour prévenir les blessures. Commence doucement et augmente progressivement l'intensité. Tu devrais sentir tes muscles se réchauffer et ton rythme cardiaque monter légèrement. Ne saute jamais cette étape.";
  if (blockTitle === "Strength")
    return "C'est le bloc principal. Commence TOUJOURS avec un poids que tu maîtrises parfaitement. La technique passe avant la charge. Si tu doutes de ta forme, réduis le poids. Repos complet entre chaque série — ne te presse pas. Respire : expire en poussant/tirant, inspire en contrôlant la descente.";
  if (blockTitle === "Accessory Work")
    return "Ces exercices complètent le travail principal. Utilise des poids plus légers et concentre-toi sur le muscle ciblé (mind-muscle connection). Descends lentement (2-3 secondes), monte de façon contrôlée. Si tu ne sens pas le muscle travailler, réduis le poids.";
  if (blockTitle === "Conditioning")
    return "Le but est d'élever ton cardio tout en gardant une bonne forme. Adapte l'intensité à ton niveau — il vaut mieux faire moins de reps proprement que beaucoup de reps avec une mauvaise technique. Prends des pauses si nécessaire.";
  if (blockTitle === "Functional Circuit")
    return "Enchaîne les exercices un après l'autre. Si tu as besoin de repos supplémentaire, prends-le. La qualité du mouvement est plus importante que la vitesse. Concentre-toi sur des mouvements fluides et contrôlés.";
  if (blockTitle === "Lower Body Strength")
    return "Concentre-toi sur la stabilité de tes genoux (ne les laisse pas rentrer vers l'intérieur). Garde le dos droit et le core engagé. Descends aussi bas que ta mobilité le permet sans douleur.";
  if (blockTitle === "HIIT Circuit")
    return "Haute intensité ne veut pas dire sacrifier la forme. Adapte le nombre de reps à ton niveau. Si tu es essoufflé au point de ne plus pouvoir maintenir la technique, ralentis ou prends une pause de 10-15 secondes.";
  if (blockTitle === "Cool Down")
    return "Le retour au calme aide à la récupération. Tiens chaque étirement au moins 30 secondes sans rebondir. Respire profondément et lentement. C'est le moment de relaxer ton système nerveux.";
  return "Prends ton temps et concentre-toi sur la qualité de chaque mouvement.";
}

function getExerciseConseil(
  exerciseName: string,
  experience: string
): string | undefined {
  if (experience === "avance") return undefined; // Les avancés n'ont pas besoin de conseils par exercice

  const conseils: Record<string, { debutant: string; intermediaire: string }> =
    {
      // Gym - Upper
      "Développé couché (barre)": {
        debutant:
          "Pieds au sol, fesses et épaules collées au banc. Descends la barre au niveau des mamelons. Pousse en ligne droite. Demande un spot si tu es seul.",
        intermediaire:
          "Serre les omoplates, arque légèrement. Contrôle la descente 2-3 sec.",
      },
      "Chest Press (machine)": {
        debutant:
          "Ajuste le siège pour que les poignées soient au niveau de ta poitrine. Pousse sans verrouiller les coudes. Contrôle le retour.",
        intermediaire: "Squeeze en haut du mouvement. Tempo 2-0-2.",
      },
      "Développé militaire (haltères)": {
        debutant:
          "Assis avec le dos bien appuyé. Pars des épaules, pousse au-dessus de la tête sans cambrer le dos. Garde le core serré.",
        intermediaire: "Engage le core, évite de cambrer. Full ROM.",
      },
      "Dips ou Push-ups déclinés": {
        debutant:
          "Si les dips sont trop difficiles, commence par des push-ups déclinés (pieds surélevés). Descends jusqu'à 90° aux coudes maximum.",
        intermediaire:
          "Penche-toi légèrement vers l'avant pour cibler les pecs.",
      },
      "Tractions (ou Lat Pulldown)": {
        debutant:
          "Si tu ne peux pas faire de tractions, utilise le Lat Pulldown. Tire avec les coudes (pas les mains). Imagine que tu mets tes coudes dans tes poches arrière.",
        intermediaire:
          "Initie le mouvement par la dépression scapulaire. Descends jusqu'au menton au-dessus de la barre.",
      },
      "Rowing barre": {
        debutant:
          "Dos à 45°, genoux légèrement fléchis. Tire la barre vers le nombril. Garde le dos DROIT — si tu arrondis, le poids est trop lourd.",
        intermediaire: "Squeeze les omoplates en haut. Contrôle la descente.",
      },
      "Face Pulls": {
        debutant:
          "Poulie haute, corde. Tire vers ton visage en ouvrant les coudes vers l'extérieur. Excellent pour la posture et la santé des épaules.",
        intermediaire:
          "Rotation externe en fin de mouvement. Léger et contrôlé.",
      },
      // Gym - Lower
      "Squat (barre)": {
        debutant:
          "Pieds largeur d'épaules, orteils légèrement vers l'extérieur. Descends comme si tu t'assoyais sur une chaise. Genoux dans l'axe des orteils. Garde la poitrine haute et le regard devant.",
        intermediaire:
          "Brise à la hanche d'abord. Vise la parallèle. Drive par les talons.",
      },
      "Presse à cuisses": {
        debutant:
          "Pieds au milieu de la plateforme, largeur d'épaules. Ne verrouille JAMAIS les genoux en haut. Descends jusqu'à 90° aux genoux.",
        intermediaire:
          "Pieds hauts = plus de fessiers. Pieds bas = plus de quads.",
      },
      "Fentes marchées": {
        debutant:
          "Grands pas, genou arrière frôle le sol. Garde le torse droit. Si tu perds l'équilibre, fais des fentes statiques d'abord.",
        intermediaire: "Pousse par le talon avant. Contrôle la descente.",
      },
      "Soulevé de terre roumain": {
        debutant:
          "Dos DROIT obligatoire. Pousse les fesses vers l'arrière, barre le long des jambes. Sens l'étirement dans les ischio-jambiers. Arrête quand tu sens que ton dos veut arrondir.",
        intermediaire:
          "Hinge à la hanche, micro-flexion genoux. Sens l'étirement ischio à mi-tibia.",
      },
      "Hip Thrust (barre)": {
        debutant:
          "Dos appuyé sur un banc au niveau des omoplates. Pousse les hanches vers le plafond en serrant les fessiers. Menton vers la poitrine en haut.",
        intermediaire: "Pause 1-2 sec en haut. Squeeze maximal des fessiers.",
      },
      // Accessory
      "Extensions triceps (poulie)": {
        debutant:
          "Coudes collés au corps, ne bouge que les avant-bras. Squeeze en bas du mouvement.",
        intermediaire: "Coudes fixes. Contrôle la phase excentrique.",
      },
      "Élévations latérales": {
        debutant:
          "Léger! Monte les bras sur les côtés jusqu'à la hauteur des épaules. Coudes légèrement fléchis. Ne balance pas le corps.",
        intermediaire:
          "Initie par les deltoïdes, pas par les trapèzes. Léger et contrôlé.",
      },
      "Curl biceps (haltères)": {
        debutant:
          "Coudes collés au corps, ne balance pas. Monte en tournant le poignet (supination). Descends lentement.",
        intermediaire: "Pas de momentum. Squeeze en haut 1 sec.",
      },
      // Maison
      "Pompes (variante adaptée)": {
        debutant:
          "Si les pompes au sol sont trop difficiles, commence sur les genoux ou contre un mur. Corps en planche, descends la poitrine vers le sol. Coudes à 45°, pas sur les côtés.",
        intermediaire: "Protraction scapulaire en haut. Tempo 2-1-1.",
      },
      "Squats (poids du corps ou lestés)": {
        debutant:
          "Pieds largeur d'épaules. Descends comme si tu t'assoyais. Garde les talons au sol et la poitrine haute. Genoux dans l'axe des orteils.",
        intermediaire:
          "Ajoute du poids (sac à dos, gallon d'eau) pour progresser.",
      },
      Burpees: {
        debutant:
          "Décompose le mouvement : squat → mains au sol → recule les pieds → pompe (optionnelle) → ramène les pieds → saute. Vas-y à ton rythme, la forme avant la vitesse.",
        intermediaire: "Mouvement fluide et explosif. Poitrine touche le sol.",
      },
      "Kettlebell Swings": {
        debutant:
          "C'est un mouvement de HANCHE, pas de bras. Pousse les fesses en arrière, puis propulse les hanches vers l'avant. Le kettlebell monte grâce à la force des hanches. Garde les bras détendus.",
        intermediaire:
          "Hinge explosif. Squeeze les fessiers en haut. Bras = pendule.",
      },
      Planche: {
        debutant:
          "Sur les avant-bras, corps en ligne droite de la tête aux talons. Serre les abdos et les fessiers. Ne laisse pas les hanches descendre OU monter.",
        intermediaire:
          "Engage le core comme si on allait te frapper au ventre. Respire normalement.",
      },
    };

  const c = conseils[exerciseName];
  if (!c) {
    // Conseil générique selon le niveau
    if (experience === "debutant")
      return "Concentre-toi sur la forme. Si tu n'es pas sûr du mouvement, regarde la vidéo avant de commencer.";
    return undefined;
  }
  return experience === "debutant" ? c.debutant : c.intermediaire;
}

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

      // Add experience-based notes to each block and exercise
      day.blocs = day.blocs.map(bloc => ({
        ...bloc,
        note: getBlockNote(bloc.titre, profile.experience, profile.objectif),
        exercices: bloc.exercices.map(ex => ({
          ...ex,
          conseil: getExerciseConseil(ex.nom, profile.experience),
        })),
      }));

      jours.push(day);
    }

    semaines.push({ numero: w, tag, jours });
  }

  return {
    environment: isGym ? "Gym" : "Maison",
    objectif: profile.objectif,
    joursParSemaine: profile.joursParSemaine,
    experience: profile.experience,
    semaines,
  };
}

function buildGymDay(
  dayIndex: number,
  profile: TrainingProfile,
  week: number
): SessionDay {
  const { objectif, joursParSemaine, limitations } = profile;
  const hasEpaule = limitations.includes("epaule");
  const hasGenou = limitations.includes("genou");
  const hasDos = limitations.includes("dos");

  // Progression: increase volume/intensity per week
  const volMod =
    week === 1
      ? ""
      : week === 2
        ? " (+1 set)"
        : week === 3
          ? " (tempo 3-1-1)"
          : " (drop set)";

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
    blocs.push(
      buildGymStrengthBlock(
        focus,
        "hypertrophie",
        week,
        hasEpaule,
        hasGenou,
        hasDos
      )
    );
    blocs.push(
      buildGymAccessoryBlock(
        focus,
        "hypertrophie",
        week,
        hasEpaule,
        hasGenou,
        hasDos
      )
    );
    if (objectif === "perte_poids") {
      blocs.push(buildConditioningBlock(week));
    }
  } else if (objectif === "force") {
    blocs.push(
      buildGymStrengthBlock(focus, "force", week, hasEpaule, hasGenou, hasDos)
    );
    blocs.push(
      buildGymAccessoryBlock(focus, "force", week, hasEpaule, hasGenou, hasDos)
    );
  } else if (objectif === "fonctionnel") {
    blocs.push(
      buildGymStrengthBlock(
        focus,
        "fonctionnel",
        week,
        hasEpaule,
        hasGenou,
        hasDos
      )
    );
    blocs.push(buildFunctionalBlock(week, hasGenou));
  } else {
    blocs.push(
      buildGymStrengthBlock(
        focus,
        "endurance",
        week,
        hasEpaule,
        hasGenou,
        hasDos
      )
    );
    blocs.push(buildConditioningBlock(week));
  }

  blocs.push(buildCooldownBlock());

  return { titre: `Session ${dayIndex + 1} — ${focus}`, blocs };
}

function buildGymStrengthBlock(
  focus: string,
  style: string,
  week: number,
  noEpaule: boolean,
  noGenou: boolean,
  noDos: boolean
): ExerciseBlock {
  const sets = style === "force" ? "5" : style === "hypertrophie" ? "4" : "3";
  const reps =
    style === "force" ? "3-5" : style === "hypertrophie" ? "8-12" : "12-15";
  const rest =
    style === "force" ? "3:00" : style === "hypertrophie" ? "90s" : "60s";

  let exercices: { nom: string; detail: string; videoUrl?: string }[] = [];

  if (
    focus.includes("Push") ||
    focus.includes("Upper") ||
    focus.includes("Full Body A") ||
    focus.includes("Full Body")
  ) {
    exercices = [
      !noEpaule
        ? {
            nom: "Développé couché (barre)",
            detail: `${sets}x${reps} — repos ${rest}`,
            videoUrl:
              "https://www.youtube.com/results?search_query=bench+press+tutorial",
          }
        : {
            nom: "Chest Press (machine)",
            detail: `${sets}x${reps} — repos ${rest}`,
            videoUrl:
              "https://www.youtube.com/results?search_query=chest+press+machine",
          },
      !noEpaule
        ? {
            nom: "Développé militaire (haltères)",
            detail: `3x10-12 — repos 75s`,
            videoUrl:
              "https://www.youtube.com/results?search_query=dumbbell+shoulder+press",
          }
        : {
            nom: "Élévations latérales",
            detail: `3x15 — repos 60s`,
            videoUrl:
              "https://www.youtube.com/results?search_query=lateral+raises",
          },
      {
        nom: "Dips ou Push-ups déclinés",
        detail: `3x8-12 — repos 75s`,
        videoUrl: "https://www.youtube.com/results?search_query=dips+form",
      },
    ];
  } else if (focus.includes("Pull") || focus.includes("Full Body B")) {
    exercices = [
      {
        nom: "Tractions (ou Lat Pulldown)",
        detail: `${sets}x${reps} — repos ${rest}`,
        videoUrl: "https://www.youtube.com/results?search_query=pull+ups+form",
      },
      !noDos
        ? {
            nom: "Rowing barre",
            detail: `4x8-10 — repos 90s`,
            videoUrl:
              "https://www.youtube.com/results?search_query=barbell+row+form",
          }
        : {
            nom: "Rowing machine (chest supported)",
            detail: `4x10-12 — repos 75s`,
            videoUrl:
              "https://www.youtube.com/results?search_query=chest+supported+row",
          },
      {
        nom: "Face Pulls",
        detail: `3x15-20 — repos 60s`,
        videoUrl: "https://www.youtube.com/results?search_query=face+pulls",
      },
    ];
  } else if (
    focus.includes("Quad") ||
    focus.includes("Legs") ||
    focus.includes("Full Body C")
  ) {
    exercices = [
      !noGenou
        ? {
            nom: "Squat (barre)",
            detail: `${sets}x${reps} — repos ${rest}`,
            videoUrl:
              "https://www.youtube.com/results?search_query=barbell+squat+form",
          }
        : {
            nom: "Presse à cuisses",
            detail: `${sets}x${reps} — repos ${rest}`,
            videoUrl:
              "https://www.youtube.com/results?search_query=leg+press+form",
          },
      !noGenou
        ? {
            nom: "Fentes marchées",
            detail: `3x12/jambe — repos 75s`,
            videoUrl:
              "https://www.youtube.com/results?search_query=walking+lunges",
          }
        : {
            nom: "Leg Extension (machine)",
            detail: `3x12-15 — repos 60s`,
            videoUrl:
              "https://www.youtube.com/results?search_query=leg+extension",
          },
      {
        nom: "Mollets debout",
        detail: `4x15-20 — repos 45s`,
        videoUrl: "https://www.youtube.com/results?search_query=calf+raise",
      },
    ];
  } else if (focus.includes("Post") || focus.includes("Lower")) {
    exercices = [
      !noDos
        ? {
            nom: "Soulevé de terre roumain",
            detail: `${sets}x${reps} — repos ${rest}`,
            videoUrl:
              "https://www.youtube.com/results?search_query=romanian+deadlift",
          }
        : {
            nom: "Leg Curl (machine)",
            detail: `${sets}x${reps} — repos ${rest}`,
            videoUrl: "https://www.youtube.com/results?search_query=leg+curl",
          },
      {
        nom: "Hip Thrust (barre)",
        detail: `4x10-12 — repos 75s`,
        videoUrl:
          "https://www.youtube.com/results?search_query=hip+thrust+form",
      },
      {
        nom: "Fentes bulgares",
        detail: `3x10/jambe — repos 75s`,
        videoUrl:
          "https://www.youtube.com/results?search_query=bulgarian+split+squat",
      },
    ];
  }

  return {
    titre: "Strength",
    format: `Week ${week} — ${style === "force" ? "Heavy" : style === "hypertrophie" ? "Volume" : "Endurance"}`,
    exercices,
  };
}

function buildGymAccessoryBlock(
  focus: string,
  style: string,
  week: number,
  noEpaule: boolean,
  noGenou: boolean,
  noDos: boolean
): ExerciseBlock {
  let exercices: { nom: string; detail: string; videoUrl?: string }[] = [];

  if (
    focus.includes("Push") ||
    focus.includes("Upper") ||
    focus.includes("Full Body")
  ) {
    exercices = [
      {
        nom: "Extensions triceps (poulie)",
        detail: "3x12-15 — repos 60s",
        videoUrl:
          "https://www.youtube.com/results?search_query=tricep+pushdown",
      },
      {
        nom: "Élévations latérales",
        detail: "3x15 — repos 45s",
        videoUrl: "https://www.youtube.com/results?search_query=lateral+raises",
      },
      {
        nom: "Chest Fly (machine ou haltères)",
        detail: "3x12 — repos 60s",
        videoUrl: "https://www.youtube.com/results?search_query=chest+fly",
      },
    ];
  } else if (focus.includes("Pull")) {
    exercices = [
      {
        nom: "Curl biceps (haltères)",
        detail: "3x10-12 — repos 60s",
        videoUrl: "https://www.youtube.com/results?search_query=bicep+curl",
      },
      {
        nom: "Rowing unilatéral",
        detail: "3x10/côté — repos 60s",
        videoUrl: "https://www.youtube.com/results?search_query=single+arm+row",
      },
      {
        nom: "Rear Delt Fly",
        detail: "3x15 — repos 45s",
        videoUrl: "https://www.youtube.com/results?search_query=rear+delt+fly",
      },
    ];
  } else {
    exercices = [
      {
        nom: "Abducteurs (machine)",
        detail: "3x15-20 — repos 45s",
        videoUrl: "https://www.youtube.com/results?search_query=hip+abduction",
      },
      {
        nom: "Leg Curl",
        detail: "3x12 — repos 60s",
        videoUrl: "https://www.youtube.com/results?search_query=leg+curl",
      },
      {
        nom: "Extension mollets assis",
        detail: "3x15 — repos 45s",
        videoUrl:
          "https://www.youtube.com/results?search_query=seated+calf+raise",
      },
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
      {
        nom: "Kettlebell Swings",
        detail: "15 reps",
        videoUrl:
          "https://www.youtube.com/results?search_query=kettlebell+swing+form",
      },
      !noGenou
        ? { nom: "Box Step-Ups", detail: "10/jambe" }
        : { nom: "Glute Bridge", detail: "15 reps" },
      { nom: "Planche", detail: "30 sec" },
      {
        nom: "Farmer's Carry",
        detail: "40m",
        videoUrl: "https://www.youtube.com/results?search_query=farmers+carry",
      },
      {
        nom: "Ball Slams",
        detail: "10 reps",
        videoUrl: "https://www.youtube.com/results?search_query=ball+slams",
      },
    ],
  };
}

function buildConditioningBlock(week: number): ExerciseBlock {
  const formats = [
    "AMRAP 8 min",
    "EMOM 10 min",
    "For Time (cap 12 min)",
    "Tabata 4 min x2",
  ];
  return {
    titre: "Conditioning",
    format: formats[week - 1],
    exercices:
      week === 1
        ? [
            { nom: "Rameur", detail: "200m" },
            { nom: "Burpees", detail: "8 reps" },
            { nom: "Air Squats", detail: "12 reps" },
          ]
        : week === 2
          ? [
              { nom: "Min impaire: Bike/Rameur", detail: "15 cal" },
              { nom: "Min paire: Burpees", detail: "8 reps" },
            ]
          : week === 3
            ? [
                { nom: "Thrusters (léger)", detail: "21-15-9" },
                { nom: "Pull-ups ou Ring Rows", detail: "21-15-9" },
              ]
            : [
                {
                  nom: "Tabata 1: Mountain Climbers",
                  detail: "20s on / 10s off x8",
                },
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

function buildMaisonDay(
  dayIndex: number,
  profile: TrainingProfile,
  week: number
): SessionDay {
  const { objectif, joursParSemaine } = profile;

  let focus: string;
  if (joursParSemaine === 3) {
    focus = ["Full Body Force", "Cardio-Musculaire", "Mobilité + Core"][
      dayIndex
    ];
  } else if (joursParSemaine === 4) {
    focus = ["Full Body Force", "HIIT", "Upper + Core", "Lower + Cardio"][
      dayIndex
    ];
  } else {
    focus = [
      "Push + Core",
      "Lower Body",
      "Pull + Cardio",
      "Full Body",
      "Active Recovery",
    ][dayIndex];
  }

  const blocs: ExerciseBlock[] = [MAISON_WARMUPS];

  if (
    focus.includes("Force") ||
    focus.includes("Push") ||
    focus.includes("Full Body")
  ) {
    blocs.push({
      titre: "Strength",
      format: `${week + 2} Rounds`,
      exercices: [
        {
          nom: "Pompes (variante adaptée)",
          detail: objectif === "force" ? "8-10 reps tempo 3-1-1" : "12-15 reps",
          videoUrl:
            "https://www.youtube.com/results?search_query=push+up+variations",
        },
        {
          nom: "Squats (poids du corps ou lestés)",
          detail: "15-20 reps",
          videoUrl:
            "https://www.youtube.com/results?search_query=bodyweight+squat",
        },
        {
          nom: "Rowing inversé (sous table/barre basse)",
          detail: "10-12 reps",
          videoUrl: "https://www.youtube.com/results?search_query=inverted+row",
        },
        {
          nom: "Fentes alternées",
          detail: "12/jambe",
          videoUrl:
            "https://www.youtube.com/results?search_query=alternating+lunges",
        },
        { nom: "Planche", detail: `${30 + week * 5}s` },
      ],
    });
  } else if (focus.includes("HIIT") || focus.includes("Cardio")) {
    blocs.push({
      titre: "HIIT Circuit",
      format: `${week === 1 ? "30s on / 30s off" : week === 2 ? "35s on / 25s off" : week === 3 ? "40s on / 20s off" : "45s on / 15s off"} x ${week + 2} rounds`,
      exercices: [
        {
          nom: "Burpees",
          detail: "Max reps",
          videoUrl: "https://www.youtube.com/results?search_query=burpees+form",
        },
        {
          nom: "Mountain Climbers",
          detail: "Max reps",
          videoUrl:
            "https://www.youtube.com/results?search_query=mountain+climbers",
        },
        {
          nom: "Jump Squats",
          detail: "Max reps",
          videoUrl: "https://www.youtube.com/results?search_query=jump+squats",
        },
        { nom: "High Knees", detail: "Max reps" },
        { nom: "Plank Shoulder Taps", detail: "Max reps" },
      ],
    });
  } else if (focus.includes("Lower")) {
    blocs.push({
      titre: "Lower Body Strength",
      format: "4 séries chaque",
      exercices: [
        {
          nom: "Squats bulgares",
          detail: "10/jambe",
          videoUrl:
            "https://www.youtube.com/results?search_query=bulgarian+split+squat+bodyweight",
        },
        {
          nom: "Pont fessier (single leg)",
          detail: "12/côté",
          videoUrl:
            "https://www.youtube.com/results?search_query=single+leg+glute+bridge",
        },
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
        {
          nom: "Rowing inversé",
          detail: "10-12 reps",
          videoUrl: "https://www.youtube.com/results?search_query=inverted+row",
        },
        {
          nom: "Superman Holds",
          detail: "10 reps x 3s hold",
          videoUrl:
            "https://www.youtube.com/results?search_query=superman+exercise",
        },
        {
          nom: "Dead Bug",
          detail: "10/côté",
          videoUrl:
            "https://www.youtube.com/results?search_query=dead+bug+exercise",
        },
        { nom: "Planche latérale", detail: "30s/côté" },
        {
          nom: "Hollow Body Hold",
          detail: "20-30s",
          videoUrl:
            "https://www.youtube.com/results?search_query=hollow+body+hold",
        },
      ],
    });
  } else if (focus.includes("Upper")) {
    blocs.push({
      titre: "Upper Body + Core",
      format: "4 séries chaque",
      exercices: [
        {
          nom: "Pompes diamant",
          detail: "8-12 reps",
          videoUrl:
            "https://www.youtube.com/results?search_query=diamond+push+ups",
        },
        {
          nom: "Pike Push-ups",
          detail: "8-10 reps",
          videoUrl:
            "https://www.youtube.com/results?search_query=pike+push+ups",
        },
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
        {
          nom: "Cat-Cow",
          detail: "10 reps",
          videoUrl:
            "https://www.youtube.com/results?search_query=cat+cow+stretch",
        },
        { nom: "World's Greatest Stretch", detail: "5/côté" },
        { nom: "Pigeon Stretch", detail: "60s/côté" },
        { nom: "Respiration diaphragmatique", detail: "3 min" },
      ],
    });
  }

  blocs.push(buildCooldownBlock());
  return { titre: `Session ${dayIndex + 1} — ${focus}`, blocs };
}

// ─── Onboarding shared profile helpers ──────────────────────────
const TRAINING_ENVIRONMENTS = ["maison", "gym"] as const;
const TRAINING_EXPERIENCES = ["debutant", "intermediaire", "avance"] as const;
const TRAINING_OBJECTIVES = [
  "force",
  "hypertrophie",
  "endurance",
  "fonctionnel",
  "perte_poids",
] as const;

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableJson(record[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function profileKey(profile: TrainingProfile): string {
  return stableJson({
    environment: profile.environment,
    experience: profile.experience,
    joursParSemaine: profile.joursParSemaine,
    objectif: profile.objectif,
    limitations: [...profile.limitations].sort(),
  });
}

function profileFromAnswers(answers: MemberAnswers): TrainingProfile | null {
  const days = Number(answers.trainingDays);
  if (
    !TRAINING_ENVIRONMENTS.includes(
      answers.environment as TrainingProfile["environment"]
    ) ||
    !TRAINING_EXPERIENCES.includes(
      answers.experience as TrainingProfile["experience"]
    ) ||
    !TRAINING_OBJECTIVES.includes(
      answers.trainingObjective as TrainingProfile["objectif"]
    ) ||
    ![3, 4, 5].includes(days) ||
    !answers.limitationsAnswered
  )
    return null;
  return {
    environment: answers.environment as TrainingProfile["environment"],
    experience: answers.experience as TrainingProfile["experience"],
    joursParSemaine: days as TrainingProfile["joursParSemaine"],
    objectif: answers.trainingObjective as TrainingProfile["objectif"],
    limitations: [...answers.limitations],
  };
}

function storedProfileKey(value: unknown): string | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<TrainingProfile>;
  if (
    !TRAINING_ENVIRONMENTS.includes(
      candidate.environment as TrainingProfile["environment"]
    ) ||
    !TRAINING_EXPERIENCES.includes(
      candidate.experience as TrainingProfile["experience"]
    ) ||
    !TRAINING_OBJECTIVES.includes(
      candidate.objectif as TrainingProfile["objectif"]
    ) ||
    ![3, 4, 5].includes(candidate.joursParSemaine as number) ||
    !Array.isArray(candidate.limitations)
  )
    return null;
  return profileKey(candidate as TrainingProfile);
}

const ENVIRONMENT_LABELS: Record<TrainingProfile["environment"], string> = {
  gym: "Gym",
  maison: "Maison",
};
const EXPERIENCE_LABELS: Record<TrainingProfile["experience"], string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};
const OBJECTIVE_LABELS: Record<TrainingProfile["objectif"], string> = {
  hypertrophie: "Esthétique / musculation",
  force: "Force",
  fonctionnel: "Santé / fonctionnel",
  perte_poids: "Transformation",
  endurance: "Endurance",
};

function TrainingSummary({
  profile,
  onboardingHref,
}: {
  profile: TrainingProfile;
  onboardingHref: string;
}) {
  return (
    <section
      className="mb-6 rounded-xl border border-primary/25 bg-primary/5 p-4"
      aria-label="Résumé de mes réponses d'entraînement"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Profil d’entraînement
          </p>
          <h2 className="mt-1 font-display text-lg text-foreground">
            Tes réponses utilisées pour cette proposition
          </h2>
        </div>
        <Link
          href={onboardingHref}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Modifier mes réponses
        </Link>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Environnement", ENVIRONMENT_LABELS[profile.environment]],
          ["Niveau", EXPERIENCE_LABELS[profile.experience]],
          ["Rythme", `${profile.joursParSemaine} jours / semaine`],
          ["Objectif", OBJECTIVE_LABELS[profile.objectif]],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-background/60 p-3">
            <dt className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="px-4 pb-20 pt-28">{children}</main>
      <Footer />
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreEntrainement() {
  const { answers, status, loading, isAuthenticated, isDemo, error, user } =
    useMemberOnboarding("starter");
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [planProfileKey, setPlanProfileKey] = useState<string | null>(null);
  const [hydratedProfileKey, setHydratedProfileKey] = useState<string | null>(
    null
  );
  const [generating, setGenerating] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(
    new Set()
  );
  const profile = useMemo(() => profileFromAnswers(answers), [answers]);
  const currentProfileKey = useMemo(
    () => (profile ? profileKey(profile) : null),
    [profile]
  );
  const onboardingSubmitted =
    isDemo || status === "needs_review" || status === "referred";
  const isReferred = !isDemo && status === "referred";
  const hasLimitations = Boolean(profile?.limitations.length);
  const canGenerate = Boolean(
    profile && onboardingSubmitted && !isReferred && !hasLimitations
  );
  const storageKey = isDemo
    ? "starterpack-training-demo"
    : `starterpack-training-user-${user?.id || "anonymous"}`;
  const progressStorageKey = isDemo
    ? "starterpack-progress-demo"
    : "starterpack-progress";
  const onboardingHref = `/espace-membre/onboarding/starter${isDemo ? "?apercu=1" : ""}`;
  const starterHref = `/espace-membre/starter-pack${isDemo ? "?apercu=1" : ""}`;
  const previewHref = "/espace-membre/entrainement?apercu=1";

  useEffect(() => {
    if (!canGenerate || !currentProfileKey) {
      setPlan(null);
      setPlanProfileKey(null);
      setCompletedSessions(new Set());
      setHydratedProfileKey(null);
      return;
    }
    if (hydratedProfileKey === currentProfileKey) return;
    setHydratedProfileKey(currentProfileKey);
    setPlan(null);
    setPlanProfileKey(null);
    setCompletedSessions(new Set());
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        plan?: TrainingPlan;
        profile?: unknown;
        onboardingProfileKey?: unknown;
        completed?: unknown;
      };
      const savedKey =
        typeof saved.onboardingProfileKey === "string"
          ? saved.onboardingProfileKey
          : storedProfileKey(saved.profile);
      if (savedKey !== currentProfileKey || !saved.plan) return;
      setPlan(saved.plan);
      setPlanProfileKey(currentProfileKey);
      setCompletedSessions(
        new Set(
          Array.isArray(saved.completed)
            ? saved.completed.filter(
                (key): key is string => typeof key === "string"
              )
            : []
        )
      );
    } catch {
      /* A malformed local cache never blocks the shared onboarding flow. */
    }
  }, [canGenerate, currentProfileKey, hydratedProfileKey, storageKey]);

  const persistPlan = (nextPlan: TrainingPlan, completed: string[] = []) => {
    if (!profile || !currentProfileKey) return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        plan: nextPlan,
        profile,
        userId: isDemo ? null : user?.id,
        onboardingProfileKey: currentProfileKey,
        completed,
      })
    );
    const progress = JSON.parse(
      localStorage.getItem(progressStorageKey) || "{}"
    );
    progress.training = true;
    localStorage.setItem(progressStorageKey, JSON.stringify(progress));
  };
  const handleGenerate = () => {
    if (!profile || !canGenerate || !currentProfileKey) return;
    setGenerating(true);
    window.setTimeout(() => {
      const generatedPlan = generateProgram(profile);
      setPlan(generatedPlan);
      setPlanProfileKey(currentProfileKey);
      setCompletedSessions(new Set());
      setSelectedWeek(1);
      setSelectedDay(0);
      setHydratedProfileKey(currentProfileKey);
      persistPlan(generatedPlan);
      setGenerating(false);
    }, 650);
  };
  const toggleSession = (key: string) => {
    if (!plan || !currentProfileKey || planProfileKey !== currentProfileKey)
      return;
    const next = new Set(completedSessions);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setCompletedSessions(next);
    persistPlan(plan, Array.from(next));
  };
  const handleReset = () => {
    localStorage.removeItem(storageKey);
    const progress = JSON.parse(
      localStorage.getItem(progressStorageKey) || "{}"
    );
    progress.training = false;
    localStorage.setItem(progressStorageKey, JSON.stringify(progress));
    setPlan(null);
    setPlanProfileKey(null);
    setCompletedSessions(new Set());
    setSelectedWeek(1);
    setSelectedDay(0);
  };
  const activePlan = planProfileKey === currentProfileKey ? plan : null;
  const currentWeek = activePlan?.semaines.find(
    week => week.numero === selectedWeek
  );
  const currentDay = currentWeek?.jours[selectedDay];
  const JOURS_LABELS = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];

  if (loading)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-secondary" />
          <div className="h-40 rounded-2xl bg-card" />
          <div className="h-24 rounded-xl bg-card" />
        </div>
      </PageShell>
    );
  if (!isAuthenticated && !isDemo)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl">
          <Link
            href={starterHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
          </Link>
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ClipboardList className="h-9 w-9 text-primary" />
            <h1 className="mt-4 font-display text-3xl text-foreground">
              Ton programme commence par ton profil
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Connecte-toi puis complète le questionnaire Starter Pack. Il sert
              à présenter une proposition d’entraînement à partir de tes
              réponses, sans refaire les questions ici.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={onboardingHref}
                className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
              >
                Se connecter et remplir le profil{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href={previewHref}
                className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/60"
              >
                Voir l’aperçu fictif
              </Link>
            </div>
          </section>
        </div>
      </PageShell>
    );
  if (error && !isDemo)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h1 className="mt-3 font-display text-2xl text-foreground">
            Impossible de vérifier ton profil
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Réessaie plus tard ou ouvre le questionnaire pour vérifier tes
            réponses.
          </p>
          <Link
            href={onboardingHref}
            className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Ouvrir mon onboarding
          </Link>
        </div>
      </PageShell>
    );
  if (!onboardingSubmitted || !profile)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl">
          <Link
            href={starterHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
          </Link>
          <section className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <ClipboardList className="h-9 w-9 text-primary" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
              Étape requise
            </p>
            <h1 className="mt-2 font-display text-3xl text-foreground">
              Préparons ton cadre d’entraînement
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Avant de proposer les 4 semaines, complète ou soumets le
              questionnaire commun. Cette page réutilisera ensuite tes réponses
              d’environnement, niveau, jours, objectif et limitations.
            </p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["1", "Réponds au profil", "Ton contexte et tes préférences."],
                [
                  "2",
                  "Indique les limites",
                  "Pour orienter la suite sans présumer.",
                ],
                [
                  "3",
                  "Retrouve ton module",
                  "La proposition apparaît ici si approprié.",
                ],
              ].map(([number, title, detail]) => (
                <li
                  key={number}
                  className="rounded-xl border border-border bg-background/60 p-4"
                >
                  <span className="text-xs font-bold text-primary">
                    {number}
                  </span>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              href={onboardingHref}
              className="mt-6 inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
            >
              Compléter mon onboarding <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </section>
        </div>
      </PageShell>
    );
  if (isReferred)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl">
          <Link
            href={starterHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
          </Link>
          <div className="mt-6">
            <TrainingSummary
              profile={profile}
              onboardingHref={onboardingHref}
            />
          </div>
          <section className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-6 sm:p-8">
            <ShieldCheck className="h-9 w-9 text-amber-600" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Orientation nécessaire
            </p>
            <h1 className="mt-2 font-display text-3xl text-foreground">
              Une orientation adaptée est nécessaire avant toute proposition
              automatisée
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Cette page ne pose pas de diagnostic et ne génère pas de programme
              d’entraînement pour ce profil. Revois tes réponses ou utilise le
              canal d’accompagnement approprié pour la suite.
            </p>
            <Link
              href={onboardingHref}
              className="mt-6 inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/60"
            >
              Modifier mes réponses
            </Link>
          </section>
        </div>
      </PageShell>
    );
  if (hasLimitations)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl">
          <Link
            href={starterHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
          </Link>
          <div className="mt-6">
            <TrainingSummary
              profile={profile}
              onboardingHref={onboardingHref}
            />
          </div>
          <section className="rounded-2xl border border-amber-500/35 bg-amber-500/10 p-6 sm:p-8">
            <AlertTriangle className="h-9 w-9 text-amber-600" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Validation demandée
            </p>
            <h1 className="mt-2 font-display text-3xl text-foreground">
              La génération est en pause
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Tu as signalé :{" "}
              <strong className="text-foreground">
                {profile.limitations.join(", ")}
              </strong>
              . Une machine ou un exercice n’est pas automatiquement approprié à
              une limitation. Demande une validation adaptée avant de reprendre
              une proposition d’entraînement.
            </p>
            <Link
              href={onboardingHref}
              className="mt-6 inline-flex items-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/60"
            >
              Vérifier mes réponses
            </Link>
          </section>
        </div>
      </PageShell>
    );
  if (generating)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <h1 className="mt-6 font-display text-3xl text-foreground">
            Préparation de ta proposition
          </h1>
          <p className="mt-2 text-muted-foreground">
            Module éducatif de 4 semaines basé sur tes réponses.
          </p>
        </div>
      </PageShell>
    );
  if (!activePlan)
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl">
          <Link
            href={starterHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
          </Link>
          <div className="mt-6">
            <TrainingSummary
              profile={profile}
              onboardingHref={onboardingHref}
            />
          </div>
          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <Dumbbell className="h-9 w-9 text-primary" />
            <h1 className="mt-4 font-display text-3xl text-foreground">
              Ta proposition d’entraînement est prête à être créée
            </h1>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Le module comprend 4 semaines et adapte les consignes de coaching
              à ton niveau.{" "}
              <strong className="text-foreground">
                C’est un programme éducatif à adapter; il ne remplace pas une
                évaluation.
              </strong>
            </p>
            <Button onClick={handleGenerate} className="mt-6" size="lg">
              Créer ma proposition de 4 semaines{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>
        </div>
      </PageShell>
    );

  const totalSessions = activePlan.semaines.reduce(
      (acc, week) => acc + week.jours.length,
      0
    ),
    completedCount = completedSessions.size,
    sessionKey = `${selectedWeek}-${selectedDay}`,
    isSessionCompleted = completedSessions.has(sessionKey);
  return (
    <PageShell>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={starterHref}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Retour au Starter Pack
          </Link>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-1 h-4 w-4" /> Supprimer cette proposition
          </Button>
        </div>
        <div className="mb-6 text-center">
          <h1 className="font-display text-2xl text-foreground">
            Starter Pack ADM
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Module éducatif de 4 semaines à adapter — ne remplace pas une
            évaluation.
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(completedCount / totalSessions) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {completedCount}/{totalSessions}
            </span>
          </div>
        </div>
        {isDemo && <p role="note" className="mb-4 rounded-lg border border-amber-400/25 bg-amber-400/10 p-4 text-sm text-amber-100">Aperçu fictif uniquement : cette proposition illustre le fonctionnement du programme, pas un plan validé pour toi.</p>}
        <TrainingSummary profile={profile} onboardingHref={onboardingHref} />
        <div className="mb-5 rounded-xl border border-primary/25 bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Repère important :</strong> cette
          proposition est éducative et à adapter. Arrête un mouvement qui ne
          convient pas et demande un avis approprié si nécessaire.
        </div>
        <div className="mb-4 flex justify-center gap-2">
          {activePlan.semaines.map(week => (
            <button
              key={week.numero}
              onClick={() => {
                setSelectedWeek(week.numero);
                setSelectedDay(0);
              }}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedWeek === week.numero ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}
            >
              Sem {week.numero}
            </button>
          ))}
        </div>
        {currentWeek?.tag && (
          <div className="mb-4 text-center">
            <span className="text-xs font-bold tracking-wider text-primary">
              {currentWeek.tag}
            </span>
          </div>
        )}
        <div className="mb-4 rounded-xl border border-border bg-card p-3">
          <div className="flex justify-between">
            {JOURS_LABELS.map((label, index) => {
              const isActive = index < (currentWeek?.jours.length || 0),
                isSelected = index === selectedDay && isActive,
                dayKey = `${selectedWeek}-${index}`,
                isDone = completedSessions.has(dayKey);
              return (
                <button
                  key={label}
                  onClick={() => isActive && setSelectedDay(index)}
                  disabled={!isActive}
                  className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-all ${isSelected ? "border border-primary bg-primary/20" : isActive ? "hover:bg-secondary/50" : "cursor-default opacity-30"}`}
                >
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {label}
                  </span>
                  <span
                    className={`text-sm font-bold ${isSelected ? "text-primary" : "text-foreground"}`}
                  >
                    {index + 1}
                  </span>
                  {isActive && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${isDone ? "bg-green-500" : "bg-muted-foreground/30"}`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {currentDay && (
          <>
            <div
              className={`mb-4 rounded-xl border border-border border-l-4 p-4 ${isSessionCompleted ? "border-l-green-500 bg-green-500/5" : "border-l-primary bg-card"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-bold text-foreground">
                    {currentDay.titre}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {currentDay.blocs.length} blocs
                  </p>
                </div>
                <button
                  onClick={() => toggleSession(sessionKey)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${isSessionCompleted ? "bg-green-500 text-white" : "border border-primary/30 bg-primary/20 text-primary hover:bg-primary/30"}`}
                >
                  {isSessionCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border-2 border-primary" />
                  )}
                  {isSessionCompleted ? "Validé" : "Valider"}
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {currentDay.blocs.map((bloc, blockIndex) => (
                <section
                  key={`${bloc.titre}-${blockIndex}`}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <header className="border-b border-border bg-secondary/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold text-foreground">
                        {bloc.titre}
                      </h3>
                      {bloc.format && (
                        <span className="text-xs font-medium text-primary">
                          {bloc.format}
                        </span>
                      )}
                    </div>
                    {bloc.note && (
                      <p className="mt-2 text-xs leading-relaxed text-blue-400/90">
                        Conseil : {bloc.note}
                      </p>
                    )}
                  </header>
                  <div className="space-y-2 p-4">
                    {bloc.exercices.map((exercise, exerciseIndex) => (
                      <div
                        key={`${exercise.nom}-${exerciseIndex}`}
                        className="py-1.5"
                      >
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {exercise.nom}
                              </span>
                              {exercise.videoUrl && (
                                <a
                                  href={exercise.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Voir une ressource pour ${exercise.nom}`}
                                  className="shrink-0 text-primary hover:text-primary/80"
                                >
                                  <Link2 className="h-3.5 w-3.5" />
                                </a>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {exercise.detail}
                            </span>
                          </div>
                        </div>
                        {exercise.conseil && (
                          <div className="mt-1 border-l-2 border-blue-500/30 pl-3">
                            <p className="text-xs leading-relaxed text-blue-300/80">
                              {exercise.conseil}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </PageShell>
  );
}
