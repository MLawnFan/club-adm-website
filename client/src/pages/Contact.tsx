/*
 * PAGE CONTACT — Club ADM Fitness
 * Design chaleureux: formulaire de contact, emplacements, heures d'ouverture
 * Redirige vers GHL pour le formulaire réel
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const locations = [
  {
    name: "Brossard",
    address: "9 place du commerce, Suite N",
    city: "Brossard, QC",
    phone: "450-600-2448",
    hours: "Lun-Ven: 6h-20h | Sam: 8h-12h | Dim: 9h-12h",
    mapUrl: "https://clubadm.com/centre-de-brossard/",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.5!2d-73.46!3d45.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBrossard!5e0!3m2!1sfr!2sca!4v1",
  },
  {
    name: "Chambly",
    address: "2180 boul. industriel",
    city: "Chambly, QC",
    phone: "450-600-2448",
    hours: "Lun-Ven: 6h-20h | Sam: 8h-12h | Dim: 9h-12h",
    mapUrl: "https://clubadm.com/centre-de-chambly/",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.5!2d-73.29!3d45.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sChambly!5e0!3m2!1sfr!2sca!4v1",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merci! On te contacte très bientôt.", {
      description: "Un membre de notre équipe va te répondre dans les prochaines 24h.",
    });
    // In production, this would submit to GHL
    window.open("https://clubadm.com/contact-us/", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="bg-warm-cream py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Contacte-nous
            </p>
            <h1
              className="text-navy text-5xl lg:text-7xl leading-[0.9] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ON EST LÀ<br />
              <span className="text-adm-red">POUR TOI.</span>
            </h1>
            <p className="text-navy/50 text-lg leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
              Une question? Envie de réserver ta consultation gratuite? On te répond en moins de 24h.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact form + Info */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <h2
                className="text-navy text-3xl mb-8"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ENVOIE-NOUS UN MESSAGE
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-warm-cream border-0 rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-adm-red/20"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="Ton nom"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Courriel *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-warm-cream border-0 rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-adm-red/20"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="ton@courriel.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-warm-cream border-0 rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-adm-red/20"
                      style={{ fontFamily: "var(--font-body)" }}
                      placeholder="450-000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                      Succursale
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-warm-cream border-0 rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-adm-red/20"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <option value="non-specifie">Non spécifié</option>
                      <option value="brossard">Brossard</option>
                      <option value="chambly">Chambly</option>
                      <option value="en-ligne">Programmation en ligne</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy/40 mb-2" style={{ fontFamily: "var(--font-body)" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-cream border-0 rounded-xl text-sm text-navy focus:outline-none focus:ring-2 focus:ring-adm-red/20 resize-none"
                    style={{ fontFamily: "var(--font-body)" }}
                    placeholder="Comment est-ce qu'on peut t'aider?"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-adm-red text-white text-sm font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <Send size={16} />
                  Envoyer
                </button>
              </form>
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Quick contact */}
              <div className="bg-warm-cream rounded-2xl p-7">
                <h3 className="text-navy text-xl mb-5" style={{ fontFamily: "var(--font-display)" }}>
                  CONTACT RAPIDE
                </h3>
                <div className="space-y-4">
                  <a href="tel:4506002448" className="flex items-center gap-3 text-navy/60 hover:text-adm-red transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center group-hover:bg-adm-red/10 transition-colors">
                      <Phone size={16} className="text-adm-red" />
                    </div>
                    <div>
                      <span className="block text-xs text-navy/30 uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-body)" }}>Téléphone</span>
                      <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>450-600-2448</span>
                    </div>
                  </a>
                  <a href="mailto:info@clubadm.com" className="flex items-center gap-3 text-navy/60 hover:text-adm-red transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center group-hover:bg-adm-red/10 transition-colors">
                      <Mail size={16} className="text-adm-red" />
                    </div>
                    <div>
                      <span className="block text-xs text-navy/30 uppercase tracking-wider font-bold" style={{ fontFamily: "var(--font-body)" }}>Courriel</span>
                      <span className="text-sm font-medium" style={{ fontFamily: "var(--font-body)" }}>info@clubadm.com</span>
                    </div>
                  </a>
                </div>
                <div className="flex gap-3 mt-6">
                  <a href="https://www.instagram.com/clubadm/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy/30 hover:text-adm-red hover:bg-adm-red/10 transition-all">
                    <Instagram size={16} />
                  </a>
                  <a href="https://www.facebook.com/clubadm/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy/30 hover:text-adm-red hover:bg-adm-red/10 transition-all">
                    <Facebook size={16} />
                  </a>
                </div>
              </div>

              {/* Consultation gratuite CTA */}
              <div className="rounded-2xl p-7 text-white" style={{ backgroundColor: "#232862" }}>
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  CONSULTATION GRATUITE
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5" style={{ fontFamily: "var(--font-body)" }}>
                  La meilleure façon de commencer, c'est de jaser. Réserve ta consultation gratuite et on va bâtir un plan ensemble.
                </p>
                <a
                  href="https://clubadm.com/contact-us/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-adm-red text-white text-xs font-bold uppercase tracking-wider hover:bg-adm-red-hover transition-colors rounded-lg"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Réserver
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-warm-cream py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-adm-red text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ fontFamily: "var(--font-body)" }}>
              Viens nous voir
            </p>
            <h2
              className="text-navy text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              NOS EMPLACEMENTS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((loc, i) => (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Map placeholder */}
                <div className="h-48 bg-navy/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-adm-red mx-auto mb-2" />
                    <a
                      href={loc.mapUrl}
                      className="text-sm text-adm-red font-bold uppercase tracking-wider hover:underline"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-navy text-2xl mb-4" style={{ fontFamily: "var(--font-display)" }}>
                    {loc.name.toUpperCase()}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="text-adm-red mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-sm text-navy/60" style={{ fontFamily: "var(--font-body)" }}>{loc.address}</span>
                        <span className="block text-sm text-navy/40" style={{ fontFamily: "var(--font-body)" }}>{loc.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={15} className="text-adm-red flex-shrink-0" />
                      <a href={`tel:${loc.phone.replace(/-/g, "")}`} className="text-sm text-navy/60 hover:text-adm-red transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                        {loc.phone}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={15} className="text-adm-red mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-navy/60" style={{ fontFamily: "var(--font-body)" }}>{loc.hours}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
