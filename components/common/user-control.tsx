"use client";

import {
  EllipsisVerticalIcon,
  FingerprintPattern,
  NotebookTextIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Kbd, KbdGroup } from "../ui/kbd";
import { SettingsSheet } from "./settings-sheet";
import Link from "next/link";
import { HoverCardCustom } from "../custom/hover-card-custom";
import { cn } from "@/lib/utils";
import { HoverCardItem } from "../ui/hover-card";
import { getSessionData } from "@/app/utils/cookies";
import { useQuery } from "@apollo/client/react";
import {
  GetSessionQuery,
  GetSessionResponse,
} from "@/app/graphql/__generated__/graphql";
import { GET_SESSION } from "@/app/graphql/mutaions/auth.mutations";

import { forwardRef } from "react";

type TriggerProps = {
  avatarUrl: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
  (
    { avatarUrl = "https://github.com/shadcn.png", className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "flex items-center gap-2  rounded-full cursor-pointer border border-primary hover:border-primary/80 transition-all duration-300",
          className
        )}
      >
        <EllipsisVerticalIcon className="size-5 bg-primary/90 text-primary-foreground rounded-md hover:scale-105 hover:bg-primary/80 transition-transform duration-300" />

        <Avatar className="size-6">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  }
);

Trigger.displayName = "Trigger";

export const UserControl = () => {
  const { data: sessionData } = useQuery<GetSessionQuery>(GET_SESSION);
  console.log({ sessionData });

  return (
    <HoverCardCustom
      classNameTrigger="p-1"
      trigger={
        <Trigger avatarUrl={sessionData?.getSession?.user?.image ?? ""} />
        // test
      }
      asChild={true}
      openDelay={200}
      sideOffset={10}
      className="p-2"
    >
      <div className="w-[200px]">
        <Link href="/sign-in" prefetch>
          <HoverCardItem className="" onClick={() => {}}>
            <div className="flex items-center gap-1">
              <FingerprintPattern className="size-4" />
              Sign In
            </div>
            <KbdGroup>
              <Kbd>⌘b</Kbd>
            </KbdGroup>
          </HoverCardItem>
        </Link>

        {/* <HoverCardItem className="">
          <KbdGroup>
            <Kbd>⌘b</Kbd>
          </KbdGroup>
        </HoverCardItem> */}

        <SettingsSheet classNameTrigger="size-5 p-0" />

        {sessionData?.getSession.user && (
          <Link href="/create-blog" prefetch>
            <HoverCardItem className="" onClick={() => {}}>
              <div className="flex items-center gap-1">
                <NotebookTextIcon className="size-4" />
                Cooking Story
              </div>
              <KbdGroup>
                <Kbd>⌘</Kbd>
              </KbdGroup>
            </HoverCardItem>
          </Link>
        )}

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
