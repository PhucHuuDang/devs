import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { Toaster } from "sonner";

import "./globals.css";

// import { WebVitalsMonitor } from "@/components/common/web-vitals-monitor"; // For development

import { WebVitals } from "@/components/common/web-vitals";
import { WebVitalsMonitor } from "@/components/common/web-vitals-monitor";
import { META_CONFIG } from "@/config/meta-config";

import { ApolloWrapper } from "../providers/apollo-provider";
import { AuthProvider } from "../providers/auth-provider";

import { deleteCookies, getAuthCookies, setAuthCookies } from "./utils/cookies";

import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⚠️ IMPORTANT: Update these values for production!

export const metadata: Metadata = {
  ...META_CONFIG,
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
          {/* <WebVitals /> */}

          {/* Web Vitals Monitor - Only in development */}
          {/* {process.env.NODE_ENV === "development" && <WebVitalsMonitor />} */}

          <Toaster richColors position="top-right" closeButton />

          <ApolloWrapper>{children}</ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
