import {
  BackgroundContent,
  BackgroundContentProps,
  defaultContent,
} from "@/components/common/background-content";
import { SHADER_SRC, ShaderCanvas } from "@/components/ui/radial-shader";

interface ShaderCanvasContentProps {
  className?: string;
}
export const ShaderCanvasContent = ({
  className,
  ...props
}: ShaderCanvasContentProps) => {
  return (
    <>
      <ShaderCanvas fragSource={SHADER_SRC} {...props} />

      <BackgroundContent {...defaultContent} />
    </>
  );
};
