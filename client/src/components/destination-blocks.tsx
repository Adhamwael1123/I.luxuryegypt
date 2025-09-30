
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {packages.map((packageItem, index) => (
            <Link key={packageItem.id} href={`/tour/${packageItem.id}`}>
              <div 
                className="group cursor-pointer relative"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Main Card */}
                <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 border border-white/20">
                  
                  {/* Premium Image with Overlay */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={packageItem.imageUrl}
                      alt={packageItem.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Elegant Duration Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-black/30 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                        <div className="flex items-center space-x-2 text-white">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-light tracking-wide">{packageItem.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Luxury Corner Accent */}
                    <div className="absolute top-6 right-6 w-12 h-12">
                      <div className="w-full h-full border-2 border-accent/60 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500">
                        <div className="w-3 h-3 bg-accent rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Title Over Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                        {packageItem.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm mb-8 line-clamp-3">
                      {packageItem.description}
                    </p>
                    
                    {/* Luxury Action Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-primary font-medium tracking-wider text-sm uppercase">
                          Discover Journey
                        </span>
                        <div className="w-12 h-0.5 bg-accent mt-1 group-hover:w-20 transition-all duration-500"></div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                          <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent/30 transition-all duration-500 pointer-events-none"></div>
                </div>

                {/* Floating Shadow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl transform translate-y-4"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
