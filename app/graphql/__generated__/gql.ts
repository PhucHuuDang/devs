/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateBlog(\n    $title: String!\n    $description: String!\n    $slug: String!\n    $mainImage: String!\n    $categoryId: String!\n    $tags: [String!]!\n    $content: JSON!\n    $authorId: String!\n    $isPublished: Boolean!\n  ) {\n    createPost(\n      title: $title\n      description: $description\n      slug: $slug\n      mainImage: $mainImage\n      tags: $tags\n      content: $content\n      isPublished: $isPublished\n      authorId: $authorId\n      categoryId: $categoryId\n    ) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n": typeof types.CreateBlogDocument,
    "\n  mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {\n    updatePost(id: $id, data: $data) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n": typeof types.UpdateBlogDocument,
    "\n  query GetPosts {\n    allPosts {\n      id\n      title\n      mainImage\n      description\n      content\n      votes\n      authorId\n      categoryId\n      createdAt\n      updatedAt\n      tags\n      slug\n      views\n      isPublished\n      isPriority\n      isPinned\n      isDeleted\n\n      author {\n        id\n        name\n        avatarUrl\n        bio\n        designation\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetPostsDocument,
    "\n  query GetPostBySlug($slug: String!) {\n    findPostBySlug(slug: $slug) {\n      id\n      title\n      description\n      mainImage\n      createdAt\n    }\n  }\n": typeof types.GetPostBySlugDocument,
};
const documents: Documents = {
    "\n  mutation CreateBlog(\n    $title: String!\n    $description: String!\n    $slug: String!\n    $mainImage: String!\n    $categoryId: String!\n    $tags: [String!]!\n    $content: JSON!\n    $authorId: String!\n    $isPublished: Boolean!\n  ) {\n    createPost(\n      title: $title\n      description: $description\n      slug: $slug\n      mainImage: $mainImage\n      tags: $tags\n      content: $content\n      isPublished: $isPublished\n      authorId: $authorId\n      categoryId: $categoryId\n    ) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n": types.CreateBlogDocument,
    "\n  mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {\n    updatePost(id: $id, data: $data) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n": types.UpdateBlogDocument,
    "\n  query GetPosts {\n    allPosts {\n      id\n      title\n      mainImage\n      description\n      content\n      votes\n      authorId\n      categoryId\n      createdAt\n      updatedAt\n      tags\n      slug\n      views\n      isPublished\n      isPriority\n      isPinned\n      isDeleted\n\n      author {\n        id\n        name\n        avatarUrl\n        bio\n        designation\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetPostBySlug($slug: String!) {\n    findPostBySlug(slug: $slug) {\n      id\n      title\n      description\n      mainImage\n      createdAt\n    }\n  }\n": types.GetPostBySlugDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBlog(\n    $title: String!\n    $description: String!\n    $slug: String!\n    $mainImage: String!\n    $categoryId: String!\n    $tags: [String!]!\n    $content: JSON!\n    $authorId: String!\n    $isPublished: Boolean!\n  ) {\n    createPost(\n      title: $title\n      description: $description\n      slug: $slug\n      mainImage: $mainImage\n      tags: $tags\n      content: $content\n      isPublished: $isPublished\n      authorId: $authorId\n      categoryId: $categoryId\n    ) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBlog(\n    $title: String!\n    $description: String!\n    $slug: String!\n    $mainImage: String!\n    $categoryId: String!\n    $tags: [String!]!\n    $content: JSON!\n    $authorId: String!\n    $isPublished: Boolean!\n  ) {\n    createPost(\n      title: $title\n      description: $description\n      slug: $slug\n      mainImage: $mainImage\n      tags: $tags\n      content: $content\n      isPublished: $isPublished\n      authorId: $authorId\n      categoryId: $categoryId\n    ) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {\n    updatePost(id: $id, data: $data) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {\n    updatePost(id: $id, data: $data) {\n      id\n      title\n      slug\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts {\n    allPosts {\n      id\n      title\n      mainImage\n      description\n      content\n      votes\n      authorId\n      categoryId\n      createdAt\n      updatedAt\n      tags\n      slug\n      views\n      isPublished\n      isPriority\n      isPinned\n      isDeleted\n\n      author {\n        id\n        name\n        avatarUrl\n        bio\n        designation\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPosts {\n    allPosts {\n      id\n      title\n      mainImage\n      description\n      content\n      votes\n      authorId\n      categoryId\n      createdAt\n      updatedAt\n      tags\n      slug\n      views\n      isPublished\n      isPriority\n      isPinned\n      isDeleted\n\n      author {\n        id\n        name\n        avatarUrl\n        bio\n        designation\n      }\n      category {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPostBySlug($slug: String!) {\n    findPostBySlug(slug: $slug) {\n      id\n      title\n      description\n      mainImage\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPostBySlug($slug: String!) {\n    findPostBySlug(slug: $slug) {\n      id\n      title\n      description\n      mainImage\n      createdAt\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;