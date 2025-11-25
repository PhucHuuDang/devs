"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { BellLoader } from "../ui/bell-glow-loader";

// Dynamic imports with loading states - reduces initial bundle size
const RippleShader = dynamic(
  () =>
    import("./ripple-shader").then((mod) => ({ default: mod.RippleShader })),
  {
    loading: () => <BellLoader />,
    ssr: false,
  }
);

const OrangeCloudShader = dynamic(
  () =>
    import("./orange-cloud-shader").then((mod) => ({
      default: mod.OrangeCloudShader,
    })),
  {
    loading: () => <BellLoader />,
    ssr: false,
  }
);

const ShaderCanvasContent = dynamic(
  () =>
    import("./shader-canvas-content").then((mod) => ({
      default: mod.ShaderCanvasContent,
    })),
  {
    loading: () => <BellLoader />,
    ssr: false,
  }
);

const FireSphereContent = dynamic(
  () =>
    import("../common/fire-sphere-content").then((mod) => ({
      default: mod.FireSphereContent,
    })),
  {
    loading: () => <BellLoader />,
    ssr: false,
  }
);

const PrimsContent = dynamic(
  () =>
    import("../common/prims-content").then((mod) => ({
      default: mod.PrimsContent,
    })),
  {
    loading: () => <BellLoader />,
    ssr: false,
  }
);

const LightningContent = dynamic(
  () =>
    import("../common/lightning-content").then((mod) => ({
      default: mod.LightningContent,
    })),
  {
    loading: () => <BellLoader />,
    ssr: false,
  }
);

const SHADER_OPTIONS = [
  "ripple",
  "orange",
  "canvas",
  "fire",
  "prims",
  "lightning",
] as const;
type ShaderOption = (typeof SHADER_OPTIONS)[number];

export default function HomeBackgroundClient({ shader }: { shader?: string }) {
  // Random selection happens on client-side, allowing the page to be statically generated
  // Using lazy initializer to ensure random selection only happens once on mount
  const [selectedShader] = useState<ShaderOption>(() => {
    if (shader && SHADER_OPTIONS.includes(shader as ShaderOption)) {
      return shader as ShaderOption;
    }
    // Generate random shader only once per component mount
    return SHADER_OPTIONS[Math.floor(Math.random() * SHADER_OPTIONS.length)];
  });

  // Render the selected shader component
  switch (selectedShader) {
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
      return <BellLoader />;
  }
}
