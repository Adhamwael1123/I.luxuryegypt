export default function DestinationBanner() {
  return (
    <section 
      id="destinations" 
      className="relative py-32 parallax"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
      data-testid="destination-banner"
    >
      <div className="absolute inset-0 bg-primary/50"></div>
      <div className="relative max-w-4xl mx-auto text-center px-4 animate-fade-in">
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
          The Magic of Egypt
        </h2>
        <p className="text-xl md:text-2xl text-white font-light">
          Stunning landscapes, legendary monuments, world-class hospitality.
        </p>
      </div>
    </section>
  );
}
