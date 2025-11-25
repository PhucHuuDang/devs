import { CreateBlog } from "@/components/_blogs/create-blog";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cooking Blog",
    description:
      "Cooking Blog is a platform for cooking enthusiasts to share their stories and learn from others, grow their skills and network with other cooking enthusiasts, and get hired, get freelance work, and more.",
  };
}

const CreateBlogPage = () => {
  return (
    <>
      <CreateBlog />
    </>
  );
};

export default CreateBlogPage;
