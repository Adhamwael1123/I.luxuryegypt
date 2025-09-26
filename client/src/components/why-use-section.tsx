
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
  icon: string;
}

const whyUseItems: WhyUseItem[] = [
  {
    id: 1,
    title: "Bespoke Luxury",
    image: insideColumnHallImg,
    content: "Every journey is meticulously crafted by our local experts to reflect your personal style and desires. Experience Egypt through completely personalized itineraries that transform your travel dreams into extraordinary realities.",
    icon: "✦"
  },
  {
    id: 2,
    title: "Authentic Heritage",
    image: islamicDistrictImg,
    content: "We are passionate Egyptians with deep roots in this ancient land. Connect with the authentic heart of Egypt through meaningful experiences that honor our rich heritage while creating memories that last a lifetime.",
    icon: "◆"
  },
  {
    id: 3,
    title: "Elite Storytellers",
    image: poolSideDrinkImg,
    content: "Our expert guides are Egypt's finest storytellers and cultural ambassadors. They bring ancient wonders to life with captivating narratives and insider knowledge, creating connections that transcend ordinary tourism.",
    icon: "▲"
  },
  {
    id: 4,
    title: "Exclusive Access",
    image: siwaPalmTreesImg,
    content: "Enjoy privileged access to Egypt's most coveted experiences. From private museum viewings to after-hours temple visits, we unlock doors that remain closed to ordinary travelers, ensuring truly unique encounters.",
    icon: "●"
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
            Why Choose I.LUXURYEGYPT?
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-px bg-accent"></div>
            <div className="w-2 h-2 bg-accent rotate-45"></div>
            <div className="w-16 h-px bg-accent"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Discover what sets us apart in crafting extraordinary Egyptian adventures for the most discerning travelers
          </p>
        </div>

        {/* Luxury Cards Grid */}
        <div className="flex gap-4 max-w-7xl mx-auto" style={{ height: '450px' }}>
          {whyUseItems.map((item) => (
            <div 
              key={item.id} 
              className={`relative bg-card shadow-2xl overflow-hidden transition-all duration-1000 ease-out border border-primary/10 hover:border-accent/50 group ${
                hoveredCard === null 
                  ? 'flex-1' 
                  : hoveredCard === item.id 
                    ? 'flex-[1.6]' 
                    : 'flex-[0.7] opacity-60'
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Luxury Top Accent with Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Main Card Content */}
              <div className="relative flex h-full">
                {/* Image Section */}
                <div className={`relative overflow-hidden transition-all duration-1000 ease-out ${
                  hoveredCard === item.id ? 'w-3/5' : 'w-full'
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                  />
                  
                  {/* Sophisticated Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  
                  {/* Luxury Icon Badge */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-accent/90 backdrop-blur-sm border border-accent/20 flex items-center justify-center">
                    <span className="text-primary text-xl font-bold">{item.icon}</span>
                  </div>
                  
                  {/* Title and Subtitle */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-px bg-accent"></div>
                      <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Premium</span>
                    </div>
                    
                    <h3 className="font-serif font-bold text-2xl text-white mb-4 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className={`text-gray-300 text-sm leading-relaxed transition-all duration-700 ${
                      hoveredCard === item.id ? 'opacity-70' : 'opacity-100'
                    }`}>
                      {item.content.split('.')[0]}.
                    </p>
                  </div>

                  {/* Side Accent Line */}
                  <div className={`absolute left-0 top-6 bottom-6 bg-gradient-to-b from-accent/0 via-accent/80 to-accent/0 transition-all duration-700 ${
                    hoveredCard === item.id ? 'w-1' : 'w-0.5'
                  }`} />
                </div>

                {/* Expanding Luxury Content Section */}
                <div className={`absolute right-0 top-0 bottom-0 bg-gradient-to-br from-card/98 via-card to-accent/5 backdrop-blur-lg transition-all duration-1000 ease-out overflow-hidden border-l border-accent/30 ${
                  hoveredCard === item.id ? 'w-2/5 opacity-100' : 'w-0 opacity-0'
                }`}>
                  <div className="h-full flex flex-col justify-center p-8">
                    {/* Elegant Header */}
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center space-x-6 mb-6">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-px h-6 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
                          <span className="text-accent text-2xl">{item.icon}</span>
                          <div className="w-px h-6 bg-gradient-to-b from-transparent via-accent to-transparent"></div>
                        </div>
                      </div>
                      
                      <h4 className="font-serif font-bold text-xl text-primary mb-4">
                        {item.title}
                      </h4>
                      
                      <div className="w-12 h-px bg-accent mx-auto"></div>
                    </div>
                    
                    {/* Premium Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="text-foreground/90 text-base leading-relaxed font-light text-center mb-8">
                        {item.content}
                      </p>

                      {/* Luxury Ornamental Elements */}
                      <div className="flex items-center justify-center space-x-6 mb-8">
                        <div className="w-1 h-1 bg-accent rounded-full opacity-60"></div>
                        <div className="w-3 h-px bg-accent"></div>
                        <div className="w-2 h-2 bg-accent rotate-45"></div>
                        <div className="w-3 h-px bg-accent"></div>
                        <div className="w-1 h-1 bg-accent rounded-full opacity-60"></div>
                      </div>

                      {/* Premium Brand Signature */}
                      <div className="text-center">
                        <span className="text-xs text-accent/80 font-semibold tracking-[0.4em] uppercase">
                          Curated Excellence
                        </span>
                      </div>
                    </div>

                    {/* Bottom Elegant Border */}
                    <div className="flex items-center justify-center mt-8">
                      <div className="w-20 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-all duration-700 ${
                hoveredCard === item.id ? 'opacity-100' : 'opacity-60'
              }`} />
            </div>
          ))}
        </div>

        {/* Refined Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 px-16 py-8 border border-accent/30 hover:border-accent/50 transition-all duration-500 hover:shadow-xl group">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rotate-45 group-hover:animate-pulse"></div>
              <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
            </div>
            
            <div className="text-center">
              <span className="text-primary font-bold text-lg tracking-[0.2em] uppercase block">
                Experience Unparalleled Luxury
              </span>
              <span className="text-muted-foreground text-sm tracking-widest uppercase mt-1 block">
                Begin Your Egyptian Journey
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-1 h-1 bg-accent/60 rounded-full"></div>
              <div className="w-2 h-2 bg-accent rotate-45 group-hover:animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
