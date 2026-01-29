"use client";

import React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal, Shield, ShieldOff, User, Mail } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { generateMockUsersTable, UserTableItem } from "@/mock/admin";

const roleConfig = {
  admin: {
    label: "Admin",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  author: {
    label: "Author",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  user: {
    label: "User",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
};

const statusConfig = {
  active: { label: "Active", variant: "default" as const },
  banned: { label: "Banned", variant: "destructive" as const },
  pending: { label: "Pending", variant: "outline" as const },
};

const columns: ColumnDef<UserTableItem>[] = [
  getSelectColumn<UserTableItem>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as UserTableItem["role"];
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            roleConfig[role].className,
          )}
        >
          {roleConfig[role].label}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as UserTableItem["status"];
      return (
        <Badge variant={statusConfig[status].variant}>
          {statusConfig[status].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "postsCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Posts" />
    ),
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("postsCount")}</span>;
    },
  },
  {
    accessorKey: "joinedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {format(row.getValue("joinedAt"), "MMM d, yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "lastActiveAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Active" />
    ),
    cell: ({ row }) => {
      return (
        <span className="text-sm text-muted-foreground">
          {format(row.getValue("lastActiveAt"), "MMM d, yyyy")}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.role !== "admin" && (
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Promote to Author
              </DropdownMenuItem>
            )}
            {user.status === "active" ? (
              <DropdownMenuItem className="text-destructive">
                <ShieldOff className="mr-2 h-4 w-4" />
                Ban User
              </DropdownMenuItem>
            ) : user.status === "banned" ? (
              <DropdownMenuItem className="text-green-600">
                <Shield className="mr-2 h-4 w-4" />
                Unban User
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function UsersManagementPage() {
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  // In real app, fetch from GraphQL
  const allUsers = React.useMemo(() => generateMockUsersTable(50), []);

  const filteredUsers = React.useMemo(() => {
    return allUsers.filter((user) => {
      if (roleFilter !== "all" && user.role !== roleFilter) return false;
      if (statusFilter !== "all" && user.status !== statusFilter) return false;
      return true;
    });
  }, [allUsers, roleFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage platform users and permissions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        searchKey="name"
        searchPlaceholder="Search users..."
      />
    </div>
  );
}
