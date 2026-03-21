import { useCallback, useMemo, useRef, useState } from "react";

import { toast } from "sonner";

import {
  GetVoteStatusDocument,
  useCastVoteMutation,
  useGetVoteStatusQuery,
  useRemoveVoteMutation,
} from "@/app/graphql/__generated__/generated";

export type VoteType = "UPVOTE" | "DOWNVOTE";

export interface VoteStatusData {
  upvotes: number;
  downvotes: number;
  score: number;
  userVote: VoteType | null;
}

interface UseVoteOptions {
  postId: string;
  isAuthenticated: boolean;
}

export function useVote({ postId, isAuthenticated }: UseVoteOptions) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [optimisticVote, setOptimisticVote] = useState<
    VoteType | null | undefined
  >(undefined);
  const [optimisticScore, setOptimisticScore] = useState<number | undefined>(
    undefined,
  );

  const { data, loading } = useGetVoteStatusQuery({
    variables: { postId },
    fetchPolicy: "cache-and-network",
  });

  const [castVote, { loading: castingVote }] = useCastVoteMutation();
  const [removeVote, { loading: removingVote }] = useRemoveVoteMutation();

  const voteStatus: VoteStatusData = useMemo(() => {
    const apiData = data?.voteStatus?.data;
    if (!apiData) {
      return { upvotes: 0, downvotes: 0, score: 0, userVote: null };
    }
    return {
      upvotes: apiData.upvotes ?? 0,
      downvotes: apiData.downvotes ?? 0,
      score: apiData.score ?? 0,
      userVote: (apiData.userVote as VoteType) ?? null,
    };
  }, [data]);

  const currentVote =
    optimisticVote !== undefined ? optimisticVote : voteStatus.userVote;
  const currentScore =
    optimisticScore !== undefined ? optimisticScore : voteStatus.score;
  const isVoting = castingVote || removingVote;

  const handleVote = useCallback(
    (value: VoteType) => {
      if (!isAuthenticated) {
        toast.info("Sign in to vote on posts", {
          action: {
            label: "Sign In",
            onClick: () => window.location.assign("/auth"),
          },
        });
        return;
      }

      // Debounce rapid clicks
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        const isToggleOff = currentVote === value;

        // Optimistic update
        if (isToggleOff) {
          setOptimisticVote(null);
          setOptimisticScore(
            value === "UPVOTE" ? voteStatus.score - 1 : voteStatus.score + 1,
          );
        } else {
          setOptimisticVote(value);
          const delta = value === "UPVOTE" ? 1 : -1;
          const reversal = currentVote
            ? currentVote === "UPVOTE"
              ? -1
              : 1
            : 0;
          setOptimisticScore(voteStatus.score + delta + reversal);
        }

        try {
          if (isToggleOff) {
            await removeVote({
              variables: { postId },
              refetchQueries: [
                { query: GetVoteStatusDocument, variables: { postId } },
              ],
            });
          } else {
            await castVote({
              variables: { input: { postId, value } },
              refetchQueries: [
                { query: GetVoteStatusDocument, variables: { postId } },
              ],
            });
          }
        } catch {
          // Revert optimistic update
          setOptimisticVote(undefined);
          setOptimisticScore(undefined);
          toast.error("Failed to register your vote. Please try again.");
        } finally {
          // Clear optimistic state after refetch
          setTimeout(() => {
            setOptimisticVote(undefined);
            setOptimisticScore(undefined);
          }, 500);
        }
      }, 200);
    },
    [
      isAuthenticated,
      currentVote,
      voteStatus.score,
      postId,
      castVote,
      removeVote,
    ],
  );

  return {
    currentVote,
    currentScore,
    isVoting,
    loadingInitial: loading && !data,
    handleVote,
  };
}
