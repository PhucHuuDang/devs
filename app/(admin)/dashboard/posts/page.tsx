"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  ArrowUpRight,
  CheckCircle,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
  XCircle,
  Globe,
  EyeOff,
} from "lucide-react";

import {
  PostStatusFilter,
  useDeletePostMutation,
  useGetAllPostsLazyQuery,
  useUpdatePostMutation,
} from "@/app/graphql/__generated__/generated";
import { SidebarInsetContent } from "@/components/animate-ui/split/sidebar-chunks";
import { AlertDialogCustom } from "@/components/custom/alert-dialog-custom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DataTable,
  DataTableColumnHeader,
  getSelectColumn,
} from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PostItem {
  id: string;
  title: string;
  slug: string;
  author: {
    id: string;
    name: string;
    image?: string | null;
  };
  category: { id: string; name: string } | null;
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const statusConfig = {
  published: { label: "Published", variant: "default" as const },
  unpublished: { label: "Unpublished", variant: "secondary" as const },
};

const statusFilterMap: Record<string, PostStatusFilter | undefined> = {
  all: undefined,
  draft: PostStatusFilter.Draft,
  pending: PostStatusFilter.Pending,
  published: PostStatusFilter.Published,
  rejected: PostStatusFilter.Rejected,
};

// ---------------------------------------------------------------------------
// Action types for pending confirmation
// ---------------------------------------------------------------------------
type PendingAction =
  | { type: "delete"; id: string }
  | { type: "publish"; id: string }
  | { type: "unpublish"; id: string };

// ---------------------------------------------------------------------------
// Action cell — defined outside columns so it can receive callbacks
// ---------------------------------------------------------------------------
function PostActions({
  post,
  onPublish,
  onUnpublish,
  onDelete,
}: {
  post: PostItem;
  onPublish: (id: string) => void;
  onUnpublish: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [pendingAction, setPendingAction] =
    React.useState<PendingAction | null>(null);

  const dialogConfig = {
    delete: {
      title: "Delete post?",
      description:
        "This will permanently remove the post and cannot be undone.",
      confirmLabel: "Delete",
      confirmClassName:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      onConfirm: () => onDelete(post.id),
    },
    publish: {
      title: "Publish post?",
      description: "The post will become publicly visible to all readers.",
      confirmLabel: "Publish",
      confirmClassName: "",
      onConfirm: () => onPublish(post.id),
    },
    unpublish: {
      title: "Unpublish post?",
      description: "The post will be hidden from public view.",
      confirmLabel: "Unpublish",
      confirmClassName: "",
      onConfirm: () => onUnpublish(post.id),
    },
  } satisfies Record<PendingAction["type"], object>;

  const cfg = pendingAction ? dialogConfig[pendingAction.type] : null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={`/dashboard/posts/${post.id}`}>
              <Eye className="mr-2 h-4 w-4" />
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/create-blog?id=${post.id}`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Publish / Unpublish toggle */}
          {post.isPublished ? (
            <DropdownMenuItem
              className="text-amber-600"
              onClick={() =>
                setPendingAction({ type: "unpublish", id: post.id })
              }
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Unpublish
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="text-green-600"
              onClick={() => setPendingAction({ type: "publish", id: post.id })}
            >
              <Globe className="mr-2 h-4 w-4" />
              Publish
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setPendingAction({ type: "delete", id: post.id })}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation dialog — rendered outside the dropdown to avoid portal conflicts */}
      {cfg && (
        <AlertDialogCustom
          open
          onOpenChange={(open) => !open && setPendingAction(null)}
          title={cfg.title}
          description={cfg.description}
          confirmLabel={cfg.confirmLabel}
          confirmClassName={cfg.confirmClassName}
          onConfirm={() => {
            cfg.onConfirm();
            setPendingAction(null);
          }}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PostsManagementPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = React.useState<string | null>(null);

  // Queries & mutations
  const [
    getAllPosts,
    { data, loading, error, refetch, networkStatus, fetchMore },
  ] = useGetAllPostsLazyQuery();

  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  // Fetch on mount and whenever status filter changes
  React.useEffect(() => {
    getAllPosts({
      variables: {
        filters: {
          page: 1,
          limit: 100,
          status: statusFilterMap[statusFilter],
        },
      },
    });
  }, [statusFilter, getAllPosts]);

  // Auto-clear feedback banners
  React.useEffect(() => {
    if (!actionSuccess && !actionError) return;
    const t = setTimeout(() => {
      setActionSuccess(null);
      setActionError(null);
    }, 3000);
    return () => clearTimeout(t);
  }, [actionSuccess, actionError]);

  // Map GQL response → PostItem[]
  const posts: PostItem[] = React.useMemo(() => {
    const raw = data?.posts?.data ?? [];
    return raw.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      author: {
        id: p.author.id,
        name: p.author.name ?? "Unknown",
        image: p.author.image,
      },
      category: p.category ?? null,
      isPublished: p.isPublished,
      views: p.views,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));
  }, [data]);

  // ---- Moderation handlers ----
  const handlePublish = React.useCallback(
    async (id: string) => {
      try {
        const res = await updatePost({
          variables: { id, input: { isPublished: true } },
        });
        if (res.data?.updatePost.success) {
          setActionSuccess("Post published successfully.");
          refetch?.();
        } else {
          setActionError(res.data?.updatePost.message ?? "Failed to publish.");
        }
      } catch {
        setActionError("An error occurred while publishing.");
      }
    },
    [updatePost, refetch],
  );

  const handleUnpublish = React.useCallback(
    async (id: string) => {
      try {
        const res = await updatePost({
          variables: { id, input: { isPublished: false } },
        });
        if (res.data?.updatePost.success) {
          setActionSuccess("Post unpublished.");
          refetch?.();
        } else {
          setActionError(
            res.data?.updatePost.message ?? "Failed to unpublish.",
          );
        }
      } catch {
        setActionError("An error occurred while unpublishing.");
      }
    },
    [updatePost, refetch],
  );

  const handleDelete = React.useCallback(
    async (id: string) => {
      try {
        const res = await deletePost({ variables: { id } });
        if (res.data?.deletePost.success) {
          setActionSuccess("Post deleted.");
          refetch?.();
        } else {
          setActionError(res.data?.deletePost.message ?? "Failed to delete.");
        }
      } catch {
        setActionError("An error occurred while deleting.");
      }
    },
    [deletePost, refetch],
  );

  // Build columns with callbacks injected into the actions cell
  const columns: ColumnDef<PostItem>[] = React.useMemo(
    () => [
      getSelectColumn<PostItem>(),
      {
        accessorKey: "title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => (
          <div className="max-w-[300px]">
            <p className="truncate font-medium">{row.getValue("title")}</p>
            <p className="truncate text-xs text-muted-foreground">
              {row.original.slug}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "author",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Author" />
        ),
        cell: ({ row }) => {
          const author = row.original.author;
          return (
            <div className="flex items-center gap-2">
              {author.image ? (
                <img
                  src={author.image}
                  alt={author.name}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {author.name.charAt(0)}
                </div>
              )}
              <span className="text-sm">{author.name}</span>
            </div>
          );
        },
        filterFn: (row, _id, value) =>
          row.original.author.name.toLowerCase().includes(value.toLowerCase()),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
          const cat = row.original.category;
          return cat ? (
            <Badge variant="secondary">{cat.name}</Badge>
          ) : (
            <span className="text-xs text-muted-foreground">—</span>
          );
        },
      },
      {
        accessorKey: "isPublished",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const key = row.original.isPublished ? "published" : "unpublished";
          return (
            <Badge variant={statusConfig[key].variant}>
              {statusConfig[key].label}
            </Badge>
          );
        },
      },
      {
        accessorKey: "views",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Views" />
        ),
        cell: ({ row }) => {
          const views = row.getValue("views") as number;
          return (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 text-muted-foreground" />
              <span>{views.toLocaleString()}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {format(new Date(row.getValue("createdAt")), "MMM d, yyyy")}
          </span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <PostActions
            post={row.original}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        ),
      },
    ],
    [handlePublish, handleUnpublish, handleDelete],
  );

  return (
    <SidebarInsetContent>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
            <p className="text-muted-foreground">
              Manage and moderate all blog posts.
            </p>
          </div>
          <Button asChild>
            <Link href="#">
              Create Post
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Feedback banners */}
        {actionSuccess && (
          <div className="flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
            <CheckCircle className="h-4 w-4 shrink-0" />
            {actionSuccess}
          </div>
        )}
        {(error || actionError) && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <XCircle className="h-4 w-4 shrink-0" />
            {actionError ?? error?.message}
          </div>
        )}

        {/* Table */}
        <DataTable
          columns={columns}
          data={posts}
          searchKey="title"
          searchPlaceholder="Search posts..."
          isLoading={loading}
          onRowClick={(row) => router.push(`/dashboard/posts/${row.id}`)}
        />
      </div>
    </SidebarInsetContent>
  );
}
