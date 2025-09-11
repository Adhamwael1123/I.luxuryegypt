import { useState, useRef, useEffect } from "react";
import siwaVideo from "@assets/Salt Lake Float Therapy_1757459954474.mp4";

export default function SiwaVideoSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch(err => {
        console.error('Video autoplay failed:', err);
        setVideoError(true);
      });
    }
  }, [videoLoaded]);

  return (
    <section className="relative w-full h-[400px] overflow-hidden" data-testid="siwa-video-section">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={() => setVideoLoaded(true)}
        onError={(e) => {
          console.error('Video loading error:', e);
          setVideoError(true);
        }}
      >
        <source src={siwaVideo} type="video/mp4" />
      </video>
      
      {/* Overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      
      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
            Discover Siwa Oasis
          </h2>
          <p className="text-lg md:text-xl text-white font-light drop-shadow-md animate-fade-in">
            Where ancient traditions meet pristine desert beauty in Egypt's most enchanting oasis
          </p>
        </div>
      </div>
    </section>
  );
}