import { GetPostsQuery } from "@/app/graphql/__generated__/graphql";
import { GET_POSTS_STRING } from "@/app/graphql/queries/blog.queries";
import { fetchGraphql } from "@/lib/graph-fetch";
import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function sitemap(props: {
  slug: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const slug = await props.slug;

  const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(GET_POSTS_STRING);

  return allPosts.map((post) => {
    return {
      url: `https://www.devs.com/blogs/${post.slug}`,
      lastModified: post.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,

      images: (post.mainImage && [post.mainImage]) || [],
    };
  });
}
