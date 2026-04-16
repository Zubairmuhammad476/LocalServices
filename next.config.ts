import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── ISR Default ──────────────────────────────────────────────────────────
  // All dynamic service pages revalidate every 60 seconds (ISR)

  // ─── Image Optimisation (AVIF first, WebP fallback) ──────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ─── Security Headers ─────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
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
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    NEXT_PUBLIC_SITE_NAME: "LocalServices AE",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://localservices.ae",
    NEXT_PUBLIC_IMAGEKIT_URL: process.env.NEXT_PUBLIC_IMAGEKIT_URL ?? "",
  },
};

export default nextConfig;
