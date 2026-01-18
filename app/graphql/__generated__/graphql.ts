import type { DocumentTypeDecoration } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
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

export type CategoryModel = {
  __typename?: "CategoryModel";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  posts?: Maybe<Array<PostModel>>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type Comment = {
  __typename?: "Comment";
  content: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  post?: Maybe<PostModel>;
  user: UserModel;
};

export type CreatePostInput = {
  /** Category ID */
  categoryId?: InputMaybe<Scalars["String"]["input"]>;
  /** Post content in JSON format */
  content: Scalars["JSON"]["input"];
  /** Post description/excerpt */
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** Whether to publish immediately or save as draft */
  isPublished?: Scalars["Boolean"]["input"];
  /** Main image URL */
  mainImage?: InputMaybe<Scalars["String"]["input"]>;
  /** Post tags */
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
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

export type GetProfileResponse = {
  __typename?: "GetProfileResponse";
  data?: Maybe<Scalars["JSON"]["output"]>;
  user: OAuth2UserInfoModel;
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
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
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
  /** Create a new post (requires authentication) */
  createPost: PostResponse;
  /** Delete a post (requires ownership) */
  deletePost: DeletePostResponse;
  gitHub: GitHubUserResponse;
  /** Increment post view count */
  incrementViews: PostResponse;
  signInEmail: SignInEmailUser;
  signOut: SignOutResponse;
  /** Sign up email user */
  signUpEmail: SignUpEmailUser;
  /** Update a post (requires ownership) */
  updatePost: PostResponse;
  updateProfile: UserModel;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
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
  email?: Maybe<Scalars["String"]["output"]>;
  emailVerified?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
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
  authorId: Scalars["String"]["output"];
  category?: Maybe<CategoryModel>;
  categoryId?: Maybe<Scalars["String"]["output"]>;
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
  user: UserModel;
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
  getAccounts: Array<AccountModel>;
  getProfile: GetProfileResponse;
  getSession: GetSessionResponse;
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

export type SignInEmailUser = {
  __typename?: "SignInEmailUser";
  /** Token */
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<SignInEmailUserResponse>;
};

export type SignInEmailUserResponse = {
  __typename?: "SignInEmailUserResponse";
  createdAt: Scalars["DateTime"]["output"];
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["String"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
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
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
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
      updatedAt?: any | null;
    } | null;
  };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = {
  __typename?: "Mutation";
  signOut: { __typename?: "SignOutResponse"; success: boolean };
};

export type GitHubMutationVariables = Exact<{ [key: string]: never }>;

export type GitHubMutation = {
  __typename?: "Mutation";
  gitHub: { __typename?: "GitHubUserResponse"; redirect: string; url: string };
};

export type GetSessionQueryVariables = Exact<{ [key: string]: never }>;

export type GetSessionQuery = {
  __typename?: "Query";
  getSession: {
    __typename?: "GetSessionResponse";
    session: {
      __typename?: "SessionModel";
      token: string;
      expiresAt: any;
      userId: string;
      ipAddress: string;
      userAgent: string;
      createdAt: any;
      updatedAt: any;
    };
    user: {
      __typename?: "UserModel";
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
      createdAt: any;
      updatedAt?: any | null;
    };
  };
};

export type GetPostsQueryVariables = Exact<{
  filters?: InputMaybe<PostFiltersInput>;
}>;

export type GetPostsQuery = {
  __typename?: "Query";
  posts: {
    __typename?: "PaginatedPostsResponse";
    data: Array<{
      __typename?: "PostModel";
      id: string;
      title: string;
      slug: string;
      description?: string | null;
      mainImage?: string | null;
      tags: Array<string>;
      views: number;
      isPublished: boolean;
      createdAt: any;
      user: {
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
    };
  };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<
    DocumentTypeDecoration<TResult, TVariables>["__apiType"]
  >;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const SignUpEmailDocument = new TypedDocumentString(`
    mutation signUpEmail($input: SignUpInput!) {
  signUpEmail(signUpInput: $input) {
    token
    user {
      id
      email
      name
    }
  }
}
    `) as unknown as TypedDocumentString<
  SignUpEmailMutation,
  SignUpEmailMutationVariables
>;
export const SignInEmailDocument = new TypedDocumentString(`
    mutation signInEmail($input: SignInInput!) {
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
    `) as unknown as TypedDocumentString<
  SignInEmailMutation,
  SignInEmailMutationVariables
>;
export const SignOutDocument = new TypedDocumentString(`
    mutation signOut {
  signOut {
    success
  }
}
    `) as unknown as TypedDocumentString<
  SignOutMutation,
  SignOutMutationVariables
>;
export const GitHubDocument = new TypedDocumentString(`
    mutation gitHub {
  gitHub {
    redirect
    url
  }
}
    `) as unknown as TypedDocumentString<
  GitHubMutation,
  GitHubMutationVariables
>;
export const GetSessionDocument = new TypedDocumentString(`
    query getSession {
  getSession {
    session {
      token
      expiresAt
      userId
      ipAddress
      userAgent
      createdAt
      updatedAt
    }
    user {
      id
      email
      name
      image
      createdAt
      updatedAt
      image
    }
  }
}
    `) as unknown as TypedDocumentString<
  GetSessionQuery,
  GetSessionQueryVariables
>;
export const GetPostsDocument = new TypedDocumentString(`
    query GetPosts($filters: PostFiltersInput) {
  posts(filters: $filters) {
    data {
      id
      title
      slug
      description
      mainImage
      tags
      views
      isPublished
      createdAt
      user {
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
    }
  }
}
    `) as unknown as TypedDocumentString<GetPostsQuery, GetPostsQueryVariables>;
