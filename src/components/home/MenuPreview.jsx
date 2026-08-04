import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import galleryImages from "../../data/gallery";
import { getOrderUrl } from "../../lib/paytronixMenuApi";

const FOOD_IMAGE =
  galleryImages.find((image) => image.category === "Desserts")?.src ||
  galleryImages.find((image) => image.category === "Catering")?.src;

export default function MenuPreview() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Our Menu
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight mb-4">
              Chef-Prepared Meals, Sides, Bakery Items & More
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Browse the current Daily Spread menu, including prepared meals, sides, bakery items, drinks, and catering selections.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Menu selections and availability may change. Use Order Now to view current ordering options.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" className="font-semibold px-7">
                  <Eye className="w-4 h-4 mr-2" /> View Menu
                </Button>
              </Link>
              <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="font-semibold px-7">
                  Order Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-muted">
              {FOOD_IMAGE && (
                <img
                  src={FOOD_IMAGE}
                  alt="Food prepared by Daily Spread"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
