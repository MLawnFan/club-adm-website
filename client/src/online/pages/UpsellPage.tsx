import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Lock, MessageCircle, Shield, Users } from "lucide-react";
import { Link } from "@/online/lib/navigation.tsx";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import FounderTimeline from "@/online/components/FounderTimeline";
import { getPageParameters } from "@/online/lib/pageParameters";
import {
  closeStripePopup,
  createStripePopup,
  redirectToStripeCheckout,
  type StripePopup,
} from "@/online/lib/stripeWindow";

const LOGO_URL = "/manus-storage/logo_clubadm_b62ebfde_7873f580.png";
const TEAM_GROUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/2RxvNFK4C99d4EGkajeXvG/team-adm-group_e5f4805d.webp";

function dateDeFacturation(unixSeconds: number) {
  return new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Toronto",
  }).format(new Date(unixSeconds * 1000));
}

export default function UpsellPage() {
  const params = getPageParameters();
  const purchaseSessionId = params.get("achat") ?? "";
  const [prenom, setPrenom] = useState(params.get("prenom") ?? "");
  const [courriel, setCourriel] = useState(params.get("courriel") ?? "");
  const stripeWindowRef = useRef<StripePopup | null>(null);
  const offer = trpc.onlinePayments.founderOffer.useQuery(
    { purchaseSessionId },
    { enabled: Boolean(purchaseSessionId), retry: false },
  );
  const checkout = trpc.onlinePayments.createCheckoutSession.useMutation({
    onSuccess: (session) => {
      redirectToStripeCheckout(stripeWindowRef.current, session.url);
      stripeWindowRef.current = null;
    },
    onError: () => {
      closeStripePopup(stripeWindowRef.current);
      stripeWindowRef.current = null;
      toast.error("On n'a pas pu confirmer les conditions de ton offre. Recharge la page ou écris au Team ADM.");
      void offer.refetch();
    },
  });
  const trialEnd = offer.data?.eligible ? offer.data.trialEnd : null;
  const firstChargeDate = trialEnd ? dateDeFacturation(trialEnd) : null;

  function openFounderCheckout() {
    if (!offer.data?.eligible || !trialEnd) return;
    if (!prenom.trim() || !courriel.trim()) {
      toast.error("Confirme ton nom et ton courriel avant de continuer.");
      return;
    }
    stripeWindowRef.current = createStripePopup();
    toast.message("Ouverture du paiement sécurisé Stripe…");
    checkout.mutate({
      product: "community_founder",
      name: prenom.trim(),
      email: courriel.trim(),
      purchaseSessionId,
    });
  }

  return (
    <div className="min-h-screen bg-online-navy text-white">
      <header className="border-b border-white/10 py-6">
        <div className="container flex items-center justify-center">
          <Link href="/online-project" aria-label="Club ADM — accueil">
            <img src={LOGO_URL} alt="Club ADM Fitness" className="h-14 sm:h-16 brightness-0 invert" />
          </Link>
        </div>
      </header>
      <main className="container max-w-5xl py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 font-display text-xs font-bold uppercase tracking-[0.2em] text-online-cta-red">
            La suite, à ton rythme
          </motion.p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05]">
            GARDE LE SOUTIEN. <span className="text-online-cta-red">CONTINUE À TON RYTHME.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg text-white/70">
            Tes 30 jours de communauté sont déjà inclus avec ton programme. Si tu veux continuer ensuite,
            tu peux choisir le tarif fondateur de 49 $/mois au lieu du tarif régulier de 70 $/mois.
            C’est facultatif et annulable en tout temps.
          </p>
        </div>

        {trialEnd && <FounderTimeline trialEnd={trialEnd} />}

        <section className="mt-12 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] items-start" aria-label="Continuer avec la communauté ADM">
          <div className="border border-white/15 bg-[#102033] p-6 sm:p-9">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-online-cta-red">Ce que tu gardes</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold">Une équipe, un groupe, une routine qui tient.</h2>
            <p className="mt-4 font-body text-white/60">Tu as déjà fait les premiers pas. La communauté te donne un endroit où poser tes questions et ajuster ton plan sans repartir de zéro.</p>
            <div className="mt-8 grid gap-5">
              <div className="flex items-start gap-3"><MessageCircle className="mt-1 shrink-0 text-online-cta-red" size={21} /><p className="font-body text-white/75"><strong className="text-white">Questions et échanges.</strong> Demande un coup de main quand une habitude accroche.</p></div>
              <div className="flex items-start gap-3"><Users className="mt-1 shrink-0 text-online-cta-red" size={21} /><p className="font-body text-white/75"><strong className="text-white">Team ADM et groupe privé.</strong> Reste entouré pour avancer à ton rythme.</p></div>
              <div className="flex items-start gap-3"><CheckCircle className="mt-1 shrink-0 text-online-cta-red" size={21} /><p className="font-body text-white/75"><strong className="text-white">Un point de repère.</strong> Garde l’accent sur nutrition, entraînement et habitudes durables.</p></div>
            </div>
            <img src={TEAM_GROUP} alt="Équipe Club ADM" className="mt-9 h-44 w-full object-cover" />
          </div>

          <div className="border-2 border-online-cta-red/50 bg-gradient-to-b from-online-cta-red/10 to-[#102033] p-6 sm:p-9">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-online-cta-red">Tarif fondateur</p>
            <div className="mt-3 flex items-end gap-3 font-display"><span className="text-6xl font-bold">49 $</span><span className="pb-2 text-white/60">/mois</span></div>
            <p className="mt-2 font-body text-sm text-white/55">Tarif régulier : 70 $/mois. Ton programme à 39 $ reste distinct.</p>
            {offer.isPending && purchaseSessionId ? (
              <p role="status" className="mt-7 border-l-4 border-online-cta-red bg-white/5 p-4 font-body">On vérifie ton achat et ta date de fin avec Stripe…</p>
            ) : firstChargeDate ? (
              <div className="mt-7 border-l-4 border-emerald-400 bg-emerald-400/10 p-5">
                <p className="font-display text-base font-bold text-emerald-300">0 $ à payer aujourd’hui.</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
                  Il reste environ {offer.data?.remainingDays} jours de ta période déjà incluse. En t’abonnant maintenant, tu gardes cet accès sans interruption.
                  <strong className="text-white"> Premier débit prévu : {firstChargeDate}, heure de Toronto.</strong>
                  {" "}Aucun nouveau 30 jours gratuit ne s’ajoute.
                </p>
              </div>
            ) : (
              <div role="status" className="mt-7 border-l-4 border-amber-400 bg-amber-400/10 p-5 font-body text-sm text-white/80">
                {offer.data?.reason === "already_subscribed"
                  ? "Tu as déjà une communauté active ou en essai. Pas besoin de reprendre un abonnement."
                  : offer.data?.reason === "period_ending"
                    ? "Ta période incluse approche de sa fin. Pour éviter un nouveau 30 jours ou un prélèvement avant la date annoncée, écris au Team ADM pour la suite."
                    : "On ne peut pas confirmer ton achat à partir de ce lien. Ouvre l’offre depuis ta page de confirmation Stripe ou écris au Team ADM."}
              </div>
            )}
            {firstChargeDate && (
              <>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div><label htmlFor="upsell-name" className="mb-1 block font-body text-sm text-white/70">Nom</label><input id="upsell-name" autoComplete="name" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-online-cta-red" /></div>
                  <div><label htmlFor="upsell-email" className="mb-1 block font-body text-sm text-white/70">Courriel utilisé à l’achat</label><input id="upsell-email" type="email" autoComplete="email" value={courriel} onChange={(e) => setCourriel(e.target.value)} className="w-full border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-online-cta-red" /></div>
                </div>
                <button type="button" onClick={openFounderCheckout} disabled={checkout.isPending} className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-online-cta-red px-5 py-4 font-display text-lg font-bold uppercase tracking-wide text-white hover:bg-online-cta-red-hover disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {checkout.isPending ? "Ouverture de Stripe…" : "Continuer au tarif fondateur"} <ArrowRight size={21} />
                </button>
                <p className="mt-4 flex items-start justify-center gap-2 font-body text-xs text-white/50"><Lock size={15} className="shrink-0" /> Vérifie la date et les conditions dans Stripe avant de confirmer.</p>
              </>
            )}
            <p className="mt-6 flex items-center justify-center gap-2 border-t border-white/15 pt-5 text-center font-body text-sm text-emerald-300"><Shield size={17} /> Annulable en tout temps. Aucun engagement.</p>
            <a href="/contact" target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-11 items-center justify-center text-center font-body text-sm text-white/60 underline underline-offset-4 hover:text-white">Une question? Parle au Team ADM.</a>
          </div>
        </section>
        <p className="mt-10 text-center font-body text-sm text-white/55">Tu peux aussi ne rien ajouter. Ton programme acheté reste à toi.</p>
        <div className="mt-3 text-center"><Link href="/online-project/programme" className="inline-flex min-h-11 items-center justify-center px-2 font-body text-sm text-white/70 underline underline-offset-4 hover:text-white">Revoir mon programme</Link></div>
      </main>
      <footer className="border-t border-white/10 py-6 text-center font-body text-xs text-white/35">© {new Date().getFullYear()} Club ADM Fitness</footer>
    </div>
  );
}
