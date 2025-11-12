/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
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


export const CreateBlogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBlog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mainImage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPublished"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"mainImage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mainImage"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"isPublished"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPublished"}}},{"kind":"Argument","name":{"kind":"Name","value":"authorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authorId"}}},{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateBlogMutation, CreateBlogMutationVariables>;
export const UpdateBlogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBlog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const IncrementBlogViewsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"IncrementBlogViews"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"incrementViews"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"views"}}]}}]}}]} as unknown as DocumentNode<IncrementBlogViewsMutation, IncrementBlogViewsMutationVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"votes"}},{"kind":"Field","name":{"kind":"Name","value":"authorId"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"isPublished"}},{"kind":"Field","name":{"kind":"Name","value":"isPriority"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"isDeleted"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"designation"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Author: ResolverTypeWrapper<Author>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  Comment: ResolverTypeWrapper<Comment>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateAuthor: CreateAuthor;
  CreateCategory: CreateCategory;
  CreateUser: CreateUser;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Post: ResolverTypeWrapper<Post>;
  PostPaginationInput: PostPaginationInput;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  UpdatePostInput: UpdatePostInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  UpdateUser: UpdateUser;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Author: Author;
  String: Scalars['String']['output'];
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  Comment: Comment;
  Int: Scalars['Int']['output'];
  CreateAuthor: CreateAuthor;
  CreateCategory: CreateCategory;
  CreateUser: CreateUser;
  DateTime: Scalars['DateTime']['output'];
  JSON: Scalars['JSON']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  Like: Like;
  Mutation: Record<PropertyKey, never>;
  Post: Post;
  PostPaginationInput: PostPaginationInput;
  Query: Record<PropertyKey, never>;
  UpdatePostInput: UpdatePostInput;
  Float: Scalars['Float']['output'];
  UpdateUser: UpdateUser;
  User: User;
};

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  designation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isBlocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isDeleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isExpired?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isLocked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isSuspended?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isVerified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  socialLinks?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAuthor?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<MutationCreateAuthorArgs, 'author'>>;
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'category'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'authorId' | 'categoryId' | 'content' | 'description' | 'isPublished' | 'mainImage' | 'slug' | 'tags' | 'title'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  deletePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'id'>>;
  incrementViews?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationIncrementViewsArgs, 'id' | 'identifier'>>;
  removeUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'id'>>;
  updatePost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'data' | 'id'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'updateUserInput'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPinned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPriority?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isPublished?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mainImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  votes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType, RequireFields<QueryAuthorArgs, 'id'>>;
  findPostById?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryFindPostByIdArgs, 'id'>>;
  findPostBySlug?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryFindPostBySlugArgs, 'slug'>>;
  postPaginated?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostPaginatedArgs, 'params'>>;
  priorityPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPriorityPostsArgs, 'limit'>>;
  profile?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['Like']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Author?: AuthorResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};



export const CreateBlogDocument = gql`
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
    `;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      slug: // value for 'slug'
 *      mainImage: // value for 'mainImage'
 *      categoryId: // value for 'categoryId'
 *      tags: // value for 'tags'
 *      content: // value for 'content'
 *      authorId: // value for 'authorId'
 *      isPublished: // value for 'isPublished'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, options);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const UpdateBlogDocument = gql`
    mutation UpdateBlog($id: String!, $data: UpdatePostInput!) {
  updatePost(id: $id, data: $data) {
    id
    title
    slug
    createdAt
  }
}
    `;
export type UpdateBlogMutationFn = Apollo.MutationFunction<UpdateBlogMutation, UpdateBlogMutationVariables>;

/**
 * __useUpdateBlogMutation__
 *
 * To run a mutation, you first call `useUpdateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBlogMutation, { data, loading, error }] = useUpdateBlogMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBlogMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBlogMutation, UpdateBlogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBlogMutation, UpdateBlogMutationVariables>(UpdateBlogDocument, options);
      }
export type UpdateBlogMutationHookResult = ReturnType<typeof useUpdateBlogMutation>;
export type UpdateBlogMutationResult = Apollo.MutationResult<UpdateBlogMutation>;
export type UpdateBlogMutationOptions = Apollo.BaseMutationOptions<UpdateBlogMutation, UpdateBlogMutationVariables>;
export const IncrementBlogViewsDocument = gql`
    mutation IncrementBlogViews($id: String!, $identifier: String!) {
  incrementViews(id: $id, identifier: $identifier) {
    id
    views
  }
}
    `;
export type IncrementBlogViewsMutationFn = Apollo.MutationFunction<IncrementBlogViewsMutation, IncrementBlogViewsMutationVariables>;

/**
 * __useIncrementBlogViewsMutation__
 *
 * To run a mutation, you first call `useIncrementBlogViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementBlogViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementBlogViewsMutation, { data, loading, error }] = useIncrementBlogViewsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      identifier: // value for 'identifier'
 *   },
 * });
 */
export function useIncrementBlogViewsMutation(baseOptions?: Apollo.MutationHookOptions<IncrementBlogViewsMutation, IncrementBlogViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementBlogViewsMutation, IncrementBlogViewsMutationVariables>(IncrementBlogViewsDocument, options);
      }
export type IncrementBlogViewsMutationHookResult = ReturnType<typeof useIncrementBlogViewsMutation>;
export type IncrementBlogViewsMutationResult = Apollo.MutationResult<IncrementBlogViewsMutation>;
export type IncrementBlogViewsMutationOptions = Apollo.BaseMutationOptions<IncrementBlogViewsMutation, IncrementBlogViewsMutationVariables>;
export const GetPostsDocument = gql`
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
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export function useGetPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsSuspenseQueryHookResult = ReturnType<typeof useGetPostsSuspenseQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;