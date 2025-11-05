import React from "react";
import { FireSphere } from "../ui/fire-sphere";
import { BackgroundContent, defaultContent } from "./background-content";
import LightRays from "../LightRays";

export const FireSphereContent = () => {
  return (
    <>
      {/* <div style={{ width: "100%", height: "600px", position: "relative" }}> */}

      {/* </div> */}
      <FireSphere
        bloomStrength={3}
        bloomRadius={1}
        bloomThreshold={0}
        // color0={border}
        // color1={base}
        animate
      />

      <div className="absolute inset-0 z-10">
        <LightRays
          raysOrigin="top-center"
          // raysColor="#00ffff"
          raysColor="#f8fafc"
          raysSpeed={1.5}
          saturation={1}
          // lightSpread={0.8}
          lightSpread={0.9}
          // rayLength={1.2}
          rayLength={5}
          followMouse={true}
          // mouseInfluence={0.1}
          mouseInfluence={0.3}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <BackgroundContent {...defaultContent} />
    </>
  );
};
