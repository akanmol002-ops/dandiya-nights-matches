import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        velvet: {
          DEFAULT: "#12032B",
          50: "#321666",
          100: "#2a1059",
          200: "#230b4d",
          800: "#18053a",
          900: "#12032B",
          950: "#0b011c",
        },
        magenta: {
          neon: "#FF007F",
          glow: "rgba(255, 0, 127, 0.4)",
          deep: "#D00067",
        },
        gold: {
          radiant: "#FFD700",
          glow: "rgba(255, 215, 0, 0.4)",
          amber: "#FFB703",
          light: "#FFF176",
        },
        cyber: {
          turquoise: "#00F5D4",
          glow: "rgba(0, 245, 212, 0.4)",
          teal: "#01BAEF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(255, 0, 127, 0.4)" },
          "33%": { borderColor: "rgba(255, 215, 0, 0.5)" },
          "66%": { borderColor: "rgba(0, 245, 212, 0.4)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "festive-mesh": "radial-gradient(circle at 20% 20%, rgba(255, 0, 127, 0.25) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(0, 245, 212, 0.2) 0%, transparent 40%), radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 45%)",
      },
      boxShadow: {
        "neon-magenta": "0 0 25px rgba(255, 0, 127, 0.45)",
        "neon-gold": "0 0 25px rgba(255, 215, 0, 0.45)",
        "neon-cyber": "0 0 25px rgba(0, 245, 212, 0.45)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "inner-glow": "inset 0 0 20px rgba(255, 215, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
