import React from "react";
import SectionHeading from "../shared/SectionHeading";
import ImageGalleryStrip from "../shared/ImageGalleryStrip";
import galleryImages from "../../data/gallery";

const GALLERY_IMAGES = galleryImages.slice(0, 8);

export default function GalleryStrip() {
  return (
    <section className="py-20 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Daily Spread Food & Catering"
          description="View photos from Daily Spread catering, prepared meals, and desserts."
        />
      </div>
      <ImageGalleryStrip images={GALLERY_IMAGES} />
    </section>
  );
}
