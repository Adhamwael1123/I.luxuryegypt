import { useState, useEffect, useRef } from "react";
import floatTherapyVideo from "@assets/Salt Lake Float Therapy_1757459954474.mp4";

export default function DestinationBanner() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax offset
  const parallaxOffset = scrollY * 0.5;

  return (
    <section 
      ref={sectionRef}
      id="destinations" 
      className="relative py-40 min-h-screen overflow-hidden"
      data-testid="destination-banner"
    >
      {/* Video Background with Parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          height: "120%",
          top: "-10%",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
          onError={(e) => console.error('Video error:', e)}
        >
          <source src={floatTherapyVideo} type="video/mp4" />
          <source src={floatTherapyVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50 z-10"></div>
      
      {/* Content with slight parallax */}
      <div 
        className="relative max-w-4xl mx-auto text-center px-4 animate-fade-in z-20"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
          The Magic of Egypt
        </h2>
        <p className="text-xl md:text-2xl text-white font-light drop-shadow-md">
          Stunning landscapes, legendary monuments, world-class hospitality.
        </p>
      </div>
    </section>
  );
}
