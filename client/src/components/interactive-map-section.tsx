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
      color: "from-primary to-accent",
      attractions: ["Bibliotheca Alexandrina", "Citadel of Qaitbay", "Montaza Palace"]
    },
    { 
      name: "Cairo", 
      position: "central-north",
      coordinates: { lat: 30.0444, lng: 31.2357 },
      description: "Ancient wonders meet modern luxury",
      color: "from-accent to-secondary",
      attractions: ["Egyptian Museum", "Islamic Cairo", "Khan el-Khalili Bazaar"]
    },
    { 
      name: "Giza", 
      position: "central-north-west",
      coordinates: { lat: 29.9792, lng: 31.1342 },
      description: "Home of the Great Pyramids",
      color: "from-primary to-accent",
      attractions: ["Great Pyramids", "Great Sphinx", "Solar Boat Museum"]
    },
    { 
      name: "Luxor", 
      position: "central-south",
      coordinates: { lat: 25.6872, lng: 32.6396 },
      description: "Valley of the Kings and Queens",
      color: "from-primary to-secondary",
      attractions: ["Valley of the Kings", "Karnak Temple", "Luxor Temple"]
    },
    { 
      name: "Aswan", 
      position: "south",
      coordinates: { lat: 24.0889, lng: 32.8998 },
      description: "Gateway to Nubian heritage",
      color: "from-secondary to-accent",
      attractions: ["Philae Temple", "High Dam", "Nubian Villages"]
    },
    { 
      name: "Hurghada", 
      position: "eastern-central",
      coordinates: { lat: 27.2574, lng: 33.8129 },
      description: "Red Sea diving paradise",
      color: "from-accent to-primary",
      attractions: ["Coral Reefs", "Marina Boulevard", "Desert Safari"]
    },
    { 
      name: "Sharm El-Sheikh", 
      position: "eastern-south",
      coordinates: { lat: 27.9158, lng: 34.3300 },
      description: "Sinai's resort paradise",
      color: "from-primary to-secondary",
      attractions: ["Ras Mohammed Park", "Naama Bay", "Blue Hole Diving"]
    },
    { 
      name: "Dahab", 
      position: "eastern-southeast",
      coordinates: { lat: 28.4942, lng: 34.5124 },
      description: "Bohemian Red Sea gem",
      color: "from-secondary to-primary",
      attractions: ["Blue Hole", "Lighthouse Reef", "Bedouin Culture"]
    },
    { 
      name: "Siwa Oasis", 
      position: "western",
      coordinates: { lat: 29.2030, lng: 25.5197 },
      description: "Desert sanctuary & ancient oracle",
      color: "from-accent to-secondary",
      attractions: ["Temple of the Oracle", "Cleopatra Springs", "Shali Fortress"]
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
                className={`relative group cursor-pointer transform transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-2 ${
                  index % 2 === 0 ? 'lg:translate-y-8' : ''
                } animate-fade-in`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  transitionProperty: 'transform, box-shadow, filter',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onClick={() => setSelectedDestination(
                  selectedDestination === destination.name ? null : destination.name
                )}
                data-testid={`destination-${destination.name.toLowerCase().replace(' ', '-')}`}
              >
                {/* Destination Card */}
                <div className={`
                  bg-gradient-to-br ${destination.color} p-1 rounded-2xl shadow-lg 
                  group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-700 ease-out
                  ${selectedDestination === destination.name ? 'ring-4 ring-primary/50 scale-105' : ''}
                `}
                style={{
                  transitionProperty: 'box-shadow, transform, filter, border-color',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                >
                  <div className="bg-card/95 backdrop-blur-sm rounded-xl p-6 h-full">
                    {/* Position Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-accent transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-primary" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide transition-colors duration-300 ease-out group-hover:text-accent">
                          {destination.position.replace('-', ' ')}
                        </span>
                      </div>
                      <Navigation className="h-4 w-4 text-primary opacity-60 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:rotate-12 group-hover:scale-110" />
                    </div>

                    {/* Destination Name */}
                    <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300 ease-out">
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
                      transition-all duration-700 ease-out overflow-hidden
                      ${selectedDestination === destination.name ? 'max-h-32 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-2'}
                    `}
                    style={{
                      transitionProperty: 'max-height, opacity, transform, margin',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDelay: selectedDestination === destination.name ? '100ms' : '0ms'
                    }}
                    >
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
        <div className="mt-20 flex justify-center items-center">
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