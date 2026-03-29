import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — LocalServices AE",
  description:
    "Read LocalServices AE's privacy policy. We are committed to protecting your personal data and complying with UAE data protection laws.",
};

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Information You Provide",
        text: "When you register, book a service, or contact us, we may collect your full name, email address, mobile number, home or business address, payment information (processed securely via our payment partners), and any communications you send us.",
      },
      {
        subtitle: "1.2 Information Collected Automatically",
        text: "We automatically collect certain technical data when you use our platform: device information (browser type, operating system), IP address, pages visited and time spent, referring URLs, and crash and performance reports.",
      },
      {
        subtitle: "1.3 Information from Third Parties",
        text: "If you sign in via a third-party account (Google, Apple), we receive limited profile information as authorised by you. Payment processors may share transaction confirmation data with us.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "2.1 To Deliver Our Services",
        text: "We use your information to process bookings, match you with verified service providers, process payments, and send booking confirmations and service updates.",
      },
      {
        subtitle: "2.2 Platform Improvement",
        text: "We analyse usage patterns to improve our service, personalise your experience, develop new features, and conduct internal research and analytics.",
      },
      {
        subtitle: "2.3 Communications",
        text: "We may send you service-related notifications via SMS and email. With your consent, we may also send promotional offers. You can opt out of marketing communications at any time.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing",
    content: [
      {
        subtitle: "3.1 With Service Providers",
        text: "When you make a booking, we share your name, contact details, and service address with the assigned provider. Providers are contractually required to keep your data confidential.",
      },
      {
        subtitle: "3.2 With Trusted Partners",
        text: "We share data with payment processors, cloud hosting providers, and analytics partners strictly to deliver our services. These partners cannot use your data for their own purposes.",
      },
      {
        subtitle: "3.3 Legal Requirements",
        text: "We may disclose information to UAE authorities or courts if required by law, court order, or to protect rights, safety, or property.",
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      {
        subtitle: "4.1 Technical Measures",
        text: "We use AES-256 encryption for stored data, TLS 1.3 for data in transit, OAuth 2.0 + Sanctum token authentication, and regular security audits conducted by third-party specialists.",
      },
      {
        subtitle: "4.2 Organisational Measures",
        text: "Access to personal data is strictly limited to employees who need it to perform their duties. All staff undergo data protection training annually.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      {
        subtitle: "5.1 Access & Portability",
        text: "You have the right to request a copy of all personal data we hold about you, in a structured, machine-readable format.",
      },
      {
        subtitle: "5.2 Correction & Deletion",
        text: "You may update your profile data at any time. You can also request deletion of your account and associated data, subject to legal retention requirements.",
      },
      {
        subtitle: "5.3 Consent Withdrawal",
        text: "Where processing is based on your consent (e.g., marketing emails), you can withdraw that consent at any time without affecting the lawfulness of prior processing.",
      },
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies",
    content: [
      {
        subtitle: "6.1 Types of Cookies",
        text: "We use strictly necessary cookies (required for platform function), performance cookies (analytics — with your consent), and functional cookies (preferences and personalisation).",
      },
      {
        subtitle: "6.2 Cookie Control",
        text: "You can manage cookies via your browser settings. Disabling certain cookies may affect platform functionality. We do not use third-party advertising cookies.",
      },
    ],
  },
  {
    id: "retention",
    title: "7. Data Retention",
    content: [
      {
        subtitle: "7.1 Retention Periods",
        text: "Account data is retained for as long as your account is active plus 2 years. Booking records are retained for 7 years for UAE tax compliance. Anonymised analytics data may be retained indefinitely.",
      },
    ],
  },
  {
    id: "contact",
    title: "8. Contact & DPO",
    content: [
      {
        subtitle: "8.1 Data Protection Officer",
        text: "For privacy queries or to exercise your rights, contact our Data Protection Officer at privacy@localservices.ae or write to: LocalServices AE, Dubai Internet City, Building 12, Suite 204, Dubai, UAE.",
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Hero */}
      <section className="relative border-b border-blue-500/10 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.12)_0%,transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-4 py-1.5 text-xs font-medium text-blue-300">
            🔒 Last Updated: 1 March 2026
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            We take your privacy seriously. This policy explains how LocalServices AE collects, uses, and protects your personal data in compliance with UAE data protection laws.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* TOC Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 glass-card p-5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-blue-400">Contents</h3>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
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

          {/* Main content */}
          <main className="lg:col-span-3 space-y-10">
            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="glass-card p-8">
                <h2 className="mb-6 text-xl font-bold text-white">{section.title}</h2>
                <div className="space-y-5">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="mb-1.5 text-sm font-semibold text-blue-300">{item.subtitle}</h3>
                      <p className="text-sm leading-relaxed text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Contact CTA */}
            <div className="glass-card border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-[#0d2050]/50 p-8 text-center">
              <h3 className="text-lg font-semibold text-white">Questions About Your Privacy?</h3>
              <p className="mt-2 text-sm text-slate-300">Our Data Protection Officer is here to help.</p>
              <Link href="/contact" className="mt-5 inline-block btn-primary px-6 py-2.5 text-sm">
                Contact DPO →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
