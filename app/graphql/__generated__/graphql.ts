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
  posts: Array<Post>;
  socialLinks?: Maybe<Scalars['JSONObject']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  posts?: Maybe<Array<Post>>;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post?: Maybe<Post>;
  user: User;
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

export type Like = {
  __typename?: 'Like';
  id: Scalars['Int']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createCategory: Category;
  createPost: Post;
  createUser: User;
  deletePost: Post;
  incrementViews: Post;
  removeUser: User;
  updatePost: Post;
  updateUser: User;
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


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUser;
};

export type Post = {
  __typename?: 'Post';
  author: Author;
  authorId: Scalars['String']['output'];
  category?: Maybe<Category>;
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
  allPosts: Array<Post>;
  author: Author;
  findPostById: Post;
  findPostBySlug: Post;
  postPaginated: Array<Post>;
  priorityPosts: Array<Post>;
  profile: User;
  user: User;
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


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
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

export type UpdateUser = {
  id: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Comment>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  likes?: Maybe<Array<Like>>;
  name: Scalars['String']['output'];
};

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


export type CreateBlogMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, slug: string, createdAt: any } };

export type UpdateBlogMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdatePostInput;
}>;


export type UpdateBlogMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, title: string, slug: string, createdAt: any } };

export type IncrementBlogViewsMutationVariables = Exact<{
  id: Scalars['String']['input'];
  identifier: Scalars['String']['input'];
}>;


export type IncrementBlogViewsMutation = { __typename?: 'Mutation', incrementViews: { __typename?: 'Post', id: string, views: number } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: string, title: string, mainImage?: string | null, description?: string | null, content: any, votes: number, authorId: string, categoryId?: string | null, createdAt: any, updatedAt: any, tags: Array<string>, slug: string, views: number, isPublished: boolean, isPriority: boolean, isPinned: boolean, isDeleted: boolean, author: { __typename?: 'Author', id: string, name: string, avatarUrl?: string | null, bio?: string | null, designation?: string | null }, category?: { __typename?: 'Category', id: string, name: string } | null }> };

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