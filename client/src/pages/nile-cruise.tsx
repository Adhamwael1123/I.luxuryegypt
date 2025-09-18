
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft, Heart, Ship } from "lucide-react";
import { Link } from "wouter";

const nileCruiseTours = [
  {
    id: 'luxury-nile-cruise',
    name: 'Luxury Nile River Cruise',
    location: 'Aswan to Luxor',
    duration: '5 Days',
    groupSize: '2-20 People',
    price: 'From $1,200',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['5-Star Vessel', 'Temple Visits', 'Onboard Dining', 'Sunset Views'],
    description: 'Experience Egypt from the water aboard a luxury Nile cruise with guided temple visits and world-class amenities.',
    itinerary: 'Luxury cruise with stops at Kom Ombo, Edfu, and Esna temples, plus visits to Valley of Kings and Karnak Temple.',
    vesselType: '5-Star Cruise Ship',
    cruiseFeatures: ['All meals included', 'Expert Egyptologist', 'Luxury cabins', 'Evening entertainment']
  },
  {
    id: 'private-dahabiya-cruise',
    name: 'Private Dahabiya Cruise',
    location: 'Nile River',
    duration: '7 Days',
    groupSize: '2-8 People',
    price: 'From $4,500',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Private Yacht', 'Personal Crew', 'Exclusive Access', 'Gourmet Cuisine'],
    description: 'Ultra-luxury sailing yacht with personal crew and private guide for the ultimate Nile experience.',
    itinerary: 'Private luxury dahabiya with dedicated crew, exclusive temple access outside tourist hours, gourmet onboard dining, and personalized itinerary.',
    vesselType: 'Private Sailing Yacht',
    cruiseFeatures: ['Private chef', 'Butler service', 'Flexible itinerary', 'Exclusive experiences']
  },
  {
    id: 'classic-nile-cruise',
    name: 'Classic Nile Discovery',
    location: 'Luxor to Aswan',
    duration: '4 Days',
    groupSize: '2-16 People',
    price: 'From $850',
    rating: 4.7,
    image: 'https://www.thetimes.com/imageserver/image/%2Fb4c01f06-251f-4b18-b537-a8909772b48b.jpg?crop=1600%2C900%2C0%2C0&resize=1200',
    highlights: ['Historic Temples', 'Traditional Felucca', 'Cultural Shows', 'Local Markets'],
    description: 'Traditional Nile cruise experience with authentic cultural encounters and comprehensive temple visits.',
    itinerary: 'Classic cruise route with visits to Karnak, Luxor Temple, Kom Ombo, Philae Temple, and traditional Nubian village.',
    vesselType: 'Traditional Cruise Ship',
    cruiseFeatures: ['Cultural performances', 'Local guide', 'Traditional meals', 'Market visits']
  }
];

export default function NileCruise() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-background via-accent/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.thetimes.com/imageserver/image/%2Fb4c01f06-251f-4b18-b537-a8909772b48b.jpg?crop=1600%2C900%2C0%2C0&resize=1200')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences">
            <Button variant="outline" className="mb-8 hover:scale-105 transition-transform">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Experiences
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-6 py-3 mb-8">
              <Ship className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold">Nile Cruise Adventures</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
              Nile
              <span className="block text-accent">Cruise</span>
            </h1>
            
            <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Sail through ancient Egypt aboard luxury vessels, experiencing timeless beauty along the legendary Nile River. 
              Discover temples, tombs, and treasures from the comfort of your floating palace.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Ship className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Luxury Vessels</h3>
                <p className="text-sm text-muted-foreground">5-star floating hotels with world-class amenities</p>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Users className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Expert Guides</h3>
                <p className="text-sm text-muted-foreground">Professional Egyptologists and cultural experts</p>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">All-Inclusive</h3>
                <p className="text-sm text-muted-foreground">Meals, excursions, and entertainment included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Nile Cruise Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated Nile cruise experiences, each offering unique perspectives on ancient Egypt.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {nileCruiseTours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Vessel Type Badge */}
                  <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.vesselType}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-accent font-medium text-sm mb-2">
                      <MapPin className="h-4 w-4" />
                      <span>{tour.location}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{tour.name}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tour.highlights.slice(0, 3).map((highlight: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-2xl font-serif font-bold text-primary">{tour.price}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                        className="hover:scale-105 transition-transform"
                      >
                        {selectedTour === tour.id ? 'Hide' : 'Details'}
                      </Button>
                      <Button size="sm" asChild className="hover:scale-105 transition-transform">
                        <Link href="/contact">
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {selectedTour === tour.id && (
                    <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-accent/20">
                      <h4 className="text-lg font-serif font-bold text-primary mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-accent" />
                        Complete Itinerary
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-background/50 p-3 rounded-lg">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {tour.itinerary}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div className="space-y-1">
                            <div className="font-semibold text-primary text-xs">Cruise Features</div>
                            <div className="space-y-1">
                              {tour.cruiseFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="font-semibold text-primary text-xs">Duration</div>
                            <div className="text-muted-foreground text-xs">{tour.duration}</div>
                            <div className="font-semibold text-primary text-xs">Group Size</div>
                            <div className="text-muted-foreground text-xs">{tour.groupSize}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Sail the Nile?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl leading-relaxed mb-10 text-white/90">
            Let our cruise specialists help you choose the perfect Nile journey. From luxury floating palaces to 
            intimate dahabiya sailing, we'll create your ideal river adventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg min-w-[200px] text-white hover:scale-105 transition-transform">
                Plan Your Cruise
              </Button>
            </Link>
            <Link href="/experiences">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all">
                See All Experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
