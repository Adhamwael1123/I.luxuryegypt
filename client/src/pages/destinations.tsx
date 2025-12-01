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
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                data-testid={`destination-${destination.id}`}
              >
                <Link href={`/destinations/${destination.id}`} className="block h-full">
                  <div className="relative bg-gradient-to-br from-white via-white to-accent/5 rounded-2xl border border-accent/20 shadow-lg overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-accent/40 group-hover:bg-gradient-to-br group-hover:from-white group-hover:via-accent/5 group-hover:to-accent/10">

                    {/* Luxury accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Image container with sophisticated overlay */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={'image' in destination ? destination.image : ''}
                        alt={destination.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Sophisticated gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary/30 opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                      {/* Elegant destination name with luxury styling */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="space-y-2">
                          <div className="w-12 h-px bg-accent/80"></div>
                          <h3 className="text-2xl font-serif font-bold text-white mb-1 tracking-wide" data-testid={`destination-name-${destination.id}`}>
                            {destination.name}
                          </h3>
                          <p className="text-accent/90 font-light text-sm tracking-widest uppercase">
                            {'tagline' in destination ? destination.tagline : ''}
                          </p>
                        </div>
                      </div>

                      {/* Premium corner accent */}
                      <div className="absolute top-4 right-4 w-8 h-8 border-2 border-accent/60 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-accent/20 transition-all duration-500">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                    </div>

                    {/* Luxury card content */}
                    <div className="p-8 flex-1 flex flex-col relative">

                      {/* Premium highlights with elegant styling */}
                      <div className="space-y-3 mb-6 flex-1">
                        <h4 className="text-sm font-medium text-primary/70 tracking-widest uppercase mb-4">
                          Signature Experiences
                        </h4>
                        {('highlights' in destination ? destination.highlights : []).slice(0, 3).map((highlight: string, index: number) => (
                          <div key={index} className="flex items-start group/item">
                            <div className="w-2 h-2 bg-gradient-to-r from-accent to-accent/60 rounded-full mr-4 mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
                            <span className="text-muted-foreground font-light leading-relaxed group-hover/item:text-primary transition-colors duration-300">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Luxury action area with sophisticated styling */}
                      <div className="pt-6 border-t border-gradient-to-r from-transparent via-accent/20 to-transparent">
                        <div className="flex items-center justify-between group/action">
                          <div className="flex flex-col">
                            <span className="text-primary font-serif font-medium text-lg group-hover/action:text-accent transition-colors duration-300">
                              Discover Luxury
                            </span>
                            <span className="text-muted-foreground text-xs tracking-wide uppercase font-light">
                              Bespoke Experiences Await
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center group-hover/action:bg-gradient-to-br group-hover/action:from-accent/20 group-hover/action:to-accent/30 transition-all duration-300 group-hover/action:scale-110">
                            <svg className="w-5 h-5 text-accent group-hover/action:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Subtle decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 border border-accent/10 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="absolute top-6 right-6 w-8 h-8 border border-accent/20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>
                  </div>
                </Link>
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