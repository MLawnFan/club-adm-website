/*
 * DESIGN: Cinématique Sombre — Club ADM
 * Navbar transparente qui devient solide au scroll.
 * Typographie: Bebas Neue pour le logo, DM Sans pour les liens.
 * Couleurs: fond transparent → bleu marine profond au scroll, accents rouges pour CTA.
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/club-adm-logo-iryUvuUwz3e34AiGu7Rtxh.png";

const navLinks = [
  { label: "Accueil", href: "#hero" },
  { label: "Le Gym", href: "#gym" },
  { label: "En Ligne", href: "#online" },
  { label: "Programmes", href: "#programs" },
  { label: "Communauté", href: "#community" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a14]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 shrink-0">
          <img
            src={LOGO_URL}
            alt="Club ADM Fitness"
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 tracking-wide uppercase font-[var(--font-body)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 text-sm tracking-wider uppercase"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Connexion
          </Button>
          <Button
            className="bg-adm-red hover:bg-adm-red-hover text-white font-semibold text-sm tracking-wider uppercase px-6 shadow-lg shadow-adm-red/20"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Essai Gratuit
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a14]/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors py-2 uppercase tracking-wider"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 w-full uppercase tracking-wider"
                >
                  Connexion
                </Button>
                <Button className="bg-adm-red hover:bg-adm-red-hover text-white font-semibold w-full uppercase tracking-wider shadow-lg shadow-adm-red/20">
                  Essai Gratuit
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
