import { useState, useEffect } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "cairo",
      title: "Cairo Pyramids Retreat",
      subtitle: "Discover timeless elegance near the Great Pyramids of Giza.",
      image: "https://images.unsplash.com/photo-1592650484472-2d0c8b12ee78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    },
    {
      id: "luxor",
      title: "Luxor Nile Escape",
      subtitle: "Stay where ancient wonders meet refined indulgence.",
      image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 flex">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`relative w-1/2 h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-70"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-testid={`hero-slide-${slide.id}`}
          >
            <div className="absolute inset-0 bg-primary/40"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-8 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl font-light">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-accent" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            data-testid={`hero-indicator-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
