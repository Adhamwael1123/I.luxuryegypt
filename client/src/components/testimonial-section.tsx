import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "From the moment we arrived, every detail exceeded our expectations. ILuxuryEgypt created not just a trip, but a lifetime memory filled with wonder.",
      author: "Sarah & Michael",
      location: "UK",
      rating: 5
    },
    {
      quote: "The private Nile cruise was beyond imagination. Every moment was crafted to perfection, from the sunset views to the impeccable service aboard.",
      author: "Luis & Marta",
      location: "Spain", 
      rating: 5
    },
    {
      quote: "A perfect mix of history and modern luxury. The way they seamlessly blended ancient wonders with contemporary comfort was simply extraordinary.",
      author: "Akira & Yumi",
      location: "Japan",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-muted" data-testid="testimonial-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 animate-fade-in">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the experiences that have left lasting impressions on travelers from around the world.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover-elevate transition-all duration-300 disabled:opacity-50"
            data-testid="testimonial-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover-elevate transition-all duration-300 disabled:opacity-50"
            data-testid="testimonial-next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Testimonial Content */}
          <div className="mx-16">
            <div 
              className={`text-center transition-all duration-300 ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
              data-testid="testimonial-content"
            >
              {/* Stars */}
              <div className="flex justify-center mb-8">
                <div className="flex text-accent text-2xl">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-7 w-7 fill-current transform hover:scale-110 transition-transform duration-200" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary italic leading-relaxed mb-10 max-w-4xl mx-auto">
                "{currentTestimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="text-xl text-muted-foreground">
                <p className="font-medium text-primary mb-1">
                  {currentTestimonial.author}
                </p>
                <p className="text-accent font-medium">
                  {currentTestimonial.location}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-accent/30 hover:bg-accent/60'
                }`}
                data-testid={`testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
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
