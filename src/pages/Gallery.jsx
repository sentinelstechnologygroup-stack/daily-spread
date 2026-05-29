import React, { useEffect, useState } from "react";

const CATEGORIES = ["All", "Catering", "Prepared Meals", "Seasonal Specials", "Events"];

const IMAGES = [
  // Existing site images
  { src: "https://daily-spread.com/wp-content/uploads/2017/07/Catering.jpg", alt: "Daily Spread catering event display", category: "Catering" },
  { src: "https://daily-spread.com/wp-content/uploads/2017/07/Food1.jpg", alt: "Fresh chef-prepared meal from Daily Spread", category: "Prepared Meals" },
  // GENERATED PLACEHOLDERS — replace with real photos from Stephanie
  { src: "/images/e32d7656f_generated_d03d63c1.png", alt: "Elegant catering spread for a celebration event", category: "Catering" },
  { src: "/images/39fc17487_generated_b7541871.png", alt: "Corporate catering setup with grilled chicken and salads", category: "Catering" },
  { src: "/images/9c6efda45_generated_a26f10a4.png", alt: "Buffet-style catering with chafing dishes", category: "Catering" },
  { src: "/images/d51b86c61_generated_73ccf05e.png", alt: "Plated chef-prepared dinner for two with salmon", category: "Prepared Meals" },
  { src: "/images/3bea38a78_generated_eb659072.png", alt: "Family-style dinner spread for four", category: "Prepared Meals" },
  { src: "/images/883720038_generated_f14e855b.png", alt: "Fresh seasonal ingredients for chef-prepared meals", category: "Seasonal Specials" },
  { src: "/images/0d8f81f44_generated_a86da72c.png", alt: "Elegant desserts including chocolate cake and fruit tart", category: "Seasonal Specials" },
  { src: "/images/9343014c7_generated_edbaa02d.png", alt: "Small event catering with appetizers and desserts", category: "Events" },
  { src: "/images/7c764971f_generated_d773e75f.png", alt: "Daily Spread chef in the kitchen preparing meals", category: "Events" },
];

export default function Gallery() {
  const [active, setActive] = useState("All");

  useEffect(() => {
    document.title = "Gallery | Daily Spread — Chef-Prepared Meals & Catering Photos";
  }, []);

  const filtered = active === "All" ? IMAGES : IMAGES.filter((img) => img.category === active);

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-primary-foreground text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Gallery
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            A Visual Feast
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Browse photos of our catering spreads, chef-prepared meals, seasonal specials, and events.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-md group">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="p-3 bg-card">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">{img.category}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder */}
          <div className="mt-12 p-6 bg-card rounded-xl border border-dashed border-border text-center">
            <p className="text-sm text-muted-foreground italic">
              More photos coming soon. Stay tuned!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}