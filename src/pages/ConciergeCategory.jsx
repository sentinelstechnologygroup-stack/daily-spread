import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "../components/shared/SectionHeading";
import ImageComingSoon from "../components/shared/ImageComingSoon";
import { CONCIERGE_HUB_GROUPS, CONCIERGE_MENU, fetchConciergeMenu, getConciergeItemImage } from "../data/conciergeMenu";

export default function ConciergeCategory() {
  const { categorySlug } = useParams();
  const [menu, setMenu] = useState(CONCIERGE_MENU);

  useEffect(() => {
    let mounted = true;
    const refresh = async () => {
      try {
        const liveMenu = await fetchConciergeMenu();
        if (mounted && liveMenu.length) setMenu(liveMenu);
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

  const hubGroup = CONCIERGE_HUB_GROUPS.find((group) => group.slugs.includes(categorySlug));
  const categories = (hubGroup?.slugs || [categorySlug]).map((slug) => menu.find((entry) => entry.slug === slug)).filter(Boolean);
  const category = categories[0];
  const items = categories.flatMap((entry) => entry.items);

  if (!category) {
    return <section className="py-28 text-center"><h1 className="font-heading text-4xl mb-6">Catering category not found</h1><Link to="/catering"><Button>Back to catering</Button></Link></section>;
  }

  const pageTitle = hubGroup?.title || category.title;
  document.title = `${pageTitle} Catering | Daily Spread — Cedar Park, TX`;

  return (
    <>
      <section className="relative min-h-[42vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-foreground"><img src={hubGroup?.image || category.image} alt={`${pageTitle} catering`} className="w-full h-full object-fill" /><div className="absolute inset-0 bg-foreground/65" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-white">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-foreground/80">Corporate Catering Concierge</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-4">{pageTitle}</h1>
          <p className="mt-5 text-white">Chef-prepared selections for office meetings, team meals, and special events.</p>
        </div>
      </section>
      <section className="py-20 bg-[#eef5fa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={pageTitle} title="Choose your selections" description={hubGroup?.note || "Review the options below, then contact Daily Spread to plan your menu and event service."} />
          <div className="space-y-6">
            {items.map((item) => {
              const [name, description] = item;
              const image = getConciergeItemImage(item);
              return (
              <article key={name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:flex">
                <div className="md:w-[36%] md:shrink-0">{image ? <img src={image} alt={`${name} catering`} className="aspect-[4/3] h-full w-full object-cover" loading="lazy" /> : <ImageComingSoon className="h-full" />}</div>
                <div className="flex flex-1 items-center p-6 md:p-8"><div><h2 className="font-heading text-2xl font-semibold mb-3">{name}</h2><p className="text-sm text-muted-foreground leading-relaxed">{description}</p></div></div>
              </article>
              );
            })}
          </div>
          <div className="mt-12 text-center"><a href="/contact?inquiry=concierge"><Button size="lg">Request a catering quote</Button></a></div>
        </div>
      </section>
    </>
  );
}
