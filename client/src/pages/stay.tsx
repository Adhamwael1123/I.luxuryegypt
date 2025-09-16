import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Star, MapPin } from 'lucide-react';

// Luxury hotel data with varied sizes for masonry layout
const hotels = [
  {
    id: 'four-seasons-cairo',
    name: 'Four Seasons Hotel Cairo',
    location: 'Cairo',
    tagline: 'Nile River Luxury',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Spa & Wellness', 'Nile Views', 'Fine Dining'],
    rating: 5,
    priceRange: '$$$',
    size: 'large',
    type: 'hotel'
  },
  {
    id: 'old-winter-palace-luxor',
    name: 'Sofitel Winter Palace Luxor',
    location: 'Luxor',
    tagline: 'Historic Grandeur',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Historic Architecture', 'Nile Gardens', 'Royal Heritage'],
    rating: 5,
    priceRange: '$$$',
    size: 'tall',
    type: 'hotel'
  },
  {
    id: 'jolie-ville-aswan',
    name: 'Movenpick Resort Aswan',
    location: 'Aswan',
    tagline: 'Island Paradise',
    image: 'https://images.unsplash.com/photo-1578774204375-826dc5cd59bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Island', 'Nubian Style', 'Pool Complex'],
    rating: 4,
    priceRange: '$$',
    size: 'medium',
    type: 'hotel'
  },
  {
    id: 'red-sea-resort',
    name: 'Kempinski Soma Bay',
    location: 'Red Sea',
    tagline: 'Desert Meets Ocean',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Beach', 'Golf Course', 'Desert Views'],
    rating: 5,
    priceRange: '$$$',
    size: 'large',
    type: 'hotel'
  },
  {
    id: 'steigenberger-dahab',
    name: 'Steigenberger Alcazar',
    location: 'Sharm El Sheikh',
    tagline: 'Red Sea Diving Paradise',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Diving Center', 'Coral Reefs', 'Beach Access'],
    rating: 4,
    priceRange: '$$',
    size: 'medium',
    type: 'hotel'
  },
  {
    id: 'siwa-eco-lodge',
    name: 'Adrère Amellal Desert Eco-Lodge',
    location: 'Siwa Oasis',
    tagline: 'Authentic Desert Experience',
    image: 'https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Eco-Friendly', 'Desert Views', 'Traditional Architecture'],
    rating: 4,
    priceRange: '$$',
    size: 'small',
    type: 'hotel'
  },
  {
    id: 'alexandria-historical',
    name: 'Steigenberger Cecil Hotel',
    location: 'Alexandria',
    tagline: 'Mediterranean Elegance',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Historic Charm', 'Sea Views', 'City Center'],
    rating: 4,
    priceRange: '$$',
    size: 'medium',
    type: 'hotel'
  },
  {
    id: 'nile-cruise-ship',
    name: 'Sonesta Star Goddess',
    location: 'Nile River',
    tagline: 'Floating Palace',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['River Cruise', 'All-Inclusive', 'Guided Tours'],
    rating: 5,
    priceRange: '$$$',
    size: 'extra-tall',
    type: 'hotel'
  },
  {
    id: 'cairo-boutique',
    name: 'Villa Belle Époque',
    location: 'Cairo',
    tagline: 'Boutique Luxury',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    amenities: ['Boutique Style', 'Personalized Service', 'Historic Location'],
    rating: 4,
    priceRange: '$$',
    size: 'small',
    type: 'hotel'
  }
];

// Concierge service card
const conciergeCard = {
  id: 'concierge-services',
  name: 'Personal Concierge',
  description: 'Our dedicated concierge team ensures every aspect of your stay is perfectly tailored to your preferences. From restaurant reservations to private tours and transportation arrangements.',
  size: 'info-card',
  type: 'info'
};

export default function Stay() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredHotels = hotels.filter(hotel => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'luxury') return hotel.rating === 5;
    if (selectedFilter === 'boutique') return hotel.priceRange === '$$';
    if (selectedFilter === 'resorts') return ['Red Sea', 'Sharm El Sheikh', 'Siwa Oasis'].includes(hotel.location);
    if (selectedFilter === 'city') return ['Cairo', 'Alexandria', 'Luxor', 'Aswan'].includes(hotel.location);
    return true;
  });

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
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
            Luxury Stays
          </h1>
          <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience Egypt's finest accommodations. From historic palaces to modern resorts, 
            discover handpicked luxury hotels that define exceptional hospitality.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: 'All Hotels' },
              { key: 'luxury', label: '5-Star Luxury' },
              { key: 'boutique', label: 'Boutique Hotels' },
              { key: 'resorts', label: 'Resort & Spa' },
              { key: 'city', label: 'City Centers' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter.key)}
                className="min-w-[140px]"
                data-testid={`filter-${filter.key}`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Hotels Masonry Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="masonry-grid">
            {[...filteredHotels, conciergeCard].map((hotel) => (
              <div
                key={hotel.id}
                className={`masonry-item ${hotel.size} group cursor-pointer`}
                data-testid={`hotel-${hotel.id}`}
              >
                {hotel.type === 'info' ? (
                  // Concierge Service Card
                  <div className="card-content rounded-xl shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
                      {hotel.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {'description' in hotel ? hotel.description : ''}
                    </p>
                    <Button 
                      className="w-full" 
                      asChild
                      data-testid="button-concierge-contact"
                    >
                      <Link href="/contact">
                        CONTACT CONCIERGE
                      </Link>
                    </Button>
                  </div>
                ) : (
                  // Regular Hotel Card
                  <div className="card-content relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02]">
                    <img
                      src={'image' in hotel ? hotel.image : ''}
                      alt={hotel.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold" data-testid={`hotel-name-${hotel.id}`}>
                          {hotel.name}
                        </h3>
                        {'priceRange' in hotel && (
                          <span className="text-accent font-bold text-lg">
                            {hotel.priceRange}
                          </span>
                        )}
                      </div>
                      
                      {'location' in hotel && (
                        <div className="flex items-center mb-2">
                          <MapPin className="w-4 h-4 mr-2 text-accent" />
                          <span className="text-accent/90 font-medium">
                            {hotel.location}
                          </span>
                        </div>
                      )}
                      
                      {'rating' in hotel && (
                        <div className="flex items-center mb-3">
                          {renderStars(hotel.rating)}
                          <span className="ml-2 text-accent/90 text-sm">
                            {hotel.rating}/5
                          </span>
                        </div>
                      )}
                      
                      <p className="text-accent/90 font-medium mb-4 tracking-wide">
                        {'tagline' in hotel ? hotel.tagline : ''}
                      </p>
                      
                      {/* Amenities - visible on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {('amenities' in hotel ? hotel.amenities : []).slice(0, 2).map((amenity: string, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-90 hover:opacity-100"
                          asChild
                          data-testid={`button-book-${hotel.id}`}
                        >
                          <Link href="/contact">
                            Book Now
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Accent border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-xl transition-colors duration-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Ready for Luxury?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Let our travel specialists secure the perfect accommodation for your Egyptian adventure. 
            From presidential suites to private villas, we ensure every stay exceeds expectations.
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
      <ScrollToTopButton />
    </div>
  );
}