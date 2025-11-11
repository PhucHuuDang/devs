import { cn } from "@/lib/utils";
import FuzzyText from "../react-bits/fuzzy-text";

interface NotFoundFuzzyTextProps {
  className?: string;
}
export const NotFoundFuzzyText = ({ className }: NotFoundFuzzyTextProps) => {
  return (
    <div className={cn("flex items-center justify-center h-screen", className)}>
      <FuzzyText
        // fontSize="clamp(2rem, 8vw, 8rem)"
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
      >
        404
      </FuzzyText>
    </div>
  );
};
