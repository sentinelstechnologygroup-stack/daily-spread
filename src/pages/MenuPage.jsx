import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  HeartHandshake,
  Leaf,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";
import {
  MENU_CATEGORIES,
  MENU_ITEMS,
  formatPrice as formatFallbackPrice,
} from "../data/menuItems";
import {
  fetchPaytronixMenu,
  formatCurrency,
  getOrderUrl,
  compareMenuCategories,
} from "../lib/paytronixMenuApi";

const ALL_CATEGORY = "All";

const MENU_BENEFITS = [
  {
    icon: Utensils,
    title: "Fresh Chef-Prepared Meals",
  },
  {
    icon: Leaf,
    title: "Made with Quality Ingredients",
  },
  {
    icon: HeartHandshake,
    title: "Local Family-Owned Business",
  },
];

function normalizeFallbackMenu() {
  const items = MENU_ITEMS.filter((item) => item.available).map((item, index) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    description: item.description || "",
    prices:
      typeof item.price === "number"
        ? [{ name: item.servingSize || "Regular", price: item.price }]
        : [],
    priceLabel: formatFallbackPrice(item.price),
    image: item.image || "",
    optionGroups: [],
    tags: item.tags || [],
    sourceIndex: index,
  }));

  return {
    items,
    categories: MENU_CATEGORIES,
  };
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState(() => normalizeFallbackMenu());
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    document.title = "Menu | Daily Spread — Chef-Prepared Meals & Catering";
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      setStatus("loading");
      const liveMenu = await fetchPaytronixMenu();
      setMenuData(liveMenu);
      setActiveCategory(ALL_CATEGORY);
      setStatus("success");
    } catch (error) {
      console.error("Unable to load the current menu", error);
      setMenuData(normalizeFallbackMenu());
      setActiveCategory(ALL_CATEGORY);
      setStatus("error");
    }
  }

  const categories = useMemo(
    () => [ALL_CATEGORY, ...[...menuData.categories].sort(compareMenuCategories)],
    [menuData.categories]
  );

  const menuSections = useMemo(() => {
    const sectionCategories =
      activeCategory === ALL_CATEGORY
        ? [...menuData.categories].sort(compareMenuCategories)
        : [activeCategory];

    return sectionCategories
      .map((category) => ({
        category,
        items: menuData.items
          .filter((item) => item.category === category)
          .sort((a, b) => a.sourceIndex - b.sourceIndex),
      }))
      .filter((section) => section.items.length);
  }, [activeCategory, menuData.categories, menuData.items]);

  const orderUrl = getOrderUrl();

  return (
    <>
      <section className="relative min-h-[55vh] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero/menu-hero.png"
            alt="Daily Spread chef-prepared meals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Current Menu
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Daily Spread Menu
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto font-body">
            Browse our current menu of chef-prepared meals, sides, bakery items,
            and catering selections.
          </p>
          <div className="mt-8 flex justify-center">
            <a href={orderUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-semibold px-7">
                <ShoppingBag className="w-4 h-4 mr-2" /> Order Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {MENU_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border bg-card px-6 py-8 text-center shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-heading text-lg font-semibold">
                  {benefit.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Chef-Prepared Meals"
            title="Choose a Menu Category"
            description="Select All to browse the complete menu or choose a category to narrow the selections."
          />

          <div className="mb-8 flex justify-center">
            <a href={orderUrl} target="_blank" rel="noopener noreferrer">
              <Button className="font-semibold">
                Order Now <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          {status === "error" && (
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Some current selections may be unavailable. Use Order Now to view
              the latest ordering options.
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {status === "loading" && !menuData.items.length ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              Loading menu…
            </div>
          ) : (
            <div className="space-y-14">
              {menuSections.map((section) => (
                <section key={section.category} aria-labelledby={`menu-${section.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>
                  <div className="mb-6 flex items-center gap-4">
                    <h3
                      id={`menu-${section.category.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                      className="font-heading text-2xl md:text-3xl font-semibold"
                    >
                      {section.category}
                    </h3>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {section.items.map((item) => (
                      <article
                        key={item.id}
                        className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col"
                      >
                  {item.image && (
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-heading text-lg font-semibold leading-tight">
                        {item.name}
                      </h3>
                      {item.priceLabel && (
                        <span className="text-xs font-semibold bg-primary/10 text-primary rounded-full px-3 py-1 whitespace-nowrap">
                          {item.priceLabel}
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-4 flex-1">
                        {item.description}
                      </p>
                    )}

                    {!!item.prices.length && (
                      <div className="rounded-xl bg-muted/60 p-3 mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70 mb-2">
                          Available Sizes
                        </p>
                        <div className="space-y-1.5">
                          {item.prices.map((price) => (
                            <div
                              key={`${item.id}-${price.name}-${price.price}`}
                              className="flex justify-between gap-3 text-xs"
                            >
                              <span className="text-muted-foreground">
                                {price.name}
                              </span>
                              <span className="font-semibold text-foreground">
                                {formatCurrency(price.price)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!!item.optionGroups.length && (
                      <details className="rounded-xl border border-border p-3 mb-4">
                        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-foreground/70">
                          View Options
                        </summary>
                        <div className="mt-3 space-y-3">
                          {item.optionGroups.slice(0, 3).map((group) => (
                            <div key={`${item.id}-${group.name}`}>
                              <p className="text-xs font-semibold mb-1">
                                {group.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {group.options
                                  .slice(0, 8)
                                  .map((option) => option.name)
                                  .join(", ")}
                                {group.options.length > 8 ? "…" : ""}
                              </p>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}

                    <a
                      href={orderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto"
                    >
                      <Button type="button" className="w-full font-semibold">
                        Order Now <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                  </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {!menuSections.length && status !== "loading" && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              No menu items are currently listed in this category.
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">
            Ready to Order?
          </h2>
          <p className="text-primary-foreground/80 mb-6 font-body">
            View current availability and complete your order online.
          </p>
          <a href={orderUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="font-semibold px-7">
              <ShoppingBag className="w-4 h-4 mr-2" /> Order Now
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
