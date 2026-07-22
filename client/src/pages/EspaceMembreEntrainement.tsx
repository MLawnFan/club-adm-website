import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Dumbbell, Check, Printer, RotateCcw, Play, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
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

interface Exercise {
  nom: string;
  series: number;
  reps: string;
  repos: string;
  zone: string;
  videoUrl?: string;
  lecon: { utilite: string; execution: string; erreurs: string };
}

interface Seance {
  titre: string;
  focus: string;
  exercices: Exercise[];
}

interface Semaine {
  numero: number;
  tag: string;
  seances: Seance[];
}

interface TrainingPlan {
  environment: string;
  objectif: string;
  joursParSemaine: number;
  semaines: Semaine[];
}

// ─── Données des exercices ─────────────────────────────────────
const EXERCICES_GYM: Record<string, Exercise[]> = {
  push: [
    { nom: "Développé couché (barre)", series: 4, reps: "8-10", repos: "90s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=bench+press+form", lecon: { utilite: "Développe les pectoraux, deltoïdes antérieurs et triceps. Mouvement composé fondamental pour la force du haut du corps.", execution: "Dos arqué naturellement, pieds au sol, descendre la barre au niveau des mamelons, pousser en ligne droite.", erreurs: "Rebondir la barre sur la poitrine, lever les fesses du banc, poignets cassés." } },
    { nom: "Développé militaire (haltères)", series: 3, reps: "10-12", repos: "75s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=dumbbell+shoulder+press+form", lecon: { utilite: "Cible les deltoïdes (épaules) et les triceps. Améliore la stabilité et la symétrie.", execution: "Assis ou debout, haltères à hauteur d'oreilles, pousser verticalement sans cambrer excessivement.", erreurs: "Arquer le dos, ne pas contrôler la descente, coudes trop en avant." } },
    { nom: "Élévations latérales", series: 3, reps: "12-15", repos: "60s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=lateral+raises+form", lecon: { utilite: "Isole le deltoïde moyen pour des épaules plus larges et rondes.", execution: "Légère flexion des coudes, monter les bras à l'horizontale, contrôler la descente.", erreurs: "Utiliser l'élan, monter trop haut, shrugs involontaires." } },
    { nom: "Dips (ou push-ups déclinés)", series: 3, reps: "8-12", repos: "75s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=dips+form", lecon: { utilite: "Travaille pectoraux inférieurs, triceps et deltoïdes antérieurs avec le poids du corps.", execution: "Corps légèrement penché vers l'avant, descendre jusqu'à 90° aux coudes, pousser complètement.", erreurs: "Descendre trop bas (stress épaule), ne pas verrouiller en haut, épaules haussées." } },
    { nom: "Extensions triceps (poulie)", series: 3, reps: "12-15", repos: "60s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=tricep+pushdown+form", lecon: { utilite: "Isole les triceps pour la définition et la force de verrouillage.", execution: "Coudes collés au corps, étendre complètement, contrôler le retour.", erreurs: "Bouger les coudes, utiliser l'élan du corps, charge trop lourde." } },
  ],
  pull: [
    { nom: "Tractions (ou lat pulldown)", series: 4, reps: "6-10", repos: "90s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=pull+ups+form", lecon: { utilite: "Le roi des exercices pour le dos. Développe les dorsaux, biceps et avant-bras.", execution: "Prise légèrement plus large que les épaules, tirer la poitrine vers la barre, descendre contrôlé.", erreurs: "Kipping (balancement), ne pas descendre complètement, cou en avant." } },
    { nom: "Rowing barre", series: 4, reps: "8-10", repos: "90s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=barbell+row+form", lecon: { utilite: "Épaissit le dos (trapèzes, rhomboïdes, dorsaux). Essentiel pour la posture.", execution: "Dos plat à 45°, tirer la barre vers le nombril, serrer les omoplates en haut.", erreurs: "Dos arrondi, utiliser l'élan, ne pas serrer en haut." } },
    { nom: "Face pulls (poulie)", series: 3, reps: "15-20", repos: "60s", zone: "endurance", videoUrl: "https://www.youtube.com/results?search_query=face+pulls+form", lecon: { utilite: "Renforce les rotateurs externes et le deltoïde postérieur. Prévient les blessures d'épaule.", execution: "Poulie haute, tirer vers le visage en ouvrant les coudes, serrer 1 seconde.", erreurs: "Charge trop lourde, ne pas ouvrir les coudes, tirer trop bas." } },
    { nom: "Curl biceps (haltères)", series: 3, reps: "10-12", repos: "60s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=bicep+curl+form", lecon: { utilite: "Isole les biceps pour la force de flexion et l'esthétique des bras.", execution: "Coudes fixes le long du corps, supination complète en haut, descente contrôlée.", erreurs: "Balancer le corps, coudes qui avancent, demi-reps." } },
    { nom: "Rowing unilatéral (haltère)", series: 3, reps: "10-12/côté", repos: "60s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=single+arm+dumbbell+row", lecon: { utilite: "Corrige les déséquilibres, travaille le dos unilatéralement.", execution: "Genou et main sur le banc, tirer l'haltère vers la hanche, serrer l'omoplate.", erreurs: "Rotation du tronc, ne pas monter assez haut, dos arrondi." } },
  ],
  legs_quad: [
    { nom: "Squat (barre)", series: 4, reps: "6-10", repos: "120s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=barbell+squat+form", lecon: { utilite: "Le mouvement fondamental. Travaille quadriceps, fessiers, core et tout le bas du corps.", execution: "Pieds largeur d'épaules, descendre hanches sous les genoux, dos neutre, pousser par les talons.", erreurs: "Genoux qui rentrent, dos arrondi, ne pas descendre assez, talons qui lèvent." } },
    { nom: "Presse à cuisses", series: 3, reps: "10-12", repos: "90s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=leg+press+form", lecon: { utilite: "Charge les quadriceps et fessiers sans stress sur le dos. Bon complément au squat.", execution: "Pieds largeur d'épaules au milieu de la plateforme, descendre à 90°, ne pas verrouiller en haut.", erreurs: "Bas du dos qui décolle, verrouiller les genoux, pieds trop hauts ou bas." } },
    { nom: "Fentes marchées", series: 3, reps: "12/jambe", repos: "75s", zone: "fonctionnel", videoUrl: "https://www.youtube.com/results?search_query=walking+lunges+form", lecon: { utilite: "Travaille l'équilibre, la stabilité et les quadriceps/fessiers unilatéralement.", execution: "Grand pas en avant, genou arrière frôle le sol, tronc droit, pousser par le talon avant.", erreurs: "Genou avant dépasse les orteils, tronc penché, pas trop court." } },
    { nom: "Extensions de jambes (machine)", series: 3, reps: "12-15", repos: "60s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=leg+extension+form", lecon: { utilite: "Isole les quadriceps pour la définition et le volume.", execution: "Dos bien calé, étendre complètement, pause 1s en haut, descente contrôlée.", erreurs: "Élan, ne pas étendre complètement, charge trop lourde." } },
    { nom: "Mollets debout (machine)", series: 4, reps: "15-20", repos: "45s", zone: "endurance", videoUrl: "https://www.youtube.com/results?search_query=standing+calf+raise+form", lecon: { utilite: "Développe les gastrocnémiens pour des mollets plus forts et esthétiques.", execution: "Monter sur la pointe des pieds, pause en haut, descendre sous le niveau de la plateforme.", erreurs: "Amplitude incomplète, rebondir, genoux fléchis." } },
  ],
  legs_post: [
    { nom: "Soulevé de terre roumain", series: 4, reps: "8-10", repos: "90s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=romanian+deadlift+form", lecon: { utilite: "Cible les ischio-jambiers et les fessiers. Essentiel pour la chaîne postérieure.", execution: "Barre proche des jambes, pousser les hanches vers l'arrière, légère flexion des genoux, dos neutre.", erreurs: "Dos arrondi, barre trop loin du corps, descendre trop bas, genoux trop fléchis." } },
    { nom: "Hip thrust (barre)", series: 4, reps: "10-12", repos: "75s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=hip+thrust+form", lecon: { utilite: "Le meilleur exercice pour les fessiers. Activation maximale du grand fessier.", execution: "Haut du dos sur le banc, barre sur les hanches, pousser jusqu'à extension complète, serrer en haut.", erreurs: "Hyper-extension du dos, ne pas monter assez haut, pieds mal placés." } },
    { nom: "Leg curl (machine)", series: 3, reps: "10-12", repos: "60s", zone: "hypertrophie", videoUrl: "https://www.youtube.com/results?search_query=leg+curl+form", lecon: { utilite: "Isole les ischio-jambiers pour l'équilibre musculaire et la prévention des blessures.", execution: "Hanches bien calées, flexion complète, descente contrôlée sur 2-3 secondes.", erreurs: "Lever les hanches, élan, amplitude incomplète." } },
    { nom: "Fentes bulgares", series: 3, reps: "10/jambe", repos: "75s", zone: "fonctionnel", videoUrl: "https://www.youtube.com/results?search_query=bulgarian+split+squat+form", lecon: { utilite: "Travaille fessiers et quadriceps unilatéralement avec un étirement des fléchisseurs.", execution: "Pied arrière sur un banc, descendre verticalement, genou avant au-dessus de la cheville.", erreurs: "Se pencher trop en avant, pied avant trop proche du banc, genou qui rentre." } },
    { nom: "Abducteurs (machine)", series: 3, reps: "15-20", repos: "45s", zone: "endurance", videoUrl: "https://www.youtube.com/results?search_query=hip+abduction+machine+form", lecon: { utilite: "Renforce le moyen fessier pour la stabilité du bassin et la prévention des blessures.", execution: "Dos droit, ouvrir les jambes contre la résistance, pause 1s, retour contrôlé.", erreurs: "Se pencher en avant, élan, amplitude trop faible." } },
  ],
};

const EXERCICES_MAISON: Record<string, Exercise[]> = {
  fullbody_force: [
    { nom: "Pompes (variantes)", series: 4, reps: "10-15", repos: "60s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=push+up+variations", lecon: { utilite: "Travaille pectoraux, épaules et triceps. La base de la force au poids du corps.", execution: "Corps en planche, descendre poitrine au sol, coudes à 45°, pousser complètement.", erreurs: "Hanches qui tombent, coudes trop écartés, demi-amplitude." } },
    { nom: "Squats (poids du corps ou lestés)", series: 4, reps: "15-20", repos: "60s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=bodyweight+squat+form", lecon: { utilite: "Fondation du bas du corps. Quadriceps, fessiers et core.", execution: "Pieds largeur d'épaules, descendre hanches sous les genoux, dos droit, poids sur les talons.", erreurs: "Genoux qui rentrent, talons qui lèvent, dos arrondi." } },
    { nom: "Rowing inversé (sous une table)", series: 3, reps: "10-12", repos: "60s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=inverted+row+at+home", lecon: { utilite: "Travaille le dos sans équipement. Alternative aux tractions.", execution: "Corps en planche sous une table solide, tirer la poitrine vers le bord, serrer les omoplates.", erreurs: "Hanches qui tombent, ne pas monter assez haut, cou en avant." } },
    { nom: "Fentes alternées", series: 3, reps: "12/jambe", repos: "60s", zone: "fonctionnel", videoUrl: "https://www.youtube.com/results?search_query=alternating+lunges+form", lecon: { utilite: "Équilibre, stabilité et force unilatérale des jambes.", execution: "Grand pas, genou arrière frôle le sol, tronc droit, pousser par le talon.", erreurs: "Genou qui dépasse, tronc penché, perte d'équilibre." } },
    { nom: "Planche (hold)", series: 3, reps: "30-60s", repos: "45s", zone: "endurance", videoUrl: "https://www.youtube.com/results?search_query=plank+form", lecon: { utilite: "Renforce le core en entier : abdominaux, obliques, transverse.", execution: "Sur les avant-bras, corps en ligne droite des oreilles aux talons, serrer le ventre.", erreurs: "Hanches trop hautes ou basses, retenir la respiration, regarder en avant." } },
  ],
  cardio_musculaire: [
    { nom: "Burpees", series: 4, reps: "10", repos: "45s", zone: "cardio", videoUrl: "https://www.youtube.com/results?search_query=burpees+form", lecon: { utilite: "Exercice full-body qui combine force et cardio. Brûle un maximum de calories.", execution: "Squat → planche → pompe → squat → saut. Mouvement fluide et explosif.", erreurs: "Dos arrondi en planche, ne pas sauter, rythme trop lent." } },
    { nom: "Mountain climbers", series: 3, reps: "30s", repos: "30s", zone: "cardio", videoUrl: "https://www.youtube.com/results?search_query=mountain+climbers+form", lecon: { utilite: "Cardio intense + core. Améliore l'endurance et la coordination.", execution: "Position de planche, alterner les genoux vers la poitrine rapidement.", erreurs: "Hanches trop hautes, rythme irrégulier, ne pas ramener assez le genou." } },
    { nom: "Jump squats", series: 3, reps: "12", repos: "45s", zone: "cardio", videoUrl: "https://www.youtube.com/results?search_query=jump+squats+form", lecon: { utilite: "Développe la puissance explosive des jambes et le cardio.", execution: "Squat complet puis sauter le plus haut possible, atterrir en douceur.", erreurs: "Atterrir sur les talons, genoux qui rentrent, ne pas descendre assez." } },
    { nom: "Pompes diamant", series: 3, reps: "8-12", repos: "45s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=diamond+push+ups", lecon: { utilite: "Cible davantage les triceps et le centre des pectoraux.", execution: "Mains rapprochées (forme de diamant), descendre la poitrine vers les mains.", erreurs: "Coudes trop écartés, hanches qui tombent, amplitude incomplète." } },
    { nom: "Jumping jacks", series: 3, reps: "45s", repos: "30s", zone: "cardio", videoUrl: "https://www.youtube.com/results?search_query=jumping+jacks", lecon: { utilite: "Échauffement et cardio léger. Active tout le corps.", execution: "Sauter en écartant pieds et bras simultanément, revenir position initiale.", erreurs: "Atterrir jambes raides, bras qui ne montent pas assez, rythme irrégulier." } },
  ],
  mobilite_core: [
    { nom: "Cat-cow (mobilité colonne)", series: 3, reps: "10", repos: "30s", zone: "mobilite", videoUrl: "https://www.youtube.com/results?search_query=cat+cow+stretch", lecon: { utilite: "Mobilise la colonne vertébrale, soulage les tensions du dos.", execution: "À quatre pattes, alterner entre dos arrondi (chat) et dos creux (vache).", erreurs: "Mouvement trop rapide, ne pas respirer, forcer l'amplitude." } },
    { nom: "Dead bug", series: 3, reps: "10/côté", repos: "45s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=dead+bug+exercise", lecon: { utilite: "Renforce le core profond tout en maintenant la stabilité lombaire.", execution: "Sur le dos, bras tendus, alterner l'extension d'un bras et la jambe opposée.", erreurs: "Dos qui arque, mouvements trop rapides, retenir la respiration." } },
    { nom: "Pont fessier", series: 3, reps: "15", repos: "45s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=glute+bridge+form", lecon: { utilite: "Active les fessiers, renforce la chaîne postérieure, soulage le bas du dos.", execution: "Sur le dos, pieds au sol, pousser les hanches vers le plafond, serrer les fessiers en haut.", erreurs: "Pousser par le bas du dos, ne pas serrer en haut, pieds trop loin." } },
    { nom: "World's greatest stretch", series: 2, reps: "5/côté", repos: "30s", zone: "mobilite", videoUrl: "https://www.youtube.com/results?search_query=worlds+greatest+stretch", lecon: { utilite: "Étire hanches, thorax, ischio-jambiers et quadriceps en un seul mouvement.", execution: "Fente avant, rotation du tronc vers le genou avant, main au sol, ouvrir vers le ciel.", erreurs: "Ne pas ouvrir assez la hanche, rotation insuffisante, genou arrière au sol." } },
    { nom: "Planche latérale", series: 3, reps: "30s/côté", repos: "30s", zone: "force", videoUrl: "https://www.youtube.com/results?search_query=side+plank+form", lecon: { utilite: "Renforce les obliques et stabilise le bassin latéralement.", execution: "Sur un avant-bras, corps en ligne droite, hanches hautes, serrer le ventre.", erreurs: "Hanches qui tombent, épaule qui monte, retenir la respiration." } },
  ],
};

// ─── Générateur de programme ───────────────────────────────────
function generateTrainingPlan(profile: TrainingProfile): TrainingPlan {
  const isGym = profile.environment === "gym";
  const semaines: Semaine[] = [];

  for (let w = 1; w <= 12; w++) {
    let tag = "";
    if (w === 1) tag = "BLOC 1 — FONDATION";
    else if (w === 4) tag = "SEMAINE ALLÉGÉE";
    else if (w === 5) tag = "BLOC 2 — DÉVELOPPEMENT";
    else if (w === 8) tag = "SEMAINE ALLÉGÉE";
    else if (w === 9) tag = "BLOC 3 — INTENSIFICATION";
    else if (w === 12) tag = "SEMAINE DE TRANSITION";

    const isDeload = w === 4 || w === 8;
    const bloc = w <= 3 ? 1 : w <= 7 ? 2 : 3;

    let seances: Seance[];

    if (isGym) {
      if (profile.joursParSemaine === 4) {
        seances = [
          buildGymSession("Haut du corps — Push", "push", profile, bloc, isDeload),
          buildGymSession("Bas du corps — Quadriceps", "legs_quad", profile, bloc, isDeload),
          buildGymSession("Haut du corps — Pull", "pull", profile, bloc, isDeload),
          buildGymSession("Bas du corps — Postérieur", "legs_post", profile, bloc, isDeload),
        ];
      } else if (profile.joursParSemaine === 5) {
        seances = [
          buildGymSession("Push", "push", profile, bloc, isDeload),
          buildGymSession("Pull", "pull", profile, bloc, isDeload),
          buildGymSession("Jambes — Quadriceps", "legs_quad", profile, bloc, isDeload),
          buildGymSession("Push + Épaules", "push", profile, bloc, isDeload),
          buildGymSession("Pull + Postérieur", "legs_post", profile, bloc, isDeload),
        ];
      } else {
        seances = [
          buildGymSession("Full body — Push focus", "push", profile, bloc, isDeload),
          buildGymSession("Full body — Legs focus", "legs_quad", profile, bloc, isDeload),
          buildGymSession("Full body — Pull focus", "pull", profile, bloc, isDeload),
        ];
      }
    } else {
      // Maison
      if (profile.joursParSemaine >= 4) {
        seances = [
          buildMaisonSession("Full body — Force", "fullbody_force", profile, bloc, isDeload),
          buildMaisonSession("Cardio-musculaire", "cardio_musculaire", profile, bloc, isDeload),
          buildMaisonSession("Mobilité + Core", "mobilite_core", profile, bloc, isDeload),
          buildMaisonSession("Full body — Endurance", "cardio_musculaire", profile, bloc, isDeload),
        ];
        if (profile.joursParSemaine === 5) {
          seances.push(buildMaisonSession("Force + Mobilité", "fullbody_force", profile, bloc, isDeload));
        }
      } else {
        seances = [
          buildMaisonSession("Full body — Force", "fullbody_force", profile, bloc, isDeload),
          buildMaisonSession("Cardio-musculaire", "cardio_musculaire", profile, bloc, isDeload),
          buildMaisonSession("Mobilité + Core", "mobilite_core", profile, bloc, isDeload),
        ];
      }
    }

    semaines.push({ numero: w, tag, seances });
  }

  return {
    environment: isGym ? "Gym conventionnel" : "Maison",
    objectif: profile.objectif,
    joursParSemaine: profile.joursParSemaine,
    semaines,
  };
}

function buildGymSession(titre: string, group: string, profile: TrainingProfile, bloc: number, isDeload: boolean): Seance {
  let exercices = [...(EXERCICES_GYM[group] || EXERCICES_GYM.push)];

  // Filter out exercises based on limitations
  if (profile.limitations.includes("epaule")) {
    exercices = exercices.filter(e => !e.nom.toLowerCase().includes("militaire") && !e.nom.toLowerCase().includes("dips"));
  }
  if (profile.limitations.includes("genou")) {
    exercices = exercices.filter(e => !e.nom.toLowerCase().includes("squat") && !e.nom.toLowerCase().includes("fente"));
  }
  if (profile.limitations.includes("dos")) {
    exercices = exercices.filter(e => !e.nom.toLowerCase().includes("soulevé") && !e.nom.toLowerCase().includes("rowing barre"));
  }

  // Adjust volume based on bloc and deload
  exercices = exercices.map(e => ({
    ...e,
    series: isDeload ? Math.max(2, e.series - 1) : bloc === 3 ? e.series + 1 : e.series,
    reps: isDeload ? adjustReps(e.reps, -2) : bloc === 3 ? adjustReps(e.reps, 2) : e.reps,
  }));

  return { titre, focus: group, exercices };
}

function buildMaisonSession(titre: string, group: string, profile: TrainingProfile, bloc: number, isDeload: boolean): Seance {
  let exercices = [...(EXERCICES_MAISON[group] || EXERCICES_MAISON.fullbody_force)];

  exercices = exercices.map(e => ({
    ...e,
    series: isDeload ? Math.max(2, e.series - 1) : bloc === 3 ? e.series + 1 : e.series,
    reps: isDeload ? adjustReps(e.reps, -3) : bloc === 3 ? adjustReps(e.reps, 3) : e.reps,
  }));

  return { titre, focus: group, exercices };
}

function adjustReps(reps: string, delta: number): string {
  if (reps.includes("s")) return reps; // time-based, don't adjust
  if (reps.includes("-")) {
    const [low, high] = reps.split("-").map(Number);
    return `${Math.max(4, low + delta)}-${Math.max(6, high + delta)}`;
  }
  if (reps.includes("/")) return reps;
  const num = parseInt(reps);
  if (isNaN(num)) return reps;
  return `${Math.max(4, num + delta)}`;
}

// ─── Zone colors ───────────────────────────────────────────────
const ZONE_STYLES: Record<string, { bg: string; text: string }> = {
  force: { bg: "bg-red-500/10 border-red-500/30", text: "text-red-400" },
  hypertrophie: { bg: "bg-blue-500/10 border-blue-500/30", text: "text-blue-400" },
  endurance: { bg: "bg-green-500/10 border-green-500/30", text: "text-green-400" },
  fonctionnel: { bg: "bg-amber-500/10 border-amber-500/30", text: "text-amber-400" },
  cardio: { bg: "bg-orange-500/10 border-orange-500/30", text: "text-orange-400" },
  mobilite: { bg: "bg-purple-500/10 border-purple-500/30", text: "text-purple-400" },
};

// ─── Composant principal ───────────────────────────────────────
export default function EspaceMembreEntrainement() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<TrainingProfile>>({ limitations: [] });
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [generating, setGenerating] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
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
      const generatedPlan = generateTrainingPlan(finalProfile);
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
  };

  // ─── Questionnaire steps ──────────────────────────────────────
  const questions = [
    // Step 0: Environment
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Où vas-tu t'entraîner ?</h2>
        <p className="text-muted-foreground">On adapte les exercices selon ton environnement.</p>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {[
            { value: "gym", label: "Gym", desc: "Accès complet aux machines et poids libres", emoji: "🏋️" },
            { value: "maison", label: "Maison", desc: "Poids du corps + équipement minimal", emoji: "🏠" },
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
        <h2 className="font-display text-3xl text-foreground">Quel est ton niveau d'expérience ?</h2>
        <div className="space-y-3 mt-8">
          {[
            { value: "debutant", label: "Débutant", desc: "Moins de 6 mois d'entraînement régulier" },
            { value: "intermediaire", label: "Intermédiaire", desc: "6 mois à 2 ans d'entraînement" },
            { value: "avance", label: "Avancé", desc: "2+ ans d'entraînement structuré" },
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
    // Step 2: Jours par semaine
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Combien de jours par semaine ?</h2>
        <p className="text-muted-foreground">Choisis un nombre réaliste et soutenable.</p>
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
              <span className="text-sm text-muted-foreground">jours/sem</span>
            </button>
          ))}
        </div>
      </div>
    ),
    // Step 3: Objectif
    () => (
      <div className="space-y-6">
        <h2 className="font-display text-3xl text-foreground">Quel est ton objectif principal ?</h2>
        <div className="space-y-3 mt-8">
          {[
            { value: "hypertrophie", label: "Esthétique / Volume", desc: "Style functional bodybuilding — focus sur le look" },
            { value: "force", label: "Force", desc: "Devenir plus fort sur les mouvements de base" },
            { value: "fonctionnel", label: "Santé / Fonctionnel", desc: "Mouvements fonctionnels pour le quotidien et la longévité" },
            { value: "perte_poids", label: "Transformation", desc: "Combinaison cardio + musculation pour la composition corporelle" },
            { value: "endurance", label: "Endurance musculaire", desc: "Tenir plus longtemps, circuits et supersets" },
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
        <h2 className="font-display text-3xl text-foreground">As-tu des limitations physiques ?</h2>
        <p className="text-muted-foreground">On adapte les exercices pour éviter les blessures.</p>
        <div className="space-y-3 mt-8">
          {[
            { value: "aucune", label: "Aucune limitation" },
            { value: "epaule", label: "Blessure / douleur à l'épaule" },
            { value: "genou", label: "Blessure / douleur au genou" },
            { value: "dos", label: "Blessure / douleur au dos" },
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
            <Button
              onClick={() => handleGenerate(profile as TrainingProfile)}
              className="w-full mt-4"
              size="lg"
            >
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
          <p className="text-muted-foreground">On adapte 12 semaines à ton profil</p>
        </div>
      </div>
    );
  }

  // ─── Results view ──────────────────────────────────────────────
  if (step === 99 && plan) {
    const totalSessions = plan.semaines.reduce((acc, s) => acc + s.seances.length, 0);
    const completedCount = completedSessions.size;

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

            {/* Summary */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h1 className="font-display text-2xl text-foreground">Ta Programmation</h1>
                  <p className="text-muted-foreground text-sm">{plan.environment} — {plan.joursParSemaine} jours/sem — 12 semaines</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${(completedCount / totalSessions) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{completedCount}/{totalSessions} séances</span>
              </div>
            </div>

            {/* Weeks */}
            <div className="space-y-3">
              {plan.semaines.map((semaine) => (
                <div key={semaine.numero} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedWeek(expandedWeek === semaine.numero ? null : semaine.numero)}
                    className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                        {semaine.numero}
                      </span>
                      <div className="text-left">
                        <span className="font-semibold text-foreground block">Semaine {semaine.numero}</span>
                        {semaine.tag && <span className="text-xs text-primary">{semaine.tag}</span>}
                      </div>
                    </div>
                    {expandedWeek === semaine.numero ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                  </button>

                  {expandedWeek === semaine.numero && (
                    <div className="px-4 pb-4 space-y-3">
                      {semaine.seances.map((seance, si) => {
                        const sessionKey = `${semaine.numero}-${si}`;
                        const isCompleted = completedSessions.has(sessionKey);
                        return (
                          <div key={si} className={`rounded-xl border p-4 ${isCompleted ? "border-green-500/30 bg-green-500/5" : "border-border bg-secondary/20"}`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-foreground">Jour {si + 1} — {seance.titre}</h4>
                              <button
                                onClick={() => toggleSession(sessionKey)}
                                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                                  isCompleted ? "border-green-500 bg-green-500" : "border-muted-foreground hover:border-primary"
                                }`}
                              >
                                {isCompleted && <Check className="w-4 h-4 text-white" />}
                              </button>
                            </div>
                            <div className="space-y-2">
                              {seance.exercices.map((ex, ei) => {
                                const exKey = `${sessionKey}-${ei}`;
                                const zoneStyle = ZONE_STYLES[ex.zone] || ZONE_STYLES.force;
                                return (
                                  <div key={ei}>
                                    <button
                                      onClick={() => setExpandedExercise(expandedExercise === exKey ? null : exKey)}
                                      className={`w-full text-left p-3 rounded-lg border ${zoneStyle.bg} transition-all hover:opacity-80`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">{ex.nom}</span>
                                        <span className={`text-xs font-medium ${zoneStyle.text}`}>
                                          {ex.series}×{ex.reps} | {ex.repos}
                                        </span>
                                      </div>
                                    </button>
                                    {expandedExercise === exKey && (
                                      <div className="mt-2 ml-3 p-3 bg-secondary/30 rounded-lg border border-border text-sm space-y-2">
                                        <p><strong className="text-foreground">À quoi ça sert :</strong> <span className="text-muted-foreground">{ex.lecon.utilite}</span></p>
                                        <p><strong className="text-foreground">Exécution :</strong> <span className="text-muted-foreground">{ex.lecon.execution}</span></p>
                                        <p><strong className="text-foreground">Erreurs courantes :</strong> <span className="text-muted-foreground">{ex.lecon.erreurs}</span></p>
                                        {ex.videoUrl && (
                                          <a href={ex.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline text-xs mt-1">
                                            <Play className="w-3 h-3" /> Voir la démo <ExternalLink className="w-3 h-3" />
                                          </a>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
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
