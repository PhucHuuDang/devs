import { EllipsisVerticalIcon } from "lucide-react";
import GlassSurface from "../GlassSurface";
import { Logo } from "./logo";

export const Navbar = () => {
  return (
    <div className="fixed top-10 flex justify-center items-center z-50 w-full">
      <GlassSurface
        width={`90%`}
        height={60}
        childClassName="flex w-full justify-between items-center px-10"
        displace={0.05}
        distortionScale={-150}
        backgroundOpacity={0.1}
        saturation={2}
        greenOffset={15}
        blueOffset={25}
        brightness={60}
        // mixBlendMode="darken"
      >
        <Logo />
        <div>
          <div>
            <EllipsisVerticalIcon className="size-8 shadow-lg bg-slate-200 cursor-pointer  p-1 rounded-lg hover:scale-105 transition-all duration-300 hover:p-0.5 hover:bg-slate-400/20" />
          </div>
        </div>
      </GlassSurface>
    </div>
  );
};
