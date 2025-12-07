import {
  GetSessionQuery,
  SessionModel,
  UserModel,
} from "@/app/graphql/__generated__/graphql";
import {
  GET_SESSION,
  GET_SESSION_STRING,
} from "@/app/graphql/mutaions/auth.mutations";
import { getAuthCookies, getSession } from "@/app/utils/cookies";
import { fetchGraphql } from "@/lib/graph-fetch";
import { isEmpty } from "lodash";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

interface ProfileLayoutProps {
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

const ProfileLayout = async ({ children }: ProfileLayoutProps) => {
  const data = await getSession();
  const user = data?.user;

  if (!user?.id) {
    redirect("/auth");
  }

  console.log({ user });

  return (
    <div className="min-h-screen w-full ">
      <div className="container mx-auto p-10">{children}</div>
    </div>
  );
};

export default ProfileLayout;
