"use client";

import Link from "next/link";

import { NetworkStatus } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import { GET_PUBLISHED_POSTS } from "@/app/graphql/queries/blog.queries";
import {
  BlogCard,
  BlogCardSkeleton,
} from "@/components/_url-segment/blog/blog-details-components/blog-card";
import { ListCategory } from "@/components/common/list-category.";
import { EmptyMediaGroup } from "@/components/empty-state/empty-media-group";
import { NetworkErrorPage } from "@/components/exceptions/network-error-page";

import type { GetPublishedPostsQuery } from "@/app/graphql/__generated__/graphql";

const BlogsPage = () => {
  const {
    data,
    dataState,
    loading,
    error,
    networkStatus,
    variables,
    fetchMore,
  } = useQuery<GetPublishedPostsQuery>(GET_PUBLISHED_POSTS, {
    variables: {
      filters: {
        // isPublished: true,
        page: 1,
        limit: 12,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  // console.log({ networkStatus });

  if (networkStatus === NetworkStatus.error || error) {
    return <NetworkErrorPage errorCode="NETWORK_CONNECTION_FAILED" />;
  }

  // Handle loading state
  if (loading && !data) {
    return (
      <div className="mt-4 p-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // console.log(data );
  // console.log({ dataState });

  const publishedPosts = data?.publishedPosts;

  const posts = publishedPosts?.data ?? [];
  const meta = publishedPosts?.meta ?? {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };

  if (posts.length === 0) {
    return (
      <EmptyMediaGroup
        title="No Blogs Found"
        description="There are no published blogs yet. Be the first to create one!"
        action="Create Blog"
        // action={
        //   <Link
        //     prefetch
        //     href="/create-blog"
        //     className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        //   >
        //     Create Blog
        //   </Link>
        // }
      />
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Category filter */}
      <div className="w-full px-2">
        <ListCategory />
      </div>

      {/* Blog posts grid */}
      <div className="mt-4 p-2">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              description={post.description ?? "No description available"}
              mainImage={post.mainImage ?? "/image.jpg"}
              views={post.views ?? 0}
              tags={post.tags ?? []}
              author={[
                {
                  id: post.author.id,
                  name: post.author.name ?? "Anonymous",
                  image: post.author.image ?? "/image.jpg",
                  designation: "Author",
                },
              ]}
              createdAt={new Date(post.createdAt)}
              updatedAt={new Date(post.createdAt)}
              isBorderHover
            />
          ))}
        </div>

        {/* Pagination info */}
        {meta && meta.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground">
            <p>
              Page {meta.page} of {meta.totalPages} • {meta.total} total posts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
