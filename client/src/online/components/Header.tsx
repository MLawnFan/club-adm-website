import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLocation, Link } from "@/online/lib/navigation.tsx";

const LOGO_ROUND = "/manus-storage/logo_clubadm_b62ebfde_7873f580.png";
const NAV_LINKS = [
  { label: "Accueil", href: "/online-project" },
  { label: "Programme", href: "/online-project/programme" },
  { label: "Résultat & Offre", href: "/online-project/resultat" },
  { label: "Checkout", href: "/online-project/checkout" },
  { label: "Upsell Fondateur", href: "/online-project/upsell" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setMobileOpen(false); }
      if (event.key !== "Tab") return;
      const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
      const targets = [toggleRef.current, ...links].filter((el): el is HTMLButtonElement | HTMLAnchorElement => el !== null);
      const index = targets.indexOf(document.activeElement as HTMLAnchorElement);
      if ((event.shiftKey && index <= 0) || (!event.shiftKey && (index === targets.length - 1 || index === -1))) {
        event.preventDefault();
        targets[event.shiftKey ? targets.length - 1 : 0]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      toggleRef.current?.focus({ preventScroll: true });
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.25 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-online-navy/95 backdrop-blur-md shadow-lg py-2" : "bg-online-navy/70 backdrop-blur-sm py-3"}`}>
        <div className="container flex items-center justify-between gap-3">
          <Link href="/online-project" className="flex min-h-11 min-w-11 items-center shrink-0" aria-label="Club ADM — accueil">
            <img src={LOGO_ROUND} alt="Club ADM Fitness" className="h-10 sm:h-12 w-auto brightness-0 invert" />
          </Link>
          <nav aria-label="Navigation du programme en ligne" className="hidden lg:flex items-center gap-4 xl:gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} aria-current={location === link.href ? "page" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap font-display text-sm font-semibold uppercase tracking-wider transition-colors duration-150 ${location === link.href ? "text-online-cta-red" : "text-white/70 hover:text-white"}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/online-project" className="inline-flex min-h-11 items-center justify-center gap-2 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded transition-all duration-150">
              <span className="hidden sm:inline">Commencer maintenant</span><span className="sm:hidden">Commencer</span><ArrowRight size={14} className="shrink-0" />
            </Link>
            <button ref={toggleRef} type="button" onClick={() => setMobileOpen(open => !open)}
              className="lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center rounded text-white focus-visible:outline-2 focus-visible:outline-white"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={mobileOpen} aria-controls="online-mobile-menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div ref={menuRef} id="online-mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-online-navy/98 backdrop-blur-lg pt-20 pb-6 overflow-y-auto overscroll-contain online-mobile-menu">
            <nav aria-label="Navigation mobile du programme en ligne" className="container flex flex-col items-center gap-3 py-6">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} aria-current={location === link.href ? "page" : undefined}
                  className="inline-flex min-h-11 items-center justify-center px-4 font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white/80 hover:text-online-cta-red transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-4 border-t border-white/10 w-full max-w-xs text-center">
                <Link href="/online-project" onClick={() => setMobileOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 bg-online-cta-red hover:bg-online-cta-red-hover text-white font-display text-lg font-bold uppercase tracking-wider px-8 py-4 rounded transition-all duration-150">Commencer<ArrowRight size={18} /></Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
