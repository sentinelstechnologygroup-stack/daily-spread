import React, { useEffect, useMemo, useState } from "react";
import galleryImages from "@/data/gallery";

const ALL_CATEGORY = "All";

export default function Gallery() {
  const [active, setActive] = useState(ALL_CATEGORY);

  useEffect(() => {
    document.title = "Gallery | Daily Spread — Catering & Dessert Photos";
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(galleryImages.map((image) => image.category))];
    return [ALL_CATEGORY, ...uniqueCategories.sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredImages = useMemo(() => {
    if (active === ALL_CATEGORY) return galleryImages;
    return galleryImages.filter((image) => image.category === active);
  }, [active]);

  return (
    <>
      <section className="py-24 md:py-32 bg-foreground text-primary-foreground text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Gallery
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            A Visual Feast
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Browse photos of our catering spreads, chef-prepared service, and desserts.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredImages.map((image) => (
                <article
                  key={image.src}
                  className="rounded-xl overflow-hidden bg-card shadow-md border border-border/40 group"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-secondary">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 bg-card">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {image.category}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-foreground/60">
              No gallery images found. Add images to public/images/category-name/ and run npm run gallery.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
