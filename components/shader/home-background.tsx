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

const components: React.ReactNode[] = [
  <RippleShader key="ripple" />,
  <OrangeCloudShader key="orange-cloud" />,
  <ShaderCanvasContent key="shader-canvas" />,
  <FireSphereContent key="fire-sphere" />,
  <PrimsContent key="prims" />,
  <LightningContent key="lightning" />,
];

const randomIndex = Math.floor(Math.random() * components.length);
export const HomeBackground = () => {
  const mounted = useMounted();

  if (!mounted) return <BellLoader />;

  return <>{components[randomIndex]}</>;
};
