import { BaseSuggestionPlugin } from "@platejs/suggestion";

import { SuggestionLeafStatic } from "@/components/editor/_editor-components/suggestion-node-static";

export const BaseSuggestionKit = [
  BaseSuggestionPlugin.withComponent(SuggestionLeafStatic),
];
