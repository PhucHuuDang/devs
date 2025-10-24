"use client";

import { createPlatePlugin } from "platejs/react";

import { FloatingToolbar } from "../_editor-components/floating-toolbar";
import { FloatingToolbarButtons } from "../_editor-components/floating-toolbar-buttons";

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: "floating-toolbar",
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      ),
    },
  }),
];
