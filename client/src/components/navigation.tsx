import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If on contact page and trying to scroll to contact, do nothing
    if (location === "/contact" && sectionId === "contact") {
      setIsMobileMenuOpen(false);
      return;
    }
    
    // If not on home page, navigate to home first
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      setIsMobileMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "About", id: "about", type: "page", href: "/about" },
    { label: "Destinations", id: "destinations", type: "page", href: "/destinations" },
    { label: "Experiences", id: "experiences", type: "page", href: "/experiences" },
    { label: "Stays", id: "stays", type: "page", href: "/stay" },
    { label: "Contact", id: "contact", type: "page", href: "/contact" },
  ];

  return (
    <nav className={`relative w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" 
        : "bg-background/95 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-primary hover-elevate cursor-pointer" 
                  data-testid="logo-home">
                I.LUXURYEGYPT
              </h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                item.type === "page" ? (
                  <Link key={item.id} href={item.href!}>
                    <button
                      className="text-foreground hover:text-accent transition-colors hover-elevate px-3 py-2 rounded-md text-sm font-medium"
                      data-testid={`nav-${item.id}`}
                    >
                      {item.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-foreground hover:text-accent transition-colors hover-elevate px-3 py-2 rounded-md text-sm font-medium"
                    data-testid={`nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.type === "page" ? (
                  <Link key={item.id} href={item.href!}>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left hover-elevate"
                      data-testid={`nav-mobile-${item.id}`}
                    >
                      {item.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-foreground hover:text-accent block px-3 py-2 rounded-md text-base font-medium w-full text-left hover-elevate"
                    data-testid={`nav-mobile-${item.id}`}
                  >
                    {item.label}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
