import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/articles/porto-rafti-family-holiday',
        destination: '/articles/porto-rafti-family-holiday-greece',
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
        destination: '/',
        permanent: true,
      },
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
