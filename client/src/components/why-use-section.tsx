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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto group/container">
          {whyUseItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative bg-card shadow-lg overflow-hidden luxury-transition hover:shadow-2xl border border-primary/10 hover:border-accent/40 hover:lg:w-[200%] hover:lg:z-10 lg:transition-all lg:duration-700 lg:ease-out"
              style={{ minHeight: '400px' }}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Top Accent Bar */}
              <div className="h-1 bg-gradient-to-r from-accent via-accent/80 to-primary/60" />
              
              {/* Main Card Content */}
              <div className="relative flex h-full">
                {/* Image Section - Left Side */}
                <div className="relative w-full group-hover:w-1/2 transition-all duration-700 ease-out overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                  
                  {/* Premium Badge */}
                  <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-primary px-3 py-1 text-sm font-bold tracking-wider">
                    0{item.id}
                  </div>
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-6 left-4 right-4">
                    <h3 className="font-serif font-bold text-xl text-white mb-2 drop-shadow-lg leading-tight">
                      {item.title}
                    </h3>
                    <div className="w-12 h-px bg-gradient-to-r from-accent to-transparent" />
                  </div>
                </div>

                {/* Expanding Content Section - Right Side */}
                <div className="absolute right-0 top-0 bottom-0 w-0 group-hover:w-1/2 transition-all duration-700 ease-out overflow-hidden bg-gradient-to-br from-card via-card to-accent/5">
                  <div className="h-full flex flex-col justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                    {/* Decorative Top Line */}
                    <div className="w-full h-px bg-gradient-to-r from-accent via-accent/60 to-transparent mb-6" />
                    
                    {/* Expanded Content Text */}
                    <p className="text-foreground/90 text-sm leading-relaxed font-light tracking-wide mb-6">
                      {item.content}
                    </p>

                    {/* Luxury Decorative Elements */}
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      {/* Left Ornament */}
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-px bg-accent" />
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        <div className="w-px h-3 bg-accent/50" />
                      </div>
                      
                      {/* Center Diamond */}
                      <div className="w-2 h-2 bg-accent transform rotate-45" />
                      
                      {/* Right Ornament */}
                      <div className="flex items-center space-x-1">
                        <div className="w-px h-3 bg-accent/50" />
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        <div className="w-3 h-px bg-accent" />
                      </div>
                    </div>

                    {/* Luxury Brand Mark */}
                    <div className="text-center">
                      <span className="text-xs text-accent/70 font-light tracking-[0.2em] uppercase">
                        EXCEPTIONAL EXPERIENCES
                      </span>
                    </div>

                    {/* Decorative Bottom Line */}
                    <div className="w-full h-px bg-gradient-to-l from-accent via-accent/60 to-transparent mt-6" />
                  </div>
                </div>
              </div>

              {/* Side Accent - Vertical Line */}
              <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-accent/0 via-accent/80 to-accent/0 group-hover:w-2 transition-all duration-500" />
              
              {/* Bottom Accent - Horizontal Line */}
              <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 group-hover:h-1 transition-all duration-500" />
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