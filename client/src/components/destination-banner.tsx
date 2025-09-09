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

  // Calculate parallax offset - make it more dramatic
  const parallaxOffset = scrollY * 0.6;

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
        {/* Debug: Test both video and fallback */}
        <div className="relative w-full h-full">
          {/* Fallback image always visible for now */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
              filter: 'brightness(0.7)',
              zIndex: 1,
            }}
          />
          
          {/* Video test - make it visible with border for debugging */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover border-4 border-red-500"
            style={{
              zIndex: 2,
              filter: 'brightness(0.7)',
            }}
            onLoadedData={() => {
              setVideoLoaded(true);
              console.log('✅ Video DATA loaded, should be visible now');
              console.log('Video element:', videoRef.current);
              console.log('Video src:', floatTherapyVideo);
            }}
            onPlay={() => {
              console.log('✅ Video PLAYING - should see movement');
            }}
            onCanPlay={() => {
              console.log('✅ Video CAN PLAY');
            }}
            onError={(e) => {
              console.error('❌ Video ERROR:', e);
              console.error('Video source path:', floatTherapyVideo);
              setVideoError(true);
            }}
          >
            <source src={floatTherapyVideo} type="video/mp4" />
          </video>
          
          {/* Debug info overlay */}
          <div className="absolute top-4 left-4 z-10 text-white text-sm bg-black/50 p-2 rounded">
            Video: {videoLoaded ? '✅ Loaded' : '⏳ Loading'}<br/>
            Error: {videoError ? '❌ Failed' : '✅ OK'}<br/>
            Path: {floatTherapyVideo ? '✅ Found' : '❌ Missing'}
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/50 z-10"></div>
      
      {/* Content with slight parallax */}
      <div 
        className="relative max-w-4xl mx-auto text-center px-4 animate-fade-in z-20"
        style={{
          transform: `translate3d(0, ${scrollY * 0.2}px, 0)`,
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
