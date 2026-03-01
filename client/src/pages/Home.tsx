import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProof from "@/components/SocialProof";
import DoubleOffer from "@/components/DoubleOffer";
import Programs from "@/components/Programs";
import Methodology from "@/components/Methodology";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <Navbar />
      <HeroSection />
      <SocialProof />
      <DoubleOffer />
      <Programs />
      <Methodology />
      <BlogPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
