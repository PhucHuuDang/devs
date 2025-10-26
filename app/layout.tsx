import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | DEVS",
    default: "DEVS",
  },
  icons: {
    icon: "/icon.webp",
  },
  description:
    "DEVS is a platform for developers to share their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.",

  authors: [
    { name: "Harry Dang", url: "https://www.facebook.com/HP2K2Official" },
  ],
  facebook: {
    appId: "HP2K2Official",
  },
  creator: "Harry Dang",
  keywords: [
    "DEVS",
    "developers",
    "stories",
    "knowledge",
    "growth",
    "network",
    "hired",
    "freelance",
    "work",
    "blogs",
    "articles",
    "tutorials",
    "guides",
    "tips",
    "tricks",
    "hacks",
    "secrets",
  ],

  metadataBase: new URL("localhost:3000"),
  openGraph: {
    title: "DEVS",
    description:
      "DEVS is a platform for developers to share their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.",
    url: "localhost:3000",
    siteName: "DEVS",
    // images: ["/og-image.png"],
  },

  category: "technology",

  publisher: "Vercel",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },

  alternates: {
    canonical: "localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster richColors position="top-right" />

        {children}
      </body>
    </html>
  );
}
