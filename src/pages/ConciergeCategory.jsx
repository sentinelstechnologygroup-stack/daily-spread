import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "../components/shared/SectionHeading";
import ImageComingSoon from "../components/shared/ImageComingSoon";
import { CONCIERGE_MENU, fetchConciergeMenu, getConciergeItemImage } from "../data/conciergeMenu";

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

  const category = menu.find((entry) => entry.slug === categorySlug);

  if (!category) {
    return <section className="py-28 text-center"><h1 className="font-heading text-4xl mb-6">Catering category not found</h1><Link to="/catering"><Button>Back to catering</Button></Link></section>;
  }

  document.title = `${category.title} Catering | Daily Spread — Cedar Park, TX`;

  return (
    <>
      <section className="relative min-h-[42vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-foreground"><img src={category.image} alt={`${category.title} catering`} className="w-full h-full object-fill" /><div className="absolute inset-0 bg-foreground/65" /></div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-white">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary-foreground/80">Corporate Catering Concierge</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mt-4">{category.title}</h1>
          <p className="mt-5 text-white">Chef-prepared selections for office meetings, team meals, and special events.</p>
        </div>
      </section>
      <section className="py-20 bg-[#eef5fa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow={category.title} title="Choose your selections" description="Review the options below, then contact Daily Spread to plan your menu and event service." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item) => {
              const [name, description] = item;
              const image = getConciergeItemImage(item);
              return (
              <article key={name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {image ? <img src={image} alt={`${name} catering`} className="aspect-[4/3] w-full object-cover" loading="lazy" /> : <ImageComingSoon />}
                <div className="p-6"><h2 className="font-heading text-xl font-semibold mb-3">{name}</h2><p className="text-sm text-muted-foreground leading-relaxed">{description}</p></div>
              </article>
              );
            })}
          </div>
          <div className="mt-12 text-center"><a href="mailto:orders@daily-spread.com?subject=Corporate Catering Concierge Inquiry"><Button size="lg">Request a catering quote</Button></a></div>
        </div>
      </section>
    </>
  );
}
