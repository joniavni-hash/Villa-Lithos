import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
        async rewrites() {
                  return [
                    { source: '/planner', destination: '/planner/index.html' },
                    { source: '/checkin', destination: '/checkin/index.html' },
                  ];
        },
    async redirects() {
          return [
            {
                      source: '/articles/porto-rafti-family-holiday',
                      destination: '/articles/porto-rafti-family-holiday-greece',
                      permanent: true,
            },
            {
                      source: '/articles/best-things-to-do-near-athens-with-kids',
                      destination: '/articles/things-to-do-near-athens-with-kids',
                      permanent: true,
            },
            {
                      source: '/articles/private-villa-rental-athens-large-groups',
                      destination: '/articles',
                      permanent: true,
            },
            {
                      source: '/contact',
                      destination: '/#inquiry',
                      permanent: true,
            },
            {
                      source: '/gallery',
                      destination: '/#gallery',
                      permanent: true,
            },
            {
                      source: '/about',
                      destination: '/#estate',
                      permanent: true,
            },
            {
                      source: '/estate',
                      destination: '/#estate',
                      permanent: true,
            },
            {
                      source: '/our-story',
                      destination: '/#estate',
                      permanent: true,
            },
            {
                      source: '/amenities',
                      destination: '/#about',
                      permanent: true,
            },
            {
                      source: '/facilities',
                      destination: '/#about',
                      permanent: true,
            },
            {
                      source: '/pricing',
                      destination: '/#inquiry',
                      permanent: true,
            },
            {
                      source: '/prices',
                      destination: '/#inquiry',
                      permanent: true,
            },
            {
                      source: '/rates',
                      destination: '/#inquiry',
                      permanent: true,
            },
            {
                      source: '/availability',
                      destination: '/#inquiry',
                      permanent: true,
            },
            {
                      source: '/book',
                      destination: 'https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72',
                      permanent: false,
            },
            {
                      source: '/book-now',
                      destination: 'https://goldenberg-luxe.guestybookings.com/en/properties/69020736fb5e7a0014894f72',
                      permanent: false,
            },
            {
                      source: '/experiences',
                      destination: '/articles',
                      permanent: true,
            },
            {
                      source: '/blog',
                      destination: '/articles',
                      permanent: true,
            },
            {
                      source: '/guides',
                      destination: '/articles',
                      permanent: true,
            },
            {
                      source: '/retreats',
                      destination: '/corporate-retreats',
                      permanent: true,
            },
            { source: '/privacy-policy', destination: '/privacy', permanent: true },
            { source: '/cookies', destination: '/privacy#cookies', permanent: true },
            { source: '/cookie-policy', destination: '/privacy#cookies', permanent: true },
            { source: '/terms-of-use', destination: '/terms', permanent: true },
            { source: '/terms-and-conditions', destination: '/terms', permanent: true },
            {
                      source: '/location',
                      destination: '/#location',
                      permanent: true,
            },
            {
                      source: '/concierge',
                      destination: '/#concierge',
                      permanent: true,
            },
            {
                      source: '/the-villa',
                      destination: '/#the-villa',
                      permanent: true,
            },
            {
                      source: '/booking',
                      destination: '/#inquiry',
                      permanent: true,
            },
                ];
    },
};

export default nextConfig;
