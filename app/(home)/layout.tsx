import React from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}
const HomeLayout = async ({ children }: HomeLayoutProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden ">
      {children}
    </section>
  );
};

export default HomeLayout;
