import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionHeading from "../components/shared/SectionHeading";
const ABOUT_IMAGE = "/images/hero/about-hero.png";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Daily Spread — Chef-Prepared Meals & Catering";
  }, []);

  return (
    <>
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src={ABOUT_IMAGE}
            alt="Daily Spread chef-prepared meals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Daily Spread</h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Chef-prepared meals, bakery selections, and catering in Cedar Park, Texas.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://daily-spread.com/wp-content/uploads/2017/06/girl.png"
                alt="Daily Spread chef"
                className="w-full object-cover"
              />
            </div>

            <div>
              <SectionHeading eyebrow="Who We Are" title="Daily Spread" centered={false} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Daily Spread is a kitchen that provides delicious chef-prepared meals and catering services for busy families, businesses, and special occasions. We offer fully cooked meals featuring entrées, sides, and bakery items—crafted with fresh, quality ingredients by our talented chefs
                </p>
                <p>
                  Our chefs can design spectacular meals to fit nearly any budget and palate, from international cuisine representing countries around the world to simple single-dish meals and elegant hors d'oeuvres.
                </p>
                <p>
                  Everything is served family-style, making it easy to enjoy a wonderful meal without the effort of cooking. We're proud to serve the Cedar Park community with personal, chef-driven service and a commitment to quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Explore Daily Spread</h2>
          <p className="text-primary-foreground/80 mb-8 font-body">
            Browse the current menu or contact Daily Spread about catering.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="font-semibold px-7">View Menu</Button>
            </Link>
            <Link to="/catering">
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-7 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Request Catering
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
