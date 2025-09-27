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
import newGizaImage from '@assets/photo-1553993500-d70955b75b5c_1758111284493.avif';
import newDahabImage from '@assets/photo-1660151177491-2e27a9cf6deb_1758111400928.avif';

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
    image: aswanImage,
    highlights: ['Bibliotheca Alexandrina', 'Citadel of Qaitbay', 'Montaza Palace', 'Corniche Waterfront'],
    size: 'large',
    type: 'destination'
  },
  {
    id: 'aswan',
    name: 'Aswan',
    tagline: 'Gateway to Nubian Heritage',
    image: cairoImage,
    highlights: ['Philae Temple', 'High Dam', 'Nubian Villages', 'Felucca Sailing'],
    size: 'medium',
    type: 'destination'
  },
  {
    id: 'cairo',
    name: 'Cairo',
    tagline: 'The City of a Thousand Minarets',
    image: newGizaImage,
    highlights: ['Islamic Cairo', 'Khan el-Khalili Bazaar', 'Saladin Citadel', 'Al-Azhar Mosque'],
    size: 'extra-tall',
    type: 'destination'
  },
  {
    id: 'giza',
    name: 'Giza',
    tagline: 'Home of the Great Pyramids',
    image: alexandriaImage,
    highlights: ['Great Pyramids', 'Great Sphinx', 'Solar Boat Museum', 'Sound & Light Show'],
    size: 'large',
    type: 'destination'
  },
  {
    id: 'hurghada',
    name: 'Hurghada',
    tagline: 'Red Sea Diving Paradise',
    image: siwaImage,
    highlights: ['Coral Reefs', 'World-class Diving', 'Marina Boulevard', 'Desert Safari'],
    size: 'tall',
    type: 'destination'
  },
  {
    id: 'luxor',
    name: 'Luxor',
    tagline: 'The World\'s Greatest Open-Air Museum',
    image: hurghadaImage,
    highlights: ['Valley of the Kings', 'Karnak Temple', 'Luxor Temple', 'Hatshepsut Temple'],
    size: 'extra-tall',
    type: 'destination'
  },
  {
    id: 'sharm-el-sheikh',
    name: 'Sharm El-Sheikh',
    tagline: 'Sinai\'s Resort Paradise',
    image: dahahImage,
    highlights: ['Ras Mohammed Park', 'Naama Bay', 'Blue Hole Diving', 'St. Catherine Monastery'],
    size: 'medium',
    type: 'destination'
  },
  {
    id: 'siwa-oasis',
    name: 'Siwa Oasis',
    tagline: 'Desert Sanctuary & Ancient Oracle',
    image: sharmImage,
    highlights: ['Temple of the Oracle', 'Cleopatra Springs', 'Shali Fortress', 'Salt Lakes'],
    size: 'tall',
    type: 'destination'
  },
  {
    id: 'dahab',
    name: 'Dahab',
    tagline: 'Bohemian Red Sea Gem',
    image: newDahabImage,
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

      {/* Destinations Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...filteredDestinations, tailormadeCard].map((destination) => (
              <div
                key={destination.id}
                className="group cursor-pointer"
                data-testid={`destination-${destination.id}`}
              >
                {destination.type === 'info' ? (
                  // Tailormade Journey Card
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 h-full flex flex-col">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                      {destination.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
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
                  // All Destination Cards - Click-only interaction
                  <Link href={`/destinations/${destination.id}`} className="block h-full">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col cursor-pointer">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={'image' in destination ? destination.image : ''}
                          alt={destination.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Destination name overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-serif font-bold text-white mb-1" data-testid={`destination-name-${destination.id}`}>
                            {destination.name}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Card content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-accent font-medium mb-3 text-sm tracking-wide">
                          {'tagline' in destination ? destination.tagline : ''}
                        </p>
                        
                        {/* Highlights */}
                        <div className="space-y-2 mb-4 flex-1">
                          {('highlights' in destination ? destination.highlights : []).slice(0, 3).map((highlight: string, index: number) => (
                            <div key={index} className="flex items-center text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                              {highlight}
                            </div>
                          ))}
                        </div>
                        
                        {/* Action button area */}
                        <div className="pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-medium text-sm">
                              Explore destination
                            </span>
                            <div className="w-5 h-5 text-primary">
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
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