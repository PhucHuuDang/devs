"use client";

import { useMemo } from "react";

import { MessageSquare } from "lucide-react";

import { useGetCommentsByPostQuery } from "@/app/graphql/__generated__/generated";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";
import { CommentData, CommentSectionProps } from "./types";

// ─── Main Comment Section ──────────────────────────────
export function CommentSection({
  postId,
  currentUserId,
  isAuthenticated,
}: CommentSectionProps) {
  const { data, loading, error } = useGetCommentsByPostQuery({
    variables: { postId },
    fetchPolicy: "cache-and-network",
  });

  const comments: CommentData[] = useMemo(
    () => data?.commentsByPost?.data ?? [],
    [data],
  );
  const count = data?.commentsByPost?.count ?? 0;

  return (
    <section className="w-full max-w-3xl mx-auto mt-12" aria-label="Comments">
      <Separator className="mb-8" />
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold">
          Comments{" "}
          {count > 0 && (
            <span className="text-muted-foreground font-normal">({count})</span>
          )}
        </h2>
      </div>

      {/* New Comment Form */}
      {isAuthenticated ? (
        <div className="mb-8">
          <CommentForm postId={postId} />
        </div>
      ) : (
        <div className="mb-8 rounded-lg border border-dashed p-4 text-center transition-all bg-muted/10">
          <p className="text-sm text-muted-foreground mb-2">
            Sign in to join the conversation
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href="/auth">Sign In</a>
          </Button>
        </div>
      )}

      {/* Loading */}
      {loading && !data && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="h-8 w-8 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-center">
          <p className="text-sm text-destructive">Failed to load comments</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && comments.length === 0 && (
        <div className="py-8 text-center animate-in fade-in duration-500">
          <MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/30" />
          <p className="mt-2 text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}

      {/* Comment List */}
      {comments.length > 0 && (
        <div className="space-y-1 divide-y divide-border/50">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postId={postId}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </section>
  );
}
