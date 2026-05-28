import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <img
              src="https://media.base44.com/images/public/6a15b633b62c7abf2b26d54b/8dfbc4da5_image.jpeg"
              alt="Daily Spread logo"
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm opacity-70 leading-relaxed">
              Chef-prepared meals and catering for gatherings, families, offices, and special occasions in Cedar Park, Texas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Menu", path: "/menu" },
                { label: "Catering", path: "/catering" },
                { label: "Gallery", path: "/gallery" },
                { label: "Contact", path: "/contact" },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="opacity-70 hover:opacity-100 hover:text-primary transition-all">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:5128153540" className="flex items-start gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  (512) 815-3540
                </a>
              </li>
              <li>
                <a href="mailto:orders@daily-spread.com" className="flex items-start gap-2.5 opacity-70 hover:opacity-100 transition-opacity">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  orders@daily-spread.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 opacity-70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>1075 North Lakeline Blvd, Suite 101<br />Cedar Park, Texas 78613</span>
              </li>
              <li className="flex items-start gap-2.5 opacity-70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                Mon–Fri: 8am to 6pm
              </li>
            </ul>
          </div>

          {/* Social / Order */}
          <div>
            <h4 className="font-heading text-lg mb-4">Follow & Order</h4>
            <a
              href="https://www.facebook.com/dailyspreadmeals/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all mb-4"
            >
              <Facebook className="w-5 h-5" /> Facebook
            </a>
            <div className="mt-2">
              <a
                href="https://www.opendining.net/menu/53d035ebf61e46461f212cab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Order Online
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-50">
          © {new Date().getFullYear()} Daily Spread. All rights reserved. Cedar Park, Texas.
        </div>
      </div>
    </footer>
  );
}