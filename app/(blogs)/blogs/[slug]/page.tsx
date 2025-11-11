import {
  GetPostsQuery,
  Post,
  Query,
  QueryFindPostBySlugArgs,
} from "@/app/graphql/__generated__/graphql";
import {
  GET_POST_BY_SLUG,
  GET_POSTS_STRING,
} from "@/app/graphql/queries/post.queries";
import { BlogDetail } from "@/components/_url-segment/blog/blog-details-components/blog-detail";
import { fetchGraphql } from "@/lib/graph-fetch";
interface SlugBlogPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 120;

export const generateMetadata = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;
  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  const post = allPosts.find((post) => post.slug === slug);
  console.log({ post });
  return {
    title: post?.title,
  };
};

export async function generateStaticParams() {
  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const SlugBlogPage = async ({ params }: SlugBlogPageProps) => {
  const { slug } = await params;

  // const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  console.log({ allPosts });

  const { findPostBySlug = {} as Query["findPostBySlug"] } =
    await fetchGraphql<Query>(GET_POST_BY_SLUG, {
      slug,
    });

  console.log({ findPostBySlug });

  // console.log({ allPosts });

  return <BlogDetail data={findPostBySlug} />;
};

export default SlugBlogPage;
