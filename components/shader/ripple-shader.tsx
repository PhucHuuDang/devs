"use client";

import { ShaderAnimation } from "../ui/shader-animation";

export const RippleShader = () => {
  return (
    <>
      <ShaderAnimation />
      <div className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white flex flex-col items-center justify-center">
        <span className="text-7xl">DEVS</span>
        <span className="text-7xl">Stories knowledge and growth</span>
      </div>
    </>
  );
};

{
  /* Additional content below hero */
}
{
  /* <div className="bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How to Use the Hero Component
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <pre className="text-sm text-gray-600 overflow-x-auto">
              {`<Hero
trustBadge={{
  text: "Your trust badge text",
  icons: ["🚀", "⭐", "✨"] // optional
}}
headline={{
  line1: "Your First Line",
  line2: "Your Second Line"
}}
subtitle="Your compelling subtitle text goes here..."
buttons={{
  primary: {
    text: "Primary CTA",
    onClick: handlePrimaryClick
  },
  secondary: {
    text: "Secondary CTA", 
    onClick: handleSecondaryClick
  }
}}
className="custom-classes" // optional
/>`}
            </pre>
          </div>
        </div>
      </div> */
}
{
  /* </div> */
}
