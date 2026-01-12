import { SHADER_SRC, ShaderCanvas } from "@/components/ui/radial-shader";

interface HomeRadialBackgroundProps {
  children?: React.ReactNode;
}
export const HomeRadialBackground = ({
  children,
}: HomeRadialBackgroundProps) => {
  return (
    <div className="relative w-full h-full">
      <ShaderCanvas fragSource={SHADER_SRC} />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-4xl font-bold">
          <h1 className="text-center">Home Radial Background</h1>
          <p>This is a radial background for the home page</p>
        </div>
      </div>
    </div>
  );
};
