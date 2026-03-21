import withBundleAnalyzer from "@next/bundle-analyzer";

import type { NextConfig } from "next";

const analyzeBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "res-console.cloudinary.com",
      },

      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },

  // reactCompiler: true, // Requires: npm i babel-plugin-react-compiler

  bundlePagesRouterDependencies: true,

  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },

  // Optimize web vitals tracking and performance
  experimental: {
    // Enable optimized loading for better performance
    optimizePackageImports: [
      "web-vitals",
      "lucide-react",
      "@radix-ui/*",
      "@platejs/*",
      "platejs/react",
      "@ai-sdk/react",
      "@faker-js/faker",
      "@fingerprintjs/fingerprintjs",
      "@hookform/resolvers",
      "@next/bundle-analyzer",
      "@number-flow/react",
      "@platejs/ai",
      "@platejs/autoformat",
      "@platejs/basic-nodes",
      "@platejs/basic-styles",
      "motion/react",
      "zod",
      "lodash",
      "lodash.debounce",
      "recharts",
      "@tabler/icons-react",
      "date-fns",
      "sonner",
      "framer-motion",
      "cmdk",
    ],

    viewTransition: true,

    // Better client-side caching for improved navigation
    // clientSegmentCache: true,

    // Optimize navigation and rendering
    prerenderEarlyExit: true,
  },

  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable in production for better performance

  // Compress output for better TTFB and loading times
  compress: true,

  trailingSlash: false,

  // ==========================================
  // Security Headers
  // ==========================================
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: http:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com " +
                (process.env.NEXT_PUBLIC_GRAPHQL_URL?.replace(
                  /\/graphql$/,
                  "",
                ) || "http://localhost:3001"),
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default analyzeBundle(nextConfig);
