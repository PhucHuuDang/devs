// export const fetchGraphql = async <T>(
//   query: string,
//   variables = {}
// ): Promise<T> => {
//   const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ query, variables }),
//   });

//   if (!res.ok) {
//     console.error("GraphQL request failed:", res.status, res.statusText);
//     return [] as unknown as T;
//   }

//   return res.json().then((r: any) => r.data as T);
// };

export const fetchGraphql = async <T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> => {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  if (!endpoint) {
    console.error("GraphQL endpoint is not defined");
    return {} as T; // fallback khi chưa config endpoint
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
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
