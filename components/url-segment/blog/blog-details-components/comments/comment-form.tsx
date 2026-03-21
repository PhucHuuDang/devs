import { useState } from "react";

import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import {
  GetCommentsByPostDocument,
  useCreateCommentMutation,
} from "@/app/graphql/__generated__/generated";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function CommentForm({
  postId,
  parentId,
  onCancel,
  placeholder = "Share your thoughts...",
  autoFocus = false,
}: {
  postId: string;
  parentId?: string;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [content, setContent] = useState("");
  const [createComment, { loading }] = useCreateCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || loading) return;

    try {
      const { data } = await createComment({
        variables: {
          input: {
            postId,
            content: trimmed,
            ...(parentId && { parentId }),
          },
        },
        refetchQueries: [
          { query: GetCommentsByPostDocument, variables: { postId } },
        ],
      });

      if (data?.createComment?.success) {
        setContent("");
        onCancel?.();
        toast.success(parentId ? "Reply posted!" : "Comment posted!");
      } else {
        toast.error(data?.createComment?.message || "Failed to post comment");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        autoFocus={autoFocus}
        className="resize-none bg-muted/30 focus:bg-background transition-colors"
        aria-label={parentId ? "Write a reply" : "Write a comment"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSubmit(e);
          }
        }}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          <kbd className="rounded border px-1 py-0.5 text-[10px]">⌘</kbd>+
          <kbd className="rounded border px-1 py-0.5 text-[10px]">Enter</kbd> to
          submit
        </p>
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={!content.trim() || loading}
            className="gap-1.5 transition-all"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            {parentId ? "Reply" : "Comment"}
          </Button>
        </div>
      </div>
    </form>
  );
}
