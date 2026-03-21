import { memo, useState } from "react";

import { formatDistanceToNow } from "date-fns";
import { Loader2, MoreHorizontal, Pencil, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import {
  GetCommentsByPostDocument,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/app/graphql/__generated__/generated";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

import { CommentForm } from "./comment-form";
import { CommentData } from "./types";

interface CommentItemProps {
  comment: CommentData;
  postId: string;
  currentUserId?: string | null;
  isAuthenticated: boolean;
  isReply?: boolean;
}

// Wrap in React.memo to prevent unnecessary re-renders when other comments update
export const CommentItem = memo(function CommentItem({
  comment,
  postId,
  currentUserId,
  isAuthenticated,
  isReply = false,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const [updateComment, { loading: updating }] = useUpdateCommentMutation();
  const [deleteComment, { loading: deleting }] = useDeleteCommentMutation();

  const isOwner = currentUserId === comment.userId;

  const handleEdit = async () => {
    const trimmed = editContent.trim();
    if (!trimmed || updating) return;

    try {
      const { data } = await updateComment({
        variables: { id: comment.id, input: { content: trimmed } },
        refetchQueries: [
          { query: GetCommentsByPostDocument, variables: { postId } },
        ],
      });
      if (data?.updateComment?.success) {
        setIsEditing(false);
        toast.success("Comment updated");
      }
    } catch {
      toast.error("Failed to update comment");
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    try {
      const { data } = await deleteComment({
        variables: { id: comment.id },
        refetchQueries: [
          { query: GetCommentsByPostDocument, variables: { postId } },
        ],
      });
      if (data?.deleteComment?.success) {
        toast.success("Comment deleted");
      }
    } catch {
      toast.error("Failed to delete comment");
    }
  };

  if (comment.isDeleted) {
    return (
      <div className="flex gap-3 py-3 opacity-60">
        <div className="h-8 w-8 rounded-full bg-muted" />
        <p className="text-sm italic text-muted-foreground">
          This comment has been deleted.
        </p>
      </div>
    );
  }

  const initials = comment.user?.name
    ? comment.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div
      className={cn("group", isReply && "ml-10 border-l-2 border-muted pl-4")}
    >
      <div className="flex gap-3 py-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage
            src={comment.user?.image ?? undefined}
            alt={comment.user?.name ?? "User"}
          />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">
              {comment.user?.name ?? "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
              })}
            </span>
            {comment.isEdited && (
              <span className="text-xs text-muted-foreground">(edited)</span>
            )}
          </div>

          {/* Content or Edit Mode */}
          {isEditing ? (
            <div className="mt-2 space-y-2">
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="resize-none"
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleEdit}
                  disabled={!editContent.trim() || updating}
                >
                  {updating && (
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  )}
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm text-foreground/90 whitespace-pre-wrap wrap-break-word">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          {!isEditing && (
            <div className="mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {isAuthenticated && !isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 gap-1 text-xs text-muted-foreground"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <Reply className="h-3 w-3" />
                  Reply
                </Button>
              )}

              {isOwner && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-muted-foreground"
                      aria-label="Comment actions"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Edit
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-3.5 w-3.5" />
                          Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete comment?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. Your comment will be
                            permanently removed.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {deleting && (
                              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            )}
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="ml-11 mb-3">
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCancel={() => setIsReplying(false)}
            placeholder={`Reply to ${comment.user?.name ?? "this comment"}...`}
            autoFocus
          />
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-0">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply as CommentData}
              postId={postId}
              currentUserId={currentUserId}
              isAuthenticated={isAuthenticated}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
});
