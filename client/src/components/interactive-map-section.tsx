import { MapPin, Compass } from "lucide-react";

export default function InteractiveMapSection() {
  const destinations = [
    { 
      name: "Cairo", 
      x: "45%", 
      y: "35%",
      description: "Ancient wonders meet modern luxury"
    },
    { 
      name: "Luxor", 
      x: "60%", 
      y: "55%",
      description: "Valley of the Kings and Queens"
    },
    { 
      name: "Aswan", 
      x: "65%", 
      y: "75%",
      description: "Gateway to Nubian heritage"
    },
    { 
      name: "Red Sea", 
      x: "85%", 
      y: "50%",
      description: "Pristine coral reefs and luxury resorts"
    },
    { 
      name: "Siwa", 
      x: "25%", 
      y: "25%",
      description: "Desert oasis sanctuary"
    }
  ];

  return (
    <section className="py-20 bg-background" data-testid="interactive-map-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Compass className="h-12 w-12 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 animate-fade-in">
            Discover Egypt's Iconic Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Explore Egypt's most iconic destinations, seamlessly connected through ILuxuryEgypt.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Egypt Map Background */}
          <div className="relative bg-gradient-to-br from-accent/5 to-primary/10 rounded-3xl p-8 overflow-hidden">
            {/* Decorative map outline */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-96 opacity-20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Simplified Egypt outline */}
              <path
                d="M50 50 L350 50 L350 80 L320 120 L340 160 L320 200 L300 250 L80 250 L60 200 L50 150 Z"
                className="text-accent fill-accent/10"
              />
              {/* Nile River */}
              <path
                d="M180 50 Q190 100 200 150 Q210 200 220 250"
                className="text-primary stroke-2"
              />
            </svg>

            {/* Destination Markers */}
            {destinations.map((destination, index) => (
              <div
                key={destination.name}
                className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: destination.x, 
                  top: destination.y,
                  animationDelay: `${index * 200}ms`
                }}
                data-testid={`map-marker-${destination.name.toLowerCase().replace(' ', '-')}`}
              >
                {/* Pulsing background effect */}
                <div className="absolute inset-0 w-6 h-6 bg-accent rounded-full opacity-30 animate-ping"></div>
                
                {/* Main marker */}
                <div className="relative w-6 h-6 bg-accent rounded-full border-4 border-background shadow-lg group-hover:scale-125 group-hover:bg-primary transition-all duration-300 flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-accent-foreground group-hover:text-primary-foreground" />
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                  <div className="bg-card border border-accent/20 rounded-lg px-4 py-3 shadow-xl min-w-max">
                    <h3 className="font-serif font-bold text-primary mb-1 text-center">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center whitespace-nowrap">
                      {destination.description}
                    </p>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-card"></div>
                  </div>
                </div>

                {/* Connection lines (animated on hover) */}
                <div className="absolute top-1/2 left-1/2 w-12 h-px bg-accent/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-1/2 origin-left rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 w-8 h-px bg-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-y-1/2 origin-left -rotate-45"></div>
              </div>
            ))}

            {/* Floating elements */}
            <div className="absolute top-6 right-6 opacity-20">
              <div className="w-8 h-8 border-2 border-accent rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-6 left-6 opacity-20">
              <div className="w-6 h-6 border-2 border-primary rotate-45 animate-pulse"></div>
            </div>
            
            {/* Golden ratio spiral decoration */}
            <div className="absolute top-4 left-4 opacity-10">
              <svg width="40" height="40" viewBox="0 0 40 40" className="text-accent">
                <path
                  d="M20 2 Q35 10 30 25 Q25 35 10 30 Q2 20 15 15 Q25 12 22 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-muted rounded-full">
              <MapPin className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">Hover over destinations to explore</span>
            </div>
          </div>
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