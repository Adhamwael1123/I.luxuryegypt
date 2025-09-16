import Navigation from "../components/navigation";
import AnnouncementBar from "../components/announcement-bar";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/scroll-to-top-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Wifi, Car, Utensils, Waves, Sparkles, Shield } from "lucide-react";
import { Link } from "wouter";

// Import luxury Egyptian images
import suiteNileImage from "@assets/suite-nile_1757457083796.jpg";
import poolRiverImage from "@assets/pool-and-rivet_1757457083793.jpg";
import luxuryHallImage from "@assets/elegant-hall_1757459228629.jpeg";
import pyramidLobbyImage from "@assets/pyramid-from-lobby_1757459228637.jpeg";
import menahousePyramidImage from "@assets/the-pyramid-from-mena-house_1757459228638.jpeg";
import khanKhaliliImage from "@assets/khan-khalili-restaurant_1757459228636.jpeg";
import columnHallImage from "@assets/inside-the-column-hall_1757699232094.jpg";
import islamicDistrictImage from "@assets/islamic-district-at-dawn_1757699232100.jpg";
import poolsideDrinkImage from "@assets/pool-side-drink_1757699232100.jpg";
import siwaPalmTreesImage from "@assets/siwa-palm-trees_1757699232101.jpg";
import luxorImage from "@assets/luxor_1757531163688.jpg";
import siwaImage from "@assets/siwa_1757531163689.jpg";
import redSeaImage from "@assets/red-sea_1757531163688.jpg";

export default function Stay() {
  const accommodationTypes = [
    {
      icon: <Star className="h-8 w-8 text-accent" />,
      title: "Luxury Hotels",
      description: "Five-star properties with world-class service and amenities.",
      count: "15+ Partners"
    },
    {
      icon: <Waves className="h-8 w-8 text-accent" />,
      title: "Nile River Cruises",
      description: "Floating palaces offering all-inclusive luxury along the Nile.",
      count: "8+ Vessels"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-accent" />,
      title: "Desert Resorts",
      description: "Exclusive retreats in Egypt's most stunning desert locations.",
      count: "6+ Locations"
    },
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "Historic Palaces",
      description: "Restored heritage properties with centuries of Egyptian history.",
      count: "4+ Palaces"
    }
  ];

  const featuredHotels = [
    {
      name: "Mena House Hotel",
      location: "Giza",
      description: "Historic palace hotel with direct views of the Great Pyramids. A legendary retreat where royalty and celebrities have stayed for over a century.",
      image: menahousePyramidImage,
      amenities: ["Pyramid Views", "Historic Heritage", "Luxury Spa", "Fine Dining"],
      rating: 5
    },
    {
      name: "Sofitel Winter Palace",
      location: "Luxor", 
      description: "Victorian grandeur on the banks of the Nile. This legendary hotel has hosted dignitaries and explorers since 1886.",
      image: luxorImage,
      amenities: ["Nile Gardens", "Royal Heritage", "Pool Complex", "Historic Charm"],
      rating: 5
    },
    {
      name: "Adrère Amellal",
      location: "Siwa Oasis",
      description: "Eco-luxury desert lodge built entirely from natural materials. Experience the serene beauty of the Sahara in sustainable comfort.",
      image: siwaImage,
      amenities: ["Eco-Friendly", "Desert Views", "Natural Architecture", "Wellness"],
      rating: 4
    }
  ];

  const luxuryFeatures = [
    {
      icon: <Utensils className="h-6 w-6 text-accent" />,
      title: "Gourmet Dining",
      description: "World-class restaurants featuring both international cuisine and authentic Egyptian flavors"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-accent" />,
      title: "Wellness & Spa",
      description: "Rejuvenating spa treatments inspired by ancient Egyptian wellness traditions"
    },
    {
      icon: <Car className="h-6 w-6 text-accent" />,
      title: "VIP Transportation",
      description: "Private transfers in luxury vehicles with professional Egyptian drivers"
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      title: "Concierge Service",
      description: "24/7 dedicated concierge to arrange tours, dining, and special experiences"
    },
    {
      icon: <Wifi className="h-6 w-6 text-accent" />,
      title: "Modern Amenities",
      description: "High-speed internet, business centers, and all contemporary comforts"
    },
    {
      icon: <Star className="h-6 w-6 text-accent" />,
      title: "Exclusive Access",
      description: "Private entrances to attractions and VIP experiences unavailable to regular guests"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${luxuryHallImage})` 
          }}
        />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 animate-fade-in">
            Luxury Accommodations
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            From historic palaces to modern resorts, discover Egypt's finest luxury accommodations curated for the discerning traveler.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="px-8 py-4 text-lg"
                data-testid="button-book-stay"
              >
                Book Your Stay
              </Button>
            </Link>
            <Link href="/destinations">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-explore-destinations"
              >
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main>
        {/* Accommodation Types Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Accommodation Types
              </h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our carefully selected portfolio of Egypt's most exclusive accommodations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {accommodationTypes.map((type, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                        {type.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{type.title}</h3>
                    <p className="text-muted-foreground mb-4">{type.description}</p>
                    <div className="text-accent font-medium text-sm">{type.count}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Hotels Section */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="tracking-[0.2em] uppercase text-accent text-sm font-medium mb-4">
                Featured Properties
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Exceptional Hotels
              </h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Experience Egypt's most legendary hotels, each offering a unique blend of luxury, history, and authentic Egyptian hospitality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {featuredHotels.map((hotel, index) => (
                <div key={index} className="group">
                  <div className="relative mb-6">
                    <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Rating overlay */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(hotel.rating)}
                          <span className="ml-1 text-primary font-semibold text-sm">{hotel.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating hotel info card */}
                    <div className="absolute -bottom-6 left-6 right-6 bg-background rounded-lg shadow-xl p-6 border border-accent/10">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-serif font-bold text-primary">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center text-accent">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">{hotel.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description and amenities */}
                  <div className="pt-8">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {hotel.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Link href="/contact">
                      <Button className="w-full" data-testid={`button-book-${index}`}>
                        Book This Hotel
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Luxury Features Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Luxury Features & Services
              </h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every accommodation in our portfolio offers world-class amenities and personalized service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {luxuryFeatures.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nile Suite Showcase */}
        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-8">
                  Nile-View Suites
                </h2>
                <div className="space-y-6 text-lg text-primary-foreground/90 leading-relaxed">
                  <p>
                    Wake up to panoramic views of the legendary Nile River from your private suite. 
                    Our riverfront accommodations offer the ultimate Egyptian experience with floor-to-ceiling 
                    windows framing the timeless beauty of the world's longest river.
                  </p>
                  <p>
                    Each suite features luxurious Egyptian cotton linens, marble bathrooms with soaking tubs, 
                    and private balconies perfect for watching feluccas sail by at sunset.
                  </p>
                  <p>
                    Experience the magic of the Nile from the comfort of your own luxury sanctuary, 
                    where modern amenities meet ancient wonder.
                  </p>
                </div>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      data-testid="button-nile-suite"
                    >
                      Reserve Nile Suite
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src={suiteNileImage} 
                    alt="Luxury Nile suite interior" 
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={poolsideDrinkImage} 
                    alt="Poolside luxury service" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img 
                    src={poolRiverImage} 
                    alt="Pool with Nile views" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={redSeaImage} 
                    alt="Red Sea resort views" 
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5"></div>
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-accent/20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Book Your Perfect Stay
              </h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Our luxury travel specialists will secure the perfect accommodation for your Egyptian journey. 
                From presidential suites to private villas, we ensure every stay exceeds your expectations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg min-w-[200px]"
                    data-testid="button-contact-specialists"
                  >
                    Contact Our Specialists
                  </Button>
                </Link>
                <Link href="/destinations">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-4 text-lg min-w-[200px]"
                    data-testid="button-view-destinations"
                  >
                    View All Destinations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}