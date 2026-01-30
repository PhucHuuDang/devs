"use client";

import React from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import {
  Eye,
  FileText,
  TrendingUp,
  Users,
  ArrowUpRight,
  PenLine,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

import {
  RecentPostsList,
  RecentPost,
} from "@/components/admin/recent-posts-list";
import { StatsCard, StatsGrid } from "@/components/admin/stats-card";
import { Button } from "@/components/ui/button";
import { generateMockAdminStats, generateMockRecentPosts } from "@/mock/admin";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdminDashboardPage() {
  // In real app, this would come from GraphQL/API
  const stats = React.useMemo(() => generateMockAdminStats(), []);
  const recentPosts = React.useMemo(
    () => generateMockRecentPosts(5),
    [],
  ) as RecentPost[];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with gradient accent */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-muted-foreground ml-14"
          >
            Welcome back! Here&apos;s what&apos;s happening with your platform.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Link href="/admin/dashboard/posts">
              View All Posts
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
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
      <motion.div
        className="grid gap-6 lg:grid-cols-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Recent Posts */}
        <motion.div variants={item}>
          <RecentPostsList
            posts={recentPosts}
            onViewPost={(post) => console.log("View post:", post.id)}
            onEditPost={(post) => console.log("Edit post:", post.id)}
            onDeletePost={(post) => console.log("Delete post:", post.id)}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={item} className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            Quick Actions
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-3 border-2 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                asChild
              >
                <Link href="/admin/dashboard/posts?status=pending">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">Review Pending Posts</span>
                  <span className="text-xs text-muted-foreground">
                    {stats.pendingReviews} pending
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-3 border-2 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                asChild
              >
                <Link href="/admin/dashboard/users">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">Manage Users</span>
                  <span className="text-xs text-muted-foreground">
                    {stats.totalUsers.toLocaleString()} total
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-3 border-2 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                asChild
              >
                <Link href="/admin/dashboard/analytics">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">View Analytics</span>
                  <span className="text-xs text-muted-foreground">
                    Last 30 days
                  </span>
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-28 w-full flex-col gap-3 border-2 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-transparent transition-all duration-300 group"
                asChild
              >
                <Link href="/admin/dashboard/settings">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Settings className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">Settings</span>
                  <span className="text-xs text-muted-foreground">
                    Platform config
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
