
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft, Crown } from "lucide-react";
import { Link } from "wouter";

const ultraLuxuryTours = [
  {
    id: 'imperial-cairo-experience',
    name: 'Imperial Cairo Experience',
    location: 'Cairo',
    duration: '3 Days',
    groupSize: '2-4 People',
    price: 'From $2,250',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Private Museums', 'Exclusive Dining', 'Luxury Hotels', 'Personal Butler'],
    description: 'Private museum tours, exclusive dining, and luxury accommodations with personal concierge service.',
    itinerary: 'Stay in presidential suites, private after-hours museum access, Michelin-starred dining, personal Egyptologist, and luxury helicopter transfers.',
    tourType: 'Ultra Luxury Experience',
    luxuryFeatures: ['Presidential suites', 'Private museum access', 'Michelin dining', 'Personal butler']
  },
  {
    id: 'private-dahabiya-ultra',
    name: 'Private Dahabiya Ultra Experience',
    location: 'Nile River',
    duration: '7 Days',
    groupSize: '2-8 People',
    price: 'From $4,500',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Private Yacht', 'Personal Crew', 'Exclusive Access', 'Gourmet Cuisine'],
    description: 'Ultra-luxury sailing yacht with personal crew and private guide for the ultimate Nile experience.',
    itinerary: 'Private luxury dahabiya with dedicated crew, exclusive temple access outside tourist hours, gourmet onboard dining, and personalized itinerary.',
    tourType: 'Private Yacht Experience',
    luxuryFeatures: ['Private yacht', 'Dedicated crew', 'Exclusive access', 'Gourmet chef']
  },
  {
    id: 'abu-simbel-private-access',
    name: 'Abu Simbel Private Access',
    location: 'Abu Simbel',
    duration: '2 Days',
    groupSize: '2-6 People',
    price: 'From $1,850',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1594735797063-9d0c7e54f6c8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Private Access', 'Sunrise/Sunset Tours', 'Luxury Accommodation', 'Helicopter Transfer'],
    description: 'Exclusive early morning and sunset access to ancient temples with luxury helicopter transfers.',
    itinerary: 'Private helicopter transfer, exclusive temple access at sunrise and sunset, luxury desert accommodation, and personal archaeological expert.',
    tourType: 'Exclusive Temple Access',
    luxuryFeatures: ['Helicopter transfers', 'Private temple access', 'Luxury desert camp', 'Expert guide']
  }
];

const luxuryFeatures = [
  {
    icon: "👑",
    title: "Royal Treatment",
    description: "Presidential suites, private butlers, and personalized service at every moment"
  },
  {
    icon: "🚁",
    title: "Exclusive Transport",
    description: "Private jets, luxury helicopters, and bespoke vehicle arrangements"
  },
  {
    icon: "🏛️",
    title: "Private Access",
    description: "After-hours museum visits and exclusive temple access away from crowds"
  },
  {
    icon: "⭐",
    title: "Michelin Experiences",
    description: "World-class cuisine from renowned chefs and exclusive dining venues"
  }
];

export default function UltraLuxury() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-background via-accent/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://cf.bstatic.com/xdata/images/hotel/max1024x768/39926658.jpg?k=5706e07d5b2a27afcfb631edb94dbb1d589cb6803e84733cd3df136a16386f7a&o=&hp=1')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences">
            <Button variant="outline" className="mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Experiences
            </Button>
          </Link>
          
          <div className="text-center">
            <p className="tracking-[0.2em] uppercase text-accent text-sm font-medium mb-4">
              The Pinnacle of Luxury
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 flex items-center justify-center gap-4">
              <Crown className="h-16 w-16 md:h-20 md:w-20 text-accent" />
              Ultra Luxury
            </h1>
            <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The pinnacle of Egyptian luxury travel with exclusive access, private vessels, and unparalleled service. 
              Experience Egypt like royalty with our most exclusive and prestigious offerings.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Ultra Luxury Experience Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Exclusive elements that define the ultimate in luxury Egyptian travel
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {luxuryFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-accent/20">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-serif font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Ultra Luxury Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The most exclusive and luxurious Egyptian experiences, crafted for discerning travelers who demand perfection.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {ultraLuxuryTours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02] border-accent/20"
              >
                {/* Package Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Crown className="h-3 w-3 text-white" />
                    <span className="text-xs font-medium text-white">ULTRA LUXURY</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-accent font-medium text-sm mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{tour.location}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white">{tour.name}</h3>
                  </div>
                </div>

                {/* Package Content */}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tour.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.highlights.map((highlight: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full border border-accent/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-serif font-bold text-primary">{tour.price}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                      >
                        {selectedTour === tour.id ? 'Hide Details' : 'View Details'}
                      </Button>
                      <Button size="sm" asChild className="bg-accent hover:bg-accent/90">
                        <Link href="/contact">
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Tour Itinerary - Expandable */}
                {selectedTour === tour.id && (
                  <div className="border-t border-border bg-muted/30 p-6">
                    <h4 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Ultra Luxury Experience Details
                    </h4>
                    <div className="space-y-4">
                      <div className="border-l-2 border-accent/30 pl-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <span className="inline-block w-8 h-8 bg-accent/10 text-accent rounded-full text-sm font-medium flex items-center justify-center">
                              👑
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-accent">{tour.duration}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {tour.location}
                              </span>
                            </div>
                            <h5 className="font-semibold text-primary mb-1">Ultra Luxury Experience Itinerary</h5>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {tour.itinerary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-muted to-accent/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-6">
            <Crown className="h-12 w-12 text-accent mr-4" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
              Experience Royal Egypt
            </h2>
          </div>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Indulge in the ultimate luxury Egyptian experience. Our ultra-luxury packages offer exclusive access, 
            unparalleled service, and memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg min-w-[200px] bg-accent hover:bg-accent/90">
                Request Ultra Luxury Experience
              </Button>
            </Link>
            <Link href="/experiences">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg min-w-[200px] border-accent/50">
                Explore Other Experiences
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
