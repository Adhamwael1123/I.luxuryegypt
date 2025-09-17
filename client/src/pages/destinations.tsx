import { useState } from 'react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import ScrollToTopButton from '@/components/scroll-to-top-button';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

// Import Egyptian destination images
import alexandriaImage from '@assets/photo-1742262361725-ed34e4cbbcee_1758110281630.avif';
import aswanImage from '@assets/photo-1697546889969-27f7b5be8664_1758110296124.avif';
import cairoImage from '@assets/photo-1633033254409-bd538e785f51_1758110317428.avif';
import gizaImage from '@assets/photo-1553993500-d70955b75b5c_1758110346741.avif';
import hurghadaImage from '@assets/photo-1643806294274-2db9dcbfe7a5_1758110400291.avif';
import luxorExistingImage from '@assets/luxor_1757531163688.jpg';
import sharmImage from '@assets/photo-1584114130913-0852aeb8fe8c_1758110469649.avif';
import siwaImage from '@assets/photo-1627930855511-42cb0c457ee7_1758110488830.avif';
import dahahImage from '@assets/photo-1629229370300-207a44ac54cd_1758110419478.avif';

// Tailormade Journey card data
const tailormadeCard = {
  id: 'tailormade-journey',
  name: 'Tailormade Journey',
  description: 'Crafted around your specific interests, Tailormade Journeys are private just for you, your companions, and your A&K local guide, who helps you get the most out of every day of your journey.',
  size: 'info-card',
  type: 'info'
};

// Egyptian destinations with varied sizes for masonry layout
const destinations = [
  {
    id: 'alexandria',
    name: 'Alexandria',
    tagline: 'Mediterranean Pearl of Egypt',
    image: alexandriaImage,
    highlights: ['Bibliotheca Alexandrina', 'Citadel of Qaitbay', 'Montaza Palace', 'Corniche Waterfront'],
    size: 'large',
    type: 'destination'
  },
  {
    id: 'aswan',
    name: 'Aswan',
    tagline: 'Gateway to Nubian Heritage',
    image: aswanImage,
    highlights: ['Philae Temple', 'High Dam', 'Nubian Villages', 'Felucca Sailing'],
    size: 'medium',
    type: 'destination'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    tagline: 'The City of a Thousand Minarets',
    image: cairoImage,
    highlights: ['Islamic Cairo', 'Khan el-Khalili Bazaar', 'Saladin Citadel', 'Al-Azhar Mosque'],
    size: 'extra-tall',
    type: 'destination'
  },
  {
    id: 'giza',
    name: 'Giza',
    tagline: 'Home of the Great Pyramids',
    image: gizaImage,
    highlights: ['Great Pyramids', 'Great Sphinx', 'Solar Boat Museum', 'Sound & Light Show'],
    size: 'large',
    type: 'destination'
  },
  {
    id: 'hurghada',
    name: 'Hurghada',
    tagline: 'Red Sea Diving Paradise',
    image: hurghadaImage,
    highlights: ['Coral Reefs', 'World-class Diving', 'Marina Boulevard', 'Desert Safari'],
    size: 'tall',
    type: 'destination'
  },
  {
    id: 'luxor',
    name: 'Luxor',
    tagline: 'The World\'s Greatest Open-Air Museum',
    image: luxorExistingImage,
    highlights: ['Valley of the Kings', 'Karnak Temple', 'Luxor Temple', 'Hatshepsut Temple'],
    size: 'extra-tall',
    type: 'destination'
  },
  {
    id: 'sharm-el-sheikh',
    name: 'Sharm El-Sheikh',
    tagline: 'Sinai\'s Resort Paradise',
    image: sharmImage,
    highlights: ['Ras Mohammed Park', 'Naama Bay', 'Blue Hole Diving', 'St. Catherine Monastery'],
    size: 'medium',
    type: 'destination'
  },
  {
    id: 'siwa-oasis',
    name: 'Siwa Oasis',
    tagline: 'Desert Sanctuary & Ancient Oracle',
    image: siwaImage,
    highlights: ['Temple of the Oracle', 'Cleopatra Springs', 'Shali Fortress', 'Salt Lakes'],
    size: 'tall',
    type: 'destination'
  },
  {
    id: 'dahab',
    name: 'Dahab',
    tagline: 'Bohemian Red Sea Gem',
    image: dahahImage,
    highlights: ['Blue Hole', 'Lighthouse Reef', 'Bedouin Culture', 'Windsurfing'],
    size: 'small',
    type: 'destination'
  }
];

export default function Destinations() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredDestinations = destinations.filter(destination => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ancient') return ['cairo', 'giza', 'luxor', 'aswan'].includes(destination.id);
    if (selectedFilter === 'coastal') return ['alexandria', 'hurghada', 'sharm-el-sheikh', 'dahab'].includes(destination.id);
    if (selectedFilter === 'desert') return ['siwa-oasis', 'giza'].includes(destination.id);
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background via-accent/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6">
            Egyptian Destinations
          </h1>
          <div className="w-32 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover Egypt's most extraordinary destinations. From ancient temples and pyramids to pristine Red Sea coastlines, 
            explore the land of pharaohs through our bespoke luxury experiences.
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
              { key: 'coastal', label: 'Red Sea & Mediterranean' },
              { key: 'desert', label: 'Desert Experiences' }
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