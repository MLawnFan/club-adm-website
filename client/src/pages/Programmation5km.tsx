/*
 * PAGE PROGRAMMATION 5 KM
 * Page cachée (pas dans le menu), accessible uniquement via lien direct
 * Affiche la programmation de course 5 km en plein écran
 */
export default function Programmation5km() {
  return (
    <iframe
      src="/manus-storage/programme-5km-clubadm-v2_0f878a41.html"
      title="Programme 5 km — 10 semaines | Club ADM Fitness"
      className="w-full h-screen border-0"
      style={{ minHeight: "100vh" }}
    />
  );
}
