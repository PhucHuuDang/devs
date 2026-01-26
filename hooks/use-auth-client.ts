import { useEffect, useState } from "react";

import { useQuery } from "@apollo/client/react";

import {
  GetSessionQuery,
  GetSessionResponse,
} from "@/app/graphql/__generated__/generated";
import { GET_SESSION } from "@/app/graphql/mutaions/auth.mutations";

export const useAuthClient = () => {
  const {
    data: sessionData,
    error,
    dataState,
  } = useQuery<GetSessionQuery>(GET_SESSION);

  // console.log({sessionData, error, dataState});

  // sessionData.

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (sessionData?.getSession?.success === true) {
      setTimeout(() => {
        setIsAuth(true);
      }, 100);
    } else {
      setTimeout(() => {
        setIsAuth(false);
      }, 100);
    }
  }, [sessionData?.getSession?.success]);

  return { isAuth };
};
