import * as types from "./graphql";

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
  "\n  mutation signUpEmail($input: SignUpInput!) {\n    signUpEmail(signUpInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n": typeof types.SignUpEmailDocument;
  "\n  mutation signInEmail($input: SignInInput!) {\n    signInEmail(signInInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n        image\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.SignInEmailDocument;
  "\n  mutation signOut {\n    signOut {\n      success\n    }\n  }\n": typeof types.SignOutDocument;
  "\n  mutation gitHub {\n    gitHub {\n      redirect\n      url\n    }\n  }\n": typeof types.GitHubDocument;
  "\n  query getSession {\n    getSession {\n      success\n      message\n      data {\n        session {\n          token\n          expiresAt\n          userId\n          ipAddress\n          userAgent\n        }\n        user {\n          id\n          email\n          name\n          image\n        }\n      }\n    }\n  }\n": typeof types.GetSessionDocument;
  "\n  mutation CreateBlog($input: CreatePostInput!) {\n    createPost(input: $input) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        createdAt\n      }\n    }\n  }\n": typeof types.CreateBlogDocument;
  "\n  mutation UpdateBlog($id: String!, $input: UpdatePostInput!) {\n    updatePost(id: $id, input: $input) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        createdAt\n      }\n    }\n  }\n": typeof types.UpdateBlogDocument;
  "\n  mutation IncrementViews($id: String!, $identifier: String!) {\n    incrementViews(id: $id, identifier: $identifier) {\n      success\n      message\n      data {\n        id\n        views\n      }\n    }\n  }\n\n\n": typeof types.IncrementViewsDocument;
  "\n  mutation createCategory($input: CreateCategoryDto!) {\n    createCategory(input: $input) {\n      success\n      message\n      data {\n        id\n        name\n        slug\n        createdAt\n      }\n    }\n  }\n": typeof types.CreateCategoryDocument;
  "\n  query GetPublishedPosts($filters: PostFiltersInput!) {\n    publishedPosts(filters: $filters) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        isPublished\n        isPriority\n        createdAt\n        content\n        description\n        mainImage\n        views\n        tags\n        author {\n          id\n          name\n          image\n        }\n        category {\n          id\n          name\n        }\n      }\n      meta {\n        total\n        page\n        limit\n        totalPages\n        hasNext\n        hasPrev\n      }\n    }\n  }\n": typeof types.GetPublishedPostsDocument;
};
const documents: Documents = {
  "\n  mutation signUpEmail($input: SignUpInput!) {\n    signUpEmail(signUpInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n":
    types.SignUpEmailDocument,
  "\n  mutation signInEmail($input: SignInInput!) {\n    signInEmail(signInInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n        image\n        createdAt\n        updatedAt\n      }\n    }\n  }\n":
    types.SignInEmailDocument,
  "\n  mutation signOut {\n    signOut {\n      success\n    }\n  }\n":
    types.SignOutDocument,
  "\n  mutation gitHub {\n    gitHub {\n      redirect\n      url\n    }\n  }\n":
    types.GitHubDocument,
  "\n  query getSession {\n    getSession {\n      success\n      message\n      data {\n        session {\n          token\n          expiresAt\n          userId\n          ipAddress\n          userAgent\n        }\n        user {\n          id\n          email\n          name\n          image\n        }\n      }\n    }\n  }\n":
    types.GetSessionDocument,
  "\n  mutation CreateBlog($input: CreatePostInput!) {\n    createPost(input: $input) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        createdAt\n      }\n    }\n  }\n":
    types.CreateBlogDocument,
  "\n  mutation UpdateBlog($id: String!, $input: UpdatePostInput!) {\n    updatePost(id: $id, input: $input) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        createdAt\n      }\n    }\n  }\n":
    types.UpdateBlogDocument,
  "\n  mutation IncrementViews($id: String!, $identifier: String!) {\n    incrementViews(id: $id, identifier: $identifier) {\n      success\n      message\n      data {\n        id\n        views\n      }\n    }\n  }\n\n\n":
    types.IncrementViewsDocument,
  "\n  mutation createCategory($input: CreateCategoryDto!) {\n    createCategory(input: $input) {\n      success\n      message\n      data {\n        id\n        name\n        slug\n        createdAt\n      }\n    }\n  }\n":
    types.CreateCategoryDocument,
  "\n  query GetPublishedPosts($filters: PostFiltersInput!) {\n    publishedPosts(filters: $filters) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        isPublished\n        isPriority\n        createdAt\n        content\n        description\n        mainImage\n        views\n        tags\n        author {\n          id\n          name\n          image\n        }\n        category {\n          id\n          name\n        }\n      }\n      meta {\n        total\n        page\n        limit\n        totalPages\n        hasNext\n        hasPrev\n      }\n    }\n  }\n":
    types.GetPublishedPostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation signUpEmail($input: SignUpInput!) {\n    signUpEmail(signUpInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n",
): typeof import("./graphql").SignUpEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation signInEmail($input: SignInInput!) {\n    signInEmail(signInInput: $input) {\n      token\n      user {\n        id\n        email\n        name\n        image\n        createdAt\n        updatedAt\n      }\n    }\n  }\n",
): typeof import("./graphql").SignInEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation signOut {\n    signOut {\n      success\n    }\n  }\n",
): typeof import("./graphql").SignOutDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation gitHub {\n    gitHub {\n      redirect\n      url\n    }\n  }\n",
): typeof import("./graphql").GitHubDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query getSession {\n    getSession {\n      success\n      message\n      data {\n        session {\n          token\n          expiresAt\n          userId\n          ipAddress\n          userAgent\n        }\n        user {\n          id\n          email\n          name\n          image\n        }\n      }\n    }\n  }\n",
): typeof import("./graphql").GetSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation CreateBlog($input: CreatePostInput!) {\n    createPost(input: $input) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        createdAt\n      }\n    }\n  }\n",
): typeof import("./graphql").CreateBlogDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation UpdateBlog($id: String!, $input: UpdatePostInput!) {\n    updatePost(id: $id, input: $input) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        createdAt\n      }\n    }\n  }\n",
): typeof import("./graphql").UpdateBlogDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation IncrementViews($id: String!, $identifier: String!) {\n    incrementViews(id: $id, identifier: $identifier) {\n      success\n      message\n      data {\n        id\n        views\n      }\n    }\n  }\n\n\n",
): typeof import("./graphql").IncrementViewsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation createCategory($input: CreateCategoryDto!) {\n    createCategory(input: $input) {\n      success\n      message\n      data {\n        id\n        name\n        slug\n        createdAt\n      }\n    }\n  }\n",
): typeof import("./graphql").CreateCategoryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetPublishedPosts($filters: PostFiltersInput!) {\n    publishedPosts(filters: $filters) {\n      success\n      message\n      data {\n        id\n        title\n        slug\n        isPublished\n        isPriority\n        createdAt\n        content\n        description\n        mainImage\n        views\n        tags\n        author {\n          id\n          name\n          image\n        }\n        category {\n          id\n          name\n        }\n      }\n      meta {\n        total\n        page\n        limit\n        totalPages\n        hasNext\n        hasPrev\n      }\n    }\n  }\n",
): typeof import("./graphql").GetPublishedPostsDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
