import { Link } from "@/online/lib/navigation.tsx";
import { CheckCircle, ShieldAlert, ArrowRight } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { getPageParameters } from "@/online/lib/pageParameters";
export default function ProgramOnlyThankYouPage() {
  const sessionId = getPageParameters().get("session_id") || "";
  const verification = trpc.onlinePayments.getPaymentSummary.useQuery({ checkoutSessionId: sessionId }, { enabled: Boolean(sessionId), retry: false });
  const verified = verification.data?.accessGranted === true;
  if (!verified) return <div className="min-h-screen bg-online-navy py-20 text-white"><main className="container max-w-2xl text-center"><ShieldAlert className="mx-auto mb-5 text-online-cta-red" size={44}/><h1 className="font-display text-3xl">{sessionId && verification.isFetching ? "Vérification auprès de Stripe…" : "Confirmation d’achat requise"}</h1><p className="mt-5">Aucun accès acheté n’est confirmé à partir de ce lien.</p><Link href="/online-project/checkout" className="inline-flex mt-8 underline">Retour au paiement</Link></main></div>;
  return (
    <div className="min-h-screen bg-online-navy flex items-center py-12">
      <main className="container">
        <section className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
          <CheckCircle className="mx-auto text-green-400 mb-5" size={48} />
          <p className="font-display text-xs font-bold uppercase tracking-widest text-green-400 mb-3">Merci</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Ton programme tout-en-un t’attend.</h1>
          <p className="font-body text-white/55 leading-relaxed">
            Tu gardes ton programme Club ADM : nutrition, entraînement et habitudes de vie dans une approche complète.
          </p>
          <Link href="/online-project/programme" className="inline-flex items-center justify-center gap-3 mt-8 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display font-bold uppercase tracking-wider px-7 py-4 rounded-xl transition-colors">
            Revoir le contenu du programme <ArrowRight size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}
