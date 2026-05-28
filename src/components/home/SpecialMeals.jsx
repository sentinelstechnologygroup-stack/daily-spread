import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, ShoppingBag, Utensils } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

// GENERATED PLACEHOLDER — replace with real photos
const MEAL_FOR_TWO = "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/d51b86c61_generated_73ccf05e.png";
const FAMILY_MEAL = "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/3bea38a78_generated_eb659072.png";

const STEPS = [
  {
    icon: CalendarDays,
    title: "Menus Emailed Wednesday",
    desc: "Receive the weekly special meal menu directly in your inbox every Wednesday.",
  },
  {
    icon: ShoppingBag,
    title: "Order by Sunday",
    desc: "Browse the menu and place your order anytime before Sunday evening.",
  },
  {
    icon: Utensils,
    title: "Pickup Wednesday",
    desc: "Pick up your freshly prepared, complete meal the following Wednesday.",
  },
];

export default function SpecialMeals() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Special Meal Offerings"
          title="Weekly Chef-Prepared Meals for 2 or 4"
          description="Complete, chef-prepared meals featuring an entree, sides, and extras like bread, salad, soup, appetizers, or dessert. Menus rotate weekly with seasonal ingredients and inspired flavors."
        />

        {/* Timeline steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {STEPS.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Step {i + 1}</div>
              <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Image pair */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={MEAL_FOR_TWO}
              alt="Beautifully plated chef-prepared dinner for two with salmon and fresh sides"
              className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="bg-card p-4">
              <h4 className="font-heading text-lg font-semibold">Meals for Two</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Perfect for date night or a quiet evening in.
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={FAMILY_MEAL}
              alt="Family-style dinner spread for four with roasted chicken, sides, and fresh bread"
              className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="bg-card p-4">
              <h4 className="font-heading text-lg font-semibold">Meals for Four</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Feed the whole family with a complete, chef-prepared dinner.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mb-6">
          Offerings begin monthly and will move toward weekly as the program grows. Stay tuned for new menus!
        </p>

        <div className="text-center">
          <Link to="/menu">
            <Button size="lg" className="font-semibold px-7">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}