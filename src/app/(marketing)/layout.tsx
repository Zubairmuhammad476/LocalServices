import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import StickyMobileBar from "@/components/ui/StickyMobileBar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
