"use client";

import React, { Suspense, useCallback, useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  useDeletePostMutation,
  useGetMyPostsQuery,
} from "@/app/graphql/__generated__/generated";
import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import {
  PostCardGrid,
  PostCardData,
  PostCardSkeleton,
} from "@/components/profile/post-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── GraphQL Operations are defined in the GraphQL file and generated! ──────────────────────────
// --- Configuration ---
const TABS_CONFIG = [
  { value: "all", label: "All", emptyMessage: "No posts yet" },
  {
    value: "published",
    label: "Published",
    emptyMessage: "No published posts yet",
  },
  { value: "draft", label: "Drafts", emptyMessage: "No drafts yet" },
] as const;

type PostStatus = (typeof TABS_CONFIG)[number]["value"];

/** Maps API post data to PostCardData for the UI */
function mapPostToCardData(post: any): PostCardData {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    description: post.description,
    mainImage: post.mainImage,
    status: post.isPublished ? "published" : "draft",
    views: post.views ?? 0,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
    category: post.category,
  };
}

/**
 * My Cooking Page — manages user's posts with real GraphQL data.
 * Supports filtering by status, viewing, editing, and deleting posts.
 */
export default function MyCookingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PostStatus>("all");
  const [deleteTarget, setDeleteTarget] = useState<PostCardData | null>(null);

  // Fetch user's posts
  const { data, loading, error, refetch } = useGetMyPostsQuery({
    variables: {
      filters: {
        page: 1,
        limit: 50,
        sortBy: "createdAt",
        sortOrder: "DESC",
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const [deletePost, { loading: deleting }] = useDeletePostMutation();

  // Map and filter posts
  const allPosts = useMemo(() => {
    const rawPosts = data?.myPosts?.data ?? [];
    return rawPosts.map(mapPostToCardData);
  }, [data]);

  const filteredPosts = useMemo(() => {
    if (activeTab === "all") return allPosts;
    return allPosts.filter((post: PostCardData) => post.status === activeTab);
  }, [allPosts, activeTab]);

  const counts = useMemo(
    () => ({
      all: allPosts.length,
      published: allPosts.filter((p: PostCardData) => p.status === "published")
        .length,
      draft: allPosts.filter((p: PostCardData) => p.status === "draft").length,
    }),
    [allPosts],
  );

  // --- Handlers ---
  const handleDelete = useCallback(
    async (post: PostCardData) => {
      if (deleting) return;
      try {
        const { data: result } = await deletePost({
          variables: { id: post.id },
        });
        if (result?.deletePost?.success) {
          toast.success(`"${post.title}" deleted successfully`);
          refetch();
        } else {
          toast.error(result?.deletePost?.message || "Failed to delete post");
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setDeleteTarget(null);
      }
    },
    [deletePost, deleting, refetch],
  );

  const handleAction = {
    edit: (post: PostCardData) =>
      router.push(`/profile/my-cooking/${post.id}/edit`),
    delete: (post: PostCardData) => setDeleteTarget(post),
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

          {/* Error state */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center">
              <p className="text-sm text-destructive mb-2">
                Failed to load your posts
              </p>
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Try Again
              </Button>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as PostStatus)}
          >
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
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
                  isLoading={loading && !data}
                  emptyMessage={emptyMessage}
                  onEdit={handleAction.edit}
                  onDelete={handleAction.delete}
                  onView={handleAction.view}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete post?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete &ldquo;{deleteTarget?.title}
                &rdquo;. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteTarget && handleDelete(deleteTarget)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={deleting}
              >
                {deleting && (
                  <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                )}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
