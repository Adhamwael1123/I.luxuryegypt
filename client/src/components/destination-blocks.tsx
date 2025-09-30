
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Package, Clock, ArrowRight } from "lucide-react";
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
          {packages.map((packageItem, index) => (
            <Link key={packageItem.id} href={`/tour/${packageItem.id}`}>
              <Card
                className="group cursor-pointer overflow-hidden border border-primary/10 hover:border-accent/30 transition-all duration-300 bg-card"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={packageItem.imageUrl}
                    alt={packageItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-primary">{packageItem.duration}</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {packageItem.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    {packageItem.description}
                  </p>
                  
                  {/* Action Area */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <span className="text-sm font-medium text-primary tracking-wide">
                      Explore Package
                    </span>
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
