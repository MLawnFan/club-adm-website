import { useEffect, useState, useSyncExternalStore } from "react";
import { useLocation } from "@/online/lib/navigation.tsx";
import { getAdvertisingConsent, setAdvertisingConsent, subscribeAdvertisingConsent, trackMetaPageView } from "@/online/lib/metaPixel";

export default function MetaPixelConsent() {
  const [path] = useLocation();
  const consent = useSyncExternalStore(subscribeAdvertisingConsent, getAdvertisingConsent, () => null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const visible = consent === null || settingsOpen;
  useEffect(() => {
    if (consent === "accepted") trackMetaPageView(path);
  }, [consent, path]);
  const choose = (choice: "accepted" | "rejected") => {
    setAdvertisingConsent(choice);
    setSettingsOpen(false);
  };

  return visible ? (
    <section aria-label="Choix des témoins publicitaires" className="online-consent-panel fixed bottom-0 inset-x-0 z-[100] max-h-[85dvh] overflow-y-auto overscroll-contain border-t border-white/20 bg-[#101d2d] text-white shadow-[0_-12px_48px_rgba(0,0,0,0.35)]">
      <div className="container py-4 sm:py-6 flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="flex-1">
          <h2 className="font-display font-bold text-lg uppercase tracking-wide mb-2">Ton choix. Tes données.</h2>
          <p className="font-body text-sm leading-relaxed text-white/70 max-w-3xl">
            Avec ton accord, le Pixel Meta nous aide à mesurer nos publicités Facebook et Instagram et à te présenter des annonces pertinentes. Meta reçoit des visites, des événements d’achat et des informations techniques (témoins, adresse IP et navigateur). Notre intégration ne lui transmet pas les réponses du quiz, ton nom ou ton courriel. Tu peux refuser sans changer ton accès au site ou au paiement.
          </p>
          <p className="font-body text-xs text-white/50 mt-2">
            Ton choix est conservé 180 jours. <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">Politique de confidentialité de Meta</a> · Tu peux changer ce choix avec « Témoins publicitaires ».
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button type="button" onClick={() => choose("rejected")} className="min-w-32 px-5 py-3 border border-white/40 text-white font-display font-bold uppercase tracking-wide text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Refuser</button>
          <button type="button" onClick={() => choose("accepted")} className="min-w-32 px-5 py-3 border border-online-cta-red bg-online-cta-red text-white font-display font-bold uppercase tracking-wide text-sm hover:bg-online-cta-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Accepter</button>
          {consent !== null && <button type="button" onClick={() => setSettingsOpen(false)} className="px-3 py-3 text-white/65 font-body text-sm underline focus-visible:outline-2 focus-visible:outline-white">Fermer</button>}
        </div>
      </div>
    </section>
  ) : (
    <button type="button" onClick={() => setSettingsOpen(true)} className="online-consent-trigger fixed bottom-3 left-3 z-[90] min-h-11 bg-[#101d2d] border border-white/20 px-3 py-2 text-white/70 font-body text-xs shadow-lg hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Témoins publicitaires</button>
  );
}
