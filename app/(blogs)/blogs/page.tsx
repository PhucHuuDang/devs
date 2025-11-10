"use client";

import {
  GetPostsQuery,
  GetPostsQueryResult,
  Post,
} from "@/app/graphql/__generated__/graphql";
import { GET_POSTS } from "@/app/graphql/queries/post.queries";
import { BlogCard, BlogCardProps } from "@/components/_blogs/blog-card";
import { useQuery } from "@apollo/client/react";
import React from "react";

const BlogsPage = () => {
  const { data, loading, error } = useQuery<GetPostsQuery>(GET_POSTS, {
    ssr: true,
  });

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  console.log({ data });

  return (
    <div className="mt-4 p-2 ">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data?.allPosts?.map((post) => {
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
