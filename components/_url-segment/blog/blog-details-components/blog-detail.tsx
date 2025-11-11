// // "use client";

// // import { useQuery } from "@apollo/client/react";

// import { Post } from "@/app/graphql/__generated__/graphql";
// import { SimpleLoading } from "@/components/_loading/simple-loading";
// import dynamic from "next/dynamic";
// import { BlogDetailWithMode } from "./blog-detail-with-mode.example";

// interface BlogDetailProps {
//   data: Post;
// }

// const PlateEditor = dynamic(
//   () =>
//     import("@/components/editor/plate-editor").then((mod) => mod.PlateEditor),
//   {
//     ssr: false,
//     loading() {
//       return <SimpleLoading />;
//     },
//   }
// );

// export const BlogDetail = ({ data }: BlogDetailProps) => {
//   console.log({ data });

//   return (
//     <BlogDetailWithMode data={data?.content || []} forcedMode="viewClient" />
//   );
// };
