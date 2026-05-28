import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Building2, Heart, PartyPopper } from "lucide-react";
import SectionHeading from "../shared/SectionHeading";

// GENERATED PLACEHOLDER — replace with real catering photos
const CATERING_IMAGE = "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/e32d7656f_generated_d03d63c1.png";

const HIGHLIGHTS = [
  { icon: Building2, label: "Corporate Lunches", desc: "Impress your team with fresh, chef-prepared meals for any business occasion." },
  { icon: Users, label: "Family Gatherings", desc: "From intimate dinners to large family reunions, we bring the feast." },
  { icon: PartyPopper, label: "Celebrations", desc: "Birthdays, showers, anniversaries — make every celebration delicious." },
  { icon: Heart, label: "Special Occasions", desc: "Custom menus tailored to your event, your tastes, and your guests." },
];

export default function CateringFeature() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={CATERING_IMAGE}
                alt="Elegant catering spread with beautifully arranged dishes for a special event"
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/5 rounded-xl -z-10" />
          </div>

          {/* Text */}
          <div>
            <SectionHeading
              eyebrow="Catering Services"
              title="Let Us Cater Your Next Event"
              description="From small intimate gatherings to large celebrations, Daily Spread's talented chefs create spectacular meals tailored to any occasion and any palate."
              centered={false}
            />
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <h.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{h.label}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/catering">
              <Button size="lg" className="font-semibold px-7">
                Explore Catering
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}