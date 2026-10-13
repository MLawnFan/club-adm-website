import { Link } from "@/online/lib/navigation.tsx";
import { CheckCircle, LoaderCircle, ShieldAlert, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { getPageParameters } from "@/online/lib/pageParameters";

export default function CommunityConfirmedPage() {
  const sessionId = getPageParameters().get("session_id") || "";
  const verification = trpc.onlinePayments.getPaymentSummary.useQuery(
    { checkoutSessionId: sessionId },
    { enabled: Boolean(sessionId), retry: false },
  );
  const isVerifiedFounder = verification.data?.accessGranted && verification.data?.product === "community_founder";
  const trialEnd = verification.data?.trialEnd;
  const chargeDate = trialEnd ? new Intl.DateTimeFormat("fr-CA", {
    dateStyle: "long", timeStyle: "short", timeZone: "America/Toronto",
  }).format(new Date(trialEnd * 1000)) : null;

  return (
    <div className="min-h-screen bg-online-navy flex items-center py-12">
      <main className="container">
        <section className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
          {!sessionId ? (
            <>
              <ShieldAlert className="mx-auto text-online-cta-red mb-5" size={44} />
              <h1 className="font-display text-3xl font-bold text-white mb-3">Session de paiement introuvable</h1>
              <p className="font-body text-white/55">Utilise le lien de retour reçu après ton inscription Stripe.</p>
            </>
          ) : verification.isPending ? (
            <>
              <LoaderCircle className="mx-auto text-online-cta-red mb-5 animate-spin" size={44} />
              <h1 className="font-display text-3xl font-bold text-white mb-3">Confirmation de ton abonnement</h1>
              <p className="font-body text-white/55">On vérifie ta session Stripe.</p>
            </>
          ) : verification.isError || !isVerifiedFounder ? (
            <>
              <ShieldAlert className="mx-auto text-online-cta-red mb-5" size={44} />
              <h1 className="font-display text-3xl font-bold text-white mb-3">On n’a pas pu confirmer cet abonnement</h1>
              <p className="font-body text-white/55">Consulte tes achats pour voir les détails disponibles pour cette session.</p>
              <Link href={`/online-project/mes-achats?session_id=${encodeURIComponent(sessionId)}`} className="inline-flex mt-7 text-online-cta-red hover:text-white font-display font-bold underline underline-offset-4">
                Voir mes achats
              </Link>
            </>
          ) : (
            <>
              <CheckCircle className="mx-auto text-green-400 mb-5" size={48} />
              <p className="font-display text-xs font-bold uppercase tracking-widest text-green-400 mb-3">Abonnement confirmé</p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">On continue ensemble.</h1>
              <p className="font-body text-white/55 leading-relaxed">
                Ton choix de continuer au tarif fondateur est confirmé. La période déjà incluse dans ton achat ne recommence pas.
                {chargeDate ? <> Premier prélèvement prévu le <strong className="text-white">{chargeDate} (heure de Toronto)</strong>, puis 49 $ par mois.</> : " Vérifie la date exacte de ton premier prélèvement dans ta confirmation Stripe avant de poursuivre."}
                {" "}Tu peux annuler en tout temps.
              </p>
              <Link href={`/online-project/merci-programme?session_id=${encodeURIComponent(sessionId)}`} className="inline-flex items-center justify-center gap-3 mt-8 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display font-bold uppercase tracking-wider px-7 py-4 rounded-xl transition-colors">
                Accéder à mon programme <ArrowRight size={18} />
              </Link>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
