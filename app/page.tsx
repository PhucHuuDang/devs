import { HomeBackground } from "@/components/shader/home-background";
import { HomeRadialBackground } from "@/components/shader/home-radial-background";
import { OrangeCloudShader } from "@/components/shader/orange-cloud-shader";

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* <HomeBackground /> */}

      <HomeRadialBackground />
    </div>
  );
}
