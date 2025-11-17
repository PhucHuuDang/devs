import { cn } from "@/lib/utils";
import Link from "next/link";

export interface BackgroundContentProps {
  trustBadge?: {
    text: string;
    icons?: string[];
  };
  headline: {
    line1: string;
    line2: string;
    className?: string;
  };
  subtitle: string;
  buttons?: {
    primary?: {
      text: string;
      onClick?: () => void;
      href?: string;
      className?: string;
    };
    secondary?: {
      text: string;
      href?: string;
      className?: string;
      onClick?: () => void;
    };
  };
  className?: string;
}

export const defaultContent: BackgroundContentProps = {
  trustBadge: {
    text: "Hi there 👋",
    icons: ["✨"],
  },
  headline: {
    line1: "DEVS,",
    line2: "Stories and Trips",
  },
  subtitle:
    "Just for fun where we share our stories and trips about our adventures!",
  buttons: {
    primary: {
      text: "Browsing our stories",
      onClick: () => console.log("Primary button clicked"),
    },
    secondary: {
      text: "Continue with Github",
      onClick: () => console.log("Secondary button clicked"),
    },
  },
};

export const BackgroundContent = ({
  trustBadge,
  headline,
  subtitle,
  buttons,
  className,
}: BackgroundContentProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex flex-col items-center justify-center text-white",
        className
      )}
    >
      {/* Trust Badge */}
      {trustBadge && (
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-2 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full text-sm">
            {trustBadge.icons && (
              <div className="flex">
                {trustBadge.icons.map((icon, index) => (
                  <span
                    key={index}
                    className={`text-${
                      index === 0 ? "yellow" : index === 1 ? "orange" : "amber"
                    }-300`}
                  >
                    {icon}
                  </span>
                ))}
              </div>
            )}
            <span className="text-orange-100">{trustBadge.text}</span>
          </div>
        </div>
      )}

      <div className="text-center space-y-6 max-w-5xl mx-auto px-4">
        {/* Main Heading with Animation */}
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
            {headline.line1}
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
            {headline.line2}
          </h1>
        </div>

        {/* Subtitle with Animation */}
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
          <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* CTA Buttons with Animation */}
        {buttons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up animation-delay-800">
            {buttons.primary && (
              <Link
                href="/blogs"
                prefetch
                onClick={buttons.primary.onClick}
                className={cn(
                  "px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25 cursor-pointer",
                  buttons.primary.className
                )}
              >
                {buttons.primary.text}
              </Link>
            )}
            {buttons.secondary && (
              <Link
                href="/test"
                onClick={buttons.secondary.onClick}
                prefetch
                className={cn(
                  "px-8 py-4 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-300/30 hover:border-orange-300/50 text-orange-100 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm cursor-pointer",
                  buttons.secondary.className
                )}
              >
                {buttons.secondary.text}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
