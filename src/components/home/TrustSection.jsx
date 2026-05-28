import React from "react";
import { ChefHat, Leaf, Clock, MapPin } from "lucide-react";

const FEATURES = [
  {
    icon: ChefHat,
    title: "Chef-Driven Quality",
    desc: "Every meal is prepared by our talented chefs with the ability to design spectacular dishes from worldwide cuisines.",
  },
  {
    icon: Leaf,
    title: "Fresh, Quality Ingredients",
    desc: "We use fresh, quality ingredients in every dish — hand-cut salmon, made-from-scratch sauces, and freshly baked bread.",
  },
  {
    icon: Clock,
    title: "Convenient & Easy",
    desc: "Order online, pick up your fully cooked meal, and enjoy. Family-style portions ready when you need them.",
  },
  {
    icon: MapPin,
    title: "Local & Personal",
    desc: "Proudly serving Cedar Park, Texas. We're your neighborhood kitchen, treating every order with personal care.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Why Daily Spread
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight">
            Your Local Chef, Ready to Serve
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-primary-foreground/70">
            We believe great food should be accessible, personal, and made with love. That's why families and businesses across Cedar Park trust Daily Spread.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}