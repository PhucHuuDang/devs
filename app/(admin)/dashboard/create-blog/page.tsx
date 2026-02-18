import { Metadata } from "next";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import { CreateBlog } from "@/components/url-segment/blog/blog-details-components/create-blog";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cooking Blog",
    description:
      "Cooking Blog is a platform for cooking enthusiasts to share their stories and learn from others, grow their skills and network with other cooking enthusiasts, and get hired, get freelance work, and more.",
  };
}

const CreateBlogPage = () => {
  return (
    <SidebarInsetContent>
      <CreateBlog />
    </SidebarInsetContent>
  );
};

export default CreateBlogPage;
