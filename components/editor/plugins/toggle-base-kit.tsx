import { BaseTogglePlugin } from "@platejs/toggle";

import { ToggleElementStatic } from "@/components/editor/_editor-components/toggle-node-static";

export const BaseToggleKit = [
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
