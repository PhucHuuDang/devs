"use client";
import dynamic from "next/dynamic";

const GlassSurface = dynamic(() => import("../GlassSurface"), { ssr: false });
import { Logo } from "./logo";
import { useGetSettings } from "@/hooks/use-get-settings";
import { ThemeToggleButtonStyles } from "../theme/theme-toggle-button";
import { UserControl } from "./user-control";
export const Navbar = () => {
  const settings = useGetSettings();

  return (
    <div className="fixed top-6 flex justify-center items-center w-full z-50">
      <GlassSurface
        width={`90%`}
        height={60}
        childClassName="flex w-full justify-between items-center px-10"
        {...settings}
      >
        <Logo />
        <div className="flex items-center justify-center gap-2">
          <ThemeToggleButtonStyles />
          {/* <SettingsSheet /> */}
          <UserControl />
        </div>
      </GlassSurface>
    </div>
  );
};
