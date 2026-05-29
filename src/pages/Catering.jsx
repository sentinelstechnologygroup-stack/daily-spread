import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Users, Heart, PartyPopper, Utensils, Star } from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";

// GENERATED PLACEHOLDERS — replace with real photos from Stephanie
const CATERING_HERO = "/images/e32d7656f_generated_d03d63c1.png";
const CORPORATE_IMG = "/images/39fc17487_generated_b7541871.png";
const EVENT_IMG = "/images/9343014c7_generated_edbaa02d.png";
const BUFFET_IMG = "/images/9c6efda45_generated_a26f10a4.png";

const CUISINES = [
  { name: "Italian Cuisine", desc: "Spaghetti, Chicken Marsala, Lasagna, Chicken Primavera with fresh salads and homemade garlic bread." },
  { name: "Asian Cuisine", desc: "Cantonese style Fried Rice, Wonton Soup and more." },
  { name: "Peruvian Cuisine", desc: "Aji de Gallina, Chicken Ala Brasa, Roast Beef, Ceviche, Arroz con Pollo, Papas ala Huancaina." },
  { name: "Mexican Cuisine", desc: "Mexican rice and beans, Beef, Shrimp or Chicken Fajitas, Tacos, Empanadas, and Aguadito de pollo soup." },
  { name: "American Cuisine", desc: "Garlic Chicken, Meatloaf, Fish with Shrimp garlic sauce, Salmon with various sides." },
  { name: "Custom Menus", desc: "Our chefs design spectacular meals tailored to your event — any cuisine, any dietary need, any budget." },
];

const SERVICES = [
  { icon: Building2, title: "Corporate Meals", desc: "Box lunches, buffets, and plated meals for meetings, conferences, and company events." },
  { icon: Users, title: "Small Events", desc: "Intimate dinners, dinner parties, and small gatherings with personalized menus." },
  { icon: Heart, title: "Family Gatherings", desc: "Family-style meals for reunions, holidays, and Sunday dinners." },
  { icon: PartyPopper, title: "Celebrations", desc: "Birthdays, baby showers, anniversaries, and milestone events catered with care." },
  { icon: Utensils, title: "Custom Meal Support", desc: "Dietary accommodations, custom menus, and specialty cuisines for any occasion." },
  { icon: Star, title: "Full-Service Catering", desc: "Hot food delivery, buffet attendants, beverage staff, event rentals, and complete setup." },
];

export default function Catering() {
  useEffect(() => {
    document.title = "Catering | Daily Spread — Event & Corporate Catering in Cedar Park, TX";
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img src={CATERING_HERO} alt="Elegant catering spread for events and celebrations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4 font-body">
              Catering Services
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Catering for Every Occasion
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8 font-body">
              From business lunches to wedding celebrations, our talented chefs create spectacular meals tailored to your event, your tastes, and your budget.
            </p>
            <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry">
              <Button size="lg" className="font-semibold px-7 text-base">Request Catering</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="How We Can Help"
            description="No event too small or large. We provide everything from light appetizers and box lunches to full-service catering with attendants and event rentals."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/20 transition-all">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisine Gallery */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="World-Class Cuisine"
            title="Worldwide Custom Cuisines"
            description="Our catering features custom cuisines specially tailored for any occasion."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {CUISINES.map((c) => (
              <div key={c.name} className="bg-card rounded-xl p-6 shadow-sm">
                <h3 className="font-heading text-base font-semibold mb-2">{c.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img src={CORPORATE_IMG} alt="Corporate catering with fresh food for office events" className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img src={EVENT_IMG} alt="Small event catering with appetizers and desserts" className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img src={BUFFET_IMG} alt="Buffet-style catering spread with chafing dishes" className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          </div>

          {/* Placeholder for additional photos */}
          <div className="mt-8 p-6 bg-card rounded-xl border border-dashed border-border text-center">
            <p className="text-sm text-muted-foreground italic">
              Additional catering photos coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Ready to Plan Your Event?</h2>
          <p className="text-primary-foreground/80 mb-6 font-body">
            Contact us to discuss your catering needs. We'll customize a menu that fits your occasion, your tastes, and your budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry">
              <Button size="lg" variant="secondary" className="font-semibold px-7">
                Request Catering
              </Button>
            </a>
            <a href="tel:5128153540">
              <Button size="lg" variant="outline" className="font-semibold px-7 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Call (512) 815-3540
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}