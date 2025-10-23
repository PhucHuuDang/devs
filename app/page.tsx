import { OrangeCloudShader } from "@/components/shader/orange-cloud-shader";
import Hero from "@/components/ui/animated-shader-hero";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import Image from "next/image";

export default function Home() {
  // const handlePrimaryClick = () => {
  //   console.log("Get Started clicked!");
  //   // Add your logic here
  // };

  // const handleSecondaryClick = () => {
  //   console.log("Explore Features clicked!");
  //   // Add your logic here
  // };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden   bg-blue-700">
      {/* <ShaderAnimation />
      <span className="absolute pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        DEVS
      </span> */}

      {/* <div className="w-full"> */}
      <OrangeCloudShader />
    </div>
  );
}
