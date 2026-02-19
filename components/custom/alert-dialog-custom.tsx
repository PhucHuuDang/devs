"use client";

import * as React from "react";

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

interface AlertDialogCustomProps {
  /** The element that opens the dialog when clicked (uncontrolled mode) */
  trigger?: React.ReactNode;

  /**
   * Controlled open state. When provided, the component is in controlled mode
   * and `trigger` is ignored for toggling — use `onOpenChange` to update.
   */
  open?: boolean;

  /** Called when the dialog requests to be opened or closed (controlled mode) */
  onOpenChange?: (open: boolean) => void;

  /** Dialog heading */
  title?: string;

  /** Dialog body copy */
  description?: string;

  /** Label for the cancel button */
  cancelLabel?: string;

  /** Label for the confirm / destructive action button */
  confirmLabel?: string;

  /** Called when the user clicks the confirm button */
  onConfirm: () => void;

  /** Called when the user clicks the cancel button (optional) */
  onCancel?: () => void;

  /** Extra class names forwarded to the confirm button */
  confirmClassName?: string;
}

function AlertDialogCustom({
  trigger,
  open,
  onOpenChange,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone.",
  cancelLabel = "Cancel",
  confirmLabel = "Continue",
  onConfirm,
  onCancel,
  confirmClassName,
}: AlertDialogCustomProps) {
  const isControlled = open !== undefined;

  return (
    <AlertDialog
      open={isControlled ? open : undefined}
      onOpenChange={isControlled ? onOpenChange : undefined}
    >
      {!isControlled && trigger && (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      )}
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onCancel?.();
              onOpenChange?.(false);
            }}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction className={confirmClassName} onClick={onConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { AlertDialogCustom };
export type { AlertDialogCustomProps };
