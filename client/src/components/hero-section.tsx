import { useState, useEffect } from "react";
import sunsetFeluccaImage from "@assets/sunset-felucca_1757456567256.jpg";

export default function HeroSection() {
  const [cairoImageIndex, setCairoImageIndex] = useState(0);
  const [luxorImageIndex, setLuxorImageIndex] = useState(0);

  const destinations = [
    {
      id: "cairo",
      title: "Cairo Pyramids Retreat",
      subtitle: "Discover timeless elegance near the Great Pyramids of Giza.",
      images: [
        "https://images.unsplash.com/photo-1592650484472-2d0c8b12ee78?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Pyramids main view
        "https://images.unsplash.com/photo-1575306847553-a6d4c1a72b87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Pyramids sunset
        "https://images.unsplash.com/photo-1543795107-ed8999b58879?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Pyramids different angle
        "https://images.unsplash.com/photo-1539976357509-b52aa3fa9d1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Cairo cityscape
      ],
    },
    {
      id: "luxor",
      title: "Luxor Nile Escape", 
      subtitle: "Stay where ancient wonders meet refined indulgence.",
      images: [
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Nile river view
        "https://images.unsplash.com/photo-1486895952287-dc652cb8ad8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Luxor temple
        "https://images.unsplash.com/photo-1548435470-8eab73e0b830?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=90", // Valley of Kings
        sunsetFeluccaImage, // Custom sunset felucca on the Nile
      ],
    },
  ];

  // Separate timers for each destination's carousel
  useEffect(() => {
    const cairoTimer = setInterval(() => {
      setCairoImageIndex((prev) => (prev + 1) % destinations[0].images.length);
    }, 4000);

    return () => clearInterval(cairoTimer);
  }, []);

  useEffect(() => {
    const luxorTimer = setInterval(() => {
      setLuxorImageIndex((prev) => (prev + 1) % destinations[1].images.length);
    }, 4500); // Slightly different timing for visual interest

    return () => clearInterval(luxorTimer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 flex">
        {/* Cairo Section */}
        <div className="relative w-1/2 h-full overflow-hidden">
          {destinations[0].images.map((image, index) => (
            <div
              key={`cairo-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === cairoImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              data-testid={`hero-cairo-image-${index}`}
            />
          ))}
          <div className="absolute inset-0 bg-primary/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {destinations[0].title}
              </h2>
              <p className="text-xl md:text-2xl font-light">
                {destinations[0].subtitle}
              </p>
            </div>
          </div>
          
          {/* Cairo image indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {destinations[0].images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCairoImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === cairoImageIndex 
                    ? "bg-accent" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                data-testid={`hero-cairo-indicator-${index}`}
              />
            ))}
          </div>
        </div>

        {/* Luxor Section */}
        <div className="relative w-1/2 h-full overflow-hidden">
          {destinations[1].images.map((image, index) => (
            <div
              key={`luxor-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === luxorImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              data-testid={`hero-luxor-image-${index}`}
            />
          ))}
          <div className="absolute inset-0 bg-primary/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {destinations[1].title}
              </h2>
              <p className="text-xl md:text-2xl font-light">
                {destinations[1].subtitle}
              </p>
            </div>
          </div>
          
          {/* Luxor image indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {destinations[1].images.map((_, index) => (
              <button
                key={index}
                onClick={() => setLuxorImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === luxorImageIndex 
                    ? "bg-accent" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
                data-testid={`hero-luxor-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
