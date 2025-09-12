import { useState } from "react";

interface WhyUseItem {
  id: number;
  title: string;
  image: string;
  content: string;
}

const whyUseItems: WhyUseItem[] = [
  {
    id: 1,
    title: "Luxury Your Way",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6b?w=400&h=600&fit=crop",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
  },
  {
    id: 2,
    title: "With You All The Way", 
    image: "https://images.unsplash.com/photo-1471919743851-c4df8b6ee347?w=400&h=600&fit=crop",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit."
  },
  {
    id: 3,
    title: "Travel Thoughtfully",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
  },
  {
    id: 4,
    title: "The I.LUXURYEGYPT Family",
    image: "https://images.unsplash.com/photo-1544967882-0515e6a4cd22?w=400&h=600&fit=crop",
    content: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate."
  }
];

export default function WhyUseSection() {
  const [selectedItem, setSelectedItem] = useState<WhyUseItem | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-accent/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Why Use I.LUXURYEGYPT?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4">
            {whyUseItems.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover-elevate active-elevate-2 transition-all duration-300"
                style={{ aspectRatio: '3/4' }}
                onClick={() => setSelectedItem(item)}
                data-testid={`why-use-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white font-serif font-bold text-lg md:text-xl leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Selection indicator */}
                {selectedItem?.id === item.id && (
                  <div className="absolute inset-0 ring-4 ring-accent ring-opacity-60 bg-accent/10"></div>
                )}
              </div>
            ))}
          </div>

          {/* Content Panel */}
          <div className="lg:pl-8">
            {selectedItem ? (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-serif font-bold text-primary mb-6">
                  {selectedItem.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {selectedItem.content}
                </p>
                <button 
                  className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors hover-elevate px-4 py-2 rounded-md border border-accent/20"
                  data-testid="learn-more-button"
                >
                  Learn More
                </button>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-muted-foreground mb-2">
                  Select an Image
                </h3>
                <p className="text-muted-foreground">
                  Click on any image to discover what makes I.LUXURYEGYPT special
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}