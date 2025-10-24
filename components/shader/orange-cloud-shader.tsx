"use client";

import Hero from "../ui/animated-shader-hero";

export const OrangeCloudShader = () => {
  return (
    <Hero
      trustBadge={{
        text: "Hi there 👋",
        // icons: ["✨"],
        // icons: ["🚀"], // optional
      }}
      headline={{
        line1: "DEVS",
        line2: "Stories  knowledge and growth",
      }}
      subtitle=""
      buttons={{
        primary: {
          text: "Get Started for Free",
          // onClick: handlePrimaryClick,
        },
        secondary: {
          text: "Explore Features",
          // onClick: handleSecondaryClick,
        },
      }}
      className="w-full"
    />
  );
};
