import { MetadataRoute } from "next";

import { fetchGraphql } from "@/lib/graph-fetch";

import { GetPublishedPostsQuery } from "./graphql/__generated__/generated";
import { GET_POSTS_STRING } from "./graphql/queries/blog.queries";

export const dynamic = "force-dynamic";
type Route = {
  url: string;
  lastModified: Date;
};
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [
    "/",
    "/blogs",
    // "/projects",
    // "/about",
    // "/contact",
    // "/login",
    // "/register",
  ];

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const sitemap = routesMap.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
  }));

  let fetchRoutes: Route[] = [];

  try {
    const response = await fetchGraphql<GetPublishedPostsQuery>(
      GET_POSTS_STRING,
      {
        filters: {
          page: 1,
          limit: 1000, // Include all published posts in sitemap
          sortBy: "createdAt",
          sortOrder: "desc",
        },
      },
    );

    if (response.publishedPosts.success === false) {
      return [];
    }

    fetchRoutes = response.publishedPosts.data.map((post) => ({
      url: `${baseUrl}/blogs/${post.slug}`,
      lastModified: post.createdAt ?? new Date(),
      changeFrequency: "weekly" as const,
    }));
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...sitemap, ...fetchRoutes];
}
