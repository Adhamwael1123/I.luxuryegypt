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
    title: "I.LUXURYEGYPT Family",
    image: siwaPalmTreesImg,
    content: "Our tour guides are more than just guides; they're the best in Egypt. They are storytellers and friends who bring ancient wonders to life, creating a connection that lasts forever."
  }
];

export default function WhyUseSection() {
  const [selectedItem, setSelectedItem] = useState<WhyUseItem | null>(null);

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50/30 via-white to-blue-50/20 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-blue-600 bg-clip-text text-transparent mb-6">
            Why Use I.LUXURYEGYPT?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Modern Luxury Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyUseItems.map((item) => (
            <div 
              key={item.id} 
              className="relative cursor-pointer group perspective-1000"
              style={{ aspectRatio: '3/4', minHeight: '420px' }}
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              data-testid={`why-use-item-${item.id}`}
            >
              {/* Card Container */}
              <div 
                className={`relative w-full h-full transition-all duration-700 ease-out transform-style-preserve-3d ${
                  selectedItem?.id === item.id ? 'rotate-y-180' : ''
                }`}
                style={{
                  transform: selectedItem?.id === item.id ? 'rotateY(180deg)' : ''
                }}
              >
                {/* Front Side - Modern Luxury Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden group-hover:shadow-2xl group-hover:shadow-amber-500/10 transition-all duration-500 bg-white dark:bg-gray-900 border border-amber-200/20 dark:border-amber-400/10"
                     style={{ 
                       clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                       transform: 'translateY(0px)',
                     }}
                >
                  {/* Image with Elegant Overlay */}
                  <div className="relative w-full h-3/5 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Luxury Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                      {/* Premium Flip Indicator */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-amber-400/90 to-amber-600/90 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:from-amber-300 group-hover:to-amber-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-180" 
                           style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                        <svg className="w-4 h-4 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 h-2/5 flex flex-col justify-center bg-gradient-to-br from-white via-amber-50/30 to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
                    <h3 className="font-serif font-bold text-xl md:text-2xl bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mb-3 rounded-full"></div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-light opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      Click to discover more
                    </p>
                  </div>
                </div>

                {/* Back Side - Premium Content Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-white via-amber-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800/90 dark:to-blue-900/30 p-8 flex flex-col justify-center border border-amber-200/30 dark:border-amber-400/20 shadow-2xl"
                     style={{ 
                       clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
                     }}>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-amber-400 opacity-30"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-amber-400 opacity-30"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent mb-6">
                      {item.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mb-6 rounded-full"></div>
                    <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-8 text-sm font-light">
                      {item.content}
                    </p>
                    <button 
                      className="inline-flex items-center font-semibold text-sm bg-gradient-to-r from-amber-400 to-amber-600 text-white px-6 py-3 border border-amber-200 hover:from-amber-500 hover:to-amber-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 transform hover:-translate-y-0.5"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                      data-testid="learn-more-button"
                    >
                      Discover More
                      <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}