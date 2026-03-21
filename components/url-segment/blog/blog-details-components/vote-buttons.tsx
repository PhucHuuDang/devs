"use client";

import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useVote } from "./use-vote";

// ─── GraphQL Operations are defined in the GraphQL file and generated! ──────────────────────────────

interface VoteButtonsProps {
  postId: string;
  isAuthenticated: boolean;
  /** Orientation: vertical for sidebar, horizontal for inline */
  orientation?: "vertical" | "horizontal";
  className?: string;
}

// ─── Component ──────────────────────────────
export function VoteButtons({
  postId,
  isAuthenticated,
  orientation = "vertical",
  className,
}: VoteButtonsProps) {
  const { currentScore, currentVote, handleVote, isVoting, loadingInitial } =
    useVote({
      postId,
      isAuthenticated,
    });

  if (loadingInitial) {
    return (
      <div
        className={cn(
          "flex items-center gap-1",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
      >
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div
        className={cn(
          "flex items-center gap-1",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
        role="group"
        aria-label="Vote on this post"
      >
        {/* Upvote Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full transition-all duration-200",
                currentVote === "UPVOTE"
                  ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 dark:text-emerald-400"
                  : "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-500/10",
              )}
              onClick={() => handleVote("UPVOTE")}
              disabled={isVoting}
              aria-label={
                currentVote === "UPVOTE" ? "Remove upvote" : "Upvote this post"
              }
              aria-pressed={currentVote === "UPVOTE"}
            >
              <ChevronUp
                className={cn(
                  "h-5 w-5 transition-transform",
                  currentVote === "UPVOTE" && "scale-110",
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side={orientation === "vertical" ? "right" : "top"}>
            {currentVote === "UPVOTE" ? "Remove upvote" : "Upvote"}
          </TooltipContent>
        </Tooltip>

        {/* Score Display */}
        <span
          className={cn(
            "min-w-[2ch] text-center text-sm font-semibold tabular-nums transition-colors",
            currentVote === "UPVOTE" &&
              "text-emerald-600 dark:text-emerald-400",
            currentVote === "DOWNVOTE" && "text-rose-600 dark:text-rose-400",
            !currentVote && "text-muted-foreground",
          )}
          aria-label={`Score: ${currentScore}`}
        >
          {currentScore}
        </span>

        {/* Downvote Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 rounded-full transition-all duration-200",
                currentVote === "DOWNVOTE"
                  ? "bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 dark:text-rose-400"
                  : "text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10",
              )}
              onClick={() => handleVote("DOWNVOTE")}
              disabled={isVoting}
              aria-label={
                currentVote === "DOWNVOTE"
                  ? "Remove downvote"
                  : "Downvote this post"
              }
              aria-pressed={currentVote === "DOWNVOTE"}
            >
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform",
                  currentVote === "DOWNVOTE" && "scale-110",
                )}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side={orientation === "vertical" ? "right" : "bottom"}
          >
            {currentVote === "DOWNVOTE" ? "Remove downvote" : "Downvote"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
