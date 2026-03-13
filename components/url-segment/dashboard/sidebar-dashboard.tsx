"use client";

import * as React from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  SidebarNavMain,
  SidebarNavProjects,
} from "@/components/animate-ui/split/sidebar-chunks";
import { DASHBOARD_SIDEBAR, SIDEBAR_ROUTES } from "@/constants/sidebar-routes";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarDashboardProps {
  children: React.ReactNode;
}

export const SidebarDashboard = ({ children }: SidebarDashboardProps) => {
  const isMobile = useIsMobile();
  const [activeTeam, setActiveTeam] = React.useState(
    SIDEBAR_ROUTES.teams?.items?.[0] ?? {},
  );

  if (!activeTeam) return null;

  return (
    <SidebarProvider className="">
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarNavProjects
            isMobile={isMobile}
            projects={{
              label: "Dashboard",
              items: DASHBOARD_SIDEBAR.projects?.items ?? [],
            }}
          />

          <SidebarNavMain navMain={DASHBOARD_SIDEBAR.navMain} />
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      {/* Breadcrumb */}

      {/* <SidebarInsetContent user={DATA.user} /> */}

      {children}
    </SidebarProvider>
  );
};
