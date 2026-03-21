"use client";

import { useMemo } from "react";

import dynamic from "next/dynamic";

import { useGetSessionQuery } from "@/app/graphql/__generated__/generated";
import { SimpleLoading } from "@/components/loading-components/simple-loading";

import { VoteButtons } from "./vote-buttons";

// Lazy load CommentSection — it's below the fold
const CommentSection = dynamic(
  () =>
    import("./comments").then((mod) => ({
      default: mod.CommentSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="mt-12 flex justify-center py-8">
        <SimpleLoading />
      </div>
    ),
  },
);

// ─── GraphQL Operations are defined in the GraphQL file and generated! ──────────────────────────────
interface BlogInteractionsProps {
  postId: string;
}

/**
 * Client-side wrapper for blog detail interactivity.
 * Provides voting buttons (sticky sidebar) and comment section.
 * Lazy-loads the comment section since it's below the fold.
 */
export function BlogInteractions({ postId }: BlogInteractionsProps) {
  const { data: sessionData } = useGetSessionQuery({
    fetchPolicy: "cache-first",
  });

  const session = useMemo(() => {
    const user = sessionData?.getSession?.data?.user;
    return {
      isAuthenticated: !!user?.id,
      userId: user?.id ?? null,
    };
  }, [sessionData]);

  return (
    <>
      {/* Floating Vote Buttons — Desktop sidebar */}
      <div className="hidden lg:block fixed left-[max(1rem,calc(50vw-40rem))] top-1/2 -translate-y-1/2 z-40">
        <div className="rounded-full border bg-background/80 backdrop-blur-sm p-1.5 shadow-lg">
          <VoteButtons
            postId={postId}
            isAuthenticated={session.isAuthenticated}
            orientation="vertical"
          />
        </div>
      </div>

      {/* Inline Vote Buttons — Mobile/Tablet */}
      <div className="lg:hidden flex justify-center py-4">
        <div className="rounded-full border bg-background/80 backdrop-blur-sm px-3 py-1.5 shadow-sm">
          <VoteButtons
            postId={postId}
            isAuthenticated={session.isAuthenticated}
            orientation="horizontal"
          />
        </div>
      </div>

      {/* Comment Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0">
        <CommentSection
          postId={postId}
          currentUserId={session.userId}
          isAuthenticated={session.isAuthenticated}
        />
      </div>
    </>
  );
}
