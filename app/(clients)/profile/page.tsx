import React from "react";

import {
  GetSessionQuery,
  SessionModel,
  UserModel,
} from "@/app/graphql/__generated__/graphql";
import {
  GET_SESSION,
  GET_SESSION_STRING,
} from "@/app/graphql/mutaions/auth.mutations";
import { ThemeProvider } from "@/app/providers/next-theme-provider";
import { getAuthCookies, getSession } from "@/app/utils/cookies";
import { fetchGraphql } from "@/lib/graph-fetch";
import { isEmpty } from "lodash";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VercelTabs } from "@/components/ui/vercel-tabs";
import {
  BookIcon,
  BookmarkIcon,
  HeartIcon,
  MessageSquareIcon,
  UsersIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/animate-ui/components/radix/sidebar";
import { SidebarProfile } from "@/components/_url-segment/profile/sidebar-profile";
import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";

interface ProfilePageProps {
  children: React.ReactNode;
}

// export async function generateMetadata(): Promise<Metadata> {
//   const data = await getSession();

//   const session = data?.session;
//   const user = data?.user;

//   if (!user?.id) {
//     redirect("/auth");
//   }

//   return {
//     title: `${user?.name}'s Profile`,
//     description: `${user?.name} is a developer who shares their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.`,
//     openGraph: {
//       title: `${user?.name}'s Profile`,
//       description: `${user?.name} is a developer who shares their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.`,
//       images: [user?.avatarUrl ?? ""],
//     },
//     twitter: {
//       title: `${user?.name}'s Profile`,
//       description: `${user?.name} is a developer who shares their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.`,
//       images: [user?.avatarUrl ?? ""],
//     },
//   };
// }

const ProfilePage = async () => {
  const data = await getSession();
  const user = data?.user;

  // if (!user?.id) {
  //   redirect("/auth");
  // }

  // console.log({ user });
  return <SidebarInsetContent />;
};

export default ProfilePage;
