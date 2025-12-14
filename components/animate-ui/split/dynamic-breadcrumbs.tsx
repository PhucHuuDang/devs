"use client";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, LucideIcon, SlashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";

interface BreadcrumbProps {
  icons?: LucideIcon[];
}

export const DynamicBreadcrumbs = ({ icons = [] }: BreadcrumbProps) => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const paths = pathname.split("/").filter(Boolean);

    return [
      {
        href: "/",
        label: "Home",
        icon: HomeIcon,
      },

      ...paths.map((path, i) => {
        const label = path.includes("-") ? path.replace("-", " ") : path;

        return {
          href: `/${paths.slice(0, i + 1).join("/")}`,
          label: label.charAt(0).toUpperCase() + label.slice(1),
          icon: icons?.[i],
        };
      }),
    ];
  }, [pathname, icons]);

  const LIMIT = 5;

  const isLimited = breadcrumbs.length > LIMIT;

  const first = breadcrumbs[0];

  const last = breadcrumbs[breadcrumbs.length - 1];

  const middle = breadcrumbs.slice(1, -1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isLimited ? (
          <>
            <BreadcrumbItem key={first.href}>
              <BreadcrumbLink
                href={first.href}
                className="flex items-center gap-1"
              >
                {first.icon && <first.icon className="size-4" />}
                {first.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <BreadcrumbEllipsis className="size-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-2 cursor-pointer">
                {middle.map((bread) => {
                  return (
                    <DropdownMenuItem
                      key={bread.href}
                      className="cursor-pointer flex justify-center items-center"
                    >
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={bread.href}
                          className="flex items-center gap-1"
                        >
                          <DropdownMenuLabel className="text-center flex items-center gap-1">
                            {bread.icon && <bread.icon className="size-4" />}
                            {bread.label}
                          </DropdownMenuLabel>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <BreadcrumbItem key={last.href}>
              <BreadcrumbLink href={last.href}>{last.label}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          breadcrumbs.map((bread, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={bread.href}>
                <BreadcrumbItem key={bread.href}>
                  <BreadcrumbLink
                    href={bread.href}
                    className="flex items-center gap-1"
                  >
                    {bread.icon && <bread.icon className="size-4" />}

                    {bread.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && (
                  <BreadcrumbSeparator key={`separator-${bread.href}`}>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
