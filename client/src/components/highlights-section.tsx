import { Card, CardContent } from "@/components/ui/card";
import { 
  Plane, 
  Bell, 
  Landmark, 
  Utensils, 
  Ship, 
  Sparkles 
} from "lucide-react";

export default function HighlightsSection() {
  const highlights = [
    {
      icon: Plane,
      title: "Private Airport Transfers",
      description: "Seamless luxury transportation from arrival to departure.",
    },
    {
      icon: Bell,
      title: "24/7 Concierge Service",
      description: "Your personal assistant for every need and desire.",
    },
    {
      icon: Landmark,
      title: "Curated Cultural Experiences",
      description: "Exclusive access to Egypt's most treasured sites.",
    },
    {
      icon: Utensils,
      title: "Fine Dining & Culinary Journeys",
      description: "Exquisite cuisine celebrating Egyptian heritage.",
    },
    {
      icon: Ship,
      title: "Private Nile Cruises",
      description: "Sail the legendary river in ultimate comfort.",
    },
    {
      icon: Sparkles,
      title: "Spa & Wellness Retreats",
      description: "Rejuvenating treatments inspired by ancient traditions.",
    },
  ];

  return (
    <section id="experiences" className="py-20 bg-muted" data-testid="highlights-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 animate-fade-in">
            A Bespoke Journey Awaits
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <Card 
                key={highlight.title}
                className="hover-elevate luxury-transition shadow-lg hover:shadow-xl"
                data-testid={`highlight-card-${index}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-accent rounded-full flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
