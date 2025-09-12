import { Card, CardContent } from "@/components/ui/card";
import luxorImage from "@assets/luxor_1757531163688.jpg";
import redSeaImage from "@assets/red-sea_1757531163688.jpg";
import siwaImage from "@assets/siwa_1757531163689.jpg";

export default function ToursSection() {
  const tours = [
    {
      title: "Pharaohs' Legacy Tour",
      description: "Journey through 5,000 years of history with private access to iconic temples and tombs.",
      duration: "10 Days",
      imageUrl: luxorImage,
    },
    {
      title: "Red Sea Retreat",
      description: "Luxurious coastal escape with world-class diving, pristine beaches, and exclusive resorts.",
      duration: "7 Days",
      imageUrl: redSeaImage,
    },
    {
      title: "Desert Safari Adventure", 
      description: "Experience the mystical Western Desert with glamping under starlit skies.",
      duration: "5 Days",
      imageUrl: siwaImage,
    },
  ];

  return (
    <section className="py-20 bg-background" data-testid="tours-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 animate-fade-in">
            Curated Luxury Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience Egypt through carefully crafted journeys that blend ancient wonders with unparalleled luxury and comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <Card
              key={tour.title}
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 150}ms`
              }}
              data-testid={`tour-card-${index}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.imageUrl}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Animated border overlay */}
                <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-95 group-hover:scale-100"></div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <div className="mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                      {tour.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary-foreground mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {tour.title}
                  </h3>
                  <p className="text-primary-foreground/90 leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {tour.description}
                  </p>
                  
                  {/* Call to action indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <span className="inline-flex items-center text-accent font-medium">
                      Discover this tour
                      <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="relative mt-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
          <div className="flex justify-center pt-8">
            <div className="w-16 h-1 bg-accent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}