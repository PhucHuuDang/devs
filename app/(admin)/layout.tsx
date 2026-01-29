import React from "react";

import { Metadata } from "next";

import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Dashboard",
    default: "Admin Dashboard",
  },
  description: "Manage your blog platform - posts, users, and analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
};

export default AdminLayout;
