import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Heart, MapPin, Award } from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";

// GENERATED PLACEHOLDER — replace with real chef/team photo
const CHEF_IMAGE = "/images/7c764971f_generated_d773e75f.png";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Daily Spread — Chef-Prepared Meals & Catering";
  }, []);

  return (
    <>
      {/* Hero banner */}
      <section className="relative py-24 md:py-32 bg-foreground text-primary-foreground">
        <div className="absolute inset-0 opacity-20">
          <img
            src={CHEF_IMAGE}
            alt="Daily Spread kitchen"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Our Story
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Daily Spread
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Serving Cedar Park, Texas with fresh, chef-prepared meals and catering.
          </p>
        </div>
      </section>

      {/* Main about content */}
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
              <SectionHeading
                eyebrow="Who We Are"
                title="A Kitchen Built on Passion"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Daily Spread is a kitchen that provides delicious chef-prepared meals
                  and catering services for busy families, businesses, and special occasions.
                  We offer fully cooked meals featuring entrees, sides, and more — crafted
                  with fresh, quality ingredients by our talented chefs.
                </p>
                <p>
                  Our chefs have the ability to design spectacular meals to fit any budget
                  and any palate — from international fare with dishes from various countries
                  to simple single-dish meals or just hors d'oeuvres.
                </p>
                <p>
                  Everything is served family-style, making it easy to share a wonderful
                  meal without the effort of cooking. We're proud to serve the Cedar Park
                  community with personal, chef-driven service.
                </p>
              </div>

              {/* Placeholder for more details from Stephanie */}
              <div className="mt-8 p-6 bg-secondary/50 rounded-xl border border-border">
                <p className="text-sm text-muted-foreground italic">
                  More about Daily Spread coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="What Sets Us Apart"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ChefHat, title: "Chef-Crafted", desc: "Every dish made from scratch with expertise and care." },
              { icon: Heart, title: "Made with Love", desc: "Personal attention in every order, big or small." },
              { icon: MapPin, title: "Locally Rooted", desc: "Proudly serving Cedar Park and surrounding communities." },
              { icon: Award, title: "Quality First", desc: "Fresh, quality ingredients — always." },
            ].map((v) => (
              <div key={v.title} className="bg-card rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Ready to Try Daily Spread?</h2>
          <p className="text-primary-foreground/80 mb-8 font-body">
            Browse our menu, explore catering options, or place an order today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="font-semibold px-7">
                View Menu
              </Button>
            </Link>
            <Link to="/catering">
              <Button size="lg" variant="outline" className="font-semibold px-7 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                Request Catering
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}