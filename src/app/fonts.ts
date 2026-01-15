import { DM_Sans, DM_Serif_Display } from "next/font/google";

/* Body font - geometric sans-serif */
export const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/* Display font - refined serif for headings */
export const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

export const fontVariables = `${sans.variable} ${serif.variable}`;
