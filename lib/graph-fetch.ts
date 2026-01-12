import { cookies } from "next/headers";

export const fetchGraphql = async <T>(
  query: string,
  variables: Record<string, any> = {},
  init: RequestInit & { withCookies?: boolean } = {},
): Promise<T> => {
  const endpoint =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_PRODUCTION
      : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    console.error("GraphQL endpoint is not defined");
    return {} as T; // fallback khi chưa config endpoint
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // const cookieStore = await cookies();
  // const cookieHeader = cookieStore.toString(); // ✅ QUAN TRỌNG

  if (init?.withCookies) {
    const cookieStore = cookies(); // ✅ CHỈ gọi khi có request
    headers["Cookie"] = cookieStore.toString();
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      //   Cookie: cookieHeader,
      // },
      headers,
      body: JSON.stringify({ query, variables }),
      credentials: "include",
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
    return {} as T; // fallback object rỗng khi network error
  }
};
