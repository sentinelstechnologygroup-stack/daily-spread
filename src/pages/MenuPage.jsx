import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, CalendarDays, ShoppingBag, Utensils, Mail } from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";

const OPEN_DINING_URL = "https://www.opendining.net/menu/53d035ebf61e46461f212cab";

const MENU_CATEGORIES = [
  { name: "Catering Services", desc: "Custom catering for events of any size — appetizers, trays, lunches, dinners, desserts, and beverages." },
  { name: "Early-Morning Bites", desc: "Fresh scones, muffins, and banana nut bread baked daily." },
  { name: "Sandwiches, Salads & Soups", desc: "Grilled chicken wraps, Caesar salads, chicken pasta salad, taco soup, and more." },
  { name: "Beef Entrees", desc: "Meatloaf, spaghetti and meatballs — classic comfort food made from scratch." },
  { name: "Chicken Entrees", desc: "Primavera, rosemary, garlic, and lemon garlic chicken — gluten-free and paleo options available." },
  { name: "Pork Entrees", desc: "Pork tenderloin medallions and rosemary butter-basted pork chops with two sides." },
  { name: "Seafood Entrees", desc: "Salmon fillets, pangasius with garlic shrimp sauce, and cajun shrimp linguine." },
  { name: "Casseroles", desc: "King Ranch chicken casserole, enchilada casserole, and more family favorites." },
  { name: "Desserts & Baked Goods", desc: "Pies, cookies, seasonal treats, and gift cards available." },
];

export default function MenuPage() {
  useEffect(() => {
    document.title = "Menu | Daily Spread — Chef-Prepared Meals & Catering";
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Chef-Prepared
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Menu
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Browse our full menu of chef-prepared meals, sides, soups, salads, sandwiches, and desserts.
            No ordering required — just explore.
          </p>
        </div>
      </section>

      {/* Special Meal Info */}
      <section className="py-16 md:py-20 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Weekly Specials"
            title="Special Meal Offerings"
            description="Complete chef-prepared meals for 2 or 4 people, featuring entree, sides, and extras like bread, salad, soup, appetizers, or dessert."
          />

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: CalendarDays, title: "Menus Emailed Wednesday", desc: "Receive the weekly special meal menu directly in your inbox." },
              { icon: ShoppingBag, title: "Orders Open Until Sunday", desc: "Browse and place your order any time before Sunday evening." },
              { icon: Utensils, title: "Pickup the Following Wednesday", desc: "Pick up your freshly prepared, complete meal." },
            ].map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="mailto:orders@daily-spread.com?subject=Join Weekly Menu List">
              <Button size="lg" className="font-semibold px-7">
                <Mail className="w-4 h-4 mr-2" /> Join Weekly Menu List
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Full Menu"
            title="What's on the Menu"
            description="All of our food is fully cooked and made from scratch with fresh, quality ingredients. Meals are served family-style for 1, 2, or 4 people."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {MENU_CATEGORIES.map((c) => (
              <div key={c.name} className="bg-card rounded-xl p-5 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all">
                <h3 className="font-heading text-base font-semibold mb-2">{c.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href={OPEN_DINING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-semibold px-7">
                <ExternalLink className="w-4 h-4 mr-2" /> View Full Menu & Order
              </Button>
            </a>
            <a href={OPEN_DINING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="font-semibold px-7">
                Start Order
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Catering CTA */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">Need Catering for Your Next Event?</h2>
          <p className="text-primary-foreground/80 mb-6 font-body">
            We customize menus for any occasion and budget.
          </p>
          <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry">
            <Button size="lg" variant="secondary" className="font-semibold px-7">
              Request Catering
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}