import { Link } from "@/online/lib/navigation.tsx";
import { CheckCircle, LoaderCircle, ShieldAlert, ExternalLink, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getPageParameters } from "@/online/lib/pageParameters";

const formatAmount = (amount: number | null | undefined, currency: string | null | undefined) => {
  if (typeof amount !== "number") return null;
  try {
    return new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: (currency || "CAD").toUpperCase(),
    }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} $`;
  }
};

const formatStripeDate = (timestamp: number | null | undefined) => {
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const productLabel = (kind: string | null | undefined) => {
  switch (kind) {
    case "programme":
      return "Programme tout-en-un";
    case "community_founder":
      return "Communauté ADM — tarif fondateur";
    case "community_regular":
      return "Communauté ADM";
    default:
      return null;
  }
};

export default function PaymentsPage() {
  const sessionId = getPageParameters().get("session_id") || "";
  const paymentSummary = trpc.onlinePayments.getPaymentSummary.useQuery(
    { checkoutSessionId: sessionId },
    { enabled: Boolean(sessionId), retry: false },
  );

  const createPortalSession = trpc.onlinePayments.createCustomerPortalSession.useMutation({
    onSuccess: (session) => {
      if (!session?.url) {
        toast.error("Le portail client n’est pas disponible pour cette session.");
        return;
      }
      window.open(session.url, "_blank", "noopener,noreferrer");
    },
    onError: () => {
      toast.error("Le portail client n’est pas disponible pour cette session.");
    },
  });

  const summary = paymentSummary.data;
  const kind = summary?.product;
  const canOpenPortal = summary?.portalAvailable === true;
  const amount = formatAmount(summary?.amountTotal, summary?.currency);
  const createdAt = formatStripeDate(summary?.createdAt);
  const trialEnd = formatStripeDate(summary?.trialEnd);
  const status = summary?.subscriptionStatus ?? summary?.paymentStatus ?? summary?.checkoutStatus;

  const openCustomerPortal = () => {
    if (!sessionId) return;
    createPortalSession.mutate({ checkoutSessionId: sessionId });
  };

  return (
    <div className="min-h-screen bg-online-navy flex items-center py-12">
      <main className="container">
        <section className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 sm:p-12">
          <div className="text-center mb-8">
            <ReceiptText className="mx-auto text-online-cta-red mb-4" size={42} />
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">Mes achats</h1>
            <p className="font-body text-white/55">Les détails disponibles pour cette session Stripe.</p>
          </div>

          {!sessionId ? (
            <div className="text-center">
              <ShieldAlert className="mx-auto text-online-cta-red mb-4" size={38} />
              <p className="font-body text-white/55">Utilise le lien reçu après ton paiement pour consulter cet achat.</p>
            </div>
          ) : paymentSummary.isPending ? (
            <div className="text-center py-8">
              <LoaderCircle className="mx-auto text-online-cta-red mb-4 animate-spin" size={40} />
              <p className="font-body text-white/55">Chargement des détails de ton achat…</p>
            </div>
          ) : paymentSummary.isError || !summary ? (
            <div className="text-center py-4">
              <ShieldAlert className="mx-auto text-online-cta-red mb-4" size={40} />
              <p className="font-body text-white/55">Les détails de cet achat ne sont pas disponibles.</p>
            </div>
          ) : (
            <>
              <div className="bg-online-navy/50 border border-white/10 rounded-xl divide-y divide-white/10">
                {productLabel(kind) && <DetailRow label="Achat" value={productLabel(kind)!} />}
                {summary.customerName && <DetailRow label="Nom" value={summary.customerName} />}
                {summary.customerEmail && <DetailRow label="Courriel" value={summary.customerEmail} />}
                {amount && <DetailRow label="Montant" value={amount} />}
                {createdAt && <DetailRow label="Date" value={createdAt} />}
                {status && <DetailRow label="Statut Stripe" value={status} />}
                {trialEnd && <DetailRow label="Fin de l’essai" value={trialEnd} />}
              </div>

              {canOpenPortal && (
                <div className="mt-7 text-center">
                  <button
                    type="button"
                    onClick={openCustomerPortal}
                    disabled={createPortalSession.isPending}
                    className={`inline-flex items-center gap-2 font-display font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-colors ${
                      createPortalSession.isPending
                        ? "bg-online-cta-red/50 text-white/70 cursor-wait"
                        : "bg-online-cta-red hover:bg-online-cta-red-hover text-white"
                    }`}
                  >
                    {createPortalSession.isPending ? "Ouverture du portail…" : "Gérer mon abonnement"}
                    {!createPortalSession.isPending && <ExternalLink size={17} />}
                  </button>
                  <p className="font-body text-xs text-white/35 mt-3">
                    Le portail client Stripe permet de gérer ou d’annuler ton abonnement.
                  </p>
                </div>
              )}

              <div className="mt-7 text-center">
                <CheckCircle className="inline text-green-400 mr-2" size={16} />
                <span className="font-body text-sm text-white/45">Aucun renseignement de carte n’est affiché ici.</span>
              </div>
            </>
          )}

          <div className="text-center mt-8">
            <Link href="/online-project" className="font-body text-sm text-white/40 hover:text-white underline underline-offset-4">
              Retour à Club ADM
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4">
      <span className="font-body text-sm text-white/45">{label}</span>
      <span className="font-body text-sm text-white text-right break-all">{value}</span>
    </div>
  );
}
