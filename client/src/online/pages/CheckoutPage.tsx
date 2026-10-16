import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  CheckCircle,
  ArrowRight,
  CreditCard,
  Gift,
  Users,
  Dumbbell,
  Apple,
  Brain,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { getPageParameters } from "@/online/lib/pageParameters";
import { trackMetaInitiateCheckout } from "@/online/lib/metaPixel";
import {
  closeStripePopup,
  createStripePopup,
  redirectToStripeCheckout,
  type StripePopup,
} from "@/online/lib/stripeWindow";

const LOGO_URL = "/manus-storage/logo_clubadm_b62ebfde_7873f580.png";

export default function CheckoutPage() {
  const params = getPageParameters();
  const configuration = trpc.onlinePayments.configuration.useQuery(undefined, { retry: false });
  const checkoutEnabled = configuration.data?.checkoutEnabled === true;
  const [customerName, setCustomerName] = useState(params.get("prenom") || "");
  const [customerEmail, setCustomerEmail] = useState(params.get("courriel") || "");
  const stripeWindowRef = useRef<StripePopup | null>(null);

  const createCheckoutSession = trpc.onlinePayments.createCheckoutSession.useMutation({
    onSuccess: (session) => {
      if (!session?.url) {
        closeStripePopup(stripeWindowRef.current);
        stripeWindowRef.current = null;
        toast.error("Impossible d’ouvrir le paiement sécurisé. Réessaie dans un instant.");
        return;
      }
      void trackMetaInitiateCheckout(session.checkoutSessionId);
      redirectToStripeCheckout(stripeWindowRef.current, session.url);
      stripeWindowRef.current = null;
    },
    onError: () => {
      closeStripePopup(stripeWindowRef.current);
      stripeWindowRef.current = null;
      toast.error("Impossible d’ouvrir le paiement sécurisé. Réessaie dans un instant.");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkoutEnabled) { toast.error("Paiement non activé dans cette version."); return; }
    stripeWindowRef.current = createStripePopup();
    toast.message("Ouverture du paiement sécurisé Stripe…");
    createCheckoutSession.mutate({
      product: "programme",
      name: customerName.trim(),
      email: customerEmail.trim(),
    });
  };

  const processing = createCheckoutSession.isPending;

  return (
    <div className="min-h-screen bg-online-navy">
      <header className="py-5 border-b border-white/5">
        <div className="container flex items-center justify-between">
          <img src={LOGO_URL} alt="Club ADM" className="h-10 brightness-0 invert" />
          <div className="flex items-center gap-2 text-white/40 font-body text-xs">
            <Lock size={12} />
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </header>

      <main className="py-10 sm:py-14">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Finalise ta commande
              </h1>
              <p className="font-body text-base text-white/50">
                Un paiement unique de 39 $ CAD. La personnalisation nutritionnelle nécessite un profil et une validation humaine.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-3"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!checkoutEnabled && <p role="status" className="border-l-4 border-amber-400 bg-amber-400/10 p-4 text-sm text-amber-100">Paiement non activé dans cette version. Le checkout Stripe est préparé, mais aucun achat ne peut être effectué ici tant que la configuration n’est pas validée.</p>}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8">
                    <h2 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-5">
                      Tes informations
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkout-name" className="block font-body text-xs text-white/40 mb-1.5">
                          Nom complet
                        </label>
                        <input
                          id="checkout-name"
                          type="text"
                          value={customerName}
                          onChange={(event) => setCustomerName(event.target.value)}
                          placeholder="Ton nom"
                          autoComplete="name"
                          required
                          disabled={processing}
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 font-body text-base text-white placeholder:text-white/20 focus:border-online-cta-red/50 focus:ring-1 focus:ring-online-cta-red/30 outline-none transition-all disabled:opacity-60"
                        />
                      </div>
                      <div>
                        <label htmlFor="checkout-email" className="block font-body text-xs text-white/40 mb-1.5">
                          Courriel
                        </label>
                        <input
                          id="checkout-email"
                          type="email"
                          value={customerEmail}
                          onChange={(event) => setCustomerEmail(event.target.value)}
                          placeholder="ton@courriel.com"
                          autoComplete="email"
                          inputMode="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          required
                          disabled={processing}
                          className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 font-body text-base text-white placeholder:text-white/20 focus:border-online-cta-red/50 focus:ring-1 focus:ring-online-cta-red/30 outline-none transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-online-cta-red/10 p-3 text-online-cta-red shrink-0">
                        <CreditCard size={22} />
                      </div>
                      <div>
                        <h2 className="font-display text-sm font-bold text-white/70 uppercase tracking-wider mb-2">
                          Paiement avec Stripe
                        </h2>
                        <p className="font-body text-sm leading-relaxed text-white/50">
                          Après avoir cliqué, tu seras redirigé vers Stripe pour saisir tes renseignements de carte.
                          Ils sont saisis directement chez Stripe et ne passent jamais par le site Club ADM.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing || !checkoutEnabled}
                    className={`w-full flex items-center justify-center gap-3 font-display text-lg font-bold uppercase tracking-wider px-4 sm:px-10 py-4 sm:py-5 rounded-xl transition-all duration-300 ${
                      processing
                        ? "bg-online-cta-red/50 text-white/70 cursor-wait"
                        : "bg-online-cta-red hover:bg-online-cta-red-hover text-white cta-pulse"
                    }`}
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Ouverture de Stripe…
                      </>
                    ) : (
                      <>
                        <Lock size={18} className="shrink-0" />
                        Continuer vers Stripe — 39 $
                        <ArrowRight size={18} className="shrink-0" />
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 font-body text-xs">
                    <span className="flex items-center gap-1.5"><Lock size={11} /> Chiffrement SSL 256-bit</span>
                    <span className="flex items-center gap-1.5"><Shield size={11} /> Garantie 30 jours</span>
                    <span className="flex items-center gap-1.5"><CreditCard size={11} /> Paiement géré par Stripe</span>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 lg:sticky lg:top-24">
                  <h2 className="font-display text-sm font-bold text-white/60 uppercase tracking-wider mb-5">
                    Récapitulatif
                  </h2>

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: <Apple size={16} />, label: "Plan nutritionnel personnalisé", value: "97 $" },
                      { icon: <Dumbbell size={16} />, label: "Programmation d’entraînement", value: "97 $" },
                      { icon: <Brain size={16} />, label: "Guide habitudes de vie", value: "47 $" },
                      { icon: <Gift size={16} />, label: "Guide gratuit 21 pages", value: "27 $", free: true },
                      { icon: <Users size={16} />, label: "30 jours communauté ADM", value: "70 $" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className={item.free ? "text-green-400" : "text-white/30"}>{item.icon}</span>
                          <span className={`font-body text-sm ${item.free ? "text-green-300 font-semibold" : "text-white/70"}`}>
                            {item.label}
                          </span>
                        </div>
                        <span className="font-body text-xs text-white/25 line-through shrink-0">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm text-white/40">Valeur totale</span>
                      <span className="font-body text-sm text-white/30 line-through">338 $</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-sm text-white/40">Rabais</span>
                      <span className="font-body text-sm text-green-400">-299 $</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-online-cta-red/30 pt-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold text-white">Total aujourd’hui</span>
                      <span className="font-display text-3xl font-bold text-online-cta-red">39 $</span>
                    </div>
                    <p className="font-body text-xs text-white/30 mt-1">Paiement unique — aucun abonnement</p>
                  </div>

                  <div className="bg-green-500/5 border border-green-500/15 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield size={18} className="text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-display text-xs font-bold text-green-400 uppercase tracking-wider mb-1">
                          Garantie 30 jours
                        </p>
                        <p className="font-body text-xs text-white/40 leading-relaxed">
                          Si tu n’es pas satisfait, on te rembourse intégralement. Aucune question posée.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-online-cta-red/5 border border-online-cta-red/15 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Gift size={18} className="text-online-cta-red shrink-0 mt-0.5" />
                      <div>
                        <p className="font-display text-xs font-bold text-online-cta-red uppercase tracking-wider mb-1">
                          Bonus inclus
                        </p>
                        <p className="font-body text-xs text-white/40 leading-relaxed">
                          30 jours gratuits à la communauté ADM sont inclus avec ton programme.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-white/5">
        <div className="container text-center">
          <p className="font-body text-xs text-white/20">
            © {new Date().getFullYear()} Club ADM Fitness. Tous droits réservés. Paiement sécurisé par Stripe.
          </p>
        </div>
      </footer>
    </div>
  );
}
