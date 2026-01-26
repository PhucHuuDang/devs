import { fetchGraphql } from "@/lib/graph-fetch";

import { PostModel } from "@/app/graphql/__generated__/generated";
import { GET_POSTS_STRING } from "@/app/graphql/queries/blog.queries";

import type { MetadataRoute } from "next";

export async function generateSitemaps() {
  const data = (await fetchGraphql<PostModel[]>(
    GET_POSTS_STRING,
  )) as PostModel[];

  return data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function sitemap(props: {
  slug: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const slug = await props.slug;

  const data = (await fetchGraphql<PostModel[]>(
    GET_POSTS_STRING,
  )) as PostModel[];

  return data.map((post) => {
    return {
      url: `https://www.devs.com/blogs/${post.slug}`,
      lastModified: post.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,

      images: (post.mainImage && [post.mainImage]) || [],
    };
  });
}
