"use client";

/**
 * EXAMPLE: Enhanced Blog Detail Component with Editor Mode Support
 *
 * This is an example of how to use the editor mode system in your blog detail page.
 * Copy this code and adapt it to your needs, integrating with your authentication system.
 */

import { useEffect } from "react";

import dynamic from "next/dynamic";

import { PostModel } from "@/app/graphql/__generated__/graphql";
import { SimpleLoading } from "@/components/loading-components/simple-loading";
import { useEditorMode } from "@/stores/use-editor-mode";

// Uncomment and use your actual auth hook
// import { useSession } from "next-auth/react";
// import { useAuth } from "@/hooks/use-auth";

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
    loading() {
      return <SimpleLoading />;
    },
  },
);

export const BlogDetailWithMode = ({
  data,
  forcedMode,
}: BlogDetailWithModeProps) => {
  const { setMode } = useEditorMode();

  // Example 1: Using next-auth (uncomment if you use next-auth)
  // const { data: session, status } = useSession();

  // Example 2: Using custom auth hook (uncomment if you use custom auth)
  // const { user, isLoading } = useAuth();

  useEffect(() => {
    // If forcedMode is provided, use it
    if (forcedMode) {
      setMode(forcedMode);
      return;
    }

    // Otherwise, set mode based on user authentication/role

    // Example 1: Using next-auth
    // if (status === "loading") return;
    //
    // if (!session) {
    //   // Not logged in - show client view (minimal features)
    //   setMode("viewClient");
    // } else if (session.user.role === "admin" || session.user.role === "editor") {
    //   // Admin or Editor - show viewing mode with features (highlight, comment)
    //   setMode("viewing");
    // } else {
    //   // Regular logged-in user - show client view
    //   setMode("viewClient");
    // }

    // Example 2: Using custom auth
    // if (isLoading) return;
    //
    // if (!user) {
    //   setMode("viewClient");
    // } else if (user.isAdmin || user.isEditor) {
    //   setMode("viewing");
    // } else {
    //   setMode("viewClient");
    // }

    // Example 3: Simple - always show client view for public blog posts
    setMode("viewClient");

    // Example 4: Check if current user is the author
    // if (user && user.id === data.author?.id) {
    //   // Author can edit their own post
    //   setMode("editing");
    // } else if (user?.isAdmin) {
    //   // Admin can view with features
    //   setMode("viewing");
    // } else {
    //   // Everyone else sees client view
    //   setMode("viewClient");
    // }
  }, [setMode, forcedMode]); // Add your auth dependencies here

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
