"use client";

/**
 * ENHANCED: Blog Detail Component with Editor Mode Support
 *
 * The loading component now visually mimics the editor's shape/skeleton.
 */

import { useEffect } from "react";

import dynamic from "next/dynamic";

import { PostModel } from "@/app/graphql/__generated__/generated";
import { useEditorMode } from "@/stores/use-editor-mode";

function PlateEditorLoadingSkeleton() {
  return (
    <div
      className="relative w-full min-h-[350px] max-w-5xl mx-auto my-10 bg-primary border border-gray-200 shadow rounded-2xl overflow-hidden"
      aria-label="Editor loading"
    >
      <div className="px-6 pt-8">
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-6 animate-pulse" />
      </div>
      <div className="px-6 flex items-center gap-2 mb-4">
        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-10 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="px-6 pb-8 space-y-3">
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-11/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-9/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-52 w-full bg-gray-100 rounded mt-6 animate-pulse" />
        <div className="h-6 w-8/12 bg-gray-200 rounded animate-pulse mt-6" />
        <div className="h-6 w-10/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-6/12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}

interface BlogDetailWithModeProps {
  data: PostModel;
  /** Override default mode (useful for testing or specific use cases) */
  forcedMode?: "editing" | "viewing" | "viewClient" | "suggestion";
}

const PlateEditor = dynamic(
  () =>
    import("@/components/editor/plate-editor").then((mod) => mod.PlateEditor),
  {
    // ssr: false,
    loading: () => <PlateEditorLoadingSkeleton />,
  },
);

export const BlogDetailWithMode = ({
  data,
  forcedMode,
}: BlogDetailWithModeProps) => {
  const { setMode } = useEditorMode();

  useEffect(() => {
    if (forcedMode) {
      setMode(forcedMode);
      return;
    }

    // Simple: always show client view for public blog posts
    setMode("viewClient");

    // Add your auth logic here if needed
  }, [setMode, forcedMode]);

  return (
    <>
      {/* Optional: Show current mode indicator (for debugging) */}
      {/* <ModeIndicator /> */}

      <PlateEditor
        value={data?.content || []}
        readonly={true}
        onChange={() => {}}
      />
    </>
  );
};

/**
 * Optional: Mode Indicator Component (for debugging)
 */
export function ModeIndicator() {
  const { mode, isClientView, isAdminView } = useEditorMode();

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white shadow-lg">
      <div>
        Current Mode: <strong>{mode}</strong>
      </div>
      <div className="mt-1 text-xs text-gray-400">
        {isClientView() && "🔒 Client View (Minimal Features)"}
        {isAdminView() && "🛡️ Admin View (With Features)"}
        {mode === "editing" && "✏️ Editing Mode"}
        {mode === "suggestion" && "💡 Suggestion Mode"}
      </div>
    </div>
  );
}
