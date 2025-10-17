import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import pyramidFromMenaHouseImage from "@assets/the-pyramid-from-mena-house_1757459228638.jpeg";
import suiteNileImage from "@assets/suite-nile_1757457083796.jpg";
import luxorImage from "@assets/luxor_1757531163688.jpg";

const backgroundImages = [
  pyramidFromMenaHouseImage,
  suiteNileImage,
  luxorImage,
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background" data-testid="hero-section">
      {/* Dynamic Background Images with Blur Effect */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(2px)",
            }}
            data-testid={index === currentImageIndex ? "hero-image" : undefined}
          />
        ))}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 text-white">
            {/* Left Side */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase font-light text-gray-200" data-testid="text-subtitle">
                Luxury Travel Agency
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight" data-testid="text-main-heading">
                Travel Enlightened
              </h1>
            </div>

            {/* Vertical Divider - Hidden on mobile */}
            <div className="hidden lg:block w-px h-32 bg-white/40" data-testid="divider-vertical"></div>

            {/* Right Side */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight" data-testid="text-tagline">
                Luxury Travel Designed Just For You
              </h2>
              <div className="pt-2">
                <Link href="/experiences">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-base px-8 py-3 h-auto font-normal tracking-wider border-2 border-white text-white bg-transparent hover:bg-white hover:text-black transition-all duration-300"
                    data-testid="button-explore-vacations"
                  >
                    EXPLORE LUXURY VACATIONS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
