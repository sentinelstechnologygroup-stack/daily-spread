import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import SectionHeading from "../components/shared/SectionHeading";
import galleryImages from "../data/gallery";
import { fetchPaytronixMenu } from "../lib/paytronixMenuApi";

const CATERING_IMAGES = galleryImages.filter((image) => image.category === "Catering");
const CATERING_HERO = "/images/hero/catering-hero.png";
const CATERING_MENU_CATEGORY_PATTERN = /^(catering|catering services|catering menu|catering selections|concierge corporate catering)$/i;
const CONCIERGE_CATEGORY_NAMES = [
  "CONCIERGE CORPORATE CATERING",
  "Breakfast",
  "Breakfast Sides",
  "Lunch",
  "Hot Corporate Entrees",
  "Side - Choose with hot meals",
  "Bread",
  "Desserts",
  "Beverages",
  "Service",
];
const isConciergeCategory = (category) => CONCIERGE_CATEGORY_NAMES.some((name) => name.toLowerCase() === category.toLowerCase());
const CONCIERGE_IMAGES = [
  "/images/concierge/corporate-catering.png",
  "/images/concierge/catering-spread.png",
  "/images/concierge/buffet-setup.png",
  "/images/concierge/family-meal.png",
  "/images/concierge/event-catering.png",
  "/images/concierge/fresh-ingredients.png",
];
const CUISINE_IMAGES = [
  "/images/concierge/catering-spread.png",
  "/images/concierge/fresh-ingredients.png",
  "/images/concierge/meal-for-two.png",
  "/images/concierge/corporate-catering.png",
  "/images/concierge/event-catering.png",
  "/images/concierge/desserts.png",
];

const CONCIERGE_HIGHLIGHTS = [
  { title: "Breakfast meetings", text: "Breakfast taco bars, breakfast sandwiches, quiche, parfaits, and waffle or pancake stations." },
  { title: "Office lunches", text: "Box lunches, sandwich and wrap trays, taco bars, salads, hot entrees, and sides for team meals." },
  { title: "Concierge coordination", text: "We can coordinate outside restaurant and caterer orders for multi-location meetings, with delivery and service support quoted for your event." },
];

const CONCIERGE_MENU = [
  { title: "Breakfast", text: "Breakfast taco bars, breakfast sandwiches, quiche, parfaits, seasonal fruit, and waffle or pancake stations." },
  { title: "Lunch", text: "Box lunches, sandwich and wrap trays, sliders, taco bars, salads, baked potato bars, and cookies." },
  { title: "Hot entrees", text: "Chicken, beef, pork, salmon, Italian pasta, and fajita buffets with sides and bread." },
  { title: "Sides and salads", text: "Rice, beans, potatoes, vegetables, mixed greens, Caesar salad, and seasonal selections." },
  { title: "Desserts and beverages", text: "Dessert bites, cupcakes, cheesecakes, cookies, tea, lemonade, coffee, soda, and bottled water." },
  { title: "Event service", text: "Disposables, buffet attendants, chafing systems, beverage service, rentals, and delivery can be included in your quote." },
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
  const [liveMenu, setLiveMenu] = useState({ items: [] });

  useEffect(() => {
    document.title = "Catering | Daily Spread — Event & Corporate Catering in Cedar Park, TX";

    let active = true;
    fetchPaytronixMenu()
      .then((menu) => {
        if (active) setLiveMenu(menu);
      })
      .catch((error) => {
        console.error("Unable to load the catering menu", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const liveCateringItems = useMemo(
    () =>
      liveMenu.items.filter((item) => CATERING_MENU_CATEGORY_PATTERN.test(item.category)),
    [liveMenu.items]
  );

  const liveConciergeItems = useMemo(
    () => liveMenu.items.filter((item) => isConciergeCategory(item.category)),
    [liveMenu.items]
  );

  const liveConciergeGroups = useMemo(() => {
    const groups = new Map();
    liveConciergeItems.forEach((item) => {
      if (!groups.has(item.category)) groups.set(item.category, []);
      groups.get(item.category).push(item);
    });
    return [...groups.entries()];
  }, [liveConciergeItems]);

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

      <section className="py-16 md:py-20 bg-[#f8f4ed]" id="corporate-concierge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4 font-body">Corporate Catering Concierge</span>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">One dependable partner for your office meal</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">For teams of 25 or more, recurring meetings, or multiple locations, Daily Spread can coordinate menus, vendors, delivery, and service around your schedule.</p>
              <a href="#live-concierge-selections" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Explore concierge selections</a>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {CONCIERGE_HIGHLIGHTS.map((highlight) => (
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

      <section className="py-20 md:py-28 bg-[#f8f4ed]" id="corporate-concierge-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Corporate Catering Concierge"
            title="A reliable meal partner for busy teams"
            description="For offices with 25 or more employees, recurring meetings, or multiple locations, Daily Spread can help plan the menu, coordinate vendors, and keep delivery details moving."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {CONCIERGE_HIGHLIGHTS.map((highlight) => (
              <article key={highlight.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold mb-3">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{highlight.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-primary/20 bg-background p-6 md:p-8">
            <h3 className="font-heading text-2xl font-semibold mb-3">Build a menu around your meeting</h3>
            <p className="text-muted-foreground leading-relaxed mb-5">Menus rotate seasonally. Vegetarian and gluten-free accommodations are available by request. Most events need at least three business days' notice, and larger events are best planned a week ahead.</p>
            <a href="mailto:orders@daily-spread.com?subject=Corporate Catering Concierge Inquiry" className="inline-flex items-center rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Request a corporate catering quote</a>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background" id="concierge-menu">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Concierge Menu"
            title="A flexible menu for the whole workday"
            description="The concierge menu rotates quarterly so teams have variety while dependable favorites stay in the mix. Ask us to build a menu around your headcount, timing, dietary needs, and budget."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONCIERGE_MENU.map((category) => (
              <article key={category.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{category.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">Ten-guest minimum. Vegetarian and gluten-free accommodations are available by request. Delivery, service, and outside-vendor coordination are quoted with your event.</p>
        </div>
      </section>

      {!!liveConciergeItems.length && (
        <section className="py-20 md:py-28 bg-[#eef5fa]" id="live-concierge-selections">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Updated from Open Dining"
              title="Current concierge selections"
              description="Stephanie can update these selections in Open Dining. The website refreshes the names, descriptions, and available images automatically; prices are intentionally omitted here."
            />
            <div className="space-y-12">
              {liveConciergeGroups.map(([category, items]) => (
                <div key={category}>
                  <h3 className="font-heading text-2xl font-semibold mb-5">{category}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                      <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                        {item.image && <img src={item.image} alt={item.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />}
                        <div className="p-6">
                          <h4 className="font-heading text-xl font-semibold mb-3">{item.name}</h4>
                          {item.description && <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!!liveCateringItems.length && (
        <section className="py-20 md:py-28 bg-[#eef5fa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Sample Catering Menu"
              title="Current Catering Selections"
              description="Selections may vary. Contact Daily Spread to build a menu for your event."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveCateringItems.map((item) => (
                <article key={item.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="font-heading text-xl font-semibold mb-3">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

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
