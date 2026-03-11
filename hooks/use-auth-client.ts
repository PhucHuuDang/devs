import { useQuery } from "@apollo/client/react";

import {
  GetSessionQuery,
  GetSessionResponse,
} from "@/app/graphql/__generated__/generated";
import { GET_SESSION } from "@/app/graphql/mutaions/auth.mutations";

export const useAuthClient = () => {
  const {
    data: sessionData,
    loading,
    error,
    refetch,
    client,
  } = useQuery<GetSessionQuery>(GET_SESSION, {
    fetchPolicy: "cache-first",
  });

  const session = sessionData?.getSession;
  const isAuth = session?.success === true && !!session?.data?.user;
  const user = session?.data?.user ?? null;

  return {
    isAuth,
    user,
    loading,
    error,
    refetch,
    client,
    sessionData,
  };
};
