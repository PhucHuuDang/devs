"use client";

import { forwardRef, useEffect, useState } from "react";

import Link from "next/link";

import { useMutation, useQuery } from "@apollo/client/react";
import {
  EllipsisVerticalIcon,
  FileUserIcon,
  FingerprintPattern,
  LogOut,
  NotebookTextIcon,
  UserIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import {
  GetSessionQuery,
  GetSessionResponse,
  SignOutMutation,
} from "@/app/graphql/__generated__/graphql";
import { GET_SESSION, SIGN_OUT } from "@/app/graphql/mutaions/auth.mutations";
import { getSessionData } from "@/app/utils/cookies";
import { useAuthClient } from "@/hooks/use-auth-client";

import { HoverCardCustom } from "../custom/hover-card-custom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HoverCardItem } from "../ui/hover-card";
import { Kbd, KbdGroup } from "../ui/kbd";

import { SettingsSheet } from "./settings-sheet";

type TriggerProps = {
  avatarUrl: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Trigger = forwardRef<HTMLDivElement, TriggerProps>(
  ({ avatarUrl = "", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "flex items-center gap-2  rounded-full cursor-pointer border border-primary hover:border-primary/80 transition-all duration-300 group",
          className,
        )}
      >
        <EllipsisVerticalIcon className="size-5 bg-primary/90 text-primary-foreground rounded-md hover:scale-105 hover:bg-primary/80 transition-transform duration-300 group-hover:bg-primary/80" />

        <Avatar className="size-6">
          {/* {avatarUrl ? <AvatarImage src={avatarUrl} /> : null} */}

          <AvatarImage src={avatarUrl ?? ""} />
          <AvatarFallback>
            <UserIcon className="size-5 group-hover:text-primary/80 transition-colors duration-300" />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  },
);

Trigger.displayName = "Trigger";

export const UserControl = () => {
  const { data: sessionData } = useQuery<GetSessionQuery>(GET_SESSION);

  const [
    signOutMutation,
    { loading, client, error, called, data: signOutData },
  ] = useMutation<SignOutMutation>(SIGN_OUT, {
    context: {
      fetchOptions: {
        credentials: "include",
      },
    },

    async onCompleted(data, clientOptions) {
      toast.success("Signed out successfully");
      await client.resetStore();
    },

    onError(error, clientOptions) {
      toast.error("Failed to sign out");
    },
  });

  // console.log({ sessionData });

  const { isAuth } = useAuthClient();

  return (
    <HoverCardCustom
      classNameTrigger="p-1"
      trigger={
        <Trigger avatarUrl={sessionData?.getSession?.user?.image ?? ""} />
      }
      asChild={true}
      openDelay={200}
      sideOffset={10}
      className="p-2"
    >
      <div className="w-[200px]">
        {!isAuth && (
          <Link href="/auth" prefetch>
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
        )}

        <SettingsSheet classNameTrigger="size-5 p-0" isHover />

        {isAuth && (
          <>
            <Link href="/create-blog" prefetch>
              <HoverCardItem className="">
                <div className="flex items-center gap-1">
                  <NotebookTextIcon className="size-4" />
                  Cooking Story
                </div>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                </KbdGroup>
              </HoverCardItem>
            </Link>

            <Link href="/profile" prefetch>
              <HoverCardItem className="">
                <div className="flex items-center gap-1">
                  <FileUserIcon className="size-4" />
                  Profile
                </div>
                <KbdGroup>
                  <Kbd>⌘</Kbd>
                </KbdGroup>
              </HoverCardItem>
            </Link>
          </>
        )}

        {isAuth && (
          <HoverCardItem
            className=""
            onClick={() => {
              signOutMutation();
            }}
          >
            <div className="flex items-center gap-1">
              <LogOut className="size-4" />
              Sign Out
            </div>
            <KbdGroup>
              <Kbd>⌘</Kbd>
            </KbdGroup>
          </HoverCardItem>
        )}
      </div>
    </HoverCardCustom>
  );
};
