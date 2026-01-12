import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

import createSelectors from "./auto-selector";

interface EditorContentLocalProps {
  content: string;
  setContent: (content: string) => void;
}

export const useEditorContentLocal =
  createWithEqualityFn<EditorContentLocalProps>()(
    persist(
      immer((set, get) => ({
        content: "",
        setContent: (content) => set({ content }),
      })),
      {
        name: "editor-content-local",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );

export const useEditorContentLocalSelectors = createSelectors(
  useEditorContentLocal,
);
