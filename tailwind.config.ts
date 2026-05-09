import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: {
          50: "#f6f7fb",
          100: "#eef1f8",
          200: "#d8deee",
          300: "#b3bfdc",
          400: "#8496c5",
          500: "#5d72ad",
          600: "#465a90",
          700: "#394873",
          800: "#2e3958",
          900: "#232b41",
          950: "#161c2b"
        }
      },
      boxShadow: {
        cloud: "0 24px 80px rgba(22,28,43,0.18)",
        glow: "0 0 0 1px rgba(255,255,255,0.55), 0 30px 120px rgba(46,57,88,0.28)"
      },
      backgroundImage: {
        sky: "radial-gradient(1200px 700px at 70% 20%, rgba(255,255,255,0.85), rgba(255,255,255,0) 60%), radial-gradient(900px 600px at 10% 0%, rgba(161,214,255,0.55), rgba(161,214,255,0) 60%), linear-gradient(180deg, #f7fbff 0%, #eef5ff 45%, #ffffff 100%)",
        dusk: "radial-gradient(900px 600px at 80% 30%, rgba(255,214,153,0.55), rgba(255,214,153,0) 55%), radial-gradient(900px 600px at 20% 10%, rgba(201,176,255,0.35), rgba(201,176,255,0) 55%), linear-gradient(180deg, #ffffff 0%, #fff6ef 38%, #ffffff 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;
