
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

// Categories with Tours Data
const categories = [
  {
    key: 'family',
    label: 'Family Luxury',
    description: 'Perfect adventures designed for families to explore Egypt together with engaging activities for all ages.',
    image: 'https://www.egypttoursportal.com/images/2022/09/Discover-Ancient-Egypt-in-8-Days-Luxury-Holiday-Egypt-Tours-Portal.jpg',
    tours: [
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
        itinerary: 'Private tours of the Great Pyramids, Sphinx, and world-renowned Egyptian Museum with child-friendly activities and educational games.'
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
        itinerary: 'Interactive tomb exploration with educational activities, family workshops on ancient Egyptian life, and visits to colorful temples.'
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
        itinerary: 'Comfortable family cruise with onboard activities, visits to Nubian villages, temple explorations, and traditional entertainment.'
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
        itinerary: 'Luxury cruise with stops at Kom Ombo, Edfu, and Esna temples, plus visits to Valley of Kings and Karnak Temple.'
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
        itinerary: 'Explore the Great Pyramids complex, visit the enigmatic Sphinx, discover treasures at the Egyptian Museum, and shop at Khan el-Khalili bazaar.'
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
        itinerary: 'Royal tomb explorations, magnificent Karnak Temple complex, beautiful Luxor Temple, and scenic Nile River experiences.'
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
        itinerary: 'Colorful Nubian village visits, beautiful Philae Temple on its island, magnificent Abu Simbel temples, and modern High Dam engineering marvel.'
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
        itinerary: 'Dawn meditation inside the Great Pyramid, sacred geometry workshops, spiritual guidance sessions, and connection with ancient wisdom.'
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
        itinerary: 'Private temple ceremonies, meditation sessions in sacred spaces, guidance on ancient Egyptian spiritual practices, and transformative rituals.'
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
        itinerary: 'Private boat transfer to Philae Island, sunset ceremony at Isis Temple, traditional blessing ritual, and meditation by sacred waters.'
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
        itinerary: '4WD desert expedition, camping under star-filled skies, exploration of unique chalk formations, and traditional Bedouin experiences.'
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
        itinerary: 'Explore the Oracle Temple of Amun, swim in Cleopatra\'s Springs, sandboarding adventures, and immersion in local Berber culture.'
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
        itinerary: 'Visit the Valley of Golden Mummies, therapeutic hot spring baths, desert safaris, and exploration of Greco-Roman archaeological sites.'
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
        itinerary: 'Stay in presidential suites, private after-hours museum access, Michelin-starred dining, personal Egyptologist, and luxury helicopter transfers.'
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
        itinerary: 'Private luxury dahabiya with dedicated crew, exclusive temple access outside tourist hours, gourmet onboard dining, and personalized itinerary.'
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
        itinerary: 'Private helicopter transfer, exclusive temple access at sunrise and sunset, luxury desert accommodation, and personal archaeological expert.'
      }
    ]
  }
];

export default function Experiences() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<string | null>(null);

  const currentCategory = selectedCategory ? categories.find(cat => cat.key === selectedCategory) : null;

  const handleCategoryClick = (categoryKey: string) => {
    // For family luxury, navigate to dedicated page
    if (categoryKey === 'family') {
      window.location.href = '/experiences/family-luxury';
      return;
    }
    
    setSelectedCategory(categoryKey);
    setSelectedTour(null);
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
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <Card
                  key={category.key}
                  className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 ease-out hover:scale-[1.02]"
                  onClick={() => handleCategoryClick(category.key)}
                  data-testid={`category-${category.key}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-serif font-bold text-white mb-2">{category.label}</h3>
                      <p className="text-accent font-medium text-sm">
                        {category.tours.length} Experience{category.tours.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-accent font-medium">
                      <span>Explore Category</span>
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
