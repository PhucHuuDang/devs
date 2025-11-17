import { fetchGraphql } from "@/lib/graph-fetch";
import { MetadataRoute } from "next";
import { GET_POSTS_STRING } from "./graphql/queries/blog.queries";
import { GetPostsQuery } from "./graphql/__generated__/graphql";

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
    const { allPosts = [] } = await fetchGraphql<GetPostsQuery>(
      GET_POSTS_STRING
    );
    fetchRoutes = allPosts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: post.updatedAt ?? new Date(),
      changeFrequency: "weekly" as const,
    }));
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...sitemap, ...fetchRoutes];
}
