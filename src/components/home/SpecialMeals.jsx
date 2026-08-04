import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "../shared/SectionHeading";
import {
  fetchPaytronixMenu,
  formatCurrency,
  getOrderUrl,
} from "../../lib/paytronixMenuApi";

const WEEKLY_DINNER_CATEGORY = "Weekly Dinner Series";
const FALLBACK_DINNER_IMAGE = "/images/catering/34.webp";

function isWeeklyDinnerCategory(category) {
  return (
    String(category || "").trim().toLowerCase() ===
    WEEKLY_DINNER_CATEGORY.toLowerCase()
  );
}

function isCategoryIntroduction(item) {
  return (
    String(item?.name || "").trim().toLowerCase() ===
    WEEKLY_DINNER_CATEGORY.toLowerCase()
  );
}

function WeeklyDetails({ item }) {
  if (!item?.optionGroups?.length && !item?.prices?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {item.optionGroups.map((group) => (
        <div
          key={`${item.id}-${group.name}`}
          className="rounded-2xl border border-[#dbe6ee] bg-white/80 p-4"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c66d1e]">
            {group.name}
          </p>
          <ul className="space-y-2">
            {group.options.map((option) => (
              <li
                key={`${item.id}-${group.name}-${option.name}`}
                className="flex gap-2 text-sm leading-relaxed text-[#334155]"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1d5b87]" />
                <span>{option.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {!!item.prices.length && (
        <div className="rounded-2xl border border-[#dbe6ee] bg-white/80 p-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c66d1e]">
            Dinner Options
          </p>
          <div className="space-y-2">
            {item.prices.map((price) => (
              <div
                key={`${item.id}-${price.name}-${price.price}`}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-[#334155]">{price.name}</span>
                <span className="font-bold text-[#163f60]">
                  {formatCurrency(price.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpecialMeals() {
  const [menuData, setMenuData] = useState({ items: [], categories: [] });

  useEffect(() => {
    let active = true;

    const loadWeeklyDinner = () => {
      fetchPaytronixMenu()
        .then((data) => {
          if (active) setMenuData(data);
        })
        .catch((error) => {
          console.error("Unable to load weekly specials", error);
        });
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") loadWeeklyDinner();
    };

    loadWeeklyDinner();
    const refreshTimer = window.setInterval(loadWeeklyDinner, 5 * 60 * 1000);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, []);

  const weeklyDinnerItems = useMemo(
    () =>
      menuData.items
        .filter((item) => isWeeklyDinnerCategory(item.category))
        .sort((a, b) => {
          if (isCategoryIntroduction(a) !== isCategoryIntroduction(b)) {
            return isCategoryIntroduction(a) ? 1 : -1;
          }
          return a.sourceIndex - b.sourceIndex;
        }),
    [menuData.items]
  );

  if (!weeklyDinnerItems.length) return null;

  const featuredItem = weeklyDinnerItems[0];
  const additionalItems = weeklyDinnerItems.slice(1, 4);
  const introductionOnly = isCategoryIntroduction(featuredItem);
  const orderUrl = getOrderUrl();
  const featuredImage = featuredItem.image || FALLBACK_DINNER_IMAGE;

  return (
    <section className="relative overflow-hidden bg-[#eef5fa] py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#d7e8f3]/80 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#f2d9c2]/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Preorder Thursday–Sunday"
          title="Weekly Dinner Series"
          description="Chef-crafted meals for two or four featuring fresh, rotating menus inspired by seasonal ingredients and cuisines from around the world."
        />

        <p className="mx-auto -mt-6 mb-10 max-w-3xl text-center font-heading text-xl italic text-[#164f7c]">
          Better than grocery-store prepared meals and more affordable than dining out.
        </p>

        <article className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_24px_70px_rgba(24,68,101,0.14)] lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[600px]">
            <img
              src={featuredImage}
              alt={
                featuredItem.image
                  ? featuredItem.name
                  : "Chef-prepared dinner from the Daily Spread kitchen"
              }
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102f47]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#102f47]/55 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-[#efb277]" />
                Freshly prepared in Cedar Park
              </div>
              {!featuredItem.image && (
                <p className="text-xs text-white/75">
                  Daily Spread kitchen photo
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#c66d1e]">
              {introductionOnly ? "This Week’s Dinner" : "This Week’s Feature"}
            </p>
            <h3 className="mb-4 font-heading text-3xl font-semibold leading-tight text-[#163f60] sm:text-4xl">
              {introductionOnly
                ? "A restaurant-quality dinner—without the restaurant"
                : featuredItem.name}
            </h3>

            {featuredItem.description && (
              <p className="mb-7 whitespace-pre-line text-[15px] leading-7 text-[#536273]">
                {featuredItem.description}
              </p>
            )}

            <WeeklyDetails item={featuredItem} />

            <div className="my-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-xl bg-[#f6f9fb] px-3 py-3 text-xs font-semibold text-[#294b64]">
                <CalendarDays className="h-4 w-4 text-[#c66d1e]" />
                Order Thu–Sun
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#f6f9fb] px-3 py-3 text-xs font-semibold text-[#294b64]">
                <Clock3 className="h-4 w-4 text-[#c66d1e]" />
                Pickup Wednesday
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#f6f9fb] px-3 py-3 text-xs font-semibold text-[#294b64]">
                <Users className="h-4 w-4 text-[#c66d1e]" />
                Dinners for 2 or 4
              </div>
            </div>

            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start"
            >
              <Button size="lg" className="font-semibold px-7">
                Reserve Your Dinner <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </article>

        {!!additionalItems.length && (
          <div className="mx-auto mt-6 grid max-w-6xl gap-6 md:grid-cols-3">
            {additionalItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <h4 className="font-heading text-xl font-semibold text-[#163f60]">
                    {isCategoryIntroduction(item) ? "Dinner Details" : item.name}
                  </h4>
                  {item.description && (
                    <p className="mt-2 line-clamp-5 whitespace-pre-line text-sm leading-6 text-[#64748b]">
                      {item.description}
                    </p>
                  )}
                  {item.priceLabel && (
                    <p className="mt-4 font-bold text-[#c66d1e]">
                      {item.priceLabel}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-[#617487]">
          Menu selections, photos, options, and pricing update automatically from
          Daily Spread’s online ordering menu.
        </p>
      </div>
    </section>
  );
}
