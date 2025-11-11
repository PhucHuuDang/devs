export const fetchGraphql = async <T>(
  query: string,
  variables = {}
): Promise<T> => {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error("Failed to fetch graphql");

  return res.json().then((r) => r.data);
};
