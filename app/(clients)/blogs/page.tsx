"use client";

import Link from "next/link";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { GetPostsQuery } from "@/app/graphql/__generated__/graphql";
import { GET_POSTS } from "@/app/graphql/queries/blog.queries";
import {
  BlogCard,
  BlogCardSkeleton,
} from "@/components/_url-segment/blog/blog-details-components/blog-card";
import { ListCategory } from "@/components/common/list-category.";
import { EmptyMediaGroup } from "@/components/empty-state/empty-media-group";
import { NetworkErrorPage } from "@/components/exceptions/network-error-page";

const BlogsPage = () => {
  const { data, loading, error, networkStatus } = useQuery<GetPostsQuery>(
    GET_POSTS,
    {
      ssr: true,
    },
  );

  if (loading) {
    return (
      <div className="mt-4 p-2 ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {Array.from({ length: 6 }).map((_: unknown, index: number) => {
            return <BlogCardSkeleton key={index} />;
          })}
        </div>
      </div>
    );
  }

  if (networkStatus === NetworkStatus.error) {
    return <NetworkErrorPage errorCode="NETWORK_CONNECTION_FAILED" />;
  }

  return (
    <>
      <div className="w-full px-2">
        <ListCategory />
      </div>
      <div className="mt-4 p-2 ">
        {data?.allPosts && data.allPosts.length === 0 && (
          <EmptyMediaGroup
            title="No Blogs Found"
            description="Create a new blog to get started"
            action={
              <Link prefetch href={"/create-blog"}>
                Create Blog
              </Link>
            }
            className="border-2 border-dashed border-gray-200 rounded-lg p-6 shadow-sm"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 ">
          {data?.allPosts?.map((post: GetPostsQuery["allPosts"][number]) => {
            const blogCardData = {
              title: post.title,
              description: post.description ?? "No description",
              mainImage: post.mainImage || "/default.jpg",
              views: post.views || 0,
              tags: post.tags,
              author: [
                {
                  id: post.author.id,
                  name: post.author.name,
                  image: post.author.avatarUrl ?? "/image.jpg",
                  designation: post.author.designation || "Author",
                },
              ],
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            };

            return <BlogCard key={post.id} {...blogCardData} isBorderHover />;
          })}
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
