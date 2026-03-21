//@ts-nocheck
import { gql } from "@apollo/client";
import type * as ApolloReactCommon from "../../../lib/apollo-compat";
import * as ApolloReactHooks from "@apollo/client/react";
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

export type CastVoteInput = {
  /** Post ID to vote on */
  postId: Scalars["String"]["input"];
  /** Vote type: UPVOTE or DOWNVOTE */
  value: Scalars["String"]["input"];
};

export type CategoriesResponse = {
  /** Total count */
  count: Scalars["Int"]["output"];
  /** Array of items */
  data: Array<CategoryModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CategoryModel = {
  createdAt: Scalars["DateTime"]["output"];
  /** Description of the category */
  description: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  /** Name of the category */
  name: Scalars["String"]["output"];
  /** Slug of the category */
  slug: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type CategoryResponse = {
  /** Response data */
  data?: Maybe<CategoryModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Comment = {
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  postId?: Maybe<Scalars["String"]["output"]>;
  userId: Scalars["String"]["output"];
};

export type CommentModel = {
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  isDeleted: Scalars["Boolean"]["output"];
  isEdited: Scalars["Boolean"]["output"];
  parentId?: Maybe<Scalars["String"]["output"]>;
  postId?: Maybe<Scalars["String"]["output"]>;
  replies: Array<CommentModel>;
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<UserModel>;
  userId: Scalars["String"]["output"];
};

export type CommentResponse = {
  /** Response data */
  data?: Maybe<CommentModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CommentsResponse = {
  /** Total count */
  count: Scalars["Int"]["output"];
  /** Array of items */
  data: Array<CommentModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type CreateCategoryDto = {
  /** Description of the category */
  description: Scalars["String"]["input"];
  /** Name of the category */
  name: Scalars["String"]["input"];
};

export type CreateCommentInput = {
  /** Comment content */
  content: Scalars["String"]["input"];
  /** Parent comment ID for replies */
  parentId?: InputMaybe<Scalars["String"]["input"]>;
  /** Post ID to comment on */
  postId: Scalars["String"]["input"];
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

export type DeleteCommentResponse = {
  code?: Maybe<Scalars["String"]["output"]>;
  deletedId?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type DeletePostResponse = {
  code?: Maybe<Scalars["String"]["output"]>;
  deletedId?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type GetSessionResponse = {
  session: SessionModel;
  user: UserModel;
};

export type GitHubUserResponse = {
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
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  postId: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type Mutation = {
  /** Cast a vote on a post (toggle behavior) */
  castVote: VoteResponse;
  /** Create a new category (requires authentication) */
  createCategory: CategoryResponse;
  /** Create a comment on a post (requires authentication) */
  createComment: CommentResponse;
  /** Create a new post (requires authentication) */
  createPost: PostResponse;
  /** Delete a category (requires authentication) */
  deleteCategory: CategoryResponse;
  /** Delete a comment (requires ownership) */
  deleteComment: DeleteCommentResponse;
  /** Delete a post (requires ownership) */
  deletePost: DeletePostResponse;
  gitHub: GitHubUserResponse;
  /** Increment post view count */
  incrementViews: PostResponse;
  /** Remove your vote from a post */
  removeVote: RemoveVoteResponse;
  signInEmail: SignInEmailUser;
  signOut: SignOutResponse;
  /** Sign up email user */
  signUpEmail: SignUpEmailUser;
  /** Update a category (requires authentication) */
  updateCategory: CategoryResponse;
  /** Update a comment (requires ownership) */
  updateComment: CommentResponse;
  /** Update a post (requires ownership) */
  updatePost: PostResponse;
  updateProfile: UserModel;
};

export type MutationCastVoteArgs = {
  input: CastVoteInput;
};

export type MutationCreateCategoryArgs = {
  input: CreateCategoryDto;
};

export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteCommentArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeletePostArgs = {
  id: Scalars["String"]["input"];
};

export type MutationIncrementViewsArgs = {
  id: Scalars["String"]["input"];
  identifier?: InputMaybe<Scalars["String"]["input"]>;
};

export type MutationRemoveVoteArgs = {
  postId: Scalars["String"]["input"];
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

export type MutationUpdateCommentArgs = {
  id: Scalars["String"]["input"];
  input: UpdateCommentInput;
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
  createdAt: Scalars["DateTime"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  emailVerified?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type PaginatedPostsResponse = {
  /** Array of items */
  data: Array<PostModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  /** Pagination metadata */
  meta: PaginationMeta;
  success: Scalars["Boolean"]["output"];
};

export type PaginationMeta = {
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
  /** Total count */
  count: Scalars["Int"]["output"];
  /** Array of items */
  data: Array<PostModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type Query = {
  categories: CategoriesResponse;
  /** Get all comments for a post (with nested replies) */
  commentsByPost: CommentsResponse;
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
  /** Get vote counts and current user vote for a post */
  voteStatus: VoteStatusResponse;
};

export type QueryCommentsByPostArgs = {
  postId: Scalars["String"]["input"];
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

export type QueryVoteStatusArgs = {
  postId: Scalars["String"]["input"];
};

export type RemoveVoteResponse = {
  code?: Maybe<Scalars["String"]["output"]>;
  deletedId?: Maybe<Scalars["String"]["output"]>;
  message: Scalars["String"]["output"];
  success: Scalars["Boolean"]["output"];
};

export type SessionModel = {
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
  /** Response data */
  data?: Maybe<GetSessionResponse>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type SignInEmailUser = {
  /** Token */
  token?: Maybe<Scalars["String"]["output"]>;
  /** Return sign in user response */
  user?: Maybe<SignInEmailUserResponse>;
};

export type SignInEmailUserResponse = {
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
  success: Scalars["Boolean"]["output"];
};

export type SignUpEmailUser = {
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

export type UpdateCommentInput = {
  /** Updated comment content */
  content: Scalars["String"]["input"];
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

export type VoteModel = {
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  postId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user?: Maybe<UserModel>;
  userId: Scalars["String"]["output"];
  value: VoteType;
};

export type VoteResponse = {
  /** Response data */
  data?: Maybe<VoteModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

export type VoteStatusModel = {
  downvotes: Scalars["Float"]["output"];
  score: Scalars["Float"]["output"];
  upvotes: Scalars["Float"]["output"];
  userVote?: Maybe<VoteType>;
};

export type VoteStatusResponse = {
  /** Response data */
  data?: Maybe<VoteStatusModel>;
  message?: Maybe<Scalars["String"]["output"]>;
  success: Scalars["Boolean"]["output"];
};

/** Type of vote (UPVOTE or DOWNVOTE) */
export enum VoteType {
  Downvote = "DOWNVOTE",
  Upvote = "UPVOTE",
}

export type SignUpEmailMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpEmailMutation = {
  signUpEmail: {
    token?: string | null;
    user?: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } | null;
  };
};

export type SignInEmailMutationVariables = Exact<{
  input: SignInInput;
}>;

export type SignInEmailMutation = {
  signInEmail: {
    token?: string | null;
    user?: {
      createdAt: any;
      id: string;
      image?: string | null;
      name?: string | null;
      updatedAt: any;
    } | null;
  };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { signOut: { success: boolean } };

export type GitHubAuthMutationVariables = Exact<{ [key: string]: never }>;

export type GitHubAuthMutation = { gitHub: { redirect: string; url: string } };

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionQuery = {
  getSession: {
    success: boolean;
    message?: string | null;
    data?: {
      session: {
        token: string;
        expiresAt: any;
        userId: string;
        ipAddress: string;
        userAgent: string;
      };
      user: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
    } | null;
  };
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  categories: {
    success: boolean;
    message?: string | null;
    count: number;
    data: Array<{
      id: string;
      name: string;
      slug: string;
      description: string;
      createdAt: any;
      updatedAt: any;
    }>;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryDto;
}>;

export type CreateCategoryMutation = {
  createCategory: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      name: string;
      slug: string;
      description: string;
      createdAt: any;
      updatedAt: any;
    } | null;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdateCategoryDto;
}>;

export type UpdateCategoryMutation = {
  updateCategory: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      name: string;
      slug: string;
      description: string;
      createdAt: any;
      updatedAt: any;
    } | null;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteCategoryMutation = {
  deleteCategory: { success: boolean; message?: string | null };
};

export type CommentFragmentFragment = {
  id: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  isEdited: boolean;
  isDeleted: boolean;
  parentId?: string | null;
  postId?: string | null;
  userId: string;
  user?: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
  replies: Array<{
    id: string;
    content: string;
    createdAt: any;
    updatedAt: any;
    isEdited: boolean;
    isDeleted: boolean;
    parentId?: string | null;
    userId: string;
    user?: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    } | null;
  }>;
};

export type GetCommentsByPostQueryVariables = Exact<{
  postId: Scalars["String"]["input"];
}>;

export type GetCommentsByPostQuery = {
  commentsByPost: {
    success: boolean;
    message?: string | null;
    count: number;
    data: Array<{
      id: string;
      content: string;
      createdAt: any;
      updatedAt: any;
      isEdited: boolean;
      isDeleted: boolean;
      parentId?: string | null;
      postId?: string | null;
      userId: string;
      user?: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      } | null;
      replies: Array<{
        id: string;
        content: string;
        createdAt: any;
        updatedAt: any;
        isEdited: boolean;
        isDeleted: boolean;
        parentId?: string | null;
        userId: string;
        user?: {
          id: string;
          email?: string | null;
          name?: string | null;
          image?: string | null;
        } | null;
      }>;
    }>;
  };
};

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;

export type CreateCommentMutation = {
  createComment: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      content: string;
      createdAt: any;
      updatedAt: any;
      isEdited: boolean;
      isDeleted: boolean;
      parentId?: string | null;
      postId?: string | null;
      userId: string;
      user?: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      } | null;
      replies: Array<{
        id: string;
        content: string;
        createdAt: any;
        updatedAt: any;
        isEdited: boolean;
        isDeleted: boolean;
        parentId?: string | null;
        userId: string;
        user?: {
          id: string;
          email?: string | null;
          name?: string | null;
          image?: string | null;
        } | null;
      }>;
    } | null;
  };
};

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdateCommentInput;
}>;

export type UpdateCommentMutation = {
  updateComment: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      content: string;
      createdAt: any;
      updatedAt: any;
      isEdited: boolean;
      isDeleted: boolean;
      parentId?: string | null;
      postId?: string | null;
      userId: string;
      user?: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      } | null;
      replies: Array<{
        id: string;
        content: string;
        createdAt: any;
        updatedAt: any;
        isEdited: boolean;
        isDeleted: boolean;
        parentId?: string | null;
        userId: string;
        user?: {
          id: string;
          email?: string | null;
          name?: string | null;
          image?: string | null;
        } | null;
      }>;
    } | null;
  };
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteCommentMutation = {
  deleteComment: {
    success: boolean;
    message: string;
    deletedId?: string | null;
  };
};

export type CategoryFragmentFragment = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: any;
  updatedAt: any;
};

export type PostFragmentFragment = {
  id: string;
  title: string;
  slug: string;
  content: any;
  description?: string | null;
  mainImage?: string | null;
  isPublished: boolean;
  isPriority: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  views: number;
  votes: number;
  tags: Array<string>;
  authorId: string;
  categoryId: string;
  createdAt: any;
  updatedAt: any;
  author: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type UserFragmentFragment = {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;

export type CreatePostMutation = {
  createPost: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    } | null;
  };
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  input: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  updatePost: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    } | null;
  };
};

export type IncrementPostViewsMutationVariables = Exact<{
  id: Scalars["String"]["input"];
  identifier: Scalars["String"]["input"];
}>;

export type IncrementPostViewsMutation = {
  incrementViews: {
    success: boolean;
    message?: string | null;
    data?: { id: string; views: number } | null;
  };
};

export type GetPublishedPostsQueryVariables = Exact<{
  filters: PostFiltersInput;
}>;

export type GetPublishedPostsQuery = {
  publishedPosts: {
    success: boolean;
    message?: string | null;
    data: Array<{
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    }>;
    meta: {
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
  postBySlug: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    } | null;
  };
};

export type GetAllPostsQueryVariables = Exact<{
  filters?: InputMaybe<PostFiltersInput>;
}>;

export type GetAllPostsQuery = {
  posts: {
    success: boolean;
    message?: string | null;
    data: Array<{
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
};

export type DeletePostMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeletePostMutation = {
  deletePost: { success: boolean; message: string };
};

export type GetMyPostsQueryVariables = Exact<{
  filters: PostFiltersInput;
}>;

export type GetMyPostsQuery = {
  myPosts: {
    success: boolean;
    message?: string | null;
    data: Array<{
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    }>;
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
};

export type GetPriorityPostsQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
}>;

export type GetPriorityPostsQuery = {
  priorityPosts: {
    success: boolean;
    message?: string | null;
    count: number;
    data: Array<{
      id: string;
      title: string;
      slug: string;
      content: any;
      description?: string | null;
      mainImage?: string | null;
      isPublished: boolean;
      isPriority: boolean;
      isPinned: boolean;
      isDeleted: boolean;
      views: number;
      votes: number;
      tags: Array<string>;
      authorId: string;
      categoryId: string;
      createdAt: any;
      updatedAt: any;
      author: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      };
      category?: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: any;
        updatedAt: any;
      } | null;
    }>;
  };
};

export type GetVoteStatusQueryVariables = Exact<{
  postId: Scalars["String"]["input"];
}>;

export type GetVoteStatusQuery = {
  voteStatus: {
    success: boolean;
    message?: string | null;
    data?: {
      upvotes: number;
      downvotes: number;
      score: number;
      userVote?: VoteType | null;
    } | null;
  };
};

export type CastVoteMutationVariables = Exact<{
  input: CastVoteInput;
}>;

export type CastVoteMutation = {
  castVote: {
    success: boolean;
    message?: string | null;
    data?: {
      id: string;
      postId: string;
      userId: string;
      value: VoteType;
      createdAt: any;
    } | null;
  };
};

export type RemoveVoteMutationVariables = Exact<{
  postId: Scalars["String"]["input"];
}>;

export type RemoveVoteMutation = {
  removeVote: { success: boolean; message: string; deletedId?: string | null };
};

export const UserFragmentFragmentDoc = gql`
  fragment UserFragment on UserModel {
    id
    email
    name
    image
  }
`;
export const CommentFragmentFragmentDoc = gql`
  fragment CommentFragment on CommentModel {
    id
    content
    createdAt
    updatedAt
    isEdited
    isDeleted
    parentId
    postId
    userId
    user {
      ...UserFragment
    }
    replies {
      id
      content
      createdAt
      updatedAt
      isEdited
      isDeleted
      parentId
      userId
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export const CategoryFragmentFragmentDoc = gql`
  fragment CategoryFragment on CategoryModel {
    id
    name
    slug
    description
    createdAt
    updatedAt
  }
`;
export const PostFragmentFragmentDoc = gql`
  fragment PostFragment on PostModel {
    id
    title
    slug
    content
    description
    mainImage
    isPublished
    isPriority
    isPinned
    isDeleted
    views
    votes
    tags
    authorId
    categoryId
    createdAt
    updatedAt
    author {
      ...UserFragment
    }
    category {
      ...CategoryFragment
    }
  }
  ${UserFragmentFragmentDoc}
  ${CategoryFragmentFragmentDoc}
`;
export const SignUpEmailDocument = gql`
  mutation SignUpEmail($input: SignUpInput!) {
    signUpEmail(signUpInput: $input) {
      token
      user {
        ...UserFragment
      }
    }
  }
  ${UserFragmentFragmentDoc}
`;
export type SignUpEmailMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpEmailMutation,
    SignUpEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    SignUpEmailMutation,
    SignUpEmailMutationVariables
  >(SignUpEmailDocument, options);
}
export type SignUpEmailMutationHookResult = ReturnType<
  typeof useSignUpEmailMutation
>;
export type SignUpEmailMutationResult =
  ApolloReactCommon.MutationResult<SignUpEmailMutation>;
export type SignUpEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpEmailMutation,
  SignUpEmailMutationVariables
>;
export const SignInEmailDocument = gql`
  mutation SignInEmail($input: SignInInput!) {
    signInEmail(signInInput: $input) {
      token
      user {
        createdAt
        id
        image
        name
        updatedAt
      }
    }
  }
`;
export type SignInEmailMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignInEmailMutation,
    SignInEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    SignInEmailMutation,
    SignInEmailMutationVariables
  >(SignInEmailDocument, options);
}
export type SignInEmailMutationHookResult = ReturnType<
  typeof useSignInEmailMutation
>;
export type SignInEmailMutationResult =
  ApolloReactCommon.MutationResult<SignInEmailMutation>;
export type SignInEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type SignOutMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    SignOutMutation,
    SignOutMutationVariables
  >(SignOutDocument, options);
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult =
  ApolloReactCommon.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type GitHubAuthMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GitHubAuthMutation,
    GitHubAuthMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    GitHubAuthMutation,
    GitHubAuthMutationVariables
  >(GitHubAuthDocument, options);
}
export type GitHubAuthMutationHookResult = ReturnType<
  typeof useGitHubAuthMutation
>;
export type GitHubAuthMutationResult =
  ApolloReactCommon.MutationResult<GitHubAuthMutation>;
export type GitHubAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
          ...UserFragment
        }
      }
    }
  }
  ${UserFragmentFragmentDoc}
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
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetSessionQuery, GetSessionQueryVariables>(
    GetSessionDocument,
    options,
  );
}
export function useGetSessionLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetSessionQuery,
    GetSessionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetSessionQuery,
    GetSessionQueryVariables
  >(GetSessionDocument, options);
}
export function useGetSessionSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetSessionQuery,
        GetSessionQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetSessionQuery,
    GetSessionQueryVariables
  >(GetSessionDocument, options);
}
export type GetSessionQueryHookResult = ReturnType<typeof useGetSessionQuery>;
export type GetSessionLazyQueryHookResult = ReturnType<
  typeof useGetSessionLazyQuery
>;
export type GetSessionSuspenseQueryHookResult = ReturnType<
  typeof useGetSessionSuspenseQuery
>;
export type GetSessionQueryResult = ApolloReactCommon.QueryResult<
  GetSessionQuery,
  GetSessionQueryVariables
>;
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories {
      success
      message
      count
      data {
        ...CategoryFragment
      }
    }
  }
  ${CategoryFragmentFragmentDoc}
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
export function useGetCategoriesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
export function useGetCategoriesSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, options);
}
export type GetCategoriesQueryHookResult = ReturnType<
  typeof useGetCategoriesQuery
>;
export type GetCategoriesLazyQueryHookResult = ReturnType<
  typeof useGetCategoriesLazyQuery
>;
export type GetCategoriesSuspenseQueryHookResult = ReturnType<
  typeof useGetCategoriesSuspenseQuery
>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<
  GetCategoriesQuery,
  GetCategoriesQueryVariables
>;
export const CreateCategoryDocument = gql`
  mutation CreateCategory($input: CreateCategoryDto!) {
    createCategory(input: $input) {
      success
      message
      data {
        ...CategoryFragment
      }
    }
  }
  ${CategoryFragmentFragmentDoc}
`;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options);
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>;
export type CreateCategoryMutationResult =
  ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >;
export const UpdateCategoryDocument = gql`
  mutation UpdateCategory($id: String!, $input: UpdateCategoryDto!) {
    updateCategory(id: $id, input: $input) {
      success
      message
      data {
        ...CategoryFragment
      }
    }
  }
  ${CategoryFragmentFragmentDoc}
`;
export type UpdateCategoryMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>;
export type UpdateCategoryMutationResult =
  ApolloReactCommon.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >;
export const DeleteCategoryDocument = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      success
      message
    }
  }
`;
export type DeleteCategoryMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DeleteCategoryDocument, options);
}
export type DeleteCategoryMutationHookResult = ReturnType<
  typeof useDeleteCategoryMutation
>;
export type DeleteCategoryMutationResult =
  ApolloReactCommon.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >;
export const GetCommentsByPostDocument = gql`
  query GetCommentsByPost($postId: String!) {
    commentsByPost(postId: $postId) {
      success
      message
      count
      data {
        ...CommentFragment
      }
    }
  }
  ${CommentFragmentFragmentDoc}
`;

/**
 * __useGetCommentsByPostQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsByPostQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCommentsByPostQuery,
    GetCommentsByPostQueryVariables
  > &
    (
      | { variables: GetCommentsByPostQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetCommentsByPostQuery,
    GetCommentsByPostQueryVariables
  >(GetCommentsByPostDocument, options);
}
export function useGetCommentsByPostLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCommentsByPostQuery,
    GetCommentsByPostQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetCommentsByPostQuery,
    GetCommentsByPostQueryVariables
  >(GetCommentsByPostDocument, options);
}
export function useGetCommentsByPostSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetCommentsByPostQuery,
        GetCommentsByPostQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetCommentsByPostQuery,
    GetCommentsByPostQueryVariables
  >(GetCommentsByPostDocument, options);
}
export type GetCommentsByPostQueryHookResult = ReturnType<
  typeof useGetCommentsByPostQuery
>;
export type GetCommentsByPostLazyQueryHookResult = ReturnType<
  typeof useGetCommentsByPostLazyQuery
>;
export type GetCommentsByPostSuspenseQueryHookResult = ReturnType<
  typeof useGetCommentsByPostSuspenseQuery
>;
export type GetCommentsByPostQueryResult = ApolloReactCommon.QueryResult<
  GetCommentsByPostQuery,
  GetCommentsByPostQueryVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      success
      message
      data {
        ...CommentFragment
      }
    }
  }
  ${CommentFragmentFragmentDoc}
`;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >;
export const UpdateCommentDocument = gql`
  mutation UpdateComment($id: String!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
      success
      message
      data {
        ...CommentFragment
      }
    }
  }
  ${CommentFragmentFragmentDoc}
`;
export type UpdateCommentMutationFn = ApolloReactCommon.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >(UpdateCommentDocument, options);
}
export type UpdateCommentMutationHookResult = ReturnType<
  typeof useUpdateCommentMutation
>;
export type UpdateCommentMutationResult =
  ApolloReactCommon.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    UpdateCommentMutation,
    UpdateCommentMutationVariables
  >;
export const DeleteCommentDocument = gql`
  mutation DeleteComment($id: String!) {
    deleteComment(id: $id) {
      success
      message
      deletedId
    }
  }
`;
export type DeleteCommentMutationFn = ApolloReactCommon.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<
  typeof useDeleteCommentMutation
>;
export type DeleteCommentMutationResult =
  ApolloReactCommon.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    DeleteCommentMutation,
    DeleteCommentMutationVariables
  >;
export const CreatePostDocument = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      success
      message
      data {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CreatePostDocument, options);
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
  ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($id: String!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      success
      message
      data {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
`;
export type UpdatePostMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >(UpdatePostDocument, options);
}
export type UpdatePostMutationHookResult = ReturnType<
  typeof useUpdatePostMutation
>;
export type UpdatePostMutationResult =
  ApolloReactCommon.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
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
export type IncrementPostViewsMutationFn = ApolloReactCommon.MutationFunction<
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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    IncrementPostViewsMutation,
    IncrementPostViewsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    IncrementPostViewsMutation,
    IncrementPostViewsMutationVariables
  >(IncrementPostViewsDocument, options);
}
export type IncrementPostViewsMutationHookResult = ReturnType<
  typeof useIncrementPostViewsMutation
>;
export type IncrementPostViewsMutationResult =
  ApolloReactCommon.MutationResult<IncrementPostViewsMutation>;
export type IncrementPostViewsMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    IncrementPostViewsMutation,
    IncrementPostViewsMutationVariables
  >;
export const GetPublishedPostsDocument = gql`
  query GetPublishedPosts($filters: PostFiltersInput!) {
    publishedPosts(filters: $filters) {
      success
      message
      data {
        ...PostFragment
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
  ${PostFragmentFragmentDoc}
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
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  > &
    (
      | { variables: GetPublishedPostsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >(GetPublishedPostsDocument, options);
}
export function useGetPublishedPostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPublishedPostsQuery,
    GetPublishedPostsQueryVariables
  >(GetPublishedPostsDocument, options);
}
export function useGetPublishedPostsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPublishedPostsQuery,
        GetPublishedPostsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
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
export type GetPublishedPostsQueryResult = ApolloReactCommon.QueryResult<
  GetPublishedPostsQuery,
  GetPublishedPostsQueryVariables
>;
export const GetPostBySlugDocument = gql`
  query GetPostBySlug($slug: String!) {
    postBySlug(slug: $slug) {
      success
      message
      data {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
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
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  > &
    (
      | { variables: GetPostBySlugQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  >(GetPostBySlugDocument, options);
}
export function useGetPostBySlugLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPostBySlugQuery,
    GetPostBySlugQueryVariables
  >(GetPostBySlugDocument, options);
}
export function useGetPostBySlugSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPostBySlugQuery,
        GetPostBySlugQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
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
export type GetPostBySlugQueryResult = ApolloReactCommon.QueryResult<
  GetPostBySlugQuery,
  GetPostBySlugQueryVariables
>;
export const GetAllPostsDocument = gql`
  query GetAllPosts($filters: PostFiltersInput) {
    posts(filters: $filters) {
      success
      message
      data {
        ...PostFragment
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
  ${PostFragmentFragmentDoc}
`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetAllPostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(
    GetAllPostsDocument,
    options,
  );
}
export function useGetAllPostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(GetAllPostsDocument, options);
}
export function useGetAllPostsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetAllPostsQuery,
        GetAllPostsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(GetAllPostsDocument, options);
}
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<
  typeof useGetAllPostsLazyQuery
>;
export type GetAllPostsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllPostsSuspenseQuery
>;
export type GetAllPostsQueryResult = ApolloReactCommon.QueryResult<
  GetAllPostsQuery,
  GetAllPostsQueryVariables
>;
export const DeletePostDocument = gql`
  mutation DeletePost($id: String!) {
    deletePost(id: $id) {
      success
      message
    }
  }
`;
export type DeletePostMutationFn = ApolloReactCommon.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(DeletePostDocument, options);
}
export type DeletePostMutationHookResult = ReturnType<
  typeof useDeletePostMutation
>;
export type DeletePostMutationResult =
  ApolloReactCommon.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>;
export const GetMyPostsDocument = gql`
  query GetMyPosts($filters: PostFiltersInput!) {
    myPosts(filters: $filters) {
      success
      message
      data {
        ...PostFragment
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
  ${PostFragmentFragmentDoc}
`;

/**
 * __useGetMyPostsQuery__
 *
 * To run a query within a React component, call `useGetMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPostsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetMyPostsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMyPostsQuery,
    GetMyPostsQueryVariables
  > &
    (
      | { variables: GetMyPostsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(
    GetMyPostsDocument,
    options,
  );
}
export function useGetMyPostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyPostsQuery,
    GetMyPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetMyPostsQuery,
    GetMyPostsQueryVariables
  >(GetMyPostsDocument, options);
}
export function useGetMyPostsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetMyPostsQuery,
        GetMyPostsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetMyPostsQuery,
    GetMyPostsQueryVariables
  >(GetMyPostsDocument, options);
}
export type GetMyPostsQueryHookResult = ReturnType<typeof useGetMyPostsQuery>;
export type GetMyPostsLazyQueryHookResult = ReturnType<
  typeof useGetMyPostsLazyQuery
>;
export type GetMyPostsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyPostsSuspenseQuery
>;
export type GetMyPostsQueryResult = ApolloReactCommon.QueryResult<
  GetMyPostsQuery,
  GetMyPostsQueryVariables
>;
export const GetPriorityPostsDocument = gql`
  query GetPriorityPosts($limit: Int!) {
    priorityPosts(limit: $limit) {
      success
      message
      count
      data {
        ...PostFragment
      }
    }
  }
  ${PostFragmentFragmentDoc}
`;

/**
 * __useGetPriorityPostsQuery__
 *
 * To run a query within a React component, call `useGetPriorityPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriorityPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriorityPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPriorityPostsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPriorityPostsQuery,
    GetPriorityPostsQueryVariables
  > &
    (
      | { variables: GetPriorityPostsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetPriorityPostsQuery,
    GetPriorityPostsQueryVariables
  >(GetPriorityPostsDocument, options);
}
export function useGetPriorityPostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPriorityPostsQuery,
    GetPriorityPostsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetPriorityPostsQuery,
    GetPriorityPostsQueryVariables
  >(GetPriorityPostsDocument, options);
}
export function useGetPriorityPostsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetPriorityPostsQuery,
        GetPriorityPostsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetPriorityPostsQuery,
    GetPriorityPostsQueryVariables
  >(GetPriorityPostsDocument, options);
}
export type GetPriorityPostsQueryHookResult = ReturnType<
  typeof useGetPriorityPostsQuery
>;
export type GetPriorityPostsLazyQueryHookResult = ReturnType<
  typeof useGetPriorityPostsLazyQuery
>;
export type GetPriorityPostsSuspenseQueryHookResult = ReturnType<
  typeof useGetPriorityPostsSuspenseQuery
>;
export type GetPriorityPostsQueryResult = ApolloReactCommon.QueryResult<
  GetPriorityPostsQuery,
  GetPriorityPostsQueryVariables
>;
export const GetVoteStatusDocument = gql`
  query GetVoteStatus($postId: String!) {
    voteStatus(postId: $postId) {
      success
      message
      data {
        upvotes
        downvotes
        score
        userVote
      }
    }
  }
`;

/**
 * __useGetVoteStatusQuery__
 *
 * To run a query within a React component, call `useGetVoteStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVoteStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVoteStatusQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetVoteStatusQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetVoteStatusQuery,
    GetVoteStatusQueryVariables
  > &
    (
      | { variables: GetVoteStatusQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetVoteStatusQuery,
    GetVoteStatusQueryVariables
  >(GetVoteStatusDocument, options);
}
export function useGetVoteStatusLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetVoteStatusQuery,
    GetVoteStatusQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetVoteStatusQuery,
    GetVoteStatusQueryVariables
  >(GetVoteStatusDocument, options);
}
export function useGetVoteStatusSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetVoteStatusQuery,
        GetVoteStatusQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetVoteStatusQuery,
    GetVoteStatusQueryVariables
  >(GetVoteStatusDocument, options);
}
export type GetVoteStatusQueryHookResult = ReturnType<
  typeof useGetVoteStatusQuery
>;
export type GetVoteStatusLazyQueryHookResult = ReturnType<
  typeof useGetVoteStatusLazyQuery
>;
export type GetVoteStatusSuspenseQueryHookResult = ReturnType<
  typeof useGetVoteStatusSuspenseQuery
>;
export type GetVoteStatusQueryResult = ApolloReactCommon.QueryResult<
  GetVoteStatusQuery,
  GetVoteStatusQueryVariables
>;
export const CastVoteDocument = gql`
  mutation CastVote($input: CastVoteInput!) {
    castVote(input: $input) {
      success
      message
      data {
        id
        postId
        userId
        value
        createdAt
      }
    }
  }
`;
export type CastVoteMutationFn = ApolloReactCommon.MutationFunction<
  CastVoteMutation,
  CastVoteMutationVariables
>;

/**
 * __useCastVoteMutation__
 *
 * To run a mutation, you first call `useCastVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCastVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [castVoteMutation, { data, loading, error }] = useCastVoteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCastVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CastVoteMutation,
    CastVoteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CastVoteMutation,
    CastVoteMutationVariables
  >(CastVoteDocument, options);
}
export type CastVoteMutationHookResult = ReturnType<typeof useCastVoteMutation>;
export type CastVoteMutationResult =
  ApolloReactCommon.MutationResult<CastVoteMutation>;
export type CastVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CastVoteMutation,
  CastVoteMutationVariables
>;
export const RemoveVoteDocument = gql`
  mutation RemoveVote($postId: String!) {
    removeVote(postId: $postId) {
      success
      message
      deletedId
    }
  }
`;
export type RemoveVoteMutationFn = ApolloReactCommon.MutationFunction<
  RemoveVoteMutation,
  RemoveVoteMutationVariables
>;

/**
 * __useRemoveVoteMutation__
 *
 * To run a mutation, you first call `useRemoveVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVoteMutation, { data, loading, error }] = useRemoveVoteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useRemoveVoteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveVoteMutation,
    RemoveVoteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    RemoveVoteMutation,
    RemoveVoteMutationVariables
  >(RemoveVoteDocument, options);
}
export type RemoveVoteMutationHookResult = ReturnType<
  typeof useRemoveVoteMutation
>;
export type RemoveVoteMutationResult =
  ApolloReactCommon.MutationResult<RemoveVoteMutation>;
export type RemoveVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveVoteMutation,
  RemoveVoteMutationVariables
>;
