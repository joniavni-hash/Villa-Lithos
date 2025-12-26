// FILE: src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Splash from "@/components/Splash";
export const metadata: Metadata = {
  title: "Villa Lithos",
  description:
    "Villa Lithos — a private retreat in Greece, designed for serene stays, curated comfort, and effortless luxury.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* ✅ Nav ΠΑΝΩ από main (και menu overlay είναι μέσα στο Nav) */}
        <Nav />

        {/* ✅ main wrapper για να μπορείς να “παγώνεις” το site όταν ανοίγει menu */}
        <main id="site-main">{children}</main>

        {/* ✅ footer εκτός main για να μην επηρεάζεται από rules τύπου main visibility */}
        <Footer />
      </body>
    </html>
  );
}
