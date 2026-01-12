import { Metadata } from "next";

import { AppleFloatingDock } from "@/components/common/apple-floating-dock";
import { LayoutTransition } from "@/components/common/layout-transition";
import { ListCategory } from "@/components/common/list-category.";
import { Navbar } from "@/components/common/navbar";

import { ThemeProvider } from "../../providers/next-theme-provider";

interface ClientsLayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Blogs is a platform for developers to share their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.",
  icons: {
    icon: "/icon.webp",
  },
  authors: [
    { name: "Harry Dang", url: "https://www.facebook.com/HP2K2Official" },
  ],
  creator: "Harry Dang",

  metadataBase: new URL("localhost:3000/blogs"),
  generator: "Next.js",
  applicationName: "DEVS",

  abstract:
    "The best platform for developers to share their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.",

  category: "technology",
  publisher: "Vercel",
};

const ClientsLayout = async ({ children }: ClientsLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <section className="h-screen w-full">
        <Navbar />
        <div className="pt-28 px-10 w-full h-full">
          {/* <div className="w-full px-2">
            <ListCategory />
          </div> */}

          {children}

          {/* <LayoutTransition>{children}</LayoutTransition> */}
        </div>
        <AppleFloatingDock />
      </section>
    </ThemeProvider>
  );
};

export default ClientsLayout;
