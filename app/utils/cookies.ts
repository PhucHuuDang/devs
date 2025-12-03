"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { decodeData } from "./decode";

export async function getAuthCookies() {
  const store = await cookies();

  return {
    accessToken: store.get("devs:access-token")?.value ?? null,
    refreshToken: store.get("devs:refresh-token")?.value ?? null,
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
