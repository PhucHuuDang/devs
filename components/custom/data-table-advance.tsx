"use client";

import * as React from "react";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ExpandedState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  Columns3,
  GripHorizontal,
  GripVertical,
  Pin,
  PinOff,
  Search,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Types ───────────────────────────────────────────────────────────────────

type Density = "compact" | "normal" | "spacious";

interface DataTableAdvanceProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  pageSize?: number;
  showColumnToggle?: boolean;
  showPagination?: boolean;
  onRowClick?: (row: TData) => void;
  /** Render custom expanded content for a row */
  renderExpandedRow?: (row: TData) => React.ReactNode;
  /** Enable column drag reorder (default: true) */
  enableColumnDrag?: boolean;
  /** Enable row drag reorder (default: false) */
  enableRowDrag?: boolean;
  /** Enable column pinning (default: true) */
  enableColumnPinning?: boolean;
  /** Callback when rows are reordered via drag */
  onRowOrderChange?: (rows: TData[]) => void;
  /** Unique key accessor for row DnD (defaults to "id") */
  getRowId?: (row: TData) => string;
  /** Max height of the scrollable table body. Defaults to calc(100vh - 280px) */
  maxHeight?: string;
}

// ─── Density config ──────────────────────────────────────────────────────────

const densityConfig: Record<Density, { cell: string; label: string }> = {
  compact: { cell: "py-1 px-2 text-xs", label: "Compact" },
  normal: { cell: "py-2 px-3 text-sm", label: "Normal" },
  spacious: { cell: "py-4 px-4 text-sm", label: "Spacious" },
};

// ─── Draggable Column Header ─────────────────────────────────────────────────

function DraggableColumnHeader<TData>({
  header,
  density,
  enableDrag,
  enablePinning,
}: {
  header: import("@tanstack/react-table").Header<TData, unknown>;
  density: Density;
  enableDrag: boolean;
  enablePinning: boolean;
}) {
  const { column } = header;
  const isPinned = column.getIsPinned();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    disabled: !enableDrag || !!isPinned,
  });

  return (
    <TableHead
      ref={setNodeRef}
      data-dragging={isDragging}
      className={cn(
        densityConfig[density].cell,
        "relative z-0 select-none whitespace-nowrap transition-colors",
        isPinned &&
          "sticky z-20 bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
        "data-[dragging=true]:z-10 data-[dragging=true]:opacity-30",
        "data-[dragging=true]:bg-muted/50 data-[dragging=true]:cursor-grabbing",
      )}
      style={{
        transform: CSS.Translate.toString(transform),
        transition: isDragging
          ? "none"
          : "transform 220ms cubic-bezier(0.25, 1, 0.5, 1)",
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        right:
          isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        width: column.getSize(),
        minWidth: column.getSize(),
      }}
    >
      <div className="flex items-center gap-1">
        {/* Drag handle */}
        {enableDrag && !isPinned && (
          <button
            className="cursor-grab touch-none text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripHorizontal className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Header content */}
        <div className="flex-1">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </div>

        {/* Pin control */}
        {enablePinning && column.getCanPin() && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-muted-foreground/40 hover:text-muted-foreground">
                {isPinned ? (
                  <Pin className="h-3 w-3" />
                ) : (
                  <PinOff className="h-3 w-3 opacity-0 group-hover/head:opacity-100 transition-opacity" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-36">
              <DropdownMenuLabel className="text-xs">
                Pin Column
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => column.pin("left")}
                disabled={isPinned === "left"}
              >
                <Pin className="mr-2 h-3.5 w-3.5 rotate-[-45deg]" />
                Pin Left
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => column.pin("right")}
                disabled={isPinned === "right"}
              >
                <Pin className="mr-2 h-3.5 w-3.5 rotate-45" />
                Pin Right
              </DropdownMenuItem>
              {isPinned && (
                <DropdownMenuItem onClick={() => column.pin(false)}>
                  <PinOff className="mr-2 h-3.5 w-3.5" />
                  Unpin
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </TableHead>
  );
}

// ─── Column Drag Overlay ────────────────────────────────────────────────────────
// Shows the full column (header + visible cells) as a floating ghost.

function ColumnDragOverlay<TData>({
  header,
  rows,
  density,
}: {
  header: import("@tanstack/react-table").Header<TData, unknown>;
  rows: Row<TData>[];
  density: Density;
}) {
  const { column } = header;
  const visibleRows = rows.slice(0, 8);

  return (
    <div
      className={cn(
        "rounded-md border bg-background overflow-hidden",
        "shadow-[0_16px_48px_rgba(0,0,0,0.22)] ring-1 ring-primary/20",
        "cursor-grabbing select-none",
      )}
      style={{ minWidth: column.getSize(), maxWidth: column.getSize() }}
    >
      {/* Header row */}
      <div
        className={cn(
          densityConfig[density].cell,
          "flex items-center gap-2 border-b bg-muted/80 font-semibold text-foreground",
        )}
      >
        <GripHorizontal className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="truncate text-sm">
          {header.isPlaceholder
            ? column.id
            : flexRender(column.columnDef.header, header.getContext())}
        </span>
      </div>

      {/* Cell values */}
      {visibleRows.map((row, i) => {
        const cell = row
          .getVisibleCells()
          .find((c) => c.column.id === column.id);
        if (!cell) return null;
        return (
          <div
            key={row.id}
            className={cn(
              densityConfig[density].cell,
              "truncate text-sm text-foreground border-b last:border-0",
              i % 2 === 0 ? "bg-background" : "bg-muted/20",
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </div>
  );
}

// ─── Row Drag Overlay ────────────────────────────────────────────────────────

function RowDragOverlay<TData>({
  row,
  density,
  enableExpand,
  enableDrag,
}: {
  row: Row<TData>;
  density: Density;
  enableExpand: boolean;
  enableDrag: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0, y: 0 }}
      animate={{ scale: 1.015, opacity: 1, y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.5 }}
      className={cn(
        "rounded-xl border border-primary/20 bg-background/85 backdrop-blur-md",
        "overflow-hidden cursor-grabbing select-none",
        "shadow-[0_20px_56px_rgba(0,0,0,0.24),0_0_0_1px_hsl(var(--primary)/0.2)]",
      )}
    >
      {/* Left accent bar */}
      <div className="absolute inset-y-0 left-0 w-0.5 bg-linear-to-b from-primary/80 via-primary/40 to-transparent rounded-l-xl" />

      <table className="w-auto border-collapse">
        <tbody>
          <tr className="bg-linear-to-r from-primary/8 to-transparent">
            {enableDrag && (
              <td className={cn(densityConfig[density].cell, "w-8 pl-3")}>
                <GripVertical className="h-4 w-4 text-primary" />
              </td>
            )}
            {enableExpand && (
              <td className={cn(densityConfig[density].cell, "w-8")} />
            )}
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={cn(
                  densityConfig[density].cell,
                  "whitespace-nowrap text-sm text-foreground",
                )}
                style={{
                  width: cell.column.getSize(),
                  minWidth: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

// ─── Motion TableRow for sort animations ─────────────────────────────────────

const MotionTableRow = motion.create(TableRow);

// ─── Draggable Row ───────────────────────────────────────────────────────────

function DraggableRow<TData>({
  row,
  density,
  enableDrag,
  enableExpand,
  colSpan,
  onRowClick,
  renderExpandedRow,
  pinnedColumns,
  draggingColumnId,
  isDndActive,
}: {
  row: Row<TData>;
  density: Density;
  enableDrag: boolean;
  enableExpand: boolean;
  colSpan: number;
  onRowClick?: (row: TData) => void;
  renderExpandedRow?: (row: TData) => React.ReactNode;
  pinnedColumns: ColumnPinningState;
  /** Column id currently being drag-reordered (to dim matching cells) */
  draggingColumnId: string | null;
  /** True when ANY drag (row or column) is in progress */
  isDndActive: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: row.id,
    disabled: !enableDrag,
  });

  // When dnd is active, let dnd-kit handle positioning via transforms.
  // When no dnd is active, don't apply any transform — let motion's layout
  // handle smooth repositioning for sort changes.
  // NOTE: will-change: transform is REQUIRED to make CSS transforms work on
  // <tr> elements which normally have display: table-row and ignore transforms.
  const style: React.CSSProperties = {
    transform: isDndActive ? CSS.Translate.toString(transform) : undefined,
    transition: isDndActive ? (transition ?? undefined) : undefined,
    position: "relative" as const,
    zIndex: isDragging ? 20 : 0,
    willChange: "transform",
  };

  return (
    <>
      <MotionTableRow
        ref={setNodeRef}
        // Enable layout animations only for sort changes (not during drag)
        layout={!isDndActive}
        layoutId={`row-${row.id}`}
        transition={{
          layout: {
            type: "spring",
            stiffness: 350,
            damping: 30,
            mass: 0.8,
          },
        }}
        data-state={row.getIsSelected() && "selected"}
        data-dragging={isDragging}
        onClick={() => onRowClick?.(row.original)}
        className={cn(
          "border-b",
          "hover:bg-muted/50 data-[state=selected]:bg-muted",
          isDragging && "opacity-50 bg-muted/30",
          !isDragging && "transition-colors",
          onRowClick && "cursor-pointer",
        )}
        style={style}
      >
        {/* Drag handle cell */}
        {enableDrag && (
          <TableCell className={cn(densityConfig[density].cell, "w-8")}>
            <button
              className="cursor-grab touch-none text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </button>
          </TableCell>
        )}

        {/* Expand toggle cell */}
        {enableExpand && (
          <TableCell className={cn(densityConfig[density].cell, "w-8")}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              <motion.div
                animate={{ rotate: row.getIsExpanded() ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </button>
          </TableCell>
        )}

        {/* Data cells */}
        {row.getVisibleCells().map((cell) => {
          const isPinned = cell.column.getIsPinned();
          return (
            <TableCell
              key={cell.id}
              className={cn(
                densityConfig[density].cell,
                isPinned &&
                  "sticky bg-background shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]",
                // Dim this cell while its column is being dragged
                cell.column.id === draggingColumnId &&
                  "opacity-30 outline-2 outline-dashed outline-primary/30 -outline-offset-1",
              )}
              style={{
                left:
                  isPinned === "left"
                    ? `${cell.column.getStart("left")}px`
                    : undefined,
                right:
                  isPinned === "right"
                    ? `${cell.column.getAfter("right")}px`
                    : undefined,
                zIndex: isPinned ? 10 : 0,
                width: cell.column.getSize(),
                minWidth: cell.column.getSize(),
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
      </MotionTableRow>

      {/* Expanded row content */}
      <AnimatePresence>
        {enableExpand && row.getIsExpanded() && renderExpandedRow && (
          <tr>
            <td colSpan={colSpan + (enableDrag ? 1 : 0) + 1}>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-b bg-muted/20 px-6 py-4">
                  {renderExpandedRow(row.original)}
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Sortable Column Header (sort only, no DnD) ─────────────────────────────

export function AdvancedColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8 data-[state=open]:bg-accent", className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span>{title}</span>
      <motion.div
        className="ml-1.5"
        animate={{ rotate: sorted === "asc" ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {sorted === "desc" ? (
          <ChevronDown className="h-4 w-4" />
        ) : sorted === "asc" ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
        )}
      </motion.div>
    </Button>
  );
}

// ─── Select Column Helper ────────────────────────────────────────────────────

export function getAdvancedSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enablePinning: false,
    size: 40,
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function DataTableAdvance<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  isLoading = false,
  pageSize = 10,
  showColumnToggle = true,
  showPagination = true,
  onRowClick,
  renderExpandedRow,
  enableColumnDrag = true,
  enableRowDrag = false,
  enableColumnPinning = true,
  onRowOrderChange,
  getRowId,
  maxHeight,
}: DataTableAdvanceProps<TData, TValue>) {
  // ── State ────────────────────────────────────────────────────────────────
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [density, setDensity] = React.useState<Density>("normal");
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: [],
    right: [],
  });

  // Column order for DnD
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    columns.map((c) => {
      if ("accessorKey" in c && c.accessorKey) return c.accessorKey as string;
      if ("id" in c && c.id) return c.id;
      return "";
    }),
  );

  // Row order for DnD
  const defaultGetRowId = React.useCallback(
    (row: TData) => (row as Record<string, unknown>).id as string,
    [],
  );
  const resolvedGetRowId = getRowId ?? defaultGetRowId;
  const [rowOrder, setRowOrder] = React.useState<string[]>(
    data.map(resolvedGetRowId),
  );

  // Sync rowOrder when data changes
  React.useEffect(() => {
    setRowOrder(data.map(resolvedGetRowId));
  }, [data, resolvedGetRowId]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor),
  );

  // ── Active drag tracking (for DragOverlay) ───────────────────────────────
  const [activeColumnId, setActiveColumnId] =
    React.useState<UniqueIdentifier | null>(null);
  const [activeRowId, setActiveRowId] = React.useState<UniqueIdentifier | null>(
    null,
  );
  const [dragType, setDragType] = React.useState<"column" | "row" | null>(null);

  // ── Table instance ───────────────────────────────────────────────────────
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded,
      columnOrder,
      columnPinning,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    onColumnOrderChange: setColumnOrder,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableColumnPinning,
    getRowId: (row) => resolvedGetRowId(row),
    initialState: {
      pagination: { pageSize },
    },
  });

  // Sorted rows: column sort takes priority over manual drag order
  const sortedRows = React.useMemo(() => {
    const rows = table.getRowModel().rows;
    // When a column sort is active, let the table's sort model handle order
    if (!enableRowDrag || sorting.length > 0) return rows;
    // Otherwise, apply the user's manual drag order
    return [...rows].sort(
      (a, b) => rowOrder.indexOf(a.id) - rowOrder.indexOf(b.id),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getRowModel().rows, rowOrder, enableRowDrag, sorting]);

  const enableExpand = !!renderExpandedRow;
  const headerColumnIds =
    table.getHeaderGroups()[0]?.headers.map((h) => h.column.id) ?? [];
  const totalColSpan =
    columns.length + (enableRowDrag ? 1 : 0) + (enableExpand ? 1 : 0);

  // ── DnD handlers (defined after table + headerColumnIds are available) ───
  const activeHeader = React.useMemo(() => {
    if (!activeColumnId) return undefined;
    return table
      .getHeaderGroups()[0]
      ?.headers.find((h) => h.column.id === activeColumnId);
  }, [activeColumnId, table]);

  const activeRow = React.useMemo(() => {
    if (!activeRowId) return undefined;
    return sortedRows.find((r) => r.id === activeRowId);
  }, [activeRowId, sortedRows]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (headerColumnIds.includes(active.id as string)) {
      setDragType("column");
      setActiveColumnId(active.id);
    } else {
      setDragType("row");
      setActiveRowId(active.id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const currentDragType = dragType;

    // Reset all drag state
    setActiveColumnId(null);
    setActiveRowId(null);
    setDragType(null);

    if (!over || active.id === over.id) return;

    // Column reorder
    if (currentDragType === "column") {
      setColumnOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    // Row reorder
    if (currentDragType === "row") {
      setRowOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        const newOrder = arrayMove(prev, oldIndex, newIndex);

        // Notify parent with reordered data
        if (onRowOrderChange) {
          const reorderedData = newOrder
            .map((id) => data.find((d) => resolvedGetRowId(d) === id))
            .filter(Boolean) as TData[];
          onRowOrderChange(reorderedData);
        }

        return newOrder;
      });
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <TooltipProvider>
      <div className="w-full space-y-3">
        {/* ── Toolbar ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {searchKey && (
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            {/* Density switcher */}
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1.5">
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <rect x="1" y="2" width="14" height="2" rx="0.5" />
                        <rect x="1" y="7" width="14" height="2" rx="0.5" />
                        <rect x="1" y="12" width="14" height="2" rx="0.5" />
                      </svg>
                      <span className="hidden sm:inline">
                        {densityConfig[density].label}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>Row density</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs">
                  Row Density
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(Object.keys(densityConfig) as Density[]).map((d) => (
                  <DropdownMenuCheckboxItem
                    key={d}
                    checked={density === d}
                    onCheckedChange={() => setDensity(d)}
                  >
                    {densityConfig[d].label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Column visibility */}
            {showColumnToggle && (
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1.5"
                      >
                        <Columns3 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Columns</span>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Toggle columns</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel className="text-xs">
                    Toggle Columns
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* ── Table ────────────────────────────────────────────────────── */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div
            className="overflow-x-auto rounded-lg border"
            style={{ maxHeight }}
          >
            <Table className="w-full">
              {/* Header */}
              <TableHeader className="sticky top-0 bg-background">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="group/head">
                    {/* Row drag handle header */}
                    {enableRowDrag && (
                      <TableHead
                        className={cn(densityConfig[density].cell, "w-8")}
                      />
                    )}
                    {/* Expand toggle header */}
                    {enableExpand && (
                      <TableHead
                        className={cn(densityConfig[density].cell, "w-8")}
                      />
                    )}
                    {/* Column headers */}
                    <SortableContext
                      items={headerGroup.headers.map((h) => h.column.id)}
                      strategy={horizontalListSortingStrategy}
                    >
                      {headerGroup.headers.map((header) => (
                        <DraggableColumnHeader
                          key={header.id}
                          header={header}
                          density={density}
                          enableDrag={enableColumnDrag}
                          enablePinning={enableColumnPinning}
                        />
                      ))}
                    </SortableContext>
                  </TableRow>
                ))}
              </TableHeader>

              {/* Body */}
              <TableBody>
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: pageSize }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      {enableRowDrag && (
                        <TableCell className={densityConfig[density].cell}>
                          <Skeleton className="h-4 w-4" />
                        </TableCell>
                      )}
                      {enableExpand && (
                        <TableCell className={densityConfig[density].cell}>
                          <Skeleton className="h-4 w-4" />
                        </TableCell>
                      )}
                      {columns.map((_, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className={densityConfig[density].cell}
                        >
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : sortedRows.length ? (
                  <SortableContext
                    items={sortedRows.map((r) => r.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <LayoutGroup>
                      {sortedRows.map((row) => (
                        <DraggableRow
                          key={row.id}
                          row={row}
                          density={density}
                          enableDrag={enableRowDrag}
                          enableExpand={enableExpand}
                          colSpan={columns.length}
                          onRowClick={onRowClick}
                          renderExpandedRow={renderExpandedRow}
                          pinnedColumns={columnPinning}
                          draggingColumnId={activeColumnId as string | null}
                          isDndActive={dragType !== null}
                        />
                      ))}
                    </LayoutGroup>
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={totalColSpan}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Drag overlay – floats dragged column or row as a ghost */}
          <DragOverlay
            dropAnimation={{
              duration: 220,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {activeColumnId && activeHeader ? (
              <ColumnDragOverlay
                header={activeHeader}
                rows={sortedRows}
                density={density}
              />
            ) : null}
            {activeRowId && activeRow ? (
              <RowDragOverlay
                row={activeRow}
                density={density}
                enableExpand={enableExpand}
                enableDrag={enableRowDrag}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* ── Pagination ───────────────────────────────────────────────── */}
        {showPagination && (
          <div className="flex items-center justify-between px-1">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center gap-4">
              {/* Rows per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Rows per page
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="h-8 w-[70px] rounded-md border border-input bg-background px-2 text-sm"
                >
                  {[10, 20, 30, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Page indicator */}
              <span className="text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </span>

              {/* Navigation */}
              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
