"use client";

import type { Metadata } from "next";
import { useState, type FormEvent } from "react";
import Link from "next/link";

const OFFICES = [
  {
    city: "Dubai (HQ)",
    address: "Dubai Internet City, Building 12\nSuite 204, Dubai 73000",
    phone: "+971 4 123 4567",
    hours: "Sun–Thu: 9am–6pm GST",
    icon: "🏙️",
  },
  {
    city: "Abu Dhabi",
    address: "Twofour54, Khalifa Park Area\nAbu Dhabi, UAE",
    phone: "+971 2 456 7890",
    hours: "Sun–Thu: 9am–6pm GST",
    icon: "🕌",
  },
  {
    city: "Sharjah",
    address: "Sharjah Media City (Shams)\nBuilding 7, Sharjah",
    phone: "+971 6 789 0123",
    hours: "Sun–Thu: 9am–5pm GST",
    icon: "🌆",
  },
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

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setFormState("sent");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Hero */}
      <section className="relative border-b border-blue-500/10 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-4 py-1.5 text-xs font-medium text-blue-300">
            💬 We reply within 2 hours (Sun–Thu)
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Whether you're a customer, provider, or partner — our team is here to help across all UAE emirates.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Sidebar info */}
          <aside className="space-y-6 lg:col-span-2">
            {/* Quick links */}
            <div className="glass-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400">Quick Contact</h2>
              <div className="mt-4 space-y-3">
                {[
                  { icon: "📧", label: "General Enquiries", value: "hello@localservices.ae" },
                  { icon: "🛒", label: "Bookings Support", value: "bookings@localservices.ae" },
                  { icon: "🤝", label: "Provider Partnerships", value: "partners@localservices.ae" },
                  { icon: "⚖️", label: "Legal & Privacy", value: "legal@localservices.ae" },
                  { icon: "📞", label: "Hotline (24/7)", value: "+971 800 LSV AE" },
                  { icon: "💬", label: "WhatsApp Support", value: "+971 50 999 8888" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="mt-0.5 text-lg">{item.icon}</span>
                    <div>
                      <p className="text-xs text-slate-500">{item.label}</p>
                      <p className="text-sm text-slate-200">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offices */}
            <div className="glass-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400">Our Offices</h2>
              <div className="mt-4 space-y-5">
                {OFFICES.map((office) => (
                  <div key={office.city} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span>{office.icon}</span>
                      <p className="text-sm font-semibold text-white">{office.city}</p>
                    </div>
                    <p className="mt-1 whitespace-pre-line text-xs text-slate-400">{office.address}</p>
                    <p className="mt-0.5 text-xs text-blue-400">{office.phone}</p>
                    <p className="text-xs text-slate-500">{office.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Contact form */}
          <main className="lg:col-span-3">
            {formState === "sent" ? (
              <div className="glass-card flex flex-col items-center p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl">✅</div>
                <h2 className="mt-4 text-2xl font-bold text-white">Message Sent!</h2>
                <p className="mt-2 text-slate-300">We&apos;ve received your message and will reply within 2 hours (Sun–Thu).</p>
                <button
                  onClick={() => { setFormState("idle"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-6 btn-primary px-6 py-2.5 text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                <div>
                  <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
                  <p className="mt-1 text-sm text-slate-400">All fields marked * are required.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ahmed Al Rashidi"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ahmed@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-300">Subject *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0d1530] px-4 py-3 text-sm text-white focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  <label className="mb-1.5 block text-xs font-medium text-slate-300">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="btn-primary w-full py-3.5 text-sm disabled:opacity-50"
                >
                  {formState === "sending" ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}

            {/* FAQ */}
            <div className="mt-8 glass-card p-8">
              <h2 className="mb-6 text-lg font-bold text-white">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {FAQ.map((faq) => (
                  <details key={faq.q} className="group rounded-xl border border-white/8 bg-white/[0.02] p-4">
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-white marker:hidden">
                      {faq.q}
                      <span className="ml-2 flex-shrink-0 text-blue-400 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
