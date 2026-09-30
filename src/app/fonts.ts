import { Inter, Italiana, Jura } from "next/font/google";

/* Display: Italiana for H1/H2, stat numerals, brand mark */
export const display = Italiana({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/* Labels: Jura for uppercase kickers, nav, buttons, small tracked text */
export const label = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-label",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/* Body: Inter for paragraphs, H3, FAQ, forms */
export const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const fontVariables = `${display.variable} ${label.variable} ${sans.variable}`;
