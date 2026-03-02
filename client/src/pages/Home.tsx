import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProps from "@/components/ValueProps";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Locations from "@/components/Locations";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf7f2" }}>
      <Navbar />
      <HeroSection />
      <ValueProps />
      <Services />
      <HowItWorks />
      <Locations />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
