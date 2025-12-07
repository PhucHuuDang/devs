"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { decodeData } from "./decode";

import { GetSessionQuery } from "@/app/graphql/__generated__/graphql";
import { GET_SESSION_STRING } from "@/app/graphql/mutaions/auth.mutations";
import { fetchGraphql } from "@/lib/graph-fetch";
import { redirect } from "next/navigation";

export async function getAuthCookies() {
  const store = await cookies();

  return {
    accessToken: store.get("devs:access_token")?.value ?? null,
    sessionToken: store.get("devs.session_token")?.value ?? null,
    refreshToken: store.get("devs:refresh_token")?.value ?? null,
  };
}

export async function getSessionData() {
  const store = await cookies();
  const sessionData = store.get("")?.value ?? null;
  const sessionToken = store.get("devs.session_token")?.value ?? null;

  if (!sessionData || !sessionToken) {
    return {
      sessionData,
      sessionToken,
    };
  }

  return {
    sessionData,
    sessionToken,
  };
}

// export const decodeData = <T>(data: string) => {
//   const decoded = jwtDecode<T>(data) as T;
//   return decoded as T;
// };
export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
) {
  const store = await cookies();
  store.set("devs:access-token", accessToken, { httpOnly: true });
  store.set("devs:refresh-token", refreshToken, { httpOnly: true });
}

export async function deleteCookies() {
  const store = await cookies();
  store.delete("devs:access-token");
  store.delete("devs:refresh-token");
}

export async function getSession() {
  const data = await fetchGraphql<GetSessionQuery>(GET_SESSION_STRING);
  return data?.getSession ?? null;
}

export async function requireAuth() {
  const data = await getSession();

  if (!data?.user) {
    redirect("/auth");
  }

  return data;
}
