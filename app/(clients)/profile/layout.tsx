import React from "react";

import { Metadata } from "next";

import { getSession } from "@/app/utils/cookies";
import { SidebarProfile } from "@/components/url-segment/profile/sidebar-profile";

interface ProfileLayoutProps {
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

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div>
      <div className="h-full p-2 md:p-4 lg:p-6">
        <SidebarProfile>{children}</SidebarProfile>
      </div>
    </div>
  );
};

export default ProfileLayout;
