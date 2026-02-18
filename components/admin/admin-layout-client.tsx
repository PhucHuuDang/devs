"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { SidebarContent } from "@/components/animate-ui/components/radix/sidebar";
import { SidebarDashboard } from "@/components/url-segment/dashboard/sidebar-dashboard";
import { ThemeProvider } from "@/providers/next-theme-provider";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarDashboard>{children}</SidebarDashboard>
    </ThemeProvider>
  );
}
