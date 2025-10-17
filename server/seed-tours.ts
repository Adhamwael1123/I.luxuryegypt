import { db } from "./db";
import { tours } from "@shared/schema";

const realExperiences = [
  {
    title: "Family Pyramid Adventure & Camel Ride",
    slug: "family-pyramid-adventure",
    description: "An unforgettable family experience at the Giza Pyramids including private tours, camel rides, and interactive activities designed specifically for children. Expert Egyptologists guide families through ancient mysteries while keeping young explorers engaged with age-appropriate storytelling and hands-on learning experiences.",
    shortDescription: "Perfect family adventure at the Great Pyramids with camel rides and kid-friendly activities.",
    heroImage: "/api/assets/pyramid-from-lobby_1757459228637.jpeg",
    gallery: ["/api/assets/pyramid-from-lobby_1757459228637.jpeg", "/api/assets/the-pyramid-from-mena-house_1757459228638.jpeg"],
    duration: "Full Day (8 hours)",
    groupSize: "4-12 people",
    difficulty: "Easy",
    price: 450,
    currency: "USD",
    includes: [
      "Private Egyptologist guide",
      "Camel ride for all family members",
      "Egyptian Museum entry with kid-friendly tour",
      "Lunch at pyramid-view restaurant",
      "Hotel pickup and drop-off",
      "Bottled water and snacks"
    ],
    excludes: [
      "Pyramid interior entry (can be added)",
      "Personal expenses",
      "Gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Family Pyramid Adventure",
        activities: [
          "Morning pickup from Cairo hotel",
          "Guided tour of the Great Pyramids with storytelling for children",
          "Camel ride around the Giza Plateau",
          "Visit the Sphinx with photo opportunities",
          "Lunch with pyramid views",
          "Interactive Egyptian Museum tour focusing on Tutankhamun treasures",
          "Return to hotel"
        ]
      }
    ],
    destinations: ["Cairo", "Giza"],
    category: "Family Luxury",
    featured: true,
    published: true
  },
  {
    title: "Luxury Dahabiya Nile Cruise - Aswan to Luxor",
    slug: "luxury-dahabiya-nile-cruise",
    description: "Experience the timeless beauty of the Nile aboard a traditional luxury Dahabiya sailing yacht. This intimate 5-day journey takes you from Aswan to Luxor, stopping at lesser-known temples and authentic Nubian villages inaccessible to larger cruise ships. With a maximum of 12 guests, enjoy personalized service, gourmet Egyptian cuisine, and sunset sails on the legendary river.",
    shortDescription: "Intimate luxury sailing experience on traditional Dahabiya yacht from Aswan to Luxor.",
    heroImage: "/api/assets/suite-nile_1757457083796.jpg",
    gallery: ["/api/assets/suite-nile_1757457083796.jpg", "/api/assets/luxor_1757531163688.jpg"],
    duration: "5 Days / 4 Nights",
    groupSize: "2-12 people",
    difficulty: "Easy",
    price: 2800,
    currency: "USD",
    includes: [
      "4 nights on luxury Dahabiya yacht",
      "All meals with gourmet Egyptian and international cuisine",
      "Private Egyptologist guide",
      "All temple and site entrance fees",
      "Sunset felucca sailing",
      "Traditional afternoon tea service",
      "Airport or station transfers"
    ],
    excludes: [
      "Flights to Aswan",
      "Alcoholic beverages",
      "Hot air balloon ride (optional)",
      "Gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Aswan - Embarkation",
        activities: [
          "Meet and assist at Aswan airport or station",
          "Transfer to Dahabiya",
          "Welcome drink and lunch on board",
          "Visit Philae Temple - UNESCO World Heritage Site",
          "Sunset cocktails on deck",
          "Dinner and overnight sailing"
        ]
      },
      {
        day: 2,
        title: "Kom Ombo & Gebel el Silsila",
        activities: [
          "Sunrise on the Nile",
          "Visit Kom Ombo Temple dedicated to Sobek and Horus",
          "Sail to Gebel el Silsila",
          "Explore ancient stone quarries",
          "Traditional Egyptian cooking demonstration",
          "Dinner under the stars"
        ]
      },
      {
        day: 3,
        title: "Edfu & El Kab",
        activities: [
          "Visit Edfu Temple - best preserved in Egypt",
          "Sail to El Kab",
          "Explore ancient rock tombs",
          "Afternoon tea with Nile views",
          "Evening entertainment with local musicians"
        ]
      },
      {
        day: 4,
        title: "Esna & Luxor Arrival",
        activities: [
          "Morning visit to Esna Temple",
          "Sail through Esna Lock",
          "Arrive Luxor",
          "Visit Luxor Temple at sunset",
          "Farewell dinner on board"
        ]
      },
      {
        day: 5,
        title: "Luxor - Disembarkation",
        activities: [
          "Breakfast on board",
          "Visit Valley of the Kings",
          "Explore Hatshepsut Temple",
          "Visit Karnak Temple",
          "Transfer to airport or station"
        ]
      }
    ],
    destinations: ["Aswan", "Kom Ombo", "Edfu", "Luxor"],
    category: "Nile Cruise",
    featured: true,
    published: true
  },
  {
    title: "Classic Egypt Discovery - Pyramids, Nile & Temples",
    slug: "classic-egypt-discovery",
    description: "The quintessential Egyptian experience combining Cairo's ancient wonders with Luxor's magnificent temples. This comprehensive 7-day journey covers all the must-see highlights including the Pyramids of Giza, Egyptian Museum, Valley of the Kings, Karnak Temple, and more. Perfect for first-time visitors who want to experience the best of Egypt with expert guidance and luxury accommodations.",
    shortDescription: "Complete Egyptian experience from Pyramids to Luxor temples with luxury accommodations.",
    heroImage: "/api/assets/luxor_1757531163688.jpg",
    gallery: ["/api/assets/luxor_1757531163688.jpg", "/api/assets/pyramid-from-lobby_1757459228637.jpeg"],
    duration: "7 Days / 6 Nights",
    groupSize: "2-16 people",
    difficulty: "Easy",
    price: 1850,
    currency: "USD",
    includes: [
      "6 nights accommodation (3 in Cairo, 3 in Luxor)",
      "Daily breakfast and 3 lunches",
      "Private Egyptologist guide",
      "All entrance fees and permits",
      "Internal flight Cairo to Luxor",
      "All transfers in private air-conditioned vehicle",
      "Sound and Light show at Karnak"
    ],
    excludes: [
      "International flights",
      "Dinners not specified",
      "Pyramid interior entry tickets",
      "Personal expenses and gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Cairo",
        activities: [
          "Meet and greet at Cairo International Airport",
          "Transfer to 5-star hotel",
          "Welcome briefing",
          "Overnight in Cairo"
        ]
      },
      {
        day: 2,
        title: "Giza Pyramids & Sphinx",
        activities: [
          "Visit the Great Pyramid of Khufu",
          "Explore the Pyramids of Khafre and Menkaure",
          "Meet the enigmatic Sphinx",
          "Lunch at pyramid-view restaurant",
          "Optional camel ride",
          "Evening at leisure"
        ]
      },
      {
        day: 3,
        title: "Egyptian Museum & Islamic Cairo",
        activities: [
          "Guided tour of Egyptian Museum with Tutankhamun treasures",
          "Visit the Mummy Room (optional)",
          "Explore Khan el-Khalili bazaar",
          "Lunch in historic Cairo",
          "Visit Salah El-Din Citadel and Mohamed Ali Mosque",
          "Evening flight to Luxor"
        ]
      },
      {
        day: 4,
        title: "West Bank - Valley of the Kings",
        activities: [
          "Cross to Luxor West Bank",
          "Explore Valley of the Kings (3 tombs included)",
          "Visit Temple of Hatshepsut",
          "Photo stop at Colossi of Memnon",
          "Lunch at local restaurant",
          "Optional hot air balloon for next morning"
        ]
      },
      {
        day: 5,
        title: "Karnak & Luxor Temples",
        activities: [
          "Visit magnificent Karnak Temple complex",
          "Walk the Avenue of Sphinxes",
          "Explore Luxor Temple",
          "Afternoon at leisure by hotel pool",
          "Evening Sound and Light Show at Karnak"
        ]
      },
      {
        day: 6,
        title: "Free Day or Optional Tours",
        activities: [
          "Optional: Dendara and Abydos temples",
          "Optional: Felucca sailing on the Nile",
          "Optional: Luxor Museum visit",
          "Farewell dinner at Nile-view restaurant"
        ]
      },
      {
        day: 7,
        title: "Departure",
        activities: [
          "Breakfast at hotel",
          "Transfer to Luxor Airport",
          "End of services"
        ]
      }
    ],
    destinations: ["Cairo", "Giza", "Luxor"],
    category: "Classic Egypt",
    featured: true,
    published: true
  },
  {
    title: "Spiritual Journey - Temples & Sacred Sites",
    slug: "spiritual-journey-temples",
    description: "A transformative spiritual journey through Egypt's most sacred temples and ancient wisdom sites. This unique experience combines temple visits with meditation sessions, sacred geometry workshops, and sunrise ceremonies. Led by spiritual guides who understand both Egyptology and ancient metaphysical practices, this journey is designed for those seeking deeper connection with Egypt's spiritual legacy.",
    shortDescription: "Transformative spiritual experience at Egypt's sacred temples with meditation and ceremonies.",
    heroImage: "/api/assets/luxor_1757531163688.jpg",
    gallery: ["/api/assets/luxor_1757531163688.jpg", "/api/assets/pyramid-from-lobby_1757459228637.jpeg"],
    duration: "6 Days / 5 Nights",
    groupSize: "4-10 people",
    difficulty: "Moderate",
    price: 2200,
    currency: "USD",
    includes: [
      "5 nights luxury accommodation",
      "All meals including special vegetarian options",
      "Spiritual guide and Egyptologist",
      "Private temple access for sunrise ceremonies",
      "Sacred geometry workshops",
      "Meditation sessions at temples",
      "Sound healing experience in Great Pyramid",
      "All entrance fees and transfers"
    ],
    excludes: [
      "International flights",
      "Personal spiritual items",
      "Additional healing sessions",
      "Gratuities"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Opening Ceremony",
        activities: [
          "Airport welcome and transfer",
          "Group gathering and intention setting",
          "Opening ceremony and blessing",
          "Sacred geometry introduction workshop",
          "Welcome dinner"
        ]
      },
      {
        day: 2,
        title: "Great Pyramid & Sphinx Meditation",
        activities: [
          "Sunrise meditation at the Sphinx",
          "Private time inside Great Pyramid for sound healing",
          "Sacred geometry workshop at pyramid plateau",
          "Lunch with pyramid views",
          "Evening sharing circle"
        ]
      },
      {
        day: 3,
        title: "Dendera Temple of Hathor",
        activities: [
          "Drive to Dendera",
          "Private morning access to Temple of Hathor",
          "Healing ceremony in the sacred crypt",
          "Zodiac ceiling meditation",
          "Temple of Isis ritual",
          "Return to Luxor for overnight"
        ]
      },
      {
        day: 4,
        title: "Abydos - Temple of Osiris",
        activities: [
          "Journey to Abydos",
          "Visit Temple of Seti I",
          "Osiris ceremony at the sacred well",
          "Flower of Life meditation",
          "Personal time for reflection",
          "Evening group discussion"
        ]
      },
      {
        day: 5,
        title: "Karnak & Luxor Spiritual Experience",
        activities: [
          "Sunrise ceremony at Karnak Temple",
          "Walk the Sacred Lake",
          "Afternoon at Luxor Temple",
          "Sunset meditation",
          "Integration workshop"
        ]
      },
      {
        day: 6,
        title: "Closing Ceremony & Departure",
        activities: [
          "Final morning meditation",
          "Closing ceremony and gratitude ritual",
          "Group sharing and integration",
          "Transfer to airport",
          "Farewell"
        ]
      }
    ],
    destinations: ["Cairo", "Giza", "Dendera", "Abydos", "Luxor"],
    category: "Spiritual Journeys",
    featured: true,
    published: true
  },
  {
    title: "White Desert Adventure & Siwa Oasis",
    slug: "white-desert-siwa-adventure",
    description: "Venture beyond the Nile Valley on this thrilling desert adventure combining the otherworldly White Desert with the ancient Siwa Oasis. Experience dramatic limestone formations, sleep under countless stars in luxury desert camps, explore Alexander the Great's oracle temple, and swim in natural hot springs. This journey reveals Egypt's stunning desert landscapes and Berber culture away from typical tourist paths.",
    shortDescription: "Adventure through White Desert's landscapes and ancient Siwa Oasis with luxury camping.",
    heroImage: "/api/assets/siwa_1757531163689.jpg",
    gallery: ["/api/assets/siwa_1757531163689.jpg"],
    duration: "5 Days / 4 Nights",
    groupSize: "4-12 people",
    difficulty: "Moderate",
    price: 1650,
    currency: "USD",
    includes: [
      "4x4 desert safari vehicle",
      "Professional desert guide",
      "2 nights luxury desert camping",
      "2 nights Siwa eco-lodge",
      "All meals during desert camping",
      "Hotel meals in Siwa",
      "Siwa Oasis tours",
      "Hot spring visits",
      "Sandboarding equipment",
      "Stargazing experience"
    ],
    excludes: [
      "Cairo accommodation",
      "Alcoholic beverages",
      "Optional quad biking",
      "Personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Cairo to Bahariya Oasis",
        activities: [
          "Early morning departure from Cairo",
          "Drive through desert highway (4 hours)",
          "Arrive Bahariya Oasis",
          "Lunch at local restaurant",
          "Visit Black Desert formations",
          "4x4 safari into White Desert",
          "Watch sunset at Crystal Mountain",
          "Set up luxury desert camp",
          "Bedouin dinner under stars",
          "Overnight camping in White Desert"
        ]
      },
      {
        day: 2,
        title: "White Desert Exploration",
        activities: [
          "Sunrise among chalk rock formations",
          "Breakfast in the desert",
          "Explore mushroom and chicken rock formations",
          "Visit ancient springs",
          "Sandboarding on dunes",
          "Afternoon tea in the desert",
          "Sunset photography session",
          "Traditional Bedouin dinner",
          "Stargazing with telescope",
          "Second night desert camping"
        ]
      },
      {
        day: 3,
        title: "Journey to Siwa Oasis",
        activities: [
          "Breakfast and pack camp",
          "Drive to Siwa Oasis (6-7 hours)",
          "Scenic route through desert",
          "Arrive Siwa, check into eco-lodge",
          "Sunset at Fatnas Spring",
          "Dinner at lodge"
        ]
      },
      {
        day: 4,
        title: "Siwa Oasis Discovery",
        activities: [
          "Visit Shali Fortress ruins",
          "Explore Temple of the Oracle (Alexander the Great's visit)",
          "Tour Cleopatra's Spring for swimming",
          "Lunch with Berber family",
          "Visit traditional olive oil press",
          "Explore Mountain of the Dead tombs",
          "Sunset at Great Sand Sea dunes",
          "Traditional Siwan dinner"
        ]
      },
      {
        day: 5,
        title: "Return to Cairo",
        activities: [
          "Morning swim at hot springs",
          "Visit Siwa House Museum",
          "Shopping for local dates and olive oil",
          "Lunch in Siwa",
          "Drive back to Cairo (8-9 hours)",
          "Arrive Cairo evening",
          "End of adventure"
        ]
      }
    ],
    destinations: ["Bahariya Oasis", "White Desert", "Siwa Oasis"],
    category: "Adventure Tours",
    featured: true,
    published: true
  },
  {
    title: "Imperial Cairo - Ultra Luxury Experience",
    slug: "imperial-cairo-ultra-luxury",
    description: "Experience Cairo like royalty with this ultra-exclusive journey featuring private palace access, personal Egyptologists, helicopter tours, and stays at Egypt's most prestigious hotels. Enjoy after-hours private access to the Egyptian Museum, Michelin-level dining experiences, and VIP treatment throughout. This bespoke journey includes privileges typically reserved for diplomats and celebrities.",
    shortDescription: "Ultimate luxury Cairo experience with private access, helicopter tours, and royal treatment.",
    heroImage: "/api/assets/1902-restaurant_1757457083786.jpg",
    gallery: ["/api/assets/1902-restaurant_1757457083786.jpg", "/api/assets/pyramid-from-lobby_1757459228637.jpeg"],
    duration: "4 Days / 3 Nights",
    groupSize: "2-6 people",
    difficulty: "Easy",
    price: 8500,
    currency: "USD",
    includes: [
      "3 nights at Mena House Palace or Four Seasons First Nile",
      "Personal Egyptologist and butler service",
      "All meals at signature restaurants",
      "Private helicopter pyramid tour",
      "After-hours Egyptian Museum private access",
      "VIP entry to all sites (skip all lines)",
      "Private sound and light show",
      "Luxury Mercedes S-Class with driver",
      "Private felucca with gourmet dinner",
      "Spa treatment at hotel",
      "Personal photographer for one day"
    ],
    excludes: [
      "International flights",
      "Premium alcoholic beverages",
      "Additional spa treatments",
      "Shopping and personal expenses"
    ],
    itinerary: [
      {
        day: 1,
        title: "Royal Arrival & Pyramid Private Experience",
        activities: [
          "VIP airport meet and greet with luxury transfer",
          "Check-in at Mena House Palace (pyramid view suite)",
          "Welcome champagne in suite",
          "Private lunch at 1902 Restaurant",
          "Exclusive after-hours access to Great Pyramid interior",
          "Private visit to Solar Boat Museum",
          "Sunset cocktails on your terrace overlooking pyramids",
          "Dinner at Saqqara Palmclub"
        ]
      },
      {
        day: 2,
        title: "Helicopter Tour & Museum Excellence",
        activities: [
          "Breakfast in suite or terrace",
          "Private helicopter tour over Giza Pyramids and Cairo",
          "Land at Saqqara for exclusive tour of Step Pyramid complex",
          "Gourmet lunch at archaeological site tent setup",
          "Return to hotel for spa treatment",
          "After-hours private access to Egyptian Museum",
          "Personal tour of Tutankhamun treasures and Royal Mummy Room",
          "Dinner at Sequoia Mediterranean restaurant with Nile views"
        ]
      },
      {
        day: 3,
        title: "Islamic Cairo & Citadel Exclusive",
        activities: [
          "Private breakfast at hotel's pool terrace",
          "VIP visit to Mohamed Ali Mosque at Citadel (before opening)",
          "Private tour of Sultan Hassan and Al-Rifai Mosques",
          "Exclusive access to historical palace",
          "Gourmet lunch at exclusive members club",
          "Private shopping experience at Khan el-Khalili with personal shopper",
          "Afternoon tea at historic Shepheard's Hotel",
          "Private felucca dinner cruise on the Nile",
          "Personal sound and light show at pyramids"
        ]
      },
      {
        day: 4,
        title: "Farewell & Departure",
        activities: [
          "Leisurely breakfast in suite",
          "Final morning at leisure (spa or pool)",
          "Late checkout guaranteed",
          "Farewell gift presentation",
          "VIP airport transfer with fast-track service",
          "Departure"
        ]
      }
    ],
    destinations: ["Cairo", "Giza", "Saqqara"],
    category: "Ultra Luxury",
    featured: true,
    published: true
  }
];

async function seedTours() {
  try {
    console.log("Starting to seed tours...");
    
    for (const tour of realExperiences) {
      const result = await db.insert(tours).values(tour).returning();
      console.log(`✓ Added: ${result[0].title}`);
    }
    
    console.log("\n✅ Successfully seeded all tours!");
    console.log(`Total tours added: ${realExperiences.length}`);
    
  } catch (error) {
    console.error("Error seeding tours:", error);
    throw error;
  }
}

seedTours()
  .then(() => {
    console.log("Seed process completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  });
