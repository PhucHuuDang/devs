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

interface ProfilePageProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSession();

  const session = data?.session;
  const user = data?.user;

  if (!user?.id) {
    redirect("/auth");
  }

  return {
    title: `${user?.name}'s Profile`,
    description: `${user?.name} is a developer who shares their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.`,
    openGraph: {
      title: `${user?.name}'s Profile`,
      description: `${user?.name} is a developer who shares their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.`,
      images: [user?.avatarUrl ?? ""],
    },
    twitter: {
      title: `${user?.name}'s Profile`,
      description: `${user?.name} is a developer who shares their stories and learn from others, grow their skills and network with other developers, and get hired, get freelance work, and more.`,
      images: [user?.avatarUrl ?? ""],
    },
  };
}

const ProfilePage = async () => {
  const data = await getSession();
  const user = data?.user;

  if (!user?.id) {
    redirect("/auth");
  }

  console.log({ user });
  return (
    <div className=" w-full h-full p-4 rounded-sm mx-auto max-w-7xl">
      <div className=" w-full h-full p-4 rounded-sm">
        <div className="flex  gap-2">
          <Avatar className="size-15">
            <AvatarImage src={user?.avatarUrl ?? ""} alt={user?.name ?? ""} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-primary">{user?.name}</h2>
            <p className="text-sm text-primary font-semibold">
              Your personal account
            </p>
          </div>
        </div>

        <div className="my-4 bg-green-500" />

        <div className="flex flex-col">
          <VercelTabs
            tabs={[
              {
                id: "posts",
                label: "Posts",
                icon: <BookIcon className="size-4" />,
              },
              {
                id: "comments",
                label: "Comments",
                icon: <MessageSquareIcon />,
              },

              {
                id: "saved",
                label: "Saved",
                icon: <BookmarkIcon />,
              },

              {
                id: "liked",
                label: "Liked",
                icon: <HeartIcon />,
              },

              {
                id: "followers",
                label: "Followers",
                icon: <UsersIcon />,
              },
            ]}
            className="w-full  flex flex-col"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
