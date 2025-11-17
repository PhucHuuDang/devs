"use client";

import { BellLoader } from "../ui/bell-glow-loader";
import { SHADER_SRC, ShaderCanvas } from "../ui/radial-shader";
import { OrangeCloudShader } from "./orange-cloud-shader";
import { RippleShader } from "./ripple-shader";
import { useMounted } from "@/hooks/use-mounted";
import { ShaderCanvasContent } from "./shader-canvas-content";
import { defaultContent } from "../common/background-content";
import { FireSphereContent } from "../common/fire-sphere-content";
import { PrimsContent } from "../common/prims-content";
import { LightningContent } from "../common/lightning-content";

export default function HomeBackgroundClient({ shader }: { shader: string }) {
  const mounted = useMounted();
  if (!mounted) return <BellLoader />;

  switch (shader) {
    case "ripple":
      return <RippleShader />;
    case "orange":
      return <OrangeCloudShader />;
    case "canvas":
      return <ShaderCanvasContent />;
    case "fire":
      return <FireSphereContent />;
    case "prims":
      return <PrimsContent />;
    case "lightning":
      return <LightningContent />;
    default:
      return null;
  }
}
