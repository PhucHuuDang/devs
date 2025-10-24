import { BaseLinkPlugin } from "@platejs/link";

import { LinkElementStatic } from "@/components/editor/_editor-components/link-node-static";

export const BaseLinkKit = [BaseLinkPlugin.withComponent(LinkElementStatic)];
