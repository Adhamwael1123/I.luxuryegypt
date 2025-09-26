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
    title: "I.LUXURYEGYPT Family",
    image: siwaPalmTreesImg,
    content: "Our tour guides are more than just guides; they're the best in Egypt. They are storytellers and friends who bring ancient wonders to life, creating a connection that lasts forever."
  }
];

export default function WhyUseSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Why Use I.LUXURYEGYPT?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Experience Egypt through the eyes of passionate locals who call this ancient land home
          </p>
        </div>

        {/* Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {whyUseItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative bg-card border-2 border-primary/10 shadow-lg overflow-hidden luxury-transition hover:shadow-2xl hover:border-accent/30 hover-elevate"
              style={{ minHeight: '520px' }}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Top Accent Bar */}
              <div className="h-1 bg-gradient-to-r from-accent via-accent/80 to-primary/60" />
              
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
                
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 text-xs font-bold tracking-wide">
                  0{item.id}
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif font-bold text-xl text-white mb-1 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <div className="w-full h-px bg-gradient-to-r from-accent to-transparent" />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-between h-60 bg-gradient-to-b from-card via-card to-card/95">
                {/* Content Text */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {item.content}
                </p>

                {/* Bottom Section */}
                <div className="space-y-4">
                  {/* Feature Highlights */}
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-1 h-1 bg-accent" />
                    <span className="text-primary font-medium">Premium Experience</span>
                  </div>
                  
                  {/* Call to Action */}
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-sm font-semibold tracking-wide luxury-transition hover:shadow-lg group-hover:bg-accent group-hover:text-accent-foreground">
                    LEARN MORE
                    <span className="ml-2 group-hover:translate-x-1 luxury-transition inline-block">→</span>
                  </button>
                </div>
              </div>

              {/* Side Accent */}
              <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gradient-to-b from-accent/0 via-accent to-accent/0 group-hover:w-1 luxury-transition" />
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-accent/10 px-8 py-4 border-2 border-accent/30">
            <div className="w-2 h-2 bg-accent animate-pulse" />
            <span className="text-primary font-semibold text-sm tracking-wide">
              READY TO EXPERIENCE LUXURY EGYPTIAN TRAVEL?
            </span>
            <div className="w-2 h-2 bg-accent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}