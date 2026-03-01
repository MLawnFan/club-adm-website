/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Section CTA finale: formulaire de capture de leads avec fond image.
 * Intégration GoHighLevel prévue (formulaire placeholder).
 */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CTASection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merci ! Nous vous contacterons sous peu pour votre essai gratuit.");
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-adm-navy via-[#0a0a14] to-adm-navy-deep" />

      {/* Red glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-adm-red/5 rounded-full blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-adm-red font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">
              Commencez Aujourd'hui
            </span>
            <h2 className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-6">
              PRÊT À
              <br />
              <span className="text-adm-red">CHANGER</span>
              <br />
              VOTRE VIE?
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8 font-[var(--font-body)]">
              Inscrivez-vous pour un essai gratuit de 7 jours au gym ou 14 jours
              en ligne. Aucun engagement, aucune carte de crédit requise.
              Découvrez pourquoi des centaines de personnes nous font confiance.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-white/30 text-sm font-[var(--font-body)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Aucun engagement
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Pas de carte de crédit
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Annulation facile
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 md:p-10 backdrop-blur-sm"
            >
              <h3 className="font-[var(--font-display)] text-3xl text-white mb-2">
                ESSAI GRATUIT
              </h3>
              <p className="text-white/40 text-sm mb-8 font-[var(--font-body)]">
                Remplissez le formulaire et nous vous contacterons dans les 24h.
              </p>

              <div className="flex flex-col gap-5">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:border-adm-red/50 focus:ring-1 focus:ring-adm-red/30 outline-none transition-all font-[var(--font-body)]"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="email"
                    placeholder="Votre adresse courriel"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:border-adm-red/50 focus:ring-1 focus:ring-adm-red/30 outline-none transition-all font-[var(--font-body)]"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <input
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:border-adm-red/50 focus:ring-1 focus:ring-adm-red/30 outline-none transition-all font-[var(--font-body)]"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-adm-red hover:bg-adm-red-hover text-white font-semibold tracking-wider uppercase py-6 shadow-xl shadow-adm-red/25 group mt-2"
                >
                  Démarrer Mon Essai Gratuit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <p className="text-white/20 text-xs mt-4 text-center font-[var(--font-body)]">
                En soumettant ce formulaire, vous acceptez d'être contacté par Club ADM Fitness.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
