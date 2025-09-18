
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft, Heart, Baby } from "lucide-react";
import { Link } from "wouter";

const familyTours = [
  {
    id: 'pyramid-adventure',
    name: 'Pyramid Adventure & Museum Discovery',
    location: 'Cairo & Giza',
    duration: '2 Days',
    groupSize: '4-16 People',
    price: 'From $450',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d04136?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Great Pyramids', 'Sphinx Exploration', 'Interactive Museum', 'Family Workshops'],
    description: 'Interactive pyramid exploration and hands-on museum experiences designed specifically for families.',
    itinerary: 'Private tours of the Great Pyramids, Sphinx, and world-renowned Egyptian Museum with child-friendly activities and educational games.',
    ageRange: '6+ years',
    familyFeatures: ['Kid-friendly guides', 'Interactive activities', 'Educational games', 'Family photo sessions']
  },
  {
    id: 'pharaoh-valley-quest',
    name: 'Pharaoh\'s Valley Family Quest',
    location: 'Luxor',
    duration: '3 Days',
    groupSize: '4-12 People',
    price: 'From $680',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Valley of Kings', 'Family Workshops', 'Educational Tours', 'Kid-Friendly Activities'],
    description: 'Educational tomb visits and family-friendly archaeological workshops in the legendary Valley of Kings.',
    itinerary: 'Interactive tomb exploration with educational activities, family workshops on ancient Egyptian life, and visits to colorful temples.',
    ageRange: '8+ years',
    familyFeatures: ['Archaeological workshops', 'Treasure hunt games', 'Ancient crafts', 'Storytelling sessions']
  },
  {
    id: 'nile-family-cruise',
    name: 'Nile Family Cruise',
    location: 'Aswan to Luxor',
    duration: '4 Days',
    groupSize: '6-20 People',
    price: 'From $850',
    rating: 4.9,
    image: 'https://www.thetimes.com/imageserver/image/%2Fb4c01f06-251f-4b18-b537-a8909772b48b.jpg?crop=1600%2C900%2C0%2C0&resize=1200',
    highlights: ['Nile Cruise', 'Nubian Village', 'Cultural Activities', 'Family Entertainment'],
    description: 'Family-friendly cruise with cultural activities and Nubian village visits along the magical Nile River.',
    itinerary: 'Comfortable family cruise with onboard activities, visits to Nubian villages, temple explorations, and traditional entertainment.',
    ageRange: '4+ years',
    familyFeatures: ['Kids club', 'Swimming pool', 'Family suites', 'Cultural performances']
  }
];

export default function FamilyLuxury() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-background via-accent/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.egypttoursportal.com/images/2022/09/Discover-Ancient-Egypt-in-8-Days-Luxury-Holiday-Egypt-Tours-Portal.jpg')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences">
            <Button variant="outline" className="mb-8 hover:scale-105 transition-transform">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Experiences
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-accent/10 rounded-full px-6 py-3 mb-8">
              <Heart className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold">Family Luxury Adventures</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-8 leading-tight">
              Family
              <span className="block text-accent">Luxury</span>
            </h1>
            
            <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
            
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Perfect adventures designed for families to explore Egypt together with engaging activities for all ages. 
              Create lasting memories while discovering ancient wonders through interactive experiences that captivate both children and adults.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Baby className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Kid-Friendly</h3>
                <p className="text-sm text-muted-foreground">Activities designed for children aged 4+</p>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Users className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Family Groups</h3>
                <p className="text-sm text-muted-foreground">Perfect for families of 4-16 people</p>
              </div>
              <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-accent/20">
                <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">Educational Fun</h3>
                <p className="text-sm text-muted-foreground">Learning through interactive experiences</p>
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
              Family Adventure Tours
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated family experiences, each designed to engage and educate all family members.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {familyTours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02]"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Age Range Badge */}
                  <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Ages {tour.ageRange}
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

                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
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

                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    {tour.description}
                  </p>

                  {/* Family Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4 text-accent" />
                      Family Features
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tour.familyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {tour.highlights.map((highlight: string, index: number) => (
                      <span
                        key={index}
                        className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between border-t border-border pt-6">
                    <div>
                      <p className="text-3xl font-serif font-bold text-primary">{tour.price}</p>
                      <p className="text-sm text-muted-foreground">per person</p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTour(selectedTour === tour.id ? null : tour.id)}
                        className="hover:scale-105 transition-transform"
                      >
                        {selectedTour === tour.id ? 'Hide Details' : 'View Details'}
                      </Button>
                      <Button asChild className="hover:scale-105 transition-transform">
                        <Link href="/contact">
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  {selectedTour === tour.id && (
                    <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-accent/20">
                      <h4 className="text-xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        Complete Itinerary
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-background/50 p-4 rounded-lg">
                          <p className="text-muted-foreground leading-relaxed">
                            {tour.itinerary}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="font-semibold text-primary">Duration</div>
                            <div className="text-muted-foreground">{tour.duration}</div>
                          </div>
                          <div className="space-y-2">
                            <div className="font-semibold text-primary">Group Size</div>
                            <div className="text-muted-foreground">{tour.groupSize}</div>
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

      {/* Why Choose Family Luxury Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Why Choose Our Family Experiences?
            </h2>
            <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Baby className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Child-Centered Design</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every tour is carefully crafted with children's attention spans, interests, and safety in mind.
              </p>
            </div>
            
            <div className="text-center p-8 bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Expert Family Guides</h3>
              <p className="text-muted-foreground leading-relaxed">
                Specialized guides trained in working with families and making history come alive for young minds.
              </p>
            </div>
            
            <div className="text-center p-8 bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-4">Memorable Bonding</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create lasting family memories through shared discoveries and interactive learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready for a Family Adventure?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl mb-10 leading-relaxed opacity-90">
            Let our family travel specialists help you create the perfect Egyptian adventure for your loved ones. 
            Every detail is carefully planned to ensure smiles, learning, and unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg min-w-[200px] hover:scale-105 transition-transform">
                Plan Our Adventure
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
