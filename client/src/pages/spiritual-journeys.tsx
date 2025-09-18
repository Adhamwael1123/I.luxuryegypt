
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const spiritualTours = [
  {
    id: 'sacred-geometry-wisdom',
    name: 'Sacred Geometry & Ancient Wisdom',
    location: 'Cairo & Giza',
    duration: '3 Days',
    groupSize: '2-10 People',
    price: 'From $880',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d04136?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Pyramid Meditation', 'Sacred Geometry', 'Spiritual Guides', 'Ancient Wisdom'],
    description: 'Private pyramid meditation and sacred geometry workshops exploring ancient Egyptian spiritual knowledge.',
    itinerary: 'Dawn meditation inside the Great Pyramid, sacred geometry workshops, spiritual guidance sessions, and connection with ancient wisdom.',
    tourType: 'Spiritual Experience',
    spiritualFeatures: ['Meditation sessions', 'Sacred geometry', 'Ancient wisdom', 'Spiritual guides']
  },
  {
    id: 'osiris-pilgrimage',
    name: 'Temple of Osiris Pilgrimage',
    location: 'Abydos & Dendera',
    duration: '4 Days',
    groupSize: '2-8 People',
    price: 'From $1,150',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594735797063-9d0c7e54f6c8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Osiris Temple', 'Sacred Ceremonies', 'Meditation Sessions', 'Ancient Rituals'],
    description: 'Sacred ceremonies at Egypt\'s most spiritual temples dedicated to Osiris, god of the afterlife.',
    itinerary: 'Private temple ceremonies, meditation sessions in sacred spaces, guidance on ancient Egyptian spiritual practices, and transformative rituals.',
    tourType: 'Sacred Pilgrimage',
    spiritualFeatures: ['Sacred ceremonies', 'Temple meditation', 'Ancient rituals', 'Spiritual transformation']
  },
  {
    id: 'isis-blessing-ceremony',
    name: 'Isis Temple Blessing Ceremony',
    location: 'Philae Temple',
    duration: '2 Days',
    groupSize: '2-6 People',
    price: 'From $650',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Isis Temple', 'Sunset Ceremony', 'Blessing Ritual', 'Sacred Waters'],
    description: 'Private sunset ceremony at the temple of the goddess Isis with traditional blessing rituals.',
    itinerary: 'Private boat transfer to Philae Island, sunset ceremony at Isis Temple, traditional blessing ritual, and meditation by sacred waters.',
    tourType: 'Blessing Ceremony',
    spiritualFeatures: ['Sunset ceremonies', 'Sacred blessings', 'Water meditation', 'Goddess connection']
  }
];

const spiritualFeatures = [
  {
    icon: "🧘",
    title: "Sacred Meditation",
    description: "Experience profound meditation sessions in ancient temples and sacred sites"
  },
  {
    icon: "🕊️",
    title: "Spiritual Guidance",
    description: "Expert spiritual guides versed in ancient Egyptian wisdom and practices"
  },
  {
    icon: "⚡",
    title: "Energy Healing",
    description: "Connect with the powerful energies of Egypt's most sacred locations"
  },
  {
    icon: "🌅",
    title: "Dawn Ceremonies",
    description: "Private sunrise and sunset ceremonies at temples for maximum spiritual impact"
  }
];

export default function SpiritualJourneys() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 bg-gradient-to-br from-background via-accent/5 to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/33661271/pexels-photo-33661271.jpeg?_gl=1*ywbelw*_ga*MTUzMjg3NTA0Mi4xNzU4MjA4MjAy*_ga_8JE65Q40S6*czE3NTgyMDgyMDEkbzEkZzEkdDE3NTgyMDg2MjIkajM0JGwwJGgw')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/experiences">
            <Button variant="outline" className="mb-8 group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Experiences
            </Button>
          </Link>
          
          <div className="text-center">
            <p className="tracking-[0.2em] uppercase text-accent text-sm font-medium mb-4">
              Sacred Experiences
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
              Spiritual Journeys
            </h1>
            <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with ancient Egyptian spirituality through sacred sites, meditation, and transformative experiences. 
              Journey into the mystical heart of Egypt where ancient wisdom meets modern spiritual practice.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Spiritual Experience Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Sacred elements that make our spiritual journeys transformative
            </p>
          </div>
          
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {spiritualFeatures.map((feature, index) => (
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
              Sacred Journey Experiences
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Carefully curated spiritual experiences designed to connect you with ancient Egyptian wisdom and sacred energies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {spiritualTours.map((tour) => (
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
                      Spiritual Journey Details
                    </h4>
                    <div className="space-y-4">
                      <div className="border-l-2 border-accent/30 pl-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <span className="inline-block w-8 h-8 bg-accent/10 text-accent rounded-full text-sm font-medium flex items-center justify-center">
                              ✨
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
                            <h5 className="font-semibold text-primary mb-1">Sacred Experience Itinerary</h5>
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
            Begin Your Spiritual Transformation
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Connect with ancient wisdom and experience the profound spiritual energy of Egypt's most sacred sites. 
            Let our expert guides facilitate your transformative journey through mystical Egypt.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg min-w-[200px]">
                Start Your Spiritual Journey
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
