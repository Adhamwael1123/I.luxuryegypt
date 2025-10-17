import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Clock, Users, MapPin, Star, Calendar, ArrowLeft, Heart, Baby } from "lucide-react";
import { Link } from "wouter";
import type { Tour } from "@shared/schema";

export default function FamilyLuxury() {
  
  const { data: toursData, isLoading, isError, error } = useQuery<{ success: boolean; tours: Tour[] }>({
    queryKey: ['/api/public/tours', 'Family Luxury'],
    queryFn: async () => {
      const res = await fetch('/api/public/tours?category=Family%20Luxury');
      if (!res.ok) throw new Error('Failed to fetch tours');
      return res.json();
    }
  });
  
  const familyTours = toursData?.tours || [];

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

          {isLoading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-64 w-full" />
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-12 bg-destructive/10 rounded-xl border border-destructive/20">
              <p className="text-lg font-semibold text-destructive mb-2">Unable to Load Tours</p>
              <p className="text-muted-foreground mb-4">
                {error instanceof Error ? error.message : 'An error occurred while fetching tours.'}
              </p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                data-testid="button-reload"
              >
                Try Again
              </Button>
            </div>
          ) : familyTours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No family tours available at the moment. Please check back soon!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {familyTours.map((tour) => (
              <Card
                key={tour.id}
                className="group overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] flex flex-col h-full min-h-[600px]"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.heroImage}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.category}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{tour.duration}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{tour.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col justify-between flex-grow">
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

                  {/* Includes/Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(tour.includes || []).slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <div>
                      <p className="text-2xl font-serif font-bold text-primary">${tour.price} {tour.currency}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:scale-105 transition-transform"
                        data-testid={`button-details-${tour.slug}`}
                      >
                        <Link href={`/tour/${tour.slug}`}>
                          Details
                        </Link>
                      </Button>
                      <Button size="sm" asChild className="hover:scale-105 transition-transform" data-testid={`button-book-${tour.slug}`}>
                        <Link href="/contact">
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
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