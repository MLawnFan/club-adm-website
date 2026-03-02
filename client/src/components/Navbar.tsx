/*
 * NAVBAR — Design lumineux Mayhem-inspired
 * Fond blanc, logo couleur, navigation horizontale propre
 * CTA rouge "Consultation Gratuite"
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663348789384/FcpQjdNnFRM23KMeDmmcD6/logo_color_trimmed_7ec2e108.png";

const NAV_LINKS = [
  {
    label: "En Ligne",
    href: "/en-ligne",
    internal: true,
  },
  {
    label: "Programme",
    href: "https://clubadm.com/programme/",
    children: [
      { label: "Cours de groupe", href: "https://clubadm.com/groupe-classes/" },
      { label: "Cours d'initiation", href: "https://clubadm.com/cours-dinitiation/" },
      { label: "Entraînement personnel", href: "https://clubadm.com/entrainement-personnel/" },
      { label: "Coaching nutritionnel", href: "https://clubadm.com/coaching-nutritionnel/" },
      { label: "Bien-être au travail", href: "https://clubadm.com/bien-etre-au-travail/" },
      { label: "Enfant / Ado", href: "https://clubadm.com/rookies/" },
    ],
  },
  { label: "Drop In", href: "https://clubadm.com/drop-in/" },
  { label: "Prix", href: "https://clubadm.com/rates/" },
  { label: "Notre Équipe", href: "https://clubadm.com/notre-equipe/" },
  { label: "Horaire", href: "https://clubadm.com/horaire/" },
  {
    label: "Emplacements",
    href: "#emplacements",
    children: [
      { label: "Brossard", href: "https://clubadm.com/centre-de-brossard/" },
      { label: "Chambly", href: "https://clubadm.com/centre-de-chambly/" },
    ],
  },
  { label: "Boutique", href: "https://clubadm.com/boutique" },
  {
    label: "Blog",
    href: "/blog",
    internal: true,
  },
  { label: "Contact", href: "https://clubadm.com/contact-us/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Top bar — succursales + téléphone */}
      <div className="bg-navy text-white text-xs py-1.5 hidden lg:block">
        <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium tracking-wide">
            <a href="https://clubadm.com/centre-de-brossard/" className="hover:text-white/80 transition-colors">BROSSARD</a>
            <span className="text-white/30">|</span>
            <a href="https://clubadm.com/centre-de-chambly/" className="hover:text-white/80 transition-colors">CHAMBLY</a>
          </div>
          <a href="tel:4506002448" className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium">
            <Phone size={11} />
            450-600-2448
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : "border-b border-gray-100"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="https://clubadm.com" className="flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="Club ADM Fitness"
              className="h-10 lg:h-12 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {(link as any).internal ? (
                  <Link
                    href={link.href}
                    className="flex items-center gap-0.5 px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-navy hover:text-adm-red transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    className="flex items-center gap-0.5 px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.04em] text-navy hover:text-adm-red transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={12} className="mt-0.5" />}
                  </a>
                )}
                {link.children && openDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 bg-white shadow-lg border border-gray-100 min-w-[230px] py-1"
                  >
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm text-navy/80 hover:bg-cream hover:text-adm-red transition-colors font-medium"
                      >
                        {child.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://clubadm.com/contact-us/"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-adm-red text-white text-[13px] font-bold uppercase tracking-[0.04em] hover:bg-adm-red-hover transition-colors"
            >
              Consultation Gratuite
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-white overflow-y-auto lg:hidden"
          >
            <div className="px-6 py-6 space-y-0">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  {(link as any).internal ? (
                    <Link
                      href={link.href}
                      className="block py-3.5 text-base font-semibold uppercase tracking-wide text-navy border-b border-gray-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="block py-3.5 text-base font-semibold uppercase tracking-wide text-navy border-b border-gray-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                  {link.children && (
                    <div className="pl-4 border-b border-gray-100">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block py-2.5 text-sm text-navy/60 hover:text-adm-red font-medium"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <a
                  href="https://clubadm.com/contact-us/"
                  className="block text-center py-3.5 bg-adm-red text-white font-bold uppercase tracking-wider text-sm"
                >
                  Consultation Gratuite
                </a>
              </div>
              <div className="pt-3 text-center">
                <a href="tel:4506002448" className="text-navy font-semibold text-sm flex items-center justify-center gap-2">
                  <Phone size={14} />
                  450-600-2448
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
