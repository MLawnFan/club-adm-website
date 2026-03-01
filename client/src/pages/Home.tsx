/*
 * HOME PAGE — Club ADM Fitness (Épuré)
 * Sections: Hero → Double Offre → Programmes → Résultats → Méthodologie → CTA → Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DoubleOffer from "@/components/DoubleOffer";
import Programs from "@/components/Programs";
import Results from "@/components/Results";
import Methodology from "@/components/Methodology";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DoubleOffer />
      <Programs />
      <Results />
      <Methodology />
      <CTASection />
      <Footer />
    </div>
  );
}
