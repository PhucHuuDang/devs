"use client";

import * as React from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  DataProps,
  SidebarFooterChunk,
  SidebarGroupCollapseChunk,
  SidebarGroupProjectChunk,
  SidebarHeaderChunk,
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
        {/* <SidebarHeaderChunk
          isMobile={isMobile}
          activeTeam={activeTeam as any}
          setActiveTeam={setActiveTeam}
          teams={{
            label: "Harry's Teams",
            items: SIDEBAR_ROUTES.teams?.items ?? [],
          }}
        /> */}

        <SidebarContent>
          <SidebarGroupProjectChunk
            isMobile={isMobile}
            projects={{
              label: "Dashboard",
              items: DASHBOARD_SIDEBAR.projects?.items ?? [],
            }}
          />

          <SidebarGroupCollapseChunk navMain={DASHBOARD_SIDEBAR.navMain} />
        </SidebarContent>

        <SidebarFooterChunk user={SIDEBAR_ROUTES.user} isMobile={isMobile} />
        <SidebarRail />
      </Sidebar>

      {/* Breadcrumb */}

      {/* <SidebarInsetContent user={DATA.user} /> */}

      {children}
    </SidebarProvider>
  );
};
