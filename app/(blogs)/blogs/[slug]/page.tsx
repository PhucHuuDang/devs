import { BlogDetail } from "@/components/_url-segment/blog/blog-details-components/blog-detail";
interface SlugBlogPageProps {
  params: Promise<{ slug: string }>;
}

const SlugBlogPage = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;

  return <BlogDetail slug={slug} />;
};

export default SlugBlogPage;
