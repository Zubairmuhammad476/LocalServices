import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

/* ── Self-hosted via next/font — zero layout shift, no render-blocking ── */
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: true,
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  // Only load weights actually used in admin/portal layouts
  weight: ["600", "700", "800"],
  preload: false, // defer — only used in admin/portal, not the public homepage
});

export const metadata: Metadata = {
  title: {
    default: "LocalServices AE — Book Home & Professional Services in UAE",
    template: "%s | LocalServices AE",
  },
  description:
    "Book trusted home services across Dubai, Abu Dhabi, Sharjah and all UAE emirates. 3,600+ verified professionals, instant booking, AED payments.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://localservices.ae"),
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#002366",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${plusJakarta.variable} h-full`}
    >
      <head>
        {/* Preconnect — eliminates DNS lookup latency for font CDN */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
