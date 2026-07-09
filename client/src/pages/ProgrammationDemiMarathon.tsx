/*
 * PAGE PROGRAMMATION DEMI-MARATHON (21.1 KM)
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Affiche la programmation de course demi-marathon en plein écran
 */
export default function ProgrammationDemiMarathon() {
  return (
    <iframe
      src="/manus-storage/programme-demi-marathon-clubadm_ea1cac87.html"
      title="Programme Demi-Marathon — 14 semaines | Club ADM Fitness"
      className="w-full h-screen border-0"
      style={{ minHeight: "100vh" }}
    />
  );
}
