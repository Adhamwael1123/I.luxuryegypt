import { Star } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-background" data-testid="testimonial-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="flex text-accent text-2xl">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-2xl md:text-3xl font-serif text-primary italic leading-relaxed mb-8">
              "From the moment we arrived, every detail exceeded our expectations. ILuxuryEgypt created not just a trip, but a lifetime memory. Exceptional service, elegant stays, and the true essence of Egypt."
            </blockquote>
            <div className="text-lg text-muted-foreground">
              <p className="font-medium">Sarah & Michael Thompson</p>
              <p>London, United Kingdom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
