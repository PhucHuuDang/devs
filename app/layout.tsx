import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ApolloWrapper } from "./providers/apollo-provider";
import { WebVitals } from "@/components/common/web-vitals";
// import { WebVitalsMonitor } from "@/components/common/web-vitals-monitor"; // For development
import Script from "next/script";
import { WebVitalsMonitor } from "@/components/common/web-vitals-monitor";
import { AuthProvider } from "./providers/auth-provider";
import { deleteCookies, getAuthCookies, setAuthCookies } from "./utils/cookies";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⚠️ IMPORTANT: Update these values for production!
const siteConfig = {
  name: "DEVS",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", // Replace with your actual domain
  description:
    "DEVS is a platform for developers to share their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.",
  ogImage: "/icon.webp",
  creator: "Harry Dang",
  twitterHandle: "@HP2K2Official", // Add your Twitter handle
};

export const metadata: Metadata = {
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
  keywords: [
    "DEVS",
    "developers",
    "programming",
    "coding",
    "web development",
    "software engineering",
    "tech blog",
    "developer community",
    "stories",
    "knowledge",
    "tutorials",
    "guides",
    "tips",
    "best practices",
    "career",
    "freelance",
    "hire developers",
  ],

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get GA ID from environment variable
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics - Only load if GA ID is set */}
        {gaId && gaId !== "G-XXX" && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script
              id="gtag-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    send_page_view: true,
                    anonymize_ip: true, // GDPR compliance
                  });
                `,
              }}
            />
          </>
        )}

        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for faster third-party connections */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider
          getCookies={getAuthCookies}
          setCookies={setAuthCookies}
          deleteCookies={deleteCookies}
        >
          {/* Web Vitals tracking for all users */}
          <WebVitals />

          {/* Web Vitals Monitor - Only in development */}
          {process.env.NODE_ENV === "development" && <WebVitalsMonitor />}

          <Toaster richColors position="top-right" closeButton />

          <ApolloWrapper>{children}</ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
