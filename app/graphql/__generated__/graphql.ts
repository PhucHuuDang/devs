/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AccountModel = {
  __typename?: 'AccountModel';
  accessToken?: Maybe<Scalars['String']['output']>;
  accessTokenExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  accountId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  idToken?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  providerId: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiresAt?: Maybe<Scalars['DateTime']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Author = {
  __typename?: 'Author';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  designation?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isActive?: Maybe<Scalars['Boolean']['output']>;
  isBlocked?: Maybe<Scalars['Boolean']['output']>;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  isLocked?: Maybe<Scalars['Boolean']['output']>;
  isSuspended?: Maybe<Scalars['Boolean']['output']>;
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  posts: Array<PostModel>;
  socialLinks?: Maybe<Scalars['JSONObject']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type CategoryModel = {
  __typename?: 'CategoryModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<PostModel>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChangePasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  revokeOtherSessions?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post?: Maybe<PostModel>;
  user: UserModel;
};

export type CreateAuthor = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  isDeleted?: InputMaybe<Scalars['Boolean']['input']>;
  isExpired?: InputMaybe<Scalars['Boolean']['input']>;
  isLocked?: InputMaybe<Scalars['Boolean']['input']>;
  isSuspended?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  socialLinks?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type CreateCategory = {
  name: Scalars['String']['input'];
};

export type CreateUser = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
};

export type GitHubUserResponse = {
  __typename?: 'GitHubUserResponse';
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  redirect: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  user?: Maybe<UserModel>;
};

export type LikeModel = {
  __typename?: 'LikeModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post: PostModel;
  postId: Scalars['String']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean']['output'];
  createAuthor: Author;
  createCategory: CategoryModel;
  createPost: PostModel;
  createUser: UserModel;
  deletePost: PostModel;
  gitHub: GitHubUserResponse;
  incrementViews: PostModel;
  signInEmail: SignInEmailUser;
  signOut: Scalars['Boolean']['output'];
  signUpEmail: SignUpEmailUser;
  updatePost: PostModel;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationCreateAuthorArgs = {
  author: CreateAuthor;
};


export type MutationCreateCategoryArgs = {
  category: CreateCategory;
};


export type MutationCreatePostArgs = {
  authorId: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  content: Scalars['JSON']['input'];
  description: Scalars['String']['input'];
  isPublished: Scalars['Boolean']['input'];
  mainImage: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUser;
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationIncrementViewsArgs = {
  id: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
};


export type MutationSignInEmailArgs = {
  signInInput: SignInInput;
};


export type MutationSignUpEmailArgs = {
  signUpInput: SignUpInput;
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars['String']['input'];
};

export type PostModel = {
  __typename?: 'PostModel';
  author: Author;
  authorId: Scalars['String']['output'];
  category?: Maybe<CategoryModel>;
  categoryId?: Maybe<Scalars['String']['output']>;
  content: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  isPriority: Scalars['Boolean']['output'];
  isPublished: Scalars['Boolean']['output'];
  mainImage?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views: Scalars['Int']['output'];
  votes: Scalars['Int']['output'];
};

export type PostPaginationInput = {
  extra?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  allPosts: Array<PostModel>;
  author: Author;
  findPostById: PostModel;
  findPostBySlug: PostModel;
  getAccounts: Array<AccountModel>;
  postPaginated: Array<PostModel>;
  priorityPosts: Array<PostModel>;
};


export type QueryAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindPostByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFindPostBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPostPaginatedArgs = {
  params: PostPaginationInput;
};


export type QueryPriorityPostsArgs = {
  limit?: Scalars['Int']['input'];
};

export type SessionModel = {
  __typename?: 'SessionModel';
  createdAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  ipAddress: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userAgent: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type SignInEmailUser = {
  __typename?: 'SignInEmailUser';
  redirect: Scalars['String']['output'];
  token: Scalars['String']['output'];
  url: Scalars['String']['output'];
  user: SignInEmailUserResponse;
};

export type SignInEmailUserResponse = {
  __typename?: 'SignInEmailUserResponse';
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SignInInput = {
  callbackURL?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SignUpEmailResponse = {
  __typename?: 'SignUpEmailResponse';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type SignUpEmailUser = {
  __typename?: 'SignUpEmailUser';
  token?: Maybe<Scalars['String']['output']>;
  user: SignUpEmailResponse;
};

export type SignUpInput = {
  callbackURL?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdatePostInput = {
  authorId?: InputMaybe<Scalars['Float']['input']>;
  categoryId?: InputMaybe<Scalars['Float']['input']>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isPinned?: InputMaybe<Scalars['Boolean']['input']>;
  isPriority?: InputMaybe<Scalars['Boolean']['input']>;
  isPublished?: InputMaybe<Scalars['Boolean']['input']>;
  mainImage?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  accounts: Array<AccountModel>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes: Array<LikeModel>;
  name?: Maybe<Scalars['String']['output']>;
  sessions: Array<SessionModel>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SignUpEmailMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpEmailMutation = { __typename?: 'Mutation', signUpEmail: { __typename?: 'SignUpEmailUser', token?: string | null, user: { __typename?: 'SignUpEmailResponse', id: string, email?: string | null, name?: string | null } } };

export type SignInEmailMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInEmailMutation = { __typename?: 'Mutation', signInEmail: { __typename?: 'SignInEmailUser', token: string, user: { __typename?: 'SignInEmailUserResponse', id: string, email?: string | null, name?: string | null } } };

export type GitHubMutationVariables = Exact<{ [key: string]: never; }>;


export type GitHubMutation = { __typename?: 'Mutation', gitHub: { __typename?: 'GitHubUserResponse', redirect: string, url: string } };

export type CreateBlogMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  mainImage: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']> | Scalars['String']['input'];
  content: Scalars['JSON']['input'];
  authorId: Scalars['String']['input'];
  isPublished: Scalars['Boolean']['input'];
}>;


export type CreateBlogMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostModel', id: string, title: string, slug: string, createdAt: any } };

export type UpdateBlogMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdatePostInput;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostModel', id: string, title: string, slug: string, createdAt: any } };

export type IncrementBlogViewsMutationVariables = Exact<{
  id: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
}>;


export type IncrementBlogViewsMutation = { __typename?: 'Mutation', incrementViews: { __typename?: 'PostModel', id: string, views: number } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'PostModel', id: string, title: string, mainImage?: string | null, description?: string | null, content: any, votes: number, authorId: string, categoryId?: string | null, createdAt: any, updatedAt: any, tags: Array<string>, slug: string, views: number, isPublished: boolean, isPriority: boolean, isPinned: boolean, isDeleted: boolean, author: { __typename?: 'Author', id: string, name: string, avatarUrl?: string | null, bio?: string | null, designation?: string | null }, category?: { __typename?: 'CategoryModel', id: string, name: string } | null }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
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
    `) as unknown as TypedDocumentString<SignUpEmailMutation, SignUpEmailMutationVariables>;
export const SignInEmailDocument = new TypedDocumentString(`
    mutation signInEmail($input: SignInInput!) {
  signInEmail(signInInput: $input) {
    token
    user {
      id
      email
      name
    }
  }
}
    `) as unknown as TypedDocumentString<SignInEmailMutation, SignInEmailMutationVariables>;
export const GitHubDocument = new TypedDocumentString(`
    mutation gitHub {
  gitHub {
    redirect
    url
  }
}
    `) as unknown as TypedDocumentString<GitHubMutation, GitHubMutationVariables>;
export const CreateBlogDocument = new TypedDocumentString(`
    mutation CreateBlog($title: String!, $description: String!, $slug: String!, $mainImage: String!, $categoryId: String!, $tags: [String!]!, $content: JSON!, $authorId: String!, $isPublished: Boolean!) {
  createPost(
    title: $title
    description: $description
    slug: $slug
    mainImage: $mainImage
    tags: $tags
    content: $content
    isPublished: $isPublished
    authorId: $authorId
    categoryId: $categoryId
  ) {
    id
    title
    slug
    createdAt
  }
}
    `) as unknown as TypedDocumentString<CreateBlogMutation, CreateBlogMutationVariables>;
export const UpdateBlogDocument = new TypedDocumentString(`
    mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {
  updatePost(id: $id, data: $data) {
    id
    title
    slug
    createdAt
  }
}
    `) as unknown as TypedDocumentString<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const IncrementBlogViewsDocument = new TypedDocumentString(`
    mutation IncrementBlogViews($id: String!, $identifier: String!) {
  incrementViews(id: $id, identifier: $identifier) {
    id
    views
  }
}
    `) as unknown as TypedDocumentString<IncrementBlogViewsMutation, IncrementBlogViewsMutationVariables>;
export const GetPostsDocument = new TypedDocumentString(`
    query GetPosts {
  allPosts {
    id
    title
    mainImage
    description
    content
    votes
    authorId
    categoryId
    createdAt
    updatedAt
    tags
    slug
    views
    isPublished
    isPriority
    isPinned
    isDeleted
    author {
      id
      name
      avatarUrl
      bio
      designation
    }
    category {
      id
      name
    }
  }
}
    `) as unknown as TypedDocumentString<GetPostsQuery, GetPostsQueryVariables>;