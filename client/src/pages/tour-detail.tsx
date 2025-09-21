
import { useState } from 'react';
import { useParams, Link } from 'wouter';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Calendar,
  CheckCircle,
  Camera,
  Utensils,
  Bed,
  Car,
  Phone,
  Mail,
  ArrowLeft
} from 'lucide-react';

// Sample tour data - in a real app, this would come from an API
const tourData = {
  'pharaohs-legacy': {
    id: 'pharaohs-legacy',
    name: "Pharaohs' Legacy Tour",
    tagline: "Journey through 5,000 years of history",
    location: "Cairo, Luxor, Aswan",
    duration: "10 Days / 9 Nights",
    groupSize: "Max 12 People",
    price: "From $3,850",
    rating: 4.9,
    reviewCount: 127,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1594735797063-9d0c7e54f6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1568322929798-01ba9c6dbe76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Embark on an extraordinary journey through ancient Egypt, exploring magnificent temples, tombs, and monuments that have stood for millennia. This carefully curated tour combines luxury accommodations with authentic cultural experiences, guided by expert Egyptologists.",
    highlights: [
      "Private access to the Great Pyramid's interior",
      "Sunrise hot air balloon over Luxor",
      "Traditional felucca sailing on the Nile",
      "Expert Egyptologist guide throughout",
      "Luxury 5-star accommodations",
      "All meals and private transportation"
    ],
    included: [
      "9 nights luxury accommodation",
      "All meals (breakfast, lunch, dinner)",
      "Private air-conditioned transportation",
      "Expert English-speaking guide",
      "All entrance fees and permits",
      "Domestic flights Cairo-Luxor-Aswan",
      "Hot air balloon ride in Luxor",
      "Traditional felucca sailing",
      "Airport transfers"
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Optional activities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cairo",
        location: "Cairo",
        description: "Arrive at Cairo International Airport where you'll be met by our representative and transferred to your luxury hotel. Evening welcome dinner with tour briefing.",
        activities: ["Airport transfer", "Hotel check-in", "Welcome dinner", "Tour briefing"],
        accommodation: "Four Seasons Hotel Cairo",
        meals: ["Dinner"]
      },
      {
        day: 2,
        title: "Pyramids of Giza & Sphinx",
        location: "Giza",
        description: "Begin your ancient Egypt adventure with a visit to the legendary Pyramids of Giza and the Great Sphinx. Enjoy exclusive access to the interior of the Great Pyramid.",
        activities: ["Great Pyramid interior visit", "Sphinx exploration", "Solar Boat Museum", "Sound & Light show"],
        accommodation: "Four Seasons Hotel Cairo",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 3,
        title: "Egyptian Museum & Islamic Cairo",
        location: "Cairo",
        description: "Explore the world-renowned Egyptian Museum with its incredible collection of ancient artifacts, including Tutankhamun's treasures. Afternoon exploration of Islamic Cairo.",
        activities: ["Egyptian Museum tour", "Tutankhamun collection", "Khan el-Khalili bazaar", "Al-Azhar Mosque"],
        accommodation: "Four Seasons Hotel Cairo",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 4,
        title: "Flight to Luxor - East Bank",
        location: "Luxor",
        description: "Morning flight to Luxor. Visit the magnificent Karnak Temple Complex and Luxor Temple on the East Bank of the Nile.",
        activities: ["Flight to Luxor", "Karnak Temple", "Luxor Temple", "Evening at leisure"],
        accommodation: "Winter Palace Luxor",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 5,
        title: "Valley of the Kings & Hot Air Balloon",
        location: "Luxor West Bank",
        description: "Early morning hot air balloon ride over Luxor at sunrise. Explore the Valley of the Kings, including Tutankhamun's tomb, and visit Hatshepsut's Temple.",
        activities: ["Hot air balloon ride", "Valley of the Kings", "Tutankhamun's tomb", "Hatshepsut Temple"],
        accommodation: "Winter Palace Luxor",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 6,
        title: "Edfu & Kom Ombo Temples",
        location: "Edfu & Kom Ombo",
        description: "Journey to Edfu to visit the remarkably preserved Temple of Horus, then continue to Kom Ombo to see the unique double temple dedicated to Sobek and Haroeris.",
        activities: ["Temple of Horus at Edfu", "Kom Ombo Temple", "Nile scenery", "Travel to Aswan"],
        accommodation: "Old Cataract Aswan",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 7,
        title: "Abu Simbel Temples",
        location: "Abu Simbel",
        description: "Early departure for Abu Simbel to witness Ramesses II's magnificent temples. These UNESCO World Heritage sites are among Egypt's most impressive monuments.",
        activities: ["Abu Simbel Great Temple", "Temple of Nefertari", "UNESCO site exploration", "Return to Aswan"],
        accommodation: "Old Cataract Aswan",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 8,
        title: "Philae Temple & Felucca Sailing",
        location: "Aswan",
        description: "Visit the beautiful Philae Temple on Agilkia Island, dedicated to the goddess Isis. Afternoon felucca sailing around Elephantine Island and visit a Nubian village.",
        activities: ["Philae Temple", "Felucca sailing", "Nubian village visit", "Aswan High Dam"],
        accommodation: "Old Cataract Aswan",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 9,
        title: "Return to Cairo",
        location: "Cairo",
        description: "Morning flight back to Cairo. Visit Saqqara and Memphis, including the Step Pyramid of Djoser. Farewell dinner with traditional entertainment.",
        activities: ["Flight to Cairo", "Saqqara Step Pyramid", "Memphis ruins", "Farewell dinner"],
        accommodation: "Four Seasons Hotel Cairo",
        meals: ["Breakfast", "Lunch", "Dinner"]
      },
      {
        day: 10,
        title: "Departure",
        location: "Cairo",
        description: "Transfer to Cairo International Airport for your departure flight. End of your unforgettable journey through ancient Egypt.",
        activities: ["Hotel check-out", "Airport transfer", "Departure"],
        accommodation: "N/A",
        meals: ["Breakfast"]
      }
    ]
  }
};

export default function TourDetail() {
  const params = useParams();
  const tourId = params.id || 'pharaohs-legacy';
  const tour = tourData[tourId as keyof typeof tourData];
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!tour) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-primary mb-6">Tour Not Found</h1>
          <Link href="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/destinations">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Destinations
              </Button>
            </Link>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Tour Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <img
                  src={tour.gallery[selectedImage]}
                  alt={tour.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-primary">
                    <Camera className="h-3 w-3 mr-1" />
                    {selectedImage + 1} / {tour.gallery.length}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {tour.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-accent opacity-100' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${tour.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-accent font-medium mb-2">
                  <MapPin className="h-4 w-4" />
                  {tour.location}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
                  {tour.name}
                </h1>
                <p className="text-xl text-muted-foreground font-light">
                  {tour.tagline}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {tour.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {tour.groupSize}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {tour.rating} ({tour.reviewCount} reviews)
                </div>
              </div>

              <div className="bg-muted/50 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-serif font-bold text-primary">
                      {tour.price}
                    </p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                  <div className="flex gap-3">
                    <Button size="lg" asChild>
                      <Link href="/contact">
                        <Phone className="h-4 w-4 mr-2" />
                        Book Now
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/contact">
                        <Mail className="h-4 w-4 mr-2" />
                        Inquire
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  All-inclusive luxury tour with expert guides and premium accommodations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'itinerary', label: 'Itinerary' },
              { key: 'included', label: 'What\'s Included' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-accent text-accent font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                    Tour Overview
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    Tour Highlights
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {tour.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary mb-4">
                      Quick Facts
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{tour.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Group Size:</span>
                        <span className="font-medium">{tour.groupSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{tour.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{tour.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
                Daily Itinerary
              </h2>
              <div className="space-y-6">
                {tour.itinerary.map((day, index) => (
                  <Card key={day.day} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="bg-accent/10 p-6 flex-shrink-0">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg mb-2">
                              {day.day}
                            </div>
                            <p className="text-xs text-muted-foreground font-medium">
                              DAY
                            </p>
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-serif font-bold text-primary mb-1">
                                {day.title}
                              </h3>
                              <div className="flex items-center gap-1 text-accent text-sm">
                                <MapPin className="h-3 w-3" />
                                {day.location}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              {day.meals.map((meal, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  <Utensils className="h-3 w-3 mr-1" />
                                  {meal}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {day.description}
                          </p>
                          
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Activities
                              </h4>
                              <ul className="space-y-1">
                                {day.activities.map((activity, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-accent flex-shrink-0" />
                                    {activity}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {day.accommodation !== 'N/A' && (
                              <div>
                                <h4 className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                                  <Bed className="h-4 w-4" />
                                  Accommodation
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {day.accommodation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'included' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                  What's Included
                </h2>
                <div className="space-y-4">
                  {tour.included.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                  Not Included
                </h2>
                <div className="space-y-4">
                  {tour.notIncluded.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="h-5 w-5 border-2 border-red-300 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <div className="h-2 w-2 bg-red-300 rounded-full" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Ready to Begin Your Journey?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Contact our travel specialists to customize this tour or create your own bespoke Egyptian adventure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg min-w-[200px]">
                <Phone className="h-5 w-5 mr-2" />
                Book This Tour
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg min-w-[200px]">
                <Mail className="h-5 w-5 mr-2" />
                Request Information
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
