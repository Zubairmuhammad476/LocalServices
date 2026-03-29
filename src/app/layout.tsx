import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LocalServices AE — Book Home & Professional Services in UAE",
    template: "%s | LocalServices AE",
  },
  description:
    "Book trusted home services across Dubai, Abu Dhabi, Sharjah and all UAE emirates. 3,600+ verified professionals, instant booking, AED payments.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://localservices.ae"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface antialiased">
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
