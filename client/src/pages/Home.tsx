/*
 * HOME PAGE — Club ADM Fitness
 * Assembles all sections in cinematic dark design
 * Order: Hero → DoubleOffer → Programs → Results → Methodology → CTA → Footer
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
    <div className="min-h-screen bg-background text-foreground">
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
