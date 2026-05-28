import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight } from "lucide-react";

// GENERATED PLACEHOLDER — replace with real food photo
const FOOD_IMAGE = "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/883720038_generated_f14e855b.png";

export default function MenuPreview() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
              Our Menu
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight mb-4">
              Browse Our Menu, No Ordering Required
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Curious about what we offer? Explore our full menu of chef-prepared entrees, sides,
              soups, salads, sandwiches, desserts, and more — all without committing to an order. When you're ready, ordering is just a click away.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We offer everything from quick weeknight dinners and fresh-baked goods
              to full catering spreads. All food is prepared fresh by our talented chefs using quality ingredients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" className="font-semibold px-7">
                  <Eye className="w-4 h-4 mr-2" /> View Menu
                </Button>
              </Link>
              <a
                href="https://www.opendining.net/menu/53d035ebf61e46461f212cab"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="font-semibold px-7">
                  Start Order <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={FOOD_IMAGE}
                alt="Fresh seasonal ingredients arranged for chef-prepared meals"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}