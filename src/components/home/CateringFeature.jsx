import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "../shared/SectionHeading";
import galleryImages from "../../data/gallery";

const CATERING_IMAGES = galleryImages.filter((image) => image.category === "Catering").slice(0, 4);

export default function CateringFeature() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catering Services"
          title="Catering for Meetings, Gatherings & Special Events"
          description="Daily Spread offers catering menus for corporate meals, family gatherings, celebrations, and other special occasions."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {CATERING_IMAGES.map((image) => (
            <div key={image.src} className="rounded-xl overflow-hidden shadow-md bg-muted">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/catering">
            <Button size="lg" className="font-semibold px-7">
              Explore Catering
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
