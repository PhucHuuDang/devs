"use client";

import React, { Suspense, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import {
  PostCardGrid,
  PostCardData,
  PostCardSkeleton,
} from "@/components/profile/post-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { generateMockUserPosts } from "./_utils/mock-data";

// --- Configuration ---
const TABS_CONFIG = [
  { value: "draft", label: "Drafts", emptyMessage: "No drafts yet" },
  { value: "pending", label: "Pending", emptyMessage: "No pending reviews" },
  {
    value: "published",
    label: "Published",
    emptyMessage: "No published posts yet",
  },
  { value: "rejected", label: "Rejected", emptyMessage: "No rejected posts" },
] as const;

type PostStatus = (typeof TABS_CONFIG)[number]["value"];

/**
 * My Cooking Page component for tracking user's posts.
 * This component displays user's personal posts with status filtering.
 */
export default function MyCookingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PostStatus>("draft");

  // In real app, fetch from GraphQL based on status
  // For now: reuse memoized mock data
  const allPosts = useMemo(() => generateMockUserPosts(20), []);

  const filteredPosts = useMemo(
    () => allPosts.filter((post) => post.status === activeTab),
    [allPosts, activeTab],
  );

  const counts = useMemo(
    () => ({
      draft: allPosts.filter((p) => p.status === "draft").length,
      pending: allPosts.filter((p) => p.status === "pending").length,
      published: allPosts.filter((p) => p.status === "published").length,
      rejected: allPosts.filter((p) => p.status === "rejected").length,
    }),
    [allPosts],
  );

  // --- Handlers ---
  const handleAction = {
    edit: (post: PostCardData) =>
      router.push(`/profile/my-cooking/${post.id}/edit`),
    delete: (post: PostCardData) => console.log("Delete post:", post.id),
    view: (post: PostCardData) => {
      if (post.status === "published") {
        window.open(`/blogs/${post.slug}`, "_blank");
      } else {
        router.push(`/profile/my-cooking/${post.id}`);
      }
    },
  };

  return (
    <Suspense fallback={<LoadingContent />}>
      <SidebarInsetContent
        isSidebarInset={false}
        className="pt-0"
        isShowToggleTheme={false}
      >
        <div className="space-y-6">
          <PageHeader
            title="My Cooking"
            description="Manage your recipes and cooking stories."
          />

          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as PostStatus)}
          >
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              {TABS_CONFIG.map(({ value, label }) => (
                <TabsTrigger key={value} value={value} className="gap-2">
                  {label}
                  <TabBadge count={counts[value]} />
                </TabsTrigger>
              ))}
            </TabsList>

            {TABS_CONFIG.map(({ value, emptyMessage }) => (
              <TabsContent key={value} value={value} className="mt-6">
                <PostCardGrid
                  posts={filteredPosts}
                  emptyMessage={emptyMessage}
                  onEdit={handleAction.edit}
                  onDelete={handleAction.delete}
                  onView={handleAction.view}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </SidebarInsetContent>
    </Suspense>
  );
}

// --- Internal UI Components ---

/** Header with title and New Post button */
function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button asChild>
        <Link href="/admin/create-blog">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Link>
      </Button>
    </div>
  );
}

/** Small badge for the status counts in tabs */
function TabBadge({ count }: { count: number }) {
  return (
    <span className="hidden rounded-full bg-muted px-2 py-0.5 text-xs font-semibold sm:inline">
      {count}
    </span>
  );
}

/** Fallback loading state for the post grid */
function LoadingContent() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
