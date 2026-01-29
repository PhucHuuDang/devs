"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeProvider } from "@/providers/next-theme-provider";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <AdminSidebar
          isCollapsed={isCollapsed}
          onCollapsedChange={setIsCollapsed}
        />
        <motion.main
          initial={false}
          animate={{
            marginLeft: isCollapsed ? 80 : 280,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn("min-h-screen transition-[margin]")}
        >
          <div className="container mx-auto p-6">{children}</div>
        </motion.main>
      </div>
    </ThemeProvider>
  );
}
