"use client";

import * as React from "react";
import { useEditorMode } from "@/hooks/zustand/use-editor-mode";

interface FeatureGuardProps {
  children: React.ReactNode;
  /** If true, shows content only for admin view (viewing mode with features) */
  adminOnly?: boolean;
  /** If true, hides content in client view mode */
  hideInClientView?: boolean;
  /** If true, shows content only when features are available (editing, viewing, or suggestion) */
  requireFeatures?: boolean;
}

/**
 * A component to conditionally render content based on editor mode.
 *
 * @example
 * // Show only for admin
 * <FeatureGuard adminOnly>
 *   <AdvancedToolbar />
 * </FeatureGuard>
 *
 * @example
 * // Hide in client view
 * <FeatureGuard hideInClientView>
 *   <EditButton />
 * </FeatureGuard>
 *
 * @example
 * // Show only when features are available (not in client view)
 * <FeatureGuard requireFeatures>
 *   <AIAssistant />
 * </FeatureGuard>
 */
export function FeatureGuard({
  children,
  adminOnly = false,
  hideInClientView = false,
  requireFeatures = false,
}: FeatureGuardProps) {
  const { isClientView, isAdminView, canUseFeatures } = useEditorMode();

  // If adminOnly is true, only show for admin view
  if (adminOnly && !isAdminView()) {
    return null;
  }

  // If hideInClientView is true, hide in client view
  if (hideInClientView && isClientView()) {
    return null;
  }

  // If requireFeatures is true, only show when features are available
  if (requireFeatures && !canUseFeatures()) {
    return null;
  }

  return <>{children}</>;
}
