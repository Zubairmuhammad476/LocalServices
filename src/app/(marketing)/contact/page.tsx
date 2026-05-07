"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Static data ────────────────────────────────────────────────── */
const OFFICES = [
  { city: "Dubai (HQ)", address: "Dubai Internet City, Building 12\nSuite 204, Dubai 73000", phone: "+971 4 123 4567", hours: "Sun–Thu: 9 am – 6 pm GST", icon: "🏙️" },
  { city: "Abu Dhabi", address: "Twofour54, Khalifa Park Area\nAbu Dhabi, UAE", phone: "+971 2 456 7890", hours: "Sun–Thu: 9 am – 6 pm GST", icon: "🕌" },
  { city: "Sharjah", address: "Sharjah Media City (Shams)\nBuilding 7, Sharjah", phone: "+971 6 789 0123", hours: "Sun–Thu: 9 am – 5 pm GST", icon: "🌆" },
];

const QUICK_CONTACTS = [
  { icon: "📧", label: "General Enquiries", value: "hello@localservices.ae", href: "mailto:hello@localservices.ae" },
  { icon: "🛒", label: "Bookings Support", value: "bookings@localservices.ae", href: "mailto:bookings@localservices.ae" },
  { icon: "🤝", label: "Provider Partnerships", value: "partners@localservices.ae", href: "mailto:partners@localservices.ae" },
  { icon: "⚖️", label: "Legal & Privacy", value: "legal@localservices.ae", href: "mailto:legal@localservices.ae" },
  { icon: "📞", label: "Hotline (24/7)", value: "+971 800 LSV AE", href: "tel:+971800578" },
  { icon: "💬", label: "WhatsApp Support", value: "+971 50 999 8888", href: "https://wa.me/971509998888" },
];

const FAQ = [
  { q: "How quickly can I get a service booked?", a: "Most services are bookable same-day. You'll receive a confirmation within 15 minutes of submitting your request." },
  { q: "How do you verify service providers?", a: "Every provider undergoes identity verification, trade licence checks, reference checks, and a trial service assessment before joining our platform." },
  { q: "What if I'm unhappy with a service?", a: "Contact support within 24 hours. We'll arrange a complimentary re-service or a full refund — no questions asked." },
  { q: "Can I book services outside Dubai?", a: "Yes! We operate across all 7 UAE emirates. Select your emirate when booking." },
  { q: "How do I become a service provider?", a: "Apply via our Provider Registration page. Our onboarding team will contact you within 2 business days." },
];

const TRUST_STATS = [
  { value: "2 hr", label: "Average Response", icon: "⚡" },
  { value: "4 hr", label: "Issue Resolution", icon: "🎯" },
  { value: "24/7", label: "Hotline Active", icon: "📞" },
  { value: "98%", label: "Satisfaction Rate", icon: "💎" },
];

/* ─── Reusable input style helper ────────────────────────────────── */
const inputClass = "w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1C5297]/20 focus:border-[#1C5297]";
const inputStyle = { borderColor: "#E2E8F0", color: "#0F1923", background: "#ffffff" };
const labelClass = "mb-1.5 block text-xs font-semibold";

/* ─── Component ──────────────────────────────────────────────────── */
export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("sent");
  };

  return (
    <div className="overflow-x-hidden">

      {/* ───── HERO with background image + trust stats inside ───── */}
      <section className="relative overflow-hidden" aria-label="Contact LocalServices AE support">
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/assets/images/homepage/hero-v3.webp"
            alt="Dubai skyline background"
            className="object-cover object-center"
            fill
            priority
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,17,40,0.82) 0%, rgba(10,17,40,0.88) 60%, rgba(10,17,40,0.95) 100%)" }} />
        </div>

        <div className="relative z-10">
          {/* Hero text */}
          <div className="mx-auto max-w-4xl px-4 pt-24 pb-14 text-center sm:px-6 sm:pt-28 sm:pb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
              💬 We reply within 2 hours (Sun–Thu)
            </span>
            <h1 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl font-display">
              Get In Touch With{" "}
              <span className="gradient-text">LocalServices AE</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              <strong className="text-white/90">Support requests, including booking disputes and provider applications,</strong>{" "}
              receive responses within 2 business hours (Sunday–Thursday). Resolution occurs within 4 hours, if the user submits a complete booking reference.
            </p>
          </div>

          {/* Trust stats inside hero */}
          <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-20">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {TRUST_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-6 text-center backdrop-blur-md transition-all hover:bg-white/[0.12] hover:border-white/20"
                  role="figure"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl transition-transform group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <p className="mt-3 text-2xl font-extrabold text-white font-display sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-white/60 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── Contact Form (left) + Quick Contact Channels (right) ───── */}
      <section className="section-slate py-20 sm:py-24" aria-label="Send us a message">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label">Send a Message</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">We&apos;d Love to Hear From You</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form (3 cols) */}
            <div className="lg:col-span-3">
              {formState === "sent" ? (
                <div className="bento-card flex flex-col items-center p-12 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full text-4xl" style={{ background: "rgba(34,197,94,0.12)" }}>✅</div>
                  <h3 className="mt-5 text-2xl font-bold font-display" style={{ color: "#0F1923" }}>Message Sent Successfully!</h3>
                  <p className="mt-2 text-sm" style={{ color: "#64748B" }}>We&apos;ve received your message and will reply within 2 business hours (Sun–Thu).</p>
                  <button
                    onClick={() => { setFormState("idle"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="btn-primary mt-8 px-8 py-3 text-sm"
                    id="send-another-message"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bento-card space-y-6 p-8 sm:p-10" id="contact-form">
                  <div>
                    <h3 className="text-xl font-bold font-display" style={{ color: "#0F1923" }}>Send Us a Message</h3>
                    <p className="mt-1 text-sm" style={{ color: "#64748B" }}>All fields marked * are required.</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelClass} style={{ color: "#0F1923" }}>Full Name *</label>
                      <input id="contact-name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ahmed Al Rashidi" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelClass} style={{ color: "#0F1923" }}>Email Address *</label>
                      <input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ahmed@example.com" className={inputClass} style={inputStyle} />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className={labelClass} style={{ color: "#0F1923" }}>Phone Number</label>
                      <input id="contact-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971 50 123 4567" className={inputClass} style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className={labelClass} style={{ color: "#0F1923" }}>Subject *</label>
                      <select id="contact-subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className={inputClass} style={{ ...inputStyle, color: form.subject ? "#0F1923" : "#94A3B8" }}>
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="provider">Provider Partnership</option>
                        <option value="refund">Refund Request</option>
                        <option value="technical">Technical Support</option>
                        <option value="media">Media &amp; Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass} style={{ color: "#0F1923" }}>Message *</label>
                    <textarea id="contact-message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us how we can help..." className={`${inputClass} resize-none`} style={inputStyle} />
                  </div>

                  <button type="submit" disabled={formState === "sending"} className="btn-primary w-full py-3.5 text-sm font-bold disabled:opacity-50" id="submit-contact-form">
                    {formState === "sending" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Quick Contact Channels sidebar (2 cols) */}
            <aside className="lg:col-span-2 space-y-4" aria-label="Quick contact channels">
              <div className="text-center lg:text-left">
                <p className="section-label">Reach Us Directly</p>
                <h3 className="section-h2-dark mt-2 text-xl font-bold">Quick Contact Channels</h3>
                <p className="mt-1 text-sm" style={{ color: "#64748B" }}>Choose the right department for fastest response.</p>
              </div>
              {QUICK_CONTACTS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  id={`contact-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className="bento-card group flex items-start gap-4 p-5"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110" style={{ background: "rgba(28,82,151,0.08)" }}>
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#1C5297" }}>{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold font-display" style={{ color: "#0F1923" }}>{item.value}</p>
                  </div>
                </a>
              ))}

              {/* Google Maps CTA */}
              <div className="bento-card relative overflow-hidden p-6 text-center" style={{ background: "linear-gradient(135deg, #1C5297 0%, #0A1128 100%)" }}>
                <p className="text-2xl" aria-hidden="true">📍</p>
                <h4 className="mt-2 text-lg font-bold text-white font-display">Need Directions?</h4>
                <p className="mt-1 text-xs text-white/70">Find the nearest LocalServices AE office</p>
                <a href="https://maps.google.com/?q=Dubai+Internet+City" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-xs font-bold transition-all hover:shadow-lg" style={{ color: "#1C5297" }} id="open-google-maps">
                  Open in Google Maps →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ───── Office Locations (below form, full width) ───── */}
      <section className="section-ghost py-20 sm:py-24" aria-label="Office locations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label">Our Offices</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Visit Us In Person</h2>
            <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "#64748B" }}>
              Our doors are open across the UAE — stop by for a chat.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICES.map((office) => (
              <div key={office.city} className="safety-card group" role="article" aria-label={`${office.city} office`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110" style={{ background: "rgba(28,82,151,0.08)" }} aria-hidden="true">
                    {office.icon}
                  </span>
                  <h4 className="text-lg font-bold font-display" style={{ color: "#0F1923" }}>{office.city}</h4>
                </div>
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: "#64748B" }}>{office.address}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="text-sm font-semibold transition-colors hover:underline" style={{ color: "#1C5297" }}>
                    {office.phone}
                  </a>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>{office.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ Section ───── */}
      <section className="section-slate py-20 sm:py-24" aria-label="Frequently asked questions">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Common Questions</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Frequently Asked Questions</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm" style={{ color: "#64748B" }}>
              Find quick answers to common questions about our services, providers, and booking process.
            </p>
          </div>
          <div className="mt-12 space-y-3">
            {FAQ.map((faq, i) => (
              <details
                key={faq.q}
                className="faq-item"
                open={openFaq === i}
                onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === i ? null : i); }}
              >
                <summary className="faq-summary">
                  <span>{faq.q}</span>
                  <svg className="faq-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </summary>
                {openFaq === i && <div className="faq-body animate-fade-in">{faq.a}</div>}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Catchy Bottom CTA with background image ───── */}
      <section className="relative overflow-hidden py-28 sm:py-32" aria-label="Explore services across UAE">
        {/* Background image */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/assets/images/homepage/hero-v3.webp"
            alt=""
            className="object-cover object-center"
            fill
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(28,82,151,0.92) 0%, rgba(10,17,40,0.95) 50%, rgba(28,82,151,0.88) 100%)" }} />
        </div>

        {/* Decorative glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white/90 backdrop-blur-sm">
            🇦🇪 Serving All 7 UAE Emirates
          </span>
          <h2 className="mt-8 text-4xl font-extrabold text-white font-display sm:text-5xl leading-tight">
            Ready to Experience{" "}
            <span className="gradient-text">Premium Home Services?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Join <strong className="text-white">20,000+ happy customers</strong> across the UAE. Verified professionals arrive same-day. DED Licensed. Fully Insured. Satisfaction guaranteed.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/services/dubai"
              className="btn-ripple group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-sm font-bold shadow-xl transition-all hover:shadow-2xl hover:scale-105"
              style={{ color: "#1C5297" }}
              id="explore-services-cta"
            >
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              Browse Services
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/50"
              id="become-provider-cta"
            >
              Become a Provider →
            </Link>
          </div>

          <p className="mt-8 text-xs text-white/50">
            🔒 No credit card required · AED payments only · 7-day satisfaction guarantee
          </p>
        </div>
      </section>
    </div>
  );
}
