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
              className={`group relative bg-card border border-card-border rounded-xl shadow-sm overflow-hidden luxury-transition hover:shadow-xl hover-elevate ${
                index % 2 === 0 ? 'md:mt-8 xl:mt-0' : ''
              }`}
              style={{ minHeight: '480px' }}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 luxury-transition"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent" />
                
                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-accent/60 border-r-0 border-b-0 rounded-tl-lg" />
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col h-56">
                {/* Title with decorative element */}
                <div className="mb-4">
                  <h3 className="font-serif font-bold text-xl text-primary mb-2">
                    {item.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-accent rounded-full" />
                </div>

                {/* Content */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {item.content}
                </p>

                {/* Bottom decorative element */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-accent rounded-full" />
                    <div className="w-2 h-2 bg-accent/60 rounded-full" />
                    <div className="w-2 h-2 bg-accent/30 rounded-full" />
                  </div>
                  <div className="text-xs text-accent font-medium">
                    0{item.id}
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 rounded-xl luxury-transition pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 px-6 py-3 rounded-full border border-accent/20">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary font-medium text-sm">
              Ready to experience luxury Egyptian travel?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}