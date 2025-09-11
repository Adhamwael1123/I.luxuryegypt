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
    <section className="relative w-full h-screen overflow-hidden" data-testid="siwa-video-section">
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
      
      {/* Optional overlay for better text visibility if needed */}
      <div className="absolute inset-0 bg-black/10"></div>
    </section>
  );
}