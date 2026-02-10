import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  OperationVariables,
} from "@apollo/client";
import {
  MutationHookOptions,
  MutationResult,
  QueryResult,
} from "@apollo/client/react";

export * from "@apollo/client";
export type { MutationResult, QueryResult };

export type MutationFunction<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache = ApolloCache,
> = (
  options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>,
) => Promise<FetchResult<TData>>;

export type MutationFunctionOptions<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache = ApolloCache,
> = MutationHookOptions<TData, TVariables, TContext, TCache>;

export type BaseMutationOptions<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache = ApolloCache,
> = MutationHookOptions<TData, TVariables, TContext, TCache>;
