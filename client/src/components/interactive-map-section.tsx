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

          {/* Interactive Egypt Map */}
          <div className="mt-16 bg-gradient-to-br from-accent/5 to-primary/10 rounded-2xl p-8 overflow-hidden">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-primary mb-2">
                Interactive Destination Map
              </h3>
              <p className="text-muted-foreground">
                Hover over markers to see quick information, or click to view detailed destination cards.
              </p>
            </div>

            {/* Egypt Map with Markers */}
            <div className="relative bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl overflow-hidden" style={{ height: '500px' }}>
              {/* Map Background - Egypt Shape */}
              <svg
                viewBox="0 0 800 500"
                className="absolute inset-0 w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Egypt Landmass */}
                <path
                  d="M150 80 L680 80 L680 120 L650 140 L670 200 L650 280 L620 350 L580 400 L540 420 L480 430 L420 435 L360 430 L300 420 L250 400 L200 370 L170 330 L160 280 L150 220 L140 160 L150 80 Z"
                  className="fill-amber-200/60 dark:fill-amber-800/40 stroke-amber-300 dark:stroke-amber-700"
                  strokeWidth="2"
                />
                
                {/* Nile River */}
                <path
                  d="M400 80 Q420 150 440 220 Q460 290 480 360 Q500 400 520 430"
                  className="stroke-blue-400 dark:stroke-blue-300"
                  strokeWidth="4"
                  fill="none"
                />
                
                {/* Red Sea */}
                <path
                  d="M680 120 L750 140 L770 200 L750 280 L720 350 L680 380 L680 120"
                  className="fill-blue-300/40 dark:fill-blue-600/30 stroke-blue-400 dark:stroke-blue-500"
                  strokeWidth="1"
                />

                {/* Mediterranean Sea */}
                <path
                  d="M150 80 L680 80 L680 50 L150 50 L150 80"
                  className="fill-blue-300/40 dark:fill-blue-600/30 stroke-blue-400 dark:stroke-blue-500"
                  strokeWidth="1"
                />
              </svg>

              {/* Destination Markers */}
              {destinations.map((destination, index) => {
                // Convert coordinates to SVG positions (approximated for Egypt)
                const getMapPosition = (dest: typeof destinations[0]) => {
                  const positions: Record<string, {x: string, y: string}> = {
                    'Alexandria': {x: '32%', y: '18%'},
                    'Cairo': {x: '42%', y: '28%'},
                    'Siwa': {x: '18%', y: '25%'},
                    'Luxor': {x: '58%', y: '58%'},
                    'Red Sea': {x: '78%', y: '48%'},
                    'Aswan': {x: '68%', y: '78%'}
                  };
                  return positions[dest.name] || {x: '50%', y: '50%'};
                };

                const position = getMapPosition(destination);
                
                return (
                  <div
                    key={destination.name}
                    className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ 
                      left: position.x, 
                      top: position.y,
                      animationDelay: `${index * 200}ms`
                    }}
                    onClick={() => setSelectedDestination(
                      selectedDestination === destination.name ? null : destination.name
                    )}
                    data-testid={`map-marker-${destination.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {/* Pulsing background effect */}
                    <div className="absolute inset-0 w-8 h-8 bg-teal-500/30 rounded-full animate-ping"></div>
                    
                    {/* Main marker */}
                    <div className="relative w-8 h-8 bg-teal-500 rounded-full border-4 border-white shadow-lg group-hover:scale-125 group-hover:bg-teal-600 transition-all duration-300 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                      <div className="bg-white dark:bg-card border border-gray-200 dark:border-border rounded-lg px-4 py-2 shadow-xl min-w-max">
                        <h4 className="font-semibold text-primary text-sm mb-1">
                          {destination.name}
                        </h4>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {destination.description}
                        </p>
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-card"></div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Map Controls Styling */}
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-lg p-2 shadow-md">
                <div className="flex space-x-1">
                  <button className="w-8 h-8 bg-white dark:bg-muted hover:bg-gray-50 dark:hover:bg-muted/80 rounded flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-muted-foreground border border-gray-200 dark:border-border hover-elevate">+</button>
                  <button className="w-8 h-8 bg-white dark:bg-muted hover:bg-gray-50 dark:hover:bg-muted/80 rounded flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-muted-foreground border border-gray-200 dark:border-border hover-elevate">−</button>
                </div>
              </div>

              {/* Attribution */}
              <div className="absolute bottom-2 left-2 text-xs text-gray-500 dark:text-gray-400">
                Egypt Travel Map
              </div>
            </div>
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