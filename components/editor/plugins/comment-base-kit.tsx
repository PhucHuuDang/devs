import { BaseCommentPlugin } from "@platejs/comment";

import { CommentLeafStatic } from "@/components/editor/_editor-components/comment-node-static";

export const BaseCommentKit = [
  BaseCommentPlugin.withComponent(CommentLeafStatic),
];
