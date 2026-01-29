"use client";

import React from "react";

import Link from "next/link";

import { Eye, FileText, TrendingUp, Users, ArrowUpRight } from "lucide-react";

import {
  RecentPostsList,
  RecentPost,
} from "@/components/admin/recent-posts-list";
import { StatsCard, StatsGrid } from "@/components/admin/stats-card";
import { Button } from "@/components/ui/button";
import { generateMockAdminStats, generateMockRecentPosts } from "@/mock/admin";

export default function AdminDashboardPage() {
  // In real app, this would come from GraphQL/API
  const stats = React.useMemo(() => generateMockAdminStats(), []);
  const recentPosts = React.useMemo(
    () => generateMockRecentPosts(5),
    [],
  ) as RecentPost[];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/posts">
            View All Posts
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid>
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          previousValue={stats.previousTotalPosts}
          icon={FileText}
          delay={0}
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          previousValue={stats.previousTotalUsers}
          icon={Users}
          delay={1}
        />
        <StatsCard
          title="Total Views"
          value={stats.totalViews}
          previousValue={stats.previousTotalViews}
          icon={Eye}
          delay={2}
        />
        <StatsCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          previousValue={stats.previousPendingReviews}
          icon={TrendingUp}
          delay={3}
        />
      </StatsGrid>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <RecentPostsList
          posts={recentPosts}
          onViewPost={(post) => console.log("View post:", post.id)}
          onEditPost={(post) => console.log("Edit post:", post.id)}
          onDeletePost={(post) => console.log("Delete post:", post.id)}
        />

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link href="/admin/dashboard/posts?status=pending">
                <FileText className="h-6 w-6" />
                <span>Review Pending Posts</span>
                <span className="text-xs text-muted-foreground">
                  {stats.pendingReviews} pending
                </span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link href="/admin/dashboard/users">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
                <span className="text-xs text-muted-foreground">
                  {stats.totalUsers.toLocaleString()} total
                </span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link href="/admin/dashboard/analytics">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
                <span className="text-xs text-muted-foreground">
                  Last 30 days
                </span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2" asChild>
              <Link href="/admin/dashboard/settings">
                <Eye className="h-6 w-6" />
                <span>Settings</span>
                <span className="text-xs text-muted-foreground">
                  Platform config
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
