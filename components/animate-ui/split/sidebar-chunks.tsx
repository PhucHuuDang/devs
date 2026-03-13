"use client";

import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuAction,
  SidebarSeparator,
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
} from "@/components/animate-ui/primitives/radix/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CinematicThemeSwitcher } from "@/components/ui/cinematic-theme-switcher";
import { Separator } from "@/components/ui/separator";

import { DynamicBreadcrumbs } from "./dynamic-breadcrumbs";

// --- Types ---

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

export interface NavMainItemProps {
  title: string;
  url: string;
  logo?: LucideIcon;
}

export interface NavMainProps {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items: NavMainItemProps[];
}

export interface ProjectProps {
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

// --- Internal Helper ---

const ActiveLink = ({
  href,
  children,
  className,
  activeClassName,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
} & React.ComponentPropsWithoutRef<typeof Link>) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    >
      {children}
    </Link>
  );
};

// --- Modern Components ---

/**
 * Team Switcher component for the sidebar header.
 * Allows switching between different workspace teams.
 */
export const SidebarTeamSwitcher = ({
  teams,
  activeTeam,
  onTeamChangeAction,
  isMobile,
}: {
  teams: DataProps["teams"];
  activeTeam: TeamProps;
  onTeamChangeAction: (team: TeamProps) => void;
  isMobile: boolean;
}) => {
  if (!teams) return null;

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
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs opacity-70">
                    {activeTeam.plan}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5 flex items-center gap-1">
                <UserIcon className="size-3" />
                {teams.label}
              </DropdownMenuLabel>
              {teams.items.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => onTeamChangeAction(team)}
                  className="gap-2 p-2 cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <team.logo className="size-4 shrink-0" />
                  </div>
                  <span className="flex-1 truncate">{team.name}</span>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <span className="font-medium text-muted-foreground">
                  Add team
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

/**
 * Main navigation group with support for nested items and collapsibles.
 */
export const SidebarNavMain = ({
  navMain,
  className,
  ...props
}: React.ComponentProps<typeof SidebarGroup> & {
  navMain?: DataProps["navMain"];
}) => {
  const pathname = usePathname();
  if (!navMain) return null;

  return (
    <SidebarGroup className={className} {...props}>
      {navMain.label && <SidebarGroupLabel>{navMain.label}</SidebarGroupLabel>}
      <SidebarMenu>
        {navMain.items.map((item) => {
          const isActive = pathname === item.url;
          const hasChildren = item.items && item.items.length > 0;

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    isActive &&
                      "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  )}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      isActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <ActiveLink
                            href={subItem.url}
                            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium ring-1 ring-ring"
                          >
                            {subItem.logo && <subItem.logo />}
                            <span>{subItem.title}</span>
                          </ActiveLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
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

/**
 * Project navigation group with support for dropdown actions per project.
 */
export const SidebarNavProjects = ({
  projects,
  isMobile,
  className,
  ...props
}: React.ComponentProps<typeof SidebarGroup> & {
  isMobile: boolean;
  projects?: DataProps["projects"];
}) => {
  const pathname = usePathname();
  if (!projects) return null;

  return (
    <SidebarGroup className={className} {...props}>
      {projects.label && (
        <SidebarGroupLabel>{projects.label}</SidebarGroupLabel>
      )}
      <SidebarMenu>
        {projects.items.map((item) => {
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                className={cn(
                  isActive &&
                    "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                )}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>

              {item.dropdownItems && item.dropdownItems.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">Toggle Menu</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-48 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    {item.dropdownItems.map((dropdownItem) => (
                      <DropdownMenuItem
                        key={dropdownItem.title}
                        onClick={dropdownItem.onClick}
                        className="cursor-pointer"
                      >
                        {dropdownItem.url ? (
                          <Link
                            href={dropdownItem.url}
                            className="flex items-center gap-2 w-full"
                          >
                            <dropdownItem.icon className="size-4" />
                            <span>{dropdownItem.title}</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2 w-full">
                            <dropdownItem.icon className="size-4" />
                            <span>{dropdownItem.title}</span>
                          </div>
                        )}
                      </DropdownMenuItem>
                    ))}
                    <SidebarSeparator className="my-2" />
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <MoreHorizontal className="size-4" />
                      <span>More Actions</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

/**
 * User profile and settings menu in the sidebar footer.
 */
export const SidebarNavUser = ({
  user,
  isMobile,
}: {
  user?: UserProps;
  isMobile: boolean;
}) => {
  if (!user) return null;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs opacity-70">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
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
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs opacity-70">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <SparklesIcon className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <BadgeCheckIcon className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <CreditCardIcon className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <BellIcon className="mr-2 h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

// --- Sidebar Inset Compound Components ---

/**
 * Header for the SidebarInset area. Use composition to add triggers, breadcrumbs, etc.
 */
export const SidebarInsetHeader = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <header
    className={cn(
      "flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-30",
      className,
    )}
  >
    {children}
  </header>
);

/**
 * Main content area for the SidebarInset.
 */
export const SidebarInsetContentArea = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex-1 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500",
      className,
    )}
  >
    {children}
  </div>
);

/**
 * Utility for header actions (like theme switcher).
 */
export const SidebarInsetActions = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("ml-auto flex items-center gap-2", className)}>
    {children}
  </div>
);

/**
 * Modern Sidebar Inset Layout container.
 */
export const SidebarInsetContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <SidebarInset
    className={cn("flex flex-col flex-1 overflow-hidden", className)}
  >
    {children}
  </SidebarInset>
);

// --- Compound Component Namespace ---

export const SidebarChunks = {
  TeamSwitcher: SidebarTeamSwitcher,
  NavMain: SidebarNavMain,
  NavProjects: SidebarNavProjects,
  NavUser: SidebarNavUser,
  Inset: {
    Container: SidebarInsetContainer,
    Header: SidebarInsetHeader,
    Content: SidebarInsetContentArea,
    Actions: SidebarInsetActions,
  },
};

// --- Backward Compatibility ---

/** @deprecated Use SidebarTeamSwitcher instead */
export const SidebarHeaderChunk = ({ onTeamChangeAction, ...props }: any) => (
  <SidebarTeamSwitcher onTeamChangeAction={onTeamChangeAction} {...props} />
);
/** @deprecated Use SidebarNavMain instead */
export const SidebarGroupCollapseChunk = SidebarNavMain;
/** @deprecated Use SidebarNavProjects instead */
export const SidebarGroupProjectChunk = SidebarNavProjects;
/** @deprecated Use SidebarNavUser instead */
export const SidebarFooterChunk = SidebarNavUser;

/** @deprecated Use SidebarChunks.Inset wrapper instead */
export const SidebarInsetContent = ({
  children,
  className,
  isShowSidebarInsetHeader = true,
  isShowToggleTheme = true,
  isSidebarInset = true,
}: any) => (
  <SidebarInsetContainer>
    {isShowSidebarInsetHeader && (
      <SidebarInsetHeader>
        <div className="flex items-center gap-2">
          {isSidebarInset && <SidebarTrigger className="-ml-1" />}
          <Separator orientation="vertical" className="h-4" />
          <DynamicBreadcrumbs />
        </div>
        {isShowToggleTheme && (
          <SidebarInsetActions>
            <CinematicThemeSwitcher size="sm" />
          </SidebarInsetActions>
        )}
      </SidebarInsetHeader>
    )}
    <SidebarInsetContentArea className={className}>
      {children}
    </SidebarInsetContentArea>
  </SidebarInsetContainer>
);
