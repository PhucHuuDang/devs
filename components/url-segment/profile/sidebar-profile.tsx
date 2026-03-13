"use client";

import * as React from "react";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  SidebarNavProjects,
  SidebarNavUser,
  SidebarTeamSwitcher,
} from "@/components/animate-ui/split/sidebar-chunks";
import { SIDEBAR_ROUTES } from "@/constants/sidebar-routes";
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
        <SidebarTeamSwitcher
          isMobile={isMobile}
          activeTeam={activeTeam as any}
          onTeamChangeAction={setActiveTeam}
          teams={{
            label: "Harry's Teams",
            items: SIDEBAR_ROUTES.teams?.items ?? [],
          }}
        />

        <SidebarContent>
          <SidebarNavProjects
            isMobile={isMobile}
            projects={{
              label: "Settings",
              items: SIDEBAR_ROUTES.projects?.items ?? [],
            }}
          />
        </SidebarContent>

        <SidebarNavUser user={SIDEBAR_ROUTES.user} isMobile={isMobile} />

        <SidebarRail />
      </Sidebar>

      {/* Breadcrumb */}

      {/* <SidebarInsetContent user={DATA.user} /> */}

      {children}
    </SidebarProvider>
  );
};
