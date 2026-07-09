/*
 * PAGE PROGRAMMATION 10 KM
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Affiche la programmation de course 10 km en plein écran
 */
export default function Programmation10km() {
  return (
    <iframe
      src="/manus-storage/programme-10km-clubadm_538ec662.html"
      title="Programme 10 km — 12 semaines | Club ADM Fitness"
      className="w-full h-screen border-0"
      style={{ minHeight: "100vh" }}
    />
  );
}
