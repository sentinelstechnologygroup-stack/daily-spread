import React, { useEffect } from "react";
import { Phone, Mail, MapPin, Clock, ExternalLink, Facebook } from "lucide-react";
import SectionHeading from "../components/shared/SectionHeading";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Daily Spread — Reach Us for Orders & Catering";
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 bg-foreground text-primary-foreground text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Have a question? Want to discuss catering for your next event? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Details */}
            <div>
              <SectionHeading
                eyebrow="Details"
                title="How to Reach Us"
                centered={false}
              />
              <div className="space-y-6">
                <a href="tel:5128153540" className="flex items-start gap-4 group">
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Phone</div>
                    <div className="text-muted-foreground">(512) 815-3540</div>
                  </div>
                </a>
                <a href="mailto:orders@daily-spread.com" className="flex items-start gap-4 group">
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Email</div>
                    <div className="text-muted-foreground">orders@daily-spread.com</div>
                  </div>
                </a>
                <a
                  href="https://www.google.com/maps?q=1075+North+Lakeline+Blvd,+Suite+101+Cedar+Park,+Texas+78613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Address</div>
                    <div className="text-muted-foreground">
                      1075 North Lakeline Blvd, Suite 101<br />
                      Cedar Park, Texas 78613
                    </div>
                    <span className="text-xs text-primary mt-1 inline-flex items-center gap-1">
                      Get Driving Directions <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Business Hours</div>
                    <div className="text-muted-foreground">Monday – Friday: 8am to 6pm</div>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/dailyspreadmeals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Facebook className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">Follow Us</div>
                    <div className="text-muted-foreground">Daily Spread on Facebook</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick actions */}
            <div>
              <SectionHeading
                eyebrow="Quick Actions"
                title="What Would You Like to Do?"
                centered={false}
              />
              <div className="space-y-4">
                <a
                  href="https://www.opendining.net/menu/53d035ebf61e46461f212cab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">View Menu & Order Online</h3>
                    <p className="text-sm text-muted-foreground">Browse our full menu or place an order for pickup or delivery.</p>
                  </div>
                </a>
                <a href="mailto:orders@daily-spread.com?subject=Catering Inquiry" className="block">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">Request Catering</h3>
                    <p className="text-sm text-muted-foreground">Tell us about your event and we'll design a custom menu for you.</p>
                  </div>
                </a>
                <a href="mailto:orders@daily-spread.com?subject=Join Weekly Menu List" className="block">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">Join Weekly Menu List</h3>
                    <p className="text-sm text-muted-foreground">Get special meal menus emailed to you every Wednesday.</p>
                  </div>
                </a>
                <a href="mailto:orders@daily-spread.com?subject=General Inquiry" className="block">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">Ask a Question</h3>
                    <p className="text-sm text-muted-foreground">Have a question about our menu, services, or anything else? Just ask!</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl overflow-hidden shadow-md h-80">
            <iframe
              title="Daily Spread location — 1075 North Lakeline Blvd, Suite 101, Cedar Park, TX 78613"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438.5!2d-97.8!3d30.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDMwJzAwLjAiTiA5N8KwNDgnMDAuMCJX!5e0!3m2!1sen!2sus!4v1!5m2!1sen!2sus&q=1075+North+Lakeline+Blvd+Suite+101+Cedar+Park+TX+78613"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}