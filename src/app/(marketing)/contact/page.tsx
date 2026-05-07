"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Metadata } from "next";

/* ─── Static data ────────────────────────────────────────────────── */
const OFFICES = [
  {
    city: "Dubai (HQ)",
    address: "Dubai Internet City, Building 12\nSuite 204, Dubai 73000",
    phone: "+971 4 123 4567",
    hours: "Sun–Thu: 9 am – 6 pm GST",
    icon: "🏙️",
  },
  {
    city: "Abu Dhabi",
    address: "Twofour54, Khalifa Park Area\nAbu Dhabi, UAE",
    phone: "+971 2 456 7890",
    hours: "Sun–Thu: 9 am – 6 pm GST",
    icon: "🕌",
  },
  {
    city: "Sharjah",
    address: "Sharjah Media City (Shams)\nBuilding 7, Sharjah",
    phone: "+971 6 789 0123",
    hours: "Sun–Thu: 9 am – 5 pm GST",
    icon: "🌆",
  },
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
  {
    q: "How quickly can I get a service booked?",
    a: "Most services are bookable same-day. You'll receive a confirmation within 15 minutes of submitting your request.",
  },
  {
    q: "How do you verify service providers?",
    a: "Every provider undergoes identity verification, trade licence checks, reference checks, and a trial service assessment before joining our platform.",
  },
  {
    q: "What if I'm unhappy with a service?",
    a: "Contact support within 24 hours. We'll arrange a complimentary re-service or a full refund — no questions asked.",
  },
  {
    q: "Can I book services outside Dubai?",
    a: "Yes! We operate across all 7 UAE emirates. Select your emirate when booking.",
  },
  {
    q: "How do I become a service provider?",
    a: "Apply via our Provider Registration page. Our onboarding team will contact you within 2 business days.",
  },
];

const TRUST_STATS = [
  { value: "2 hr", label: "Average Response", icon: "⚡" },
  { value: "4 hr", label: "Issue Resolution", icon: "🎯" },
  { value: "24/7", label: "Hotline Active", icon: "📞" },
  { value: "98%", label: "Satisfaction Rate", icon: "💎" },
];

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
      {/* ───── Hero ───── */}
      <section
        className="relative overflow-hidden py-28"
        style={{ background: "#081226" }}
        aria-label="Contact LocalServices AE support"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,98,255,0.2)_0%,transparent_65%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-900/20 px-4 py-1.5 text-xs font-semibold text-blue-300">
            💬 We reply within 2 hours (Sun–Thu)
          </span>
          <h1 className="mt-7 text-5xl font-extrabold leading-tight text-white sm:text-6xl font-display">
            Get In Touch With{" "}
            <span className="gradient-text">LocalServices AE</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-300">
            <strong>Support requests, including booking disputes and provider applications,</strong>{" "}
            receive responses within 2 business hours (Sunday–Thursday). Resolution occurs within 4 hours, if the user submits a complete booking reference.
          </p>
        </div>
      </section>

      {/* ───── Trust Stats Bar ───── */}
      <section
        className="border-y py-10"
        style={{
          background: "linear-gradient(90deg, rgba(13,21,48,0.5) 0%, rgba(10,22,40,0.5) 100%)",
          borderColor: "rgba(0,98,255,0.12)",
        }}
        aria-label="Support performance metrics"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label} className="text-center" role="figure" aria-label={`${stat.value} ${stat.label}`}>
                <div className="text-3xl" aria-hidden="true">{stat.icon}</div>
                <p className="mt-2 text-3xl font-extrabold text-white font-display">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Quick Contact Cards ───── */}
      <section className="section-ghost py-20 sm:py-24" aria-label="Quick contact information">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Reach Us Directly</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">Quick Contact Channels</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm" style={{ color: "#64748B" }}>
              Choose the department that best matches your enquiry for the fastest response.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_CONTACTS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                id={`contact-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="bento-card group flex items-start gap-4 p-6"
                aria-label={`${item.label}: ${item.value}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110"
                  style={{ background: "rgba(28,82,151,0.08)" }}
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#1C5297" }}>{item.label}</p>
                  <p className="mt-1 text-base font-semibold font-display" style={{ color: "#0F1923" }}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Contact Form + Offices (side by side) ───── */}
      <section className="section-slate py-20 sm:py-24" aria-label="Send us a message">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-label">Send a Message</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">We&apos;d Love to Hear From You</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form (takes 3 cols) */}
            <div className="lg:col-span-3">
              {formState === "sent" ? (
                <div className="bento-card flex flex-col items-center p-12 text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                    style={{ background: "rgba(34,197,94,0.12)" }}
                  >
                    ✅
                  </div>
                  <h3 className="mt-5 text-2xl font-bold font-display" style={{ color: "#0F1923" }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "#64748B" }}>
                    We&apos;ve received your message and will reply within 2 business hours (Sun–Thu).
                  </p>
                  <button
                    onClick={() => {
                      setFormState("idle");
                      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                    }}
                    className="btn-primary mt-8 px-8 py-3 text-sm"
                    id="send-another-message"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bento-card space-y-6 p-8 sm:p-10" id="contact-form">
                  <div>
                    <h3 className="text-xl font-bold font-display" style={{ color: "#0F1923" }}>
                      Send Us a Message
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: "#64748B" }}>
                      All fields marked * are required.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold" style={{ color: "#0F1923" }}>
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Ahmed Al Rashidi"
                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#E2E8F0",
                          color: "#0F1923",
                          background: "#ffffff",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "#1C5297"; e.target.style.boxShadow = "0 0 0 3px rgba(28,82,151,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold" style={{ color: "#0F1923" }}>
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="ahmed@example.com"
                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#E2E8F0",
                          color: "#0F1923",
                          background: "#ffffff",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "#1C5297"; e.target.style.boxShadow = "0 0 0 3px rgba(28,82,151,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold" style={{ color: "#0F1923" }}>
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#E2E8F0",
                          color: "#0F1923",
                          background: "#ffffff",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "#1C5297"; e.target.style.boxShadow = "0 0 0 3px rgba(28,82,151,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold" style={{ color: "#0F1923" }}>
                        Subject *
                      </label>
                      <select
                        id="contact-subject"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2"
                        style={{
                          borderColor: "#E2E8F0",
                          color: form.subject ? "#0F1923" : "#94A3B8",
                          background: "#ffffff",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "#1C5297"; e.target.style.boxShadow = "0 0 0 3px rgba(28,82,151,0.12)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="provider">Provider Partnership</option>
                        <option value="refund">Refund Request</option>
                        <option value="technical">Technical Support</option>
                        <option value="media">Media & Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold" style={{ color: "#0F1923" }}>
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2"
                      style={{
                        borderColor: "#E2E8F0",
                        color: "#0F1923",
                        background: "#ffffff",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "#1C5297"; e.target.style.boxShadow = "0 0 0 3px rgba(28,82,151,0.12)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#E2E8F0"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="btn-primary w-full py-3.5 text-sm font-bold disabled:opacity-50"
                    id="submit-contact-form"
                  >
                    {formState === "sending" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>

            {/* Offices sidebar (2 cols) */}
            <aside className="space-y-5 lg:col-span-2" aria-label="Office locations">
              <div className="text-center lg:text-left">
                <p className="section-label">Our Offices</p>
                <h3 className="section-h2-dark mt-2 text-xl font-bold">Visit Us In Person</h3>
              </div>
              {OFFICES.map((office) => (
                <div
                  key={office.city}
                  className="safety-card group"
                  role="article"
                  aria-label={`${office.city} office`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-transform group-hover:scale-110"
                      style={{ background: "rgba(28,82,151,0.08)" }}
                      aria-hidden="true"
                    >
                      {office.icon}
                    </span>
                    <h4 className="text-base font-bold font-display" style={{ color: "#0F1923" }}>
                      {office.city}
                    </h4>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed" style={{ color: "#64748B" }}>
                    {office.address}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
                    <a
                      href={`tel:${office.phone.replace(/\s/g, "")}`}
                      className="text-sm font-semibold transition-colors hover:underline"
                      style={{ color: "#1C5297" }}
                    >
                      {office.phone}
                    </a>
                    <span className="text-xs" style={{ color: "#94A3B8" }}>{office.hours}</span>
                  </div>
                </div>
              ))}

              {/* Map-like CTA */}
              <div
                className="bento-card relative overflow-hidden p-6 text-center"
                style={{ background: "linear-gradient(135deg, #1C5297 0%, #0A1128 100%)" }}
              >
                <p className="text-2xl" aria-hidden="true">📍</p>
                <h4 className="mt-2 text-lg font-bold text-white font-display">Need Directions?</h4>
                <p className="mt-1 text-xs text-white/70">Find the nearest LocalServices AE office</p>
                <a
                  href="https://maps.google.com/?q=Dubai+Internet+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-xs font-bold transition-all hover:shadow-lg"
                  style={{ color: "#1C5297" }}
                  id="open-google-maps"
                >
                  Open in Google Maps →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ───── FAQ Section ───── */}
      <section className="section-ghost py-20 sm:py-24" aria-label="Frequently asked questions">
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
                onClick={(e) => {
                  e.preventDefault();
                  setOpenFaq(openFaq === i ? null : i);
                }}
              >
                <summary className="faq-summary">
                  <span>{faq.q}</span>
                  <svg className="faq-chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                {openFaq === i && (
                  <div className="faq-body animate-fade-in">{faq.a}</div>
                )}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Bottom CTA ───── */}
      <section className="section-brand relative overflow-hidden py-24" aria-label="Explore services">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white font-display">
            Explore Services Across UAE
          </h2>
          <p className="mt-3 text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
            Browse verified service providers in all 7 UAE emirates. Same-day booking available.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/services/dubai"
              className="btn-ripple inline-block rounded-full bg-white px-9 py-4 text-sm font-bold hover:shadow-xl transition-all"
              style={{ color: "#0062FF" }}
              id="explore-services-cta"
            >
              Browse Services →
            </Link>
            <Link
              href="/register"
              className="inline-block rounded-full border-2 border-white/35 px-9 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              id="become-provider-cta"
            >
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
