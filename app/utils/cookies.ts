"use server";

import { cookies } from "next/headers";

export async function getAuthCookies() {
  const store = await cookies();
  return {
    accessToken: store.get("blog-access-token")?.value ?? null,
    refreshToken: store.get("blog-refresh-token")?.value ?? null,
  };
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
) {
  const store = await cookies();
  store.set("blog-access-token", accessToken, { httpOnly: true });
  store.set("blog-refresh-token", refreshToken, { httpOnly: true });
}

export async function deleteCookies() {
  const store = await cookies();
  store.delete("blog-access-token");
  store.delete("blog-refresh-token");
}
