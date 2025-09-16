import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

// Tailormade Journey card data
const tailormadeCard = {
  id: 'tailormade-journey',
  name: 'Tailormade Journey',
  description: 'Crafted around your specific interests, Tailormade Journeys are private just for you, your companions, and your A&K local guide, who helps you get the most out of every day of your journey.',
  size: 'info-card',
  type: 'info'
};

// Global destination regions with varied sizes for masonry layout
const destinations = [
  {
    id: 'africa',
    name: 'Africa',
    tagline: 'Wild Adventures Await',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Safari Expeditions', 'Cultural Immersion', 'Victoria Falls'],
    size: 'large',
    type: 'region'
  },
  {
    id: 'antarctica-arctic',
    name: 'Antarctica & The Arctic',
    tagline: 'Ultimate Polar Expeditions',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Penguin Colonies', 'Arctic Wildlife', 'Ice Landscapes'],
    size: 'extra-tall',
    type: 'region'
  },
  {
    id: 'asia',
    name: 'Asia',
    tagline: 'Ancient Traditions & Modern Wonders',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Temple Complexes', 'Cultural Heritage', 'Natural Beauty'],
    size: 'medium',
    type: 'region'
  },
  {
    id: 'australasia',
    name: 'Australasia',
    tagline: 'Diverse Landscapes & Unique Wildlife',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Great Barrier Reef', 'Outback Adventures', 'Maori Culture'],
    size: 'tall',
    type: 'region'
  },
  {
    id: 'europe',
    name: 'Europe',
    tagline: 'Rich History & Cultural Treasures',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Historic Cities', 'Art & Architecture', 'Culinary Experiences'],
    size: 'small',
    type: 'region'
  },
  {
    id: 'central-america',
    name: 'Central America',
    tagline: 'Colonial Charm & Natural Wonders',
    image: 'https://images.unsplash.com/photo-1518621012360-d75747b6c1b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Maya Heritage', 'Cloud Forests', 'Colonial Architecture'],
    size: 'medium',
    type: 'region'
  },
  {
    id: 'south-america',
    name: 'South America',
    tagline: 'Dramatic Landscapes & Vibrant Cultures',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Machu Picchu', 'Amazon Rainforest', 'Patagonia'],
    size: 'medium',
    type: 'region'
  },
  {
    id: 'caribbean',
    name: 'Caribbean',
    tagline: 'Tropical Paradise & Island Life',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Pristine Beaches', 'Crystal Waters', 'Island Hopping'],
    size: 'small',
    type: 'region'
  },
  {
    id: 'indian-ocean',
    name: 'Indian Ocean',
    tagline: 'Secluded Islands & Luxury Retreats',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Private Islands', 'Diving & Snorkeling', 'Luxury Resorts'],
    size: 'tall',
    type: 'region'
  },
  {
    id: 'middle-east-north-africa',
    name: 'Middle East & North Africa',
    tagline: 'Ancient Civilizations & Desert Magic',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['Historic Sites', 'Desert Adventures', 'Cultural Heritage'],
    size: 'medium',
    type: 'region'
  },
  {
    id: 'north-america',
    name: 'North America',
    tagline: 'Vast Wilderness & Iconic Cities',
    image: 'https://images.unsplash.com/photo-1563659916-b4ef70cc6201?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highlights: ['National Parks', 'Urban Experiences', 'Natural Wonders'],
    size: 'large',
    type: 'region'
  }
];

export default function Destinations() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredDestinations = destinations.filter(destination => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'adventure') return ['africa', 'antarctica-arctic', 'south-america', 'north-america'].includes(destination.id);
    if (selectedFilter === 'cultural') return ['asia', 'europe', 'middle-east-north-africa', 'central-america'].includes(destination.id);
    if (selectedFilter === 'tropical') return ['caribbean', 'indian-ocean', 'australasia'].includes(destination.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
            Destinations
          </h1>
          <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary destinations across the globe. From wild adventures to cultural treasures, 
            explore the world's most captivating regions through our bespoke luxury experiences.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { key: 'all', label: 'All Destinations' },
              { key: 'adventure', label: 'Adventure & Wildlife' },
              { key: 'cultural', label: 'Cultural Heritage' },
              { key: 'tropical', label: 'Tropical Paradises' }
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
            {[...filteredDestinations, tailormadeCard].map((destination) => (
              <div
                key={destination.id}
                className={`masonry-item ${destination.size} group cursor-pointer`}
                data-testid={`destination-${destination.id}`}
              >
                {destination.type === 'info' ? (
                  // Tailormade Journey Card
                  <div className="card-content rounded-xl shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
                      {destination.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {'description' in destination ? destination.description : ''}
                    </p>
                    <Button 
                      className="w-full" 
                      asChild
                      data-testid="button-tailormade-view-details"
                    >
                      <Link href="/contact">
                        VIEW DETAILS
                      </Link>
                    </Button>
                  </div>
                ) : (
                  // Regular Destination Card
                  <div className="card-content relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:scale-[1.02]">
                    <img
                      src={'image' in destination ? destination.image : ''}
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
                        {'tagline' in destination ? destination.tagline : ''}
                      </p>
                      
                      {/* Highlights - visible on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {('highlights' in destination ? destination.highlights : []).slice(0, 2).map((highlight: string, index: number) => (
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
            Ready to Explore the World?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Let our travel specialists create a bespoke itinerary that captures the magic of the world's most extraordinary destinations.
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