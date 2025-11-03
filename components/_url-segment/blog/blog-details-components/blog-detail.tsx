"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POST_BY_SLUG } from "@/app/graphql/queries/post.queries";

export const BlogDetail = ({ slug }: { slug: string }) => {
  const { data, loading, error } = useQuery(GET_POST_BY_SLUG, {
    variables: { slug },
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  console.log({ data });

  return <div></div>;
};
