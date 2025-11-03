"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "@/app/queries/queries/post.queries";

const BlogsPage = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  console.log({ data });

  return <div>BlogsPage</div>;
};

export default BlogsPage;
