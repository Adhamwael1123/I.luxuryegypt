
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const adventureTours = [
  {
    id: 'white-desert-camping',
    name: 'White Desert Camping Adventure',
    location: 'White Desert',
    duration: '3 Days',
    groupSize: '2-8 People',
    price: 'From $750',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Desert Camping', 'Star Gazing', 'Rock Formations', '4WD Adventure'],
    description: 'Camp under stars in otherworldly white rock formations of Egypt\'s most surreal landscape.',
    itinerary: '4WD desert expedition, camping under star-filled skies, exploration of unique chalk formations, and traditional Bedouin experiences.',
    tourType: 'Desert Adventure',
    adventureFeatures: ['4WD expedition', 'Desert camping', 'Star gazing', 'Rock climbing']
  },
  {
    id: 'siwa-oasis-expedition',
    name: 'Siwa Oasis Expedition',
    location: 'Siwa Oasis',
    duration: '4 Days',
    groupSize: '2-10 People',
    price: 'From $950',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Oracle Temple', 'Salt Lakes', 'Cleopatra Springs', 'Berber Culture'],
    description: 'Visit ancient oracle sites and pristine natural pools in Egypt\'s most remote and mystical oasis.',
    itinerary: 'Explore the Oracle Temple of Amun, swim in Cleopatra\'s Springs, sandboarding adventures, and immersion in local Berber culture.',
    tourType: 'Oasis Expedition',
    adventureFeatures: ['Oasis exploration', 'Cultural immersion', 'Natural springs', 'Sandboarding']
  },
  {
    id: 'golden-mummies-expedition',
    name: 'Golden Mummies & Hot Springs',
    location: 'Bahariya Oasis',
    duration: '2 Days',
    groupSize: '2-6 People',
    price: 'From $580',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Golden Mummies', 'Hot Springs', 'Desert Safari', 'Archaeological Sites'],
    description: 'Explore ancient burial sites and relax in natural hot springs in the heart of the Western Desert.',
    itinerary: 'Visit the Valley of Golden Mummies, therapeutic hot spring baths, desert safaris, and exploration of Greco-Roman archaeological sites.',
    tourType: 'Archaeological Adventure',
    adventureFeatures: ['Archaeological sites', 'Hot springs', 'Desert safari', 'Ancient discoveries']
  }
];

const adventureFeatures = [
  {
    icon: "🏜️",
    title: "Desert Expeditions",
    description: "Explore Egypt's vast deserts with expert guides and 4WD vehicles"
  },
  {
    icon: "⭐",
    title: "Stargazing",
    description: "Experience pristine night skies in remote locations perfect for astronomy"
  },
  {
    icon: "🏕️",
    title: "Wild Camping",
    description: "Sleep under the stars in comfortable desert camps far from civilization"
  },
  {
    icon: "🔍",
    title: "Hidden Gems",
    description: "Discover Egypt's secret places known only to experienced adventurers"
  }
];

export default function AdventureTours() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-background via-accent/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1640342105347-3e2699b5fbb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences">
            <Button variant="outline" className="mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Experiences
            </Button>
          </Link>
          
          <div className="text-center">
            <p className="tracking-[0.2em] uppercase text-accent text-sm font-medium mb-4">
              Wild Experiences
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
              Adventure Tours
            </h1>
            <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore Egypt's hidden treasures, mystical deserts, and off-the-beaten-path destinations for the adventurous spirit. 
              Discover the wild side of Egypt beyond the tourist trails.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Adventure Experience Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Wild elements that make our adventure tours unforgettable
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {adventureFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
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
              Wild Adventure Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully crafted adventure experiences for those seeking Egypt's untamed beauty and hidden secrets.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {adventureTours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02]"
              >
                {/* Package Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
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
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
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
                      <Button size="sm" asChild>
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
                      Adventure Itinerary Details
                    </h4>
                    <div className="space-y-4">
                      <div className="border-l-2 border-accent/30 pl-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <span className="inline-block w-8 h-8 bg-accent/10 text-accent rounded-full text-sm font-medium flex items-center justify-center">
                              🏜️
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
                            <h5 className="font-semibold text-primary mb-1">Adventure Experience Itinerary</h5>
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
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Embark on Your Wild Adventure
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Discover Egypt's hidden treasures and untamed landscapes. Our expert adventure guides will take you 
            beyond the tourist trails to experience the wild beauty of ancient Egypt.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg min-w-[200px]">
                Start Your Adventure
              </Button>
            </Link>
            <Link href="/experiences">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg min-w-[200px]">
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
