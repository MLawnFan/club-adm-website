import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Locations from "@/components/Locations";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ValueProps />
      <HowItWorks />
      <Services />
      <Locations />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
