import { createWithEqualityFn } from "zustand/traditional";

export type EditorMode = "editing" | "viewing" | "viewClient" | "suggestion";

interface EditorModeState {
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;
  isClientView: () => boolean;
  isAdminView: () => boolean;
  canUseFeatures: () => boolean;
}

export const useEditorMode = createWithEqualityFn<EditorModeState>(
  (set, get) => ({
    mode: "editing",
    setMode: (mode) => set({ mode }),

    // Check if current mode is client view (read-only for regular users)
    isClientView: () => get().mode === "viewClient",

    // Check if current mode is admin view (read-only but with access to features)
    isAdminView: () => get().mode === "viewing",

    // Check if user can use advanced features (editing, viewing as admin, or suggesting)
    canUseFeatures: () => {
      const mode = get().mode;
      return mode === "editing" || mode === "viewing" || mode === "suggestion";
    },
  })
);
