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
        hostname: "example.com",
      },
    ],
  },

  bundlePagesRouterDependencies: true,

  // Optimize web vitals tracking and performance
  experimental: {
    // Enable optimized loading for better performance
    optimizePackageImports: [
      "web-vitals",
      "lucide-react",
      "@radix-ui/*",
      "@platejs/*",
    ],

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

  // cacheComponents: true,
};

export default nextConfig;
