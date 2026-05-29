import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Menu", path: "/menu" },
  { label: "Catering", path: "/catering" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-foreground text-primary-foreground py-2 px-4 text-sm font-body hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="opacity-80">Bakery, Prepared Meals & Catering — Cedar Park, TX</span>
          <div className="flex items-center gap-5">
            <a href="tel:5128153540" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5" /> (512) 815-3540
            </a>
            <a href="mailto:orders@daily-spread.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5" /> orders@daily-spread.com
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 font-body ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-card shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/8dfbc4da5_image.jpeg"
                alt="Daily Spread logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === l.path
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="https://www.opendining.net/menu/53d035ebf61e46461f212cab"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="ml-3 font-semibold">
                  Order Online
                </Button>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle navigation"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t bg-card px-4 pb-4 pt-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === l.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.opendining.net/menu/53d035ebf61e46461f212cab"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2"
            >
              <Button className="w-full font-semibold">Order Online</Button>
            </a>
            <div className="mt-3 pt-3 border-t flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="tel:5128153540" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> (512) 815-3540
              </a>
              <a href="mailto:orders@daily-spread.com" className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> orders@daily-spread.com
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}