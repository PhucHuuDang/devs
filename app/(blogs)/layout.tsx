import React from "react";
import { ThemeProvider } from "../providers/next-theme-provider";
import { Navbar } from "@/components/common/navbar";

interface BlogsLayoutProps {
  children: React.ReactNode;
}

const BlogsLayout = ({ children }: BlogsLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <section className="relative h-screen w-full overflow-hidden ">
        <Navbar />
        <div className="pt-28 px-10">{children}</div>
      </section>
    </ThemeProvider>
  );
};

export default BlogsLayout;
