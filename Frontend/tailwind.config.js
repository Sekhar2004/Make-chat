/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#4d4e56",
        foreground: "hsl(var(--foreground))",
        maintext: {
          DEFAULT: "var(--maintext, #000)",
          foreground: "hsl(var(--maintext-foreground))",
        },
        graybg: {
          DEFAULT: "var(--graybg, #b0b1b2)",
          foreground: "hsl(var(--graybg-foreground))",
        },
        hover: {
          DEFAULT: "var(--hover, #e0e4e5)",
          foreground: "hsl(var(--hover-foreground))",
        },
        textsecondary: {
          DEFAULT: "var(--textsecondary, #d1d5db)",
          foreground: "hsl(var(--textsecondary-foreground))",
        },
        primary: {
          DEFAULT: "var(--primary, #fcfdff)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary, #c4c5c6)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#e31748",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#2f80ed",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}