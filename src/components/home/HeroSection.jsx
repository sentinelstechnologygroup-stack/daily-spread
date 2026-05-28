import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// GENERATED PLACEHOLDER — replace with real chef photo from Stephanie
const HERO_IMAGE = "https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/7c764971f_generated_d773e75f.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Daily Spread chef preparing fresh meals in a warm professional kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4 font-body">
            Cedar Park, Texas
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold text-white leading-[1.1] mb-6">
            Catering &<br />Chef-Prepared<br />Meals Made Simple
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-body max-w-md">
            Daily Spread brings fresh, chef-prepared meals and catering options to gatherings, families, offices, and special occasions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/menu">
              <Button size="lg" className="text-base px-7 py-6 font-semibold shadow-lg">
                View Menu <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/catering">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-7 py-6 font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Request Catering
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}