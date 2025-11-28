"use client";

import {
  EllipsisVerticalIcon,
  FingerprintPattern,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRef, useState } from "react";
import { Kbd, KbdGroup } from "../ui/kbd";
import { SettingsSheet } from "./settings-sheet";
import Link from "next/link";
import { HoverCardCustom } from "../custom/hover-card-custom";
import { cn } from "@/lib/utils";
import { HoverCardItem } from "../ui/hover-card";

const trigger = (
  <div className="flex items-center gap-2 p-2 rounded-full cursor-pointer border border-primary hover:border-primary/80 transition-all duration-300">
    <EllipsisVerticalIcon className="size-6 cursor-pointer bg-primary/90 text-primary-foreground rounded-md hover:scale-105 hover:bg-primary/80 transition-transform duration-300" />

    <Avatar className="size-6">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>
        <UserIcon className="size-4" />
      </AvatarFallback>
    </Avatar>
  </div>
);

export const UserControl = () => {
  return (
    <HoverCardCustom
      trigger={trigger}
      openDelay={200}
      sideOffset={10}
      className="p-2"
    >
      <div className="w-[200px]">
        <HoverCardItem className="" onClick={() => {}}>
          <div className="flex items-center gap-1">
            <FingerprintPattern className="size-4" />
            Sign In
          </div>
          <KbdGroup>
            <Kbd>⌘b</Kbd>
          </KbdGroup>
        </HoverCardItem>

        {/* <HoverCardItem className="">
          <KbdGroup>
            <Kbd>⌘b</Kbd>
          </KbdGroup>
        </HoverCardItem> */}

        <SettingsSheet classNameTrigger="size-5 p-0" />

        <HoverCardItem className="" onClick={() => {}}>
          <div className="flex items-center gap-1">
            <FingerprintPattern className="size-4" />
            Sign In
          </div>
          <KbdGroup>
            <Kbd>⌘</Kbd>
          </KbdGroup>
        </HoverCardItem>

        <HoverCardItem className="" onClick={() => {}}>
          <div className="flex items-center gap-1">
            <FingerprintPattern className="size-4" />
            Sign In
          </div>
          <KbdGroup>
            <Kbd>⌘</Kbd>
          </KbdGroup>
        </HoverCardItem>
      </div>
    </HoverCardCustom>
  );
};
