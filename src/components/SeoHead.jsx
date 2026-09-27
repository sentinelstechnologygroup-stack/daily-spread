import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://daily-spread.com";
const DEFAULT_TITLE = "Daily Spread | Catering & Chef-Prepared Meals | Cedar Park, TX";
const DEFAULT_DESCRIPTION = "Chef-prepared meals and corporate, event, and family catering from Daily Spread in Cedar Park, Texas. Order online or request a catering quote.";

const PAGE_SEO = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/catering": { title: "Corporate & Event Catering in Cedar Park, TX | Daily Spread", description: "Plan breakfast meetings, office lunches, buffets, boxed lunches, and special events with Daily Spread's corporate catering concierge in Cedar Park, TX." },
  "/menu": { title: "Chef-Prepared Meals & Catering Menu | Daily Spread Cedar Park", description: "Browse Daily Spread's current chef-prepared meals, weekly selections, and catering options for pickup, delivery, and events in Cedar Park, Texas." },
  "/contact": { title: "Contact Daily Spread Catering in Cedar Park, TX", description: "Contact Daily Spread in Cedar Park, Texas for orders, catering availability, directions, and custom menu requests." },
  "/about": { title: "About Daily Spread | Cedar Park Chef-Prepared Meals", description: "Learn about Daily Spread, a Cedar Park kitchen serving chef-prepared meals and thoughtful catering for local families, offices, and events." },
  "/gallery": { title: "Daily Spread Catering & Chef-Prepared Meals | Gallery", description: "See Daily Spread's chef-prepared meals, catered spreads, and event service in Cedar Park, Texas." },
};

export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = PAGE_SEO[pathname] || PAGE_SEO["/"];
    const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    document.title = seo.title;
    const setMeta = (name, content) => {
      let node = document.querySelector(`meta[name="${name}"]`);
      if (!node) { node = document.createElement("meta"); node.setAttribute("name", name); document.head.appendChild(node); }
      node.setAttribute("content", content);
    };
    setMeta("description", seo.description);
    let link = document.querySelector("link[rel='canonical']");
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
  }, [pathname]);

  return null;
}
