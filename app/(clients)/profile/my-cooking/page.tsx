"use client";

import React, { Suspense, useMemo, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { faker } from "@faker-js/faker";
import { Plus } from "lucide-react";

import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import {
  PostCardGrid,
  PostCardData,
  PostCardSkeleton,
} from "@/components/profile/post-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Generate mock posts
function generateMockUserPosts(count: number): PostCardData[] {
  const statuses: PostCardData["status"][] = [
    "draft",
    "pending",
    "published",
    "rejected",
  ];
  const categories = [
    { id: "1", name: "Technology" },
    { id: "2", name: "Lifestyle" },
    { id: "3", name: "Food" },
    { id: "4", name: "Travel" },
  ];

  return Array.from({ length: count }, () => {
    const createdAt = faker.date.past({ years: 1 });

    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence({ min: 4, max: 10 }),
      slug: faker.helpers.slugify(faker.lorem.words(4)).toLowerCase(),
      description: faker.lorem.paragraph(),
      mainImage: faker.image.urlPicsumPhotos({ width: 800, height: 450 }),
      status: faker.helpers.arrayElement(statuses),
      views: faker.number.int({ min: 0, max: 10000 }),
      createdAt,
      updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      category: faker.helpers.arrayElement(categories),
    };
  });
}

export default function MyCookingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PostCardData["status"]>("draft");

  // Mock data - in real app, fetch from GraphQL based on status
  const allPosts = useMemo(() => generateMockUserPosts(20), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => post.status === activeTab);
  }, [allPosts, activeTab]);

  const counts = useMemo(() => {
    return {
      draft: allPosts.filter((p) => p.status === "draft").length,
      pending: allPosts.filter((p) => p.status === "pending").length,
      published: allPosts.filter((p) => p.status === "published").length,
      rejected: allPosts.filter((p) => p.status === "rejected").length,
    };
  }, [allPosts]);

  const handleEdit = (post: PostCardData) => {
    router.push(`/profile/my-cooking/${post.id}/edit`);
  };

  const handleView = (post: PostCardData) => {
    if (post.status === "published") {
      window.open(`/blogs/${post.slug}`, "_blank");
    } else {
      router.push(`/profile/my-cooking/${post.id}`);
    }
  };

  const handleDelete = (post: PostCardData) => {
    // Show confirmation dialog
    console.log("Delete post:", post.id);
  };

  return (
    <Suspense
      fallback={
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <SidebarInsetContent
        isSidebarInset={false}
        className="pt-0"
        isShowToggleTheme={false}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Cooking</h1>
              <p className="text-muted-foreground">
                Manage your recipes and cooking stories.
              </p>
            </div>
            <Button asChild>
              <Link href="/admin/create-blog">
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Link>
            </Button>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as PostCardData["status"])}
          >
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="draft" className="gap-2">
                Drafts
                <span className="hidden rounded-full bg-muted px-2 py-0.5 text-xs sm:inline">
                  {counts.draft}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                Pending
                <span className="hidden rounded-full bg-muted px-2 py-0.5 text-xs sm:inline">
                  {counts.pending}
                </span>
              </TabsTrigger>
              <TabsTrigger value="published" className="gap-2">
                Published
                <span className="hidden rounded-full bg-muted px-2 py-0.5 text-xs sm:inline">
                  {counts.published}
                </span>
              </TabsTrigger>
              <TabsTrigger value="rejected" className="gap-2">
                Rejected
                <span className="hidden rounded-full bg-muted px-2 py-0.5 text-xs sm:inline">
                  {counts.rejected}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="draft" className="mt-6">
              <PostCardGrid
                posts={filteredPosts}
                emptyMessage="No drafts yet"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <PostCardGrid
                posts={filteredPosts}
                emptyMessage="No pending reviews"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </TabsContent>

            <TabsContent value="published" className="mt-6">
              <PostCardGrid
                posts={filteredPosts}
                emptyMessage="No published posts yet"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </TabsContent>

            <TabsContent value="rejected" className="mt-6">
              <PostCardGrid
                posts={filteredPosts}
                emptyMessage="No rejected posts"
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInsetContent>
    </Suspense>
  );
}
