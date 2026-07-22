import ProgrammationAdaptive from "./ProgrammationAdaptive";
import { PROGRAMMES } from "@/data/programmationCourse";

/*
 * PAGE PROGRAMMATION DEMI-MARATHON (21.1 KM)
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Adapte automatiquement le nombre de semaines selon la date de première visite
 */
export default function ProgrammationDemiMarathon() {
  return <ProgrammationAdaptive config={PROGRAMMES["21km"]} />;
}
