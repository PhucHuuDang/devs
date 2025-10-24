"use client";
import { EllipsisVerticalIcon } from "lucide-react";
// import GlassSurface from "../GlassSurface";
import dynamic from "next/dynamic";

const GlassSurface = dynamic(() => import("../GlassSurface"), { ssr: false });

import { Logo } from "./logo";
import { SettingsSheet } from "./settings-sheet";
import { useGetSettings } from "@/hooks/use-get-settings";

export const Navbar = () => {
  const settings = useGetSettings();

  console.log({ settings });

  return (
    <div className="fixed top-10 flex justify-center items-center w-full z-50">
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
        <div>
          <SettingsSheet />
        </div>
      </GlassSurface>
    </div>
  );
};
