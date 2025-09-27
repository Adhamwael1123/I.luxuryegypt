import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import pyramidFromMenaHouseImage from "@assets/the-pyramid-from-mena-house_1757459228638.jpeg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background" data-testid="hero-section">
      {/* Static Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${pyramidFromMenaHouseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          data-testid="hero-image"
        />
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="text-white space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                Discover Egypt in 
                <span className="text-accent block mt-2">Pure Luxury</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-200 max-w-3xl mx-auto">
                Experience the wonders of ancient Egypt with bespoke journeys crafted for the most discerning travelers.
              </p>
            </div>

            {/* Single CTA Button */}
            <div className="pt-4">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 h-auto font-semibold transform transition-all duration-300 hover:scale-105 bg-accent hover:bg-accent/90 text-primary border-accent group"
                  data-testid="button-start-journey"
                >
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
