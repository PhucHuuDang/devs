"use client";

import { GetPostsQuery, Post } from "@/app/graphql/__generated__/graphql";
import { GET_POSTS } from "@/app/graphql/queries/blog.queries";
import { BlogCard, BlogCardSkeleton } from "@/components/_blogs/blog-card";
import { useQuery } from "@apollo/client/react";

const BlogsPage = () => {
  const { data, loading, error } = useQuery<GetPostsQuery>(GET_POSTS, {
    ssr: true,
  });

  console.log({ loading });

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

  return (
    <div className="mt-4 p-2 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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
  );
};

export default BlogsPage;
