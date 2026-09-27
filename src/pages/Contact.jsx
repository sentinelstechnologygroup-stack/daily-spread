import React, { useEffect, useState } from "react";
import { Clock, ExternalLink, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SectionHeading from "../components/shared/SectionHeading";
import { getOrderUrl } from "../lib/paytronixMenuApi";

const ADDRESS = "1075 North Lakeline Blvd, Suite 101, Cedar Park, TX 78613";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const MAP_URL = `https://www.google.com/maps?q=${encodeURIComponent(`Daily Spread, ${ADDRESS}`)}&output=embed`;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [inquiryType, setInquiryType] = useState(
    searchParams.get("inquiry") === "concierge" ? "Corporate Concierge Catering" : "Catering Quote"
  );
  const [step, setStep] = useState(1);
  const [contactInfo, setContactInfo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    document.title = "Contact | Daily Spread — Reach Us for Orders & Catering";
  }, []);

  return (
    <>
      <section className="py-24 md:py-32 bg-foreground text-primary-foreground text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3 font-body">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto font-body">
            Contact Daily Spread about menu questions, orders, or catering.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SectionHeading eyebrow="Details" title="How to Reach Us" centered={false} />
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

                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
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
                    <div className="font-semibold text-sm mb-0.5">Facebook</div>
                    <div className="text-muted-foreground">Daily Spread</div>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Quick Links" title="Orders & Catering" centered={false} />
              <div className="space-y-4">
                <a href={getOrderUrl()} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">Order Now</h3>
                    <p className="text-sm text-muted-foreground">View current menu selections and place an order online.</p>
                  </div>
                </a>

                <a href="#inquiry-form" className="block">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">Request Catering</h3>
                    <p className="text-sm text-muted-foreground">Tell us about your event and get a tailored response.</p>
                  </div>
                </a>

                <a href="mailto:orders@daily-spread.com?subject=General Inquiry" className="block">
                  <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all">
                    <h3 className="font-heading text-lg font-semibold mb-1">Email Daily Spread</h3>
                    <p className="text-sm text-muted-foreground">Send a question about the menu, an order, or available services.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div id="inquiry-form" className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <SectionHeading
              eyebrow="Start a Conversation"
              title="Tell us about your event"
              description="Answer a few quick questions and your email app will open with the details ready to send."
              centered={false}
            />
            {submitted ? (
              <div className="rounded-xl bg-primary/10 p-5 text-sm leading-relaxed text-foreground" role="status">
                Your event details are ready in your email app. Send the message to complete your request.
              </div>
            ) : (
              <form
                className="grid gap-5 md:grid-cols-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = new FormData(event.currentTarget);
                  if (step === 1) {
                    setContactInfo({ name: form.get("name"), phone: form.get("phone"), email: form.get("email") });
                    setStep(2);
                    return;
                  }
                  const details = [
                    `Name: ${contactInfo.name}`,
                    `Email: ${contactInfo.email}`,
                    `Phone: ${contactInfo.phone}`,
                    `Event date: ${form.get("eventDate") || "Not decided"}`,
                    `Guest count: ${form.get("guests") || "Not decided"}`,
                    `Service: ${form.get("service") || "Not specified"}`,
                    "",
                    `Event details: ${form.get("details") || "None provided"}`,
                  ].join("\\n");
                  const subject = `${inquiryType} — ${form.get("name")}`;
                  window.location.href = `mailto:Orders@Daily-Spread.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`;
                  setSubmitted(true);
                }}
              >
                {step === 1 ? <>
                  <div className="md:col-span-2 rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground">Step 1 of 2: We’ll use these details to follow up on your request.</div>
                  <label className="grid gap-2 text-sm font-semibold md:col-span-2">Your name
                    <input name="name" type="text" autoComplete="name" required className="h-11 rounded-md border border-input bg-background px-3 font-normal" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">Phone number
                    <input name="phone" type="tel" autoComplete="tel" required className="h-11 rounded-md border border-input bg-background px-3 font-normal" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">Email address
                    <input name="email" type="email" autoComplete="email" required className="h-11 rounded-md border border-input bg-background px-3 font-normal" />
                  </label>
                </> : <>
                  <div className="md:col-span-2 flex items-center justify-between rounded-xl bg-primary/5 p-4 text-sm">
                    <span><strong>{contactInfo.name}</strong> · {contactInfo.phone} · {contactInfo.email}</span>
                    <button type="button" onClick={() => setStep(1)} className="ml-4 min-h-8 font-semibold text-primary underline underline-offset-2">Edit</button>
                  </div>
                  <label className="grid gap-2 text-sm font-semibold">What can we help with?
                    <select name="inquiryType" value={inquiryType} onChange={(event) => setInquiryType(event.target.value)} className="h-11 rounded-md border border-input bg-background px-3 font-normal" required>
                      <option>Catering Quote</option>
                      <option>Corporate Concierge Catering</option>
                      <option>General Question</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">Event date
                    <input name="eventDate" type="date" className="h-11 rounded-md border border-input bg-background px-3 font-normal" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">Estimated guests
                    <input name="guests" type="number" min="1" inputMode="numeric" className="h-11 rounded-md border border-input bg-background px-3 font-normal" />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">Service preference
                    <select name="service" className="h-11 rounded-md border border-input bg-background px-3 font-normal">
                      <option value="">Choose one</option>
                      <option>Delivery</option>
                      <option>Buffet setup and service</option>
                      <option>Pickup</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold md:col-span-2">Tell us about the menu or event
                    <textarea name="details" rows="5" placeholder="Event location, menu ideas, dietary needs, timing, or anything else we should know" className="rounded-md border border-input bg-background px-3 py-3 font-normal" />
                  </label>
                </>}
                <div className="md:col-span-2">
                  <button type="submit" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {step === 1 ? "Continue" : "Continue to email"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="rounded-xl overflow-hidden shadow-md h-80 bg-muted">
            <iframe
              title="Daily Spread location at 1075 North Lakeline Boulevard, Suite 101, Cedar Park, Texas"
              src={MAP_URL}
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
