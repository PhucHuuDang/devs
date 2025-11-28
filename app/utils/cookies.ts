"use server";

import { cookies } from "next/headers";

export async function getAuthCookies() {
  const store = await cookies();
  return {
    accessToken: store.get("devs:access-token")?.value ?? null,
    refreshToken: store.get("devs:refresh-token")?.value ?? null,
  };
}

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
