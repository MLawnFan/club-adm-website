import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Testimonials, { MemberResults } from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import Locations from "@/components/Locations";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MemberLoginReturn from "@/components/MemberLoginReturn";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#faf7f2" }}>
      <MemberLoginReturn />
      <PromoBanner />
      <Navbar />
      <HeroSection />
      <Services />
      <Testimonials />
      <HowItWorks />
      <MemberResults />
      <Locations />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
