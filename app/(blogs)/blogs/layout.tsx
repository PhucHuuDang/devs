import React from "react";

interface BlogsLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

const BlogsLayout = ({ sidebar, content }: BlogsLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r bg-gray-100 p-4">{sidebar}</aside>
      <main className="flex-1 p-6">{content}</main>
    </div>
  );
};

export default BlogsLayout;
