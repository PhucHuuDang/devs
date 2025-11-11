# Editor Modes Documentation

This document explains how to use the editor mode system to control access to features based on user roles.

## Overview

The editor now supports four distinct modes:

1. **Editing Mode** - Full editing capabilities (for content creators/admins)
2. **Viewing Mode** - Read-only with admin features like highlighting and commenting (for admins/reviewers)
3. **View Client Mode** - Read-only mode for end users (no editing features, minimal toolbar)
4. **Suggestion Mode** - Collaborative editing with suggestions (for reviewers)

## Hook: `useEditorMode`

Located in: `/hooks/use-editor-mode.ts`

### Usage

```typescript
import { useEditorMode } from "@/hooks/use-editor-mode";

function MyComponent() {
  const { mode, setMode, isClientView, isAdminView, canUseFeatures } =
    useEditorMode();

  // Check current mode
  if (isClientView()) {
    // User is in client view mode - show minimal features
  }

  if (isAdminView()) {
    // Admin is viewing - can use features like highlight/comment
  }

  if (canUseFeatures()) {
    // Can use advanced features (editing, viewing as admin, or suggesting)
  }
}
```

### API

- `mode`: Current editor mode (`"editing" | "viewing" | "viewClient" | "suggestion"`)
- `setMode(mode)`: Change the editor mode
- `isClientView()`: Returns `true` if in client view mode
- `isAdminView()`: Returns `true` if in admin viewing mode
- `canUseFeatures()`: Returns `true` if user can access advanced features

## Component: `FeatureGuard`

Located in: `/components/editor/_editor-components/feature-guard.tsx`

A React component to conditionally render content based on editor mode.

### Props

- `adminOnly?: boolean` - Show content only in admin view mode
- `hideInClientView?: boolean` - Hide content when in client view mode
- `requireFeatures?: boolean` - Show content only when features are available

### Examples

#### Hide Toolbar in Client View

```tsx
import { FeatureGuard } from "@/components/editor/_editor-components/feature-guard";

function Toolbar() {
  return (
    <FeatureGuard hideInClientView>
      <div className="toolbar">{/* Advanced editing tools */}</div>
    </FeatureGuard>
  );
}
```

#### Admin-Only Features

```tsx
import { FeatureGuard } from "@/components/editor/_editor-components/feature-guard";

function AdminPanel() {
  return (
    <FeatureGuard adminOnly>
      <div className="admin-panel">
        {/* Only visible in admin viewing mode */}
      </div>
    </FeatureGuard>
  );
}
```

#### Require Features Access

```tsx
import { FeatureGuard } from "@/components/editor/_editor-components/feature-guard";

function CommentButton() {
  return (
    <FeatureGuard requireFeatures>
      <button>Add Comment</button>
    </FeatureGuard>
  );
}
```

## Mode Toolbar Button

Located in: `/components/editor/_editor-components/mode-toolbar-button.tsx`

The mode toolbar button allows users to switch between different editor modes:

- **Editing** (Pen icon) - Full editing mode
- **Viewing** (Shield icon) - Admin view with features
- **Viewing Client** (Eye icon) - Client view, read-only
- **Suggestion** (Pencil icon) - Suggestion mode for collaborative editing

## Implementation in Blog Details

To use this in your blog detail page, you can initialize the editor mode based on user role:

```tsx
"use client";

import { useEffect } from "react";
import { useEditorMode } from "@/hooks/use-editor-mode";
import { useSession } from "next-auth/react"; // or your auth solution

export function BlogDetailPage() {
  const { setMode } = useEditorMode();
  const { data: session } = useSession();

  useEffect(() => {
    // Set mode based on user role
    if (!session) {
      // Not logged in - show client view
      setMode("viewClient");
    } else if (
      session.user.role === "admin" ||
      session.user.role === "editor"
    ) {
      // Admin/Editor - show viewing mode with features
      setMode("viewing");
    } else {
      // Regular user - show client view
      setMode("viewClient");
    }
  }, [session, setMode]);

  return <div>{/* Your blog content */}</div>;
}
```

## Key Differences

### Viewing Mode (Admin) vs View Client Mode

| Feature        | Viewing Mode | View Client Mode |
| -------------- | ------------ | ---------------- |
| Edit content   | ❌           | ❌               |
| Highlight text | ✅           | ❌               |
| Add comments   | ✅           | ❌               |
| Export content | ❌           | ❌               |
| Mode switcher  | ✅           | ✅               |
| Full toolbar   | ❌           | ❌               |

### Editing Mode vs Suggestion Mode

| Feature        | Editing Mode | Suggestion Mode     |
| -------------- | ------------ | ------------------- |
| Edit content   | ✅ (Direct)  | ✅ (As suggestions) |
| Highlight text | ✅           | ✅                  |
| Add comments   | ✅           | ✅                  |
| Full toolbar   | ✅           | ✅                  |
| Track changes  | ❌           | ✅                  |

## Best Practices

1. **Set mode on page load**: Initialize the editor mode based on user role when the page loads
2. **Use FeatureGuard consistently**: Wrap all admin/editor-only features with `FeatureGuard`
3. **Provide clear UI feedback**: Show users which mode they're in
4. **Test all modes**: Ensure your app works correctly in all four modes
5. **Preserve mode in URL**: Consider adding mode to URL params for sharing (e.g., `?mode=viewClient`)
