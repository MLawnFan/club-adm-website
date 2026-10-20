import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { analyticsConsent, chooseAnalytics, subscribeAnalytics, configureMarketing, installInteractionTracking, trackMarketing } from "@/lib/marketingAnalytics";
import { marketingPage } from "@shared/marketingAnalytics";
import { getAdvertisingConsent, setAdvertisingConsent, subscribeAdvertisingConsent } from "@/online/lib/metaPixel";

export default function MarketingAnalytics() {
  const [path] = useLocation();
  const me = trpc.auth.me.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });
  const record = trpc.marketing.record.useMutation();
  const mutate = useRef(record.mutateAsync); mutate.current = record.mutateAsync;
  const consent = useSyncExternalStore(subscribeAnalytics, analyticsConsent, () => null);
  const advertising = useSyncExternalStore(subscribeAdvertisingConsent, getAdvertisingConsent, () => null);
  const [settings, setSettings] = useState(false);
  const [measure, setMeasure] = useState(false), [ads, setAds] = useState(false);
  const online = path === "/online-project" || path.startsWith("/online-project/");
  const visible = Boolean(marketingPage(path)) && (consent === null || (online && advertising === null) || settings);
  const lastPage = useRef<string | null>(null);
  useEffect(() => {
    const exclude = me.isLoading || !!me.error || me.data?.role === "admin";
    configureMarketing(event => mutate.current(event), exclude);
    if (exclude || consent !== "accepted") { lastPage.current = null; return; }
    if (marketingPage(path) && lastPage.current !== path) { lastPage.current = path; trackMarketing("page_view"); }
  }, [path, consent, me.isLoading, me.error, me.data?.role]);
  useEffect(() => installInteractionTracking(), []);
  useEffect(() => { setMeasure(consent === "accepted"); setAds(advertising === "accepted"); }, [consent, advertising]);
  const save = (reject = false) => {
    chooseAnalytics(!reject && measure ? "accepted" : "rejected");
    setSettings(false);
    if (online) setAdvertisingConsent(!reject && ads ? "accepted" : "rejected");
  };
  if (!marketingPage(path)) return null;
  return visible ? (
    <section aria-label="Préférences de confidentialité" className="online-consent-panel fixed inset-x-0 bottom-0 z-[110] max-h-[80dvh] overflow-y-auto overscroll-contain border-t border-white/20 bg-[#101d2d] px-5 py-5 text-white shadow-2xl" style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}>
      <div className="mx-auto max-w-6xl grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="mb-2 text-xl font-bold">Tes choix de confidentialité</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-white/75">Avec ton accord, nous mesurons les pages, clics et vidéos pour améliorer le site. Les statistiques sont conservées dans la base du site et transmises à Umami, qui reçoit aussi des informations techniques, dont l’adresse IP et le navigateur. Aucun nom, courriel, téléphone ni réponse de santé n’entre dans ces événements. Des identifiants aléatoires servent à estimer les visites; ils ne sont pas liés à ton compte.</p>
          <label className="mt-3 flex min-h-11 items-center gap-3 text-sm"><input className="h-5 w-5 accent-[#ed1c24]" type="checkbox" checked={measure} onChange={e => setMeasure(e.target.checked)} /> Mesure du site (facultative; identifiant conservé 30 jours)</label>
          {online && <label className="flex min-h-11 items-start gap-3 text-sm"><input className="mt-1 h-5 w-5 shrink-0 accent-[#ed1c24]" type="checkbox" checked={ads} onChange={e => setAds(e.target.checked)} /><span>Publicités Meta (facultatives). Meta reçoit des événements et des informations techniques, dont l’adresse IP et des témoins, mais pas les réponses du quiz. <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="underline">Politique de Meta</a></span></label>}
          <p className="mt-2 text-xs text-white/60">Refuser ne change pas ton accès. Les choix sont conservés 180 jours et révocables avec « Confidentialité ». Le suivi privé conserve les événements anonymes 90 jours; les demandes de contact sont traitées séparément.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="min-h-11 rounded-lg border border-white/40 px-5 py-3 text-sm font-bold" type="button" onClick={() => save(true)}>Tout refuser</button>
          <button className="min-h-11 rounded-lg border border-white/40 bg-[#ed1c24] px-5 py-3 text-sm font-bold" type="button" onClick={() => save()}>Enregistrer mes choix</button>
          {settings && <button className="min-h-11 px-3 py-3 text-sm underline" type="button" onClick={() => setSettings(false)}>Fermer</button>}
        </div>
      </div>
    </section>
  ) : <button type="button" className="online-consent-trigger fixed bottom-3 left-3 z-[90] min-h-11 rounded-lg border border-white/25 bg-[#101d2d] px-3 py-2 text-xs text-white/80" onClick={() => setSettings(true)}>Confidentialité</button>;
}
