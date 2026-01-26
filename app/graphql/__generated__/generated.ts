import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AccountModel = {
  __typename?: "AccountModel";
  accessToken?: Maybe<Scalars["String"]["output"]>;
  accessTokenExpiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  accountId: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  idToken?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["String"]["output"]>;
  providerId: Scalars["String"]["output"];
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  refreshTokenExpiresAt?: Maybe<Scalars["DateTime"]["output"]>;
  scope?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export type CategoriesResponse = {
  __typename?: "CategoriesResponse";
  /** Total count */
  count: Scalars["Int"]["output"];
  /** Array of items */
  data: Array<CategoryModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CategoryModel = {
  __typename?: "CategoryModel";
  createdAt: Scalars["DateTime"]["output"];
  /** Description of the category */
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  /** Name of the category */
  name: Scalars["String"]["output"];
  /** Posts in this category */
  posts: Array<PostModel>;
  /** Slug of the category */
  slug: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type CategoryResponse = {
  __typename?: "CategoryResponse";
  /** Response data */
  data?: Maybe<CategoryModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  post?: Maybe<PostModel>;
  user: UserModel;
};

export type CreateCategoryDto = {
  /** Description of the category */
  description: Scalars["String"]["input"];
  /** Name of the category */
  name: Scalars["String"]["input"];
};

export type CreatePostInput = {
  /** Category ID */
  categoryId: Scalars["String"]["input"];
  /** Post content in JSON format */
  content: Scalars["JSON"]["input"];
  /** Post description/excerpt */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Whether to publish immediately or save as draft */
  isPublished?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Main image URL */
  mainImage?: InputMaybe<Scalars["String"]["input"]>;
  /** Post tags */
  tags?: Array<Scalars["String"]["input"]>;
  /** Post title */
  title: Scalars["String"]["input"];
};

export type DeletePostResponse = {
  __typename?: "DeletePostResponse";
  code?: Maybe<Scalars["String"]["output"]>;
  deletedId?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type GetSessionResponse = {
  __typename?: "GetSessionResponse";
  session: SessionModel;
  user: UserModel;
};

export type GitHubUserResponse = {
  __typename?: "GitHubUserResponse";
  createdAt: Scalars["DateTime"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  redirect: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  url: Scalars["String"]["output"];
  user?: Maybe<UserModel>;
};

export type LikeModel = {
  __typename?: "LikeModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  post: PostModel;
  postId: Scalars["String"]["output"];
  user: UserModel;
  userId: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Create a new category */
  createCategory: CategoryResponse;
  /** Create a new post (requires authentication) */
  createPost: PostResponse;
  /** Delete a category */
  deleteCategory: CategoryResponse;
  /** Delete a post (requires ownership) */
  deletePost: DeletePostResponse;
  gitHub: GitHubUserResponse;
  /** Increment post view count */
  incrementViews: PostResponse;
  signInEmail: SignInEmailUser;
  signOut: SignOutResponse;
  /** Sign up email user */
  signUpEmail: SignUpEmailUser;
  /** Update a category */
  updateCategory: CategoryResponse;
  /** Update a post (requires ownership) */
  updatePost: PostResponse;
  updateProfile: UserModel;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryDto;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeletePostArgs = {
  id: Scalars["String"]["input"];
};

export type MutationIncrementViewsArgs = {
  id: Scalars["String"]["input"];
  identifier?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationSignInEmailArgs = {
  signInInput: SignInInput;
};

export type MutationSignUpEmailArgs = {
  signUpInput: SignUpInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["String"]["input"];
  input: UpdateCategoryDto;
};

export type MutationUpdatePostArgs = {
  id: Scalars["String"]["input"];
  input: UpdatePostInput;
};

export type MutationUpdateProfileArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  image?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  rememberMe?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type OAuth2UserInfoModel = {
  __typename?: "OAuth2UserInfoModel";
  createdAt: Scalars["DateTime"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  emailVerified?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type PaginatedPostsResponse = {
  __typename?: "PaginatedPostsResponse";
  /** Array of items */
  data: Array<PostModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  /** Pagination metadata */
  meta: PaginationMeta;
  success: Scalars["Boolean"]["output"];
};

export type PaginationMeta = {
  __typename?: "PaginationMeta";
  /** Has next page */
  hasNext: Scalars["Boolean"]["output"];
  /** Has previous page */
  hasPrev: Scalars["Boolean"]["output"];
  /** Items per page */
  limit: Scalars["Int"]["output"];
  /** Current page number */
  page: Scalars["Int"]["output"];
  /** Total number of items */
  total: Scalars["Int"]["output"];
  /** Total number of pages */
  totalPages: Scalars["Int"]["output"];
};

export type PostFiltersInput = {
  /** Filter by author ID */
  authorId?: InputMaybe<Scalars["String"]["input"]>;
  /** Filter by category ID */
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  /** Show only priority posts */
  isPriority?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** Show only published posts */
  isPublished?: InputMaybe<Scalars["Boolean"]["input"]>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  /** Search term for title/description */
  search?: InputMaybe<Scalars["String"]["input"]>;
  /** Sort by field */
  sortBy?: InputMaybe<Scalars["String"]["input"]>;
  /** Sort order */
  sortOrder?: InputMaybe<Scalars["String"]["input"]>;
  /** Filter by post status */
  status?: InputMaybe<PostStatusFilter>;
  /** Filter by tags */
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type PostModel = {
  __typename?: "PostModel";
  /** Author of the post */
  author: UserModel;
  /** Category ID of the post */
  authorId: Scalars["String"]["output"];
  category?: Maybe<CategoryModel>;
  /** Category ID of the post */
  categoryId: Scalars["String"]["output"];
  content: Scalars["JSON"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  isDeleted: Scalars["Boolean"]["output"];
  isPinned: Scalars["Boolean"]["output"];
  isPriority: Scalars["Boolean"]["output"];
  isPublished: Scalars["Boolean"]["output"];
  mainImage?: Maybe<Scalars["String"]["output"]>;
  slug: Scalars["String"]["output"];
  tags: Array<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  views: Scalars["Int"]["output"];
  votes: Scalars["Int"]["output"];
};

export type PostResponse = {
  __typename?: "PostResponse";
  /** Response data */
  data?: Maybe<PostModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

/** Filter posts by their status */
export enum PostStatusFilter {
  /** Approved posts ready to be published */
  Approved = "APPROVED",
  /** Posts in draft state - not visible to public */
  Draft = "DRAFT",
  /** Posts pending moderator approval */
  Pending = "PENDING",
  /** Published posts visible to everyone */
  Published = "PUBLISHED",
  /** Rejected posts that failed moderation */
  Rejected = "REJECTED",
  /** Previously published posts that are now hidden */
  Unpublished = "UNPUBLISHED",
}

export type PostsArrayResponse = {
  __typename?: "PostsArrayResponse";
  /** Total count */
  count: Scalars["Int"]["output"];
  /** Array of items */
  data: Array<PostModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  categories: CategoriesResponse;
  getAccounts: Array<AccountModel>;
  getProfile: SingleProfileResponse;
  getSession: SessionSingleResponse;
  /** Get current user's posts */
  myPosts: PaginatedPostsResponse;
  /** Get a single post by ID */
  post: PostResponse;
  /** Get a single post by slug */
  postBySlug: PostResponse;
  /** Get posts with filters and pagination */
  posts: PaginatedPostsResponse;
  priorityPosts: PostsArrayResponse;
  /** Get only published posts */
  publishedPosts: PaginatedPostsResponse;
};

export type QueryMyPostsArgs = {
  filters: PostFiltersInput;
};

export type QueryPostArgs = {
  id: Scalars["String"]["input"];
};

export type QueryPostBySlugArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryPostsArgs = {
  filters?: InputMaybe<PostFiltersInput>;
};

export type QueryPriorityPostsArgs = {
  limit?: Scalars["Int"]["input"];
};

export type QueryPublishedPostsArgs = {
  filters: PostFiltersInput;
};

export type SessionModel = {
  __typename?: "SessionModel";
  createdAt: Scalars["DateTime"]["output"];
  expiresAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  ipAddress: Scalars["String"]["output"];
  token: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: UserModel;
  userAgent: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type SessionSingleResponse = {
  __typename?: "SessionSingleResponse";
  /** Response data */
  data?: Maybe<GetSessionResponse>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type SignInEmailUser = {
  __typename?: "SignInEmailUser";
  /** Token */
  token?: Maybe<Scalars["String"]["output"]>;
  /** Return sign in user response */
  user?: Maybe<SignInEmailUserResponse>;
};

export type SignInEmailUserResponse = {
  __typename?: "SignInEmailUserResponse";
  createdAt: Scalars["DateTime"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type SignInInput = {
  /** Email */
  email: Scalars["String"]["input"];
  /** Password */
  password: Scalars["String"]["input"];
  /** Remember me */
  rememberMe?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SignOutResponse = {
  __typename?: "SignOutResponse";
  success: Scalars["Boolean"]["output"];
};

export type SignUpEmailUser = {
  __typename?: "SignUpEmailUser";
  /** Token */
  token?: Maybe<Scalars["String"]["output"]>;
  /** Return user model */
  user?: Maybe<UserModel>;
};

export type SignUpInput = {
  /** Email */
  email: Scalars["String"]["input"];
  /** Name */
  name: Scalars["String"]["input"];
  /** Password */
  password: Scalars["String"]["input"];
  /** Remember me */
  rememberMe?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SingleProfileResponse = {
  __typename?: "SingleProfileResponse";
  /** Response data */
  data?: Maybe<OAuth2UserInfoModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type UpdateCategoryDto = {
  /** Description of the category */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Name of the category */
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdatePostInput = {
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  content?: InputMaybe<Scalars["JSON"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  isPinned?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPriority?: InputMaybe<Scalars["Boolean"]["input"]>;
  isPublished?: InputMaybe<Scalars["Boolean"]["input"]>;
  mainImage?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserModel = {
  __typename?: "UserModel";
  accounts: Array<AccountModel>;
  comments: Array<Comment>;
  createdAt: Scalars["DateTime"]["output"];
  designation?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  emailVerified: Scalars["Boolean"]["output"];
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  likes: Array<LikeModel>;
  name?: Maybe<Scalars["String"]["output"]>;
  sessions: Array<SessionModel>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type SignUpEmailMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpEmailMutation = {
  __typename?: "Mutation";
  signUpEmail: {
    __typename?: "SignUpEmailUser";
    token?: string | null;
    user?: {
      __typename?: "UserModel";
      id: string;
      email?: string | null;
      name?: string | null;
    } | null;
  };
};

export type SignInEmailMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInEmailMutation = {
  __typename?: "Mutation";
  signInEmail: {
    __typename?: "SignInEmailUser";
    token?: string | null;
    user?: {
      __typename?: "SignInEmailUserResponse";
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      createdAt: any;
      updatedAt: any;
    } | null;
  };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = {
  __typename?: "Mutation";
  signOut: { __typename?: "SignOutResponse"; success: boolean };
};

export type GitHubAuthMutationVariables = Exact<{ [key: string]: never }>;

export type GitHubAuthMutation = {
  __typename?: "Mutation";
  gitHub: { __typename?: "GitHubUserResponse"; redirect: string; url: string };
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionQuery = {
  __typename?: "Query";
  getSession: {
    __typename?: "SessionSingleResponse";
    success: boolean;
    message?: string | null;
    data?: {
      __typename?: "GetSessionResponse";
      session: {
        __typename?: "SessionModel";
        token: string;
        expiresAt: any;
        userId: string;
        ipAddress: string;
        userAgent: string;
      };
      user: {
        __typename?: "UserModel";
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
    } | null;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryDto;
}>;

export type CreateCategoryMutation = {
  __typename?: "Mutation";
  createCategory: {
    __typename?: "CategoryResponse";
    success: boolean;
    message?: string | null;
    data?: {
      __typename?: "CategoryModel";
      id: string;
      name: string;
      slug: string;
      createdAt: any;
    } | null;
  };
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "PostResponse";
    success: boolean;
    message?: string | null;
    data?: {
      __typename?: "PostModel";
      id: string;
      title: string;
      slug: string;
      createdAt: any;
    } | null;
  };
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  __typename?: "Mutation";
  updatePost: {
    __typename?: "PostResponse";
    success: boolean;
    message?: string | null;
    data?: {
      __typename?: "PostModel";
      id: string;
      title: string;
      slug: string;
      createdAt: any;
    } | null;
  };
};

export type IncrementPostViewsMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  identifier: Scalars["String"]["input"];
}>;

export type IncrementPostViewsMutation = {
  __typename?: "Mutation";
  incrementViews: {
    __typename?: "PostResponse";
    success: boolean;
    message?: string | null;
    data?: { __typename?: "PostModel"; id: string; views: number } | null;
  };
};

export type GetPublishedPostsQueryVariables = Exact<{
  filters: PostFiltersInput;
}>;

export type GetPublishedPostsQuery = {
  __typename?: "Query";
  publishedPosts: {
    __typename?: "PaginatedPostsResponse";
    success: boolean;
    message?: string | null;
    data: Array<{
      __typename?: "PostModel";
      id: string;
      title: string;
      slug: string;
      isPublished: boolean;
      isPriority: boolean;
      createdAt: any;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      views: number;
      tags: Array<string>;
      author: {
        __typename?: "UserModel";
        id: string;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        __typename?: "CategoryModel";
        id: string;
        name: string;
      } | null;
    }>;
    meta: {
      __typename?: "PaginationMeta";
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
};

export type GetPostBySlugQueryVariables = Exact<{
  slug: Scalars["String"]["input"];
}>;

export type GetPostBySlugQuery = {
  __typename?: "Query";
  postBySlug: {
    __typename?: "PostResponse";
    success: boolean;
    message?: string | null;
    data?: {
      __typename?: "PostModel";
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      createdAt: any;
      updatedAt: any;
      author: {
        __typename?: "UserModel";
        id: string;
        name?: string | null;
        image?: string | null;
        createdAt: any;
      };
      category?: {
        __typename?: "CategoryModel";
        id: string;
        name: string;
      } | null;
    } | null;
  };
};

export const SignUpEmailDocument = gql`
  mutation SignUpEmail($input: SignUpInput!) {
    signUpEmail(signUpInput: $input) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;
export type SignUpEmailMutationFn = Apollo.MutationFunction<
  SignUpEmailMutation,
  SignUpEmailMutationVariables
>;

/**
 * __useSignUpEmailMutation__
 *
 * To run a mutation, you first call `useSignUpEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpEmailMutation, { data, loading, error }] = useSignUpEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpEmailMutation,
    SignUpEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpEmailMutation, SignUpEmailMutationVariables>(
    SignUpEmailDocument,
    options,
  );
}
export type SignUpEmailMutationHookResult = ReturnType<
  typeof useSignUpEmailMutation
>;
export type SignUpEmailMutationResult =
  Apollo.MutationResult<SignUpEmailMutation>;
export type SignUpEmailMutationOptions = Apollo.BaseMutationOptions<
  SignUpEmailMutation,
  SignUpEmailMutationVariables
>;
export const SignInEmailDocument = gql`
  mutation SignInEmail($input: SignInInput!) {
    signInEmail(signInInput: $input) {
      token
      user {
        id
        email
        name
        image
        createdAt
        updatedAt
      }
    }
  }
`;
export type SignInEmailMutationFn = Apollo.MutationFunction<
  SignInEmailMutation,
  SignInEmailMutationVariables
>;

/**
 * __useSignInEmailMutation__
 *
 * To run a mutation, you first call `useSignInEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInEmailMutation, { data, loading, error }] = useSignInEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignInEmailMutation,
    SignInEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignInEmailMutation, SignInEmailMutationVariables>(
    SignInEmailDocument,
    options,
  );
}
export type SignInEmailMutationHookResult = ReturnType<
  typeof useSignInEmailMutation
>;
export type SignInEmailMutationResult =
  Apollo.MutationResult<SignInEmailMutation>;
export type SignInEmailMutationOptions = Apollo.BaseMutationOptions<
  SignInEmailMutation,
  SignInEmailMutationVariables
>;
export const SignOutDocument = gql`
  mutation SignOut {
    signOut {
      success
    }
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    options,
  );
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
export const GitHubAuthDocument = gql`
  mutation GitHubAuth {
    gitHub {
      redirect
      url
    }
  }
`;
export type GitHubAuthMutationFn = Apollo.MutationFunction<
  GitHubAuthMutation,
  GitHubAuthMutationVariables
>;

/**
 * __useGitHubAuthMutation__
 *
 * To run a mutation, you first call `useGitHubAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGitHubAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gitHubAuthMutation, { data, loading, error }] = useGitHubAuthMutation({
 *   variables: {
 *   },
 * });
 */
export function useGitHubAuthMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GitHubAuthMutation,
    GitHubAuthMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<GitHubAuthMutation, GitHubAuthMutationVariables>(
    GitHubAuthDocument,
    options,
  );
}
export type GitHubAuthMutationHookResult = ReturnType<
  typeof useGitHubAuthMutation
>;
export type GitHubAuthMutationResult =
  Apollo.MutationResult<GitHubAuthMutation>;
export type GitHubAuthMutationOptions = Apollo.BaseMutationOptions<
  GitHubAuthMutation,
  GitHubAuthMutationVariables
>;
export const GetSessionDocument = gql`
  query GetSession {
    getSession {
      success
      message
      data {
        session {
          token
          expiresAt
          userId
          ipAddress
          userAgent
        }
        user {
          id
          email
          name
          image
        }
      }
    }
  }
`;

/**
 * __useGetSessionQuery__
 *
 * To run a query within a React component, call `useGetSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSessionQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options,
  );
}
export function useGetSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options,
  );
}
export function useGetSessionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSessionQuery,
        GetSessionQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options,
  );
}
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<
  typeof useGetSessionLazyQuery
>;
export type GetSessionSuspenseQueryHookResult = ReturnType<
  typeof useGetSessionSuspenseQuery
>;
export type GetSessionQueryResult = Apollo.QueryResult<
  GetSessionQuery,
  GetSessionQueryVariables
>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CreateCategoryDto!) {
    createCategory(input: $input) {
      success
      message
      data {
        id
        name
        slug
        createdAt
      }
    }
  }
`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      success
      message
      data {
        id
        title
        slug
        createdAt
      }
    }
  }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  );
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
  Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: String!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      success
      message
      data {
        id
        title
        slug
        createdAt
      }
    }
  }
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  );
}
export type UpdatePostMutationHookResult = ReturnType<
  typeof useUpdatePostMutation
>;
export type UpdatePostMutationResult =
  Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export const IncrementPostViewsDocument = gql`
  mutation IncrementPostViews($id: String!, $identifier: String!) {
    incrementViews(id: $id, identifier: $identifier) {
      success
      message
      data {
        id
        views
      }
    }
  }
`;
export type IncrementPostViewsMutationFn = Apollo.MutationFunction<
  IncrementPostViewsMutation,
  IncrementPostViewsMutationVariables
>;

/**
 * __useIncrementPostViewsMutation__
 *
 * To run a mutation, you first call `useIncrementPostViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementPostViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementPostViewsMutation, { data, loading, error }] = useIncrementPostViewsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useIncrementPostViewsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IncrementPostViewsMutation,
    IncrementPostViewsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    IncrementPostViewsMutation,
    IncrementPostViewsMutationVariables
  >(IncrementPostViewsDocument, options);
}
export type IncrementPostViewsMutationHookResult = ReturnType<
  typeof useIncrementPostViewsMutation
>;
export type IncrementPostViewsMutationResult =
  Apollo.MutationResult<IncrementPostViewsMutation>;
export type IncrementPostViewsMutationOptions = Apollo.BaseMutationOptions<
  IncrementPostViewsMutation,
  IncrementPostViewsMutationVariables
>;
export const GetPublishedPostsDocument = gql`
  query GetPublishedPosts($filters: PostFiltersInput!) {
    publishedPosts(filters: $filters) {
      success
      message
      data {
        id
        title
        slug
        isPublished
        isPriority
        createdAt
        content
        description
        mainImage
        views
        tags
        author {
          id
          name
          image
        }
        category {
          id
          name
        }
      }
      meta {
        total
        page
        limit
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`;

/**
 * __useGetPublishedPostsQuery__
 *
 * To run a query within a React component, call `useGetPublishedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublishedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublishedPostsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetPublishedPostsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  > &
    (
      | { variables: GetPublishedPostsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >(GetPublishedPostsDocument, options);
}
export function useGetPublishedPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >(GetPublishedPostsDocument, options);
}
export function useGetPublishedPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPublishedPostsQuery,
        GetPublishedPostsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >(GetPublishedPostsDocument, options);
}
export type GetPublishedPostsQueryHookResult = ReturnType<
  typeof useGetPublishedPostsQuery
>;
export type GetPublishedPostsLazyQueryHookResult = ReturnType<
  typeof useGetPublishedPostsLazyQuery
>;
export type GetPublishedPostsSuspenseQueryHookResult = ReturnType<
  typeof useGetPublishedPostsSuspenseQuery
>;
export type GetPublishedPostsQueryResult = Apollo.QueryResult<
  GetPublishedPostsQuery,
  GetPublishedPostsQueryVariables
>;
export const GetPostBySlugDocument = gql`
  query GetPostBySlug($slug: String!) {
    postBySlug(slug: $slug) {
      success
      message
      data {
        id
        title
        slug
        content
        description
        mainImage
        createdAt
        updatedAt
        author {
          id
          name
          image
          createdAt
        }
        category {
          id
          name
        }
      }
    }
  }
`;

/**
 * __useGetPostBySlugQuery__
 *
 * To run a query within a React component, call `useGetPostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostBySlugQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  > &
    (
      | { variables: GetPostBySlugQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
    GetPostBySlugDocument,
    options,
  );
}
export function useGetPostBySlugLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostBySlugQuery, GetPostBySlugQueryVariables>(
    GetPostBySlugDocument,
    options,
  );
}
export function useGetPostBySlugSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPostBySlugQuery,
        GetPostBySlugQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  >(GetPostBySlugDocument, options);
}
export type GetPostBySlugQueryHookResult = ReturnType<
  typeof useGetPostBySlugQuery
>;
export type GetPostBySlugLazyQueryHookResult = ReturnType<
  typeof useGetPostBySlugLazyQuery
>;
export type GetPostBySlugSuspenseQueryHookResult = ReturnType<
  typeof useGetPostBySlugSuspenseQuery
>;
export type GetPostBySlugQueryResult = Apollo.QueryResult<
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables
>;
