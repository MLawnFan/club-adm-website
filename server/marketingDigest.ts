import "dotenv/config";
import { lt } from "drizzle-orm";
import { getDb } from "./db";
import { marketingEvents } from "../drizzle/schema";
import { getMarketingReport } from "./marketingReport";
import { TIME_ZONE, localDate } from "../shared/marketingAnalytics";

export async function createMarketingDigest(now = Date.now()) {
  const daily = await getMarketingReport(1, now);
  const weekly = await getMarketingReport(7, now);
  const url = "https://clubadmfit-fcpqjdnn.manus.space";
  let publication: "active" | "pending" | "unavailable" = "unavailable";
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (response.ok) publication = (await response.text()).includes('name="adm-marketing-version" content="20261020"') ? "active" : "pending";
  } catch { /* Availability does not imply zero traffic. */ }
  const measured = daily.coverage.first !== null && daily.coverage.first < daily.range.end;
  const lines = [`**Club ADM — site web · ${daily.range.startDate}**`, "Période : journée complète, heure de Montréal. Source : suivi privé Club ADM en parallèle d’Umami, pas un import des rapports Umami."];
  if (publication === "pending") lines.push("**Suivi en attente de publication** : la version en ligne n’affiche pas encore la nouvelle intégration.");
  if (publication === "unavailable") lines.push("Vérification de la version publiée indisponible aujourd’hui; cela ne signifie pas zéro visite.");
  if (!measured) lines.push("**Trafic non mesuré pour cette journée** : aucune donnée disponible depuis la mise en place. Aucun historique Umami n’a été importé.");
  else {
    lines.push(`Visiteurs estimés : ${daily.current.visitors} · Visites mesurées : ${daily.current.visits} · Pages vues : ${daily.current.views}.`);
    lines.push(`Clics consultation : ${daily.current.counts.consultation_cta_click} visites · Découvrir un service : ${daily.current.counts.service_decouvrir} visites.`);
    const top = daily.current.pages.slice(0, 3).map(p => `${p.key} : ${p.views} vues`).join("; ");
    lines.push(`Pages les plus consultées : ${top || "aucune page mesurée"}.`);
    const serviceCounts = daily.current.services.filter(s => s.clicks > 0).sort((a, b) => b.clicks - a.clicks).slice(0, 3);
    lines.push(`Intérêts par service : ${serviceCounts.map(s => `${s.key} (${s.clicks} visites avec clic)`).join("; ") || "aucun clic mesuré"}.`);
    const sources = daily.current.sources.slice().sort((a, b) => b.requests - a.requests || b.visits - a.visits);
    if (sources.length) lines.push(`Sources principales : ${sources.slice(0, 3).map(s => `${s.key} : ${s.visits} visites, ${s.requests} demandes liées`).join("; ")}.`);
    lines.push(`Conversion des visites consenties vers une demande : ${daily.current.consultationRate === null ? "non calculable" : `${daily.current.consultationRate} %`} (${daily.current.conversionVisits}/${daily.current.visits}).`);
    if (weekly.coverage.first !== null && weekly.coverage.first <= weekly.range.start - 7 * 86400000) lines.push(`7 derniers jours : ${weekly.current.visits} visites mesurées, contre ${weekly.previous.visits} auparavant. Demandes reçues : ${weekly.requests}, contre ${weekly.previousRequests}.`);
    else lines.push("Comparaison hebdomadaire : historique encore insuffisant pour comparer deux périodes complètes.");
    const starts = weekly.current.counts.consultation_form_start, completes = weekly.current.counts.consultation_demande_confirmee;
    if (starts >= 20 && completes < starts / 4) lines.push("Piste d’optimisation : vérifier les champs et les erreurs du formulaire; beaucoup de visites le commencent sans confirmer de demande. Ce constat n’établit pas la cause.");
    else lines.push("Piste d’optimisation : accumuler un volume suffisant et comparer les demandes par source; ne pas tirer de conclusion de vente des vues seules.");
  }
  lines.push(`Demandes réellement enregistrées : ${daily.requests} (total de la boîte privée, même sans consentement analytique). Une demande n’est pas une réservation.`);
  lines.push(daily.purchases ? `Achats programme payés vérifiés au retour Stripe : ${daily.purchases.count} · Revenu brut CAD : ${(daily.purchases.cadCents / 100).toFixed(2)} $. Hors abonnements, remboursements et paiements sans retour vérifié.` : "Achats et revenu : non mesurés — Stripe n’est pas activé.");
  lines.push("Rendez-vous confirmés / honorés, ventes des coachs et coûts publicitaires : non connectés au CRM et aux plateformes publicitaires.");
  lines.push("Couverture : visiteurs ayant accepté le suivi; hors administrateurs, aperçus et tests. Identifiants aléatoires par navigateur : ce ne sont pas des personnes identifiées.");
  lines.push(`[Statistiques et boîte privée](${url}/admin/ventes)`);
  return { day: daily.range.startDate, generatedAt: now, timeZone: TIME_ZONE, publication, message: lines.join("\n\n") };
}

async function main() {
  const now = Date.now();
  if (process.argv.includes("--cleanup")) {
    const db = await getDb();
    if (!db) throw new Error("Base inaccessible; récapitulatif non généré.");
    // Only the new anonymous marketing table. Never touches members, leads or programmes.
    await db.delete(marketingEvents).where(lt(marketingEvents.occurredAt, now - 90 * 86400000));
  }
  if (process.argv.includes("--date")) { console.log(JSON.stringify({ day: localDate(now), timeZone: TIME_ZONE })); return; }
  console.log(JSON.stringify(await createMarketingDigest(now)));
}
if (process.argv[1]?.endsWith("marketingDigest.ts")) main().then(() => process.exit(0)).catch(() => { console.error("Impossible de lire les statistiques réelles du site. Aucun chiffre n’a été inventé."); process.exit(1); });
