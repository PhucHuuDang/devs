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
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const session = sessionData?.getSession;
  // Support both { getSession: { data: { user } } } and { getSession: { user } } if API structure varies
  const user = session?.data?.user ?? (session as any)?.user ?? null;
  const isAuth = (session?.success === true || !!user) && !!user;

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
