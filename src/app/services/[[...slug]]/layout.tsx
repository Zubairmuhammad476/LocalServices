import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import StickyMobileBar from "@/components/ui/StickyMobileBar";
import UrgencyBar from "@/components/ui/UrgencyBar";

/**
 * Global layout wrapper for all dynamically generated service hub and sub-service pages.
 * Mirrors the marketing layout: UrgencyBar + SiteNav at top, WhatsApp + StickyMobileBar globally.
 */
export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Urgency bar — pinned above everything including the nav */}
      <UrgencyBar />
      <SiteNav />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
      {/* Desktop floating WhatsApp + Mobile sticky bar (mutually exclusive via CSS) */}
      <WhatsAppWidget />
      <StickyMobileBar />
    </>
  );
}
