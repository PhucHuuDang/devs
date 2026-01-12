"use client";

import { useEffect } from "react";

import dynamic from "next/dynamic";

import { AnimatePresence, motion } from "motion/react";

const GlassSurface = dynamic(() => import("../GlassSurface"), {
  ssr: false,
  loading: () => <div className="w-full h-16 bg-muted/50 animate-pulse" />,
});
import { useGetSettings } from "@/stores/use-get-settings";
import { useSettingsGlassSurfaceSelectors } from "@/stores/use-settings-glass-surface";
import { ThemeToggleButtonStyles } from "@/theme/theme-toggle-button";

import { Logo } from "./logo";
import { UserControl } from "./user-control";

export const Navbar = () => {
  const settings = useGetSettings();

  const onToggleNavbar = useSettingsGlassSurfaceSelectors.use.onToggleNavbar();

  const { isNavbarOpen, isDockOpen } = settings;

  useEffect(() => {
    if (!isNavbarOpen && !isDockOpen) onToggleNavbar();
  }, [isNavbarOpen, isDockOpen, onToggleNavbar]);

  return (
    <AnimatePresence>
      {isNavbarOpen && (
        <motion.div
          className="fixed top-6 flex justify-center items-center w-full z-50"
          initial={{
            y: -18,
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -50,
            opacity: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.3,
            stiffness: 260,
            damping: 10,
          }}
        >
          <GlassSurface
            width={`90%`}
            height={60}
            childClassName="flex w-full justify-between items-center px-10"
            {...settings}
          >
            <Logo />
            <div className="flex items-center justify-center gap-2">
              <ThemeToggleButtonStyles />
              <UserControl />
            </div>
          </GlassSurface>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
