import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  SITE,
  siteUrl,
  defaultOpenGraph,
  defaultTwitter,
  defaultKeywords,
  canonicalOf,
} from "@/app/lib/seo";
import { AllJsonLd } from "@/app/lib/jsonld";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: defaultKeywords,
  authors: [{ name: SITE.creator }],
  creator: SITE.creator,
  publisher: SITE.creator,

  // Canonical & alternate
  metadataBase: new URL(siteUrl()),
  alternates: {
    canonical: canonicalOf("/"),
    languages: {
      "en-US": "/",
      "el-GR": "/el",
    },
  },

  // Open Graph
  openGraph: {
    ...defaultOpenGraph,
    type: "website",
  },

  // Twitter
  twitter: defaultTwitter,

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/img/logo.webp",
    shortcut: "/img/logo.webp",
    apple: "/img/logo.webp",
  },

  // Verification (add your codes when available)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },

  // Other
  category: "travel",
  classification: "Vacation Rental",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <AllJsonLd />
      </head>
      <body suppressHydrationWarning>
        <Header />
        <main id="site-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
