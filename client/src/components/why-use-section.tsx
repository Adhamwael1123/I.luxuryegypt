
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
    content: "We don't believe in one-size-fits-all. Our local experts handcraft every journey to be a unique masterpiece, personalized just for you. Experience Egypt through bespoke itineraries that reflect your personal style and desires."
  },
  {
    id: 2,
    title: "Travel Thoughtfully",
    image: poolSideDrinkImg,
    content: "We are a family of passionate Egyptians with deep roots in this land. We connect you to the authentic heart of Egypt, ensuring a meaningful and thoughtful travel experience that honors our heritage while creating lasting memories."
  },
  {
    id: 3,
    title: "I.LUXURYEGYPT Family",
    image: siwaPalmTreesImg,
    content: "Our tour guides are more than just guides; they're the best in Egypt. They are storytellers and friends who bring ancient wonders to life, creating a connection that lasts forever. From your first dream to your final farewell, you're family."
  }
];

export default function WhyUseSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Why Use I.LUXURYEGYPT?
          </h2>
          <div className="w-24 h-px bg-accent mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Experience Egypt through the eyes of passionate locals who call this ancient land home
          </p>
        </div>

        {/* Luxury Cards Grid */}
        <div className="flex gap-6 max-w-7xl mx-auto" style={{ height: '500px' }}>
          {whyUseItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`relative bg-card shadow-xl overflow-hidden transition-all duration-1000 ease-out border border-primary/10 hover:border-accent/40 hover:shadow-2xl ${
                hoveredCard === null 
                  ? 'flex-1' 
                  : hoveredCard === item.id 
                    ? 'flex-[1.8]' 
                    : 'flex-[0.6] opacity-50'
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Premium Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent/80 via-accent to-accent/60 z-10" />
              
              {/* Main Card Content */}
              <div className="relative flex h-full">
                {/* Image Section */}
                <div className={`relative overflow-hidden transition-all duration-1000 ease-out ${
                  hoveredCard === item.id ? 'w-3/5' : 'w-full'
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out hover:scale-110"
                  />
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Luxury Badge */}
                  <div className="absolute top-6 right-6 bg-accent backdrop-blur-sm text-primary px-4 py-2 text-sm font-bold tracking-widest">
                    {String(item.id).padStart(2, '0')}
                  </div>
                  
                  {/* Title and Description */}
                  <div className="absolute bottom-8 left-6 right-6">
                    <h3 className="font-serif font-bold text-2xl text-white mb-4 drop-shadow-xl leading-tight">
                      {item.title}
                    </h3>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-accent/50 mb-4" />
                    <p className={`text-gray-200 text-sm leading-relaxed font-light transition-all duration-700 ${
                      hoveredCard === item.id ? 'opacity-60' : 'opacity-100'
                    }`}>
                      {item.content.split('.')[0]}.
                    </p>
                  </div>
                </div>

                {/* Expanding Content Section */}
                <div className={`absolute right-0 top-0 bottom-0 bg-gradient-to-br from-card via-card/98 to-accent/5 backdrop-blur-sm transition-all duration-1000 ease-out overflow-hidden border-l border-accent/20 ${
                  hoveredCard === item.id ? 'w-2/5 opacity-100' : 'w-0 opacity-0'
                }`}>
                  <div className="h-full flex flex-col justify-center p-8 space-y-6">
                    {/* Luxury Header */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent to-accent" />
                        <div className="w-3 h-3 bg-accent rotate-45" />
                        <div className="w-8 h-px bg-gradient-to-l from-transparent to-accent" />
                      </div>
                      <h4 className="font-serif font-bold text-xl text-primary mb-2">
                        {item.title}
                      </h4>
                    </div>
                    
                    {/* Premium Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-foreground/90 text-base leading-relaxed font-light tracking-wide text-center mb-8">
                        {item.content}
                      </p>

                      {/* Luxury Ornaments */}
                      <div className="flex items-center justify-center space-x-6 mb-6">
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-1 h-4 bg-gradient-to-b from-accent to-accent/40" />
                          <div className="w-2 h-2 bg-accent rounded-full" />
                        </div>
                        
                        <div className="w-4 h-4 bg-accent transform rotate-45" />
                        
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-1 h-4 bg-gradient-to-b from-accent to-accent/40" />
                          <div className="w-2 h-2 bg-accent rounded-full" />
                        </div>
                      </div>

                      {/* Premium Brand Mark */}
                      <div className="text-center">
                        <span className="text-xs text-accent font-semibold tracking-[0.3em] uppercase">
                          EXCEPTIONAL EXPERIENCES
                        </span>
                      </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="flex items-center justify-center space-x-4 mt-6">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                      <div className="w-1 h-1 bg-accent rounded-full" />
                      <div className="w-12 h-px bg-gradient-to-l from-transparent via-accent to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Accent Lines */}
              <div className={`absolute left-0 top-2 bottom-2 bg-gradient-to-b from-accent/0 via-accent/90 to-accent/0 transition-all duration-700 ${
                hoveredCard === item.id ? 'w-1' : 'w-0.5'
              }`} />
              
              <div className={`absolute right-0 top-2 bottom-2 bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0 transition-all duration-700 ${
                hoveredCard === item.id ? 'w-0.5' : 'w-0'
              }`} />
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 px-12 py-6 border border-accent/30 hover:border-accent/50 transition-all duration-500 hover:shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent animate-pulse" />
              <div className="w-1 h-1 bg-accent/60" />
            </div>
            <span className="text-primary font-bold text-base tracking-[0.2em] uppercase">
              READY TO EXPERIENCE LUXURY EGYPTIAN TRAVEL?
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-1 h-1 bg-accent/60" />
              <div className="w-2 h-2 bg-accent animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
