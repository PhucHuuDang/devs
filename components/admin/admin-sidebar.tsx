"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    href: "/admin/dashboard/posts",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/admin/dashboard/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function AdminSidebar({
  isCollapsed = false,
  onCollapsedChange,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r bg-gradient-to-b from-card via-card to-card/95 backdrop-blur-sm",
      )}
    >
      {/* Header with gradient */}
      <div className="relative flex h-16 items-center justify-between border-b px-4 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 relative z-10"
          >
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary to-primary/50 opacity-30 blur-sm" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Admin
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                Dashboard
              </span>
            </div>
          </motion.div>
        )}

        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <Sparkles className="h-4 w-4" />
            </div>
          </motion.div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 hover:bg-primary/10 transition-all duration-200 relative z-10",
            isCollapsed && "mx-auto",
          )}
          onClick={() => onCollapsedChange?.(!isCollapsed)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            const linkContent = (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-[1.02]",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center transition-transform duration-200",
                      !isActive && "group-hover:scale-110",
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1"
                    >
                      {item.title}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-primary/90"
                      style={{ zIndex: -1 }}
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  {/* Hover glow effect */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                      !isActive && "group-hover:opacity-100",
                      "bg-gradient-to-r from-primary/10 to-transparent",
                    )}
                  />
                </Link>
              </motion.div>
            );

            if (isCollapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.href}>{linkContent}</div>;
          })}
        </TooltipProvider>
      </nav>

      {/* Footer with user info */}
      <div className="border-t p-3 space-y-3">
        {/* User info section */}
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-2 rounded-xl bg-muted/50"
          >
            <Avatar className="h-8 w-8 ring-2 ring-primary/20">
              <AvatarImage src="/image.jpg" alt="Admin" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-xs">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">
                admin@devs.com
              </p>
            </div>
          </motion.div>
        )}

        {/* Logout button */}
        <TooltipProvider delayDuration={0}>
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group transition-all duration-200"
            >
              <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </Button>
          )}
        </TooltipProvider>
      </div>
    </motion.aside>
  );
}
