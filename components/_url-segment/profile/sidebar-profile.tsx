"use client";

import * as React from "react";

import { SIDEBAR_ROUTES } from "@/app/constants/sidebar-routes";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  SidebarFooterChunk,
  SidebarGroupProjectChunk,
  SidebarHeaderChunk,
} from "@/components/animate-ui/split/sidebar-chunks";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProfileProps {
  children: React.ReactNode;
}

export const SidebarProfile = ({ children }: SidebarProfileProps) => {
  const isMobile = useIsMobile();
  const [activeTeam, setActiveTeam] = React.useState(
    SIDEBAR_ROUTES.teams?.items?.[0] ?? {},
  );

  if (!activeTeam) return null;

  return (
    <SidebarProvider className="">
      <Sidebar collapsible="none">
        <SidebarHeaderChunk
          isMobile={isMobile}
          activeTeam={activeTeam as any}
          setActiveTeam={setActiveTeam}
          teams={{
            label: "Harry's Teams",
            items: SIDEBAR_ROUTES.teams?.items ?? [],
          }}
        />

        <SidebarContent>
          {/* <SidebarGroupCollapseChunk
            navMain={{ label: "Platform", items: SIDEBAR_ROUTES.navMain }}
          /> */}

          {/* Nav Project */}
          <SidebarGroupProjectChunk
            isMobile={isMobile}
            projects={{
              label: "Settings",
              items: SIDEBAR_ROUTES.projects?.items ?? [],
            }}
          />

          <SidebarGroupProjectChunk
            isMobile={isMobile}
            projects={{
              label: "Platform",
              items: SIDEBAR_ROUTES.projects?.items ?? [],
            }}
          />
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
