import { Logo } from "@/components/common/logo";
import { Navbar } from "@/components/common/navbar";
import GlassSurface from "@/components/GlassSurface";
import { HomeBackground } from "@/components/shader/home-background";
import { HomeRadialBackground } from "@/components/shader/home-radial-background";
import { OrangeCloudShader } from "@/components/shader/orange-cloud-shader";

export default function Page() {
  return (
    <>
      <div>
        <HomeBackground />

        {/* <HomeRadialBackground /> */}

        {/* <Navbar /> */}
      </div>
    </>
  );
}
