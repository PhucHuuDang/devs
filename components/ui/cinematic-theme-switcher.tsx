"use client";

import { useState, useEffect, useRef, useMemo } from "react";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  delay: number;
  duration: number;
}

type SizePreset = "xs" | "sm" | "md" | "lg" | "xl";

interface CinematicThemeSwitcherProps {
  className?: string;
  /** Size preset or custom scale factor (0.5 = 50%, 1 = 100%, 1.5 = 150%) */
  size?: SizePreset | number;
}

// Base dimensions (md size)
const BASE_DIMENSIONS = {
  containerWidth: 104,
  containerHeight: 64,
  thumbSize: 44,
  iconSize: 20,
  thumbTravel: 46,
  padding: 6,
  borderWidth: 2,
  innerInset: 3,
  iconPadding: 16, // px-4
};

// Size presets as scale factors
const SIZE_PRESETS: Record<SizePreset, number> = {
  xs: 0.5,
  sm: 0.65,
  md: 1,
  lg: 1.25,
  xl: 1.5,
};

export function CinematicThemeSwitcher({
  className,
  size = "md",
}: CinematicThemeSwitcherProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Calculate scale factor from size prop
  const scale = typeof size === "number" ? size : SIZE_PRESETS[size];

  // Memoized scaled dimensions
  const dims = useMemo(() => {
    return {
      containerWidth: Math.round(BASE_DIMENSIONS.containerWidth * scale),
      containerHeight: Math.round(BASE_DIMENSIONS.containerHeight * scale),
      thumbSize: Math.round(BASE_DIMENSIONS.thumbSize * scale),
      iconSize: Math.round(BASE_DIMENSIONS.iconSize * scale),
      thumbTravel: Math.round(BASE_DIMENSIONS.thumbTravel * scale),
      padding: Math.round(BASE_DIMENSIONS.padding * scale),
      borderWidth: Math.max(1, Math.round(BASE_DIMENSIONS.borderWidth * scale)),
      innerInset: Math.round(BASE_DIMENSIONS.innerInset * scale),
      iconPadding: Math.round(BASE_DIMENSIONS.iconPadding * scale),
    };
  }, [scale]);

  // State Management
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref to track toggle button DOM element
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Track whether toggle is in checked (dark) or unchecked (light) position
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  // Handle hydration - prevent mismatch
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  // Generate particles with different timing
  const generateParticles = () => {
    const newParticles: Particle[] = [];
    const particleCount = 3; // Multiple layers

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        delay: i * 0.1, // Stagger timing
        duration: 0.6 + i * 0.1, // Different durations for depth
      });
    }

    setParticles(newParticles);
    setIsAnimating(true);

    // Clear particles after animation
    setTimeout(() => {
      setIsAnimating(false);
      setParticles([]);
    }, 1000);
  };

  // Toggle handler - switches theme and triggers particles
  const handleToggle = () => {
    generateParticles();
    setTheme(isDark ? "light" : "dark");
  };

  // Prevent hydration mismatch - show placeholder during SSR
  if (!mounted) {
    return (
      <div className={cn("relative inline-block", className)}>
        <div
          className="relative flex items-center rounded-full bg-gray-200"
          style={{
            width: dims.containerWidth,
            height: dims.containerHeight,
            padding: dims.padding,
          }}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block cursor-pointer", className)}>
      {/* SVG Filter for Film Grain Texture */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Light mode grain - subtle */}
          <filter id="grain-light">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="desaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="lightGrain">
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="lightGrain" mode="overlay" />
          </filter>

          {/* Dark mode grain - more visible */}
          <filter id="grain-dark">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="desaturatedNoise"
            />
            <feComponentTransfer in="desaturatedNoise" result="darkGrain">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="darkGrain" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Pill-shaped track container */}
      <motion.button
        ref={toggleRef}
        onClick={handleToggle}
        className="relative flex items-center rounded-full transition-all duration-300 focus:outline-none"
        style={{
          width: dims.containerWidth,
          height: dims.containerHeight,
          padding: dims.padding,
          background: isDark
            ? "radial-gradient(ellipse at top left, #1e293b 0%, #0f172a 40%, #020617 100%)"
            : "radial-gradient(ellipse at top left, #ffffff 0%, #f1f5f9 40%, #cbd5e1 100%)",
          boxShadow: isDark
            ? `
              inset ${5 * scale}px ${5 * scale}px ${
                12 * scale
              }px rgba(0, 0, 0, 0.9),
              inset ${-5 * scale}px ${-5 * scale}px ${
                12 * scale
              }px rgba(71, 85, 105, 0.4),
              inset ${8 * scale}px ${8 * scale}px ${
                16 * scale
              }px rgba(0, 0, 0, 0.7),
              inset ${-8 * scale}px ${-8 * scale}px ${
                16 * scale
              }px rgba(100, 116, 139, 0.2),
              inset 0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 1),
              inset 0 ${-2 * scale}px ${4 * scale}px rgba(71, 85, 105, 0.4),
              inset 0 0 ${20 * scale}px rgba(0, 0, 0, 0.6),
              0 ${1 * scale}px ${1 * scale}px rgba(255, 255, 255, 0.05),
              0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.4),
              0 ${8 * scale}px ${16 * scale}px rgba(0, 0, 0, 0.4),
              0 ${16 * scale}px ${32 * scale}px rgba(0, 0, 0, 0.3),
              0 ${24 * scale}px ${48 * scale}px rgba(0, 0, 0, 0.2)
            `
            : `
              inset ${5 * scale}px ${5 * scale}px ${
                12 * scale
              }px rgba(148, 163, 184, 0.5),
              inset ${-5 * scale}px ${-5 * scale}px ${
                12 * scale
              }px rgba(255, 255, 255, 1),
              inset ${8 * scale}px ${8 * scale}px ${
                16 * scale
              }px rgba(100, 116, 139, 0.3),
              inset ${-8 * scale}px ${-8 * scale}px ${
                16 * scale
              }px rgba(255, 255, 255, 0.9),
              inset 0 ${2 * scale}px ${4 * scale}px rgba(148, 163, 184, 0.4),
              inset 0 ${-2 * scale}px ${4 * scale}px rgba(255, 255, 255, 1),
              inset 0 0 ${20 * scale}px rgba(203, 213, 225, 0.3),
              0 ${1 * scale}px ${2 * scale}px rgba(255, 255, 255, 1),
              0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.1),
              0 ${8 * scale}px ${16 * scale}px rgba(0, 0, 0, 0.08),
              0 ${16 * scale}px ${32 * scale}px rgba(0, 0, 0, 0.06),
              0 ${24 * scale}px ${48 * scale}px rgba(0, 0, 0, 0.04)
            `,
          border: `${dims.borderWidth}px solid ${
            isDark ? "rgba(51, 65, 85, 0.6)" : "rgba(203, 213, 225, 0.6)"
          }`,
          position: "relative",
        }}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        role="switch"
        aria-checked={isDark}
        whileTap={{ scale: 0.98 }}
      >
        {/* Deep inner groove/rim effect */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: dims.innerInset,
            boxShadow: isDark
              ? `inset 0 ${2 * scale}px ${
                  6 * scale
                }px rgba(0, 0, 0, 0.9), inset 0 ${-1 * scale}px ${
                  3 * scale
                }px rgba(71, 85, 105, 0.3)`
              : `inset 0 ${2 * scale}px ${
                  6 * scale
                }px rgba(100, 116, 139, 0.4), inset 0 ${-1 * scale}px ${
                  3 * scale
                }px rgba(255, 255, 255, 0.8)`,
          }}
        />

        {/* Multi-layer glossy overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: isDark
              ? `
                radial-gradient(ellipse at top, rgba(71, 85, 105, 0.15) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(71, 85, 105, 0.2) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.3) 100%)
              `
              : `
                radial-gradient(ellipse at top, rgba(255, 255, 255, 0.8) 0%, transparent 50%),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, transparent 30%, transparent 70%, rgba(148, 163, 184, 0.15) 100%)
              `,
            mixBlendMode: "overlay",
          }}
        />

        {/* Ambient occlusion effect */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: isDark
              ? `inset 0 0 ${15 * scale}px rgba(0, 0, 0, 0.5)`
              : `inset 0 0 ${15 * scale}px rgba(148, 163, 184, 0.2)`,
          }}
        />
        {/* Background Icons */}
        <div
          className="absolute inset-0 flex items-center justify-between cursor-pointer"
          style={{
            paddingLeft: dims.iconPadding,
            paddingRight: dims.iconPadding,
          }}
        >
          <Sun
            size={dims.iconSize}
            className={isDark ? "text-yellow-100" : "text-amber-600"}
          />
          <Moon
            size={dims.iconSize}
            className={isDark ? "text-yellow-100" : "text-slate-700"}
          />
        </div>

        {/* Circular Thumb with Bouncy Spring Physics */}
        <motion.div
          className="relative z-10 flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: dims.thumbSize,
            height: dims.thumbSize,
            background: isDark
              ? "linear-gradient(145deg, #64748b 0%, #475569 50%, #334155 100%)"
              : "linear-gradient(145deg, #ffffff 0%, #fefefe 50%, #f8fafc 100%)",
            boxShadow: isDark
              ? `
                inset ${2 * scale}px ${2 * scale}px ${
                  4 * scale
                }px rgba(100, 116, 139, 0.4),
                inset ${-2 * scale}px ${-2 * scale}px ${
                  4 * scale
                }px rgba(0, 0, 0, 0.8),
                inset 0 ${1 * scale}px ${1 * scale}px rgba(255, 255, 255, 0.15),
                0 ${1 * scale}px ${2 * scale}px rgba(255, 255, 255, 0.1),
                0 ${8 * scale}px ${32 * scale}px rgba(0, 0, 0, 0.6),
                0 ${4 * scale}px ${12 * scale}px rgba(0, 0, 0, 0.5),
                0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.4)
              `
              : `
                inset ${2 * scale}px ${2 * scale}px ${
                  4 * scale
                }px rgba(203, 213, 225, 0.3),
                inset ${-2 * scale}px ${-2 * scale}px ${
                  4 * scale
                }px rgba(255, 255, 255, 1),
                inset 0 ${1 * scale}px ${2 * scale}px rgba(255, 255, 255, 1),
                0 ${1 * scale}px ${2 * scale}px rgba(255, 255, 255, 1),
                0 ${8 * scale}px ${32 * scale}px rgba(0, 0, 0, 0.18),
                0 ${4 * scale}px ${12 * scale}px rgba(0, 0, 0, 0.12),
                0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.08)
              `,
            border: `${dims.borderWidth}px solid ${
              isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(255, 255, 255, 0.9)"
            }`,
          }}
          animate={{
            x: isDark ? dims.thumbTravel : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300, // Fast, responsive movement
            damping: 20, // Bouncy feel with slight overshoot
          }}
        >
          {/* Glossy shine overlay on thumb */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)",
              mixBlendMode: "overlay",
            }}
          />
          {/* Particle Layer - expanding circles from center with grainy texture */}
          {isAnimating &&
            particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 10 * scale,
                    height: 10 * scale,
                    background: isDark
                      ? "radial-gradient(circle, rgba(147, 197, 253, 0.5) 0%, rgba(147, 197, 253, 0) 70%)"
                      : "radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(251, 191, 36, 0) 70%)",
                    mixBlendMode: "normal",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: isDark ? 6 : 8, opacity: [0, 1, 0] }}
                  transition={{
                    duration: isDark ? 0.5 : particle.duration,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                >
                  {/* Grainy texture overlay */}
                  <div
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                      mixBlendMode: "overlay",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

          {/* Icon */}
          <div className="relative z-10 cursor-pointer">
            {isDark ? (
              <Moon size={dims.iconSize} className="text-yellow-200" />
            ) : (
              <Sun size={dims.iconSize} className="text-amber-500" />
            )}
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
}
