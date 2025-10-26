import React from "react";
import { cn } from "@/lib/utils";
import GlassSurface, { GlassSurfaceProps } from "@/components/GlassSurface";
import { useGetSettings } from "@/hooks/use-get-settings";

type GlassIconWrapperProps = GlassSurfaceProps & {
  icon: React.ElementType;
  classNameIcon?: string;
  widthIcon?: number;
  heightIcon?: number;
};

const GlassIconWrapper: React.FC<GlassIconWrapperProps> = ({
  icon: Icon,
  classNameIcon,
  widthIcon = 40,
  heightIcon = 40,
  className,
  ...props
}) => {
  const settings = useGetSettings();

  return (
    <GlassSurface
      {...props}
      {...settings}
      width={widthIcon}
      height={heightIcon}
      className={cn("cursor-pointer", className)}
    >
      <Icon className={cn("size-5 text-slate-100", classNameIcon)} />
    </GlassSurface>
  );
};

export default GlassIconWrapper;
