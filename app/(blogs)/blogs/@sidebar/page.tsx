"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-2">
      <Link
        href="/blogs"
        className={`p-2 rounded-md ${
          pathname === "/blogs"
            ? "bg-gray-200 font-semibold"
            : "hover:bg-gray-100"
        }`}
      >
        📰 All Posts
      </Link>
      <Link
        href="/blogs/analytics"
        className={`p-2 rounded-md ${
          pathname.includes("/analytics")
            ? "bg-gray-200 font-semibold"
            : "hover:bg-gray-100"
        }`}
      >
        📊 Analytics
      </Link>
    </nav>
  );
}
