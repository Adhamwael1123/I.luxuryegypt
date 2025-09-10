import { useState, useEffect, useRef } from "react";
import floatTherapyVideo from "@assets/Salt Lake Float Therapy_1757459954474.mp4";

export default function DestinationBanner() {
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Force play video after component mounts
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch(err => {
        console.error('Video autoplay failed:', err);
        setVideoError(true);
      });
    }
  }, [videoLoaded]);

  // Calculate parallax offset - subtle and smooth
  const parallaxOffset = scrollY * 0.2;

  return (
    <section 
      ref={sectionRef}
      id="destinations" 
      className="relative min-h-[120vh] overflow-hidden bg-slate-600"
      data-testid="destination-banner"
    >
      {/* Video Background with Parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          height: "150%",
          top: "-25%",
        }}
      >
        {/* Video Background - Fixed z-index and visibility */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 1,
            filter: 'brightness(0.8)',
            transform: 'scale(1.15)', // Increased scale for complete coverage
            objectPosition: 'center center',
          }}
          onLoadedData={() => {
            setVideoLoaded(true);
            console.log('✅ Video loaded and should be visible');
          }}
          onPlay={() => {
            console.log('✅ Video is playing');
          }}
          onError={(e) => {
            console.error('❌ Video error:', e);
            setVideoError(true);
          }}
        >
          <source src={floatTherapyVideo} type="video/mp4" />
        </video>
        
        {/* Fallback image only if video fails */}
        {videoError && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
              filter: 'brightness(0.8)',
              zIndex: 1,
            }}
          />
        )}
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/40 z-10"></div>
      
      {/* Content with subtle parallax */}
      <div 
        className="relative max-w-4xl mx-auto text-center px-4 py-48 animate-fade-in z-20 flex flex-col justify-center min-h-[120vh]"
        style={{
          transform: `translate3d(0, ${scrollY * 0.05}px, 0)`,
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
