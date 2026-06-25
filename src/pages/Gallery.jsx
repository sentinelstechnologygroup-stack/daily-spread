import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import galleryImages from "@/data/gallery";

const ALL_CATEGORY = "All";

export default function Gallery() {
  const [active, setActive] = useState(ALL_CATEGORY);
  const [selectedIndex, setSelectedIndex] = useState(null);

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

  const selectedImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null;

  const closeLightbox = () => setSelectedIndex(null);

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? filteredImages.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === filteredImages.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, filteredImages.length]);

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
                onClick={() => {
                  setActive(category);
                  setSelectedIndex(null);
                }}
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
              {filteredImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="text-left rounded-xl overflow-hidden bg-card shadow-md border border-border/40 group focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black shadow-lg">
                        <Expand className="h-4 w-4" />
                        View Image
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-card">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                      {image.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-10 text-center text-foreground/60">
              No gallery images found. Add images to public/images/category-name/ and run npm run gallery.
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center px-4 py-6"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
            aria-label="Close gallery image"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-4 md:left-8 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-4 md:right-8 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[88vh] flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between gap-4 mb-4 text-white/80 text-sm">
              <span className="uppercase tracking-[0.2em] text-primary font-semibold">
                {selectedImage.category}
              </span>

              <span>
                {selectedIndex + 1} / {filteredImages.length}
              </span>
            </div>

            <div className="w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[76vh] object-contain"
              />
            </div>

            <p className="mt-4 text-center text-white/70 text-sm max-w-3xl">
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}