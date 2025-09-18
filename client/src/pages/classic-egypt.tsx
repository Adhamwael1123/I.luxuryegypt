
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft, Building2, Crown } from "lucide-react";
import { Link } from "wouter";

const classicTours = [
  {
    id: 'pyramids-museum-classic',
    name: 'Pyramids & Egyptian Museum',
    location: 'Cairo & Giza',
    duration: '2 Days',
    groupSize: '2-12 People',
    price: 'From $380',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d04136?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Great Pyramids', 'Sphinx', 'Egyptian Museum', 'Khan el-Khalili'],
    description: 'Private tours of the Great Pyramids, Sphinx, and world-renowned Egyptian Museum.',
    itinerary: 'Explore the Great Pyramids complex, visit the enigmatic Sphinx, discover treasures at the Egyptian Museum, and shop at Khan el-Khalili bazaar.',
    tourType: 'Private Tour',
    classicFeatures: ['Expert guide', 'Skip-the-line access', 'Traditional lunch', 'Photo opportunities']
  },
  {
    id: 'valley-kings-karnak',
    name: 'Valley of Kings & Karnak',
    location: 'Luxor',
    duration: '3 Days',
    groupSize: '2-15 People',
    price: 'From $520',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594735797063-9d0c7e54f6c8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Valley of Kings', 'Karnak Temple', 'Luxor Temple', 'Nile Views'],
    description: 'Luxury Nile cruise with exclusive access to royal tombs and magnificent temples.',
    itinerary: 'Royal tomb explorations, magnificent Karnak Temple complex, beautiful Luxor Temple, and scenic Nile River experiences.',
    tourType: 'Cultural Tour',
    classicFeatures: ['Tomb access', 'Temple tours', 'Nile cruise', 'Local experiences']
  },
  {
    id: 'nubian-heritage-philae',
    name: 'Nubian Heritage & Philae Temple',
    location: 'Aswan',
    duration: '2 Days',
    groupSize: '2-10 People',
    price: 'From $420',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Philae Temple', 'Nubian Villages', 'Abu Simbel', 'High Dam'],
    description: 'Explore Nubian villages, visit Philae Temple, and experience the majesty of Abu Simbel.',
    itinerary: 'Colorful Nubian village visits, beautiful Philae Temple on its island, magnificent Abu Simbel temples, and modern High Dam engineering marvel.',
    tourType: 'Heritage Tour',
    classicFeatures: ['Cultural immersion', 'Traditional crafts', 'Village visits', 'Ancient temples']
  }
];

export default function ClassicEgypt() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-background via-accent/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2359/sand-desert-statue-pyramid.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences">
            <Button variant="outline" className="mb-8 hover:scale-105 transition-transform">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Experiences
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-6 py-3 mb-8">
              <Crown className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold">Classic Egypt Adventures</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
              Classic
              <span className="block text-accent">Egypt</span>
            </h1>
            
            <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Discover Egypt's most iconic sites and timeless wonders in comprehensive classic tours. 
              Experience the greatest hits of ancient civilization with expert guides and exclusive access.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Building2 className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Iconic Sites</h3>
                <p className="text-sm text-muted-foreground">Visit the most famous monuments and temples</p>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Users className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Expert Guides</h3>
                <p className="text-sm text-muted-foreground">Professional Egyptologists with deep knowledge</p>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Crown className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Timeless Wonders</h3>
                <p className="text-sm text-muted-foreground">Experience the greatest ancient civilizations</p>
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
              Classic Egypt Tours
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated classic experiences, covering Egypt's most celebrated ancient wonders.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {classicTours.map((tour) => (
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
                  
                  <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.tourType}
                  </div>
                  
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
                            <div className="font-semibold text-primary text-xs">Tour Features</div>
                            <div className="space-y-1">
                              {tour.classicFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0"></div>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
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

      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Explore Ancient Egypt?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl leading-relaxed mb-10 text-white/90">
            Let our Egypt specialists create your perfect classic journey through the land of the pharaohs. 
            From iconic pyramids to magnificent temples, experience Egypt's greatest treasures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg min-w-[200px] text-white hover:scale-105 transition-transform">
                Plan Your Journey
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
