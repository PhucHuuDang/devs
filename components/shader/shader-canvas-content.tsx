import {
  BackgroundContent,
  BackgroundContentProps,
  defaultContent,
} from "../common/background-content";
import { SHADER_SRC, ShaderCanvas } from "../ui/radial-shader";

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
