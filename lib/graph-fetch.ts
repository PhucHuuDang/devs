import { cookies } from "next/headers";

export const fetchGraphql = async <T>(
  query: string,
  variables: Record<string, any> = {},
  init: RequestInit & {
    withCookies?: boolean;
    next?: { revalidate?: number | false };
  } = {},
): Promise<T> => {
  const endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_PRODUCTION
      : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    console.error("GraphQL endpoint is not defined");
    return {} as T;
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (init?.withCookies) {
    const cookieStore = cookies();
    headers["Cookie"] = cookieStore.toString();
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      credentials: "include",
      next: { revalidate: init?.next?.revalidate ?? 300 }, // ISR: 5 min default
      ...init,
    });

    if (!res.ok) {
      console.error("GraphQL request failed:", res.status, res.statusText);
      return {} as T;
    }

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL returned errors:", json.errors);
      return {} as T;
    }

    return json.data as T;
  } catch (error) {
    console.error("GraphQL fetch error:", error);
    return {} as T;
  }
};
