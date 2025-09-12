import { useState, useEffect } from "react";
import sunsetFeluccaImage from "@assets/sunset-felucca_1757456567256.jpg";
import restaurantImage from "@assets/1902-restaurant_1757457083786.jpg";
import poolImage from "@assets/pool-and-rivet_1757457083793.jpg";
import suiteImage from "@assets/suite-nile_1757457083796.jpg";
import elegantHallImage from "@assets/elegant-hall_1757459228629.jpeg";
import khanKhaliliRestaurantImage from "@assets/khan-khalili-restaurant_1757459228636.jpeg";
import pyramidFromLobbyImage from "@assets/pyramid-from-lobby_1757459228637.jpeg";
import pyramidFromMenaHouseImage from "@assets/the-pyramid-from-mena-house_1757459228638.jpeg";

export default function HeroSection() {

  const destinations = [
    {
      id: "cairo",
      title: "Cairo Pyramids Retreat",
      subtitle: "Discover timeless elegance near the Great Pyramids of Giza.",
      images: [
        pyramidFromMenaHouseImage, // The pyramid from Mena House
      ],
    },
    {
      id: "aswan",
      title: "Aswan Nile Escape", 
      subtitle: "Stay where ancient wonders meet refined Nubian indulgence.",
      images: [
        sunsetFeluccaImage, // Custom sunset felucca on the Nile
      ],
    },
  ];



  return (
    <section className="relative h-screen overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 flex">
        {/* Cairo Section */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${destinations[0].images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-testid="hero-cairo-image-0"
          />
          <div className="absolute inset-0 bg-primary/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {destinations[0].title}
              </h2>
              <p className="text-xl md:text-2xl font-light">
                {destinations[0].subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Aswan Section */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${destinations[1].images[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            data-testid="hero-aswan-image-0"
          />
          <div className="absolute inset-0 bg-primary/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {destinations[1].title}
              </h2>
              <p className="text-xl md:text-2xl font-light">
                {destinations[1].subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
