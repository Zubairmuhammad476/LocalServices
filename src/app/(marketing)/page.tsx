import type { Metadata } from "next";
import Link from "next/link";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import SearchBar from "@/components/ui/SearchBar";
import ServicePowerGrid from "@/components/ui/ServicePowerGrid";
import TrustRibbon from "@/components/ui/TrustRibbon";
import HowItWorksSteps from "@/components/ui/HowItWorksSteps";
import { getServices } from "@/lib/api";
import type { Service } from "@/types/service";

/* ─── SEO Metadata ──────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "LocalServices AE | UAE's #1 Home Services — Arriving in 60 Minutes",
  description:
    "Book verified home services across Dubai, Abu Dhabi & all UAE Emirates. AC repair, cleaning, plumbing — 3,619+ certified pros, instant booking in AED. DED licensed.",
  alternates: { canonical: "https://localservices.ae" },
  openGraph: {
    title: "LocalServices AE | UAE's Most Reliable Home Services",
    description: "3,619+ verified home services. Instant booking. All 7 UAE Emirates. DED Licensed professionals.",
    url: "https://localservices.ae",
    siteName: "LocalServices AE",
    type: "website",
  },
};

/* ─── Static Data ───────────────────────────────────────────────────── */
const FEATURED_SERVICES = [
  { name: "Home Cleaning",   slug: "home-cleaning",   icon: "🧹", price: "AED 150", bookings: "12,400+", altTag: "Professional cleaner sanitizing a residential apartment in Dubai marina, UAE" },
  { name: "AC Maintenance",  slug: "ac-maintenance",  icon: "❄️", price: "AED 120", bookings: "8,900+",  altTag: "Certified AC technician performing coil cleaning in a Dubai villa, UAE" },
  { name: "Plumbing",        slug: "plumbing",        icon: "🔧", price: "AED 100", bookings: "6,200+",  altTag: "Certified plumber repairing a kitchen pipe in Abu Dhabi villa, UAE" },
  { name: "Electrical",      slug: "electrical",      icon: "⚡", price: "AED 120", bookings: "5,400+",  altTag: "DEWA-approved electrician installing wiring in Sharjah apartment, UAE" },
  { name: "Maid Services",   slug: "maid-services",   icon: "🏠", price: "AED 180", bookings: "9,800+",  altTag: "Background-checked maid providing housekeeping in Dubai villa, UAE" },
  { name: "Pest Control",    slug: "pest-control",    icon: "🛡️", price: "AED 220", bookings: "4,200+",  altTag: "Municipality-approved pest control specialist treating Dubai apartment, UAE" },
  { name: "Handyman",        slug: "handyman",        icon: "🛠️", price: "AED 80",  bookings: "7,600+",  altTag: "Handyman assembling IKEA furniture in Dubai apartment, UAE" },
  { name: "Landscaping",     slug: "landscaping",     icon: "🌿", price: "AED 200", bookings: "3,100+",  altTag: "Landscaping specialist maintaining villa garden in Sharjah, UAE" },
];

const TESTIMONIALS = [
  {
    name: "Ahmed Al Rashidi", emirate: "Jumeirah 1, Dubai", service: "AC Maintenance", rating: 5,
    text: "AC Maintenance reduced my DEWA bill by 22% within one month. The certified technician performed coil cleaning and refrigerant top-up in 90 minutes. Arrived on time — no delays.",
    initials: "AR", color: "from-[#002366] to-blue-500",
  },
  {
    name: "Fatima Al Zarooni", emirate: "Al Reem Island, Abu Dhabi", service: "Deep Cleaning", rating: 5,
    text: "Deep Cleaning sanitized my 4-bedroom villa using HEPA-filter vacuums. The team eliminated visible allergens in 3 hours with zero disruption and left everything spotless.",
    initials: "FZ", color: "from-indigo-600 to-blue-400",
  },
  {
    name: "Ravi Sharma", emirate: "JVC, Dubai", service: "Plumbing", rating: 5,
    text: "Plumbing fixed a kitchen pipe leak the same afternoon. The certified plumber carried all replacement parts — no second visit needed. Priced exactly as quoted.",
    initials: "RS", color: "from-cyan-600 to-blue-500",
  },
  {
    name: "Layla Hassan", emirate: "Saadiyat Island, Abu Dhabi", service: "Pest Control", rating: 5,
    text: "Pest Control eliminated a cockroach infestation using municipality-approved chemicals. Zero recurrence in 60 days — well within the guaranteed period.",
    initials: "LH", color: "from-purple-600 to-blue-400",
  },
  {
    name: "Mohammed Al Qasimi", emirate: "Palm Jumeirah, Dubai", service: "Electrical", rating: 5,
    text: "Electrical installation was completed by a DEWA-approved engineer in 4 hours. All certification documents were provided on the same day. Highly recommended.",
    initials: "MQ", color: "from-amber-500 to-orange-500",
  },
  {
    name: "Priya Nair", emirate: "Al Nahda, Sharjah", service: "Maid Services", rating: 5,
    text: "Maid Services provides a background-checked professional every Tuesday. Booking confirmation occurs in under 2 minutes. My home has never been this clean.",
    initials: "PN", color: "from-green-600 to-teal-500",
  },
];

const FAQ_ITEMS = [
  {
    q: "How quickly can you arrive?",
    a: "We guarantee arrival within 60 minutes for emergency services across Dubai, Abu Dhabi, and Sharjah. Standard bookings can be scheduled same-day or the next morning at your preferred time slot.",
  },
  {
    q: "Are your technicians insured?",
    a: "Yes. Every professional on our platform is fully vetted, background-checked, and insured. We carry AED 10,000 accidental damage coverage per booking. Verified credentials are available in-app.",
  },
  {
    q: "Do I need to provide tools or materials?",
    a: "No — our professionals arrive fully equipped with all necessary tools, equipment, and standard consumables. For specialty materials (e.g. specific paint brands), we will advise you in advance.",
  },
  {
    q: "What if I'm not happy with the service?",
    a: "We offer a 7-day satisfaction guarantee. If you are not 100% satisfied, we will re-service at zero additional cost or issue a full refund. Your payment stays in escrow until you confirm completion.",
  },
  {
    q: "Do you cover my area?",
    a: "Yes! We operate across all 7 UAE Emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Coverage includes over 80 neighborhoods including JVC, Al Reem, Mirdif, Saadiyat, Palm Jumeirah, and more.",
  },
];

const SEO_SERVICES = [
  { label: "AC Repair Dubai",         href: "/services/dubai/ac-maintenance" },
  { label: "Cleaning Abu Dhabi",      href: "/services/abu-dhabi/home-cleaning" },
  { label: "Plumbing Dubai",          href: "/services/dubai/plumbing" },
  { label: "Handyman Sharjah",        href: "/services/sharjah/handyman" },
  { label: "Electrical Dubai",        href: "/services/dubai/electrical" },
  { label: "Maid Services Abu Dhabi", href: "/services/abu-dhabi/maid-services" },
  { label: "Pest Control Dubai",      href: "/services/dubai/pest-control" },
  { label: "Landscaping Sharjah",     href: "/services/sharjah/landscaping" },
];
const SEO_LOCATIONS = [
  { label: "Dubai Marina",      href: "/services/dubai" },
  { label: "Downtown Dubai",    href: "/services/dubai" },
  { label: "Palm Jumeirah",     href: "/services/dubai" },
  { label: "JVC Dubai",         href: "/services/dubai" },
  { label: "Al Reem Island",    href: "/services/abu-dhabi" },
  { label: "Saadiyat Island",   href: "/services/abu-dhabi" },
  { label: "Al Nahda Sharjah",  href: "/services/sharjah" },
  { label: "Ajman City",        href: "/services/ajman" },
];

/* ─── Page Component ────────────────────────────────────────────────── */
export default async function HomePage() {
  let dynamicServices: Service[] = [];
  try {
    const res = await getServices(1);
    dynamicServices = res.data.slice(0, 8);
  } catch {
    /* Falls back to static FEATURED_SERVICES */
  }

  return (
    <div className="overflow-x-hidden">

      {/* ══ S1: ACTION HERO ════════════════════════════════════════════ */}
      <section
        className="hero-section"
        aria-label="Book UAE's most reliable home services, arriving in 60 minutes"
      >
        {/* Background — Dubai villa / Abu Dhabi apartment feel */}
        <div className="hero-bg" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"
            alt="Luxury villa interior in Dubai UAE"
            className="hero-bg-img"
          />
          <div className="hero-bg-overlay" />
        </div>

        <div className="hero-content">
          {/* Live status pill */}
          <div className="animate-fade-in hero-status-pill">
            <span className="hero-status-dot" />
            <strong>LocalServices UAE</strong>&nbsp;is currently active
          </div>

          {/* H1 — conversion-focused */}
          <h1 className="animate-fade-up anim-delay-1 hero-h1">
            UAE's Most Reliable<br className="hidden sm:block" />
            Home Services—<span className="hero-h1-highlight">Arriving in 60 Minutes.</span>
          </h1>

          <p className="animate-fade-up anim-delay-2 hero-subtext">
            Book verified professionals for cleaning, maintenance, and repairs<br className="hidden sm:block" />
            across all 7 Emirates. DED Licensed. Background Checked. Insured.
          </p>

          {/* Floating search bar */}
          <div className="animate-fade-up anim-delay-3 hero-search-wrap">
            <SearchBar />
          </div>

          {/* Social proof micro-stats */}
          <div className="animate-fade-up anim-delay-4 hero-stats">
            {[
              { value: "3,619+", label: "Verified Services" },
              { value: "50,000+", label: "Happy Customers" },
              { value: "4.9/5", label: "Google Rating" },
            ].map((s) => (
              <div key={s.label} className="hero-stat">
                <p className="hero-stat-value">{s.value}</p>
                <p className="hero-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S2: IMMEDIATE TRUST RIBBON ═══════════════════════════════ */}
      <TrustRibbon />

      {/* ══ S3: SERVICE POWER GRID ════════════════════════════════════ */}
      <section
        className="power-grid-section"
        aria-label="Popular home services available across UAE"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="power-grid-header">
            <div>
              <p className="section-label mb-2">Most Booked</p>
              <h2 className="section-h2-dark text-fluid-h2">Our Top Home Services</h2>
              <p className="mt-3 text-[var(--text-muted)] text-base max-w-lg">
                Transparent pricing. Vetted professionals. Same-day availability across all Emirates.
              </p>
            </div>
            <Link href="/services/dubai" className="power-grid-view-all">
              View all 3,619 services →
            </Link>
          </div>

          <ServicePowerGrid services={FEATURED_SERVICES} />
        </div>
      </section>

      {/* ══ S4: HOW IT WORKS ══════════════════════════════════════════ */}
      <HowItWorksSteps />

      {/* ══ S5: WHY UAE HOMEOWNERS TRUST US ══════════════════════════ */}
      <section
        className="why-trust-section"
        aria-label="Why UAE homeowners trust LocalServices AE"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="why-trust-grid">

            {/* Left — image side */}
            <div className="why-trust-image-side">
              <div className="why-trust-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="LocalServices AE technician showing verified ID badge in Dubai UAE"
                  className="why-trust-img"
                  loading="lazy"
                />
                {/* Floating badge */}
                <div className="why-trust-float-badge">
                  <span className="text-2xl">🏛️</span>
                  <div>
                    <p className="text-xs font-bold text-white">DED Licensed</p>
                    <p className="text-[10px] text-blue-200">Dubai Economy & Tourism</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — content side */}
            <div className="why-trust-content">
              <p className="section-label mb-3">Why We're Different</p>
              <h2 className="section-h2-dark text-fluid-h2 mb-6">
                Why UAE Homeowners<br />Trust Us
              </h2>

              <ul className="why-trust-bullets" role="list">
                {[
                  { icon: "⏰", strong: "Punctuality:", text: "We respect your time — we arrive on the dot, every time." },
                  { icon: "🧹", strong: "Cleanliness:", text: "No mess left behind. We clean up after every job — guaranteed." },
                  { icon: "🎓", strong: "Expertise:", text: "DED Licensed & fully insured professionals. Trade licences verified." },
                  { icon: "🛡️", strong: "Insurance:", text: "AED 10,000 accidental damage cover on every single booking." },
                  { icon: "💰", strong: "Transparent Pricing:", text: "Fixed rates. No hidden fees. No surprises on your bill." },
                ].map((item) => (
                  <li key={item.strong} className="why-trust-bullet">
                    <span className="why-trust-bullet-icon">{item.icon}</span>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                      <strong className="text-[var(--text-dark)]">{item.strong}</strong> {item.text}
                    </p>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/97143000000?text=Hi%2C%20I%20have%20a%20question%20about%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-expert-cta"
                className="btn-whatsapp-expert"
                aria-label="Chat with a LocalServices AE expert on WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.549 4.099 1.51 5.831L.057 23.633a.75.75 0 00.916.916l5.802-1.453A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-1.99 0-3.855-.538-5.46-1.48l-.389-.233-4.035 1.009 1.009-4.035-.234-.39A10.444 10.444 0 011.5 12C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z"/>
                </svg>
                Chat with an Expert on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ S6: LIVE IMPACT COUNTER ═══════════════════════════════════ */}
      <section className="stats-section" aria-label="LocalServices AE platform statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label">Live Impact</p>
          <h2 className="section-h2-dark mt-3 text-fluid-h2">Numbers That Build Trust</h2>
          <div className="stats-grid">
            {[
              { target: 50000, suffix: "+", label: "Happy Residents", icon: "😊", desc: "Verified bookings completed" },
              { target: 2400,  suffix: "+", label: "Verified Providers", icon: "✅", desc: "Background-checked professionals" },
              { target: 0,     suffix: "",  label: "Google Rating", icon: "⭐", desc: "Based on 50,000+ reviews", isRating: true },
              { target: 100,   suffix: "%", label: "Secure AED Payments", icon: "🔒", desc: "Stripe UAE-compliant gateway" },
            ].map((stat) => (
              <div key={stat.label} className="stat-block">
                <span className="stat-block-icon">{stat.icon}</span>
                <p className="stat-block-value">
                  {stat.isRating ? "4.9★" : (
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={2000} />
                  )}
                </p>
                <p className="stat-block-label">{stat.label}</p>
                <p className="stat-block-desc">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ S7: TESTIMONIALS ══════════════════════════════════════════ */}
      <section className="testimonials-section" aria-label="Customer testimonials for LocalServices AE">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Social Proof</p>
            <h2 className="section-h2-dark mt-3 text-fluid-h2">What UAE Residents Say</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              Real reviews from your neighbors — across Dubai, Abu Dhabi, Sharjah and beyond.
            </p>
          </div>
          <TestimonialCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* ══ S8: FAQ OBJECTION KILLER ══════════════════════════════════ */}
      <section
        className="faq-section"
        aria-label="Frequently asked questions about LocalServices AE"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Got Questions?</p>
            <h2 className="section-h2-dark text-fluid-h2">The Objection Killers</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm font-medium leading-relaxed text-[var(--text-muted)]">
              Everything you need to know before booking your first service.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <details key={faq.q} className="faq-accordion-item group">
                <summary className="faq-accordion-summary">
                  <div className="flex items-center gap-4">
                    <span className="faq-accordion-num">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="faq-accordion-q">{faq.q}</span>
                  </div>
                  <span className="faq-accordion-chevron group-open:rotate-180" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="faq-accordion-body">{faq.a}</div>
              </details>
            ))}
          </div>

          {/* Lead hook */}
          <div className="faq-lead-hook">
            <p className="text-sm text-[var(--text-muted)]">
              Still have questions?{" "}
              <a
                href="https://wa.me/97143000000"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-whatsapp-link"
                aria-label="Chat with LocalServices AE on WhatsApp"
              >
                WhatsApp Us Now →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══ S9: FINAL HOOK CTA ════════════════════════════════════════ */}
      <section
        className="final-cta-section"
        aria-label="Book your home service today"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.15)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="final-cta-pill">
            ⚡ Zero Booking Fee for First Service
          </span>
          <h2 className="final-cta-headline">
            Ready to get your home back in shape?
          </h2>
          <p className="final-cta-sub">
            Join <strong>20,000+ happy customers</strong> across the UAE. Verified pros arrive in 60 minutes. DED Licensed. Fully Insured.
          </p>
          <div className="final-cta-buttons">
            <Link
              href="/register"
              id="final-cta-book"
              className="btn-orange-xl btn-ripple-orange"
              aria-label="Book a home service in 2 clicks"
            >
              Book Your Service in 2 Clicks
            </Link>
            <Link
              href="/services/dubai"
              className="btn-ghost-white"
              aria-label="Browse all services available in UAE"
            >
              Browse All Services
            </Link>
          </div>
          <p className="final-cta-guarantee">
            🔒 No credit card required · AED payments only · 7-day satisfaction guarantee
          </p>
        </div>
      </section>

      {/* ══ S10: SEO FOOTER LINK MATRIX ══════════════════════════════ */}
      <section
        className="seo-matrix-section"
        aria-label="Browse services by location across UAE"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="seo-matrix-grid">
            <div>
              <h3 className="seo-matrix-col-title">Popular Services</h3>
              <ul className="seo-matrix-list" role="list">
                {SEO_SERVICES.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} className="seo-matrix-link">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="seo-matrix-col-title">Service Locations</h3>
              <ul className="seo-matrix-list" role="list">
                {SEO_LOCATIONS.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="seo-matrix-link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="seo-matrix-col-title">All 7 Emirates</h3>
              <ul className="seo-matrix-list" role="list">
                {[
                  { label: "Dubai Services",          href: "/services/dubai" },
                  { label: "Abu Dhabi Services",       href: "/services/abu-dhabi" },
                  { label: "Sharjah Services",         href: "/services/sharjah" },
                  { label: "Ajman Services",           href: "/services/ajman" },
                  { label: "Ras Al Khaimah Services",  href: "/services/ras-al-khaimah" },
                  { label: "Fujairah Services",        href: "/services/fujairah" },
                  { label: "Umm Al Quwain Services",   href: "/services/umm-al-quwain" },
                ].map((e) => (
                  <li key={e.label}>
                    <Link href={e.href} className="seo-matrix-link">{e.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
