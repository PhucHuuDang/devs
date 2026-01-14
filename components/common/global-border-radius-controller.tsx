"use client";

import { useEffect } from "react";

import { useSettingsGlassSurfaceSelectors } from "@/stores/use-settings-glass-surface";

/**
 * GlobalBorderRadiusController
 *
 * This component syncs the border radius setting from the store
 * to CSS variables on the document root, allowing global control
 * of all rounded elements across the application.
 *
 * The border radius is mapped to Tailwind's radius scale:
 * - --radius: base radius (controlled by settings)
 * - --radius-sm: radius - 4px
 * - --radius-md: radius - 2px
 * - --radius-lg: radius (same as base)
 * - --radius-xl: radius + 4px
 */
export function GlobalBorderRadiusController() {
  const borderRadius =
    useSettingsGlassSurfaceSelectors.use.borderRadius?.() ?? 20;

  useEffect(() => {
    // Ensure borderRadius is defined
    if (typeof borderRadius !== "number") return;

    // Convert border radius to rem (assuming 16px base)
    const radiusInRem = borderRadius / 16;

    // Update CSS variables on the document root
    document.documentElement.style.setProperty("--radius", `${radiusInRem}rem`);
    document.documentElement.style.setProperty(
      "--radius-sm",
      `calc(${radiusInRem}rem - 0.25rem)`, // -4px
    );
    document.documentElement.style.setProperty(
      "--radius-md",
      `calc(${radiusInRem}rem - 0.125rem)`, // -2px
    );
    document.documentElement.style.setProperty(
      "--radius-lg",
      `${radiusInRem}rem`,
    );
    document.documentElement.style.setProperty(
      "--radius-xl",
      `calc(${radiusInRem}rem + 0.25rem)`, // +4px
    );

    // Also set direct border radius values for convenience
    document.documentElement.style.setProperty(
      "--global-border-radius",
      `${borderRadius}px`,
    );
  }, [borderRadius]);

  // This component doesn't render anything
  return null;
}
