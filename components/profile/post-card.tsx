"use client";

import React from "react";

import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Edit, Eye, MoreHorizontal, Trash, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export interface PostCardData {
  id: string;
  title: string;
  slug: string;
  description?: string;
  mainImage?: string;
  status: "draft" | "pending" | "published" | "rejected";
  views: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
  };
}

interface PostCardProps {
  post: PostCardData;
  onEdit?: (post: PostCardData) => void;
  onDelete?: (post: PostCardData) => void;
  onView?: (post: PostCardData) => void;
  index?: number;
}

const statusConfig = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  published: {
    label: "Published",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export function PostCard({
  post,
  onEdit,
  onDelete,
  onView,
  index = 0,
}: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {post.mainImage ? (
            <img
              src={post.mainImage}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl text-muted-foreground">📝</span>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute left-3 top-3">
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                statusConfig[post.status].className,
              )}
            >
              {statusConfig[post.status].label}
            </span>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onView?.(post)}
            >
              <Eye className="mr-1 h-4 w-4" />
              View
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEdit?.(post)}
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <CardContent className="flex-1 p-4">
          {/* Category */}
          {post.category && (
            <p className="mb-2 text-xs font-medium text-primary">
              {post.category.name}
            </p>
          )}

          {/* Title */}
          <h3 className="line-clamp-2 font-semibold leading-snug">
            {post.title}
          </h3>

          {/* Description */}
          {post.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t p-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views.toLocaleString()}
            </span>
            <span>
              {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView?.(post)}>
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(post)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {post.status === "published" && (
                <DropdownMenuItem asChild>
                  <Link href={`/blogs/${post.slug}`} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => onDelete?.(post)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[16/9] w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="border-t p-4">
        <Skeleton className="h-3 w-24" />
      </CardFooter>
    </Card>
  );
}

interface PostCardGridProps {
  posts: PostCardData[];
  isLoading?: boolean;
  emptyMessage?: string;
  onEdit?: (post: PostCardData) => void;
  onDelete?: (post: PostCardData) => void;
  onView?: (post: PostCardData) => void;
}

export function PostCardGrid({
  posts,
  isLoading = false,
  emptyMessage = "No posts yet",
  onEdit,
  onDelete,
  onView,
}: PostCardGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <span className="mb-4 text-5xl">📝</span>
        <h3 className="text-lg font-medium">{emptyMessage}</h3>
        <p className="text-sm text-muted-foreground">
          Start writing to see your posts here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
