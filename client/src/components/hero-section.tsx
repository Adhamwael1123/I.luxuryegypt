import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, Star, Users, MapPin } from "lucide-react";
import { Link } from "wouter";
import sunsetFeluccaImage from "@assets/sunset-felucca_1757456567256.jpg";
import restaurantImage from "@assets/1902-restaurant_1757457083786.jpg";
import poolImage from "@assets/pool-and-rivet_1757457083793.jpg";
import suiteImage from "@assets/suite-nile_1757457083796.jpg";
import elegantHallImage from "@assets/elegant-hall_1757459228629.jpeg";
import khanKhaliliRestaurantImage from "@assets/khan-khalili-restaurant_1757459228636.jpeg";
import pyramidFromLobbyImage from "@assets/pyramid-from-lobby_1757459228637.jpeg";
import pyramidFromMenaHouseImage from "@assets/the-pyramid-from-mena-house_1757459228638.jpeg";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    pyramidFromMenaHouseImage,
    sunsetFeluccaImage,
    elegantHallImage,
    suiteImage
  ];

  const stats = [
    { icon: <Star className="h-4 w-4" />, value: "15+", label: "Years" },
    { icon: <Users className="h-4 w-4" />, value: "500+", label: "Travelers" },
    { icon: <MapPin className="h-4 w-4" />, value: "25+", label: "Destinations" }
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background" data-testid="hero-section">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${heroImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          data-testid={`hero-image-${currentImageIndex}`}
        />
        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="animate-fade-in">
                <Badge variant="outline" className="text-accent border-accent bg-accent/10 text-sm px-4 py-2">
                  Luxury Egyptian Travel Experiences
                </Badge>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                  Discover Egypt in 
                  <span className="text-accent block mt-2">Pure Luxury</span>
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-200 max-w-2xl">
                  Experience the wonders of ancient Egypt with bespoke journeys crafted for the most discerning travelers. Where timeless heritage meets uncompromising luxury.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2 text-white">
                    <div className="text-accent">{stat.icon}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="text-lg px-8 py-4 h-auto font-semibold min-w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl group bg-accent hover:bg-accent/90 text-primary border-accent"
                    data-testid="button-start-journey"
                  >
                    <Calendar className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <Link href="/destinations">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8 py-4 h-auto font-semibold min-w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl text-white border-white hover:bg-white hover:text-primary"
                    data-testid="button-explore-destinations"
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    Explore Destinations
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              {/* Featured Experience Card */}
              <Card className="bg-primary/20 backdrop-blur-sm border-white/20 text-white hover:bg-primary/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Star className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold">Pyramid Private Access</h3>
                      <p className="text-gray-200 text-sm">
                        Exclusive after-hours access to the Great Pyramid's interior chambers, reserved for our luxury guests only.
                      </p>
                      <Badge variant="outline" className="text-accent border-accent bg-accent/10 text-xs">
                        Exclusive Experience
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Luxury Accommodation Card */}
              <Card className="bg-primary/20 backdrop-blur-sm border-white/20 text-white hover:bg-primary/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold">Luxury Nile Suites</h3>
                      <p className="text-gray-200 text-sm">
                        Stay in palatial suites overlooking the Nile, featuring private terraces and world-class amenities.
                      </p>
                      <Badge variant="outline" className="text-accent border-accent bg-accent/10 text-xs">
                        5-Star Luxury
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent z-20"></div>
    </section>
  );
}
