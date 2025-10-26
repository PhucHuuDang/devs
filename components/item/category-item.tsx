"use client";

import { cn } from "@/lib/utils";
import GlareHover from "../react-bits/glare-hover";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { LucideIcon, TagIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface CategoryItemProps {
  title: string;
  icon?: LucideIcon;
  className?: string;
  active?: boolean;
}

export const CategoryItem = ({
  title,
  icon: Icon = TagIcon,
  className,
  active = false,
}: CategoryItemProps) => {
  const { themes } = useTheme();

  const isDark = themes.includes("dark");

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative", className)}
    >
      <GlareHover
        // glareColor={isDark ? "oklch(96.8% 0.007 247.896)" : "#ff9a5a"}
        glareColor="oklch(76.9% 0.188 70.08)"
        glareOpacity={0.4}
        glareAngle={-35}
        glareSize={300}
        transitionDuration={900}
        width="150px"
        height="40px"
        background={active ? "var(--foreground)" : "var(--background)"}
        borderRadius="20px"
        borderColor="var(--border)"
        // className={cn(
        //   "p-3 sm:p-4 rounded-2xl border border-border hover:border-primary/40 transition-colors",
        //   "shadow-sm hover:shadow-md backdrop-blur-sm",
        //   "flex items-center justify-center text-center  min-w-20 min-h-20 "
        // )}

        className="rounded-2xl hover:border-primary/40 transition-all p-1 hover:shadow-md flex items-center mx-auto min-w-20"
      >
        <div className="flex items-center gap-2 ">
          <Icon
            size={22}
            className={cn(
              "transition-colors",
              active
                ? "text-background"
                : "text-foreground/70 group-hover:text-primary"
            )}
          />
          <span
            className={cn(
              "text-xs sm:text-sm font-medium",
              active ? "text-background" : "text-foreground/80"
            )}
          >
            {title}
          </span>
        </div>

        {/* {active && (
          <Badge
            className="absolute top-2 right-2 bg-primary text-primary-foreground"
            variant="secondary"
          >
            Active
          </Badge>
        )} */}
      </GlareHover>
    </motion.div>
  );
};
