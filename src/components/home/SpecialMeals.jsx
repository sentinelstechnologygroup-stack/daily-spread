import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "../shared/SectionHeading";
import { fetchPaytronixMenu, getOrderUrl } from "../../lib/paytronixMenuApi";

const SPECIAL_CATEGORY_PATTERN = /(weekly|special)/i;

export default function SpecialMeals() {
  const [menuData, setMenuData] = useState({ items: [], categories: [] });

  useEffect(() => {
    let active = true;

    fetchPaytronixMenu()
      .then((data) => {
        if (active) setMenuData(data);
      })
      .catch((error) => {
        console.error("Unable to load weekly specials", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const specialCategories = useMemo(
    () => menuData.categories.filter((category) => SPECIAL_CATEGORY_PATTERN.test(category)),
    [menuData.categories]
  );

  const specialItems = useMemo(
    () => menuData.items.filter((item) => specialCategories.includes(item.category)).slice(0, 3),
    [menuData.items, specialCategories]
  );

  if (!specialCategories.length) return null;

  const orderUrl = getOrderUrl();

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Current Specials"
          title={specialCategories[0]}
          description="View the current special menu and order while selections are available."
        />

        {!!specialItems.length && (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {specialItems.map((item) => (
              <article key={item.id} className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold mb-2">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/menu">
            <Button size="lg" variant="outline" className="font-semibold px-7">
              View Menu
            </Button>
          </Link>
          <a href={orderUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="font-semibold px-7">
              Order Now <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
