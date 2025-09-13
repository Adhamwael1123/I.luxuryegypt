import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

// Destination data for Egyptian cities
const destinations = [
  {
    id: 'cairo',
    name: 'Cairo',
    tagline: 'The Mother of the World',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Great Pyramid of Giza', 'Khan el-Khalili Bazaar', 'Islamic Cairo'],
    size: 'large'
  },
  {
    id: 'luxor',
    name: 'Luxor',
    tagline: 'The World\'s Greatest Open-Air Museum',
    image: 'https://images.unsplash.com/photo-1565969532103-86ac0c07ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Valley of the Kings', 'Karnak Temple', 'Luxor Temple'],
    size: 'large'
  },
  {
    id: 'aswan',
    name: 'Aswan',
    tagline: 'Nubian Charm',
    image: 'https://images.unsplash.com/photo-1563659916-b4ef70cc6201?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Philae Temple', 'Nubian Villages', 'High Dam'],
    size: 'medium'
  },
  {
    id: 'sharm-el-sheikh',
    name: 'Sharm El Sheikh',
    tagline: 'Red Sea Paradise',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['World-Class Diving', 'Naama Bay', 'Sinai Mountains'],
    size: 'medium'
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    tagline: 'Pearl of the Mediterranean',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Library of Alexandria', 'Citadel of Qaitbay', 'Mediterranean Coast'],
    size: 'large'
  },
  {
    id: 'hurghada',
    name: 'Hurghada',
    tagline: 'Red Sea Resort Capital',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Coral Reefs', 'Desert Safari', 'Marina Boulevard'],
    size: 'medium'
  },
  {
    id: 'siwa',
    name: 'Siwa Oasis',
    tagline: 'Desert Jewel',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Cleopatra Spring', 'Berber Culture', 'Salt Lakes'],
    size: 'small'
  },
  {
    id: 'el-gouna',
    name: 'El Gouna',
    tagline: 'Venice of the Red Sea',
    image: 'https://images.unsplash.com/photo-1518621012360-d75747b6c1b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Lagoons & Islands', 'Golf Resort', 'Marina Life'],
    size: 'small'
  },
  {
    id: 'giza',
    name: 'Giza',
    tagline: 'Land of the Pyramids',
    image: 'https://images.unsplash.com/photo-1575550960215-28c5b0d1e24c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Great Pyramid', 'Sphinx', 'Solar Boat Museum'],
    size: 'large'
  },
  {
    id: 'dahab',
    name: 'Dahab',
    tagline: 'Bohemian Paradise',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Blue Hole', 'Bedouin Culture', 'Windsurfing'],
    size: 'medium'
  },
  {
    id: 'marsa-alam',
    name: 'Marsa Alam',
    tagline: 'Untouched Beauty',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Pristine Reefs', 'Sea Turtles', 'Desert Landscapes'],
    size: 'small'
  }
];

export default function Destinations() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredDestinations = destinations.filter(destination => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ancient') return ['cairo', 'luxor', 'aswan', 'giza'].includes(destination.id);
    if (selectedFilter === 'coast') return ['sharm-el-sheikh', 'hurghada', 'alexandria', 'el-gouna', 'dahab', 'marsa-alam'].includes(destination.id);
    if (selectedFilter === 'desert') return ['siwa'].includes(destination.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
            Discover Egypt
          </h1>
          <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From ancient wonders to pristine coastlines, explore Egypt's most captivating destinations 
            through our curated luxury experiences.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: 'All Destinations' },
              { key: 'ancient', label: 'Ancient Wonders' },
              { key: 'coast', label: 'Red Sea Coast' },
              { key: 'desert', label: 'Desert Oases' }
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

      {/* Destinations Masonry Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="masonry-grid">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className={`masonry-item ${destination.size} group cursor-pointer`}
                data-testid={`destination-${destination.id}`}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02]">
                  <div className="aspect-[4/5] md:aspect-[3/4] relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2" data-testid={`destination-name-${destination.id}`}>
                        {destination.name}
                      </h3>
                      <p className="text-accent/90 font-medium mb-4 tracking-wide">
                        {destination.tagline}
                      </p>
                      
                      {/* Highlights - visible on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {destination.highlights.slice(0, 2).map((highlight, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-90 hover:opacity-100"
                          asChild
                          data-testid={`button-plan-visit-${destination.id}`}
                        >
                          <Link href="/contact">
                            Plan Your Visit
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Accent border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-xl transition-colors duration-300" />
                  </div>
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
            Ready to Explore Egypt?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Let our travel specialists create a bespoke itinerary that captures the magic of Egypt's most magnificent destinations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="px-8 py-4 text-lg min-w-[200px]" data-testid="button-contact-specialists">
                Contact Our Specialists
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg min-w-[200px]" data-testid="button-learn-more">
                Learn More About Us
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