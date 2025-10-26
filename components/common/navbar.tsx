"use client";
import dynamic from "next/dynamic";

const GlassSurface = dynamic(() => import("../GlassSurface"), { ssr: false });

import { Logo } from "./logo";
import { SettingsSheet } from "./settings-sheet";
import { useGetSettings } from "@/hooks/use-get-settings";
import { ThemeToggleButtonStyles } from "../theme/theme-toggle-button";

export const Navbar = () => {
  const settings = useGetSettings();

  return (
    <div className="fixed top-6 flex justify-center items-center w-full z-50">
      <GlassSurface
        width={`90%`}
        height={60}
        childClassName="flex w-full justify-between items-center px-10"
        // displace={0.05}
        // distortionScale={-150}
        // backgroundOpacity={0.1}
        // saturation={2}
        // greenOffset={15}
        // blueOffset={25}
        // brightness={60}
        {...settings}
        // mixBlendMode="darken"
      >
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggleButtonStyles />
          <SettingsSheet />
        </div>
      </GlassSurface>
    </div>
  );
};
