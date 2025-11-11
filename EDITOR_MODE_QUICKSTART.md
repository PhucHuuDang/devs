# Editor Mode System - Quick Start Guide

## What Was Implemented

A complete editor mode system that differentiates between:
- **Client View**: For regular users reading blogs (minimal features, read-only)
- **Admin View**: For admins/editors viewing content (read-only with highlighting and commenting)
- **Editing Mode**: Full editing capabilities
- **Suggestion Mode**: Collaborative editing with tracked changes

## Files Created/Modified

### New Files Created:
1. **`/hooks/use-editor-mode.ts`** - Zustand hook for managing editor modes
2. **`/components/editor/_editor-components/feature-guard.tsx`** - Component for conditionally rendering features
3. **`/components/editor/EDITOR_MODES.md`** - Full documentation
4. **`/components/_url-segment/blog/blog-details-components/blog-detail-with-mode.example.tsx`** - Example implementation

### Modified Files:
1. **`/components/editor/_editor-components/mode-toolbar-button.tsx`** - Updated to support all 4 modes
2. **`/components/editor/_editor-components/fixed-toolbar-buttons.tsx`** - Uses FeatureGuard for conditional features

## Quick Usage

### 1. In Your Blog Detail Page

```tsx
import { useEffect } from "react";
import { useEditorMode } from "@/hooks/use-editor-mode";

export function BlogDetailPage() {
  const { setMode } = useEditorMode();
  
  useEffect(() => {
    // For regular users viewing blogs
    setMode("viewClient");
    
    // Or check user role:
    // if (user?.isAdmin) {
    //   setMode("viewing"); // Admin view with features
    // } else {
    //   setMode("viewClient"); // Client view
    // }
  }, [setMode]);
  
  return <PlateEditor value={content} readonly={true} />;
}
```

### 2. Hide Features in Client View

```tsx
import { FeatureGuard } from "@/components/editor/_editor-components/feature-guard";

function MyToolbar() {
  return (
    <FeatureGuard hideInClientView>
      <button>Advanced Feature</button>
    </FeatureGuard>
  );
}
```

### 3. Check Mode Programmatically

```tsx
const { isClientView, isAdminView, canUseFeatures } = useEditorMode();

if (isClientView()) {
  // User is in client view - minimal UI
}
```

## Mode Comparison

| Mode | Can Edit | Can Highlight | Can Comment | Full Toolbar | Use Case |
|------|----------|---------------|-------------|--------------|----------|
| **View Client** | ❌ | ❌ | ❌ | ❌ | Regular users reading blogs |
| **Viewing** | ❌ | ✅ | ✅ | ❌ | Admins reviewing content |
| **Editing** | ✅ | ✅ | ✅ | ✅ | Content creators/editors |
| **Suggestion** | ✅* | ✅ | ✅ | ✅ | Collaborative review |

*Edits are tracked as suggestions

## How It Works

1. **Mode Toolbar Button**: Users can switch between modes using the mode button in the editor toolbar
2. **FeatureGuard Component**: Automatically hides/shows features based on current mode
3. **Zustand Store**: Persists the current mode globally across components

## Testing

To test different modes:
1. Open the editor
2. Click the mode button (top-right toolbar)
3. Select:
   - **Editing** (Pen icon) - See all features
   - **Viewing** (Shield icon) - See admin view with highlight/comment
   - **Viewing Client** (Eye icon) - See minimal client view
   - **Suggestion** (Pencil icon) - See collaborative mode

## Next Steps

1. **Integrate with Authentication**: 
   - See `blog-detail-with-mode.example.tsx` for examples
   - Set mode based on user role on page load

2. **Customize Feature Access**:
   - Use `FeatureGuard` to control what features show in each mode
   - Add more granular permissions as needed

3. **Add Visual Indicators**:
   - Show users which mode they're in
   - Display appropriate UI feedback

4. **Persist Mode**:
   - Add mode to URL params for sharing
   - Save user's preferred mode in localStorage

## Example Integration with Auth

```tsx
// In your blog detail page
useEffect(() => {
  if (!isAuthenticated) {
    setMode("viewClient"); // Not logged in
    return;
  }
  
  if (isAuthor || isAdmin) {
    setMode("viewing"); // Can use features
  } else {
    setMode("viewClient"); // Regular user
  }
}, [isAuthenticated, isAuthor, isAdmin]);
```

## Support

For more details, see:
- Full documentation: `/components/editor/EDITOR_MODES.md`
- Example implementation: `/components/_url-segment/blog/blog-details-components/blog-detail-with-mode.example.tsx`

