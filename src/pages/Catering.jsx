import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import SectionHeading from "../components/shared/SectionHeading";
import galleryImages from "../data/gallery";

const CATERING_IMAGES = galleryImages.filter((image) => image.category === "Catering");
const CATERING_HERO = "/images/hero/catering-hero.png";

const CUISINES = [
  {
    name: "Italian Cuisine",
    desc: "Spaghetti, Chicken Marsala, lasagna, Chicken Primavera, salads, and garlic bread.",
  },
  {
    name: "Asian Cuisine",
    desc: "Cantonese-style fried rice, wonton soup, and additional selections by request.",
  },
  {
    name: "Peruvian Cuisine",
    desc: "Aji de Gallina, Chicken a la Brasa, roast beef, ceviche, Arroz con Pollo, and Papas a la Huancaina.",
  },
  {
    name: "Mexican Cuisine",
    desc: "Mexican rice and beans, beef, shrimp or chicken fajitas, tacos, empanadas, and Aguadito de Pollo soup.",
  },
  {
    name: "American Cuisine",
    desc: "Garlic chicken, meatloaf, fish with shrimp garlic sauce, salmon, and a variety of sides.",
  },
  {
    name: "Custom Menus",
    desc: "Contact Daily Spread to discuss menu selections, event size, dietary requests, and budget.",
  },
];

export default function Catering() {
  useEffect(() => {
    document.title = "Catering | Daily Spread — Event & Corporate Catering in Cedar Park, TX";
  }, []);

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-foreground">
          <img
            src={CATERING_HERO}
            alt="Daily Spread catering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4 font-body">
            Catering Services
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Catering for Every Occasion
          </h1>
          <p className="text-lg text-white/80 leading-relaxed mb-8 font-body max-w-3xl mx-auto">
            Daily Spread provides catering for business meals, family gatherings, celebrations, and special events.
          </p>
          <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry">
            <Button size="lg" className="font-semibold px-7 text-base">Request Catering</Button>
          </a>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Catering Designed Around Your Event"
            description="Contact Daily Spread to discuss guest count, menu preferences, service needs, and available catering options."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Corporate Meals",
              "Boxed Lunches",
              "Buffet Service",
              "Family Gatherings",
              "Celebrations",
              "Custom Menus",
            ].map((service, index) => {
              const image = CATERING_IMAGES[index + 1];

              return (
                <article key={service} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
                  {image && (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-5 text-center">
                    <h3 className="font-heading text-lg font-semibold">{service}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Menu Options"
            title="Custom Cuisine Selections"
            description="Available menu options include Italian, Asian, Peruvian, Mexican, and American cuisine."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUISINES.map((cuisine, index) => {
              const image = CATERING_IMAGES[index + 7];

              return (
                <article key={cuisine.name} className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
                  {image && (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full aspect-[4/3] object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-2">{cuisine.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cuisine.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Planning an Event?</h2>
          <p className="text-primary-foreground/80 mb-6 font-body">
            Contact Daily Spread to discuss catering availability and menu options.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry">
              <Button size="lg" variant="secondary" className="font-semibold px-7">
                Request Catering
              </Button>
            </a>
            <a href="tel:5128153540">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-7 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Call (512) 815-3540
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
