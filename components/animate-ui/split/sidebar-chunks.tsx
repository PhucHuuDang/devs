"use client";

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
        "flex h-16  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className,
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
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">{activeTeam.plan}</span>
                </div>
                <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-sidebar-accent"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={14}
            >
              <DropdownMenuLabel className="text-sm font-semibold text-center text-muted-foreground flex items-center gap-1 justify-center">
                <UserIcon className="size-4" />
                {teams?.label}
              </DropdownMenuLabel>
              {teams?.items.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <team.logo className="size-4 shrink-0" />
                    </div>
                    {team.name}
                  </div>
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 p-2 flex items-centers">
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

export const SidebarGroupCollapseChunk = ({
  navMain,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  navMain: DataProps["navMain"];
}) => {
  const pathName = usePathname();

  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupLabel>{navMain?.label}</SidebarGroupLabel>

      <SidebarMenu>
        {navMain?.items.map((item) => {
          const isActive = pathName === item.url;
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
                        "bg-white dark:bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-offset-1 ring-offset-background",
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isActiveChild = pathName === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              isActiveChild &&
                                "bg-white dark:bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-offset-1 ring-offset-background",
                            )}
                          >
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
  const pathName = usePathname();

  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupLabel>{projects?.label}</SidebarGroupLabel>

      <SidebarMenu>
        {projects?.items.map((item) => {
          const isActive = pathName === item.url;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                tooltip={item.name}
                className={cn(
                  isActive &&
                    "bg-white dark:bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-offset-1 ring-offset-background",
                )}
              >
                <Link prefetch href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>

              {item.dropdownItems && item.dropdownItems.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    className="min-w-52 rounded-lg bg-sidebar-accent p-1"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                    sideOffset={14}
                  >
                    {item?.dropdownItems?.map((dropdownItem, index) => {
                      const isActiveChild = pathName === dropdownItem.url;
                      return (
                        <DropdownMenuItem
                          key={dropdownItem.title}
                          onClick={dropdownItem?.onClick}
                          className={cn(
                            "flex justify-between items-center p-1 hover:bg-primary cursor-pointer",
                            isActiveChild &&
                              "bg-white dark:bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-offset-1 ring-offset-background",
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {<dropdownItem.icon />}
                            <span>{dropdownItem.title}</span>
                          </div>
                          <DropdownMenuShortcut>
                            ⌘{index + 1}
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      );
                    })}
                    <SidebarSeparator className="my-2" />

                    <SidebarMenuItem className="flex gap-2">
                      <MoreHorizontal className="ml-2" />
                      <span>More</span>
                    </SidebarMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
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
  className,
  classNameContainer,
  isShowSidebarInsetHeader = true,
  isShowToggleTheme = true,
}: {
  isSidebarInset?: boolean;
  children: React.ReactNode;
  className?: string;
  classNameContainer?: string;
  isShowSidebarInsetHeader?: boolean;
  isShowToggleTheme?: boolean;
}) => {
  return (
    <SidebarInset>
      {isShowSidebarInsetHeader && (
        <SidebarInsetHeader>
          <div
            className={cn(
              "flex items-center justify-between w-full px-1 ",
              classNameContainer,
            )}
          >
            <div className="flex items-center gap-2 px-4">
              {isSidebarInset && (
                <SidebarTrigger className="-ml-1 cursor-pointer" />
              )}
              <Separator
                orientation="vertical"
                className="mr-2 h-4 hover:text-accent-foreground"
              />
              <DynamicBreadcrumbs />
            </div>

            {isShowToggleTheme && (
              <div className="transition-colors z-20 duration-700 ease-in-out ">
                <CinematicThemeSwitcher size="sm" className="cursor-pointer" />
              </div>
            )}
          </div>
        </SidebarInsetHeader>
      )}

      <div className={cn("p-4", className)}>{children}</div>
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
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg "
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
