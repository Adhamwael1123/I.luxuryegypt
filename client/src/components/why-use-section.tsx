import { useState } from "react";
import insideColumnHallImg from "@assets/inside-the-column-hall_1757699232094.jpg";
import islamicDistrictImg from "@assets/islamic-district-at-dawn_1757699232100.jpg";
import poolSideDrinkImg from "@assets/pool-side-drink_1757699232100.jpg";
import siwaPalmTreesImg from "@assets/siwa-palm-trees_1757699232101.jpg";

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
    image: insideColumnHallImg,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
  },
  {
    id: 2,
    title: "Travel Thoughtfully",
    image: poolSideDrinkImg,
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
  },
  {
    id: 3,
    title: "With You All The Way", 
    image: islamicDistrictImg,
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit."
  },
  {
    id: 4,
    title: "The I.LUXURYEGYPT Family",
    image: siwaPalmTreesImg,
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

        {/* Images Row with Content Space */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUseItems.map((item) => (
              <div key={item.id} className="relative">
                <div
                  className={`relative cursor-pointer overflow-visible rounded-2xl shadow-lg hover-elevate active-elevate-2 transition-all duration-700 ease-in-out ${
                    selectedItem?.id === item.id 
                      ? 'transform -translate-x-32 z-30' 
                      : 'transform translate-x-0 z-10'
                  }`}
                  style={{ aspectRatio: '3/4', minHeight: '400px' }}
                  onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                  data-testid={`why-use-item-${item.id}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-serif font-bold text-lg md:text-xl leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedItem?.id === item.id && (
                    <div className="absolute inset-0 ring-4 ring-accent ring-opacity-60 bg-accent/10 rounded-2xl"></div>
                  )}
                </div>

                {/* Revealed Content */}
                {selectedItem?.id === item.id && (
                  <div className="absolute top-0 left-0 w-80 h-full bg-white dark:bg-card p-8 flex flex-col justify-center shadow-2xl rounded-2xl z-20 ml-4 border border-border/20 animate-fade-in">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">
                      {selectedItem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                      {selectedItem.content}
                    </p>
                    <button 
                      className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors hover-elevate px-4 py-2 rounded-md border border-accent/20 w-fit"
                      data-testid="learn-more-button"
                    >
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Spacer for content */}
          {selectedItem && (
            <div className="h-4"></div>
          )}
        </div>
      </div>
    </section>
  );
}