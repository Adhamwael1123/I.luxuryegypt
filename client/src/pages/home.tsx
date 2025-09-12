import Navigation from "../components/navigation";
import AnnouncementBar from "../components/announcement-bar";
import HeroSection from "../components/hero-section";
import SiwaVideoSection from "../components/siwa-video-section";
import BrandBanner from "../components/brand-banner";
import GuestExperienceIntro from "../components/guest-experience-intro";
import WhyUseSection from "../components/why-use-section";
import HighlightsSection from "../components/highlights-section";
import DestinationBlocks from "../components/destination-blocks";
import TestimonialSection from "../components/testimonial-section";
import InquiryForm from "../components/inquiry-form";
import InteractiveMapSection from "../components/interactive-map-section";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/scroll-to-top-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      <main>
        <HeroSection />
        <SiwaVideoSection />
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
        <WhyUseSection />
        <HighlightsSection />
        <DestinationBlocks />
        <TestimonialSection />
        <InquiryForm />
        <InteractiveMapSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
