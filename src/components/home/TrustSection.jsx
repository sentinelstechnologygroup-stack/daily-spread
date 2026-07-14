import React from "react";
import { ChefHat, MapPin, ShoppingBag, Utensils } from "lucide-react";

const FEATURES = [
  {
    icon: ChefHat,
    title: "Chef-Prepared Meals",
    desc: "Daily Spread offers prepared entrees, sides, bakery items, and complete meal options.",
  },
  {
    icon: Utensils,
    title: "Catering Options",
    desc: "Catering is available for offices, family gatherings, celebrations, and special events.",
  },
  {
    icon: ShoppingBag,
    title: "Online Ordering",
    desc: "Browse current menu selections and place an order online.",
  },
  {
    icon: MapPin,
    title: "Cedar Park Location",
    desc: "Daily Spread is located at 1075 North Lakeline Boulevard, Suite 101, in Cedar Park, Texas.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary-foreground/75 mb-3">
            Daily Spread
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight">
            Prepared Meals, Catering & Bakery Selections
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/60">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
