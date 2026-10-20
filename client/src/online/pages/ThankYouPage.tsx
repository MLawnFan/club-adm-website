import { useEffect, useSyncExternalStore } from "react";
import { Link } from "@/online/lib/navigation.tsx";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Dumbbell,
  HeartPulse,
  LoaderCircle,
  Mail,
  ReceiptText,
  RefreshCw,
  ShieldAlert,
  Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { analyticsConsent, subscribeAnalytics, trackVerifiedUmamiPurchase } from "@/lib/marketingAnalytics";
import { getPurchaseConfirmationState } from "@/online/lib/confirmation";
import { getPageParameters } from "@/online/lib/pageParameters";
import { getAdvertisingConsent, subscribeAdvertisingConsent, trackMetaPurchase } from "@/online/lib/metaPixel";

const LOGO_URL = "/manus-storage/logo_clubadm_b62ebfde_7873f580.png";

const steps = [
  {
    number: "01",
    icon: ReceiptText,
    label: "GARDE TA CONFIRMATION",
    text: "Conserve le lien de confirmation Stripe et le courriel utilisé au paiement. Tu peux revoir les détails de ton achat en tout temps.",
  },
  {
    number: "02",
    icon: HeartPulse,
    label: "CHOISIS TON POINT DE DÉPART",
    text: "Note une seule habitude réaliste pour cette semaine : un repas plus structuré, une séance planifiée ou un coucher plus régulier.",
  },
  {
    number: "03",
    icon: Users,
    label: "PRENDS CONTACT AVEC LE TEAM ADM",
    text: "Demande à l’équipe comment recevoir les documents et accéder à la communauté. L’envoi automatique n’est pas encore branché sur ce site.",
  },
];

type ConfirmedPurchaseProps = {
  customerName: string | null;
  customerEmail: string | null;
  sessionId: string;
  amountTotal: number | null;
  currency: string | null;
};

export function ConfirmedPurchase({ customerName, customerEmail, sessionId, amountTotal, currency }: ConfirmedPurchaseProps) {
  const firstName = customerName?.trim().split(/\s+/)[0] || "";
  const checkoutParameters = new URLSearchParams();
  if (customerName) checkoutParameters.set("prenom", customerName);
  if (customerEmail) checkoutParameters.set("courriel", customerEmail);
  checkoutParameters.set("achat", sessionId);
  const upsellHref = `/upsell${checkoutParameters.toString() ? `?${checkoutParameters.toString()}` : ""}`;
  const purchasesHref = `/online-project/mes-achats?session_id=${encodeURIComponent(sessionId)}`;
  const amountPaid = amountTotal !== null && currency
    ? new Intl.NumberFormat("fr-CA", { style: "currency", currency: currency.toUpperCase() }).format(amountTotal / 100)
    : null;

  return (
    <>
      <main id="contenu" className="relative z-10">
        <section className="container max-w-6xl mx-auto pt-12 pb-12 sm:pt-16 sm:pb-16">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-12 lg:gap-16">
            <div className="max-w-[660px]">
              <div className="confirmation-enter confirmation-enter-1 flex items-center gap-3 mb-8">
                <span className="h-px w-9 bg-online-cta-red" aria-hidden="true" />
                <span className="font-display text-xs font-bold tracking-[0.22em] text-online-cta-red uppercase">
                  Une première étape de faite
                </span>
              </div>

              <div className="confirmation-enter confirmation-enter-2 flex items-center gap-7 mb-8 sm:mb-9">
                <div className="confirmation-success-mark relative grid h-[104px] w-[104px] sm:h-[124px] sm:w-[124px] place-items-center shrink-0 rounded-full border border-emerald-400/45 bg-emerald-400/[0.07]" aria-hidden="true">
                  <span className="absolute inset-[10px] rounded-full border border-emerald-400/25" />
                  <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-[70px] sm:h-[70px] text-emerald-300" fill="none" aria-hidden="true">
                    <path className="confirmation-check-path" d="M14 33L27 45L51 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div role="status" aria-live="polite" className="border-l border-white/15 pl-5 sm:pl-7">
                  <p className="text-emerald-300 font-display text-xs sm:text-sm font-bold tracking-[0.14em] uppercase">Paiement confirmé</p>
                  <p className="text-white/45 font-body text-sm mt-1">Vérifié auprès de Stripe</p>
                </div>
              </div>

              <h1 className="confirmation-enter confirmation-enter-3 text-white font-display font-bold text-[clamp(3.25rem,7vw,6.6rem)] leading-[0.98] tracking-[-0.025em]">
                {firstName ? <>BIEN JOUÉ, <span className="text-online-cta-red">{firstName}.</span></> : <>BIEN JOUÉ<span className="text-online-cta-red">.</span></>}
                <span className="block mt-2">ON AVANCE POUR VRAI.</span>
              </h1>
              <p className="confirmation-enter confirmation-enter-4 mt-7 max-w-xl text-white/65 font-body text-lg sm:text-xl leading-relaxed">
                Ton programme tout-en-un est acheté. Maintenant, on bâtit la suite une habitude à la fois : nutrition, entraînement et habitudes de vie, avec le Team ADM.
              </p>
              <div className="confirmation-enter confirmation-enter-5 mt-8 flex flex-wrap items-center gap-3">
                <a href="#prochaines-etapes" className="inline-flex items-center justify-center gap-3 bg-online-cta-red px-6 py-4 text-white font-display font-bold tracking-wide uppercase transition-transform duration-150 active:scale-[0.97] hover:bg-online-cta-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  Voir mes prochaines étapes <ArrowRight size={18} aria-hidden="true" />
                </a>
                <Link href={purchasesHref} className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-white/70 font-body underline underline-offset-4 decoration-white/30 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Détails de mon achat <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="confirmation-enter confirmation-enter-4 relative lg:pl-6">
              <div className="absolute -top-4 -left-1 h-[2px] w-24 bg-online-cta-red lg:left-5" aria-hidden="true" />
              <div className="relative overflow-hidden border border-white/15 bg-[#101d2d] shadow-[0_28px_80px_rgba(0,0,0,0.25)]">
                <div className="absolute right-0 top-0 h-[220px] w-[220px] bg-[radial-gradient(circle,rgba(216,27,55,0.15),transparent_68%)] pointer-events-none" aria-hidden="true" />
                <div className="relative border-b border-white/10 px-6 py-6 sm:px-8 flex items-center justify-between gap-5">
                  <div>
                    <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-white/45">Ton achat · Club ADM</p>
                    <h2 className="font-display text-2xl sm:text-[1.7rem] font-bold text-white mt-2">TON POINT DE DÉPART</h2>
                  </div>
                  <span className="grid h-11 w-11 place-items-center bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 shrink-0" aria-hidden="true"><CheckCircle2 size={21} /></span>
                </div>
                <div className="relative px-6 py-7 sm:px-8">
                  <div className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-6">
                    <span className="font-body text-white/60 text-sm">Programme tout-en-un</span>
                    {amountPaid && <span className="font-display text-3xl sm:text-[2.4rem] leading-none font-bold text-white whitespace-nowrap">{amountPaid}</span>}
                  </div>
                  <div className="grid gap-4 py-6 border-b border-white/10">
                    <div className="flex items-start gap-3"><Dumbbell size={18} className="shrink-0 text-online-cta-red mt-0.5" aria-hidden="true" /><span className="font-body text-white/75 text-sm">Nutrition + programmation d’entraînement</span></div>
                    <div className="flex items-start gap-3"><HeartPulse size={18} className="shrink-0 text-online-cta-red mt-0.5" aria-hidden="true" /><span className="font-body text-white/75 text-sm">Habitudes de vie et approche durable</span></div>
                    <div className="flex items-start gap-3"><Users size={18} className="shrink-0 text-online-cta-red mt-0.5" aria-hidden="true" /><span className="font-body text-white/75 text-sm">30 jours de communauté compris dans l’offre</span></div>
                  </div>
                  <div className="mt-6 flex items-start gap-3 bg-emerald-400/[0.07] border-l-[3px] border-emerald-400 px-4 py-3.5">
                    <Check size={16} className="shrink-0 text-emerald-300 mt-0.5" aria-hidden="true" />
                    <p className="font-body text-sm text-white/70 leading-snug">Paiement unique confirmé. <strong className="font-semibold text-white">Aucun abonnement mensuel</strong> n’a été déclenché par cet achat.</p>
                  </div>
                  {customerEmail && <p className="mt-5 font-body text-xs text-white/45 break-all">Courriel utilisé : <span className="text-white/75">{customerEmail}</span></p>}
                </div>
                <div className="h-1.5 bg-[repeating-linear-gradient(125deg,#db1738_0,#db1738_8px,#12263a_8px,#12263a_16px)]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        <section id="prochaines-etapes" className="scroll-mt-8 border-t border-white/10 bg-[#101c2b]/75 py-14 sm:py-20">
          <div className="container max-w-6xl mx-auto">
            <div className="max-w-2xl mb-10 sm:mb-12">
              <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-online-cta-red mb-4">Un départ simple, pas parfait</p>
              <h2 className="font-display font-bold text-white text-4xl sm:text-5xl leading-tight">LA SUITE, EN 3 GESTES.</h2>
              <p className="font-body text-white/60 text-base sm:text-lg mt-4">Pas besoin de tout changer aujourd’hui. Voici ce que tu peux faire maintenant.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.number} className="relative border border-white/10 bg-white/[0.035] p-6 sm:p-7 min-h-[245px]">
                    <span className="absolute top-0 left-0 w-14 h-[3px] bg-online-cta-red" aria-hidden="true" />
                    <div className="flex items-center justify-between mb-9">
                      <span className="font-display text-4xl font-bold text-white/20 leading-none" aria-hidden="true">{step.number}</span>
                      <Icon size={24} className="text-online-cta-red" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-3">{step.label}</h3>
                    <p className="font-body text-sm sm:text-[15px] leading-relaxed text-white/60">{step.text}</p>
                    {step.number === "03" && <a href="/contact" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-white underline decoration-online-cta-red underline-offset-4 hover:text-online-cta-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contacter le Team ADM <ArrowUpRight size={15} aria-hidden="true" /></a>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="container max-w-6xl mx-auto py-12 sm:py-16">
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] items-center border border-white/15 bg-gradient-to-r from-[#1a293b] to-[#111d2d] p-7 sm:p-10">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-online-cta-red" aria-hidden="true" />
            <div>
              <p className="font-display text-xs font-bold tracking-[0.18em] uppercase text-emerald-300 mb-3">À toi de choisir la suite</p>
              <h2 className="font-display font-bold text-white text-2xl sm:text-3xl">LA COMMUNAUTÉ, À TON RYTHME.</h2>
              <p className="font-body text-white/65 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                Tes 30 jours de communauté font partie de l’offre à 39 $. Si tu veux garder le soutien du groupe après l’essai, tu peux découvrir le tarif fondateur à 49 $/mois. C’est optionnel et annulable en tout temps.
              </p>
            </div>
            <Link href={upsellHref} className="inline-flex items-center justify-center gap-2 border border-white/30 px-5 py-3.5 text-white font-display font-bold uppercase tracking-wide text-sm hover:bg-white/10 transition-colors duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:whitespace-nowrap">
              Voir l’option fondateur <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-body text-white/50">
            <Link href="/online-project/programme" className="inline-flex items-center gap-2 hover:text-white underline underline-offset-4 decoration-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Revoir le contenu du programme <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link href={purchasesHref} className="inline-flex items-center gap-2 hover:text-white underline underline-offset-4 decoration-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Consulter les détails du paiement <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t border-white/10 py-6">
        <div className="container max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-body text-xs text-white/35">
          <span>© {new Date().getFullYear()} Club ADM Fitness</span>
          <span>On avance une habitude à la fois.</span>
        </div>
      </footer>
    </>
  );
}

export default function ThankYouPage() {
  const sessionId = getPageParameters().get("session_id") || "";
  const measurementConsent = useSyncExternalStore(subscribeAnalytics, analyticsConsent, () => null);
  const advertisingConsent = useSyncExternalStore(subscribeAdvertisingConsent, getAdvertisingConsent, () => null);
  const verification = trpc.onlinePayments.getPaymentSummary.useQuery(
    { checkoutSessionId: sessionId },
    { enabled: Boolean(sessionId), retry: false },
  );
  const confirmationState = getPurchaseConfirmationState({
    sessionId,
    isPending: verification.isPending,
    isError: verification.isError,
    accessGranted: verification.data?.accessGranted,
    product: verification.data?.product,
  });
  useEffect(() => {
    if (confirmationState === "success" && advertisingConsent === "accepted" && verification.data) {
      void trackMetaPurchase(verification.data);
    }
  }, [confirmationState, advertisingConsent, verification.data]);

  useEffect(() => { if (verification.data && measurementConsent === "accepted") void trackVerifiedUmamiPurchase(verification.data); }, [verification.data, measurementConsent]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#152535] text-white">
      <div className="absolute left-0 top-0 h-[700px] w-full pointer-events-none bg-[radial-gradient(ellipse_at_70%_18%,rgba(183,30,56,0.1),transparent_57%)]" aria-hidden="true" />
      <header className="relative z-10 border-b border-white/10">
        <div className="container max-w-6xl mx-auto py-5 flex items-center justify-between gap-4">
          <Link href="/online-project" aria-label="Club ADM — retour à l’accueil" className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <img src={LOGO_URL} alt="Club ADM Fitness" className="h-11 sm:h-12 w-auto brightness-0 invert" />
          </Link>
          <div className="flex items-center gap-2 text-white/45 font-display text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase"><CheckCircle2 size={15} className="text-emerald-300" aria-hidden="true" />Paiement sécurisé</div>
        </div>
      </header>

      {confirmationState === "missing" ? (
        <ConfirmationState
          icon="alert"
          title="On ne trouve pas ta confirmation."
          message="Aucune session Stripe n’est présente dans ce lien. Retourne au paiement si tu n’as pas terminé ton achat."
          href="/online-project/checkout"
          action="Retour au paiement"
        />
      ) : confirmationState === "loading" ? (
        <ConfirmationState
          icon="loading"
          title="On vérifie ton paiement."
          message="On confirme ta session auprès de Stripe avant d’afficher ta confirmation."
        />
      ) : confirmationState === "failed" ? (
        <ConfirmationState
          icon="alert"
          title="Ce paiement n’est pas encore confirmé."
          message="Si tu viens juste de terminer chez Stripe, attends quelques secondes et réessaie. Sinon, vérifie les détails de ta session."
          href={`/online-project/mes-achats?session_id=${encodeURIComponent(sessionId)}`}
          action="Voir les détails disponibles"
          onRetry={() => verification.refetch()}
          retrying={verification.isFetching}
        />
      ) : (
        <ConfirmedPurchase
          customerName={verification.data!.customerName}
          customerEmail={verification.data!.customerEmail}
          sessionId={sessionId}
          amountTotal={verification.data!.amountTotal}
          currency={verification.data!.currency}
        />
      )}
    </div>
  );
}

type ConfirmationStateProps = {
  icon: "alert" | "loading";
  title: string;
  message: string;
  href?: string;
  action?: string;
  onRetry?: () => void;
  retrying?: boolean;
};

function ConfirmationState({ icon, title, message, href, action, onRetry, retrying }: ConfirmationStateProps) {
  return (
    <main id="contenu" className="relative z-10 container py-20 sm:py-28">
      <section role="status" aria-live="polite" className="mx-auto max-w-2xl border border-white/10 bg-white/[0.035] p-8 sm:p-12 text-center">
        <div className="mx-auto mb-7 grid h-16 w-16 place-items-center border border-online-cta-red/35 bg-online-cta-red/[0.08] text-online-cta-red">
          {icon === "loading" ? <LoaderCircle size={32} className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <ShieldAlert size={32} aria-hidden="true" />}
        </div>
        <p className="font-display text-online-cta-red text-xs font-bold tracking-[0.18em] uppercase mb-4">Club ADM · Paiement</p>
        <h1 className="font-display text-3xl sm:text-5xl text-white font-bold mb-5">{title}</h1>
        <p className="font-body text-white/65 text-base sm:text-lg max-w-lg mx-auto">{message}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          {onRetry && <button type="button" onClick={onRetry} disabled={retrying} className="inline-flex items-center gap-2 bg-online-cta-red hover:bg-online-cta-red-hover px-6 py-3.5 font-display font-bold uppercase tracking-wide text-sm text-white disabled:opacity-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><RefreshCw size={16} aria-hidden="true" />{retrying ? "Vérification…" : "Réessayer"}</button>}
          {href && action && <Link href={href} className="inline-flex items-center gap-2 border border-white/25 px-6 py-3.5 font-display font-bold uppercase tracking-wide text-sm text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><CircleHelp size={16} aria-hidden="true" />{action}</Link>}
        </div>
        {icon !== "loading" && <p className="mt-9 flex items-center justify-center gap-2 text-white/40 text-sm font-body"><Mail size={15} aria-hidden="true" />Garde ton courriel de paiement à portée de main.</p>}
      </section>
    </main>
  );
}
