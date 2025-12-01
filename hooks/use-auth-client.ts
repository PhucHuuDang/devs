import { GetSessionQuery } from "@/app/graphql/__generated__/graphql";
import { GET_SESSION } from "@/app/graphql/mutaions/auth.mutations";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";

export const useAuthClient = () => {
  const { data: sessionData } = useQuery<GetSessionQuery>(GET_SESSION);

  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (sessionData?.getSession?.user) {
      setTimeout(() => {
        setIsAuth(true);
      }, 100);
    } else {
      setTimeout(() => {
        setIsAuth(false);
      }, 100);
    }
  }, [sessionData?.getSession?.user]);

  return { isAuth };
};
