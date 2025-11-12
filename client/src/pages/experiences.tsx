
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import type { Category } from "@shared/schema";

// Fallback categories for when database is empty
const fallbackCategories = [
  {
    key: 'family',
    label: 'Family Luxury',
    description: 'Perfect adventures designed for families to explore Egypt together with engaging activities for all ages.',
    image: 'https://www.egypttoursportal.com/images/2022/09/Discover-Ancient-Egypt-in-8-Days-Luxury-Holiday-Egypt-Tours-Portal.jpg',
    tours: [
      {
        id: 'nile-family-cruise',
        name: 'Nile Family Adventure',
        location: 'Aswan to Luxor',
        duration: '4 Days',
        groupSize: '4-16 People',
        price: 'From $850',
        rating: 4.9,
        image: 'https://www.thetimes.com/imageserver/image/%2Fb4c01f06-251f-4b18-b537-a8909772b48b.jpg?crop=1600%2C900%2C0%2C0&resize=1200',
        highlights: ['Nile Cruise', 'Valley of Kings', 'Family Workshops', 'Cultural Activities'],
        description: 'Family-friendly luxury cruise combining ancient wonders with engaging activities designed for all ages.',
        itinerary: 'Comfortable family cruise with onboard activities, interactive tomb exploration, visits to Nubian villages, and child-friendly temple tours with educational workshops.'
      }
    ]
  },
  {
    key: 'nile-cruise',
    label: 'Nile Cruise',
    description: 'Sail through ancient Egypt aboard luxury vessels, experiencing timeless beauty along the legendary Nile River.',
    image: 'https://www.thetimes.com/imageserver/image/%2Fb4c01f06-251f-4b18-b537-a8909772b48b.jpg?crop=1600%2C900%2C0%2C0&resize=1200',
    tours: [
      {
        id: 'private-dahabiya-cruise',
        name: 'Private Dahabiya Sailing',
        location: 'Nile River',
        duration: '7 Days',
        groupSize: '2-8 People',
        price: 'From $4,500',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1578925441513-b3c1bd1bb0e8?q=80&w=2070&auto=format&fit=crop',
        highlights: ['Private Yacht', 'Personal Crew', 'Exclusive Access', 'Gourmet Cuisine'],
        description: 'Ultra-luxury sailing yacht with personal crew and private guide for the ultimate Nile experience.',
        itinerary: 'Private luxury dahabiya with dedicated crew, exclusive temple access outside tourist hours, gourmet onboard dining, and personalized itinerary.'
      }
    ]
  },
  {
    key: 'classic',
    label: 'Classic Egypt',
    description: 'Discover Egypt\'s most iconic sites and timeless wonders in comprehensive classic tours.',
    image: 'https://images.pexels.com/photos/2359/sand-desert-statue-pyramid.jpg?_gl=1*1mcocms*_ga*MTUzMjg3NTA0Mi4xNzU4MjA4MjAy*_ga_8JE65Q40S6*czE3NTgyMDgyMDEkbzEkZzEkdDE3NTgyMDg1NDYkajQ4JGwwJGgw',
    tours: [
      {
        id: 'essential-egypt-tour',
        name: 'Essential Egypt Grand Tour',
        location: 'Cairo, Luxor & Aswan',
        duration: '8 Days',
        groupSize: '2-12 People',
        price: 'From $1,850',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d04136?q=80&w=2070&auto=format&fit=crop',
        highlights: ['Great Pyramids', 'Valley of Kings', 'Karnak Temple', 'Abu Simbel'],
        description: 'Comprehensive journey through Egypt\'s most iconic monuments from Cairo to Aswan.',
        itinerary: 'Explore the Great Pyramids and Sphinx, discover treasures at the Egyptian Museum, visit the magnificent Valley of Kings, explore Karnak and Luxor temples, and witness the grandeur of Abu Simbel.'
      }
    ]
  },
  {
    key: 'spiritual',
    label: 'Spiritual Journeys',
    description: 'Connect with ancient Egyptian spirituality through sacred sites, meditation, and transformative experiences.',
    image: 'https://images.pexels.com/photos/33661271/pexels-photo-33661271.jpeg?_gl=1*ywbelw*_ga*MTUzMjg3NTA0Mi4xNzU4MjA4MjAy*_ga_8JE65Q40S6*czE3NTgyMDgyMDEkbzEkZzEkdDE3NTgyMDg2MjIkajM0JGwwJGgw',
    tours: [
      {
        id: 'temple-healing-journey',
        name: 'Temple Healing Journey',
        location: 'Abydos, Dendera & Philae',
        duration: '5 Days',
        groupSize: '2-8 People',
        price: 'From $1,450',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1594735797063-9d0c7e54f6c8?q=80&w=2070&auto=format&fit=crop',
        highlights: ['Sacred Ceremonies', 'Temple Meditation', 'Energy Healing', 'Spiritual Guides'],
        description: 'Transformative journey through Egypt\'s most powerful spiritual temples with meditation and sacred ceremonies.',
        itinerary: 'Dawn meditation at the Great Pyramid, sacred ceremonies at Temple of Osiris in Abydos, energy healing sessions at Dendera, and sunset blessing ritual at Isis Temple in Philae with experienced spiritual guides.'
      }
    ]
  },
  {
    key: 'adventure',
    label: 'Adventure Tours',
    description: 'Explore Egypt\'s hidden treasures, mystical deserts, and off-the-beaten-path destinations for the adventurous spirit.',
    image: 'https://images.unsplash.com/photo-1640342105347-3e2699b5fbb3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tours: [
      {
        id: 'desert-explorer-expedition',
        name: 'Desert Explorer Expedition',
        location: 'White Desert & Siwa Oasis',
        duration: '6 Days',
        groupSize: '2-10 People',
        price: 'From $1,650',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2070&auto=format&fit=crop',
        highlights: ['White Desert Camping', 'Oracle Temple', 'Cleopatra Springs', 'Star Gazing'],
        description: 'Epic desert adventure combining the surreal White Desert with the mystical Siwa Oasis.',
        itinerary: '4WD desert expedition through the otherworldly White Desert, camping under star-filled skies, explore the ancient Oracle Temple of Amun, swim in Cleopatra\'s Springs, and immerse in Berber culture at Siwa Oasis.'
      }
    ]
  },
  {
    key: 'ultra-luxury',
    label: 'Ultra Luxury',
    description: 'The pinnacle of Egyptian luxury travel with exclusive access, private vessels, and unparalleled service.',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/39926658.jpg?k=5706e07d5b2a27afcfb631edb94dbb1d589cb6803e84733cd3df136a16386f7a&o=&hp=1',
    tours: [
      {
        id: 'pharaohs-platinum-experience',
        name: 'Pharaohs Platinum Experience',
        location: 'Cairo, Luxor & Abu Simbel',
        duration: '10 Days',
        groupSize: '2-6 People',
        price: 'From $8,500',
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=2070&auto=format&fit=crop',
        highlights: ['Private Jet', 'Presidential Suites', 'After-Hours Access', 'Personal Egyptologist'],
        description: 'The ultimate Egyptian luxury experience with private jet transfers, presidential suite accommodations, and exclusive after-hours temple access.',
        itinerary: 'Stay in presidential suites at Egypt\'s finest hotels, private jet transfers between destinations, exclusive after-hours access to pyramids and temples, Michelin-starred dining experiences, personal Egyptologist guide, and bespoke itinerary tailored to your desires.'
      }
    ]
  }
];

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  // Fetch categories from the database
  const { data: response, isLoading, isError } = useQuery<{ success: boolean; categories: Category[] }>({
    queryKey: ['/api/public/categories'],
  });

  // Map database categories to UI structure
  const categories = (response?.categories || []).map(cat => ({
    key: cat.slug,
    label: cat.name,
    description: cat.description || '',
    image: cat.image || 'https://images.pexels.com/photos/2359/sand-desert-statue-pyramid.jpg',
    tours: [] // Tours will be linked later
  }));

  // Use fallback categories if database is empty
  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  const currentCategory = selectedCategory ? displayCategories.find(cat => cat.key === selectedCategory) : null;

  const handleCategoryClick = (categoryKey: string) => {
    // Navigate to dynamic category pages using slug
    window.location.href = `/experiences/${categoryKey}`;
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedTour(null);
  };

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

      {!selectedCategory ? (
        // Category Cards Grid
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                Choose Your Adventure
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select from our carefully curated experience categories to discover your perfect Egyptian journey.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : isError ? (
              <div className="flex flex-col justify-center items-center py-20 gap-4">
                <p className="text-muted-foreground">Unable to load categories. Showing default experiences.</p>
              </div>
            ) : null}
            
            {!isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayCategories.map((category, index) => (
                <div
                  key={category.key}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                  onClick={() => handleCategoryClick(category.key)}
                  data-testid={`category-${category.key}`}
                >
                  <div className="relative bg-gradient-to-br from-white via-white to-accent/5 rounded-2xl border border-accent/20 shadow-lg overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-accent/40 group-hover:bg-gradient-to-br group-hover:from-white group-hover:via-accent/5 group-hover:to-accent/10">
                    
                    {/* Luxury accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Image container with sophisticated overlay */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Sophisticated gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/30 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                      
                      {/* Tour count badge */}
                      <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <span className="text-white text-xs font-semibold tracking-wide">
                          {category.tours.length} Tour{category.tours.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      {/* Elegant category name with luxury styling */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="space-y-2">
                          <div className="w-12 h-px bg-accent/80"></div>
                          <h3 className="text-2xl font-serif font-bold text-white mb-1 tracking-wide" data-testid={`category-name-${category.key}`}>
                            {category.label}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Premium corner accent */}
                      <div className="absolute top-4 right-4 w-8 h-8 border-2 border-accent/60 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-accent/20 transition-all duration-500">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Luxury card content */}
                    <div className="p-8 flex-1 flex flex-col relative">
                      
                      {/* Description with elegant styling */}
                      <div className="mb-6 flex-1">
                        <p className="text-muted-foreground font-light leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                      
                      {/* Luxury action area with sophisticated styling */}
                      <div className="pt-6 border-t border-gradient-to-r from-transparent via-accent/20 to-transparent">
                        <div className="flex items-center justify-between group/action">
                          <div className="flex flex-col">
                            <span className="text-primary font-serif font-medium text-lg group-hover/action:text-accent transition-colors duration-300">
                              Explore Experiences
                            </span>
                            <span className="text-muted-foreground text-xs tracking-wide uppercase font-light">
                              Curated Just For You
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center group-hover/action:bg-gradient-to-br group-hover/action:from-accent/20 group-hover/action:to-accent/30 transition-all duration-300 group-hover/action:scale-110">
                            <svg className="w-5 h-5 text-accent group-hover/action:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtle decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 border border-accent/10 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="absolute top-6 right-6 w-8 h-8 border border-accent/20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        // Selected Category Tours
        <>
          {/* Category Header with Back Button */}
          <section className="py-8 bg-muted/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Button
                variant="outline"
                onClick={handleBackToCategories}
                className="mb-6"
                data-testid="back-to-categories"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
              
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  {currentCategory?.label}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {currentCategory?.description}
                </p>
              </div>
            </div>
          </section>

          {/* Tours Grid */}
          <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentCategory?.tours.map((tour) => (
                  <div
                    key={tour.id}
                    className="group cursor-pointer"
                    data-testid={`tour-${tour.id}`}
                  >
                    <div className="bg-card rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02]">
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
                      <div className="p-6">
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
                              data-testid={`button-view-itinerary-${tour.id}`}
                            >
                              {selectedTour === tour.id ? 'Hide Details' : 'View Itinerary'}
                            </Button>
                            <Button size="sm" asChild data-testid={`button-book-${tour.id}`}>
                              <Link href="/contact">
                                Book Now
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Tour Itinerary - Expandable */}
                      {selectedTour === tour.id && (
                        <div className="border-t border-border bg-muted/30 p-6">
                          <h4 className="text-lg font-serif font-bold text-primary mb-4 flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Tour Itinerary & Details
                          </h4>
                          <div className="space-y-4">
                            <div className="border-l-2 border-accent/30 pl-4">
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                  <span className="inline-block w-8 h-8 bg-accent/10 text-accent rounded-full text-sm font-medium flex items-center justify-center">
                                    !
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
                                  <h5 className="font-semibold text-primary mb-1">Complete Itinerary</h5>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {tour.itinerary}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

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
