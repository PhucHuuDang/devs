import React from "react";
import { BackgroundContent, defaultContent } from "./background-content";
import Prism from "../Prism";

export const PrimsContent = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <Prism
          animationType="3drotate"
          // timeScale={0.5}
          timeScale={0.7}
          height={3.5}
          baseWidth={5.5}
          // scale={3.6}
          scale={2.5}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
        />
      </div>
      <BackgroundContent {...defaultContent} />
    </>
  );
};
