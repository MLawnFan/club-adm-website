/*
 * PAGE CONTACT — Dark premium
 * Fond navy sombre, formulaire sombre, texte blanc/crème
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

const locations = [
  { name: "Brossard", address: "9 place du commerce, Suite N", city: "Brossard, QC", phone: "450-600-2448", hours: "Lun-Ven: 6h-20h | Sam: 8h-12h | Dim: 9h-12h", mapUrl: "https://clubadm.com/centre-de-brossard/" },
  { name: "Chambly", address: "2180 boul. industriel", city: "Chambly, QC", phone: "450-600-2448", hours: "Lun-Ven: 6h-20h | Sam: 8h-12h | Dim: 9h-12h", mapUrl: "https://clubadm.com/centre-de-chambly/" },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Merci! On te contacte très bientôt.", { description: "Un membre de notre équipe va te répondre dans les prochaines 24h." });
    window.open("https://clubadm.com/contact-us/", "_blank");
  };

  const inputStyle = "w-full px-4 py-3 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/30 placeholder:text-white/20";
  const inputBg = { backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-body)" };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f1229" }}>
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Contacte-nous</p>
            <h1 className="text-5xl lg:text-7xl leading-[0.9] mb-6 text-white" style={{ fontFamily: "var(--font-display)" }}>
              ON EST LÀ<br /><span style={{ color: "#ed1c24" }}>POUR TOI.</span>
            </h1>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
              Une question? Envie de réserver ta consultation gratuite? On te répond en moins de 24h.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact form + Info */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#0f1229" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <h2 className="text-3xl mb-8 text-white" style={{ fontFamily: "var(--font-display)" }}>ENVOIE-NOUS UN MESSAGE</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Nom complet *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputStyle} style={inputBg} placeholder="Ton nom" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Courriel *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputStyle} style={inputBg} placeholder="ton@courriel.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Téléphone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputStyle} style={inputBg} placeholder="450-000-0000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Succursale</label>
                    <select value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputStyle} style={inputBg}>
                      <option value="non-specifie">Non spécifié</option>
                      <option value="brossard">Brossard</option>
                      <option value="chambly">Chambly</option>
                      <option value="en-ligne">Programmation en ligne</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>Message *</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={`${inputStyle} resize-none`} style={inputBg} placeholder="Comment est-ce qu'on peut t'aider?" />
                </div>
                <button type="submit" className="inline-flex items-center gap-2 px-8 py-3.5 text-white text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                  <Send size={16} /> Envoyer
                </button>
              </form>
            </motion.div>

            {/* Info sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">
              <div className="rounded-xl p-7 border border-white/[0.06]" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <h3 className="text-xl mb-5 text-white" style={{ fontFamily: "var(--font-display)" }}>CONTACT RAPIDE</h3>
                <div className="space-y-4">
                  <a href="tel:4506002448" className="flex items-center gap-3 transition-colors group" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                      <Phone size={16} style={{ color: "#ed1c24" }} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-bold" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>Téléphone</span>
                      <span className="text-sm font-medium text-white/60" style={{ fontFamily: "var(--font-body)" }}>450-600-2448</span>
                    </div>
                  </a>
                  <a href="mailto:info@clubadm.com" className="flex items-center gap-3 transition-colors group" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: "rgba(237,28,36,0.1)" }}>
                      <Mail size={16} style={{ color: "#ed1c24" }} />
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider font-bold" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-body)" }}>Courriel</span>
                      <span className="text-sm font-medium text-white/60" style={{ fontFamily: "var(--font-body)" }}>info@clubadm.com</span>
                    </div>
                  </a>
                </div>
                <div className="flex gap-3 mt-6">
                  <a href="https://www.instagram.com/clubadm/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
                    <Instagram size={16} />
                  </a>
                  <a href="https://www.facebook.com/clubadm/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
                    <Facebook size={16} />
                  </a>
                </div>
              </div>

              <div className="rounded-xl p-7 text-white" style={{ backgroundColor: "#232862" }}>
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>CONSULTATION GRATUITE</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
                  La meilleure façon de commencer, c'est de jaser. Réserve ta consultation gratuite et on va bâtir un plan ensemble.
                </p>
                <a href="https://clubadm.com/contact-us/" className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20" style={{ backgroundColor: "#ed1c24", fontFamily: "var(--font-body)" }}>
                  Réserver <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#131636" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Viens nous voir</p>
            <h2 className="text-4xl lg:text-5xl text-white" style={{ fontFamily: "var(--font-display)" }}>NOS EMPLACEMENTS</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((loc, i) => (
              <motion.div key={loc.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                <div className="h-48 flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
                  <div className="text-center">
                    <MapPin size={32} style={{ color: "#ed1c24" }} className="mx-auto mb-2" />
                    <a href={loc.mapUrl} className="text-sm font-bold uppercase tracking-wider hover:underline" style={{ color: "#ed1c24", fontFamily: "var(--font-body)" }}>Voir sur Google Maps</a>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl mb-4 text-white" style={{ fontFamily: "var(--font-display)" }}>{loc.name.toUpperCase()}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={15} style={{ color: "#ed1c24" }} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="block text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{loc.address}</span>
                        <span className="block text-sm" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>{loc.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={15} style={{ color: "#ed1c24" }} className="flex-shrink-0" />
                      <a href={`tel:${loc.phone.replace(/-/g, "")}`} className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{loc.phone}</a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={15} style={{ color: "#ed1c24" }} className="mt-0.5 flex-shrink-0" />
                      <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>{loc.hours}</span>
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
