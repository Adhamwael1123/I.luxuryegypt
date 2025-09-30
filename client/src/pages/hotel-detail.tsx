
import { useRoute } from "wouter";
import Navigation from "../components/navigation";
import AnnouncementBar from "../components/announcement-bar";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/scroll-to-top-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Car, Utensils, Waves, Sparkles, Shield, Users, Bed, Bath, Coffee } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Hotel } from "@shared/schema";

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

// Room type interface
interface RoomType {
  id: string;
  name: string;
  description: string;
  size: string;
  occupancy: number;
  amenities: string[];
  images: string[];
}

export default function HotelDetail() {
  const [match, params] = useRoute("/hotel/:id");
  
  if (!match || !params?.id) {
    return <div>Hotel not found</div>;
  }

  // Fetch specific hotel data from API
  const { data: hotelResponse, isLoading, error } = useQuery({
    queryKey: ["/api/hotels", params.id],
    queryFn: async () => {
      const response = await fetch(`/api/hotels/${params.id}`);
      if (!response.ok) {
        throw new Error("Hotel not found");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Navigation />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading hotel details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !hotelResponse?.success) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <Navigation />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">Hotel Not Found</h1>
            <p className="text-muted-foreground mb-8">The hotel you're looking for doesn't exist.</p>
            <Link href="/stay">
              <Button>Return to Hotels</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const hotel = hotelResponse.hotel;

  // Sample room types for display purposes
  const sampleRoomTypes: RoomType[] = [
    {
      id: "deluxe-room",
      name: "Deluxe Room",
      description: "Elegantly appointed rooms with stunning views and traditional Egyptian décor.",
      size: "42 sqm",
      occupancy: 2,
      amenities: ["City View", "Egyptian Cotton Linens", "Marble Bathroom", "24/7 Room Service"],
      images: [suiteNileImage, pyramidLobbyImage]
    },
    {
      id: "suite",
      name: "Luxury Suite", 
      description: "Spacious suites with panoramic views, separate living area, and premium amenities.",
      size: "85 sqm",
      occupancy: 4,
      amenities: ["Panoramic View", "Separate Living Area", "Premium Bath Products", "Butler Service"],
      images: [luxuryHallImage, poolRiverImage]
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      description: "The ultimate in luxury with private terrace and exclusive amenities.",
      size: "150 sqm",
      occupancy: 6,
      amenities: ["Private Terrace", "Dedicated Butler", "Premium Furnishings", "Private Dining"],
      images: [columnHallImage, poolsideDrinkImage]
    }
  ];

  // Sample highlights for display
  const sampleHighlights = [
    "Luxury accommodations in Egypt",
    "World-class amenities and service",
    "Prime location with stunning views",
    "Multiple dining options",
    "Spa and wellness facilities",
    "Concierge service",
    "Business center",
    "Premium guest experience"
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`}
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${hotel.image})` 
          }}
        />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="flex justify-center items-center mb-4">
            {renderStars(hotel.rating)}
            <span className="ml-2 text-xl font-medium">{hotel.rating} Star</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
            {hotel.name}
          </h1>
          <div className="flex justify-center items-center mb-6 text-xl">
            <MapPin className="w-6 h-6 mr-2 text-accent" />
            <span>{hotel.location}, {hotel.region}</span>
            <span className="mx-4">•</span>
            <span>{hotel.type}</span>
          </div>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
            {hotel.description}
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => document.getElementById('rooms')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-view-rooms"
            >
              View Rooms & Suites
            </Button>
          </div>
        </div>
      </section>

      <main>
        {/* Hotel Overview */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">About {hotel.name}</h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <p className="text-lg text-muted-foreground leading-relaxed text-center lg:text-left max-w-4xl">
                    {hotel.fullDescription}
                  </p>
                </div>
                
                {/* Highlights */}
                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-8 text-center lg:text-left">Hotel Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sampleHighlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                          <Sparkles className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-muted-foreground leading-relaxed pt-2">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Amenities */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-6">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-accent/10 text-accent hover:bg-accent/20 border-0 px-4 py-2 text-sm"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">Hotel Gallery</h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[hotel.image, suiteNileImage, luxuryHallImage, poolRiverImage].map((image, index) => (
                <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image}
                    alt={`${hotel.name} gallery image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Room Types Section */}
        <section id="rooms" className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">Rooms & Suites</h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our selection of elegantly appointed rooms and suites, each designed to provide the ultimate in comfort and luxury.
              </p>
            </div>

            <div className="space-y-12">
              {sampleRoomTypes.map((roomType, index) => (
                <Card key={roomType.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Room Images */}
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="grid grid-cols-2 gap-2 h-full min-h-[300px]">
                        {roomType.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`${roomType.name} image ${imgIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Room Details */}
                    <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-serif font-bold text-primary mb-3">{roomType.name}</h3>
                          <p className="text-muted-foreground leading-relaxed">{roomType.description}</p>
                        </div>

                        {/* Room Specs */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-accent/20">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <Bed className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-primary">Size</div>
                              <div className="text-xs text-muted-foreground">{roomType.size}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-accent" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-primary">Occupancy</div>
                              <div className="text-xs text-muted-foreground">{roomType.occupancy} guests</div>
                            </div>
                          </div>
                        </div>

                        {/* Room Amenities */}
                        <div>
                          <h4 className="text-lg font-semibold text-primary mb-3">Room Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {roomType.amenities.map((amenity, amenityIndex) => (
                              <Badge
                                key={amenityIndex}
                                variant="secondary"
                                className="bg-accent/10 text-accent hover:bg-accent/20 border-0 text-xs"
                              >
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
              Discover More Luxury Accommodations
            </h2>
            <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
            <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Explore our curated selection of Egypt's finest hotels and resorts. 
              Each property offers unique experiences designed for discerning travelers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/stay">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  data-testid="button-view-all-hotels"
                >
                  View All Hotels
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
      </main>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
