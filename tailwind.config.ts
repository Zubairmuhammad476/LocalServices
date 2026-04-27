import type { Config } from "tailwindcss";

/**
 * Fluid Typography Scale using CSS clamp()
 * Scales linearly from 320px (mobile) → 3840px (4K) without any static breakpoints.
 *
 * Formula: clamp(min, preferred_vw + offset, max)
 * The preferred value uses viewport width to scale linearly between min and max.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Fluid Font Sizes (CSS clamp — 320px to 3840px) ──────────────────
      fontSize: {
        // Headings
        "fluid-h1": ["clamp(2rem, 4vw + 0.75rem, 6rem)", { lineHeight: "1.1", fontWeight: "800" }],
        "fluid-h2": ["clamp(1.5rem, 3vw + 0.5rem, 4.5rem)", { lineHeight: "1.2", fontWeight: "700" }],
        "fluid-h3": ["clamp(1.25rem, 2.5vw + 0.35rem, 3.5rem)", { lineHeight: "1.25", fontWeight: "600" }],
        "fluid-h4": ["clamp(1.1rem, 2vw + 0.25rem, 2.5rem)", { lineHeight: "1.3", fontWeight: "600" }],
        "fluid-h5": ["clamp(1rem, 1.5vw + 0.2rem, 2rem)", { lineHeight: "1.35", fontWeight: "500" }],
        "fluid-h6": ["clamp(0.95rem, 1.25vw + 0.15rem, 1.75rem)", { lineHeight: "1.4", fontWeight: "500" }],
        // Body
        "fluid-body-lg": ["clamp(1rem, 1vw + 0.5rem, 1.375rem)", { lineHeight: "1.75" }],
        "fluid-body":    ["clamp(0.9rem, 0.75vw + 0.45rem, 1.25rem)", { lineHeight: "1.7" }],
        "fluid-body-sm": ["clamp(0.8rem, 0.6vw + 0.4rem, 1.125rem)", { lineHeight: "1.65" }],
        // UI
        "fluid-label":   ["clamp(0.75rem, 0.5vw + 0.375rem, 1rem)", { lineHeight: "1.5" }],
        "fluid-caption": ["clamp(0.7rem, 0.4vw + 0.35rem, 0.9rem)", { lineHeight: "1.5" }],
      },

      // ─── Color System ──────────────────────────────────────────────────────
      colors: {
        brand: {
          50:  "hsl(215, 100%, 97%)",
          100: "hsl(215, 100%, 93%)",
          200: "hsl(215, 95%, 85%)",
          300: "hsl(215, 90%, 72%)",
          400: "hsl(215, 85%, 60%)",
          500: "hsl(215, 80%, 50%)",
          600: "hsl(215, 82%, 40%)",
          700: "hsl(215, 85%, 32%)",
          800: "hsl(215, 88%, 22%)",
          900: "hsl(215, 90%, 14%)",
          950: "hsl(215, 95%, 8%)",
        },
        gold: {
          400: "hsl(43, 90%, 65%)",
          500: "hsl(43, 85%, 55%)",
          600: "hsl(43, 82%, 45%)",
        },
        surface: {
          DEFAULT: "hsl(220, 15%, 7%)",
          subtle:  "hsl(220, 12%, 10%)",
          raised:  "hsl(220, 10%, 13%)",
          overlay: "hsl(220, 8%, 17%)",
        },
      },

      // ─── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        "4xs": "0.125rem",
        "3xs": "0.25rem",
        "2xs": "0.375rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        "3xl": "4rem",
        "4xl": "6rem",
        "5xl": "8rem",
      },

      // ─── Font Family ───────────────────────────────────────────────────────
      fontFamily: {
        sans:    ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
        display: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
        mono:    ["'JetBrains Mono'", "'Courier New'", "monospace"],
      },

      // ─── Border Radius ─────────────────────────────────────────────────────
      borderRadius: {
        sm: "0.375rem",
        md: "0.625rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
        pill: "9999px",
      },

      // ─── Box Shadow (glassmorphism) ────────────────────────────────────────
      boxShadow: {
        glass: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-lg": "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        glow: "0 0 24px rgba(59,130,246,0.4)",
      },

      // ─── Keyframes ─────────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
