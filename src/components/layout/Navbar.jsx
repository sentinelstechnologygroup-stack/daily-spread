import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrderUrl } from "../../lib/paytronixMenuApi";

const NAV_LINKS = [
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
  const orderUrl = getOrderUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
      <nav className={`sticky top-0 z-50 transition-all duration-300 font-body ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-md" : "bg-card shadow-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link to="/" className="flex items-center gap-3" aria-label="Daily Spread home">
              <img src="/images/logo.jpeg" alt="Daily Spread logo" className="h-16 md:h-20 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a href={orderUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="ml-3 font-semibold">Order Now</Button>
              </a>
            </div>

            <button
              onClick={() => setOpen((current) => !current)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t bg-card px-4 pb-4 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href={orderUrl} target="_blank" rel="noopener noreferrer" className="block mt-2">
              <Button className="w-full font-semibold">Order Now</Button>
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
  );
}
