import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import Script from "next/script";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminHide from "@/components/AdminHide";
import {
    SITE,
    siteUrl,
    defaultOpenGraph,
    defaultTwitter,
    defaultKeywords,
    canonicalOf,
} from "@/app/lib/seo";
import { AllJsonLd } from "@/app/lib/jsonld";
import CookieConsent from "@/components/CookieConsent";
import GtmLoader from "@/components/GtmLoader";
import { getGlobalData } from "@/app/lib/tina";

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

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const global = await getGlobalData();

  return (
        <html lang="en" className={fontVariables} suppressHydrationWarning>
              <head>
                      <meta name="p:domain_verify" content="51a3c5f2b6fbc6b9d8a43099faf933e4"/>
                      <AllJsonLd />
                {/* Google Consent Mode v2: everything denied until the visitor chooses. Runs before any Google tag. */}
                      <Script id="consent-default" strategy="beforeInteractive">
                        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
(function(){var m=document.cookie.match(/(?:^|; )vl_consent=([^;]*)/);var c=m?decodeURIComponent(m[1]):null;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:c==='all'?'granted':'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});})();`}
                      </Script>
                {/* Google Tag Manager is loaded by <GtmLoader /> only after the visitor accepts analytics and marketing cookies */}
                      <Script
                                  src="https://www.googletagmanager.com/gtag/js?id=G-EM5FB4QF8R"
                                  strategy="afterInteractive"
                                />
                      <Script id="google-analytics" strategy="afterInteractive">
                        {`
                                    window.dataLayer = window.dataLayer || [];
                                                function gtag(){dataLayer.push(arguments);}
                                                            gtag('js', new Date());
                                                                        gtag('config', 'G-EM5FB4QF8R');
                                                                                  `}
                      </Script>
              </head>
              <body suppressHydrationWarning>

                      <Header data={global?.header || undefined} />
                      <main id="site-main">{children}</main>
                      <CookieConsent />
                      <GtmLoader />
                      <AdminHide>
                                <Footer
                                              data={global?.footer || undefined}
                                              headerData={global?.header || undefined}
                                            />
                      </AdminHide>
              </body>
        </html>
      );
}
