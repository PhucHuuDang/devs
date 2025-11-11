"use client";

// import { useQuery } from "@apollo/client/react";

import { Post } from "@/app/graphql/__generated__/graphql";
import { SimpleLoading } from "@/components/_loading/simple-loading";
import dynamic from "next/dynamic";

interface BlogDetailProps {
  data: Post;
}

const PlateEditor = dynamic(
  () =>
    import("@/components/editor/plate-editor").then((mod) => mod.PlateEditor),
  {
    ssr: false,
    loading() {
      return <SimpleLoading />;
    },
  }
);

export const BlogDetail = ({ data }: BlogDetailProps) => {
  // const { data, loading, error } = useQuery(GET_POST_BY_SLUG_QUERY,
  //   variables: { slug },{
  //   fetchPolicy: "network-only",
  //   ssr: true,
  // });

  // if (loading) return <p>Đang tải...</p>;
  // if (error) return <p>Lỗi: {error.message}</p>;

  // console.log({ data });

  return (
    <PlateEditor
      value={data?.content || []}
      readonly={true}
      onChange={() => {}}
    />
  );
  // return <div></div>;
};
