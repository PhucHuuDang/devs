import React, { Suspense } from "react";

import dynamic from "next/dynamic";

import { Metadata } from "next";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";

const CreateBlog = dynamic(() =>
  import("@/components/_url-segment/blog/blog-details-components/create-blog").then(
    (mod) => mod.CreateBlog,
  ),
);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "My Cooking",
    description:
      "You can share your stories about experience in cooking, recipes, and more",

    openGraph: {
      title: "My Cooking",
      description:
        "You can share your stories about experience in cooking, recipes, and more",
    },

    twitter: {
      title: "My Cooking",
      description:
        "You can share your stories about experience in cooking, recipes, and more",
    },
  };
}

const MyCookingPage = () => {
  return (
    <Suspense>
      <SidebarInsetContent
        isSidebarInset={false}
        className="pt-0"
        isShowToggleTheme={false}
      >
        <CreateBlog />
      </SidebarInsetContent>
    </Suspense>
  );
};

export default MyCookingPage;
