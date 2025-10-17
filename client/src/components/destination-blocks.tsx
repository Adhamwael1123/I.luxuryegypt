
import { Link } from "wouter";
import { Package } from "lucide-react";
import luxorImage from "@assets/luxor_1757531163688.jpg";
import redSeaImage from "@assets/red-sea_1757531163688.jpg";
import siwaImage from "@assets/siwa_1757531163689.jpg";

export default function LuxuryPackagesSection() {
  const packages = [
    {
      id: "pharaohs-legacy",
      title: "Pharaohs' Legacy Package",
      description: "Journey through 5,000 years of history with private access to iconic temples and tombs.",
      duration: "10 Days",
      imageUrl: luxorImage,
    },
    {
      id: "red-sea-retreat",
      title: "Red Sea Luxury Package",
      description: "Luxurious coastal escape with world-class diving, pristine beaches, and exclusive resorts.",
      duration: "7 Days",
      imageUrl: redSeaImage,
    },
    {
      id: "desert-safari",
      title: "Desert Safari Package", 
      description: "Experience the mystical Western Desert with glamping under starlit skies.",
      duration: "5 Days",
      imageUrl: siwaImage,
    },
  ];

  return (
    <section className="py-20 bg-background" data-testid="packages-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6">
            <Package className="h-12 w-12 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
            Our Luxury Packages
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-px bg-accent"></div>
            <div className="w-2 h-2 bg-accent rotate-45"></div>
            <div className="w-16 h-px bg-accent"></div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully curated luxury travel packages, each designed to offer 
            extraordinary experiences across Egypt's most iconic destinations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((packageItem) => (
            <Link key={packageItem.id} href={`/tour/${packageItem.id}`}>
              <div 
                className="group cursor-pointer relative h-[500px] overflow-hidden rounded-lg"
                data-testid={`card-package-${packageItem.id}`}
              >
                {/* Full Card Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${packageItem.imageUrl})`,
                  }}
                />
                
                {/* Overlay - Gets darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:bg-black/70 transition-all duration-500" />
                
                {/* Package Title - Slides up on hover */}
                <div className="absolute bottom-6 left-6 right-6 transform transition-all duration-500 group-hover:-translate-y-32">
                  <h3 className="text-white text-2xl md:text-3xl font-serif font-light" data-testid={`text-title-${packageItem.id}`}>
                    {packageItem.title}
                  </h3>
                </div>
                
                {/* Description - Slides up from bottom on hover */}
                <div className="absolute bottom-0 left-6 right-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 pb-6">
                  <p className="text-white text-center text-base leading-relaxed mb-4" data-testid={`text-description-${packageItem.id}`}>
                    {packageItem.description}
                  </p>
                  <div className="text-white text-sm tracking-wider uppercase border-t border-white/50 pt-4">
                    Read More →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
