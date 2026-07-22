import ProgrammationAdaptive from "./ProgrammationAdaptive";
import { PROGRAMMES } from "@/data/programmationCourse";

/*
 * PAGE PROGRAMMATION 10 KM
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Adapte automatiquement le nombre de semaines selon la date de première visite
 */
export default function Programmation10km() {
  return <ProgrammationAdaptive config={PROGRAMMES["10km"]} />;
}
