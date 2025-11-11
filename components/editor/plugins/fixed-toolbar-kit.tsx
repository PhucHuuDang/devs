"use client";

import { createPlatePlugin } from "platejs/react";

import { FixedToolbar } from "../_editor-components/fixed-toolbar";
import { FixedToolbarButtons } from "../_editor-components/fixed-toolbar-buttons";

export const FixedToolbarKit = [
  createPlatePlugin({
    key: "fixed-toolbar",
    render: {
      beforeEditable: () => (
        <FixedToolbar className="border-0">
          <FixedToolbarButtons />
        </FixedToolbar>
      ),
    },
  }),
];
