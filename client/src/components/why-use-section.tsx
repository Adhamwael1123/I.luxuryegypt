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
    content: "We don't believe in one-size-fits-all. Our local experts handcraft every journey to be a unique masterpiece, personalized just for you."
  },
  {
    id: 2,
    title: "Travel Thoughtfully",
    image: poolSideDrinkImg,
    content: "We are a family of passionate Egyptians with deep roots in this land. We connect you to the authentic heart of Egypt, ensuring a meaningful and thoughtful travel experience."
  },
  {
    id: 3,
    title: "With You All The Way", 
    image: islamicDistrictImg,
    content: "From your first dream of Egypt until you're home with new memories, you're part of our family. Our team provides personal care and support every step of the way."
  },
  {
    id: 4,
    title: "The I.LUXURYEGYPT Family",
    image: siwaPalmTreesImg,
    content: "Our tour guides are more than just guides; they're the best in Egypt. They are storytellers and friends who bring ancient wonders to life, creating a connection that lasts forever."
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

        {/* Images Row with Flip Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUseItems.map((item) => (
            <div 
              key={item.id} 
              className="relative cursor-pointer group perspective-1000"
              style={{ aspectRatio: '3/4', minHeight: '400px' }}
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Card Container */}
              <div 
                className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
                  selectedItem?.id === item.id ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side - Image */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl shadow-lg overflow-hidden hover-elevate active-elevate-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-serif font-bold text-lg md:text-xl leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Back Side - Content */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-lg bg-white dark:bg-card p-8 flex flex-col justify-center border border-border/20">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                    {item.content}
                  </p>
                  <button 
                    className="inline-flex items-center text-accent font-semibold hover:text-accent/80 transition-colors hover-elevate px-4 py-2 rounded-md border border-accent/20 w-fit"
                    data-testid="learn-more-button"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}