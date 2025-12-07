import type { NextConfig } from "next";

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

  // reactCompiler: true,

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
    ],

    // viewTransition: true,

    // Better client-side caching for improved navigation
    clientSegmentCache: true,

    // Optimize navigation and rendering
    prerenderEarlyExit: true,
  },

  // Optimize production builds
  productionBrowserSourceMaps: false, // Disable in production for better performance

  // Compress output for better TTFB and loading times
  compress: true,

  trailingSlash: false,
};

export default nextConfig;
