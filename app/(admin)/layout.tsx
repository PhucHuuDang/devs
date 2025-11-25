import React from "react";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <div className="min-h-screen w-full">{children}</div>;
};

export default AdminLayout;
