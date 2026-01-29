"use client";

import React from "react";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Eye, FileText, MoreHorizontal, TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export interface RecentPost {
  id: string;
  title: string;
  author: {
    name: string;
    image?: string;
  };
  status: "draft" | "pending" | "published" | "rejected";
  createdAt: Date;
  views: number;
}

interface RecentPostsListProps {
  posts: RecentPost[];
  isLoading?: boolean;
  onViewPost?: (post: RecentPost) => void;
  onEditPost?: (post: RecentPost) => void;
  onDeletePost?: (post: RecentPost) => void;
}

const statusConfig = {
  draft: { label: "Draft", variant: "secondary" as const },
  pending: { label: "Pending", variant: "outline" as const },
  published: { label: "Published", variant: "default" as const },
  rejected: { label: "Rejected", variant: "destructive" as const },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function RecentPostsList({
  posts,
  isLoading = false,
  onViewPost,
  onEditPost,
  onDeletePost,
}: RecentPostsListProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Posts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Posts</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No posts yet</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="group flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
              >
                {/* Author Avatar */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {post.author.image ? (
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                {/* Post Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-sm">{post.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                    </span>
                  </div>
                </div>

                {/* Views */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{post.views.toLocaleString()}</span>
                </div>

                {/* Status Badge */}
                <Badge variant={statusConfig[post.status].variant}>
                  {statusConfig[post.status].label}
                </Badge>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewPost?.(post)}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditPost?.(post)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDeletePost?.(post)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            ))
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
