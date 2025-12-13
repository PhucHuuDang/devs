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
import {
  ActivityIcon,
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChefHatIcon,
  ChevronsUpDown,
  Command,
  CreditCard,
  Folder,
  Forward,
  GalleryVerticalEnd,
  LogOut,
  MonitorCogIcon,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { GET_SESSION } from "@/app/graphql/mutaions/auth.mutations";
import { GetSessionQuery } from "@/app/graphql/__generated__/graphql";
import { useQuery } from "@apollo/client/react";
import {
  DataProps,
  SidebarGroupCollapseChunk,
  SidebarGroupProjectChunk,
  SidebarHeaderChunk,
  SidebarInsetContent,
  SidebarInsetHeader,
} from "@/components/animate-ui/split/sidebar-chunks";

const DATA: DataProps = {
  user: {
    name: "Skyleen",
    email: "skyleen@example.com",
    avatarUrl:
      "https://pbs.twimg.com/profile_images/1909615404789506048/MTqvRsjo_400x400.jpg",
  },
  teams: {
    label: "Harry's Teams",
    items: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
  },
  navMain: {
    label: "Platform",
    items: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  },
  projects: {
    label: "Settings",
    items: [
      {
        name: "General",
        url: "/profile/general",
        icon: MonitorCogIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },
      {
        name: "Activities",
        url: "/profile/activities",
        icon: ActivityIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },
      {
        name: "My Cooking",
        url: "/profile/my-cooking",
        icon: ChefHatIcon,
        dropdownItems: [
          {
            title: "View Project",
            icon: Folder,
            url: "#",
          },
          {
            title: "Share Project",
            icon: Forward,
            url: "#",
          },
          {
            title: "Delete Project",
            icon: Trash2,
            url: "#",
          },
        ],
      },
    ],
  },
};

interface SidebarProfileProps {
  children: React.ReactNode;
}

export const SidebarProfile = ({ children }: SidebarProfileProps) => {
  const isMobile = useIsMobile();
  const [activeTeam, setActiveTeam] = React.useState(
    DATA.teams?.items?.[0] ?? {}
  );

  const { data: sessionData } = useQuery<GetSessionQuery>(GET_SESSION);

  const user = sessionData?.getSession.user;

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
            items: DATA.teams?.items ?? [],
          }}
        />

        <SidebarContent>
          {/* <SidebarGroupCollapseChunk
            navMain={{ label: "Platform", items: DATA.navMain }}
          /> */}

          {/* Nav Project */}
          <SidebarGroupProjectChunk
            isMobile={isMobile}
            projects={{ label: "Settings", items: DATA.projects?.items ?? [] }}
          />

          <SidebarGroupProjectChunk
            isMobile={isMobile}
            projects={{ label: "Platform", items: DATA.projects?.items ?? [] }}
          />

          {/* Nav Project */}
        </SidebarContent>

        <SidebarFooter>
          {/* Nav User */}
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={DATA.user?.avatarUrl}
                        alt={DATA.user?.name}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {DATA.user?.name}
                      </span>
                      <span className="truncate text-xs">
                        {DATA.user?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={DATA.user?.avatarUrl}
                          alt={DATA.user?.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          CN
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {DATA.user?.name}
                        </span>
                        <span className="truncate text-xs">
                          {DATA.user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <BadgeCheck />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
          {/* Nav User */}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Breadcrumb */}
      {/* <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div> */}
      {/* <SidebarInsetContent user={DATA.user} /> */}

      {children}
    </SidebarProvider>
  );
};
