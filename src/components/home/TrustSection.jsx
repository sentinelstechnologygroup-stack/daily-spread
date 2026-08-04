import React from "react";
import { Link } from "react-router-dom";
import { ChefHat, MapPin, ShoppingBag, Utensils } from "lucide-react";
import { getOrderUrl } from "../../lib/paytronixMenuApi";

const FEATURES = [
  {
    icon: ChefHat,
    title: "Chef-Prepared Meals",
    desc: "Daily Spread offers prepared entrees, sides, bakery items, and complete meal options.",
    to: "/menu",
  },
  {
    icon: Utensils,
    title: "Catering Options",
    desc: "Catering is available for offices, family gatherings, celebrations, and special events.",
    to: "/catering",
  },
  {
    icon: ShoppingBag,
    title: "Online Ordering",
    desc: "Browse current menu selections and place an order online.",
    external: true,
  },
  {
    icon: MapPin,
    title: "Cedar Park Location",
    desc: "Daily Spread is located at 1075 North Lakeline Boulevard, Suite 101, in Cedar Park, Texas.",
    to: "/contact",
  },
];

function FeatureCard({ feature }) {
  const content = (
    <>
      <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5 transition-colors group-hover:bg-white/25">
        <feature.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-heading text-lg font-semibold mb-2 text-white">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-white/75">{feature.desc}</p>
    </>
  );

  const className =
    "group block h-full rounded-2xl px-5 py-7 text-center transition-all hover:-translate-y-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80";

  if (feature.external) {
    return (
      <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link to={feature.to} className={className}>
      {content}
    </Link>
  );
}

export default function TrustSection() {
  return (
    <section className="py-20 md:py-28 bg-[#164f7c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-white/75 mb-3">
            Daily Spread
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold leading-tight">
            Prepared Meals, Catering & Bakery Selections
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
