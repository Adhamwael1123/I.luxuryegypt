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
    { label: "Blog", id: "blog", type: "page", href: "/blog" },
    { label: "Contact", id: "contact", type: "page", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/5 backdrop-blur-xl backdrop-saturate-150 border-b border-white/20 shadow-lg" 
        : "bg-white/0 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-serif font-bold text-white hover:text-white/80 transition-colors cursor-pointer" 
                  data-testid="logo-home">
                I.LUXURYEGYPT
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item, index) => (
                item.type === "page" ? (
                  <Link key={item.id} href={item.href!}>
                    <button
                      className={`relative text-white hover:text-white/70 transition-all duration-300 hover-elevate px-4 py-3 rounded-lg text-sm font-medium group ${
                        location === item.href ? 'text-white/70 bg-white/10' : ''
                      }`}
                      data-testid={`nav-${item.id}`}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative text-white hover:text-white/70 transition-all duration-300 hover-elevate px-4 py-3 rounded-lg text-sm font-medium group"
                    data-testid={`nav-${item.id}`}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-12 w-12 text-white hover:text-white/70"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white/10 backdrop-blur-xl backdrop-saturate-150 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                item.type === "page" ? (
                  <Link key={item.id} href={item.href!}>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-white hover:text-white/70 hover:bg-white/10 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-300 ${
                        location === item.href ? 'text-white/70 bg-white/10' : ''
                      }`}
                      data-testid={`nav-mobile-${item.id}`}
                    >
                      {item.label}
                    </button>
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-white hover:text-white/70 hover:bg-white/10 block px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-300"
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