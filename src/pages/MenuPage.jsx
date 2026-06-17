import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ExternalLink, RefreshCw, ShoppingBag, Utensils } from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";
import { MENU_CATEGORIES, MENU_ITEMS, formatPrice as formatFallbackPrice } from "../data/menuItems";
import { fetchPaytronixMenu, formatCurrency, getOrderUrl } from "../lib/paytronixMenuApi";

const FALLBACK_IMAGE = "/images/7c764971f_generated_d773e75f.png";

function normalizeFallbackMenu() {
  const items = MENU_ITEMS.filter((item) => item.available).map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    description: item.description,
    prices: typeof item.price === "number" ? [{ name: item.servingSize || "Regular", price: item.price }] : [],
    priceLabel: formatFallbackPrice(item.price),
    image: item.image || "",
    optionGroups: [],
    tags: item.tags || [],
  }));

  return {
    items,
    categories: MENU_CATEGORIES,
    count: items.length,
    syncedAt: "",
  };
}

export default function MenuPage() {
  const [menuData, setMenuData] = useState(() => normalizeFallbackMenu());
  const [activeCategory, setActiveCategory] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Menu | Daily Spread — Chef-Prepared Meals & Catering";
    loadMenu();
  }, []);

  useEffect(() => {
    if (!activeCategory && menuData.categories.length) {
      setActiveCategory(menuData.categories[0]);
    }
  }, [activeCategory, menuData.categories]);

  async function loadMenu() {
    try {
      setStatus("loading");
      setError("");
      const liveMenu = await fetchPaytronixMenu();
      setMenuData(liveMenu);
      setActiveCategory((current) => current && liveMenu.categories.includes(current) ? current : liveMenu.categories[0] || "");
      setStatus("success");
    } catch (err) {
      console.error("Unable to load Paytronix menu", err);
      setMenuData(normalizeFallbackMenu());
      setActiveCategory((current) => current || MENU_CATEGORIES[0]);
      setError("Live Paytronix menu could not be loaded. Showing the saved website menu fallback.");
      setStatus("error");
    }
  }

  const filteredItems = useMemo(() => {
    return menuData.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuData.items]);

  const orderUrl = getOrderUrl();

  return (
    <>
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Live Paytronix Menu
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Daily Spread Menu
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/75 max-w-3xl mx-auto font-body">
            Browse the current Daily Spread menu synced from Paytronix/OpenDining. Menu items, pricing, images, options, and availability update from the same system used for online ordering.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={orderUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-semibold px-7">
                <ShoppingBag className="w-4 h-4 mr-2" /> Order Online
              </Button>
            </a>
            <Button type="button" size="lg" variant="secondary" className="font-semibold px-7" onClick={loadMenu} disabled={status === "loading"}>
              <RefreshCw className={`w-4 h-4 mr-2 ${status === "loading" ? "animate-spin" : ""}`} /> Refresh Menu
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Utensils className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold mb-2">Synced From Paytronix</h3>
              <p className="text-sm text-muted-foreground">Stephanie updates menu items in Paytronix, and this page pulls the live menu feed.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold mb-2">Checkout Stays Secure</h3>
              <p className="text-sm text-muted-foreground">Customers complete cart, tax, payment, and confirmation through the Paytronix ordering portal.</p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-sm text-center border border-border">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-base font-semibold mb-2">No Duplicate Editing</h3>
              <p className="text-sm text-muted-foreground">The website is no longer a manually maintained duplicate menu.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Current Menu"
            title="Chef-Prepared Meals, Sides & Catering"
            description="Prices and availability are pulled from Paytronix. Select Order Online to complete an order in the official Daily Spread ordering portal."
          />

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">
              {status === "loading" && "Loading live Paytronix menu..."}
              {status === "success" && (
                <span>
                  Loaded {menuData.count} active menu item{menuData.count === 1 ? "" : "s"}
                  {menuData.syncedAt ? ` • Synced ${new Date(menuData.syncedAt).toLocaleString()}` : ""}
                </span>
              )}
              {status === "error" && (
                <span className="inline-flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4" /> {error}
                </span>
              )}
            </div>
            <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button className="font-semibold w-full md:w-auto">
                Order / Checkout in Paytronix <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {menuData.categories.map((category) => (
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

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <article key={item.id} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-heading text-lg font-semibold leading-tight">{item.name}</h3>
                    <span className="text-xs font-semibold bg-primary/10 text-primary rounded-full px-3 py-1 whitespace-nowrap">
                      {item.priceLabel}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-4 flex-1">{item.description}</p>

                  {!!item.prices.length && (
                    <div className="rounded-xl bg-muted/60 p-3 mb-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70 mb-2">Available Sizes</p>
                      <div className="space-y-1.5">
                        {item.prices.map((price) => (
                          <div key={`${item.id}-${price.name}-${price.price}`} className="flex justify-between gap-3 text-xs">
                            <span className="text-muted-foreground">{price.name}</span>
                            <span className="font-semibold text-foreground">{formatCurrency(price.price)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!!item.optionGroups.length && (
                    <details className="rounded-xl border border-border p-3 mb-4">
                      <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-foreground/70">
                        View Options / Modifiers
                      </summary>
                      <div className="mt-3 space-y-3">
                        {item.optionGroups.slice(0, 3).map((group) => (
                          <div key={`${item.id}-${group.name}`}>
                            <p className="text-xs font-semibold mb-1">{group.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {group.options.slice(0, 8).map((option) => option.name).join(", ")}
                              {group.options.length > 8 ? "..." : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}

                  <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="mt-auto">
                    <Button type="button" className="w-full font-semibold">
                      Order in Paytronix <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {!filteredItems.length && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
              No active menu items were found for this category.
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-3">Ready to Order?</h2>
          <p className="text-primary-foreground/80 mb-6 font-body">
            Complete your order securely through the official Daily Spread Paytronix ordering portal.
          </p>
          <a href={orderUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="font-semibold px-7">
              <ShoppingBag className="w-4 h-4 mr-2" /> Open Ordering Portal
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
