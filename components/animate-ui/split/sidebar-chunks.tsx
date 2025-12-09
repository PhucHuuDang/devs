import {
  ChevronRight,
  ChevronsUpDown,
  LucideIcon,
  MoreHorizontal,
  Plus,
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface UserProps {
  name: string;
  email: string;
  avatarUrl: string;
}

interface TeamProps {
  name: string;
  logo: LucideIcon;
  plan: string;
}

interface NavMainProps {
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

interface DataProps {
  user?: UserProps;
  teams?: TeamProps[];

  navMain: {
    label: string;
    items: NavMainProps[];
  };
  projects?: ProjectProps[];
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
  teams: {
    label: string;
    items: TeamProps[];
  };
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
                {teams.label}
              </DropdownMenuLabel>
              {teams.items.map((team, index) => (
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
      <SidebarGroupLabel>{navMain.label}</SidebarGroupLabel>

      <SidebarMenu>
        {navMain.items.map((item) => {
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
                            <a href={subItem.url}>
                              {subItem.logo && <subItem.logo />}
                              <span>{subItem.title}</span>
                            </a>
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
  projects: {
    label: string;
    items: ProjectProps[];
  };
}) => {
  return (
    <SidebarGroup
      className={cn("group-data-[collapsible=icon]:hidden", className)}
      {...props}
    >
      <SidebarGroupLabel>{projects.label}</SidebarGroupLabel>

      <SidebarMenu>
        {projects.items.map((item) => {
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
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

export const SidebarInsetContent = ({ user }: { user: UserProps }) => {
  return (
    <SidebarInset>
      <SidebarInsetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex  gap-2">
            <Avatar className="size-15">
              <AvatarImage
                src={user?.avatarUrl ?? "/image.jpg"}
                alt={user?.name ?? "N/A"}
              />
              <AvatarFallback>{user?.name?.charAt(0) ?? "N/A"}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-primary">
                {user?.name ?? "N/A"}
              </h2>
              <p className="text-sm text-primary font-semibold">
                Your personal account
              </p>
            </div>
          </div>
        </div>
      </SidebarInsetHeader>

      {/* Skeleton */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </SidebarInset>
  );
};
