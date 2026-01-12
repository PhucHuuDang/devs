import { KEYWORDS } from "@/constants/keywords";

const siteConfig = {
  name: "DEVS",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", // Replace with your actual domain
  description:
    "DEVS is a platform for developers to share their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.",
  ogImage: "/icon.webp",
  creator: "Harry Dang",
  twitterHandle: "@HP2K2Official", // Add your Twitter handle
};

export const META_CONFIG = {
  // Basic metadata
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,

  // Icons
  icons: {
    icon: "/icon.webp",
    apple: "/apple-icon.png", // Add this for iOS
  },

  // Authors & Creator
  authors: [
    { name: "Harry Dang", url: "https://www.facebook.com/HP2K2Official" },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.name,

  // Keywords for SEO
  keywords: [...KEYWORDS],

  // Category
  category: "technology",

  // Metadata Base URL (CRITICAL for SEO!)
  metadataBase: new URL(siteConfig.url),

  // Open Graph (for social media sharing)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },

  // Facebook
  facebook: {
    appId: "HP2K2Official",
  },

  // Robots (CRITICAL for SEO!)
  // ⚠️ IMPORTANT: Enable indexing for production!
  robots: {
    index: true, // Changed from false to true
    follow: true, // Changed from false to true
    nocache: false,
    googleBot: {
      index: true, // Changed from false to true
      follow: true, // Changed from false to true
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical URL
  alternates: {
    canonical: siteConfig.url,
  },

  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code", // Get from Google Search Console
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Additional metadata for better SEO
  other: {
    "og:site_name": siteConfig.name,
  },
};
