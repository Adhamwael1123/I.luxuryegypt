import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar } from "lucide-react";
import { Link } from "wouter";

// Luxury Travel Packages Data
const packages = [
  {
    id: 'pharaohs-legacy',
    name: 'Pharaohs Legacy',
    tagline: 'Classic Egypt Experience',
    duration: '8 Days / 7 Nights',
    groupSize: '2-12 People',
    price: 'From $3,250',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d04136?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Giza Pyramids', 'Valley of Kings', 'Nile Cruise', 'Abu Simbel'],
    description: 'Discover the most iconic sites of ancient Egypt in this comprehensive journey through time.',
    category: 'classic',
    tours: [
      {
        day: 'Day 1-2',
        location: 'Cairo & Giza',
        title: 'Pyramids & Egyptian Museum',
        description: 'Private tours of the Great Pyramids, Sphinx, and world-renowned Egyptian Museum'
      },
      {
        day: 'Day 3-4',
        location: 'Aswan',
        title: 'Nubian Heritage & Philae Temple',
        description: 'Explore Nubian villages, visit Philae Temple, and experience the majesty of Abu Simbel'
      },
      {
        day: 'Day 5-7',
        location: 'Luxor',
        title: 'Valley of Kings & Karnak',
        description: 'Luxury Nile cruise with exclusive access to royal tombs and magnificent temples'
      },
      {
        day: 'Day 8',
        location: 'Cairo',
        title: 'Islamic Cairo & Departure',
        description: 'Final exploration of medieval Cairo and Khan el-Khalili bazaar'
      }
    ]
  },
  {
    id: 'red-sea-luxury',
    name: 'Red Sea Luxury',
    tagline: 'Coastal Paradise & Ancient Wonders',
    duration: '10 Days / 9 Nights',
    groupSize: '2-8 People',
    price: 'From $4,500',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Luxury Resort', 'Private Diving', 'Desert Safari', 'Ancient Temples'],
    description: 'Combine Egypt\'s ancient treasures with luxury Red Sea relaxation and world-class diving.',
    category: 'luxury',
    tours: [
      {
        day: 'Day 1-3',
        location: 'Cairo & Giza',
        title: 'Ancient Capital Discovery',
        description: 'Private guided tours of pyramids, museums, and Islamic architecture'
      },
      {
        day: 'Day 4-5',
        location: 'Luxor',
        title: 'Theban Necropolis Experience',
        description: 'Exclusive access to royal tombs and private temple ceremonies'
      },
      {
        day: 'Day 6-9',
        location: 'Hurghada',
        title: 'Red Sea Luxury Resort',
        description: 'Five-star beachfront resort with private diving excursions and spa treatments'
      },
      {
        day: 'Day 10',
        location: 'Cairo',
        title: 'Final Exploration & Departure',
        description: 'Last-minute shopping and cultural experiences before departure'
      }
    ]
  },
  {
    id: 'desert-mystique',
    name: 'Desert Mystique',
    tagline: 'Oases & Ancient Secrets',
    duration: '12 Days / 11 Nights',
    groupSize: '2-6 People',
    price: 'From $5,200',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Siwa Oasis', 'White Desert', 'Bahariya Oasis', 'Star Gazing'],
    description: 'Journey into Egypt\'s mystical deserts and hidden oases for an unforgettable adventure.',
    category: 'adventure',
    tours: [
      {
        day: 'Day 1-2',
        location: 'Cairo',
        title: 'Metropolitan Exploration',
        description: 'Discover Cairo\'s historic treasures and modern cultural scene'
      },
      {
        day: 'Day 3-5',
        location: 'Bahariya Oasis',
        title: 'Golden Mummies & Hot Springs',
        description: 'Explore ancient burial sites and relax in natural hot springs'
      },
      {
        day: 'Day 6-8',
        location: 'White Desert',
        title: 'Surreal Landscape Adventure',
        description: 'Camp under stars in otherworldly white rock formations'
      },
      {
        day: 'Day 9-11',
        location: 'Siwa Oasis',
        title: 'Oracle Temple & Cleopatra Springs',
        description: 'Visit ancient oracle sites and pristine natural pools'
      }
    ]
  },
  {
    id: 'nile-empress',
    name: 'Nile Empress',
    tagline: 'Ultra-Luxury River Journey',
    duration: '14 Days / 13 Nights',
    groupSize: '2-4 People',
    price: 'From $8,750',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Luxury Dahabiya', 'Private Guides', 'Exclusive Access', 'Presidential Suite'],
    description: 'The ultimate Egyptian experience aboard a private luxury vessel with unprecedented access.',
    category: 'ultra-luxury',
    tours: [
      {
        day: 'Day 1-3',
        location: 'Cairo',
        title: 'Imperial Cairo Experience',
        description: 'Private museum tours, exclusive dining, and luxury accommodations'
      },
      {
        day: 'Day 4-10',
        location: 'Nile River',
        title: 'Private Dahabiya Cruise',
        description: 'Ultra-luxury sailing yacht with personal crew and private guide'
      },
      {
        day: 'Day 11-12',
        location: 'Aswan',
        title: 'Abu Simbel Private Access',
        description: 'Exclusive early morning and sunset access to ancient temples'
      },
      {
        day: 'Day 13-14',
        location: 'Alexandria',
        title: 'Mediterranean Finale',
        description: 'Coastal luxury with private yacht excursions and gourmet experiences'
      }
    ]
  },
  {
    id: 'family-treasures',
    name: 'Family Treasures',
    tagline: 'Multi-Generational Discovery',
    duration: '9 Days / 8 Nights',
    groupSize: '4-16 People',
    price: 'From $2,850',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Family Activities', 'Educational Tours', 'Kid-Friendly', 'Cultural Workshops'],
    description: 'Specially designed for families to explore Egypt together with engaging activities for all ages.',
    category: 'family',
    tours: [
      {
        day: 'Day 1-2',
        location: 'Cairo',
        title: 'Pyramid Adventure & Museum Discovery',
        description: 'Interactive pyramid exploration and hands-on museum experiences'
      },
      {
        day: 'Day 3-4',
        location: 'Luxor',
        title: 'Pharaoh\'s Valley Family Quest',
        description: 'Educational tomb visits and family-friendly archaeological workshops'
      },
      {
        day: 'Day 5-7',
        location: 'Aswan',
        title: 'Nile Family Cruise',
        description: 'Family-friendly cruise with cultural activities and Nubian village visits'
      },
      {
        day: 'Day 8-9',
        location: 'Cairo',
        title: 'Bazaar Adventure & Farewell',
        description: 'Guided shopping experience and traditional Egyptian cooking class'
      }
    ]
  },
  {
    id: 'spiritual-journey',
    name: 'Spiritual Journey',
    tagline: 'Sacred Sites & Ancient Wisdom',
    duration: '11 Days / 10 Nights',
    groupSize: '2-10 People',
    price: 'From $4,200',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594735797063-9d0c7e54f6c8?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Temple Ceremonies', 'Meditation Sessions', 'Sacred Geometry', 'Spiritual Guides'],
    description: 'Connect with ancient Egyptian spirituality through sacred sites and transformative experiences.',
    category: 'spiritual',
    tours: [
      {
        day: 'Day 1-2',
        location: 'Cairo',
        title: 'Sacred Geometry & Ancient Wisdom',
        description: 'Private pyramid meditation and sacred geometry workshops'
      },
      {
        day: 'Day 3-5',
        location: 'Abydos & Dendera',
        title: 'Temple of Osiris Pilgrimage',
        description: 'Sacred ceremonies at Egypt\'s most spiritual temples'
      },
      {
        day: 'Day 6-9',
        location: 'Luxor',
        title: 'Valley of Kings Initiation',
        description: 'Spiritual tours of royal tombs with meditation practices'
      },
      {
        day: 'Day 10-11',
        location: 'Philae Temple',
        title: 'Isis Temple Blessing Ceremony',
        description: 'Private sunset ceremony at the temple of the goddess Isis'
      }
    ]
  }
];

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const filteredPackages = packages.filter(pkg => {
    if (selectedCategory === 'all') return true;
    return pkg.category === selectedCategory;
  });

  const categories = [
    { key: 'all', label: 'All Experiences' },
    { key: 'classic', label: 'Classic Tours' },
    { key: 'luxury', label: 'Luxury Experiences' },
    { key: 'ultra-luxury', label: 'Ultra-Luxury' },
    { key: 'adventure', label: 'Adventure' },
    { key: 'family', label: 'Family' },
    { key: 'spiritual', label: 'Spiritual' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
            Luxury Experiences
          </h1>
          <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in bespoke Egyptian adventures. From intimate luxury cruises to exclusive archaeological access, 
            our carefully curated packages deliver unforgettable journeys through the land of the pharaohs.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.key)}
                className="min-w-[140px]"
                data-testid={`filter-${category.key}`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="group cursor-pointer"
                data-testid={`package-${pkg.id}`}
              >
                <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02]">
                  {/* Package Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm font-medium">{pkg.rating}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-accent font-medium text-sm mb-1">{pkg.tagline}</p>
                      <h3 className="text-2xl font-serif font-bold text-white">{pkg.name}</h3>
                    </div>
                  </div>

                  {/* Package Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{pkg.groupSize}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pkg.highlights.map((highlight, index) => (
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
                        <p className="text-2xl font-serif font-bold text-primary">{pkg.price}</p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                          data-testid={`button-view-tours-${pkg.id}`}
                        >
                          {selectedPackage === pkg.id ? 'Hide Tours' : 'View Tours'}
                        </Button>
                        <Button size="sm" asChild data-testid={`button-book-${pkg.id}`}>
                          <Link href="/contact">
                            Book Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tours Details - Expandable */}
                  {selectedPackage === pkg.id && (
                    <div className="border-t border-border bg-muted/30 p-6">
                      <h4 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Tour Itinerary
                      </h4>
                      <div className="space-y-4">
                        {pkg.tours.map((tour, index) => (
                          <div key={index} className="border-l-2 border-accent/30 pl-4">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0">
                                <span className="inline-block w-8 h-8 bg-accent/10 text-accent rounded-full text-sm font-medium flex items-center justify-center">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-accent">{tour.day}</span>
                                  <span className="text-sm text-muted-foreground">•</span>
                                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {tour.location}
                                  </span>
                                </div>
                                <h5 className="font-semibold text-primary mb-1">{tour.title}</h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {tour.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Create Your Perfect Egyptian Journey
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Can't find the perfect package? Let our luxury travel specialists design a completely bespoke experience 
            tailored to your preferences, interests, and travel style.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg min-w-[200px]" data-testid="button-contact-specialists">
                Contact Our Specialists
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg min-w-[200px]" data-testid="button-explore-destinations">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}