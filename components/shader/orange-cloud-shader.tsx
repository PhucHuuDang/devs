"use client";

import Hero from "../ui/animated-shader-hero";

export const OrangeCloudShader = () => {
  return (
    <Hero
      trustBadge={{
        text: "Trusted by forward-thinking teams.",
        // icons: ["✨"],
        icons: ["🚀"], // optional
      }}
      headline={{
        line1: "DEVS",
        line2: "Stories  knowledge and growth",
      }}
      subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
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
