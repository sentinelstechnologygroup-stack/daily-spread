import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SectionHeading from "../components/shared/SectionHeading";
import ImageComingSoon from "../components/shared/ImageComingSoon";
import galleryImages from "../data/gallery";
import { CONCIERGE_MENU, fetchConciergeMenu, getConciergeItemImage } from "../data/conciergeMenu";

const CATERING_IMAGES = galleryImages.filter((image) => image.category === "Catering");
const CATERING_HERO = "/images/hero/catering-hero.png";
const CONCIERGE_IMAGES = [
  "/images/concierge/corporate-catering.png",
  "/images/concierge/catering-spread.png",
  "/images/concierge/buffet-setup.png",
  "/images/concierge/family-meal.png",
  "/images/concierge/event-catering.png",
  "/images/concierge/fresh-ingredients.png",
];
const CUISINE_IMAGES = [
  "/images/concierge/italian-cuisine.png",
  "/images/concierge/asian-cuisine.png",
  "/images/concierge/peruvian-cuisine.png",
  "/images/concierge/mexican-cuisine.png",
  "/images/concierge/american-cuisine.png",
  "/images/concierge/custom-menus.png",
];

const CONCIERGE_HIGHLIGHTS = [
  { title: "Breakfast meetings", text: "Breakfast taco bars, breakfast sandwiches, quiche, parfaits, and waffle or pancake stations." },
  { title: "Office lunches", text: "Box lunches, sandwich and wrap trays, taco bars, salads, hot entrees, and sides for team meals." },
  { title: "Concierge coordination", text: "We can coordinate outside restaurant and caterer orders for multi-location meetings, with delivery and service support quoted for your event." },
];

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
  const [conciergeMenu, setConciergeMenu] = useState(CONCIERGE_MENU);

  useEffect(() => {
    let mounted = true;
    const refresh = async () => {
      try {
        const liveMenu = await fetchConciergeMenu();
        if (mounted && liveMenu.length) setConciergeMenu(liveMenu);
      } catch {
        // Keep the PDF-derived fallback when Open Dining is unavailable.
      }
    };
    refresh();
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  document.title = "Catering | Daily Spread — Event & Corporate Catering in Cedar Park, TX";

  return (
    <>
      <section className="relative min-h-[60vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-foreground">
          <img
            src={CATERING_HERO}
            alt="Daily Spread catering"
            className="w-full h-full object-fill"
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

      <section className="py-16 md:py-20 bg-[#f8f4ed]" id="corporate-concierge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4 font-body">Corporate Catering Concierge</span>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Corporate catering, planned around your meeting</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">Daily Spread provides menu selections for office meetings, team meals, and large events. Vegetarian and gluten-free accommodations are available by request, and selections rotate quarterly for seasonal variety.</p>
              <a href="#live-concierge-selections" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Explore concierge selections</a>
            </div>
            <div className="grid gap-4">
              {[
                { title: "Scheduling", text: "10–25 guests: minimum three business days. 26+ guests: minimum one week." },
                { title: "Large events", text: "Events for 100+ guests are subject to availability; earlier planning is strongly encouraged." },
                { title: "Ordering", text: <>Order concierge selections by email at <a href="mailto:Orders@Daily-Spread.com" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">Orders@Daily-Spread.com</a>.</> },
              ].map((highlight) => (
                <div key={highlight.title} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{highlight.text}</p>
                </div>
              ))}
            </div>
          </div>
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
              const image = { src: CONCIERGE_IMAGES[index], alt: `${service} by Daily Spread` };

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

      <div className="bg-background px-4 pb-12">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 shadow-sm sm:px-8">
          <p className="font-heading text-lg font-semibold">Ready to choose your menu?</p>
          <a href="#live-concierge-selections" className="shrink-0">
            <Button size="lg" className="font-semibold px-7">Build Your Event Menu</Button>
          </a>
        </div>
      </div>

      {!!conciergeMenu.length && (
        <section className="py-20 md:py-28 bg-[#eef5fa]" id="live-concierge-selections">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Corporate Catering Concierge"
              title="Build your event menu"
              description="Explore breakfast, lunch, hot entrees, sides, desserts, beverages, and service selections for your next meeting or event."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {conciergeMenu.map((category) => {
                const categoryImage = category.image || getConciergeItemImage(category.items[0]);
                return (
                <a key={category.slug} href={`/catering/concierge/${category.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  {categoryImage ? <img src={categoryImage} alt={`${category.title} catering`} className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]" loading="lazy" /> : <ImageComingSoon />}
                  <div className="flex flex-1 flex-col p-6"><h3 className="font-heading text-xl font-semibold mb-2">{category.title}</h3><p className="text-sm text-muted-foreground">{category.items.map(([name]) => name).join(", ")}</p><span className="mt-auto pt-6 text-sm font-semibold text-primary">View selections →</span></div>
                </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="bg-[#eef5fa] px-4 pb-12">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-card px-6 py-5 shadow-sm sm:px-8">
          <p className="font-heading text-lg font-semibold">Need help planning your event?</p>
          <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry" className="shrink-0">
            <Button size="lg" className="font-semibold px-7">Request a Concierge Quote</Button>
          </a>
        </div>
      </div>

      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Menu Options"
            title="Custom Cuisine Selections"
            description="Available menu options include Italian, Asian, Peruvian, Mexican, and American cuisine."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUISINES.map((cuisine, index) => {
              const image = { src: CUISINE_IMAGES[index], alt: `${cuisine.name} catering by Daily Spread` };

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
