import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimisation ───────────────────────────────────────────────────
  images: {
    // AVIF first (40% smaller than WebP), WebP fallback
    formats: ["image/avif", "image/webp"],
    // Sharp is installed — enables on-the-fly optimisation
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    // Responsive breakpoints for srcset
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Minimum TTL for cached images (1 week)
    minimumCacheTTL: 604800,
  },

  // ─── Compiler optimisations ───────────────────────────────────────────────
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  // ─── Experimental perf flags ──────────────────────────────────────────────
  experimental: {
    // Optimise CSS — reduces render-blocking stylesheet size
    optimizeCss: true,
    // Pre-render scroll-above-fold content
    scrollRestoration: true,
  },

  // ─── HTTP caching headers ─────────────────────────────────────────────────
  async headers() {
    return [
      // Long-lived cache for all static assets (images, fonts, JS, CSS)
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security + performance headers for all routes
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security",  value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Frame-Options",            value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          // X-DNS-Prefetch-Control — allow browser to pre-resolve DNS
          { key: "X-DNS-Prefetch-Control",     value: "on" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https://ik.imagekit.io https://images.pexels.com",
              "connect-src 'self' http://localhost:8000 http://127.0.0.1:8000 https://darkviolet-pony-419059.hostingersite.com https://ik.imagekit.io https://upload.imagekit.io",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ─── Env vars exposed to browser ──────────────────────────────────────────
  env: {
    NEXT_PUBLIC_API_URL:      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    NEXT_PUBLIC_SITE_NAME:    "LocalServices AE",
    NEXT_PUBLIC_SITE_URL:     process.env.NEXT_PUBLIC_SITE_URL ?? "https://localservices.ae",
    NEXT_PUBLIC_IMAGEKIT_URL: process.env.NEXT_PUBLIC_IMAGEKIT_URL ?? "",
  },
};

export default nextConfig;
