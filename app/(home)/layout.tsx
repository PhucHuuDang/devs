import { Navbar } from "@/components/common/navbar";
import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}
const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden ">
      {/* <Navbar /> */}

      {children}
    </section>
  );
};

export default HomeLayout;
