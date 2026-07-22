import ProgrammationAdaptive from "./ProgrammationAdaptive";
import { PROGRAMMES } from "@/data/programmationCourse";

/*
 * PAGE PROGRAMMATION 5 KM
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Adapte automatiquement le nombre de semaines selon la date de première visite
 */
export default function Programmation5km() {
  return <ProgrammationAdaptive config={PROGRAMMES["5km"]} />;
}
