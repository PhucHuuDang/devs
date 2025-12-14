"use client";

import {
  BadgeCheckIcon,
  BellIcon,
  ChevronRight,
  ChevronsUpDown,
  CreditCardIcon,
  LogOutIcon,
  LucideIcon,
  MoreHorizontal,
  Plus,
  SparklesIcon,
} from "lucide-react";
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

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DynamicBreadcrumbs } from "./dynamic-breadcrumbs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface UserProps {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface TeamProps {
  name: string;
  logo: LucideIcon;
  plan: string;
}

export interface NavMainProps {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;

  items: NavMainItemProps[];
}

interface NavMainItemProps {
  title: string;
  url: string;
  logo?: LucideIcon;
}

interface ProjectProps {
  name: string;
  url: string;
  icon: LucideIcon;
  dropdownItems?: {
    title: string;
    icon: LucideIcon;
    url: string;
    onClick?: () => void;
  }[];
}

export interface DataProps {
  user?: UserProps;
  teams?: {
    label: string;
    items: TeamProps[];
  };

  navMain?: {
    label: string;
    items: NavMainProps[];
  };
  projects?: {
    label: string;
    items: ProjectProps[];
  };
}

export const SidebarInsetHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className
      )}
    >
      {children}
    </header>
  );
};

export const SidebarHeaderChunk = ({
  isMobile,
  activeTeam,
  setActiveTeam,
  teams,
}: {
  isMobile: boolean;
  activeTeam: TeamProps;
  setActiveTeam: (team: TeamProps) => void;
  teams: DataProps["teams"];
}) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {teams?.label}
              </DropdownMenuLabel>
              {teams?.items.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export const SidebarGroupCollapseChunk = ({
  navMain,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  navMain: DataProps["navMain"];
}) => {
  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupLabel>{navMain?.label}</SidebarGroupLabel>

      <SidebarMenu>
        {navMain?.items.map((item) => {
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link prefetch href={subItem.url}>
                              {subItem.logo && <subItem.logo />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export const SidebarGroupProjectChunk = ({
  projects,
  isMobile,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  isMobile: boolean;
  projects: DataProps["projects"];
}) => {
  return (
    <SidebarGroup
      className={cn("group-data-[collapsible=icon]:hidden", className)}
      {...props}
    >
      <SidebarGroupLabel>{projects?.label}</SidebarGroupLabel>

      <SidebarMenu>
        {projects?.items.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link prefetch href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  {item?.dropdownItems?.map((dropdownItem) => {
                    return (
                      <DropdownMenuItem
                        key={dropdownItem.title}
                        onClick={dropdownItem?.onClick}
                      >
                        {<dropdownItem.icon />}
                        <span>{dropdownItem.title}</span>
                      </DropdownMenuItem>
                    );
                  })}

                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                      <MoreHorizontal className="text-sidebar-foreground/70" />
                      <span>More</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export const SidebarInsetContent = ({
  isSidebarInset = true,
  children,
}: {
  isSidebarInset: boolean;
  children: React.ReactNode;
}) => {
  return (
    <SidebarInset>
      <SidebarInsetHeader>
        <div className="">
          <div className="flex items-center gap-2 px-4">
            {/* <div className="mb-4 " /> */}
            {isSidebarInset && <SidebarTrigger className="-ml-1" />}
            <Separator orientation="vertical" className="mr-2 h-4" />

            <DynamicBreadcrumbs />
          </div>
        </div>
      </SidebarInsetHeader>

      {children}
    </SidebarInset>
  );
};

export const SidebarFooterChunk = ({
  user,
  isMobile,
}: {
  user: DataProps["user"];
  isMobile: boolean;
}) => {
  if (!user) return null;

  return (
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
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
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
                    <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <SparklesIcon />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      {/* Nav User */}
    </SidebarFooter>
  );
};
