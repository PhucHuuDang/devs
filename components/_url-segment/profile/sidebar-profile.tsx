"use client";

import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/animate-ui/primitives/radix/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { GET_SESSION } from "@/app/graphql/mutaions/auth.mutations";
import { GetSessionQuery } from "@/app/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client/react";
import {
  DataProps,
  SidebarFooterChunk,
  SidebarGroupCollapseChunk,
  SidebarGroupProjectChunk,
  SidebarHeaderChunk,
  SidebarInsetContent,
  SidebarInsetHeader,
} from "@/components/animate-ui/split/sidebar-chunks";
import { SIDEBAR_ROUTES } from "@/app/constants/sidebar-routes";
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDown,
  CreditCardIcon,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react";

interface SidebarProfileProps {
  children: React.ReactNode;
}

export const SidebarProfile = ({ children }: SidebarProfileProps) => {
  const isMobile = useIsMobile();
  const [activeTeam, setActiveTeam] = React.useState(
    SIDEBAR_ROUTES.teams?.items?.[0] ?? {}
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
