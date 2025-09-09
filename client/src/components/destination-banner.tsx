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

  // Calculate parallax offset - make it more noticeable
  const parallaxOffset = scrollY * 0.3;

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
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          height: "130%",
          top: "-15%",
        }}
      >
        {/* Temporary: Use background image to test parallax first */}
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
            filter: 'brightness(0.8)',
          }}
        />
        
        {/* Debug: Video element (hidden for now) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-0"
          onLoadedData={() => {
            setVideoLoaded(true);
            console.log('✅ Video loaded and ready');
          }}
          onPlay={() => {
            console.log('✅ Video started playing');
          }}
          onCanPlay={() => {
            console.log('✅ Video can play - attempting autoplay');
            if (videoRef.current) {
              videoRef.current.play()
                .then(() => {
                  console.log('✅ Video autoplay successful');
                  // Switch to video when it's working
                  if (videoRef.current) {
                    videoRef.current.className = "w-full h-full object-cover";
                  }
                })
                .catch(err => {
                  console.error('❌ Video autoplay failed:', err);
                });
            }
          }}
          onError={(e) => {
            console.error('❌ Video failed to load:', e);
            setVideoError(true);
          }}
        >
          <source src={floatTherapyVideo} type="video/mp4" />
        </video>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50 z-10"></div>
      
      {/* Content with slight parallax */}
      <div 
        className="relative max-w-4xl mx-auto text-center px-4 animate-fade-in z-20"
        style={{
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
        }}
      >
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
          The Magic of Egypt
        </h2>
        <p className="text-xl md:text-2xl text-white font-light drop-shadow-md">
          Stunning landscapes, legendary monuments, world-class hospitality.
        </p>
        
        {/* Debug info - Remove when working */}
        <div className="mt-4 text-sm text-white/70">
          Parallax Debug: {parallaxOffset.toFixed(1)}px | Scroll: {scrollY}px
        </div>
      </div>
    </section>
  );
}
