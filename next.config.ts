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
                ];
    },
};

export default nextConfig;
