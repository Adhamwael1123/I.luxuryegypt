import { MapPin, Compass, Navigation } from "lucide-react";
import { useState } from "react";

export default function InteractiveMapSection() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  const destinations = [
    { 
      name: "Alexandria", 
      position: "north",
      coordinates: { lat: 31.2001, lng: 29.9187 },
      description: "Mediterranean pearl with ancient heritage",
      color: "from-blue-500 to-cyan-500",
      attractions: ["Bibliotheca Alexandrina", "Citadel of Qaitbay", "Montaza Palace"]
    },
    { 
      name: "Cairo", 
      position: "central-north",
      coordinates: { lat: 30.0444, lng: 31.2357 },
      description: "Ancient wonders meet modern luxury",
      color: "from-amber-500 to-yellow-500",
      attractions: ["Great Pyramids of Giza", "Egyptian Museum", "Islamic Cairo"]
    },
    { 
      name: "Siwa", 
      position: "western",
      coordinates: { lat: 29.2030, lng: 25.5197 },
      description: "Desert oasis sanctuary",
      color: "from-green-500 to-emerald-500",
      attractions: ["Siwa Salt Lakes", "Temple of the Oracle", "Shali Fortress"]
    },
    { 
      name: "Luxor", 
      position: "central-south",
      coordinates: { lat: 25.6872, lng: 32.6396 },
      description: "Valley of the Kings and Queens",
      color: "from-purple-500 to-violet-500",
      attractions: ["Valley of the Kings", "Karnak Temple", "Luxor Temple"]
    },
    { 
      name: "Red Sea", 
      position: "eastern",
      coordinates: { lat: 27.2579, lng: 33.8116 },
      description: "Pristine coral reefs and luxury resorts",
      color: "from-red-500 to-rose-500",
      attractions: ["Hurghada Resorts", "Marsa Alam", "Ras Mohammed National Park"]
    },
    { 
      name: "Aswan", 
      position: "south",
      coordinates: { lat: 24.0889, lng: 32.8998 },
      description: "Gateway to Nubian heritage",
      color: "from-orange-500 to-red-500",
      attractions: ["Philae Temple", "High Dam", "Nubian Villages"]
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
            Journey Across Egypt's Iconic Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Discover Egypt's treasures from the Mediterranean coast to the Nubian heartland, 
            each destination offering unique luxury experiences.
          </p>
        </div>

        {/* Side-to-Side Interactive Map */}
        <div className="relative">
          {/* Geographic Flow Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 via-primary/50 to-accent/30 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Destinations Grid - Side to Side Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
            {destinations.map((destination, index) => (
              <div
                key={destination.name}
                className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  index % 2 === 0 ? 'lg:translate-y-8' : ''
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedDestination(
                  selectedDestination === destination.name ? null : destination.name
                )}
                data-testid={`destination-${destination.name.toLowerCase().replace(' ', '-')}`}
              >
                {/* Destination Card */}
                <div className={`
                  bg-gradient-to-br ${destination.color} p-1 rounded-2xl shadow-lg 
                  group-hover:shadow-2xl transition-all duration-300
                  ${selectedDestination === destination.name ? 'ring-4 ring-primary/50 scale-105' : ''}
                `}>
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-6 h-full">
                    {/* Position Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-accent" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {destination.position.replace('-', ' ')}
                        </span>
                      </div>
                      <Navigation className="h-4 w-4 text-primary opacity-60" />
                    </div>

                    {/* Destination Name */}
                    <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {destination.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {destination.description}
                    </p>

                    {/* Coordinates Display (Prepared for Google Maps) */}
                    <div className="text-xs text-muted-foreground/70 mb-3 font-mono">
                      {destination.coordinates.lat.toFixed(4)}°N, {destination.coordinates.lng.toFixed(4)}°E
                    </div>

                    {/* Attractions Preview */}
                    <div className={`
                      transition-all duration-300 overflow-hidden
                      ${selectedDestination === destination.name ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="border-t border-border/30 pt-3">
                        <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                          Key Attractions
                        </h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {destination.attractions.map((attraction, i) => (
                            <li key={i} className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-accent rounded-full"></div>
                              <span>{attraction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Interaction Hint */}
                    <div className="mt-4 pt-3 border-t border-border/20">
                      <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground/60">
                        <span>Click to explore</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Line to Geographic Flow */}
                <div className="absolute top-1/2 left-1/2 w-px h-8 bg-gradient-to-b from-primary/60 to-transparent transform -translate-x-1/2 -translate-y-full"></div>
              </div>
            ))}
          </div>

        </div>

        {/* Legend and Instructions */}
        <div className="mt-12 flex justify-center items-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-muted rounded-full">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground">Click destinations to explore details</span>
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