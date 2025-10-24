"use client";

import { BellLoader } from "../ui/bell-glow-loader";
import { SHADER_SRC, ShaderCanvas } from "../ui/radial-shader";
import { OrangeCloudShader } from "./orange-cloud-shader";
import { RippleShader } from "./ripple-shader";
import { useMounted } from "@/hooks/use-mounted";

const components: React.ReactNode[] = [
  <RippleShader key="ripple" />,
  <OrangeCloudShader key="orange-cloud" />,
  <ShaderCanvas key="shader-canvas" fragSource={SHADER_SRC} />,
];

const randomIndex = Math.floor(Math.random() * components.length);
export const HomeBackground = () => {
  const mounted = useMounted();

  if (!mounted) return <BellLoader />;

  return <>{components[randomIndex]}</>;
};
