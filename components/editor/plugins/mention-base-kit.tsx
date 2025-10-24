import { BaseMentionPlugin } from "@platejs/mention";

import { MentionElementStatic } from "@/components/editor/_editor-components/mention-node-static";

export const BaseMentionKit = [
  BaseMentionPlugin.withComponent(MentionElementStatic),
];
