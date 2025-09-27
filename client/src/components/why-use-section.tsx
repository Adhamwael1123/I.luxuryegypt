
import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "wouter";
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
        <div className="flex gap-6 max-w-7xl mx-auto" style={{ height: '450px' }}>
          {whyUseItems.map((item) => (
            <div 
              key={item.id} 
              className={`relative bg-card shadow-2xl overflow-hidden transition-all duration-700 ease-in-out border border-primary/10 hover:border-accent/50 group transform hover:shadow-3xl ${
                hoveredCard === null 
                  ? 'flex-1' 
                  : hoveredCard === item.id 
                    ? 'flex-[2.5]' 
                    : 'flex-[0.5] opacity-30'
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Luxury Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Main Card Content */}
              <div className="relative flex h-full">
                {/* Image Section */}
                <div className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
                  hoveredCard === item.id ? 'w-1/2' : 'w-full'
                }`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 transition-all duration-300 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-black/5" />
                  
                  
                  
                  {/* Title */}
                  <div className={`absolute left-0 right-0 transform transition-all duration-500 ease-out ${
                    hoveredCard === item.id 
                      ? 'bottom-6 translate-y-0' 
                      : 'bottom-1/2 translate-y-1/2'
                  }`}>
                    <div className="px-6">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-px bg-accent"></div>
                      </div>
                      
                      <h3 className={`font-serif font-bold text-white leading-tight transition-all duration-300 text-center ${
                        hoveredCard === item.id 
                          ? 'text-2xl group-hover:text-accent/90' 
                          : 'text-xl'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Side Accent Line */}
                  <div className={`absolute left-0 top-6 bottom-6 bg-gradient-to-b from-accent/0 via-accent/80 to-accent/0 transition-all duration-300 ease-out ${
                    hoveredCard === item.id ? 'w-1 via-accent/100' : 'w-0.5'
                  }`} />
                </div>

                {/* Expanding Content Section */}
                <div className={`bg-gradient-to-br from-card via-card/95 to-accent/5 backdrop-blur-lg transition-all duration-700 ease-in-out overflow-hidden border-l border-accent/20 ${
                  hoveredCard === item.id ? 'w-1/2 opacity-100' : 'w-0 opacity-0'
                }`}>
                  <div className={`h-full flex flex-col justify-center px-6 py-8 transform transition-all duration-500 ease-in-out ${
                    hoveredCard === item.id ? 'translate-x-0' : 'translate-x-4'
                  }`}>
                    <div className="text-center space-y-5">
                      <h4 className="font-serif font-bold text-2xl text-primary leading-tight">
                        {item.title}
                      </h4>
                      
                      <div className="w-16 h-px bg-accent mx-auto opacity-60"></div>
                      
                      <p className="text-foreground/85 text-base leading-relaxed font-light max-w-sm mx-auto">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-all duration-300 ease-out ${
                hoveredCard === item.id ? 'opacity-100 via-accent/70' : 'opacity-60'
              }`} />
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-20">
          <Link href="/contact">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-muted rounded-full cursor-pointer">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">Experience Unparalleled Luxury</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
