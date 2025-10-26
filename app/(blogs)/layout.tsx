import { Metadata } from "next";
import { ThemeProvider } from "../providers/next-theme-provider";
import { Navbar } from "@/components/common/navbar";
import { ListCategory } from "@/components/common/list-category.";

interface BlogsLayoutProps {
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
};

const BlogsLayout = ({ children }: BlogsLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <section className="relative h-screen w-full overflow-hidden ">
        <Navbar />
        <div className="pt-28 px-10 w-full">
          <div className="w-full px-2">
            <ListCategory />
          </div>

          {children}
        </div>
      </section>
    </ThemeProvider>
  );
};

export default BlogsLayout;
