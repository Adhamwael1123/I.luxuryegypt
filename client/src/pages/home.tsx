import Navigation from "../components/navigation";
import HeroSection from "../components/hero-section";
import BrandBanner from "../components/brand-banner";
import GuestExperienceIntro from "../components/guest-experience-intro";
import HighlightsSection from "../components/highlights-section";
import DestinationBlocks from "../components/destination-blocks";
import DestinationBanner from "../components/destination-banner";
import TestimonialSection from "../components/testimonial-section";
import InquiryForm from "../components/inquiry-form";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <BrandBanner />
        <GuestExperienceIntro />
        
        {/* Central Banner */}
        <section className="py-24 bg-primary">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary-foreground mb-8 animate-fade-in">
              Experience Egypt in Pure Luxury
            </h2>
          </div>
        </section>
        <HighlightsSection />
        <DestinationBlocks />
        <DestinationBanner />
        <TestimonialSection />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  );
}
