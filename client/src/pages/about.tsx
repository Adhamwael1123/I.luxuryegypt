import Navigation from "../components/navigation";
import AnnouncementBar from "../components/announcement-bar";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/scroll-to-top-button";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star, Award, Users, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

// Import luxury Egyptian images
import luxuryHallImage from "@assets/elegant-hall_1757459228629.jpeg";
import pyramidLobbyImage from "@assets/pyramid-from-lobby_1757459228637.jpeg";
import menahousePyramidImage from "@assets/the-pyramid-from-mena-house_1757459228638.jpeg";
import suiteNileImage from "@assets/suite-nile_1757457083796.jpg";
import poolRiverImage from "@assets/pool-and-rivet_1757457083793.jpg";
import sunsetFeluccaImage from "@assets/sunset-felucca_1757456567256.jpg";
import khanKhaliliImage from "@assets/khan-khalili-restaurant_1757459228636.jpeg";
import columnHallImage from "@assets/inside-the-column-hall_1757699232094.jpg";
import islamicDistrictImage from "@assets/islamic-district-at-dawn_1757699232100.jpg";
import poolsideDrinkImage from "@assets/pool-side-drink_1757699232100.jpg";
import siwaPalmTreesImage from "@assets/siwa-palm-trees_1757699232101.jpg";

export default function About() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { icon: <Users className="h-8 w-8 text-accent" />, number: "500+", label: "Luxury Travelers" },
    { icon: <Star className="h-8 w-8 text-accent" />, number: "15+", label: "Years Experience" },
    { icon: <Award className="h-8 w-8 text-accent" />, number: "50+", label: "Luxury Partners" },
    { icon: <MapPin className="h-8 w-8 text-accent" />, number: "25+", label: "Unique Destinations" },
  ];


  const team = [
    {
      name: "Ahmed Hassan",
      role: "Founder & Chief Experience Officer",
      description: "With over 15 years in luxury hospitality, Ahmed founded I.LuxuryEgypt to share Egypt's wonders with discerning travelers.",
      image: pyramidLobbyImage,
    },
    {
      name: "Yasmin Farouk",
      role: "Luxury Travel Curator",
      description: "Our expert curator designs exclusive experiences that blend ancient history with modern luxury.",
      image: islamicDistrictImage,
    },
    {
      name: "Omar Mansour",
      role: "Guest Experience Director",
      description: "Ensuring every moment of your journey exceeds expectations with 24/7 concierge service.",
      image: khanKhaliliImage,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {!isVideoPlaying ? (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${menahousePyramidImage})` 
              }}
            />
          ) : (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              controls={false}
            >
              <source src="/attached_assets/Salt Lake Float Therapy_1757459954474.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 animate-fade-in">
            About I.LuxuryEgypt
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Redefining luxury travel in the cradle of civilization, where ancient wonders meet modern sophistication.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              data-testid="button-play-video"
            >
              <Play className="h-5 w-5 mr-2" />
              {isVideoPlaying ? "View Gallery" : "Watch Story"}
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-start-journey"
              >
                Start Your Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <main>
        {/* Our Story Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Born from a passion for Egypt's timeless beauty and a commitment to unparalleled luxury, 
                    I.LuxuryEgypt was founded to offer discerning travelers an extraordinary way to experience 
                    the land of the Pharaohs.
                  </p>
                  <p>
                    We believe that luxury travel is not just about opulent accommodations and exclusive access—it's 
                    about creating transformative experiences that connect you deeply with Egypt's rich heritage, 
                    breathtaking landscapes, and warm hospitality.
                  </p>
                  <p>
                    From private sunrise ceremonies at the Pyramids of Giza to intimate felucca cruises on the Nile 
                    at sunset, every moment is carefully orchestrated to create memories that last a lifetime.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img 
                    src={sunsetFeluccaImage} 
                    alt="Sunset felucca cruise on the Nile" 
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={poolRiverImage} 
                    alt="Luxury poolside experience" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img 
                    src={poolsideDrinkImage} 
                    alt="Poolside luxury service" 
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                  <img 
                    src={siwaPalmTreesImage} 
                    alt="Siwa Oasis palm trees" 
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
                Excellence in Numbers
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Our commitment to luxury travel excellence, measured by the experiences we've crafted.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-2">
                    {stat.number}
                  </div>
                  <div className="text-primary-foreground/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-background" data-testid="section-values">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="tracking-[0.2em] uppercase text-accent text-sm font-medium mb-4">
                Our Foundation
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Our Values
              </h2>
              <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three principles that guide every extraordinary journey we create.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Bespoke Excellence */}
              <div className="group text-center">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={luxuryHallImage} 
                    alt="Bespoke Excellence"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 border border-accent/20 rounded-lg" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4" data-testid="value-title-0">
                  Bespoke Excellence
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every journey is meticulously crafted to exceed your expectations, 
                  with attention to the finest details that create unforgettable moments.
                </p>
              </div>

              {/* Cultural Authenticity */}
              <div className="group text-center">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={columnHallImage} 
                    alt="Cultural Authenticity"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 border border-accent/20 rounded-lg" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4" data-testid="value-title-1">
                  Cultural Authenticity
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience Egypt's rich heritage through exclusive access to 
                  historical sites and genuine connections with local traditions.
                </p>
              </div>

              {/* Luxury Accommodations */}
              <div className="group text-center">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={suiteNileImage} 
                    alt="Luxury Accommodations"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 border border-accent/20 rounded-lg" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4" data-testid="value-title-2">
                  Luxury Accommodations
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay in Egypt's most prestigious hotels and resorts, 
                  handpicked for their exceptional service and unparalleled comfort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Passionate experts dedicated to crafting your perfect Egyptian luxury experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 hover-elevate">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                      <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                      <p className="text-accent font-medium">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                The I.LuxuryEgypt Difference
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">24/7 Concierge</h3>
                <p className="text-muted-foreground">
                  Round-the-clock support from our dedicated luxury travel specialists, ensuring every need is met.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Exclusive Access</h3>
                <p className="text-muted-foreground">
                  Private entrances to historical sites, after-hours museum visits, and VIP experiences unavailable to regular tourists.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">Luxury Partners</h3>
                <p className="text-muted-foreground">
                  Partnerships with Egypt's finest hotels, restaurants, and service providers for an unmatched experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
              Begin Your Egyptian Journey
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Ready to experience Egypt like never before? Let our luxury travel specialists craft your perfect adventure.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 text-lg"
                  data-testid="button-contact-us"
                >
                  Contact Our Specialists
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  data-testid="button-explore-experiences"
                >
                  Explore Experiences
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