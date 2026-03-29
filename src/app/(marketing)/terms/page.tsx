import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — LocalServices AE",
  description:
    "Read the LocalServices AE Terms of Service. Understand your rights and responsibilities as a customer or service provider on our UAE marketplace.",
};

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content:
      `By accessing or using the LocalServices AE platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Platform. These Terms govern all use of our website, mobile applications, and services.

These Terms are governed by the laws of the Dubai International Financial Centre (DIFC), United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the DIFC Courts.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    content:
      `You must be at least 18 years old to use the Platform. By creating an account, you represent and warrant that you are of legal age, you have the legal capacity to enter into a binding contract, and you are a UAE resident or have legal authorization to transact in the UAE.

Corporate customers must be legally registered entities in the UAE. You are responsible for ensuring your use complies with all applicable UAE laws.`,
  },
  {
    id: "accounts",
    title: "3. Accounts & Registration",
    content:
      `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must:
      
• Provide accurate, current, and complete information during registration
• Keep your account information updated at all times
• Notify us immediately of any unauthorized use of your account
• Not share your credentials with any third party

We reserve the right to suspend or terminate accounts that violate these obligations without notice.`,
  },
  {
    id: "bookings",
    title: "4. Booking & Services",
    content:
      `When you make a booking through our Platform:

• You are entering a service contract with the Provider, not with LocalServices AE
• LocalServices AE acts as an intermediary marketplace platform
• Prices displayed are in UAE Dirhams (AED) inclusive of applicable VAT
• Bookings are confirmed upon receipt of our confirmation message
• The Provider is responsible for delivering the agreed service to the specified standard

Cancellations made 24+ hours before the scheduled service are fully refundable. Cancellations within 24 hours may incur a cancellation fee of up to 25% of the service value.`,
  },
  {
    id: "payments",
    title: "5. Payments & Refunds",
    content:
      `All payments are processed in AED through our secure payment partners. By providing payment information, you authorize us to charge the agreed amount.

Refund Policy:
• Full refund: Service not delivered or significantly different from description
• Partial refund: Service partially delivered, assessed case-by-case
• No refund: Service completed satisfactorily per booking terms

Disputed charges must be reported within 14 days of the service date. We will investigate and respond within 5 business days.`,
  },
  {
    id: "providers",
    title: "6. Service Providers",
    content:
      `Service Providers on our Platform are independent contractors, not employees of LocalServices AE. While we verify credentials and conduct background checks, we do not supervise or control the manner in which services are delivered.

Providers must:
• Hold all required UAE trade licences and permits
• Maintain valid public liability insurance
• Comply with UAE labour laws and health & safety standards
• Honour all confirmed bookings

LocalServices AE reserves the right to remove any Provider who violates our standards.`,
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content:
      `To the maximum extent permitted by UAE law, LocalServices AE shall not be liable for:

• Any indirect, incidental, or consequential damages arising from platform use
• Property damage caused by a Provider during service delivery
• Service quality disputes between customers and providers
• Loss of data, revenue, or business arising from platform downtime

Our total liability for direct damages shall not exceed the amount you paid for the specific service giving rise to the claim. Nothing in these Terms limits liability for death or personal injury caused by our negligence.`,
  },
  {
    id: "intellectual-property",
    title: "8. Intellectual Property",
    content:
      `All content on the Platform — including the brand name, logo, software, design, text, and images — is owned by LocalServices AE or its licensors and protected by UAE copyright and trademark laws.

You may not reproduce, distribute, or create derivative works from any Platform content without written permission. User-generated content (reviews, photos) remains your property, but you grant us a worldwide, royalty-free licence to display it on the Platform.`,
  },
  {
    id: "changes",
    title: "9. Changes to Terms",
    content:
      `We may update these Terms from time to time. Material changes will be communicated via email and a prominent notice on the Platform at least 14 days before taking effect. Continued use of the Platform after that date constitutes acceptance of the updated Terms.`,
  },
  {
    id: "contact-terms",
    title: "10. Contact",
    content:
      `For any questions about these Terms, please contact our Legal Team at legal@localservices.ae or write to: LocalServices AE, Dubai Internet City, Building 12, Suite 204, Dubai, UAE. Registered Trade Licence No: DED-2023-XXXX.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Hero */}
      <section className="relative border-b border-blue-500/10 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-4 py-1.5 text-xs font-medium text-blue-300">
            ⚖️ Governed by DIFC Law, Dubai UAE
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Please read these terms carefully before using the LocalServices AE platform. Last updated: 1 March 2026.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 glass-card p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">Contents</h3>
              <nav className="space-y-1">
                {TERMS_SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block rounded-lg px-3 py-2 text-xs text-slate-400 transition-all hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-6">
            {/* Quick summary */}
            <div className="glass-card border-amber-400/20 bg-amber-900/10 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-300">
                <span>⚠️</span> Plain-English Summary
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                LocalServices AE connects you with independent service providers. We verify providers but act as a marketplace, not the service company. You're protected by our satisfaction guarantee and UAE consumer law. Payments are secure in AED. Disputes are handled in DIFC Courts.
              </p>
            </div>

            {TERMS_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="glass-card p-8">
                <h2 className="mb-4 text-xl font-bold text-white">{section.title}</h2>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">{section.content}</p>
              </section>
            ))}

            <div className="glass-card border-blue-500/30 p-6 text-center">
              <p className="text-sm text-slate-400">
                By using LocalServices AE, you acknowledge that you have read, understood, and agree to these Terms.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link href="/register" className="btn-primary px-6 py-2.5 text-sm">Create Account →</Link>
                <Link href="/contact" className="rounded-full border border-blue-500/30 px-6 py-2.5 text-sm text-blue-300 hover:border-blue-400/50">Questions? Contact Us</Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
