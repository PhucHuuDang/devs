"use client";

import React, { useMemo } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { type LucideIcon, HomeIcon, SlashIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/**
 * Configuration for a single breadcrumb item.
 */
export interface BreadcrumbItemConfig {
  href: string;
  label: string;
  icon?: LucideIcon;
  isPage?: boolean;
}

export interface DynamicBreadcrumbsProps {
  /**
   * Maximum number of breadcrumbs to show before collapsing middle items.
   * @default 5
   */
  limit?: number;
  /**
   * Optional icons mapping for path segments. The index corresponds to the segment position.
   */
  icons?: LucideIcon[];
  /**
   * Custom mapping for path segments to human-readable labels.
   * e.g. { 'changelog': 'Release Notes' }
   */
  mapping?: Record<string, string>;
  /**
   * Whether to show the home link as the first item.
   * @default true
   */
  showHome?: boolean;
  /**
   * Custom label for the home link.
   * @default "Home"
   */
  homeLabel?: string;
  /**
   * Custom icon for the home link.
   * @default HomeIcon
   */
  homeIcon?: LucideIcon;
  /**
   * Custom separator component between items.
   * @default <SlashIcon className="size-3" />
   */
  separator?: React.ReactNode;
  /**
   * Additional CSS classes for the root Breadcrumb container.
   */
  className?: string;
}

/**
 * Helper to format a URL segment into a readable label.
 */
const formatSegment = (segment: string, mapping?: Record<string, string>) => {
  if (mapping && mapping[segment]) return mapping[segment];
  const label = segment.replace(/-/g, " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
};

/**
 * DynamicBreadcrumbs Component
 *
 * Automatically generates breadcrumbs based on the current Next.js pathname.
 * Supports icon mapping, collapsing long paths, and custom labels.
 */
export const DynamicBreadcrumbs: React.FC<DynamicBreadcrumbsProps> = ({
  limit = 5,
  icons = [],
  mapping = {},
  showHome = true,
  homeLabel = "Home",
  homeIcon = HomeIcon,
  separator = <SlashIcon className="size-3" />,
  className,
}) => {
  const pathname = usePathname();

  /**
   * Generate the list of breadcrumb items based on the current URL.
   */
  const breadcrumbs = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const items: BreadcrumbItemConfig[] = [];

    if (showHome) {
      items.push({
        href: "/",
        label: homeLabel,
        icon: homeIcon,
      });
    }

    segments.forEach((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      items.push({
        href,
        label: formatSegment(segment, mapping),
        icon: icons?.[index],
        isPage: index === segments.length - 1,
      });
    });

    return items;
  }, [pathname, icons, mapping, showHome, homeLabel, homeIcon]);

  // Don't render if it's just the home page and showHome is false (or no paths)
  if (breadcrumbs.length <= (showHome ? 1 : 0) && pathname === "/") {
    return null;
  }

  const isCollapsed = breadcrumbs.length > limit;

  /**
   * Renders a single breadcrumb item (either a link or the current page).
   */
  const renderBreadcrumbItem = (item: BreadcrumbItemConfig) => {
    const Icon = item.icon;
    const content = (
      <>
        {Icon && (
          <Icon className="mr-1.5 size-4 shrink-0 transition-transform group-hover:scale-105" />
        )}
        <span className="truncate max-w-[150px] sm:max-w-none">
          {item.label}
        </span>
      </>
    );

    return (
      <BreadcrumbItem key={item.href} className="group">
        {item.isPage ? (
          <BreadcrumbPage className="flex items-center text-foreground font-medium">
            {content}
          </BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link
              href={item.href}
              className="flex items-center hover:text-foreground transition-all duration-200"
            >
              {content}
            </Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  };

  // Define segments to display when collapsed
  const head = isCollapsed ? [breadcrumbs[0]] : breadcrumbs.slice(0, -1);
  const tail = breadcrumbs[breadcrumbs.length - 1];
  const middle = isCollapsed ? breadcrumbs.slice(1, -1) : [];

  return (
    <Breadcrumb className={cn("select-none", className)}>
      <BreadcrumbList className="flex-nowrap">
        {/* Render first items/ancestors */}
        {head.map((item) => (
          <React.Fragment key={item.href}>
            {renderBreadcrumbItem(item)}
            <BreadcrumbSeparator className="opacity-50">
              {separator}
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}

        {/* Collapsed dropdown for deep hierarchies */}
        {isCollapsed && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Show more paths</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="min-w-[160px] animate-in fade-in-0 zoom-in-95"
                >
                  {middle.map((item) => (
                    <DropdownMenuItem key={item.href} className="p-0">
                      <Link
                        href={item.href}
                        className="flex w-full items-center gap-2 px-2 py-1.5 cursor-pointer"
                      >
                        {item.icon && (
                          <item.icon className="size-4 opacity-70" />
                        )}
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="opacity-50">
              {separator}
            </BreadcrumbSeparator>
          </>
        )}

        {/* Current page (tail) */}
        {tail && renderBreadcrumbItem(tail)}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
