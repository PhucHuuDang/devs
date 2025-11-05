import React from "react";
import { BackgroundContent, defaultContent } from "./background-content";
import Lightning from "../Lightning";

export const LightningContent = () => {
  return (
    <>
      <div className="w-full h-screen relative">
        <Lightning
          hue={220}
          xOffset={0}
          speed={0.8}
          intensity={1.2}
          size={1.2}
        />
      </div>
      <BackgroundContent {...defaultContent} />
    </>
  );
};
