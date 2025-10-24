import { BaseTocPlugin } from "@platejs/toc";

import { TocElementStatic } from "@/components/editor/_editor-components/toc-node-static";

export const BaseTocKit = [BaseTocPlugin.withComponent(TocElementStatic)];
