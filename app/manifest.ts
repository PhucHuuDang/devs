import { MetadataRoute } from "next";

/**
 * PWA Manifest Configuration
 *
 * This file defines how your app appears when installed on a user's device.
 * It enables Progressive Web App (PWA) capabilities.
 *
 * Learn more:
 * - https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 * - https://web.dev/add-manifest/
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Basic App Info
    name: "DEVS - Developer Community Platform",
    short_name: "DEVS",
    description:
      "A platform for developers to share stories, learn from others, grow skills, network, and find opportunities.",

    // Start URL - where the app opens when launched from home screen
    start_url: "/",
    scope: "/",

    // Display mode - how the app appears
    display: "standalone", // Looks like a native app
    // Other options: "fullscreen", "minimal-ui", "browser"

    // Orientation
    orientation: "portrait-primary",
    // Options: "portrait", "landscape", "any", "natural", "portrait-primary", "landscape-primary"

    // Theme Colors
    theme_color: "#000000", // Matches dark theme
    background_color: "#000000", // Background while app is loading

    // Categories (helps app stores categorize your app)
    categories: [
      "education",
      "productivity",
      "social",
      "developer tools",
      "technology",
    ],

    // Icons - Multiple sizes for different devices
    icons: [
      {
        src: "/icon.webp",
        sizes: "any",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      // Apple Touch Icon
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    // Shortcuts - Quick actions from home screen
    shortcuts: [
      {
        name: "Browse Blogs",
        short_name: "Blogs",
        description: "Read latest developer stories and articles",
        url: "/blogs",
        icons: [
          {
            src: "/icon.webp",
            sizes: "192x192",
            type: "image/webp",
          },
        ],
      },
      {
        name: "Create Blog",
        short_name: "Write",
        description: "Share your knowledge with the community",
        url: "/create-blog",
        icons: [
          {
            src: "/icon.webp",
            sizes: "192x192",
            type: "image/webp",
          },
        ],
      },
    ],

    // Screenshots for app stores (optional but recommended)
    screenshots: [
      {
        src: "/screenshots/home-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "DEVS Home Screen",
      },
      {
        src: "/screenshots/home-mobile.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "DEVS Mobile View",
      },
    ],

    // Related Applications (if you have native apps)
    prefer_related_applications: false,
    // related_applications: [
    //   {
    //     platform: "play",
    //     url: "https://play.google.com/store/apps/details?id=com.example.devs",
    //     id: "com.example.devs",
    //   },
    //   {
    //     platform: "itunes",
    //     url: "https://apps.apple.com/app/devs/id123456789",
    //   },
    // ],

    // Additional PWA features
    lang: "en-US",
    dir: "ltr", // Text direction: "ltr" (left-to-right) or "rtl" (right-to-left)

    // Protocol handlers (optional - for handling custom URLs)
    // protocol_handlers: [
    //   {
    //     protocol: "web+devs",
    //     url: "/blog/%s",
    //   },
    // ],

    // Share target (allows other apps to share to your app)
    // share_target: {
    //   action: "/share",
    //   method: "POST",
    //   enctype: "multipart/form-data",
    //   params: {
    //     title: "title",
    //     text: "text",
    //     url: "url",
    //   },
    // },
  };
}
