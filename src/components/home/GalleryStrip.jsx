import React from "react";
import SectionHeading from "../shared/SectionHeading";
import ImageGalleryStrip from "../shared/ImageGalleryStrip";

// Mix of existing site images and generated placeholders
const GALLERY_IMAGES = [
  // Existing site images
  { src: "https://daily-spread.com/wp-content/uploads/2017/07/Catering.jpg", alt: "Daily Spread catering display with fresh food" },
  { src: "https://daily-spread.com/wp-content/uploads/2017/07/Food1.jpg", alt: "Chef-prepared meal from Daily Spread" },
  // GENERATED PLACEHOLDERS — replace with real photos from Stephanie
  { src: "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/39fc17487_generated_b7541871.png", alt: "Corporate catering setup with grilled chicken and fresh salads" },
  { src: "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/9343014c7_generated_edbaa02d.png", alt: "Small event catering with appetizers and desserts" },
  { src: "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/9c6efda45_generated_a26f10a4.png", alt: "Buffet-style catering spread with chafing dishes" },
  { src: "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/0d8f81f44_generated_a86da72c.png", alt: "Elegant desserts including chocolate cake and fruit tart" },
  { src: "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/d51b86c61_generated_73ccf05e.png", alt: "Plated chef-prepared dinner for two with fresh sides" },
  { src: "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/3bea38a78_generated_eb659072.png", alt: "Family-style dinner spread for four" },
];

export default function GalleryStrip() {
  return (
    <section className="py-20 md:py-24 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SectionHeading
          eyebrow="Gallery"
          title="A Taste of What We Offer"
          description="From catering spreads to plated chef-prepared meals, every dish is crafted with care."
        />
      </div>
      <ImageGalleryStrip images={GALLERY_IMAGES} />
    </section>
  );
}